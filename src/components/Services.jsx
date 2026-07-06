import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ASSETS } from '../config/assets';
import ImageWithFallback from './ImageWithFallback';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Services.css';

const services = [
  {
    id: 1,
    title: "DIGITAL & SOCIAL GROWTH",
    subServices: [
      {
        title: "Tích Xanh Fanpage",
        shortDesc: "Tư vấn và thực hiện quy trình xác minh tích xanh Fanpage Facebook chính chủ nhanh chóng.",
        img: ASSETS.services.tichXanhFacebook
      },
      {
        title: "Tích Xanh TikTok",
        shortDesc: "Tư vấn hồ sơ, điều kiện và hỗ trợ đăng ký xác minh tích xanh TikTok uy tín.",
        img: ASSETS.services.tichXanh
      },
      {
        title: "Mở Khóa Facebook",
        shortDesc: "Hỗ trợ khôi phục các tài khoản Facebook bị khóa, checkpoint hoặc vô hiệu hóa.",
        img: ASSETS.services.branding
      },
      {
        title: "Mở Khóa TikTok",
        shortDesc: "Hỗ trợ mở khóa tài khoản TikTok bị đình chỉ, vi phạm hướng dẫn cộng đồng.",
        img: ASSETS.services.reportTiktok
      },
      {
        title: "Dịch Vụ Xây Kênh",
        shortDesc: "Tư vấn, lên kịch bản, sản xuất video ngắn và vận hành kênh đa nền tảng.",
        img: ASSETS.services.miniApp
      },
      {
        title: "Dịch Vụ ADS",
        shortDesc: "Tối ưu chiến dịch quảng cáo Facebook, Google, TikTok mang lại hiệu quả chuyển đổi cao.",
        img: ASSETS.services.marketing
      }
    ]
  },
  {
    id: 2,
    title: "AI & SOFTWARE SOLUTIONS",
    subServices: [
      {
        title: "Thiết Kế Website",
        shortDesc: "Xây dựng website doanh nghiệp, landing page tối giản, tốc độ cao và chuẩn SEO.",
        img: ASSETS.services.website
      },
      {
        title: "Thiết Kế App Mobile",
        shortDesc: "Phát triển ứng dụng di động native/hybrid trên iOS và Android theo yêu cầu.",
        img: ASSETS.services.miniApp
      },
      {
        title: "Thiết Kế Mini App",
        shortDesc: "Thiết kế Zalo Mini App, Telegram Mini App đón đầu xu hướng tiện ích nội bộ.",
        img: ASSETS.services.miniApp
      },
      {
        title: "Tạo Tool Theo Yêu Cầu",
        shortDesc: "Lập trình phần mềm, tool tự động hóa quy trình (RPA) tối ưu năng suất lao động.",
        img: ASSETS.services.software
      },
      {
        title: "Dịch Vụ Chatbot AI",
        shortDesc: "Tích hợp chatbot AI thông minh tư vấn và chăm sóc khách hàng 24/7 tự động.",
        img: ASSETS.services.chatbotAi
      }
    ]
  },
  {
    id: 3,
    title: "PR, TRUST & BRANDING",
    subServices: [
      {
        title: "Xây Dựng Thương Hiệu",
        shortDesc: "Tư vấn nhận diện thương hiệu, định vị hình ảnh cá nhân và doanh nghiệp chuyên nghiệp.",
        img: ASSETS.services.branding
      },
      {
        title: "Truyền Thông Báo Chí",
        shortDesc: "Booking bài viết PR trên các trang báo điện tử lớn và các kênh truyền thông uy tín.",
        img: ASSETS.services.marketing
      },
      {
        title: "Dịch Vụ GEO",
        shortDesc: "Tối ưu hóa công cụ tìm kiếm dựa trên AI sinh tạo (Generative Engine Optimization) đón đầu xu hướng mới.",
        img: ASSETS.services.marketing
      },
      {
        title: "Dịch Vụ SEO",
        shortDesc: "Tối ưu hóa thứ hạng website trên công cụ tìm kiếm Google bền vững.",
        img: ASSETS.services.website
      },
      {
        title: "Dịch vụ Seeding",
        shortDesc: "Tăng tương tác, seeding bài viết, tạo hiệu ứng đám đông truyền thông xã hội tự nhiên.",
        img: ASSETS.services.marketing
      }
    ]
  },
  {
    id: 4,
    title: "REPORT & PROTECTION",
    subServices: [
      {
        title: "Report TikTok",
        shortDesc: "Xử lý, gỡ bỏ các video, kênh TikTok giả mạo, bôi nhọ hoặc vi phạm bản quyền.",
        img: ASSETS.services.reportTiktok
      },
      {
        title: "Report YouTube",
        shortDesc: "Giải quyết video vi phạm bản quyền, reup trái phép và kênh mạo danh thương hiệu.",
        img: ASSETS.services.reportTiktok
      },
      {
        title: "Report Facebook",
        shortDesc: "Hỗ trợ báo cáo và gỡ bỏ trang, tài khoản mạo danh, thông tin sai sự thật trên Facebook.",
        img: ASSETS.services.branding
      },
      {
        title: "Report Website",
        shortDesc: "Yêu cầu gỡ bỏ trang web giả mạo, lừa đảo hoặc vi phạm bản quyền nội dung (DMCA).",
        img: ASSETS.services.website
      },
      {
        title: "Report Twitter/X",
        shortDesc: "Báo cáo xử lý các bài đăng, tài khoản bôi nhọ danh dự trên mạng xã hội X.",
        img: ASSETS.services.marketing
      },
      {
        title: "Report Instagram",
        shortDesc: "Hỗ trợ gỡ tài khoản giả mạo hình ảnh, video reup trái phép trên Instagram.",
        img: ASSETS.services.tichXanhFacebook
      }
    ]
  }
];

const Services = () => {
  const [activeTab, setActiveTab] = useState(services[0]);
  const [activeSvcIndex, setActiveSvcIndex] = useState(0);
  const [showPopoverIndex, setShowPopoverIndex] = useState(null);

  const handleCtaClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPopoverIndex(showPopoverIndex === index ? null : index);
  };

  const getServiceRoute = (title) => {
    const t = title.toLowerCase();
    if (t.includes('tiktok') && t.includes('report')) return '/tiktok-report';
    if (t.includes('youtube') && t.includes('report')) return '/youtube-report';
    if (t.includes('chatbot') || t.includes('chat bot')) return '/chatbot-ai';
    return null;
  };

  const handleLearnMoreClick = (title) => {
    // Open home chatbot and ask for information
    window.dispatchEvent(new CustomEvent('open-home-chatbot', {
      detail: { message: `Tôi muốn tìm hiểu thông tin chi tiết về dịch vụ: ${title}` }
    }));
  };

  const renderLearnMoreButton = (subSvc) => {
    const route = getServiceRoute(subSvc.title);
    if (route) {
      return (
        <Link 
          to={route} 
          className="services-accordion-secondary-btn"
        >
          Tìm Hiểu Thêm
        </Link>
      );
    }
    return (
      <button 
        type="button"
        className="services-accordion-secondary-btn"
        onClick={() => handleLearnMoreClick(subSvc.title)}
      >
        Tìm Hiểu Thêm
      </button>
    );
  };

  return (
    <section id="services" className="section services-section">
      <div className="section-header">
        <h2 className="section-title">Hệ Sinh Thái Dịch Vụ</h2>
        <p className="section-subtitle">Giải pháp toàn diện thúc đẩy sự tăng trưởng bền vững cho cá nhân & doanh nghiệp.</p>
      </div>
      
      <div className="services-tabs-container">
        {/* Sidebar Tabs */}
        <div className="services-sidebar">
          {services.map((svc) => (
            <button 
              key={svc.id}
              onClick={() => {
                setActiveTab(svc);
                setActiveSvcIndex(0); // Open first sub-service by default
                setShowPopoverIndex(null);
              }}
              className={`services-tab-btn ${activeTab.id === svc.id ? 'active' : ''}`}
            >
              {svc.title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="services-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="service-tab-pane"
              style={{ display: 'block' }} // Force block layout to support accordion expansion correctly
            >
              {/* Accordion List for active tab */}
              <div className="services-accordion-list">
                {activeTab.subServices.map((subSvc, idx) => {
                  const isOpen = activeSvcIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`services-accordion-card ${isOpen ? 'open' : ''}`}
                    >
                      <button 
                        className="services-accordion-header"
                        onClick={() => {
                          setActiveSvcIndex(isOpen ? null : idx);
                          setShowPopoverIndex(null);
                        }}
                      >
                        <div className="services-accordion-header-info">
                          <h4 className="services-accordion-title">{subSvc.title}</h4>
                          <p className="services-accordion-short-desc">{subSvc.shortDesc}</p>
                        </div>
                        <span className="services-accordion-arrow">
                          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </span>
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            className="services-accordion-body"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <div className="services-accordion-content">
                              <div className="services-accordion-visual">
                                <ImageWithFallback 
                                  srcWebp={subSvc.img} 
                                  alt={subSvc.title} 
                                />
                              </div>
                              
                              <div className="services-accordion-actions">
                                <div className="services-accordion-cta-wrapper">
                                  <button 
                                    className="btn-primary services-accordion-cta"
                                    onClick={(e) => handleCtaClick(e, idx)}
                                  >
                                    Nhận Tư Vấn
                                  </button>
                                  
                                  {/* Inline Popover Zalo / Telegram */}
                                  <AnimatePresence>
                                    {showPopoverIndex === idx && (
                                      <motion.div 
                                        key={`popover-container-${idx}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                      >
                                        <div 
                                          className="fixed inset-0 z-40" 
                                          style={{ cursor: 'default' }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setShowPopoverIndex(null);
                                          }} 
                                        />
                                        <motion.div 
                                          className="services-inline-popover"
                                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                          animate={{ opacity: 1, y: 0, scale: 1 }}
                                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                          transition={{ duration: 0.2 }}
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <a 
                                            href="https://zalo.me/0765178999" 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="popover-item zalo"
                                            onClick={() => setShowPopoverIndex(null)}
                                          >
                                            <span>Zalo</span>
                                          </a>
                                          <a 
                                            href="https://t.me/Tanlemedia" 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="popover-item telegram"
                                            onClick={() => setShowPopoverIndex(null)}
                                          >
                                            <span>Telegram</span>
                                          </a>
                                        </motion.div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                                
                                {renderLearnMoreButton(subSvc)}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Services;
