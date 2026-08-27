import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Glitch } from '@react-three/postprocessing';
import { GlitchMode } from 'postprocessing';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

const CyberCore = ({ isMobile }) => {
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

  const sphereY = isMobile ? 0.2 : -0.4;
  const sphereScale = isMobile ? 1.12 : 1.08;
  
  const glowY = isMobile ? -0.5 : -1.0;
  const glowScale = isMobile ? 1.0 : 1.25;

  return (
    <group>
      {/* Outer shield wireframe - YouTube Red */}
      <group position={[0, sphereY, 0]} scale={[sphereScale, sphereScale, sphereScale]}>
        <Icosahedron args={[2.5, 2]} ref={meshRef}>
          <meshBasicMaterial color="#FF3E3E" wireframe transparent opacity={isMobile ? 0.58 : 0.52} />
        </Icosahedron>
      </group>
      
      {/* Inner distorting core - Pure Red */}
      <group position={[0, glowY, 0]} scale={[glowScale, glowScale, glowScale]}>
        <Icosahedron args={[1.02, 4]} ref={innerRef}>
          <MeshDistortMaterial 
            color="#FF0000" 
            emissive="#FF0000"
            emissiveIntensity={0.8}
            distort={0.4} 
            speed={3} 
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={isMobile ? 0.45 : 0.34}
          />
        </Icosahedron>
      </group>
    </group>
  );
};

export default function YoutubeHero3D() {
  const isMobile = useIsMobile(768);
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle at 50% 45%, rgba(255,0,0,0.20), rgba(255,94,98,0.10) 45%, #070A12 75%)' }}
      />
    );
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 2]}>
        <color attach="background" args={['#070A12']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#FF0000" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#FF5E62" />
        <CyberCore isMobile={isMobile} />
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
