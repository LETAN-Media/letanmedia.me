import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../config/assets';
import ImageWithFallback from './ImageWithFallback';

const projects = [
  { id: 1, title: "Hệ Sinh Thái E-commerce", category: "Web & Software", imgAvif: ASSETS.portfolio.project1, imgWebp: ASSETS.portfolio.project1.replace('.avif', '.webp'), logo: ASSETS.services.website },
  { id: 2, title: "Chiến Dịch Tích Xanh TikTok", category: "Trust & Growth", imgAvif: ASSETS.portfolio.project2, imgWebp: ASSETS.portfolio.project2.replace('.avif', '.webp'), logo: ASSETS.services.tichXanh },
  { id: 3, title: "Chatbot AI CSKH 24/7", category: "AI Automation", imgAvif: ASSETS.portfolio.project3, imgWebp: ASSETS.portfolio.project3.replace('.avif', '.webp'), logo: ASSETS.services.chatbotAi },
  { id: 4, title: "Xử Lý Khủng Hoảng Truyền Thông", category: "PR & Media", imgAvif: ASSETS.portfolio.project4, imgWebp: ASSETS.portfolio.project4.replace('.avif', '.webp'), logo: ASSETS.services.reportTiktok },
  { id: 5, title: "Phát Triển Nhận Diện Thương Hiệu", category: "Branding", imgAvif: ASSETS.portfolio.project5, imgWebp: ASSETS.portfolio.project5.replace('.avif', '.webp'), logo: ASSETS.services.branding },
];

const Portfolio = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 400; // width of card + gap
      sliderRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="section bg-surface" style={{ overflow: 'hidden' }}>
      <div className="section-header text-center" style={{ marginBottom: '50px' }}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Các dự án <br/> <span style={{ color: 'var(--color-blue)' }}>LETAN</span> đã thực hiện
        </motion.h2>
      </div>

      <div className="ohi-slider-container">
        <div className="ohi-slider-track" ref={sliderRef}>
          {projects.map((proj, i) => (
            <motion.div 
              key={proj.id} 
              className="ohi-project-item"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <a href="#" className="ohi-project-link">
                <div className="ohi-wrap">
                  <div className="ohi-image-wrap">
                    <ImageWithFallback srcAvif={proj.imgAvif} srcWebp={proj.imgWebp} alt={proj.title} className="ohi-main-img" />
                    
                    <div className="ohi-overlay-wrap">
                      <div className="ohi-play-btn">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    <div className="ohi-logo-badge">
                      <ImageWithFallback srcWebp={proj.logo} alt="Logo" className="ohi-mini-logo" />
                    </div>
                  </div>
                  
                  <div className="ohi-content">
                    <h3 className="ohi-title">{proj.title}</h3>
                    <p className="ohi-category">{proj.category}</p>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Custom Navigation Arrows */}
        <div className="ohi-slider-arrows">
          <button className="ohi-arrow prev" onClick={() => scroll('left')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button className="ohi-arrow next" onClick={() => scroll('right')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
