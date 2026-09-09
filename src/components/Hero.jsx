import React, {
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';

import '../home/fable-hero.css';
import '../home/peach-motion-tuning.css';

const Fish3D = lazy(() => import('./Fish3D'));

/*
 * PeachWeb uses smooth scrolling before its scene timeline receives
 * progress. We keep native page scrolling, but smooth the visual
 * timeline with an exponential low-pass filter.
 *
 * No bounce.
 * No overshoot.
 * Roughly settles in ~0.8–1.0s after a hard flick.
 */
const PEACH_SMOOTH_TAU = 0.18;
const PEACH_PROGRESS_EPSILON = 0.00004;

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
  if (typeof document === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');

    const context =
      canvas.getContext('webgl2')
      || canvas.getContext('webgl')
      || canvas.getContext('experimental-webgl');

    const supported = Boolean(context);

    context
      ?.getExtension('WEBGL_lose_context')
      ?.loseContext();

    return supported;
  } catch {
    return false;
  }
};

/*
 * Smooth a MotionValue without a spring.
 *
 * This is intentionally not useSpring:
 * Peach motion should have inertia but must not wobble or overshoot.
 *
 * The RAF only runs while current progress is catching the target,
 * so it does not create a permanent animation loop.
 */
function usePeachSmoothProgress(
  source,
  disabled = false,
) {
  const smoothed = useMotionValue(source.get());

  const targetRef = useRef(source.get());
  const currentRef = useRef(source.get());
  const frameRef = useRef(null);
  const previousTimeRef = useRef(null);

  useEffect(() => {
    if (disabled) {
      const syncImmediately = (value) => {
        targetRef.current = value;
        currentRef.current = value;
        smoothed.set(value);
      };

      syncImmediately(source.get());

      return source.on(
        'change',
        syncImmediately,
      );
    }

    targetRef.current = source.get();
    currentRef.current = source.get();
    smoothed.set(currentRef.current);

    const cancelFrame = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      previousTimeRef.current = null;
    };

    const step = (timestamp) => {
      const previousTime =
        previousTimeRef.current ?? timestamp;

      const deltaSeconds = Math.min(
        Math.max(
          (timestamp - previousTime) / 1000,
          0,
        ),
        0.05,
      );

      previousTimeRef.current = timestamp;

      const target = targetRef.current;
      const current = currentRef.current;

      const alpha =
        1
        - Math.exp(
          -deltaSeconds / PEACH_SMOOTH_TAU,
        );

      const next =
        current
        + (target - current) * alpha;

      if (
        Math.abs(target - next)
        <= PEACH_PROGRESS_EPSILON
      ) {
        currentRef.current = target;
        smoothed.set(target);

        frameRef.current = null;
        previousTimeRef.current = null;

        return;
      }

      currentRef.current = next;
      smoothed.set(next);

      frameRef.current =
        requestAnimationFrame(step);
    };

    const startFrame = () => {
      if (frameRef.current !== null) {
        return;
      }

      previousTimeRef.current = null;

      frameRef.current =
        requestAnimationFrame(step);
    };

    const unsubscribe = source.on(
      'change',
      (value) => {
        targetRef.current = value;
        startFrame();
      },
    );

    return () => {
      unsubscribe();
      cancelFrame();
    };
  }, [
    disabled,
    smoothed,
    source,
  ]);

  return smoothed;
}

const Hero = () => {
  const sectionRef = useRef(null);

  const reduceMotion = useReducedMotion();

  const supportsWebGL =
    useMemo(
      canUseWebGL,
      [],
    );

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,
    offset: [
      'start start',
      'end end',
    ],
  });

  /*
   * ONE shared smooth source for the complete hero.
   *
   * Previously:
   * - DOM = spring progress
   * - Fish3D = raw scroll progress
   *
   * That caused the fish/camera to jump ahead of the typography.
   */
  const progress =
    usePeachSmoothProgress(
      scrollYProgress,
      Boolean(reduceMotion),
    );

  /*
   * Original Peach fish-RIG finishes its important hero movement
   * around scene progress ~0.45.
   *
   * We deliberately stretch scene 0 -> 0.48 across the first 75%
   * of the LETAN hero.
   *
   * Result:
   * fish choreography completes around LETAN progress ~0.70,
   * exactly when the blue transformation starts.
   *
   * The remaining Peach timeline finishes underneath the blue scene.
   */
  const sceneProgress = useTransform(
    progress,
    [0, 0.75, 1],
    [0, 0.48, 1],
  );

  /*
   * Keep the white/Peach world visible long enough for the fish.
   */
  const lightOpacity = useTransform(
    progress,
    [0, 0.70, 0.92],
    [1, 1, 0],
  );

  const lightY = useTransform(
    progress,
    [0.68, 0.92],
    [0, -70],
  );

  const mastheadX = useTransform(
    progress,
    [0, 0.72],
    ['0%', '-4%'],
  );

  /*
   * Blue transformation now starts near the end of fish choreography,
   * instead of starting almost immediately at 18%.
   */
  const blueY = useTransform(
    progress,
    [0.70, 0.92],
    ['101%', '0%'],
  );

  const blueContentOpacity = useTransform(
    progress,
    [0.84, 0.96],
    [0, 1],
  );

  const blueContentY = useTransform(
    progress,
    [0.82, 0.96],
    [54, 0],
  );

  const scrollHintOpacity = useTransform(
    progress,
    [0, 0.12, 0.30],
    [1, 1, 0],
  );

  return (
    <section
      ref={sectionRef}
      className={
        `lm-film-hero${
          reduceMotion
            ? ' lm-film-hero--reduced'
            : ''
        }`
      }
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
            <span>
              AI · MEDIA · SOFTWARE
            </span>

            <span>
              VIETNAM / 2026
            </span>
          </div>

          <motion.h1
            id="lm-film-hero-title"
            className="lm-film-hero__masthead"
            style={{
              x: mastheadX,
            }}
          >
            <span>
              LETAN
            </span>

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
                <span>
                  Khám phá năng lực
                </span>

                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                />
              </a>

              <Link
                to="/contact"
                className="lm-film-hero__pill lm-film-hero__pill--dark"
              >
                <span>
                  Trao đổi dự án
                </span>

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.6}
                />
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="lm-film-hero__scene lm-film-hero__scene--blue"
          style={{
            y: blueY,
          }}
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
              <span>
                Biến công nghệ
              </span>

              <span className="lm-film-hero__blue-title-right">
                thành năng lực tăng trưởng.
              </span>
            </h2>

            <div className="lm-film-hero__blue-footer">
              <div className="lm-film-hero__capabilities">
                <span>
                  Digital Growth
                </span>

                <span>
                  AI Automation
                </span>

                <span>
                  Web & Software
                </span>

                <span>
                  Platform Protection
                </span>
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
                  <span>
                    Bắt đầu dự án
                  </span>

                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.6}
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div
          className="lm-film-hero__artifact-slot"
          aria-hidden="true"
        >
          <div className="lm-film-hero__artifact">
            <div className="lm-film-hero__artifact-canvas">
              <div className="lm-peach-scene-fallback" />

              {supportsWebGL && (
                <VisualErrorBoundary
                  fallback={null}
                >
                  <Suspense fallback={null}>
                    <Fish3D
                      progress={sceneProgress}
                      reduceMotion={reduceMotion}
                    />
                  </Suspense>
                </VisualErrorBoundary>
              )}
            </div>
          </div>
        </div>

        <motion.div
          className="lm-film-hero__scroll"
          style={{
            opacity: scrollHintOpacity,
          }}
          aria-hidden="true"
        >
          <span>
            SCROLL TO TRANSFORM
          </span>

          <ArrowDown
            size={15}
            strokeWidth={1.5}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
