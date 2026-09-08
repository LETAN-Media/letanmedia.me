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

const SIGNAL_ORB_SHADER = {
  uniforms: {
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2(0, 0) },
    uDeepColor: { value: new THREE.Color('#07090F') },
    uMidColor: { value: new THREE.Color('#18202C') },
    uCobaltColor: { value: new THREE.Color('#6E8FFF') },
    uChampagneColor: { value: new THREE.Color('#C7AA6B') },
  },
  vertexShader: `
    uniform float uTime;
    uniform vec2 uPointer;
    varying vec3 vNormal;
    varying vec3 vViewDirection;
    varying vec3 vWorldPosition;
    varying float vSignal;

    void main() {
      float latitude = sin(position.y * 3.15 + uTime * 0.42);
      float longitude = cos(position.x * 2.45 - position.z * 1.7 - uTime * 0.28);
      float pulse = sin(length(position.xz) * 4.1 - uTime * 0.52);
      float pointerWave = dot(normalize(position.xy + 0.001), normalize(uPointer + 0.001));
      float signal = latitude * longitude * 0.62 + pulse * 0.28 + pointerWave * 0.1;
      float displacement = signal * 0.055;
      vec3 displacedPosition = position + normal * displacement;
      vec4 worldPosition = modelMatrix * vec4(displacedPosition, 1.0);

      vSignal = signal;
      vNormal = normalize(normalMatrix * normal);
      vWorldPosition = worldPosition.xyz;
      vViewDirection = normalize(cameraPosition - worldPosition.xyz);
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uDeepColor;
    uniform vec3 uMidColor;
    uniform vec3 uCobaltColor;
    uniform vec3 uChampagneColor;
    varying vec3 vNormal;
    varying vec3 vViewDirection;
    varying vec3 vWorldPosition;
    varying float vSignal;

    void main() {
      float facing = clamp(dot(normalize(vNormal), normalize(vViewDirection)), 0.0, 1.0);
      float fresnel = pow(1.0 - facing, 2.35);
      float fineRim = pow(1.0 - facing, 6.0);
      float movingBand = 0.5 + 0.5 * sin(
        vWorldPosition.y * 3.6
        + vWorldPosition.x * 1.15
        - vWorldPosition.z * 0.7
        + uTime * 0.34
      );
      float signalBand = smoothstep(0.78, 0.98, movingBand) * (0.34 + fresnel * 0.66);
      float depthMix = clamp(0.28 + vSignal * 0.12 + facing * 0.12, 0.08, 0.54);

      vec3 color = mix(uDeepColor, uMidColor, depthMix);
      color += uCobaltColor * signalBand * 0.2;
      color += uChampagneColor * fresnel * 0.42;
      color += uChampagneColor * fineRim * 0.18;

      gl_FragColor = vec4(color, 0.96);
    }
  `,
};

const seededRandom = (seed) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const createSignalDust = (count) => {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const radius = 3.1 + seededRandom(index + 1) * 2.8;
    const theta = seededRandom(index + 11) * Math.PI * 2;
    const phi = Math.acos(seededRandom(index + 29) * 2 - 1);

    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[index * 3 + 2] = radius * Math.cos(phi);
  }

  return positions;
};

const SignalOrb = ({ lowPower }) => {
  const groupRef = useRef(null);
  const shellRef = useRef(null);
  const materialRef = useRef(null);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uPointer.value.lerp(state.pointer, 0.035);
    }

    if (groupRef.current) {
      const targetX = -0.12 + state.pointer.y * 0.12;
      const targetY = state.clock.elapsedTime * 0.055 + state.pointer.x * 0.18;
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetX,
        2.6,
        delta,
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetY,
        2.6,
        delta,
      );
    }

    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.025;
      shellRef.current.rotation.z += delta * 0.012;
    }
  });

  const ringSegments = lowPower ? 64 : 96;

  return (
    <group
      ref={groupRef}
      position={lowPower ? [0, -0.08, 0] : [0.18, -0.04, 0]}
      scale={lowPower ? 0.9 : 1.04}
    >
      <mesh>
        <icosahedronGeometry args={[2, lowPower ? 3 : 5]} />
        <shaderMaterial
          ref={materialRef}
          args={[SIGNAL_ORB_SHADER]}
          transparent
          depthWrite
          side={THREE.FrontSide}
        />
      </mesh>

      <mesh ref={shellRef} scale={1.018}>
        <icosahedronGeometry args={[2, lowPower ? 2 : 3]} />
        <meshBasicMaterial
          color="#C7AA6B"
          wireframe
          transparent
          opacity={lowPower ? 0.08 : 0.105}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={0.73}>
        <sphereGeometry args={[2, lowPower ? 20 : 28, lowPower ? 20 : 28]} />
        <meshBasicMaterial
          color="#18202C"
          transparent
          opacity={0.24}
          depthWrite={false}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.8, 0.16, 0.08]}>
        <torusGeometry args={[2.43, 0.008, 8, ringSegments]} />
        <meshBasicMaterial color="#C7AA6B" transparent opacity={0.46} />
      </mesh>

      <mesh rotation={[1.08, 0.48, 0.72]}>
        <torusGeometry args={[2.58, 0.006, 8, ringSegments]} />
        <meshBasicMaterial color="#6E8FFF" transparent opacity={0.34} />
      </mesh>
    </group>
  );
};

const SignalDust = ({ lowPower }) => {
  const pointsRef = useRef(null);
  const positions = useMemo(
    () => createSignalDust(lowPower ? 44 : 88),
    [lowPower],
  );

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.012;
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
        color="#C7AA6B"
        size={lowPower ? 0.021 : 0.016}
        sizeAttenuation
        depthWrite={false}
        opacity={0.42}
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
  if (typeof window === 'undefined') return true;
  const cores = navigator.hardwareConcurrency || 4;
  return window.innerWidth < 768 || cores <= 4;
};

const Hero3D = () => {
  const containerRef = useRef(null);
  const [lowPower, setLowPower] = useState(getLowPowerMode);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  );

  useEffect(() => {
    const syncPowerMode = () => setLowPower(getLowPowerMode());
    window.addEventListener('resize', syncPowerMode, { passive: true });
    return () => window.removeEventListener('resize', syncPowerMode);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '160px' },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <div className="lm-hero3d" ref={containerRef} aria-hidden="true">
      <Canvas
        frameloop={inView && pageVisible ? 'always' : 'never'}
        dpr={lowPower ? [1, 1.1] : [1, 1.35]}
        camera={{ position: [0, 0, 6.35], fov: lowPower ? 50 : 45 }}
        gl={{
          antialias: !lowPower,
          alpha: true,
          powerPreference: 'high-performance',
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
