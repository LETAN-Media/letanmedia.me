import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS } from '../config/assets';
import ImageWithFallback from './ImageWithFallback';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Services.css';

const services = [
  { 
    id: 1, 
    title: "Digital & Social Growth", 
    desc: "Dịch vụ tăng tương tác, seeding, SEO, GEO. Xây dựng, vận hành kênh và phát triển nhận diện số cho cá nhân/doanh nghiệp.", 
    img: ASSETS.services.marketing 
  },
  { 
    id: 2, 
    title: "AI & Software Solutions", 
    desc: "Thiết kế Website, App, CRM. Tích hợp Chatbot AI, tự động hóa quy trình (AI workflow) và phần mềm theo yêu cầu.", 
    img: ASSETS.services.software 
  },
  { 
    id: 3, 
    title: "PR, Trust & Branding", 
    desc: "Booking báo chí, truyền thông. Xác minh Tích xanh (TikTok/FB), xử lý vi phạm (report) và bảo vệ/quản trị thương hiệu.", 
    img: ASSETS.services.branding 
  }
];

const subServices = [
  {
    title: "Dịch Vụ Report TikTok",
    shortDesc: "Hỗ trợ report kênh, video TikTok vi phạm, giả mạo, bôi nhọ hoặc cạnh tranh không lành mạnh.",
    img: ASSETS.services.reportTiktok
  },
  {
    title: "Dịch Vụ Report YouTube",
    shortDesc: "Hỗ trợ xử lý video reup, vi phạm bản quyền, kênh giả mạo và nội dung vi phạm nguyên tắc cộng đồng.",
    img: ASSETS.services.reportTiktok
  },
  {
    title: "Dịch Vụ Tích Xanh",
    shortDesc: "Tư vấn xác minh tài khoản, nghệ sĩ, thương hiệu và doanh nghiệp trên các nền tảng số.",
    img: ASSETS.services.tichXanh
  },
  {
    title: "Dịch Vụ SEO / GEO",
    shortDesc: "Tối ưu hiện diện thương hiệu trên Google, công cụ tìm kiếm và các nền tảng AI Search.",
    img: ASSETS.services.marketing
  },
  {
    title: "Dịch Vụ Xây Kênh",
    shortDesc: "Xây dựng, vận hành và phát triển kênh TikTok, YouTube, Fanpage theo định hướng thương hiệu.",
    img: ASSETS.services.miniApp
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
              {activeTab.id === 1 ? (
                /* Accordion List for Digital & Social Growth */
                <div className="services-accordion-list">
                  {subServices.map((subSvc, idx) => {
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
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Standard layout for other tabs */
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', width: '100%' }} className="service-tab-pane-inner">
                  <div className="service-tab-info">
                    <h3 className="service-tab-title">{activeTab.title}</h3>
                    <p className="service-tab-desc">{activeTab.desc}</p>
                    <div style={{ marginTop: '40px' }} className="services-accordion-cta-wrapper">
                      <button 
                        className="btn-primary"
                        onClick={(e) => handleCtaClick(e, activeTab.id)}
                      >
                        Nhận tư vấn ngay
                      </button>

                      {/* Inline Popover Zalo / Telegram for other tabs */}
                      <AnimatePresence>
                        {showPopoverIndex === activeTab.id && (
                          <motion.div 
                            key={`popover-container-tab-${activeTab.id}`}
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
                              style={{ left: '0', transform: 'none' }} // Align popover under standard tab button
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
                  </div>
                  
                  <div className="service-tab-visual">
                    <ImageWithFallback 
                      srcWebp={activeTab.img} 
                      alt={activeTab.title} 
                    />
                    <div className="service-tab-glow"></div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Services;
