import React, { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../config/assets';
import ImageWithFallback from './ImageWithFallback';

const Hero3D = lazy(() => import('./Hero3D'));

const Hero = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <section className="hero">
      <div className="hero-visual-bg">
        <div className="hero-gradient-overlay"></div>
        
        {!reduceMotion && (
          <Suspense fallback={
            <div className="skeleton-placeholder hero-skeleton">
              <div className="skeleton-glow"></div>
            </div>
          }>
            <Hero3D />
          </Suspense>
        )}

        <div className={`hero-image ${!reduceMotion ? 'mobile-only' : ''}`}>
          <ImageWithFallback 
            srcWebp={ASSETS.hero.mainWebp} 
            srcAvif={ASSETS.hero.mainAvif} 
            alt="Hero Background" 
          />
        </div>
      </div>

      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.165, 0.84, 0.44, 1] }}
      >
        <h1 className="hero-title">
          LETAN Media<br/>
          <span className="text-gradient-accent">AI • Marketing • Digital Growth</span>
        </h1>
        <h2 className="hero-subtitle">
          Giải pháp AI, truyền thông số và phát triển phần mềm dành cho cá nhân và doanh nghiệp.
        </h2>
        <div className="hero-actions">
          <button className="btn-primary">Khám phá dịch vụ</button>
          <button className="btn-outline">Tư vấn ngay</button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
