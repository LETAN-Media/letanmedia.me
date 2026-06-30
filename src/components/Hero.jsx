import React from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../config/assets';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-visual-bg">
        <div className="hero-gradient-overlay"></div>
        {/* Support future hero video. Disabled on mobile via CSS. */}
        <video 
          className="hero-video desktop-only"
          autoPlay 
          muted 
          loop 
          playsInline
          poster={ASSETS.hero.poster}
        >
          <source src={ASSETS.hero.videoWebm} type="video/webm" />
          <source src={ASSETS.hero.videoMp4} type="video/mp4" />
        </video>
        {/* Fallback image for mobile or if video fails */}
        <picture className="hero-image mobile-only">
          <source srcSet={ASSETS.hero.mainAvif} type="image/avif" />
          <img src={ASSETS.hero.mainWebp} alt="Hero Background" loading="lazy" />
        </picture>
        {/* 3D Visual Placeholder when assets are missing */}
        <div className="skeleton-placeholder hero-skeleton">
          <div className="skeleton-glow"></div>
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
