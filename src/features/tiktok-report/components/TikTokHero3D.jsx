import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Glitch } from '@react-three/postprocessing';
import { GlitchMode } from 'postprocessing';

const CyberCore = () => {
  const meshRef = useRef();
  const innerRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = state.clock.getElapsedTime() * -0.5;
    }
  });

  return (
    <group>
      {/* Outer shield wireframe */}
      <Icosahedron args={[2.5, 2]} ref={meshRef}>
        <meshBasicMaterial color="#00F2FE" wireframe transparent opacity={0.55} />
      </Icosahedron>
      
      {/* Inner distorting core */}
      <Icosahedron args={[1.02, 4]} ref={innerRef}>
        <MeshDistortMaterial 
          color="#ff0a6c" 
          emissive="#ff0a6c"
          emissiveIntensity={0.8}
          distort={0.4} 
          speed={3} 
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.45}
        />
      </Icosahedron>
    </group>
  );
};

export default function TikTokHero3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none scale-[0.85]" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 2]}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F2FE" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#FF0050" />
        <CyberCore />
        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
          <Glitch 
            delay={[2.5, 5.5]} 
            duration={[0.1, 0.3]} 
            strength={[0.02, 0.06]} 
            mode={GlitchMode.SPORADIC}
            active
            ratio={0.85}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
