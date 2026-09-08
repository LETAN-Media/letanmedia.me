import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useAnimations,
  useGLTF,
} from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

const MODEL_URL = '/models/clownfish.glb';
const SWIM_ANIMATION = 'Fish|swim_B3';

function FishModel({ progress, reduceMotion = false }) {
  const rootRef = useRef(null);

  const { scene, animations } = useGLTF(MODEL_URL);

  const fishScene = useMemo(
    () => clone(scene),
    [scene],
  );

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

    if (reduceMotion) {
      swimAction.stop();
      return undefined;
    }

    swimAction
      .fadeIn(0.25)
      .play();

    return () => {
      swimAction.fadeOut(0.15);
      swimAction.stop();
    };
  }, [actions, reduceMotion]);

  useFrame((state, delta) => {
    if (!rootRef.current) return;

    const rawProgress =
      typeof progress?.get === 'function'
        ? progress.get()
        : 0;

    const p = reduceMotion
      ? 0.4
      : THREE.MathUtils.clamp(rawProgress, 0, 1);

    /*
     * Cá đi từ trên xuống dưới theo scroll.
     * X dao động nhẹ để tạo cảm giác lượn trong nước.
     */
    const targetY = THREE.MathUtils.lerp(
      2.15,
      -2.15,
      p,
    );

    const targetX =
      Math.sin(p * Math.PI * 3.2) * 0.55;

    const targetZ =
      Math.sin(p * Math.PI * 2) * 0.18;

    rootRef.current.position.x =
      THREE.MathUtils.damp(
        rootRef.current.position.x,
        targetX,
        5.5,
        delta,
      );

    rootRef.current.position.y =
      THREE.MathUtils.damp(
        rootRef.current.position.y,
        targetY,
        5.5,
        delta,
      );

    rootRef.current.position.z =
      THREE.MathUtils.damp(
        rootRef.current.position.z,
        targetZ,
        5,
        delta,
      );

    /*
     * Nghiêng thân nhẹ theo quỹ đạo.
     */
    const sway =
      Math.cos(p * Math.PI * 3.2) * 0.12;

    rootRef.current.rotation.z =
      THREE.MathUtils.damp(
        rootRef.current.rotation.z,
        sway,
        5,
        delta,
      );

    rootRef.current.rotation.y =
      THREE.MathUtils.damp(
        rootRef.current.rotation.y,
        Math.sin(p * Math.PI * 2.5) * 0.18,
        4,
        delta,
      );

    /*
     * Cá vẫn có chuyển động sống nhẹ ngay cả khi
     * người dùng dừng scroll.
     */
    if (!reduceMotion) {
      rootRef.current.position.x +=
        Math.sin(state.clock.elapsedTime * 0.8) * 0.0008;
    }
  });

  return (
    <group
      ref={rootRef}
      scale={1.28}
    >
      <primitive
        object={fishScene}
        rotation={[
          Math.PI,
          -1.4675,
          Math.PI,
        ]}
      />
    </group>
  );
}

function Fish3D({
  progress,
  reduceMotion = false,
}) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 6],
        fov: 38,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 1.6]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
      }}
    >
      <ambientLight intensity={2.4} />

      <directionalLight
        position={[3, 4, 5]}
        intensity={3}
      />

      <directionalLight
        position={[-4, 1, 3]}
        intensity={1.5}
      />

      <Suspense fallback={null}>
        <FishModel
          progress={progress}
          reduceMotion={reduceMotion}
        />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);

export default Fish3D;
