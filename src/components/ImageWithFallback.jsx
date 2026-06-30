import React, { useState } from 'react';

const ImageWithFallback = ({ src, srcAvif, srcWebp, alt, className = '' }) => {
  const [failed, setFailed] = useState(false);

  const webp = srcWebp || src;
  const avif = srcAvif;

  if (!webp || failed) {
    return (
      <div className={`skeleton-placeholder ${className} fallback-skeleton`}>
        <div className="skeleton-glow"></div>
      </div>
    );
  }

  return (
    <picture>
      {avif && <source srcSet={avif} type="image/avif" />}
      <source srcSet={webp} type="image/webp" />
      <img
        src={webp}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </picture>
  );
};

export default ImageWithFallback;
