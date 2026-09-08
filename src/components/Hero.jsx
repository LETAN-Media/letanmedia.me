import React, { Suspense, lazy, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const Hero3D = lazy(() => import('./Hero3D'));

const HeroStaticFallback = () => (
  <picture className="lm-hero__poster" aria-hidden="true">
    <source srcSet="/images/hero-poster.webp" type="image/webp" />
    <img
      src="/images/hero-poster.webp"
      alt=""
      width="720"
      height="720"
      decoding="async"
    />
  </picture>
);

const canUseWebGL = () => {
  if (typeof document === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      canvas.getContext('webgl2')
      || canvas.getContext('webgl')
      || canvas.getContext('experimental-webgl'),
    );
  } catch {
    return false;
  }
};

const Hero = () => {
  const reduceMotion = usePrefersReducedMotion();
  const supportsWebGL = useMemo(canUseWebGL, []);

  return (
    <section className="lm-hero">
      <div className="lm-hero__container">
        <div className="lm-hero__layout">
          {/* Left: Editorial Content */}
          <motion.div
            className="lm-hero__content"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
          >
            <div className="lm-eyebrow lm-eyebrow--electric">
              <span className="lm-eyebrow-dot" />
              AI · MEDIA · SOFTWARE
            </div>

            <h1 className="lm-hero__title">
              <span className="lm-hero__headline">
                <span className="lm-hero__headline-line">Biến công nghệ thành</span>
                <span className="lm-hero__headline-line lm-hero__headline-line--accent">
                  năng lực tăng trưởng
                </span>
              </span>
            </h1>

            <p className="lm-hero__description">
              Kết nối AI, truyền thông số, phần mềm tự động hóa và bảo vệ thương hiệu thành một hệ giải pháp phù hợp với bài toán thực tế của doanh nghiệp.
            </p>

            <div className="lm-hero__actions">
              <a
                href="#services"
                className="lm-btn lm-btn--primary"
              >
                <span>Khám phá năng lực</span>
                <ArrowRight size={18} strokeWidth={1.8} />
              </a>

              <Link
                to="/contact"
                className="lm-btn lm-btn--secondary"
              >
                <MessageCircle size={18} strokeWidth={1.7} />
                <span>Trao đổi bài toán</span>
              </Link>
            </div>
          </motion.div>

          {/* Right: Signal Field (3D Canvas) */}
          <motion.div
            className="lm-hero__visual"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.165, 0.84, 0.44, 1] }}
            aria-hidden="true"
          >
            <div className="lm-hero__visual-glow" />

            {reduceMotion || !supportsWebGL ? (
              <HeroStaticFallback />
            ) : (
              <Suspense fallback={<HeroStaticFallback />}>
                <Hero3D />
              </Suspense>
            )}

            <div className="lm-hero__visual-fade" />
          </motion.div>
        </div>

        {/* Trust bar below fold */}
        <div className="lm-hero__trust">
          <div className="lm-hero__trust-inner">
            <div className="lm-hero__trust-label">
              <span className="lm-hero__trust-indicator" />
              <span>Một hệ năng lực kết nối</span>
            </div>

            <div className="lm-hero__trust-items">
              <div className="lm-hero__trust-pill">
                <span className="lm-hero__trust-pill-dot lm-hero__trust-pill-dot--ai" />
                <span>AI Automation</span>
              </div>
              <div className="lm-hero__trust-pill">
                <span className="lm-hero__trust-pill-dot lm-hero__trust-pill-dot--cyan" />
                <span>Digital Growth</span>
              </div>
              <div className="lm-hero__trust-pill">
                <span className="lm-hero__trust-pill-dot lm-hero__trust-pill-dot--gold" />
                <span>Platform Protection</span>
              </div>
              <div className="lm-hero__trust-pill">
                <span className="lm-hero__trust-pill-dot lm-hero__trust-pill-dot--cobalt" />
                <span>Web & Software</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;