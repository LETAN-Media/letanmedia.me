import React, {
  Suspense,
  lazy,
  useMemo,
  useRef,
} from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';

import '../home/fable-hero.css';

const Hero3D = lazy(() => import('./Hero3D'));
const Fish3D = lazy(() => import('./Fish3D'));

class VisualErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

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

const HeroFallback = () => (
  <picture className="lm-film-hero__fallback" aria-hidden="true">
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

const Hero = () => {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const supportsWebGL = useMemo(canUseWebGL, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 88,
    damping: 26,
    mass: 0.34,
  });

  const lightOpacity = useTransform(
    progress,
    [0, 0.28, 0.48],
    [1, 1, 0],
  );

  const lightY = useTransform(
    progress,
    [0, 0.48],
    [0, -70],
  );

  const mastheadX = useTransform(
    progress,
    [0, 0.45],
    ['0%', '-4%'],
  );

  const blueY = useTransform(
    progress,
    [0.18, 0.50],
    ['101%', '0%'],
  );

  const blueContentOpacity = useTransform(
    progress,
    [0.46, 0.62],
    [0, 1],
  );

  const blueContentY = useTransform(
    progress,
    [0.46, 0.68],
    [54, 0],
  );

  const artifactScale = useTransform(
    progress,
    [0, 0.30, 0.54, 1],
    [0.84, 0.94, 0.70, 0.76],
  );

  const artifactY = useTransform(
    progress,
    [0, 0.32, 0.60, 1],
    [18, -8, 10, -14],
  );

  const artifactRotate = useTransform(
    progress,
    [0, 0.48, 0.72, 1],
    [0, -1.6, 2.8, 0.8],
  );

  const scrollHintOpacity = useTransform(
    progress,
    [0, 0.10, 0.26],
    [1, 1, 0],
  );

  return (
    <section
      ref={sectionRef}
      className={`lm-film-hero${reduceMotion ? ' lm-film-hero--reduced' : ''}`}
      aria-labelledby="lm-film-hero-title"
    >
      <div className="lm-film-hero__stage">

        <motion.div
          className="lm-film-hero__scene lm-film-hero__scene--light"
          style={{
            opacity: lightOpacity,
            y: lightY,
          }}
        >
          <div className="lm-film-hero__light-meta">
            <span>AI · MEDIA · SOFTWARE</span>
            <span>VIETNAM / 2026</span>
          </div>

          <motion.h1
            id="lm-film-hero-title"
            className="lm-film-hero__masthead"
            style={{ x: mastheadX }}
          >
            <span>LETAN</span>
            <span className="lm-film-hero__masthead-media">
              Media
            </span>
          </motion.h1>

          <div className="lm-film-hero__light-footer">
            <div className="lm-film-hero__intro">
              <span className="lm-film-hero__number">
                001
              </span>

              <p>
                Giải pháp AI, truyền thông số và phát triển
                phần mềm dành cho cá nhân và doanh nghiệp.
              </p>
            </div>

            <div className="lm-film-hero__light-actions">
              <a
                href="#services"
                className="lm-film-hero__text-link"
              >
                <span>Khám phá năng lực</span>
                <ArrowRight size={16} strokeWidth={1.5} />
              </a>

              <Link
                to="/contact"
                className="lm-film-hero__pill lm-film-hero__pill--dark"
              >
                <span>Trao đổi dự án</span>
                <ArrowUpRight size={15} strokeWidth={1.6} />
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="lm-film-hero__scene lm-film-hero__scene--blue"
          style={{ y: blueY }}
        >
          <div className="lm-film-hero__blue-light lm-film-hero__blue-light--one" />
          <div className="lm-film-hero__blue-light lm-film-hero__blue-light--two" />
          <div className="lm-film-hero__noise" />

          <motion.div
            className="lm-film-hero__blue-content"
            style={{
              opacity: blueContentOpacity,
              y: blueContentY,
            }}
          >
            <h2 className="lm-film-hero__blue-title">
              <span>Biến công nghệ</span>

              <span className="lm-film-hero__blue-title-right">
                thành năng lực tăng trưởng.
              </span>
            </h2>

            <div className="lm-film-hero__blue-footer">
              <div className="lm-film-hero__capabilities">
                <span>Digital Growth</span>
                <span>AI Automation</span>
                <span>Web & Software</span>
                <span>Platform Protection</span>
              </div>

              <div className="lm-film-hero__blue-description">
                <p>
                  Kết nối AI, truyền thông số, phần mềm tự động
                  hóa và bảo vệ thương hiệu thành một hệ giải
                  pháp phù hợp với bài toán thực tế.
                </p>

                <Link
                  to="/contact"
                  className="lm-film-hero__pill lm-film-hero__pill--light"
                >
                  <span>Bắt đầu dự án</span>
                  <ArrowUpRight size={15} strokeWidth={1.6} />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div
          className="lm-film-hero__artifact-slot"
          aria-hidden="true"
        >
          <motion.div
            className="lm-film-hero__artifact"
            style={{
              scale: artifactScale,
              y: artifactY,
              rotateZ: artifactRotate,
            }}
          >
            <div className="lm-film-hero__artifact-canvas">
              {!supportsWebGL ? (
                <HeroFallback />
              ) : (
                <VisualErrorBoundary
                  fallback={(
                    <Suspense fallback={<HeroFallback />}>
                      <Hero3D />
                    </Suspense>
                  )}
                >
                  <Suspense fallback={<HeroFallback />}>
                    <Fish3D
                      progress={progress}
                      reduceMotion={reduceMotion}
                    />
                  </Suspense>
                </VisualErrorBoundary>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="lm-film-hero__scroll"
          style={{ opacity: scrollHintOpacity }}
          aria-hidden="true"
        >
          <span>SCROLL TO TRANSFORM</span>
          <ArrowDown size={15} strokeWidth={1.5} />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
