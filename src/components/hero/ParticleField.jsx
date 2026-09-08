import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Lightweight 2D particle field — shared visual for hero backgrounds.
 * Replaces the heavier three.js point-sphere on the landing hero to keep
 * the initial bundle small and mobile-friendly. Respects reduced-motion
 * (renders a single static frame) and pauses when off-screen.
 */
const ParticleField = ({ color = 'var(--lm-electric)', accent = 'var(--lm-champagne)', className = '', density = 1 }) => {
  const canvasRef = useRef(null);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf = null;
    let running = true;
    let particles = [];

    const baseCount = isMobile ? 42 : 96;
    const count = Math.round(baseCount * density);
    const linkDist = isMobile ? 110 : 150;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth || canvas.parentElement.clientWidth;
      const h = canvas.clientHeight || canvas.parentElement.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        a: Math.random() > 0.82 ? accent : color,
        r: Math.random() * 1.6 + 0.8,
      }));
      return { w, h };
    };

    let { w, h } = setup();

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reduced) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.a;
        ctx.globalAlpha = 0.85;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = color;
            ctx.globalAlpha = (1 - d / linkDist) * 0.12;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (!running) return;
      draw();
      if (!reduced) raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      draw();
    } else {
      loop();
    }

    const ro = new ResizeObserver(() => {
      const next = setup();
      w = next.w; h = next.h;
      if (reduced) draw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced && !raf) {
          running = true; loop();
        } else if (!entry.isIntersecting) {
          running = false;
          if (raf) cancelAnimationFrame(raf);
          raf = null;
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [color, accent, density, isMobile, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    />
  );
};

export default ParticleField;
