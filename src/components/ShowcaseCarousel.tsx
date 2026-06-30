import React, { useRef, useState } from 'react';
import { ASSETS } from '../config/assets';
import './ShowcaseCarousel.css';

const SHOWCASE_DATA = [
  {
    id: 'report-tiktok',
    title: 'Report TikTok',
    desc: 'Báo cáo chi tiết hiệu suất kênh TikTok, tối ưu chuyển đổi.',
    tag: 'TikTok',
    image: ASSETS.showcase.reportTiktok,
  },
  {
    id: 'tich-xanh',
    title: 'Tích Xanh TikTok',
    desc: 'Hỗ trợ lên tích xanh nhanh chóng, bảo vệ thương hiệu.',
    tag: 'TikTok',
    image: ASSETS.showcase.tichXanh,
  },
  {
    id: 'chatbot-ai',
    title: 'Chatbot AI',
    desc: 'Tự động hóa CSKH 24/7 với AI thông minh.',
    tag: 'AI',
    image: ASSETS.showcase.chatbotAi,
  },
  {
    id: 'website',
    title: 'Thiết Kế Website',
    desc: 'Website chuyên nghiệp, chuẩn SEO, UI/UX hiện đại.',
    tag: 'Dev',
    image: ASSETS.showcase.website,
  },
  {
    id: 'software',
    title: 'Phần Mềm Theo Yêu Cầu',
    desc: 'Giải pháp phần mềm tối ưu riêng cho doanh nghiệp.',
    tag: 'Dev',
    image: ASSETS.showcase.software,
  },
  {
    id: 'automation',
    title: 'Automation Workflow',
    desc: 'Tối ưu vận hành với quy trình tự động hóa.',
    tag: 'AI/Tech',
    image: ASSETS.showcase.automation,
  },
  {
    id: 'social-media',
    title: 'Social Media Marketing',
    desc: 'Xây dựng và phát triển kênh Social toàn diện.',
    tag: 'Marketing',
    image: ASSETS.showcase.socialMedia,
  },
  {
    id: 'branding',
    title: 'Quản Trị Thương Hiệu',
    desc: 'Định vị và gia tăng giá trị thương hiệu số.',
    tag: 'Marketing',
    image: ASSETS.showcase.branding,
  },
  {
    id: 'mobile-app',
    title: 'Mobile App',
    desc: 'Phát triển ứng dụng iOS & Android đa nền tảng.',
    tag: 'Dev',
    image: ASSETS.showcase.mobileApp,
  }
];

const PlaceholderIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="showcase-placeholder-icon"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

const ShowcaseCarousel = () => {
  const carouselRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handlePointerDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handlePointerLeave = () => {
    setIsDown(false);
  };

  const handlePointerUp = () => {
    setIsDown(false);
  };

  const handlePointerMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="showcase-section" aria-label="Portfolio and Services Showcase">
      <div className="showcase-container">
        <div className="showcase-title-wrapper">
          <h2 className="showcase-title">
            LETAN Media là Digital Growth Studio chuyên AI, Marketing, TikTok Services &amp; phần mềm theo yêu cầu
          </h2>
        </div>
      </div>
      
      <div className="showcase-carousel-wrapper">
        <div 
          className="showcase-carousel" 
          ref={carouselRef}
          onPointerDown={handlePointerDown}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          style={{ cursor: isDown ? 'grabbing' : 'grab' }}
        >
          {SHOWCASE_DATA.map((item) => (
            <a key={item.id} href={item.link} className="showcase-card">
              <div className="showcase-image-container">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="showcase-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextElementSibling) {
                      e.target.nextElementSibling.style.display = 'block';
                    }
                  }}
                  draggable="false"
                />
                <div style={{ display: 'none' }}>
                  <PlaceholderIcon />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseCarousel;
