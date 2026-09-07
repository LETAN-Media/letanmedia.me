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

// Custom Shader for Generative Glass Sphere
const SphereShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2(0, 0) },
    uDeepColor: { value: new THREE.Color('#070A10') },
    uCobaltColor: { value: new THREE.Color('#1E56A0') },
    uChampagneColor: { value: new THREE.Color('#D4AF37') },
    uRimColor: { value: new THREE.Color('#F6E7C1') },
  },
  vertexShader: `
    uniform float uTime;
    uniform vec2 uPointer;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec3 vWorldPosition;
    varying float vWave;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      vViewDir = normalize(cameraPosition - worldPos.xyz);

      // Organic fluid wave displacement along normal
      float wave = sin(position.x * 2.2 + uTime * 0.9 + uPointer.x * 1.5) 
                 * cos(position.y * 2.2 + uTime * 0.7 + uPointer.y * 1.5) 
                 * sin(position.z * 1.8 + uTime * 0.6);
      vWave = wave;

      vec3 displacedPos = position + normal * (wave * 0.12);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uDeepColor;
    uniform vec3 uCobaltColor;
    uniform vec3 uChampagneColor;
    uniform vec3 uRimColor;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec3 vWorldPosition;
    varying float vWave;

    void main() {
      // Fresnel edge glow
      float fresnel = 1.0 - max(dot(vNormal, vViewDir), 0.0);
      float fresnelPow = pow(fresnel, 2.5);
      float rim = pow(fresnel, 4.2);

      // Core blend: Deep Obsidian base to subtle Cobalt depth
      vec3 color = mix(uDeepColor, uCobaltColor, clamp(vWave * 0.5 + 0.35, 0.0, 1.0));

      // Add Champagne Gold to mid-reflections
      color = mix(color, uChampagneColor, fresnelPow * 0.7);

      // Add brilliant Champagne / Platinum rim
      color += uRimColor * rim * 1.4;

      // Soft translucency alpha
      float alpha = clamp(0.72 + fresnelPow * 0.28, 0.0, 1.0);

      gl_FragColor = vec4(color, alpha);
    }
  `,
};

const createAmbientStardust = (count) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const radius = 3.2 + Math.random() * 3.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  return positions;
};

const GenerativeGlassSphere = ({ isMobile }) => {
  const groupRef = useRef();
  const materialRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smooth lerp pointer into uniform
      materialRef.current.uniforms.uPointer.value.lerp(state.pointer, 0.05);
    }

    if (groupRef.current) {
      // Idle rotation + smooth responsive tilt to pointer
      targetRotation.current.y = state.clock.elapsedTime * 0.08 + state.pointer.x * 0.45;
      targetRotation.current.x = -0.1 + state.pointer.y * 0.3;

      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotation.current.y,
        3.5,
        delta,
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotation.current.x,
        3.5,
        delta,
      );
    }
  });

  return (
    <group
      ref={groupRef}
      position={isMobile ? [0, -0.25, 0] : [0.25, -0.1, 0]}
      scale={isMobile ? 0.95 : 1.15}
    >
      {/* Main Generative Organic Sphere */}
      <mesh>
        <icosahedronGeometry args={[2.0, isMobile ? 32 : 54]} />
        <shaderMaterial
          ref={materialRef}
          args={[SphereShaderMaterial]}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Internal Luminous Core */}
      <mesh scale={0.78}>
        <sphereGeometry args={[2.0, 32, 32]} />
        <meshBasicMaterial
          color="#1E457A"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer Elegant Halo Rim */}
      <mesh rotation={[Math.PI / 3, 0.25, 0]}>
        <torusGeometry args={[2.45, 0.006, 16, 160]} />
        <meshBasicMaterial
          color="#C5A869"
          transparent
          opacity={0.45}
        />
      </mesh>

      <mesh rotation={[1.1, 0.4, 0.5]}>
        <torusGeometry args={[2.58, 0.004, 16, 160]} />
        <meshBasicMaterial
          color="#3182CE"
          transparent
          opacity={0.32}
        />
      </mesh>

      {/* Warm & Cobalt Specular Point Lights */}
      <pointLight
        color="#D4AF37"
        intensity={2.8}
        distance={8}
        position={[2.5, 2.5, 3]}
      />
      <pointLight
        color="#2B6CB0"
        intensity={2.2}
        distance={8}
        position={[-3, -1.5, 2]}
      />
    </group>
  );
};

const AmbientStardust = ({ isMobile }) => {
  const pointsRef = useRef();
  const positions = useMemo(
    () => createAmbientStardust(isMobile ? 70 : 160),
    [isMobile],
  );

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.008;
    }
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
        color="#DFCA95"
        size={isMobile ? 0.024 : 0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const Scene = ({ isMobile }) => (
  <>
    <ambientLight intensity={0.4} />
    <AmbientStardust isMobile={isMobile} />
    <GenerativeGlassSphere isMobile={isMobile} />
  </>
);

const Hero3D = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lm-hero3d">
      <Canvas
        dpr={isMobile ? [1, 1.25] : [1, 1.6]}
        camera={{
          position: [0, 0, 5.8],
          fov: isMobile ? 52 : 46,
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
