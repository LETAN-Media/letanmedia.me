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
  useTexture,
} from '@react-three/drei';

import {
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';

import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

const FISH_URL = '/peach-v2/clownfish.glb';

const MOBILE_BG =
  '/images/peach/main-bg-mobile.webp';

const DESKTOP_BG =
  '/images/peach/main-bg-desktop.webp';

const SEA_BG =
  '/images/peach/sea-bg.webp';

const FISH_RIG_ID =
  '70a64fb1-6bef-4fe7-8965-8ff389049050';

const CAMERA_ID =
  'ea94b165-c53b-4704-87a9-1633ae09cd51';

const FISH_CLIP =
  'Fish|swim_B3';

/*
 * Exact ends of the original Peach tracks.
 */
const FISH_TRACK_END = 0.451;
const CAMERA_TRACK_END =
  0.8118318620544925;

/* =========================================================
   SCENE STATE HELPERS
   ========================================================= */

function vector3(value, fallback = 0) {
  return [
    value?.x ?? fallback,
    value?.y ?? fallback,
    value?.z ?? fallback,
  ];
}

function scale3(value) {
  return [
    value?.x ?? 1,
    value?.y ?? 1,
    value?.z ?? 1,
  ];
}

function getObjects(state) {
  return (
    state?.engineState?.pwObjects
    ?? {}
  );
}

function getParents(state) {
  return (
    state?.engineState?.parents
    ?? {}
  );
}

function findByName(
  state,
  name,
  parentId = null,
) {
  const objects =
    getObjects(state);

  const parents =
    getParents(state);

  for (
    const [id, object]
    of Object.entries(objects)
  ) {
    if (object?.name !== name) {
      continue;
    }

    if (
      parentId !== null
      && parents[id] !== parentId
    ) {
      continue;
    }

    return {
      id,
      object,
    };
  }

  return null;
}

function transformProps(object) {
  return {
    position:
      vector3(object?.position),
    rotation:
      vector3(object?.rotation),
    scale:
      scale3(object?.scale),
    visible:
      object?.visible !== false,
  };
}

/* =========================================================
   TIMELINE
   ========================================================= */

function evaluateTrack(
  keys,
  progress,
) {
  if (!keys?.length) {
    return undefined;
  }

  if (
    progress
    <= keys[0].position
  ) {
    return keys[0].value;
  }

  const last =
    keys[keys.length - 1];

  if (
    progress
    >= last.position
  ) {
    return last.value;
  }

  let low = 0;
  let high =
    keys.length - 1;

  while (low <= high) {
    const mid =
      (low + high) >> 1;

    if (
      keys[mid].position
      < progress
    ) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  const right =
    keys[low];

  const left =
    keys[low - 1];

  const distance =
    right.position
    - left.position;

  if (distance <= 0) {
    return right.value;
  }

  const t =
    (
      progress
      - left.position
    )
    / distance;

  return THREE.MathUtils.lerp(
    left.value,
    right.value,
    t,
  );
}

function compileTracks(
  state,
  objectId,
) {
  const sequence =
    state
      ?.animations
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
      objectTracks
        .trackIdByPropPath
      || {},
    )
  ) {
    let path;

    try {
      path =
        JSON.parse(rawPath);
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
            Number.isFinite(
              item.position,
            )
            && Number.isFinite(
              item.value,
            ),
        )
        .sort(
          (a, b) =>
            a.position
            - b.position,
        )
        .map((item) => ({
          position:
            item.position,
          value:
            item.value,
          handles:
            item.handles,
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
  if (!object) {
    return;
  }

  for (
    const axis
    of ['x', 'y', 'z']
  ) {
    const position =
      evaluateTrack(
        tracks[
          `position.${axis}`
        ],
        progress,
      );

    const rotation =
      evaluateTrack(
        tracks[
          `rotation.${axis}`
        ],
        progress,
      );

    const scale =
      evaluateTrack(
        tracks[
          `scale.${axis}`
        ],
        progress,
      );

    if (
      position !== undefined
    ) {
      object.position[axis] =
        position;
    }

    if (
      rotation !== undefined
    ) {
      object.rotation[axis] =
        rotation;
    }

    if (
      scale !== undefined
    ) {
      object.scale[axis] =
        scale;
    }
  }
}

/* =========================================================
   PEACH BACKGROUND WORLD
   ========================================================= */

function PeachWorld({
  state,
  mobile,
}) {
  const heroBg =
    useTexture(
      mobile
        ? MOBILE_BG
        : DESKTOP_BG,
    );

  const seaBg =
    useTexture(SEA_BG);

  useEffect(() => {
    heroBg.colorSpace =
      THREE.SRGBColorSpace;

    seaBg.colorSpace =
      THREE.SRGBColorSpace;

    heroBg.needsUpdate = true;
    seaBg.needsUpdate = true;
  }, [
    heroBg,
    seaBg,
  ]);

  const world =
    useMemo(() => {
      const hero =
        findByName(
          state,
          'HERO',
        );

      const mainBg =
        hero
          ? findByName(
              state,
              'main BG',
              hero.id,
            )
          : null;

      const pinkBg =
        hero
          ? findByName(
              state,
              'PinkBG',
              hero.id,
            )
          : null;

      const underworld =
        findByName(
          state,
          'UNDERWORLD',
        );

      const bgs =
        underworld
          ? findByName(
              state,
              'BGS',
              underworld.id,
            )
          : null;

      const inner =
        bgs
          ? findByName(
              state,
              'Group',
              bgs.id,
            )
          : null;

      const sea =
        inner
          ? findByName(
              state,
              'PlaneSeaBG',
              inner.id,
            )
          : null;

      return {
        hero,
        mainBg,
        pinkBg,
        underworld,
        bgs,
        inner,
        sea,
      };
    }, [state]);

  return (
    <>
      {/* =====================
          HERO WORLD
          ===================== */}

      {world.hero && (
        <group
          {...transformProps(
            world.hero.object,
          )}
        >
          {world.pinkBg && (
            <mesh
              {...transformProps(
                world.pinkBg.object,
              )}
            >
              <planeGeometry
                args={[1, 1]}
              />

              <meshBasicMaterial
                color="#ffcfe9"
                toneMapped={false}
              />
            </mesh>
          )}

          {world.mainBg && (
            <mesh
              {...transformProps(
                world.mainBg.object,
              )}
            >
              <planeGeometry
                args={[1, 1]}
              />

              <meshBasicMaterial
                map={heroBg}
                color="#ffffff"
                toneMapped={false}
              />
            </mesh>
          )}
        </group>
      )}

      {/* =====================
          UNDERWATER WORLD
          ===================== */}

      {world.underworld
        && world.bgs
        && world.inner
        && world.sea
        && (
          <group
            {...transformProps(
              world
                .underworld
                .object,
            )}
          >
            <group
              {...transformProps(
                world.bgs.object,
              )}
            >
              <group
                {...transformProps(
                  world
                    .inner
                    .object,
                )}
              >
                <mesh
                  {...transformProps(
                    world
                      .sea
                      .object,
                  )}
                >
                  <planeGeometry
                    args={[1, 1]}
                  />

                  <meshBasicMaterial
                    map={seaBg}
                    color="#ffffff"
                    toneMapped={
                      false
                    }
                  />
                </mesh>
              </group>
            </group>
          </group>
        )}
    </>
  );
}

/* =========================================================
   CAMERA
   ========================================================= */

function CameraTimeline({
  state,
  progressRef,
}) {
  const { camera } =
    useThree();

  const tracks =
    useMemo(
      () =>
        compileTracks(
          state,
          CAMERA_ID,
        ),
      [state],
    );

  useEffect(() => {
    const settings =
      getObjects(state)[
        CAMERA_ID
      ];

    if (!settings) {
      return;
    }

    camera.fov =
      settings.fov ?? 60;

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
     * Smooth scroll inertia.
     */
    progressRef.current.smooth =
      THREE.MathUtils.damp(
        progressRef.current.smooth,
        progressRef.current.target,
        4.2,
        delta,
      );

    /*
     * Camera original Peach:
     * 0 -> 0.811831862...
     */
    const cameraProgress =
      progressRef.current.smooth
      * CAMERA_TRACK_END;

    applyTransform(
      camera,
      tracks,
      cameraProgress,
    );

    camera.updateMatrixWorld();
  });

  return null;
}

/* =========================================================
   FISH
   ========================================================= */

function Fish({
  state,
  progressRef,
}) {
  const gltf =
    useGLTF(FISH_URL);

  const model =
    useMemo(
      () =>
        clone(gltf.scene),
      [gltf.scene],
    );

  const rigRef =
    useRef();

  const tracks =
    useMemo(
      () =>
        compileTracks(
          state,
          FISH_RIG_ID,
        ),
      [state],
    );

  const { actions } =
    useAnimations(
      gltf.animations,
      model,
    );

  useEffect(() => {
    const action =
      actions[FISH_CLIP]
      ?? Object
        .values(actions)
        .find(Boolean);

    if (!action) {
      return;
    }

    action.reset();

    action.enabled = true;

    action.setLoop(
      THREE.LoopRepeat,
      Infinity,
    );

    action.setEffectiveTimeScale(
      1,
    );

    action.play();

    return () => {
      action.stop();
    };
  }, [actions]);

  useFrame(() => {
    /*
     * fish-RIG original Peach:
     * 0 -> 0.451
     *
     * Không cho fish track chạy sang
     * phần không tồn tại.
     */
    const fishProgress =
      Math.min(
        progressRef
          .current
          .smooth
          * FISH_TRACK_END,
        FISH_TRACK_END,
      );

    applyTransform(
      rigRef.current,
      tracks,
      fishProgress,
    );
  });

  return (
    <group ref={rigRef}>
      <primitive
        object={model}
        position={[
          0,
          0,
          0,
        ]}
        scale={[
          3.8,
          3.8,
          3.8,
        ]}
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

/* =========================================================
   COMPLETE SCENE
   ========================================================= */

function Scene({
  state,
  progressRef,
  mobile,
}) {
  return (
    <>
      <color
        attach="background"
        args={[
          '#05002a',
        ]}
      />

      <PeachWorld
        state={state}
        mobile={mobile}
      />

      <ambientLight
        intensity={2.6}
        color="#ffffff"
      />

      <directionalLight
        position={[
          3,
          4,
          5,
        ]}
        intensity={2.6}
        color="#ffffff"
      />

      <directionalLight
        position={[
          -3,
          1,
          4,
        ]}
        intensity={0.9}
        color="#ffd1e7"
      />

      <CameraTimeline
        state={state}
        progressRef={
          progressRef
        }
      />

      <Fish
        state={state}
        progressRef={
          progressRef
        }
      />
    </>
  );
}

/* =========================================================
   HERO
   ========================================================= */

export default function PeachHeroClone() {
  const sectionRef =
    useRef(null);

  const progressRef =
    useRef({
      target: 0,
      smooth: 0,
    });

  const [state, setState] =
    useState(null);

  const [mobile, setMobile] =
    useState(() => {
      if (
        typeof window
        === 'undefined'
      ) {
        return true;
      }

      return window
        .matchMedia(
          '(max-width: 768px)',
        )
        .matches;
    });

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
      progressRef
        .current
        .target =
        THREE.MathUtils.clamp(
          value,
          0,
          1,
        );
    },
  );

  useEffect(() => {
    const query =
      window.matchMedia(
        '(max-width: 768px)',
      );

    const update = () => {
      setMobile(
        query.matches,
      );
    };

    query.addEventListener?.(
      'change',
      update,
    );

    return () => {
      query.removeEventListener?.(
        'change',
        update,
      );
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const url =
      mobile
        ? '/peach-v2/mobile.json'
        : '/peach-v2/desktop.json';

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Scene state: ${response.status}`,
          );
        }

        return response.json();
      })
      .then((data) => {
        if (!cancelled) {
          progressRef
            .current
            .target = 0;

          progressRef
            .current
            .smooth = 0;

          setState(data);
        }
      })
      .catch((error) => {
        console.error(
          '[Peach V2]',
          error,
        );
      });

    return () => {
      cancelled = true;
    };
  }, [mobile]);

  return (
    <section
      ref={sectionRef}
      className="lmv2-peach-clone"
    >
      <div className="lmv2-peach-clone__stage">

        {/* fallback chỉ hiện nếu WebGL chưa load */}
        <div
          className="lmv2-peach-clone__fallback"
          aria-hidden="true"
        />

        <div
          className="lmv2-peach-clone__canvas"
          aria-hidden="true"
        >
          {state && (
            <Canvas
              dpr={
                mobile
                  ? 1
                  : [1, 1.35]
              }
              camera={{
                position: [
                  0.8085,
                  12.537,
                  1.066,
                ],
                fov:
                  mobile
                    ? 60
                    : 40,
                near: 0.1,
                far: 1000,
              }}
              gl={{
                alpha: false,
                antialias:
                  !mobile,
                powerPreference:
                  'high-performance',
              }}
              onCreated={({
                gl,
              }) => {
                gl.outputColorSpace =
                  THREE.SRGBColorSpace;

                gl.toneMapping =
                  THREE.NoToneMapping;

                gl.toneMappingExposure =
                  1;
              }}
            >
              <Suspense
                fallback={null}
              >
                <Scene
                  state={state}
                  progressRef={
                    progressRef
                  }
                  mobile={mobile}
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

useTexture.preload(
  MOBILE_BG,
);

useTexture.preload(
  DESKTOP_BG,
);

useTexture.preload(
  SEA_BG,
);
