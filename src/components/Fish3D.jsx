import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows,
  useAnimations,
  useGLTF,
} from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

const MODEL_URL = '/models/clownfish.glb';
const SWIM_ANIMATION = 'Fish|swim_B3';

const smoothstep = (t) => t * t * (3 - 2 * t);

const lerpVector = (a, b, t) => a.clone().lerp(b, t);

const PATH_POINTS = [
  new THREE.Vector3(-1.05, 0.72, 0.08),
  new THREE.Vector3(-0.25, 0.44, 0.02),
  new THREE.Vector3(0.72, 0.06, -0.03),
  new THREE.Vector3(0.18, -0.92, -0.08),
];

const getPathPoint = (progress) => {
  const p = THREE.MathUtils.clamp(progress, 0, 1);
  const segmentCount = PATH_POINTS.length - 1;
  const scaled = p * segmentCount;
  const index = Math.min(
    segmentCount - 1,
    Math.floor(scaled),
  );

  const localT = smoothstep(scaled - index);

  return lerpVector(
    PATH_POINTS[index],
    PATH_POINTS[index + 1],
    localT,
  );
};

const getPathTangent = (progress) => {
  const p1 = getPathPoint(Math.max(0, progress - 0.01));
  const p2 = getPathPoint(Math.min(1, progress + 0.01));

  return p2.sub(p1).normalize();
};

const applyFishMaterialTreatment = ({
  root,
  reflection = false,
}) => {
  root.traverse((object) => {
    if (!object.isMesh && !object.isSkinnedMesh) return;

    object.frustumCulled = false;
    object.castShadow = !reflection;
    object.receiveShadow = !reflection;

    const sourceMaterials = Array.isArray(object.material)
      ? object.material
      : [object.material];

    const nextMaterials = sourceMaterials.map((source) => {
      if (!source) return source;

      const material = source.clone();

      if (material.color) {
        material.color = reflection
          ? new THREE.Color('#f8e5f5')
          : new THREE.Color('#fffaf6');
      }

      if ('roughness' in material) {
        material.roughness = reflection ? 0.85 : 0.48;
      }

      if ('metalness' in material) {
        material.metalness = reflection ? 0.0 : 0.04;
      }

      if ('emissive' in material) {
        material.emissive = reflection
          ? new THREE.Color('#ffcde6')
          : new THREE.Color('#ffe3ef');

        material.emissiveIntensity = reflection ? 0.04 : 0.10;
      }

      material.transparent = reflection;
      material.opacity = reflection ? 0.22 : 1;
      material.depthWrite = !reflection;
      material.needsUpdate = true;

      return material;
    });

    object.material = Array.isArray(object.material)
      ? nextMaterials
      : nextMaterials[0];
  });
};

function CameraRig({ progress }) {
  useFrame((state, delta) => {
    const p =
      typeof progress?.get === 'function'
        ? THREE.MathUtils.clamp(progress.get(), 0, 1)
        : 0;

    const camera = state.camera;

    const targetX = THREE.MathUtils.lerp(0.0, 0.2, p);
    const targetY = THREE.MathUtils.lerp(0.08, -0.18, p);
    const targetZ = THREE.MathUtils.lerp(6.1, 5.35, p);

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      targetX,
      2.6,
      delta,
    );

    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      targetY,
      2.6,
      delta,
    );

    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetZ,
      2.6,
      delta,
    );

    const lookAt = new THREE.Vector3(
      THREE.MathUtils.lerp(0, 0.12, p),
      THREE.MathUtils.lerp(0.04, -0.12, p),
      0,
    );

    camera.lookAt(lookAt);
  });

  return null;
}

function FloatingDust() {
  const ref = useRef(null);

  const positions = useMemo(() => {
    const count = 42;
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      array[i * 3] = (Math.random() - 0.5) * 6.4;
      array[i * 3 + 1] = (Math.random() - 0.1) * 3.8;
      array[i * 3 + 2] = -1.8 - Math.random() * 2;
    }

    return array;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#fff6fb"
        transparent
        opacity={0.65}
        size={0.025}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function ScenicBackdrop() {
  return (
    <>
      <color attach="background" args={['#f6efec']} />

      {/* Soft global grading haze */}
      <mesh position={[0, 0.15, -3.9]}>
        <planeGeometry args={[10.2, 6.6]} />
        <meshBasicMaterial
          color="#f4ece9"
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Purple / pink lower grade */}
      <mesh position={[0, -1.5, -3.5]}>
        <planeGeometry args={[10, 3.2]} />
        <meshBasicMaterial
          color="#b987ff"
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Horizon line glow */}
      <mesh position={[0, -0.48, -2.7]}>
        <planeGeometry args={[8.5, 0.035]} />
        <meshBasicMaterial
          color="#e2b0ff"
          transparent
          opacity={0.86}
        />
      </mesh>

      {/* Dune / hill left */}
      <mesh position={[-1.85, -0.05, -2.4]} scale={[1.95, 0.7, 1.15]}>
        <sphereGeometry args={[1.1, 48, 48]} />
        <meshPhysicalMaterial
          color="#efc2ee"
          roughness={0.92}
          transmission={0}
          clearcoat={0.2}
        />
      </mesh>

      {/* Dune / hill right */}
      <mesh position={[1.75, -0.03, -2.35]} scale={[2.2, 0.76, 1.22]}>
        <sphereGeometry args={[1.2, 48, 48]} />
        <meshPhysicalMaterial
          color="#bfaef6"
          roughness={0.88}
          transmission={0}
          clearcoat={0.2}
        />
      </mesh>

      {/* Water surface */}
      <mesh
        position={[0, -0.95, -0.45]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[10, 6]} />
        <meshPhysicalMaterial
          color="#cc93ff"
          roughness={0.14}
          metalness={0.02}
          transmission={0.08}
          transparent
          opacity={0.46}
          clearcoat={0.75}
          clearcoatRoughness={0.12}
        />
      </mesh>

      {/* Water reflection glow */}
      <mesh
        position={[0, -1.02, -0.2]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[10, 4.5]} />
        <meshBasicMaterial
          color="#ffd0f1"
          transparent
          opacity={0.14}
        />
      </mesh>
    </>
  );
}

function GlassOrb() {
  const ref = useRef(null);

  useFrame((state, delta) => {
    if (!ref.current) return;

    ref.current.rotation.y += delta * 0.18;
    ref.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.45) * 0.08;
  });

  return (
    <group ref={ref} position={[-2.3, 0.95, -1.7]}>
      <mesh>
        <sphereGeometry args={[0.35, 48, 48]} />
        <meshPhysicalMaterial
          color="#fdeeff"
          roughness={0.02}
          transmission={0.96}
          thickness={1}
          transparent
          opacity={0.9}
          ior={1.22}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>

      <pointLight
        position={[0.18, 0.12, 0.36]}
        intensity={10}
        distance={3.2}
        color="#ffcdbf"
      />
    </group>
  );
}

function WaterOrb() {
  const ref = useRef(null);

  useFrame((state, delta) => {
    if (!ref.current) return;

    ref.current.rotation.y += delta * 0.45;
    ref.current.position.y =
      -0.39 + Math.sin(state.clock.elapsedTime * 0.72) * 0.02;
  });

  return (
    <group ref={ref} position={[1.5, -0.4, -0.35]}>
      <mesh>
        <sphereGeometry args={[0.26, 42, 42]} />
        <meshPhysicalMaterial
          color="#f8e8ff"
          roughness={0.04}
          transmission={0.98}
          thickness={1}
          transparent
          opacity={0.92}
          ior={1.22}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>

      <pointLight
        position={[0.1, 0.08, 0.18]}
        intensity={8}
        distance={2}
        color="#ffcab0"
      />
    </group>
  );
}

function WaterOrbReflection() {
  return (
    <group position={[1.5, -1.17, -0.28]} scale={[1, -1, 1]}>
      <mesh>
        <sphereGeometry args={[0.23, 36, 36]} />
        <meshBasicMaterial
          color="#ffd8f0"
          transparent
          opacity={0.18}
        />
      </mesh>
    </group>
  );
}

function FishInstance({
  progress,
  reflection = false,
  reduceMotion = false,
}) {
  const rootRef = useRef(null);

  const { scene, animations } = useGLTF(MODEL_URL);

  const fishScene = useMemo(() => {
    const cloned = clone(scene);

    applyFishMaterialTreatment({
      root: cloned,
      reflection,
    });

    return cloned;
  }, [scene, reflection]);

  const normalization = useMemo(() => {
    fishScene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(fishScene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    const maxDimension = Math.max(
      size.x,
      size.y,
      size.z,
      0.0001,
    );

    const scale = 3.55 / maxDimension;

    return {
      center,
      scale,
    };
  }, [fishScene]);

  const { actions } = useAnimations(
    animations,
    rootRef,
  );

  useEffect(() => {
    const swimAction =
      actions?.[SWIM_ANIMATION]
      || Object.values(actions || {})[0];

    if (!swimAction) return undefined;

    swimAction.reset();
    swimAction.setLoop(THREE.LoopRepeat, Infinity);
    swimAction.timeScale = reflection ? 0.86 : 0.92;
    swimAction.play();

    return () => {
      swimAction.stop();
    };
  }, [actions, reflection]);

  useFrame((state, delta) => {
    if (!rootRef.current) return;

    const raw =
      typeof progress?.get === 'function'
        ? progress.get()
        : 0;

    const p = THREE.MathUtils.clamp(raw, 0, 1);

    const point = getPathPoint(p);
    const tangent = getPathTangent(p);

    const idleFloat = reduceMotion
      ? 0
      : Math.sin(state.clock.elapsedTime * 1.24) * 0.028;

    const sideWave = reduceMotion
      ? 0
      : Math.sin(p * Math.PI * 2.4) * 0.08;

    const waterlineY = -0.48;

    const targetX = point.x + sideWave;
    const targetY = reflection
      ? (2 * waterlineY) - point.y - 0.05
      : point.y + idleFloat;
    const targetZ = reflection ? point.z + 0.04 : point.z;

    rootRef.current.position.x = THREE.MathUtils.damp(
      rootRef.current.position.x,
      targetX,
      4.8,
      delta,
    );

    rootRef.current.position.y = THREE.MathUtils.damp(
      rootRef.current.position.y,
      targetY,
      4.8,
      delta,
    );

    rootRef.current.position.z = THREE.MathUtils.damp(
      rootRef.current.position.z,
      targetZ,
      4.8,
      delta,
    );

    const yawFromPath =
      Math.atan2(tangent.y, tangent.x) * 0.22;

    const bank =
      Math.sin(p * Math.PI * 2.1) * 0.18;

    const pitch =
      Math.cos(p * Math.PI * 1.65) * 0.06;

    rootRef.current.rotation.x = THREE.MathUtils.damp(
      rootRef.current.rotation.x,
      reflection ? -pitch : pitch,
      4.4,
      delta,
    );

    rootRef.current.rotation.y = THREE.MathUtils.damp(
      rootRef.current.rotation.y,
      -0.08 + yawFromPath,
      4.4,
      delta,
    );

    rootRef.current.rotation.z = THREE.MathUtils.damp(
      rootRef.current.rotation.z,
      reflection ? -bank * 0.86 : bank,
      4.4,
      delta,
    );
  });

  const { center, scale } = normalization;

  return (
    <group ref={rootRef}>
      <group
        scale={[
          scale,
          reflection ? -scale : scale,
          scale,
        ]}
      >
        <group
          rotation={[
            Math.PI,
            -1.4675,
            Math.PI,
          ]}
        >
          <primitive
            object={fishScene}
            position={[
              -center.x,
              -center.y,
              -center.z,
            ]}
          />
        </group>
      </group>
    </group>
  );
}

function FishScene({
  progress,
  reduceMotion = false,
}) {
  return (
    <>
      <ScenicBackdrop />

      <ambientLight intensity={1.5} />

      <hemisphereLight
        intensity={1.7}
        color="#fff8f2"
        groundColor="#dfc7ff"
      />

      <directionalLight
        castShadow
        position={[4, 5, 6]}
        intensity={2.6}
        color="#ffffff"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <pointLight
        position={[2.2, 1.1, 3]}
        intensity={16}
        distance={10}
        color="#ffcfb5"
      />

      <pointLight
        position={[-2.3, 0.8, 2.5]}
        intensity={11}
        distance={8}
        color="#e2e7ff"
      />

      <pointLight
        position={[0.4, -0.2, 2]}
        intensity={7}
        distance={8}
        color="#ffb9ea"
      />

      <CameraRig progress={progress} />
      <FloatingDust />
      <GlassOrb />
      <WaterOrb />
      <WaterOrbReflection />

      <FishInstance
        reflection
        progress={progress}
        reduceMotion={reduceMotion}
      />

      <FishInstance
        progress={progress}
        reduceMotion={reduceMotion}
      />

      <ContactShadows
        position={[0, -1.02, 0]}
        opacity={0.28}
        scale={5.8}
        blur={2.8}
        far={3}
        color="#8b77ff"
      />
    </>
  );
}

function Fish3D({
  progress,
  reduceMotion = false,
}) {
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
        shadows
        camera={{
          position: [0, 0.04, 6.05],
          fov: 40,
          near: 0.01,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.12;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Suspense fallback={null}>
          <FishScene
            progress={progress}
            reduceMotion={reduceMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);

export default Fish3D;
