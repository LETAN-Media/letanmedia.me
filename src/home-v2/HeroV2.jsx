import React, {
  Suspense,
  lazy,
  useEffect,
  useRef,
} from 'react';

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

const Fish3D = lazy(() => import('../components/Fish3D'));

const SMOOTH_TAU = 0.30;
const EPSILON = 0.00004;

function useSmoothProgress(source, disabled = false) {
  const smooth = useMotionValue(source.get());

  const targetRef = useRef(source.get());
  const currentRef = useRef(source.get());
  const rafRef = useRef(null);
  const previousTimeRef = useRef(null);

  useEffect(() => {
    if (disabled) {
      const sync = (value) => {
        targetRef.current = value;
        currentRef.current = value;
        smooth.set(value);
      };

      sync(source.get());

      return source.on('change', sync);
    }

    const stop = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      previousTimeRef.current = null;
    };

    const frame = (timestamp) => {
      const previous =
        previousTimeRef.current ?? timestamp;

      const delta = Math.min(
        Math.max(
          (timestamp - previous) / 1000,
          0,
        ),
        0.05,
      );

      previousTimeRef.current = timestamp;

      const current = currentRef.current;
      const target = targetRef.current;

      const alpha =
        1 - Math.exp(-delta / SMOOTH_TAU);

      const next =
        current + (target - current) * alpha;

      if (Math.abs(target - next) <= EPSILON) {
        currentRef.current = target;
        smooth.set(target);

        rafRef.current = null;
        previousTimeRef.current = null;

        return;
      }

      currentRef.current = next;
      smooth.set(next);

      rafRef.current =
        requestAnimationFrame(frame);
    };

    const start = () => {
      if (rafRef.current !== null) {
        return;
      }

      previousTimeRef.current = null;

      rafRef.current =
        requestAnimationFrame(frame);
    };

    const unsubscribe = source.on(
      'change',
      (value) => {
        targetRef.current = value;
        start();
      },
    );

    return () => {
      unsubscribe();
      stop();
    };
  }, [
    disabled,
    smooth,
    source,
  ]);

  return smooth;
}

export default function HeroV2() {
  const sectionRef = useRef(null);

  const reduceMotion =
    useReducedMotion();

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,
    offset: [
      'start start',
      'end end',
    ],
  });

  const progress =
    useSmoothProgress(
      scrollYProgress,
      Boolean(reduceMotion),
    );

  /*
   * Scene-state Peach vẫn nhận toàn bộ 0 -> 1.
   * Không nén keyframe.
   */
  const sceneProgress = useTransform(
    progress,
    [0, 0.18, 0.55, 1],
    [0, 0.05, 0.24, 0.52],
  );

  const introOpacity = useTransform(
    progress,
    [0, 0.15, 0.32],
    [1, 1, 0],
  );

  const introY = useTransform(
    progress,
    [0, 0.34],
    [0, -70],
  );

  const titleScale = useTransform(
    progress,
    [0, 0.30],
    [1, 0.94],
  );

  const depthOpacity = useTransform(
    progress,
    [0.52, 0.70, 0.94],
    [0, 1, 0],
  );

  const depthY = useTransform(
    progress,
    [0.50, 0.72],
    [48, 0],
  );

  const progressScale = useTransform(
    progress,
    [0, 1],
    [0, 1],
  );

  return (
    <section
      ref={sectionRef}
      className="lmv2-hero"
    >
      <div className="lmv2-hero__stage">

        <div
          className="lmv2-hero__fallback"
          aria-hidden="true"
        />

        <div
          className="lmv2-hero__canvas"
          aria-hidden="true"
        >
          <Suspense fallback={null}>
            <Fish3D
              progress={sceneProgress}
              reduceMotion={reduceMotion}
            />
          </Suspense>
        </div>

        <motion.div
          className="lmv2-hero__intro"
          style={{
            opacity: introOpacity,
            y: introY,
          }}
        >
          <div className="lmv2-hero__eyebrow">
            <span>001</span>
            <span>VIETNAM / 2026</span>
          </div>

          <motion.h1
            style={{
              scale: titleScale,
            }}
          >
            <span>LETAN</span>
            <span className="lmv2-hero__media">
              Media
            </span>
          </motion.h1>

          <div className="lmv2-hero__intro-bottom">
            <p>
              Giải pháp AI, truyền thông số và
              phát triển phần mềm cho cá nhân
              và doanh nghiệp.
            </p>

            <div className="lmv2-hero__actions">
              <a href="#v2-services">
                Khám phá năng lực
              </a>

              <a
                href="/contact"
                className="lmv2-button"
              >
                Trao đổi dự án
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="lmv2-hero__depth-copy"
          style={{
            opacity: depthOpacity,
            y: depthY,
          }}
        >
          <span>
            AI · MEDIA · SOFTWARE
          </span>

          <h2>
            Từ ý tưởng
            <br />
            đến hệ thống.
          </h2>
        </motion.div>

        <div className="lmv2-hero__scroll-line">
          <motion.span
            style={{
              scaleX: progressScale,
            }}
          />
        </div>

      </div>
    </section>
  );
}
