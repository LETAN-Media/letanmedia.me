import React, { useRef, useState } from 'react';
import { ASSETS } from '../config/assets';
import './ShowcaseCarousel.css';

const CATEGORIES = [
  "Digital & Social Growth",
  "AI & Software Solutions",
  "PR, Trust & Branding"
];

const CATEGORY_HEADLINES: Record<string, string> = {
  "Digital & Social Growth": "Giải pháp tăng trưởng & vận hành số đa nền tảng",
  "AI & Software Solutions": "Tự động hóa bằng AI & phần mềm chuyên biệt",
  "PR, Trust & Branding": "Bảo vệ thương hiệu & phủ sóng truyền thông"
};

const SHOWCASE_DATA: Record<string, Array<{id: string, title: string, image: string, link: string}>> = {
  "Digital & Social Growth": [
    { id: 'tich-xanh-tiktok', title: 'Tích Xanh TikTok', image: ASSETS.showcase.tichXanh, link: '#tich-xanh-tiktok' },
    { id: 'tich-xanh-facebook', title: 'Tích Xanh Facebook', image: ASSETS.services.tichXanhFacebook || ASSETS.showcase.tichXanh, link: '#tich-xanh-facebook' },
    { id: 'social-media', title: 'Social Media Marketing', image: ASSETS.showcase.socialMedia, link: '#social-media' },
    { id: 'fanpage', title: 'Chăm sóc Fanpage', image: ASSETS.showcase.branding, link: '#fanpage' },
    { id: 'seo-geo', title: 'SEO & GEO', image: ASSETS.showcase.website || ASSETS.services.website, link: '#seo-geo' },
    { id: 'ads', title: 'Quảng Cáo Đa Nền Tảng', image: ASSETS.showcase.reportTiktok || ASSETS.services.reportTiktok, link: '#ads' },
    { id: 'tang-truong', title: 'Tăng Trưởng Đa Nền Tảng', image: ASSETS.showcase.socialMedia || ASSETS.services.marketing, link: '#tang-truong' },
  ],
  "AI & Software Solutions": [
    { id: 'chatbot-ai', title: 'Chatbot AI', image: ASSETS.showcase.chatbotAi, link: '#chatbot-ai' },
    { id: 'mini-app', title: 'Mini App', image: ASSETS.services.miniApp || ASSETS.showcase.chatbotAi, link: '#mini-app' },
    { id: 'automation', title: 'Automation Workflow', image: ASSETS.showcase.automation, link: '#automation' },
    { id: 'tool-yeu-cau', title: 'Tool Theo Yêu Cầu', image: ASSETS.showcase.software, link: '#tool-yeu-cau' },
    { id: 'website', title: 'Thiết Kế Website', image: ASSETS.showcase.website, link: '#website' },
    { id: 'app-mobile', title: 'App Mobile', image: ASSETS.showcase.mobileApp, link: '#app-mobile' },
    { id: 'phan-mem', title: 'Phần Mềm Theo Yêu Cầu', image: ASSETS.showcase.software, link: '#phan-mem' },
    { id: 'dev-tool', title: 'Dev Tool', image: ASSETS.showcase.software, link: '#dev-tool' },
  ],
  "PR, Trust & Branding": [
    { id: 'report-tiktok', title: 'Report TikTok', image: ASSETS.showcase.reportTiktok, link: '#report-tiktok' },
    { id: 'report-facebook', title: 'Report Facebook', image: ASSETS.showcase.reportTiktok, link: '#report-facebook' },
    { id: 'report-youtube', title: 'Report YouTube', image: ASSETS.showcase.reportTiktok, link: '#report-youtube' },
    { id: 'xu-ly-mao-danh', title: 'Xử lý mạo danh', image: ASSETS.showcase.reportTiktok, link: '#xu-ly-mao-danh' },
    { id: 'pr-bao-chi', title: 'PR Báo Chí', image: ASSETS.showcase.branding || ASSETS.services.branding, link: '#pr-bao-chi' },
    { id: 'xay-dung-uy-tin', title: 'Xây dựng uy tín', image: ASSETS.showcase.socialMedia || ASSETS.services.marketing, link: '#xay-dung-uy-tin' },
  ]
};

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
  const [activeCategory, setActiveCategory] = useState("Social Growth");
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

  const currentItems = SHOWCASE_DATA[activeCategory] || [];

  return (
    <section className="showcase-section" aria-label="Portfolio and Services Showcase">
      <div className="showcase-container">
        <div className="showcase-title-wrapper">
          <h2 className="showcase-title" key={activeCategory}>
            {CATEGORY_HEADLINES[activeCategory]}
          </h2>
        </div>

        <div className="showcase-tabs">
          {CATEGORIES.map(category => (
            <button
              key={category}
              className={`showcase-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(category);
                if (carouselRef.current) {
                  carouselRef.current.scrollLeft = 0;
                }
              }}
            >
              {category}
            </button>
          ))}
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
          {currentItems.map((item) => (
            <a key={item.id} href={item.link} className="showcase-card image-only-card">
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
