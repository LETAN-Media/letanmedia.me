import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * TermsHero3D — Interactive 3D Legal & Security Lattice.
 * Represents LETAN Media's AI governance, trust, and platform protection architecture.
 *
 * Performance features:
 * - Pure Three.js with capped DPR (max 1.5)
 * - Auto-pauses render loop when offscreen via IntersectionObserver
 * - Responds smoothly to cursor parallax with damping
 * - Respects prefers-reduced-motion (renders a single static frame)
 * - pointer-events: none (never interferes with user clicks or scrolling)
 */
export default function TermsHero3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      // Graceful fallback if WebGL is disabled or unsupported
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 7;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);

    // Root group for rotation and mouse interaction
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Outer Polyhedron Wireframe (Security Shell)
    const outerGeo = new THREE.IcosahedronGeometry(2.35, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x6f5aff,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    rootGroup.add(outerMesh);

    // 2. Secondary Inner Octahedron (Refractive Core)
    const innerGeo = new THREE.OctahedronGeometry(1.4, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    rootGroup.add(innerMesh);

    // 3. Floating Node Particle Field
    const particleCount = 72;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x6f5aff); // Violet
    const c2 = new THREE.Color(0x00d4ff); // Cyan
    const c3 = new THREE.Color(0xc7aa6b); // Champagne gold

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.6 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = Math.random() > 0.7 ? c3 : Math.random() > 0.4 ? c2 : c1;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particles);

    // Mouse parallax tracking
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handlePointerMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth) * 2 - 1;
      const normY = -(e.clientY / innerHeight) * 2 + 1;
      targetRotY = normX * 0.45;
      targetRotX = normY * 0.35;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Resize handler
    const resize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Visibility / Intersection observer to pause rendering offscreen
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Animation loop
    let animationId = null;
    let clock = new THREE.Clock();

    const render = () => {
      if (isVisible && !document.hidden) {
        const elapsed = clock.getElapsedTime();

        // Smooth parallax interpolation
        currentRotX += (targetRotX - currentRotX) * 0.05;
        currentRotY += (targetRotY - currentRotY) * 0.05;

        // Auto rotation + parallax
        outerMesh.rotation.y = elapsed * 0.12 + currentRotY;
        outerMesh.rotation.x = elapsed * 0.08 + currentRotX;

        innerMesh.rotation.y = -elapsed * 0.18 + currentRotY * 1.2;
        innerMesh.rotation.z = elapsed * 0.14;

        particles.rotation.y = elapsed * 0.06;

        // Subtle pulsing scale
        const scalePulse = 1 + Math.sin(elapsed * 0.8) * 0.025;
        innerMesh.scale.set(scalePulse, scalePulse, scalePulse);

        renderer.render(scene, camera);
      }

      if (!reducedMotion) {
        animationId = requestAnimationFrame(render);
      }
    };

    // Initial render
    renderer.render(scene, camera);

    if (!reducedMotion) {
      animationId = requestAnimationFrame(render);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('pointermove', handlePointerMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      // Clean up Three.js resources
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [reducedMotion]);

  return (
    <div className="tos-hero-3d" ref={containerRef} aria-hidden="true">
      <canvas ref={canvasRef} className="tos-hero-3d__canvas" />
      <div className="tos-hero-3d__glow" />
    </div>
  );
}
