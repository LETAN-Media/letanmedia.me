import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS } from '../config/assets';
import ImageWithFallback from './ImageWithFallback';

const services = [
  { id: 1, title: "Social Growth", desc: "Dịch vụ tăng tương tác, seeding, SEO, GEO, social marketing.", img: ASSETS.services.marketing },
  { id: 2, title: "Trust & Report", desc: "Tích xanh TikTok/Facebook, report, bảo vệ thương hiệu.", img: ASSETS.services.reportTiktok },
  { id: 3, title: "AI Automation", desc: "Chatbot AI, tự động hóa, AI workflow, CRM.", img: ASSETS.services.chatbotAi },
  { id: 4, title: "Web & Software", desc: "Website, app, phần mềm theo yêu cầu, mini app.", img: ASSETS.services.website },
  { id: 5, title: "PR & Media", desc: "Báo chí, truyền thông, xây dựng hình ảnh thương hiệu.", img: ASSETS.services.branding },
  { id: 6, title: "Growth", desc: "Xây dựng và vận hành kênh, phát triển thương hiệu cá nhân/doanh nghiệp.", img: ASSETS.services.tichXanh },
];

const Services = () => {
  const [activeTab, setActiveTab] = useState(services[0]);

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
              onClick={() => setActiveTab(svc)}
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
            >
              <div className="service-tab-info">
                <h3 className="service-tab-title">{activeTab.title}</h3>
                <p className="service-tab-desc">{activeTab.desc}</p>
                <div style={{ marginTop: '40px' }}>
                  <button className="btn-primary">Nhận tư vấn ngay</button>
                </div>
              </div>
              
              <div className="service-tab-visual">
                <ImageWithFallback 
                  srcWebp={activeTab.img} 
                  alt={activeTab.title} 
                />
                <div className="service-tab-glow"></div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Services;
