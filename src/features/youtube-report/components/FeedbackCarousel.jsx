import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import './FeedbackCarousel.css';

const feedbacks = [
  { 
    id: '1', 
    customerName: 'Xác nhận gỡ bỏ video vi phạm bản quyền', 
    badge: 'Bản quyền DMCA',
    image: 'https://image.letanmedia.me/images/youtube-report/1.webp',
    fullImage: 'https://image.letanmedia.me/images/youtube-report/IMG_4949.JPG'
  },
  { 
    id: '2', 
    customerName: 'YouTube gỡ bỏ nội dung vi phạm thành công', 
    badge: 'Gỡ video vi phạm',
    image: 'https://image.letanmedia.me/images/youtube-report/2.webp',
    fullImage: 'https://image.letanmedia.me/images/youtube-report/IMG_4950.JPG'
  },
  { 
    id: '3', 
    customerName: 'Thông báo gỡ bỏ nội dung từ YouTube Team', 
    badge: 'Xử lý reup',
    image: 'https://image.letanmedia.me/images/youtube-report/3.webp',
    fullImage: 'https://image.letanmedia.me/images/youtube-report/IMG_4948.PNG'
  },
  { 
    id: '4', 
    customerName: 'Bảo vệ thương hiệu & xử lý vi phạm bản quyền', 
    badge: 'Bảo vệ kênh',
    image: 'https://image.letanmedia.me/images/youtube-report/4.webp',
    fullImage: 'https://image.letanmedia.me/images/youtube-report/IMG_4947.PNG'
  },
  { 
    id: '5', 
    customerName: 'Xác nhận gỡ bỏ hoàn tất từ YouTube Support', 
    badge: 'Hỗ trợ khẩn cấp',
    image: 'https://image.letanmedia.me/images/youtube-report/5.webp',
    fullImage: 'https://image.letanmedia.me/images/youtube-report/IMG_4946.PNG'
  }
];

export default function FeedbackCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
                    onClick={() => {
                      if (isActive) {
                        setSelectedImage(item);
                      } else if (position === 1) {
                        nextSlide();
                      } else if (position === -1) {
                        prevSlide();
                      }
                    }}
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, { offset }) => {
                      if (offset.x < -50) nextSlide();
                      else if (offset.x > 50) prevSlide();
                    }}
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
                        {isActive && (
                          <div className="card-zoom-hint">
                            <Maximize2 size={15} />
                            <span>Xem chi tiết</span>
                          </div>
                        )}
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

        {/* Evidence Image Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              className="lightbox-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <div className="lightbox-backdrop" />
              <motion.div 
                className="lightbox-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="lightbox-close"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Đóng"
                >
                  <X size={22} />
                </button>
                <div className="lightbox-image-container">
                  <img 
                    src={selectedImage.fullImage || selectedImage.image} 
                    alt={selectedImage.customerName} 
                    className="lightbox-img"
                  />
                </div>
                <div className="lightbox-caption">
                  <span className="lightbox-badge">{selectedImage.badge}</span>
                  <p className="lightbox-title">{selectedImage.customerName}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
