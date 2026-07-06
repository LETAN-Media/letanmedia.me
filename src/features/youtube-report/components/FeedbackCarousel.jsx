import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './FeedbackCarousel.css';

const feedbacks = [
  { id: '1', customerName: 'Khách hàng 1', image: 'https://cdn.letanmedia.me/images/cap/1.jpg' },
  { id: '2', customerName: 'Khách hàng 2', image: 'https://cdn.letanmedia.me/images/cap/2.jpg' },
  { id: '3', customerName: 'Khách hàng 3', image: 'https://cdn.letanmedia.me/images/cap/3.jpg' },
  { id: '4', customerName: 'Khách hàng 4', image: 'https://cdn.letanmedia.me/images/cap/4.jpg' },
  { id: '5', customerName: 'Khách hàng 5', image: 'https://cdn.letanmedia.me/images/cap/5.jpg' },
  { id: '6', customerName: 'Khách hàng 6', image: 'https://cdn.letanmedia.me/images/cap/6.jpg' }
];

export default function FeedbackCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  const getVisibleFeedbacks = () => {
    const indices = [-1, 0, 1];
    return indices.map((offset) => {
      const idx = (currentIndex + offset + feedbacks.length) % feedbacks.length;
      return {
        item: feedbacks[idx],
        position: offset
      };
    });
  };

  return (
    <section className="feedback-section section-block" id="feedback">
      <div className="feedback-container">
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Kết Quả <span className="gradient-text">Xử Lý Thực Tế</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-subtitle"
          >
            Những trường hợp thực tế đã được LETAN Media xử lý thành công.
          </motion.p>
        </div>

        <div 
          className="carousel-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button aria-label="Previous Slide" className="carousel-nav prev" onClick={prevSlide}><ChevronLeft /></button>
          
          <div className="carousel-track">
            <AnimatePresence initial={false}>
              {getVisibleFeedbacks().map(({ item, position }) => {
                const isActive = position === 0;
                return (
                  <motion.div
                    key={item.id}
                    className={`carousel-card ${isActive ? 'active' : 'inactive'}`}
                    initial={{ opacity: 0, x: `${position * (isMobile ? 85 : 105)}%`, scale: 0.8 }}
                    animate={{ 
                      opacity: isActive ? 1 : (isMobile ? 0.7 : 0.5),
                      x: `${position * (isMobile ? 90 : 110)}%`,
                      scale: isActive ? 1 : 0.92,
                      filter: isActive ? 'blur(0px)' : 'blur(4px)',
                      zIndex: isActive ? 10 : 0
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <div className="card-glass-effect">
                      <div className="image-wrapper">
                        <img src={item.image} alt={item.customerName} loading="lazy" width={320} height={570} />
                        <div className="skeleton-shimmer"></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button aria-label="Next Slide" className="carousel-nav next" onClick={nextSlide}><ChevronRight /></button>
        </div>

        <div className="carousel-pagination">
          {feedbacks.map((_, idx) => (
            <button 
              key={idx} 
              aria-label={`Go to slide ${idx + 1}`}
              className={`dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
