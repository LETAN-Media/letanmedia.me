import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Shared hero layout. Used by the home hero and report-page heroes to unify
 * structure (badge / title / subtitle / CTAs / visual) while preserving each
 * page's own copy and visual layer. Visual behaviour stays equivalent to the
 * previous per-page heroes.
 *
 * Props:
 *  className        section class (e.g. "hero" to reuse App.css styling)
 *  visual           ReactNode rendered as full-bleed background layer
 *  contentClassName class for the content wrapper (e.g. "hero-content")
 *  badge            ReactNode (string -> ui-badge)
 *  title            ReactNode (may include <br/> and accent spans)
 *  subtitle         ReactNode
 *  actions          ReactNode (CTA buttons)
 *  align            "left" | "center"
 *  id               anchor id
 *  titleClassName / subtitleClassName / actionsClassName / badgeClassName
 *                   allow pages to reuse their existing hero CSS classes
 */
const HeroBase = ({
  className = 'heroBase',
  visual,
  contentClassName = '',
  badge,
  title,
  subtitle,
  actions,
  align = 'left',
  id,
  titleClassName = 'heroBase-title',
  subtitleClassName = 'heroBase-subtitle',
  actionsClassName = 'heroBase-actions',
  badgeClassName = '',
}) => {
  const reduced = usePrefersReducedMotion();
  const content = (
    <>
      {badge && (typeof badge === 'string' ? <span className={`ui-badge ${badgeClassName}`}>{badge}</span> : badge)}
      {title && <h1 className={titleClassName}>{title}</h1>}
      {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
      {actions && <div className={actionsClassName}>{actions}</div>}
    </>
  );

  return (
    <section id={id} className={`heroBase ${className}`} style={align === 'center' ? { textAlign: 'center' } : undefined}>
      {visual && <div className="heroBase-visual" aria-hidden="true">{visual}</div>}
      {reduced ? (
        <div className={`heroBase-content ${contentClassName}`}>{content}</div>
      ) : (
        <motion.div
          className={`heroBase-content ${contentClassName}`}
          initial={{ opacity: 0.15, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.165, 0.84, 0.44, 1] }}
        >
          {content}
        </motion.div>
      )}
    </section>
  );
};

export default HeroBase;
