import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Canvas,
  useFrame,
} from '@react-three/fiber';
import {
  PointMaterial,
  Points,
} from '@react-three/drei';
import * as THREE from 'three';

const seededRandom = (seed) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const createSpherePoints = (
  count,
  radius,
  seedOffset = 0,
) => {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const u = seededRandom(
      index * 2 + seedOffset + 1,
    );

    const v = seededRandom(
      index * 2 + seedOffset + 2,
    );

    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);

    const jitter =
      (seededRandom(index + seedOffset + 9) - 0.5) *
      0.045;

    const currentRadius = radius + jitter;

    positions[index * 3] =
      currentRadius *
      Math.sin(phi) *
      Math.cos(theta);

    positions[index * 3 + 1] =
      currentRadius *
      Math.sin(phi) *
      Math.sin(theta);

    positions[index * 3 + 2] =
      currentRadius * Math.cos(phi);
  }

  return positions;
};

const createAmbientPoints = (count) => {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const spread = 9;

    positions[index * 3] =
      (seededRandom(index + 101) - 0.5) *
      spread;

    positions[index * 3 + 1] =
      (seededRandom(index + 301) - 0.5) *
      6;

    positions[index * 3 + 2] =
      -1 -
      seededRandom(index + 501) * 4;
  }

  return positions;
};

const NetworkGlobe = ({ isMobile }) => {
  const globeRef = useRef();

  const pointCount = isMobile ? 850 : 1800;

  const globePoints = useMemo(
    () => createSpherePoints(pointCount, 2.15, 13),
    [pointCount],
  );

  useFrame((state, delta) => {
    if (!globeRef.current) {
      return;
    }

    globeRef.current.rotation.y += delta * 0.045;
    globeRef.current.rotation.x =
      -0.08 +
      Math.sin(state.clock.elapsedTime * 0.22) *
        0.025;
  });

  return (
    <group
      ref={globeRef}
      position={
        isMobile
          ? [0, -1.18, 0]
          : [0.38, -0.75, 0]
      }
      rotation={[0, -0.35, -0.08]}
      scale={isMobile ? 0.92 : 1.08}
    >
      <mesh>
        <sphereGeometry
          args={[2.15, 40, 40]}
        />

        <meshBasicMaterial
          color="#147DFF"
          transparent
          opacity={0.055}
          wireframe
        />
      </mesh>

      <mesh scale={1.035}>
        <sphereGeometry
          args={[2.15, 48, 48]}
        />

        <meshBasicMaterial
          color="#2AC8FF"
          transparent
          opacity={0.035}
          side={THREE.BackSide}
        />
      </mesh>

      <Points
        positions={globePoints}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#49B8FF"
          size={isMobile ? 0.024 : 0.019}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry
          args={[2.3, 0.009, 8, 160]}
        />

        <meshBasicMaterial
          color="#147DFF"
          transparent
          opacity={0.28}
        />
      </mesh>

      <mesh rotation={[1.05, 0.4, 0.25]}>
        <torusGeometry
          args={[2.38, 0.006, 8, 160]}
        />

        <meshBasicMaterial
          color="#2AC8FF"
          transparent
          opacity={0.15}
        />
      </mesh>

      <pointLight
        color="#147DFF"
        intensity={3.2}
        distance={9}
        position={[1.8, 1.8, 3]}
      />

      <pointLight
        color="#2AC8FF"
        intensity={2}
        distance={8}
        position={[-2.4, -0.5, 2]}
      />
    </group>
  );
};

const AmbientField = ({ isMobile }) => {
  const ref = useRef();

  const ambientPoints = useMemo(
    () =>
      createAmbientPoints(
        isMobile ? 90 : 190,
      ),
    [isMobile],
  );

  useFrame((state) => {
    if (!ref.current) {
      return;
    }

    ref.current.rotation.z =
      state.clock.elapsedTime * 0.004;
  });

  return (
    <Points
      ref={ref}
      positions={ambientPoints}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#6CCBFF"
        size={isMobile ? 0.018 : 0.014}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const Scene = ({ isMobile }) => (
  <>
    <AmbientField isMobile={isMobile} />
    <NetworkGlobe isMobile={isMobile} />
  </>
);

const Hero3D = () => {
  const [isMobile, setIsMobile] =
    useState(() =>
      typeof window !== 'undefined'
        ? window.innerWidth < 768
        : false,
    );

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener(
      'resize',
      updateViewport,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        'resize',
        updateViewport,
      );
    };
  }, []);

  return (
    <div className="lm-hero3d">
      <Canvas
        dpr={isMobile ? [1, 1.25] : [1, 1.6]}
        camera={{
          position: [0, 0, 6],
          fov: isMobile ? 53 : 48,
        }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <Scene isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3D;
