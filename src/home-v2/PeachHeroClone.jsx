import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';

import * as THREE from 'three';

import {
  Canvas,
  useFrame,
} from '@react-three/fiber';

import {
  useAnimations,
  useGLTF,
} from '@react-three/drei';

import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

const FISH_URL = '/peach-v2/clownfish.glb';
const FISH_CLIP = 'Fish|swim_B3';

function ClownFish() {
  const gltf = useGLTF(FISH_URL);

  const model = useMemo(
    () => clone(gltf.scene),
    [gltf.scene],
  );

  const holderRef = useRef(null);

  const {
    actions,
  } = useAnimations(
    gltf.animations,
    model,
  );

  /*
   * Auto-center + auto-scale.
   * Không phụ thuộc kích thước thực của GLB.
   * Mục tiêu phase này: chắc chắn cá phải xuất hiện.
   */
  useLayoutEffect(() => {
    const box =
      new THREE.Box3().setFromObject(model);

    const size =
      new THREE.Vector3();

    const center =
      new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    model.position.set(
      -center.x,
      -center.y,
      -center.z,
    );

    const maxDimension =
      Math.max(
        size.x,
        size.y,
        size.z,
      ) || 1;

    /*
     * Cá chiếm khoảng 46% chiều ngang scene.
     */
    const targetSize = 2.35;

    const normalizedScale =
      targetSize / maxDimension;

    holderRef.current?.scale.setScalar(
      normalizedScale,
    );
  }, [model]);

  useEffect(() => {
    const action =
      actions[FISH_CLIP]
      ?? Object.values(actions).find(Boolean);

    if (!action) {
      return;
    }

    action.reset();
    action.enabled = true;
    action.setEffectiveWeight(1);
    action.setEffectiveTimeScale(1);
    action.setLoop(
      THREE.LoopRepeat,
      Infinity,
    );
    action.play();

    return () => {
      action.stop();
    };
  }, [actions]);

  /*
   * Chỉ có một chuyển động idle rất nhẹ của holder.
   * Animation thân/vây vẫn là animation gốc trong GLB.
   *
   * Phase sau sẽ bỏ idle này và gắn fish-RIG timeline gốc.
   */
  useFrame(({ clock }) => {
    if (!holderRef.current) {
      return;
    }

    const t =
      clock.getElapsedTime();

    holderRef.current.position.y =
      -0.05 + Math.sin(t * 0.55) * 0.025;
  });

  return (
    <group
      ref={holderRef}
      position={[0.35, -0.05, 0]}
      rotation={[
        0,
        -0.10,
        0,
      ]}
    >
      <primitive
        object={model}
        dispose={null}
      />
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight
        intensity={2.1}
        color="#ffffff"
      />

      <directionalLight
        position={[3, 4, 5]}
        intensity={3}
        color="#ffffff"
      />

      <directionalLight
        position={[-3, 1, 3]}
        intensity={1.2}
        color="#ffd6ec"
      />

      <Suspense fallback={null}>
        <ClownFish />
      </Suspense>
    </>
  );
}

export default function PeachHeroClone() {
  return (
    <section className="lmv2-peach-clone">

      <div
        className="lmv2-peach-clone__bg"
        aria-hidden="true"
      />

      <div
        className="lmv2-peach-clone__canvas"
        aria-hidden="true"
      >
        <Canvas
          dpr={[1, 1.25]}
          camera={{
            position: [0, 0, 5],
            fov: 42,
            near: 0.1,
            far: 100,
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference:
              'high-performance',
          }}
          onCreated={({ gl }) => {
            gl.outputColorSpace =
              THREE.SRGBColorSpace;

            gl.toneMapping =
              THREE.ACESFilmicToneMapping;

            gl.toneMappingExposure =
              1.15;
          }}
        >
          <Scene />
        </Canvas>
      </div>

    </section>
  );
}

useGLTF.preload(FISH_URL);
