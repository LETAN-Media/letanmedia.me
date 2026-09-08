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

    swimAction.fadeIn(0.25).play();

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
      ? 0.35
      : THREE.MathUtils.clamp(rawProgress, 0, 1);

    const targetX =
      Math.sin(p * Math.PI * 2.4) * 0.62;

    const targetY = THREE.MathUtils.lerp(
      1.45,
      -1.75,
      p,
    );

    const targetZ =
      Math.sin(p * Math.PI * 1.8) * 0.2;

    rootRef.current.position.x =
      THREE.MathUtils.damp(
        rootRef.current.position.x,
        targetX,
        4.6,
        delta,
      );

    rootRef.current.position.y =
      THREE.MathUtils.damp(
        rootRef.current.position.y,
        targetY,
        4.8,
        delta,
      );

    rootRef.current.position.z =
      THREE.MathUtils.damp(
        rootRef.current.position.z,
        targetZ,
        4,
        delta,
      );

    const roll =
      Math.sin(p * Math.PI * 2.4) * 0.18;

    const yaw =
      THREE.MathUtils.lerp(-0.36, 0.34, p);

    rootRef.current.rotation.z =
      THREE.MathUtils.damp(
        rootRef.current.rotation.z,
        roll,
        4.5,
        delta,
      );

    rootRef.current.rotation.y =
      THREE.MathUtils.damp(
        rootRef.current.rotation.y,
        yaw,
        4,
        delta,
      );

    if (!reduceMotion) {
      rootRef.current.position.x +=
        Math.sin(state.clock.elapsedTime * 0.9) * 0.0009;
      rootRef.current.position.y +=
        Math.cos(state.clock.elapsedTime * 0.8) * 0.0007;
    }
  });

  return (
    <group
      ref={rootRef}
      scale={1.2}
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
    <div className="lm-hero3d" aria-hidden="true">
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 38,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
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
        <ambientLight intensity={2.2} />
        <directionalLight
          position={[4, 5, 5]}
          intensity={2.8}
        />
        <directionalLight
          position={[-4, 2, 3]}
          intensity={1.5}
        />
        <hemisphereLight
          intensity={1.1}
          groundColor="#b8c7ff"
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
