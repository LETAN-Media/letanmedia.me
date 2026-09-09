import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';

import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import {
  useAnimations,
  useGLTF,
} from '@react-three/drei';

import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

const FISH_URL = '/peach-v2/clownfish.glb';
const FISH_CLIP = 'Fish|swim_B3';

function Fish() {
  const gltf = useGLTF(FISH_URL);

  const model = useMemo(
    () => clone(gltf.scene),
    [gltf.scene],
  );

  const holder = useRef();

  const { actions } = useAnimations(
    gltf.animations,
    model,
  );

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(model);

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    model.position.sub(center);

    const maxSize = Math.max(
      size.x,
      size.y,
      size.z,
    ) || 1;

    /*
     * Cá lớn rõ ràng để trước tiên xác nhận model render được.
     */
    holder.current?.scale.setScalar(
      2.3 / maxSize,
    );
  }, [model]);

  useEffect(() => {
    const action =
      actions[FISH_CLIP]
      || Object.values(actions).find(Boolean);

    if (!action) {
      console.warn(
        'Fish clips:',
        gltf.animations.map((clip) => clip.name),
      );
      return;
    }

    action.reset();
    action.setLoop(
      THREE.LoopRepeat,
      Infinity,
    );
    action.play();

    return () => action.stop();
  }, [
    actions,
    gltf.animations,
  ]);

  return (
    <group
      ref={holder}
      position={[0.35, -0.15, 0]}
      rotation={[0, -0.1, 0]}
    >
      <primitive
        object={model}
        dispose={null}
      />
    </group>
  );
}

export default function PeachHeroClone() {
  return (
    <div className="lmv2-fish-layer">
      <Canvas
        dpr={1}
        camera={{
          position: [0, 0, 5],
          fov: 42,
          near: 0.1,
          far: 100,
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          /*
           * QUAN TRỌNG:
           * Canvas tuyệt đối trong suốt.
           * Không được che ảnh Peach bằng màu đen.
           */
          gl.setClearColor(
            new THREE.Color(0x000000),
            0,
          );

          gl.outputColorSpace =
            THREE.SRGBColorSpace;

          gl.toneMapping =
            THREE.NoToneMapping;
        }}
      >
        <ambientLight
          intensity={3}
          color="#ffffff"
        />

        <directionalLight
          position={[4, 5, 6]}
          intensity={4}
          color="#ffffff"
        />

        <directionalLight
          position={[-4, 1, 5]}
          intensity={2}
          color="#ffc9e8"
        />

        <Suspense fallback={null}>
          <Fish />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(FISH_URL);
