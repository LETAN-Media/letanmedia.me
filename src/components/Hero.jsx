import React, {
  Suspense,
  lazy,
  useEffect,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

const Hero3D = lazy(() => import('./Hero3D'));

const HeroStaticFallback = () => (
  <div
    className="lm-hero__static-globe"
    aria-hidden="true"
  >
    <div className="lm-hero__static-grid" />
    <div className="lm-hero__static-halo" />
  </div>
);

const Hero = () => {
  const [reduceMotion, setReduceMotion] =
    useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    const syncMotionPreference = () => {
      setReduceMotion(mediaQuery.matches);
    };

    syncMotionPreference();

    mediaQuery.addEventListener(
      'change',
      syncMotionPreference,
    );

    return () => {
      mediaQuery.removeEventListener(
        'change',
        syncMotionPreference,
      );
    };
  }, []);

  return (
    <section className="lm-hero">
      <div className="lm-hero__container">
        <motion.div
          className="lm-hero__content"
          initial={{
            opacity: 0,
            y: 28,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            ease: [0.165, 0.84, 0.44, 1],
          }}
        >
          <div className="lm-hero__eyebrow">
            <span className="lm-hero__eyebrow-dot" />
            AI · DIGITAL SOLUTIONS & GROWTH
          </div>

          <h1 className="lm-hero__title">
            <span className="lm-hero__brand">
              LETAN <span>Media</span>
            </span>

            <span className="lm-hero__headline">
              Kiến tạo vị thế số &
              <br />
              tăng trưởng bứt phá
            </span>
          </h1>

          <p className="lm-hero__description">
            Giải pháp AI, truyền thông số, phần mềm tự động hóa và bảo vệ thương hiệu — xây dựng năng lực số toàn diện cho doanh nghiệp trong kỷ nguyên mới.
          </p>

          <div className="lm-hero__actions">
            <a
              href="#services"
              className="lm-btn lm-btn--primary"
            >
              <span>Khám phá giải pháp</span>
              <ArrowRight
                size={18}
                strokeWidth={1.8}
              />
            </a>

            <Link
              to="/contact"
              className="lm-btn lm-btn--secondary"
            >
              <MessageCircle
                size={18}
                strokeWidth={1.7}
              />
              <span>Tư vấn chiến lược</span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="lm-hero__visual"
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: reduceMotion ? 0 : 1.1,
            delay: reduceMotion ? 0 : 0.15,
            ease: [0.165, 0.84, 0.44, 1],
          }}
          aria-hidden="true"
        >
          <div className="lm-hero__visual-glow" />

          {reduceMotion ? (
            <HeroStaticFallback />
          ) : (
            <Suspense fallback={<HeroStaticFallback />}>
              <Hero3D />
            </Suspense>
          )}

          <div className="lm-hero__visual-fade" />
        </motion.div>
      </div>

      <div className="lm-hero__trust">
        <div className="lm-hero__trust-inner">
          <div className="lm-hero__trust-label">
            Lĩnh vực thế mạnh
          </div>

          <div className="lm-hero__trust-items">
            <span>AI Automation</span>
            <span style={{ color: 'var(--lm-champagne)', opacity: 0.5 }}>•</span>
            <span>Digital Growth</span>
            <span style={{ color: 'var(--lm-champagne)', opacity: 0.5 }}>•</span>
            <span>Platform Protection</span>
            <span style={{ color: 'var(--lm-champagne)', opacity: 0.5 }}>•</span>
            <span>Web Systems</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
