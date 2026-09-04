import React, { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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

  const fallbackContent = (
    <div className="hero-image">
      {ASSETS.hero?.mainWebp && (
        <ImageWithFallback 
          srcWebp={ASSETS.hero.mainWebp} 
          srcAvif={ASSETS.hero.mainAvif} 
          alt="Hero Background" 
        />
      )}
    </div>
  );

  return (
    <section className="hero">
      <div className="hero-visual-bg">
        <div className="hero-gradient-overlay"></div>
        
        {!reduceMotion ? (
          <Suspense fallback={fallbackContent}>
            <Hero3D />
          </Suspense>
        ) : fallbackContent}
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
          <a href="#services" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Khám phá dịch vụ</a>
          <Link to="/contact" className="btn-outline" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Tư vấn ngay</Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
