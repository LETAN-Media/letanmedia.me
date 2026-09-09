import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import * as THREE from 'three';

import { Canvas } from '@react-three/fiber';

import {
  Environment,
  MeshReflectorMaterial,
  useAnimations,
  useGLTF,
  useTexture,
} from '@react-three/drei';

import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

const FISH_URL = '/peach-v2/clownfish.glb';
const BG_URL = '/peach-v2/bg1.webp';
const HDR_URL = '/peach-v2/kloofendal.hdr';

const FISH_CLIP = 'Fish|swim_B3';

/*
 * Values below are taken directly from Peach scene-state.
 */

/* Main camera at scene progress 0 */
const CAMERA_POSITION = [
  0.8085885910888267,
  12.5369722996017,
  1.066177826017281,
];

/* HERO group */
const HERO_POSITION = [
  0.5450422853332596,
  12.425514354706523,
  -0.18263867256716135,
];

/* fish-RIG at progress 0 */
const FISH_RIG_POSITION = [
  0.8001522665569462,
  12.553194213315612,
  0.013177336827769781,
];

const FISH_RIG_SCALE = [1.5, 1.5, 1.5];

/* Imported clownfish model */
const FISH_MODEL_SCALE = [3.8, 3.8, 3.8];

const FISH_MODEL_ROTATION = [
  Math.PI,
  -1.4675304587190388,
  Math.PI,
];

function useMobile() {
  const [mobile, setMobile] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia(
      '(max-width: 768px)',
    ).matches;
  });

  useEffect(() => {
    const query = window.matchMedia(
      '(max-width: 768px)',
    );

    const update = () => {
      setMobile(query.matches);
    };

    update();

    query.addEventListener?.('change', update);

    return () => {
      query.removeEventListener?.(
        'change',
        update,
      );
    };
  }, []);

  return mobile;
}

function FishSpotlight() {
  const lightRef = useRef(null);

  const target = useMemo(
    () => new THREE.Object3D(),
    [],
  );

  useEffect(() => {
    const position = new THREE.Vector3(
      0.18185443873467233,
      0.14088883849114886,
      0.0679594701523687,
    );

    const rotation = new THREE.Euler(
      0.2281847726943441,
      -0.3027543441563901,
      -0.909054145931825,
      'XYZ',
    );

    const direction = new THREE.Vector3(
      0,
      0,
      -1,
    ).applyEuler(rotation);

    target.position
      .copy(position)
      .add(direction);

    if (lightRef.current) {
      lightRef.current.target = target;
    }
  }, [target]);

  return (
    <>
      <spotLight
        ref={lightRef}
        position={[
          0.18185443873467233,
          0.14088883849114886,
          0.0679594701523687,
        ]}
        color="#ffffff"
        intensity={3}
        distance={0.5}
        decay={2.73}
        angle={0.4852015320544236}
        penumbra={0.5235987755982988}
        castShadow={false}
      />

      <primitive object={target} />
    </>
  );
}

function OriginalFish() {
  const gltf = useGLTF(FISH_URL);

  const model = useMemo(
    () => clone(gltf.scene),
    [gltf.scene],
  );

  const {
    actions,
  } = useAnimations(
    gltf.animations,
    model,
  );

  useEffect(() => {
    const action =
      actions[FISH_CLIP]
      ?? Object.values(actions).find(Boolean);

    if (!action) {
      return undefined;
    }

    action
      .reset()
      .setLoop(
        THREE.LoopRepeat,
        Infinity,
      )
      .setEffectiveTimeScale(1)
      .play();

    return () => {
      action.stop();
    };
  }, [actions]);

  return (
    <group
      position={FISH_RIG_POSITION}
      scale={FISH_RIG_SCALE}
    >
      <primitive
        object={model}
        position={[0, 0, 0]}
        scale={FISH_MODEL_SCALE}
        rotation={FISH_MODEL_ROTATION}
        dispose={null}
      />

      <FishSpotlight />
    </group>
  );
}

function GlassSphere({
  position,
  scale,
  heightSegments = 16,
}) {
  return (
    <mesh
      position={position}
      scale={scale}
    >
      <sphereGeometry
        args={[
          0.5,
          32,
          heightSegments,
          0,
          Math.PI,
          0,
          Math.PI,
        ]}
      />

      <meshPhysicalMaterial
        color="#ffffff"
        roughness={0.221}
        metalness={0.0902}
        transmission={1}
        thickness={20}
        ior={1}
        reflectivity={0.2458}
        sheen={0.5763}
        sheenColor="#ffffff"
        sheenRoughness={0.19}
        clearcoat={0}
        clearcoatRoughness={0.1912}
        transparent={false}
      />
    </mesh>
  );
}

function OriginalHeroObjects({
  mobile,
}) {
  const bgTexture =
    useTexture(BG_URL);

  useEffect(() => {
    bgTexture.colorSpace =
      THREE.SRGBColorSpace;

    bgTexture.needsUpdate = true;
  }, [bgTexture]);

  return (
    <group position={HERO_POSITION}>

      {/* Original PinkBG */}
      <mesh
        position={[
          0.33878899067811336,
          0.8356279050730874,
          -0.5678102796712403,
        ]}
        scale={[
          3.741327032150915,
          1.7685953469011992,
          0.1,
        ]}
      >
        <planeGeometry args={[1, 1]} />

        <meshBasicMaterial
          color="#ffcfe9"
          toneMapped={false}
        />
      </mesh>

      {/* Original main BG / bg1.webp */}
      <mesh
        position={[
          0.1924380384462598,
          0.494,
          0.017001275902049997,
        ]}
        scale={[
          1.010985245748118,
          1.0949624429802267,
          0.1,
        ]}
      >
        <planeGeometry args={[1, 1]} />

        <meshBasicMaterial
          map={bgTexture}
          color="#ffffff"
          toneMapped={false}
        />
      </mesh>

      {/* Original water surface */}
      <mesh
        position={[
          -0.5450422853332596,
          -0.05163649656118352,
          0.1826386725671638,
        ]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
        scale={[
          6.330009921051265,
          1.723949954275208,
          5,
        ]}
      >
        <planeGeometry args={[1, 1]} />

        <MeshReflectorMaterial
          color="#f2e5ff"
          resolution={
            mobile ? 256 : 512
          }
          mirror={0.6262626262626263}
          mixStrength={1}
          mixBlur={0}
          roughness={0.2}
          metalness={0}
          depthScale={0}
        />
      </mesh>

      {/* Original glass sphere 1 */}
      <GlassSphere
        position={[
          0.4164094697827221,
          0.001,
          0.15638286274340404,
        ]}
        scale={[
          0.1,
          0.1,
          0.1,
        ]}
      />

      {/* Original glass sphere 2 */}
      <GlassSphere
        position={[
          0.0861400000029839,
          0.31508627455205984,
          0.3855843515644092,
        ]}
        scale={[
          0.15,
          0.15,
          0.15,
        ]}
        heightSegments={20}
      />

    </group>
  );
}

function PeachScene() {
  const mobile = useMobile();

  return (
    <Canvas
      dpr={
        mobile
          ? 1
          : [1, 1.5]
      }
      camera={{
        position: CAMERA_POSITION,
        fov: mobile ? 60 : 40,
        near: 0.1,
        far: 1000,
      }}
      gl={{
        antialias: !mobile,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      onCreated={({
        gl,
        scene,
      }) => {
        gl.outputColorSpace =
          THREE.SRGBColorSpace;

        gl.toneMapping =
          THREE.ACESFilmicToneMapping;

        gl.toneMappingExposure = 1;

        scene.background =
          new THREE.Color('#ffcfe9');
      }}
    >
      {/* Original scene ambient */}
      <ambientLight
        color="#ffffff"
        intensity={2.3}
      />

      <Environment
        files={HDR_URL}
        background={false}
        environmentIntensity={2}
        environmentRotation={[
          0,
          2.607870968329927,
          0,
        ]}
      />

      <OriginalHeroObjects
        mobile={mobile}
      />

      <OriginalFish />
    </Canvas>
  );
}

export default function PeachHeroClone() {
  return (
    <section className="lmv2-peach-clone">
      <div className="lmv2-peach-clone__canvas">
        <Suspense
          fallback={
            <div className="lmv2-peach-clone__fallback" />
          }
        >
          <PeachScene />
        </Suspense>
      </div>
    </section>
  );
}

useGLTF.preload(FISH_URL);
useTexture.preload(BG_URL);
