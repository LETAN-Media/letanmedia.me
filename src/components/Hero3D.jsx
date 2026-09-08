import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

const ORB_SHADER = {
  uniforms: {
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2(0, 0) },

    // Pearl / chrome palette
    uShadowColor: { value: new THREE.Color('#8f9caf') },
    uMidColor: { value: new THREE.Color('#d8e0ea') },
    uLightColor: { value: new THREE.Color('#f8fbff') },

    // LETAN electric blue
    uBlueColor: { value: new THREE.Color('#1457ff') },
    uIceColor: { value: new THREE.Color('#9fc7ff') },
  },

  vertexShader: `
    uniform float uTime;
    uniform vec2 uPointer;

    varying vec3 vNormal;
    varying vec3 vViewDirection;
    varying vec3 vWorldPosition;
    varying float vSignal;

    void main() {
      float latitude =
        sin(position.y * 3.0 + uTime * 0.38);

      float longitude =
        cos(
          position.x * 2.25
          - position.z * 1.5
          - uTime * 0.24
        );

      float pulse =
        sin(length(position.xz) * 4.0 - uTime * 0.46);

      float pointerWave =
        dot(
          normalize(position.xy + 0.001),
          normalize(uPointer + 0.001)
        );

      float signal =
        latitude * longitude * 0.58
        + pulse * 0.26
        + pointerWave * 0.08;

      float displacement = signal * 0.045;

      vec3 displaced =
        position + normal * displacement;

      vec4 worldPosition =
        modelMatrix * vec4(displaced, 1.0);

      vSignal = signal;
      vNormal = normalize(normalMatrix * normal);
      vWorldPosition = worldPosition.xyz;
      vViewDirection =
        normalize(cameraPosition - worldPosition.xyz);

      gl_Position =
        projectionMatrix
        * viewMatrix
        * worldPosition;
    }
  `,

  fragmentShader: `
    uniform float uTime;

    uniform vec3 uShadowColor;
    uniform vec3 uMidColor;
    uniform vec3 uLightColor;
    uniform vec3 uBlueColor;
    uniform vec3 uIceColor;

    varying vec3 vNormal;
    varying vec3 vViewDirection;
    varying vec3 vWorldPosition;
    varying float vSignal;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewDirection);

      float facing =
        clamp(dot(normal, viewDir), 0.0, 1.0);

      float fresnel =
        pow(1.0 - facing, 2.1);

      float sharpRim =
        pow(1.0 - facing, 5.0);

      float softLight =
        0.5 + 0.5 * normal.y;

      float movingBand =
        0.5
        + 0.5
        * sin(
          vWorldPosition.y * 4.1
          + vWorldPosition.x * 1.2
          - vWorldPosition.z * 0.8
          + uTime * 0.35
        );

      float blueBand =
        smoothstep(0.82, 0.99, movingBand)
        * (0.25 + fresnel * 0.75);

      // Main pearl / chrome body
      vec3 color =
        mix(
          uShadowColor,
          uMidColor,
          0.42 + softLight * 0.38
        );

      color =
        mix(
          color,
          uLightColor,
          facing * 0.52
        );

      // Blue reflections
      color +=
        uBlueColor
        * blueBand
        * 0.27;

      color +=
        uIceColor
        * fresnel
        * 0.32;

      // Bright chrome edge
      color +=
        vec3(1.0)
        * sharpRim
        * 0.38;

      // Very subtle signal variation
      color +=
        uIceColor
        * max(vSignal, 0.0)
        * 0.035;

      gl_FragColor =
        vec4(color, 0.96);
    }
  `,
};

const seededRandom = (seed) => {
  const value =
    Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
};

const createDust = (count) => {
  const positions =
    new Float32Array(count * 3);

  for (
    let index = 0;
    index < count;
    index += 1
  ) {
    const radius =
      3.0 + seededRandom(index + 1) * 2.7;

    const theta =
      seededRandom(index + 11)
      * Math.PI
      * 2;

    const phi =
      Math.acos(
        seededRandom(index + 29) * 2 - 1
      );

    positions[index * 3] =
      radius
      * Math.sin(phi)
      * Math.cos(theta);

    positions[index * 3 + 1] =
      radius
      * Math.sin(phi)
      * Math.sin(theta);

    positions[index * 3 + 2] =
      radius * Math.cos(phi);
  }

  return positions;
};

const SignalOrb = ({ lowPower }) => {
  const groupRef = useRef(null);
  const shellRef = useRef(null);
  const materialRef = useRef(null);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value =
        state.clock.elapsedTime;

      materialRef.current.uniforms.uPointer.value.lerp(
        state.pointer,
        0.035,
      );
    }

    if (!groupRef.current) return;

    const targetX =
      -0.10 + state.pointer.y * 0.10;

    const targetY =
      state.clock.elapsedTime * 0.045
      + state.pointer.x * 0.16;

    groupRef.current.rotation.x =
      THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetX,
        2.4,
        delta,
      );

    groupRef.current.rotation.y =
      THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetY,
        2.4,
        delta,
      );

    if (!shellRef.current) return;

    shellRef.current.rotation.y -=
      delta * 0.032;

    shellRef.current.rotation.z +=
      delta * 0.014;
  });

  const segments =
    lowPower ? 60 : 96;

  return (
    <group
      ref={groupRef}
      position={
        lowPower
          ? [0, -0.18, 0]
          : [0.08, -0.08, 0]
      }
      scale={lowPower ? 0.84 : 0.98}
    >
      {/* Main pearl orb */}
      <mesh>
        <icosahedronGeometry
          args={[
            2,
            lowPower ? 3 : 5,
          ]}
        />

        <shaderMaterial
          ref={materialRef}
          args={[ORB_SHADER]}
          transparent
          depthWrite
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Fine blue wireframe */}
      <mesh
        ref={shellRef}
        scale={1.018}
      >
        <icosahedronGeometry
          args={[
            2,
            lowPower ? 2 : 3,
          ]}
        />

        <meshBasicMaterial
          color="#3676ff"
          wireframe
          transparent
          opacity={
            lowPower ? 0.16 : 0.22
          }
          depthWrite={false}
        />
      </mesh>

      {/* Soft inner glow */}
      <mesh scale={0.73}>
        <sphereGeometry
          args={[
            2,
            lowPower ? 18 : 26,
            lowPower ? 18 : 26,
          ]}
        />

        <meshBasicMaterial
          color="#dceaff"
          transparent
          opacity={0.10}
          depthWrite={false}
        />
      </mesh>

      {/* Orbit 01 */}
      <mesh
        rotation={[
          Math.PI / 2.8,
          0.16,
          0.08,
        ]}
      >
        <torusGeometry
          args={[
            2.42,
            0.007,
            8,
            segments,
          ]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.44}
          depthWrite={false}
        />
      </mesh>

      {/* Orbit 02 */}
      <mesh
        rotation={[
          1.08,
          0.48,
          0.72,
        ]}
      >
        <torusGeometry
          args={[
            2.57,
            0.006,
            8,
            segments,
          ]}
        />

        <meshBasicMaterial
          color="#3676ff"
          transparent
          opacity={0.48}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

const SignalDust = ({ lowPower }) => {
  const pointsRef = useRef(null);

  const positions = useMemo(
    () =>
      createDust(
        lowPower ? 36 : 72,
      ),
    [lowPower],
  );

  useFrame((state) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y =
      state.clock.elapsedTime * 0.011;
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#7fa9ff"
        size={
          lowPower ? 0.020 : 0.015
        }
        sizeAttenuation
        depthWrite={false}
        opacity={0.38}
      />
    </Points>
  );
};

const Scene = ({ lowPower }) => (
  <>
    <SignalDust lowPower={lowPower} />
    <SignalOrb lowPower={lowPower} />
  </>
);

const getLowPowerMode = () => {
  if (typeof window === 'undefined') {
    return true;
  }

  const cores =
    navigator.hardwareConcurrency || 4;

  return (
    window.innerWidth < 768
    || cores <= 4
  );
};

const Hero3D = () => {
  const containerRef = useRef(null);

  const [lowPower, setLowPower] =
    useState(getLowPowerMode);

  const [inView, setInView] =
    useState(true);

  const [pageVisible, setPageVisible] =
    useState(
      () =>
        typeof document === 'undefined'
        || !document.hidden,
    );

  useEffect(() => {
    const syncPowerMode = () => {
      setLowPower(getLowPowerMode());
    };

    window.addEventListener(
      'resize',
      syncPowerMode,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        'resize',
        syncPowerMode,
      );
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    if (
      !('IntersectionObserver' in window)
    ) {
      return undefined;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setInView(entry.isIntersecting);
        },
        { rootMargin: '160px' },
      );

    observer.observe(
      containerRef.current,
    );

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      setPageVisible(!document.hidden);
    };

    document.addEventListener(
      'visibilitychange',
      handleVisibility,
    );

    return () => {
      document.removeEventListener(
        'visibilitychange',
        handleVisibility,
      );
    };
  }, []);

  return (
    <div
      className="lm-hero3d"
      ref={containerRef}
      aria-hidden="true"
    >
      <Canvas
        frameloop={
          inView && pageVisible
            ? 'always'
            : 'never'
        }
        dpr={
          lowPower
            ? [1, 1.1]
            : [1, 1.35]
        }
        camera={{
          position: [0, 0, 6.45],
          fov: lowPower ? 51 : 46,
        }}
        gl={{
          antialias: !lowPower,
          alpha: true,
          powerPreference:
            'high-performance',
        }}
        performance={{ min: 0.65 }}
      >
        <Suspense fallback={null}>
          <Scene lowPower={lowPower} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3D;
