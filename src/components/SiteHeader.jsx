import React, { useEffect } from 'react';

/**
 * React bridge for the shared header used by the static Peach homepage.
 * Pass `home` only when the header sits over the transparent homepage hero.
 */
export default function SiteHeader({ home = false }) {
  useEffect(() => {
    import(/* @vite-ignore */ '/shared/letan-site-header.js');
  }, []);

  return React.createElement('letan-site-header', home ? { home: '' } : {});
}
