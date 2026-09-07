import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Code2,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

const ECOSYSTEM_ITEMS = [
  {
    id: '01',
    category: 'Digital Growth',
    title: 'Tăng trưởng đa kênh',
    description: 'Chiến lược tăng trưởng thực tế trên TikTok, Facebook và các nền tảng mạng xã hội với data-driven marketing.',
    icon: TrendingUp,
    href: '/services',
    tag: 'Marketing & Scale',
  },
  {
    id: '02',
    category: 'AI Solutions',
    title: 'Trợ lý AI & Tự động hóa',
    description: 'Tích hợp chatbot AI thông minh, LLM agents và automation workflows vào quy trình vận hành và chăm sóc khách hàng.',
    icon: Bot,
    href: '/chatbot-ai',
    tag: 'AI Automation',
  },
  {
    id: '03',
    category: 'Engineering',
    title: 'Web & Phần mềm tùy chỉnh',
    description: 'Thiết kế website chuẩn studio, web apps hiệu năng cao và hệ thống phần mềm nghiệp vụ chuyên sâu theo yêu cầu.',
    icon: Code2,
    href: '/services',
    tag: 'Web & Software',
  },
  {
    id: '04',
    category: 'Security & Trust',
    title: 'Bảo vệ nền tảng & Uy tín',
    description: 'Bảo vệ kênh, giải quyết vi phạm bản quyền DMCA, xác minh tích xanh chính chủ và bảo vệ danh tiếng thương hiệu.',
    icon: ShieldCheck,
    href: '/tiktok-report',
    tag: 'Platform Protection',
  },
];

const ServiceEcosystem = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="lm-ecosystem">
      <div className="lm-section-container">
        <div className="lm-ecosystem__layout">
          {/* Left Column: Editorial Positioning */}
          <motion.div
            className="lm-ecosystem__lead"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
          >
            <div className="lm-section-eyebrow">
              HỆ SINH THÁI GIẢI PHÁP
            </div>
            <h2>
              Năng lực số hóa &
              <br />
              chiến lược tăng trưởng
            </h2>
            <p>
              Chúng tôi không cung cấp dịch vụ đơn lẻ. LETAN Media xây dựng một hệ sinh thái gắn kết giữa công nghệ AI, truyền thông số và kỹ thuật phần mềm để tạo ra đòn bẩy tăng trưởng thực chất cho khách hàng.
            </p>

            <div className="lm-ecosystem__cta-wrap">
              <Link to="/services" className="lm-btn lm-btn--primary">
                <span>Xem tất cả dịch vụ</span>
                <ArrowRight size={17} strokeWidth={1.8} />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Interactive Luxury Cards */}
          <div className="lm-ecosystem__grid">
            {ECOSYSTEM_ITEMS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: reduceMotion ? 0 : index * 0.08,
                  }}
                >
                  <Link to={item.href} className="lm-ecosystem-card">
                    <div className="lm-ecosystem-card__top">
                      <div className="lm-ecosystem-card__meta">
                        <span className="lm-ecosystem-card__idx">{item.id}</span>
                        <span className="lm-ecosystem-card__tag">{item.tag}</span>
                      </div>
                      <div className="lm-card-arrow">
                        <ArrowUpRight size={16} strokeWidth={1.8} />
                      </div>
                    </div>

                    <div className="lm-ecosystem-card__content">
                      <div className="lm-ecosystem-card__header">
                        <div className="lm-service-icon">
                          <Icon size={22} strokeWidth={1.75} />
                        </div>
                        <h3>{item.title}</h3>
                      </div>
                      <p>{item.description}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceEcosystem;
