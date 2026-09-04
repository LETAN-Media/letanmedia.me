import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const createMotionComponent = motion.create || motion;
export const MotionLink = createMotionComponent(Link);

const motionComponentCache = new Map();
motionComponentCache.set(Link, MotionLink);

function getMotionTag(as) {
  if (!as) return motion.div;
  if (as === Link || as === 'link') return MotionLink;
  if (typeof as === 'string') {
    return motion[as] || motion.div;
  }
  if (!motionComponentCache.has(as)) {
    motionComponentCache.set(as, createMotionComponent(as));
  }
  return motionComponentCache.get(as);
}

/**
 * Reveal — subtle entrance animation that respects reduced-motion.
 * Renders a static (no-transform) wrapper when the user prefers reduced motion,
 * so layout stays identical and nothing animates in.
 */
const Reveal = ({ children, as = 'div', delay = 0, y = 28, className = '', ...rest }) => {
  const reduced = usePrefersReducedMotion();
  const Tag = getMotionTag(as);

  if (reduced) {
    const Static = as;
    return <Static className={className} {...rest}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.165, 0.84, 0.44, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
