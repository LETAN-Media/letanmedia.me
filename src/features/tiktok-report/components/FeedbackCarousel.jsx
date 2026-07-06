import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import './FeedbackCarousel.css';

const feedbacks = [
  {
    id: 1,
    image: "https://cdn.letanmedia.me/images/cap/1.jpg",
    customerName: "Khách hàng Zalo",
    platform: "Zalo",
    service: "Dịch vụ Report TikTok"
  },
  {
    id: 2,
    image: "https://cdn.letanmedia.me/images/cap/2.jpg", 
    customerName: "Khách hàng Zalo",
    platform: "Zalo",
    service: "Gỡ Video Bôi Nhọ"
  },
  {
    id: 3,
    image: "https://cdn.letanmedia.me/images/cap/3.jpg",
    customerName: "Khách hàng Telegram",
    platform: "Telegram",
    service: "Xử Lý Khủng Hoảng"
  },
  {
    id: 4,
    image: "https://cdn.letanmedia.me/images/cap/4.jpg",
    customerName: "Khách hàng Zalo",
    platform: "Zalo",
    service: "Bảo vệ Bản Quyền"
  },
  {
    id: 5,
    image: "https://cdn.letanmedia.me/images/cap/5.jpg",
    customerName: "Khách hàng Telegram",
    platform: "Telegram",
    service: "Tư Vấn TikTok"
  },
  {
    id: 6,
    image: "https://cdn.letanmedia.me/images/cap/6.jpg",
    customerName: "Khách hàng Messenger",
    platform: "Messenger",
    service: "Report Cạnh Tranh Bẩn"
  },
  {
    id: 7,
    image: "https://cdn.letanmedia.me/images/cap/7.jpg",
    customerName: "Khách hàng Zalo",
    platform: "Zalo",
    service: "Report Phiên Live"
  },
  {
    id: 8,
    image: "https://cdn.letanmedia.me/images/cap/8.jpg",
    customerName: "Khách hàng Telegram",
    platform: "Telegram",
    service: "Đánh Gậy Bản Quyền"
  }
];

export default function FeedbackCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (isHovered || selectedImage) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered, selectedImage]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);

  const getVisibleFeedbacks = () => {
    const items = [];
    for (let i = -1; i <= 1; i++) {
      let index = (currentIndex + i + feedbacks.length) % feedbacks.length;
      items.push({ item: feedbacks[index], position: i, originalIndex: index });
    }
    return items;
  };

  return (
    <section className="feedback-section" id="feedback">
      <div className="feedback-container">
        <div className="feedback-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="feedback-title"
          >
            Phản Hồi Từ Khách Hàng
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="feedback-subtitle"
          >
            Hàng trăm khách hàng đã tin tưởng và sử dụng dịch vụ của LETAN Media.
          </motion.p>
        </div>

        <div 
          className="carousel-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button className="carousel-nav prev" onClick={prevSlide}><ChevronLeft /></button>
          
          <div className="carousel-track">
            <AnimatePresence initial={false}>
              {getVisibleFeedbacks().map(({ item, position }) => {
                const isActive = position === 0;
                return (
                  <motion.div
                    key={item.id}
                    className={`carousel-card ${isActive ? 'active' : 'inactive'}`}
                    onClick={() => isActive && setSelectedImage(item.image)}
                    initial={{ opacity: 0, x: `${position * 105}%`, scale: 0.8 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.5,
                      x: `${position * 110}%`,
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
                        <img src={item.image} alt={item.customerName} loading="lazy" />
                        <div className="skeleton-shimmer"></div>
                      </div>
                      <div className="card-overlay">
                        <div className="card-info">
                          <p>{item.service}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button className="carousel-nav next" onClick={nextSlide}><ChevronRight /></button>
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

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button className="lightbox-close"><X size={32} /></button>
            <motion.img 
              src={selectedImage} 
              alt="Feedback Lightbox"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
