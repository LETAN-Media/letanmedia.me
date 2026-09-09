import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

const MODEL_URL = '/models/clownfish.glb';
const SWIM_ANIMATION = 'Fish|swim_B3';

function FishModel({ progress, reduceMotion = false }) {
  const rootRef = useRef(null);

  const { scene, animations } = useGLTF(MODEL_URL);

  const fishScene = useMemo(() => clone(scene), [scene]);

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

    /*
     * Luôn chuẩn hóa con cá về kích thước phù hợp camera,
     * bất kể model gốc dùng mét, cm hay mm.
     */
    const scale = 3.8 / maxDimension;

    console.log('[Fish3D]', {
      size: size.toArray(),
      center: center.toArray(),
      scale,
      animations: animations.map((clip) => clip.name),
    });

    return {
      center,
      scale,
    };
  }, [fishScene, animations]);

  const { actions } = useAnimations(
    animations,
    rootRef,
  );

  useEffect(() => {
    const swimAction =
      actions?.[SWIM_ANIMATION]
      || Object.values(actions || {})[0];

    if (!swimAction) {
      console.warn('[Fish3D] Không tìm thấy animation');
      return undefined;
    }

    swimAction.reset();
    swimAction.setLoop(THREE.LoopRepeat, Infinity);
    swimAction.timeScale = 0.85;
    swimAction.play();

    return () => {
      swimAction.stop();
    };
  }, [actions]);

  useEffect(() => {
    fishScene.traverse((object) => {
      if (!object.isMesh && !object.isSkinnedMesh) return;

      object.frustumCulled = false;

      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      materials.forEach((material) => {
        if (!material) return;

        material.needsUpdate = true;
      });
    });
  }, [fishScene]);

  useFrame((state, delta) => {
    if (!rootRef.current) return;

    const rawProgress =
      typeof progress?.get === 'function'
        ? progress.get()
        : 0;

    const p = THREE.MathUtils.clamp(
      rawProgress,
      0,
      1,
    );

    /*
     * Quỹ đạo bơi theo scroll.
     *
     * 0%  : gần giữa hero
     * 35% : lượn phải
     * 65% : xuống thấp
     * 100%: rời dần xuống dưới
     */
    const targetY = THREE.MathUtils.lerp(
      0.15,
      -1.65,
      p,
    );

    const targetX =
      -0.15
      + Math.sin(p * Math.PI * 2.4) * 0.72;

    const targetZ =
      Math.sin(p * Math.PI * 1.7) * 0.18;

    rootRef.current.position.x =
      THREE.MathUtils.damp(
        rootRef.current.position.x,
        targetX,
        5,
        delta,
      );

    rootRef.current.position.y =
      THREE.MathUtils.damp(
        rootRef.current.position.y,
        targetY,
        5,
        delta,
      );

    rootRef.current.position.z =
      THREE.MathUtils.damp(
        rootRef.current.position.z,
        targetZ,
        4,
        delta,
      );

    rootRef.current.rotation.z =
      THREE.MathUtils.damp(
        rootRef.current.rotation.z,
        Math.sin(p * Math.PI * 2.2) * 0.12,
        4,
        delta,
      );

    rootRef.current.rotation.y =
      THREE.MathUtils.damp(
        rootRef.current.rotation.y,
        -0.12 + p * 0.28,
        4,
        delta,
      );

    if (!reduceMotion) {
      rootRef.current.position.y +=
        Math.sin(state.clock.elapsedTime * 1.1) * 0.001;
    }
  });

  const { center, scale } = normalization;

  return (
    <group ref={rootRef}>
      <group scale={scale}>
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
        camera={{
          position: [0, 0, 6],
          fov: 42,
          near: 0.01,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={2.8} />

        <hemisphereLight
          intensity={2}
          color="#ffffff"
          groundColor="#8ca8ff"
        />

        <directionalLight
          position={[4, 5, 6]}
          intensity={3.5}
        />

        <directionalLight
          position={[-4, 2, 4]}
          intensity={2}
        />

        <Suspense fallback={null}>
          <FishModel
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
