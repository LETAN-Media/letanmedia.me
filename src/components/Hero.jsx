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
      <div
        className="lm-hero__ambient"
        aria-hidden="true"
      />

      <div
        className="lm-hero__grid-pattern"
        aria-hidden="true"
      />

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
            AI · DIGITAL · GROWTH
          </div>

          <h1 className="lm-hero__title">
            <span className="lm-hero__brand">
              LETAN Media
            </span>

            <span className="lm-hero__headline">
              Kiến tạo tăng trưởng
              <br />
              trong kỷ nguyên AI
            </span>
          </h1>

          <p className="lm-hero__description">
            Giải pháp truyền thông số, AI, phần mềm
            automation và tư vấn chiến lược giúp cá
            nhân và doanh nghiệp bứt phá trong thời
            đại số.
          </p>

          <div className="lm-hero__actions">
            <a
              href="#services"
              className="lm-btn lm-btn--primary"
            >
              <span>Khám phá dịch vụ</span>
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
              <span>Tư vấn ngay</span>
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

          <div className="lm-orbit-chip lm-orbit-chip--ai">
            <span />
            AI
          </div>

          <div className="lm-orbit-chip lm-orbit-chip--growth">
            <span />
            GROWTH
          </div>

          <div className="lm-orbit-chip lm-orbit-chip--automation">
            <span />
            AUTOMATION
          </div>

          <div className="lm-orbit-chip lm-orbit-chip--results">
            <span />
            REAL RESULTS
          </div>

          <div className="lm-hero__visual-fade" />
        </motion.div>
      </div>

      <div className="lm-hero__trust">
        <div className="lm-hero__trust-inner">
          <div className="lm-hero__trust-label">
            Đồng hành cùng bạn kiến tạo tương lai
          </div>

          <div className="lm-hero__trust-items">
            <span>TikTok</span>
            <span>Facebook</span>

            <ArrowRight
              size={16}
              strokeWidth={1.5}
            />

            <strong>Business Growth</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
