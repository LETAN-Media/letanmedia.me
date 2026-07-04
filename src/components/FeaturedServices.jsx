import React, { useEffect, useRef, useState } from 'react';
import { CDN } from '../config/assets';
import './FeaturedServices.css';

const FEATURED_DATA = [
  {
    id: 'report-tiktok',
    title: 'Report TikTok',
    webm: `${CDN}/videos/featured/report-tiktok.webm`,
    mp4: `${CDN}/videos/featured/report-tiktok.mp4`,
    poster: `${CDN}/images/featured/report-tiktok.webp`,
    link: '#report-tiktok'
  },
  {
    id: 'tich-xanh-tiktok',
    title: 'Tích Xanh TikTok',
    webm: `${CDN}/videos/featured/tich-xanh-tiktok.webm`,
    mp4: `${CDN}/videos/featured/tich-xanh-tiktok.mp4`,
    poster: `${CDN}/images/featured/tich-xanh-tiktok.webp`,
    link: '#tich-xanh-tiktok'
  },
  {
    id: 'tich-xanh-facebook',
    title: 'Tích Xanh Facebook',
    webm: `${CDN}/videos/featured/tich-xanh-facebook.webm`,
    mp4: `${CDN}/videos/featured/tich-xanh-facebook.mp4`,
    poster: `${CDN}/images/featured/tich-xanh-facebook.webp`,
    link: '#tich-xanh-facebook'
  },
  {
    id: 'chatbot-ai',
    title: 'Chatbot AI',
    webm: `${CDN}/videos/featured/chatbot-ai.webm`,
    mp4: `${CDN}/videos/featured/chatbot-ai.mp4`,
    poster: `${CDN}/images/featured/chatbot-ai.webp`,
    link: '#chatbot-ai'
  }
];

const FeaturedVideo = ({ item, prefersReducedMotion }) => {
  const videoRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            if (videoRef.current) {
              videoRef.current.play().catch(e => console.log('Autoplay prevented by browser:', e));
            }
          } else {
            // Unmount source or pause when out of view
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <img 
        src={item.poster} 
        alt={item.title} 
        loading="lazy" 
        className="featured-media"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="featured-media"
      poster={item.poster}
      muted
      loop
      playsInline
      preload="none"
    >
      {isIntersecting && <source src={item.webm} type="video/webm" />}
      {isIntersecting && <source src={item.mp4} type="video/mp4" />}
    </video>
  );
};

const FeaturedServices = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Check if on a low-end mobile (simple heuristic based on connection)
    const isLowPower = navigator.connection && (navigator.connection.saveData || navigator.connection.effectiveType === '2g' || navigator.connection.effectiveType === '3g');
    
    // Combine both settings
    setPrefersReducedMotion(mediaQuery.matches || isLowPower);

    const handler = (e) => setPrefersReducedMotion(e.matches || isLowPower);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  return (
    <section className="featured-section">
      <div className="featured-container">
        <h2 className="featured-title">Dịch Vụ Nổi Bật</h2>
        
        <div className="featured-grid">
          {FEATURED_DATA.map((item) => (
            <a href={item.link} key={item.id} className="featured-card">
              <div className="featured-media-container">
                <FeaturedVideo item={item} prefersReducedMotion={prefersReducedMotion} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
