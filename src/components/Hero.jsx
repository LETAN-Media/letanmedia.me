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
   *
   * With the blue scene removed, this smoothed progress feeds
   * Fish3D 1:1 so the full Peach timeline (fish rig 0 -> 0.45,
   * camera dive to ~0.81, underwater reveal to ~0.76) plays
   * naturally across the whole hero.
   */
  const progress =
    usePeachSmoothProgress(
      scrollYProgress,
      Boolean(reduceMotion),
    );

  /*
   * LETAN copy rides with the fish through the pastel act, then
   * drifts up while the camera dives so the underwater world
   * (jellyfish / rays / water) stays unobstructed.
   */
  const lightOpacity = useTransform(
    progress,
    [0, 0.55, 0.8],
    [1, 1, 0],
  );

  const lightY = useTransform(
    progress,
    [0.55, 0.8],
    [0, -70],
  );

  const mastheadX = useTransform(
    progress,
    [0, 0.72],
    ['0%', '-4%'],
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
                      progress={progress}
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
