import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  MeshReflectorMaterial,
  useAnimations,
  useGLTF,
  useTexture,
  useVideoTexture,
} from '@react-three/drei';
import {
  Bloom,
  EffectComposer,
  HueSaturation,
  Noise,
} from '@react-three/postprocessing';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

const FISH_URL =
  '/models/peach/abb4e548-5cc1-4e76-b6e3-209372a6efa3-clown-5-v1.glb';

const JELLY_URL =
  '/models/peach/dff62667-7a94-4084-bc4d-2667d81b8cf2-jelly-v2.glb';

const PARTICLE_URL =
  '/models/peach/particle.glb';

const HDR_URL =
  '/models/peach/kloofendal.hdr';

const IDS = {
  camera: 'ea94b165-c53b-4704-87a9-1633ae09cd51',
  hero: '5e38fb60-88e1-4278-9175-12d154ea3783',
  underworld: 'a7380b60-6007-46d1-b4bf-9b4ba6bf1749',

  fishRig: '70a64fb1-6bef-4fe7-8965-8ff389049050',
  fish: '480aae7d-371f-4934-9033-698109657d31',

  fishLight: 'd60f992a-3010-4136-a042-2d4c5da0a055',
  rootLight: '0162d524-d7c0-4e60-8344-8305162c606e',
  warmLight: 'f7bafa89-2bf1-4848-9ee5-186e76f03b1d',

  bgs: '68e8cbae-ebcb-46a4-b4ac-0b301be72719',
  bgsInner: '02110a5b-46ab-4098-a8f4-5497f669c8f4',
  seaBg: '3c47f142-985b-4338-b406-d740eff9e580',
  waterVideo: '485fe111-827b-4abc-bbae-3690abe88279',
  raysVideo: '0e0baf47-baed-4564-8a4c-7b26c6ecde21',
};

const clamp01 = (value) =>
  THREE.MathUtils.clamp(value, 0, 1);

const vectorArray = (value, fallback = [0, 0, 0]) => [
  value?.x ?? fallback[0],
  value?.y ?? fallback[1],
  value?.z ?? fallback[2],
];

const transformProps = (object) => ({
  position: vectorArray(object?.position),
  rotation: vectorArray(object?.rotation),
  scale: vectorArray(object?.scale, [1, 1, 1]),
});

const objectById = (sceneState, id) =>
  sceneState?.engineState?.pwObjects?.[id] ?? null;

const objectsByName = (sceneState, name) =>
  Object.values(
    sceneState?.engineState?.pwObjects ?? {},
  ).filter((object) => object?.name === name);

const objectByName = (sceneState, name) =>
  objectsByName(sceneState, name)[0] ?? null;

/* ============================================================
   PEACH SCENE STATE LOADER
   ============================================================ */

const sceneStateCache = new Map();

async function fetchSceneState(mode) {
  if (sceneStateCache.has(mode)) {
    return sceneStateCache.get(mode);
  }

  const url =
    mode === 'mobile'
      ? '/peach/scene/mobile.json'
      : '/peach/scene/desktop.json';

  const request = fetch(url, {
    cache: 'force-cache',
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(
        `Scene state ${mode} failed: ${response.status}`,
      );
    }

    return response.json();
  });

  sceneStateCache.set(mode, request);

  return request;
}

function usePeachSceneState() {
  const [mode, setMode] = useState(() => {
    if (typeof window === 'undefined') {
      return 'desktop';
    }

    return window.innerWidth <= 768
      ? 'mobile'
      : 'desktop';
  });

  const [sceneState, setSceneState] = useState(null);

  useEffect(() => {
    const updateMode = () => {
      const nextMode =
        window.innerWidth <= 768
          ? 'mobile'
          : 'desktop';

      setMode((current) =>
        current === nextMode
          ? current
          : nextMode
      );
    };

    updateMode();

    window.addEventListener(
      'resize',
      updateMode,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        'resize',
        updateMode,
      );
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchSceneState(mode)
      .then((state) => {
        if (!cancelled) {
          setSceneState(state);
        }
      })
      .catch((error) => {
        console.error('[PeachScene]', error);
      });

    return () => {
      cancelled = true;
    };
  }, [mode]);

  return {
    sceneState,
    isMobile: mode === 'mobile',
  };
}

/* ============================================================
   THEATRE / PEACH KEYFRAME EVALUATION

   Peach stores handles:
   [incomingX, incomingY, outgoingX, outgoingY]

   Segment:
   current outgoing -> next incoming.
   ============================================================ */

const cubic = (t, p0, p1, p2, p3) => {
  const inv = 1 - t;

  return (
    inv * inv * inv * p0
    + 3 * inv * inv * t * p1
    + 3 * inv * t * t * p2
    + t * t * t * p3
  );
};

const cubicDerivative = (t, p0, p1, p2, p3) => {
  const inv = 1 - t;

  return (
    3 * inv * inv * (p1 - p0)
    + 6 * inv * t * (p2 - p1)
    + 3 * t * t * (p3 - p2)
  );
};

function cubicBezierEase(
  progress,
  x1,
  y1,
  x2,
  y2,
) {
  if (
    Math.abs(x1 - y1) < 0.000001
    && Math.abs(x2 - y2) < 0.000001
  ) {
    return progress;
  }

  let t = progress;

  for (let iteration = 0; iteration < 7; iteration += 1) {
    const currentX = cubic(
      t,
      0,
      x1,
      x2,
      1,
    );

    const derivative = cubicDerivative(
      t,
      0,
      x1,
      x2,
      1,
    );

    const error = currentX - progress;

    if (Math.abs(error) < 0.00001) {
      break;
    }

    if (Math.abs(derivative) < 0.00001) {
      break;
    }

    t = clamp01(
      t - error / derivative,
    );
  }

  return cubic(
    t,
    0,
    y1,
    y2,
    1,
  );
}

function compileTrack(
  sceneState,
  objectId,
  propertyPath,
) {
  const sequence =
    sceneState
      ?.animations
      ?.sheetsById
      ?.DEFAULT_ANIMATION_SHEET_NAME
      ?.sequence;

  const objectTracks =
    sequence
      ?.tracksByObject
      ?.[objectId];

  if (!objectTracks) {
    return null;
  }

  const pathKey = JSON.stringify(propertyPath);

  const trackId =
    objectTracks
      ?.trackIdByPropPath
      ?.[pathKey];

  if (!trackId) {
    return null;
  }

  const track =
    objectTracks
      ?.trackData
      ?.[trackId];

  if (!track) {
    return null;
  }

  return Object.values(
    track
      ?.keyframes
      ?.byId
      ?? {},
  ).sort(
    (a, b) =>
      a.position - b.position,
  );
}

function evaluateTrack(
  keyframes,
  progress,
  fallback,
) {
  if (!keyframes?.length) {
    return fallback;
  }

  if (progress <= keyframes[0].position) {
    return keyframes[0].value;
  }

  const last =
    keyframes[keyframes.length - 1];

  if (progress >= last.position) {
    return last.value;
  }

  for (
    let index = 0;
    index < keyframes.length - 1;
    index += 1
  ) {
    const current = keyframes[index];
    const next = keyframes[index + 1];

    if (
      progress < current.position
      || progress > next.position
    ) {
      continue;
    }

    const length =
      next.position - current.position;

    if (length <= 0.000001) {
      return next.value;
    }

    const localProgress =
      (progress - current.position)
      / length;

    if (current.connectedRight === false) {
      return current.value;
    }

    const currentHandles =
      current.handles ?? [1, 1, 0, 0];

    const nextHandles =
      next.handles ?? [1, 1, 0, 0];

    const eased = cubicBezierEase(
      localProgress,
      currentHandles[2],
      currentHandles[3],
      nextHandles[0],
      nextHandles[1],
    );

    if (
      typeof current.value === 'number'
      && typeof next.value === 'number'
    ) {
      return THREE.MathUtils.lerp(
        current.value,
        next.value,
        eased,
      );
    }

    return eased < 0.5
      ? current.value
      : next.value;
  }

  return fallback;
}

function compileTransformTimeline(
  sceneState,
  objectId,
) {
  const compile = (group, axis) =>
    compileTrack(
      sceneState,
      objectId,
      [group, axis],
    );

  return {
    position: {
      x: compile('position', 'x'),
      y: compile('position', 'y'),
      z: compile('position', 'z'),
    },
    rotation: {
      x: compile('rotation', 'x'),
      y: compile('rotation', 'y'),
      z: compile('rotation', 'z'),
    },
    scale: {
      x: compile('scale', 'x'),
      y: compile('scale', 'y'),
      z: compile('scale', 'z'),
    },
  };
}

function applyTimelineTransform(
  target,
  timeline,
  base,
  progress,
) {
  if (!target || !base) return;

  const basePosition =
    base.position ?? { x: 0, y: 0, z: 0 };

  const baseRotation =
    base.rotation ?? { x: 0, y: 0, z: 0 };

  const baseScale =
    base.scale ?? { x: 1, y: 1, z: 1 };

  target.position.set(
    evaluateTrack(
      timeline.position.x,
      progress,
      basePosition.x,
    ),
    evaluateTrack(
      timeline.position.y,
      progress,
      basePosition.y,
    ),
    evaluateTrack(
      timeline.position.z,
      progress,
      basePosition.z,
    ),
  );

  target.rotation.set(
    evaluateTrack(
      timeline.rotation.x,
      progress,
      baseRotation.x,
    ),
    evaluateTrack(
      timeline.rotation.y,
      progress,
      baseRotation.y,
    ),
    evaluateTrack(
      timeline.rotation.z,
      progress,
      baseRotation.z,
    ),
  );

  target.scale.set(
    evaluateTrack(
      timeline.scale.x,
      progress,
      baseScale.x,
    ),
    evaluateTrack(
      timeline.scale.y,
      progress,
      baseScale.y,
    ),
    evaluateTrack(
      timeline.scale.z,
      progress,
      baseScale.z,
    ),
  );
}

/* ============================================================
   TIMELINE GROUP
   ============================================================ */

function TimelineGroup({
  sceneState,
  objectId,
  progress,
  reduceMotion,
  children,
}) {
  const ref = useRef(null);

  const base = useMemo(
    () => objectById(sceneState, objectId),
    [sceneState, objectId],
  );

  const timeline = useMemo(
    () =>
      compileTransformTimeline(
        sceneState,
        objectId,
      ),
    [sceneState, objectId],
  );

  useFrame(() => {
    if (!ref.current || !base) return;

    const currentProgress =
      reduceMotion
        ? 0
        : clamp01(
          typeof progress?.get === 'function'
            ? progress.get()
            : 0,
        );

    applyTimelineTransform(
      ref.current,
      timeline,
      base,
      currentProgress,
    );
  });

  if (!base) {
    return null;
  }

  return (
    <group
      ref={ref}
      {...transformProps(base)}
    >
      {children}
    </group>
  );
}

/* ============================================================
   CAMERA — USE ORIGINAL PEACH KEYFRAMES
   ============================================================ */

function PeachCamera({
  sceneState,
  progress,
  reduceMotion,
}) {
  const cameraConfig = useMemo(
    () =>
      objectById(
        sceneState,
        IDS.camera,
      ),
    [sceneState],
  );

  const timeline = useMemo(
    () =>
      compileTransformTimeline(
        sceneState,
        IDS.camera,
      ),
    [sceneState],
  );

  useFrame(({ camera }) => {
    if (!cameraConfig) return;

    const currentProgress =
      reduceMotion
        ? 0
        : clamp01(
          typeof progress?.get === 'function'
            ? progress.get()
            : 0,
        );

    const pseudoTarget = {
      position: camera.position,
      rotation: camera.rotation,
      scale: camera.scale,
    };

    applyTimelineTransform(
      pseudoTarget,
      timeline,
      cameraConfig,
      currentProgress,
    );

    const expectedFov =
      cameraConfig.fov ?? 40;

    if (camera.fov !== expectedFov) {
      camera.fov = expectedFov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

/* ============================================================
   GLTF INSTANCE
   ============================================================ */

function ImportedModel({
  url,
  config,
  clipName,
  speed = 1,
  loop = true,
  sceneState,
  progress,
  reduceMotion,
  timelineObjectId,
}) {
  const ref = useRef(null);

  const {
    scene,
    animations,
  } = useGLTF(url);

  const instance = useMemo(() => {
    const cloned = clone(scene);

    cloned.traverse((object) => {
      if (
        !object.isMesh
        && !object.isSkinnedMesh
      ) {
        return;
      }

      object.frustumCulled = false;

      const materials =
        Array.isArray(object.material)
          ? object.material
          : [object.material];

      materials.forEach((material) => {
        if (!material) return;

        if ('envMapIntensity' in material) {
          material.envMapIntensity = 3;
        }

        material.needsUpdate = true;
      });
    });

    return cloned;
  }, [scene]);

  const {
    actions,
  } = useAnimations(
    animations,
    ref,
  );

  const timeline = useMemo(
    () =>
      timelineObjectId
        ? compileTransformTimeline(
          sceneState,
          timelineObjectId,
        )
        : null,
    [sceneState, timelineObjectId],
  );

  useEffect(() => {
    if (!clipName) return undefined;

    const action =
      actions?.[clipName]
      || Object.values(actions ?? {})[0];

    if (!action) return undefined;

    action.reset();

    action.timeScale = speed;

    action.setLoop(
      loop
        ? THREE.LoopRepeat
        : THREE.LoopOnce,
      loop
        ? Infinity
        : 1,
    );

    action.play();

    return () => {
      action.stop();
    };
  }, [
    actions,
    clipName,
    loop,
    speed,
  ]);

  useFrame(() => {
    if (
      !ref.current
      || !config
      || !timeline
    ) {
      return;
    }

    const currentProgress =
      reduceMotion
        ? 0
        : clamp01(
          typeof progress?.get === 'function'
            ? progress.get()
            : 0,
        );

    applyTimelineTransform(
      ref.current,
      timeline,
      config,
      currentProgress,
    );
  });

  if (!config) {
    return null;
  }

  return (
    <group
      ref={ref}
      visible={config.visible !== false}
      {...transformProps(config)}
    >
      <primitive object={instance} />
    </group>
  );
}

/* ============================================================
   GLASS SPHERES
   ============================================================ */

function GlassSphere({ config }) {
  if (!config) return null;

  return (
    <mesh
      {...transformProps(config)}
    >
      <sphereGeometry
        args={[
          config.geometry?.radius ?? 0.5,
          config.geometry?.widthSegments ?? 32,
          config.geometry?.heightSegments ?? 20,
        ]}
      />

      <meshPhysicalMaterial
        color="#ffffff"
        transmission={1}
        thickness={20}
        roughness={0.221}
        metalness={0.0902}
        reflectivity={0.2458}
        sheen={0.5763}
        sheenColor="#ffffff"
        sheenRoughness={0.19}
        clearcoatRoughness={0.1912}
        specularIntensity={1}
        envMapIntensity={3}
      />
    </mesh>
  );
}

/* ============================================================
   HERO WATER
   ============================================================ */

function PeachWater({
  config,
  isMobile,
}) {
  if (!config) return null;

  return (
    <mesh
      {...transformProps(config)}
    >
      <planeGeometry args={[1, 1]} />

      <MeshReflectorMaterial
        color={config.color ?? '#f2e5ff'}
        mirror={config.reflectivity ?? 0.62}
        resolution={isMobile ? 256 : 512}
        blur={[180, 80]}
        mixBlur={1}
        mixStrength={1.8}
        roughness={0.22}
        metalness={0.04}
        depthScale={0.4}
        minDepthThreshold={0.25}
        maxDepthThreshold={1.4}
      />
    </mesh>
  );
}

/* ============================================================
   HERO BACKGROUND
   ============================================================ */

function PeachHeroWorld({
  sceneState,
  isMobile,
  progress,
  reduceMotion,
}) {
  const hero =
    objectById(
      sceneState,
      IDS.hero,
    );

  const mainBg =
    objectByName(
      sceneState,
      'main BG',
    );

  const pinkBg =
    objectByName(
      sceneState,
      'PinkBG',
    );

  const gray =
    objectByName(
      sceneState,
      'gray',
    );

  const particle =
    objectByName(
      sceneState,
      'particle',
    );

  const spheres =
    objectsByName(
      sceneState,
      'Sphere',
    );

  const waters =
    objectsByName(
      sceneState,
      'Water',
    );

  const mainBgTexture =
    useTexture(
      isMobile
        ? '/images/peach/main-bg-mobile.webp'
        : '/images/peach/main-bg-desktop.webp',
    );

  const alphaGradient =
    useTexture(
      '/images/peach/alpha-gradient2.jpg',
    );

  useEffect(() => {
    mainBgTexture.colorSpace =
      THREE.SRGBColorSpace;

    mainBgTexture.needsUpdate = true;
  }, [mainBgTexture]);

  if (!hero) return null;

  return (
    <group {...transformProps(hero)}>
      {pinkBg && (
        <mesh {...transformProps(pinkBg)}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#ffcfe9"
            toneMapped={false}
          />
        </mesh>
      )}

      {mainBg && (
        <mesh {...transformProps(mainBg)}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={mainBgTexture}
            toneMapped={false}
          />
        </mesh>
      )}

      {waters.map((water) => (
        <PeachWater
          key={water.uuid}
          config={water}
          isMobile={isMobile}
        />
      ))}

      {spheres.map((sphere) => (
        <GlassSphere
          key={sphere.uuid}
          config={sphere}
        />
      ))}

      {gray && (
        <mesh {...transformProps(gray)}>
          <planeGeometry args={[1, 1]} />

          <meshBasicMaterial
            color="#d6d8e2"
            alphaMap={alphaGradient}
            transparent
            toneMapped={false}
          />
        </mesh>
      )}

      {particle && (
        <ImportedModel
          url={PARTICLE_URL}
          config={particle}
          clipName={
            particle.animation?.clipName
            || 'Scene'
          }
          speed={
            particle.animation?.speed ?? 1
          }
          loop
          sceneState={sceneState}
          progress={progress}
          reduceMotion={reduceMotion}
        />
      )}
    </group>
  );
}

/* ============================================================
   VIDEO LAYERS — ORIGINAL WATER/RAYS
   ============================================================ */

function VideoLayer({
  config,
  src,
  color,
  opacity,
}) {
  const texture = useVideoTexture(
    src,
    {
      muted: true,
      loop: true,
      start: true,
      playsInline: true,
      crossOrigin: 'anonymous',
    },
  );

  if (!config) return null;

  return (
    <mesh {...transformProps(config)}>
      <planeGeometry args={[1, 1]} />

      <meshStandardMaterial
        color={color}
        alphaMap={texture}
        transparent
        opacity={opacity}
        roughness={1}
        metalness={0}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ============================================================
   UNDERWATER WORLD
   ============================================================ */

function PeachUnderworld({
  sceneState,
  progress,
  reduceMotion,
}) {
  const underworld =
    objectById(
      sceneState,
      IDS.underworld,
    );

  const bgs =
    objectById(
      sceneState,
      IDS.bgs,
    );

  const inner =
    objectById(
      sceneState,
      IDS.bgsInner,
    );

  const seaBg =
    objectById(
      sceneState,
      IDS.seaBg,
    );

  const waterLayer =
    objectById(
      sceneState,
      IDS.waterVideo,
    );

  const raysLayer =
    objectById(
      sceneState,
      IDS.raysVideo,
    );

  const jellyObjects =
    objectsByName(
      sceneState,
      'jelly2',
    );

  const seaTexture =
    useTexture(
      '/images/peach/sea-bg.webp',
    );

  useEffect(() => {
    seaTexture.colorSpace =
      THREE.SRGBColorSpace;

    seaTexture.needsUpdate = true;
  }, [seaTexture]);

  if (!underworld) return null;

  return (
    <group {...transformProps(underworld)}>
      {bgs && (
        <group {...transformProps(bgs)}>
          {inner && seaBg && (
            <group {...transformProps(inner)}>
              <mesh {...transformProps(seaBg)}>
                <planeGeometry args={[1, 1]} />

                <meshBasicMaterial
                  map={seaTexture}
                  toneMapped={false}
                />
              </mesh>
            </group>
          )}

          <VideoLayer
            config={waterLayer}
            src="/peach/video/water2.mp4"
            color="#1f9eff"
            opacity={0.66}
          />

          <VideoLayer
            config={raysLayer}
            src="/peach/video/rays-2b.mp4"
            color="#6abeff"
            opacity={0.56}
          />
        </group>
      )}

      {jellyObjects.map((jelly) => (
        <ImportedModel
          key={jelly.uuid}
          url={JELLY_URL}
          config={jelly}
          clipName={
            jelly.animation?.clipName
            || 'jellyfish|move_1'
          }
          speed={
            jelly.animation?.speed ?? 1
          }
          loop
          sceneState={sceneState}
          progress={progress}
          reduceMotion={reduceMotion}
          timelineObjectId={jelly.uuid}
        />
      ))}

      <pointLight
        position={[-0.34, -0.02, -0.30]}
        intensity={5}
        color="#00ffff"
        distance={20}
        decay={2}
      />

      <pointLight
        position={[0.24, -0.18, -0.30]}
        intensity={10.37}
        color="#00ffff"
        distance={20}
        decay={2}
      />

      <pointLight
        position={[0.50, -0.05, -0.30]}
        intensity={10.37}
        color="#d969ff"
        distance={3}
        decay={1.76}
      />
    </group>
  );
}

/* ============================================================
   FISH + ORIGINAL FISH-RIG TIMELINE
   ============================================================ */

function PeachFish({
  sceneState,
  progress,
  reduceMotion,
}) {
  const fishConfig =
    objectById(
      sceneState,
      IDS.fish,
    );

  const fishLight =
    objectById(
      sceneState,
      IDS.fishLight,
    );

  if (!fishConfig) return null;

  return (
    <TimelineGroup
      sceneState={sceneState}
      objectId={IDS.fishRig}
      progress={progress}
      reduceMotion={reduceMotion}
    >
      <ImportedModel
        url={FISH_URL}
        config={fishConfig}
        clipName={
          fishConfig.animation?.clipName
          || 'Fish|swim_B3'
        }
        speed={
          fishConfig.animation?.speed ?? 1
        }
        loop
        sceneState={sceneState}
        progress={progress}
        reduceMotion={reduceMotion}
        timelineObjectId={IDS.fish}
      />

      {fishLight && (
        <TimelineGroup
          sceneState={sceneState}
          objectId={IDS.fishLight}
          progress={progress}
          reduceMotion={reduceMotion}
        >
          <pointLight
            intensity={3}
            color="#ffffff"
            distance={0.5}
            decay={2.73}
          />
        </TimelineGroup>
      )}
    </TimelineGroup>
  );
}

/* ============================================================
   ROOT JELLY + ROOT LIGHTS
   ============================================================ */

function RootObjects({
  sceneState,
  progress,
  reduceMotion,
}) {
  const jelly =
    objectByName(
      sceneState,
      'jelly',
    );

  const rootLight =
    objectById(
      sceneState,
      IDS.rootLight,
    );

  const warmLight =
    objectById(
      sceneState,
      IDS.warmLight,
    );

  return (
    <>
      {jelly && (
        <ImportedModel
          url={JELLY_URL}
          config={jelly}
          clipName={
            jelly.animation?.clipName
            || 'jellyfish|move_1'
          }
          speed={jelly.animation?.speed ?? 1}
          loop
          sceneState={sceneState}
          progress={progress}
          reduceMotion={reduceMotion}
          timelineObjectId={jelly.uuid}
        />
      )}

      {rootLight && (
        <pointLight
          position={vectorArray(rootLight.position)}
          intensity={rootLight.intensity ?? 5}
          color={rootLight.color ?? '#00beff'}
          distance={rootLight.distance ?? 2}
          decay={rootLight.decay ?? 4.68}
        />
      )}

      {warmLight && (
        <pointLight
          position={vectorArray(warmLight.position)}
          intensity={8}
          color={warmLight.color ?? '#ff5800'}
          distance={warmLight.distance ?? 9}
          decay={warmLight.decay ?? 1.02}
        />
      )}
    </>
  );
}

/* ============================================================
   POST PROCESSING
   ============================================================ */

function PeachPostFX() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.2}
        radius={0.35}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.025}
      />

      <Noise opacity={0.1} />

      <HueSaturation
        hue={0}
        saturation={0.1}
      />
    </EffectComposer>
  );
}

/* ============================================================
   SCENE
   ============================================================ */

function PeachScene({
  sceneState,
  isMobile,
  progress,
  reduceMotion,
}) {
  return (
    <>
      <PeachCamera
        sceneState={sceneState}
        progress={progress}
        reduceMotion={reduceMotion}
      />

      <Environment
        files={HDR_URL}
        background={false}
        environmentIntensity={3}
        environmentRotation={[0, Math.PI * 2, 0]}
      />

      <PeachHeroWorld
        sceneState={sceneState}
        isMobile={isMobile}
        progress={progress}
        reduceMotion={reduceMotion}
      />

      <PeachUnderworld
        sceneState={sceneState}
        progress={progress}
        reduceMotion={reduceMotion}
      />

      <PeachFish
        sceneState={sceneState}
        progress={progress}
        reduceMotion={reduceMotion}
      />

      <RootObjects
        sceneState={sceneState}
        progress={progress}
        reduceMotion={reduceMotion}
      />

      <PeachPostFX />
    </>
  );
}

/* ============================================================
   PUBLIC COMPONENT
   ============================================================ */

function Fish3D({
  progress,
  reduceMotion = false,
}) {
  const {
    sceneState,
    isMobile,
  } = usePeachSceneState();

  if (!sceneState) {
    return (
      <div
        className="lm-hero3d"
        aria-hidden="true"
      />
    );
  }

  const cameraConfig =
    objectById(
      sceneState,
      IDS.camera,
    );

  return (
    <div
      className="lm-hero3d"
      aria-hidden="true"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Canvas
        camera={{
          position: vectorArray(
            cameraConfig?.position,
            [0, 12.5, 1.06],
          ),
          fov:
            cameraConfig?.fov
            ?? (isMobile ? 60 : 40),
          near: cameraConfig?.near ?? 0.1,
          far: cameraConfig?.far ?? 1000,
        }}
        dpr={
          isMobile
            ? [1, 1.25]
            : [1, 1.5]
        }
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace =
            THREE.SRGBColorSpace;

          gl.toneMapping =
            THREE.ACESFilmicToneMapping;

          gl.toneMappingExposure = 1;
        }}
      >
        <Suspense fallback={null}>
          <PeachScene
            sceneState={sceneState}
            isMobile={isMobile}
            progress={progress}
            reduceMotion={reduceMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(FISH_URL);
useGLTF.preload(JELLY_URL);
useGLTF.preload(PARTICLE_URL);

export default Fish3D;
