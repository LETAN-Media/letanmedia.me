import React from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../config/assets';

const ImageWithFallback = ({ srcAvif, srcWebp, alt, className }) => {
  return (
    <picture className={className}>
      <source srcSet={srcAvif} type="image/avif" />
      <source srcSet={srcWebp} type="image/webp" />
      <img 
        src={srcWebp} 
        alt={alt} 
        className={className} 
        loading="lazy"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'block';
        }}
      />
      {/* Fallback skeleton if image fails to load */}
      <div className={`skeleton-placeholder ${className} fallback-skeleton`} style={{ display: 'none' }}>
        <div className="skeleton-glow"></div>
      </div>
    </picture>
  );
};

export default ImageWithFallback;
