import React from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../config/assets';
import ImageWithFallback from './ImageWithFallback';

const services = [
  { id: 1, title: "Report TikTok", desc: "Hỗ trợ xử lý tài khoản mạo danh, nội dung vi phạm, tài khoản dưới 13 tuổi, bản quyền và các vấn đề ảnh hưởng đến thương hiệu.", img: ASSETS.services.reportTiktok },
  { id: 2, title: "Tích Xanh TikTok", desc: "Tư vấn xây dựng hồ sơ xác minh, định vị thương hiệu cá nhân/doanh nghiệp và chuẩn hóa hình ảnh truyền thông.", img: ASSETS.services.tichXanh },
  { id: 3, title: "Chatbot AI", desc: "Xây dựng chatbot AI cho website, Facebook, Telegram, Zalo, hỗ trợ CSKH tự động 24/7.", img: ASSETS.services.chatbotAi },
  { id: 4, title: "Thiết Kế Website", desc: "Thiết kế website doanh nghiệp, landing page, website bán hàng, trang dịch vụ, tối ưu tốc độ và SEO.", img: ASSETS.services.website },
  { id: 5, title: "Phần Mềm Theo Yêu Cầu", desc: "Xây dựng CRM, dashboard, hệ thống quản lý, SaaS platform và API nội bộ.", img: ASSETS.services.software },
  { id: 6, title: "Tự Động Hóa Doanh Nghiệp", desc: "Tự động hóa workflow, chăm sóc khách hàng, xử lý dữ liệu, gửi thông báo và kết nối API.", img: ASSETS.services.automation },
  { id: 7, title: "Social Media Marketing", desc: "Xây dựng nội dung, chiến lược tăng trưởng và vận hành kênh Facebook, TikTok, YouTube, Instagram.", img: ASSETS.services.marketing },
  { id: 8, title: "Quản Trị Thương Hiệu", desc: "Xây dựng hình ảnh thương hiệu, xử lý khủng hoảng, bảo vệ uy tín và phát triển nhận diện số.", img: ASSETS.services.branding },
  { id: 9, title: "Mobile App Development", desc: "Phát triển ứng dụng Android/iOS, app nội bộ, app bán hàng và app dịch vụ.", img: ASSETS.services.mobileApp },
];

const Services = () => {
  return (
    <section id="services" className="section services-section">
      <div className="section-header">
        <h2 className="section-title">Dịch vụ</h2>
        <p className="section-subtitle">Giải pháp chuyên sâu cho sự tăng trưởng bền vững.</p>
      </div>
      
      <div className="services-list">
        {services.map((svc, index) => (
          <motion.div 
            key={svc.id} 
            className="service-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="service-info">
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>
              <a href="#" className="service-link">Xem chi tiết &rarr;</a>
            </div>
            <div className="service-visual">
              <ImageWithFallback src={svc.img} alt={svc.title} className="service-image" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
