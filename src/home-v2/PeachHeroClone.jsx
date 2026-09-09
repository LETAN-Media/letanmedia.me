import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import * as THREE from 'three';

import {
  Canvas,
  useFrame,
  useThree,
} from '@react-three/fiber';

import {
  useAnimations,
  useGLTF,
} from '@react-three/drei';

import {
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';

import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

const FISH_URL = '/peach-v2/clownfish.glb';
const FISH_ID =
  '480aae7d-371f-4934-9033-698109657d31';

const FISH_RIG_ID =
  '70a64fb1-6bef-4fe7-8965-8ff389049050';

const CAMERA_ID =
  'ea94b165-c53b-4704-87a9-1633ae09cd51';

const FISH_CLIP = 'Fish|swim_B3';

function evaluateKeyframes(keys, progress) {
  if (!keys?.length) return undefined;

  if (progress <= keys[0].position) {
    return keys[0].value;
  }

  const last = keys[keys.length - 1];

  if (progress >= last.position) {
    return last.value;
  }

  let low = 0;
  let high = keys.length - 1;

  while (low <= high) {
    const mid = (low + high) >> 1;

    if (keys[mid].position < progress) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  const right = keys[low];
  const left = keys[low - 1];

  const distance =
    right.position - left.position;

  if (distance <= 0) {
    return right.value;
  }

  const t =
    (progress - left.position)
    / distance;

  return THREE.MathUtils.lerp(
    left.value,
    right.value,
    t,
  );
}

function compileObjectTracks(state, objectId) {
  const sequence =
    state?.animations
      ?.sheetsById
      ?.DEFAULT_ANIMATION_SHEET_NAME
      ?.sequence;

  const objectTracks =
    sequence
      ?.tracksByObject
      ?.[objectId];

  if (!objectTracks) {
    return {};
  }

  const result = {};

  for (
    const [
      rawPath,
      trackId,
    ]
    of Object.entries(
      objectTracks.trackIdByPropPath || {},
    )
  ) {
    let path;

    try {
      path = JSON.parse(rawPath);
    } catch {
      continue;
    }

    if (
      !Array.isArray(path)
      || path.length !== 2
    ) {
      continue;
    }

    const track =
      objectTracks
        .trackData
        ?.[trackId];

    const byId =
      track
        ?.keyframes
        ?.byId;

    if (!byId) {
      continue;
    }

    const keys =
      Object
        .values(byId)
        .filter(
          (item) =>
            Number.isFinite(item.position)
            && Number.isFinite(item.value),
        )
        .sort(
          (a, b) =>
            a.position - b.position,
        )
        .map((item) => ({
          position: item.position,
          value: item.value,
        }));

    result[
      `${path[0]}.${path[1]}`
    ] = keys;
  }

  return result;
}

function applyTransform(
  object,
  tracks,
  progress,
) {
  if (!object || !tracks) return;

  for (const axis of ['x', 'y', 'z']) {
    const position =
      evaluateKeyframes(
        tracks[`position.${axis}`],
        progress,
      );

    const rotation =
      evaluateKeyframes(
        tracks[`rotation.${axis}`],
        progress,
      );

    const scale =
      evaluateKeyframes(
        tracks[`scale.${axis}`],
        progress,
      );

    if (position !== undefined) {
      object.position[axis] = position;
    }

    if (rotation !== undefined) {
      object.rotation[axis] = rotation;
    }

    if (scale !== undefined) {
      object.scale[axis] = scale;
    }
  }
}

function CameraTimeline({
  tracks,
  progressRef,
  state,
}) {
  const { camera } = useThree();

  useEffect(() => {
    const settings =
      state?.engineState
        ?.pwObjects
        ?.[CAMERA_ID];

    if (!settings) return;

    if (settings.fov) {
      camera.fov = settings.fov;
    }

    camera.near =
      settings.near ?? 0.1;

    camera.far =
      settings.far ?? 1000;

    camera.updateProjectionMatrix();
  }, [
    camera,
    state,
  ]);

  useFrame((_, delta) => {
    /*
     * 1200ms-style inertia:
     * target scroll không giật trực tiếp vào scene.
     */
    progressRef.current.smooth =
      THREE.MathUtils.damp(
        progressRef.current.smooth,
        progressRef.current.target,
        5,
        delta,
      );

    const peachProgress =
      progressRef.current.smooth * 0.451;

    applyTransform(
      camera,
      tracks,
      peachProgress,
    );

    camera.updateMatrixWorld();
  });

  return null;
}

function Fish({
  tracks,
  progressRef,
}) {
  const gltf = useGLTF(FISH_URL);

  const model = useMemo(
    () => clone(gltf.scene),
    [gltf.scene],
  );

  const rigRef = useRef();

  const { actions } =
    useAnimations(
      gltf.animations,
      model,
    );

  useEffect(() => {
    const action =
      actions[FISH_CLIP]
      ?? Object.values(actions).find(Boolean);

    if (!action) return;

    action.reset();
    action.enabled = true;

    action.setLoop(
      THREE.LoopRepeat,
      Infinity,
    );

    action.setEffectiveTimeScale(1);
    action.play();

    return () => action.stop();
  }, [actions]);

  useFrame(() => {
    const peachProgress =
      progressRef.current.smooth * 0.451;

    applyTransform(
      rigRef.current,
      tracks,
      peachProgress,
    );
  });

  return (
    <group ref={rigRef}>
      <primitive
        object={model}
        position={[0, 0, 0]}
        scale={[3.8, 3.8, 3.8]}
        rotation={[
          Math.PI,
          -1.4675304587190388,
          Math.PI,
        ]}
        dispose={null}
      />
    </group>
  );
}

function Scene({
  state,
  progressRef,
}) {
  const fishTracks = useMemo(
    () =>
      compileObjectTracks(
        state,
        FISH_RIG_ID,
      ),
    [state],
  );

  const cameraTracks = useMemo(
    () =>
      compileObjectTracks(
        state,
        CAMERA_ID,
      ),
    [state],
  );

  return (
    <>
      <ambientLight
        color="#ffffff"
        intensity={2.8}
      />

      <directionalLight
        position={[3, 4, 5]}
        intensity={3}
        color="#ffffff"
      />

      <directionalLight
        position={[-3, 1, 4]}
        intensity={1.1}
        color="#ffd1e7"
      />

      <CameraTimeline
        tracks={cameraTracks}
        progressRef={progressRef}
        state={state}
      />

      <Fish
        tracks={fishTracks}
        progressRef={progressRef}
      />
    </>
  );
}

export default function PeachHeroClone() {
  const sectionRef = useRef();

  const progressRef = useRef({
    target: 0,
    smooth: 0,
  });

  const [state, setState] =
    useState(null);

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,
    offset: [
      'start start',
      'end end',
    ],
  });

  useMotionValueEvent(
    scrollYProgress,
    'change',
    (value) => {
      progressRef.current.target =
        THREE.MathUtils.clamp(
          value,
          0,
          1,
        );
    },
  );

  useEffect(() => {
    let cancelled = false;

    const mobile =
      window.matchMedia(
        '(max-width: 768px)',
      ).matches;

    const url =
      mobile
        ? '/peach-v2/mobile.json'
        : '/peach-v2/desktop.json';

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Scene state ${response.status}`,
          );
        }

        return response.json();
      })
      .then((data) => {
        if (!cancelled) {
          setState(data);
        }
      })
      .catch((error) => {
        console.error(
          '[Peach V2 scene]',
          error,
        );
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="lmv2-peach-clone"
    >
      <div className="lmv2-peach-clone__stage">

        <img
          className="lmv2-peach-clone__bg"
          src="/peach-v2/bg1.webp"
          alt=""
          draggable="false"
        />

        <div className="lmv2-fish-layer">
          {state && (
            <Canvas
              dpr={1}
              camera={{
                position: [
                  0.80858859108883,
                  12.536,
                  1.06617782601728,
                ],
                fov:
                  state
                    ?.engineState
                    ?.pwObjects
                    ?.[CAMERA_ID]
                    ?.fov
                  ?? 60,
                near: 0.1,
                far: 1000,
              }}
              gl={{
                alpha: true,
                antialias: true,
                powerPreference:
                  'high-performance',
              }}
              onCreated={({ gl }) => {
                gl.setClearColor(
                  0x000000,
                  0,
                );

                gl.outputColorSpace =
                  THREE.SRGBColorSpace;

                gl.toneMapping =
                  THREE.NoToneMapping;

                gl.toneMappingExposure =
                  1;
              }}
            >
              <Suspense fallback={null}>
                <Scene
                  state={state}
                  progressRef={progressRef}
                />
              </Suspense>
            </Canvas>
          )}
        </div>

        <div
          className="lmv2-scroll-hint"
          aria-hidden="true"
        >
          SCROLL
          <span>↓</span>
        </div>

      </div>
    </section>
  );
}

useGLTF.preload(FISH_URL);
