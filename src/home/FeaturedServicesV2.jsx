import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Boxes,
  CodeXml,
  Globe,
  MonitorSmartphone,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { FaFacebookF } from 'react-icons/fa';

const FEATURED_SERVICES = [
  {
    id: 'tiktok-verified',
    title: 'Xác minh Tích Xanh TikTok',
    description: 'Quy trình tư vấn và hoàn thiện hồ sơ xác minh tích xanh chính chủ nhanh chóng, chuẩn chính sách nền tảng.',
    icon: SiTiktok,
    iconType: 'brand',
    route: '/tiktok-report',
    badge: 'Platform Trust',
  },
  {
    id: 'facebook-verified',
    title: 'Xác minh Tích Xanh Facebook',
    description: 'Hỗ trợ xác minh tài khoản, fanpage doanh nghiệp và hỗ trợ xử lý sự cố xác thực tài khoản chuyên sâu.',
    icon: FaFacebookF,
    iconType: 'brand',
    route: '/services',
    badge: 'Identity Verification',
  },
  {
    id: 'chatbot-ai',
    title: 'Chatbot AI Doanh Nghiệp',
    description: 'Trợ lý AI thông minh tích hợp tri thức doanh nghiệp, tự động hóa tư vấn và vận hành 24/7.',
    icon: Bot,
    route: '/chatbot-ai',
    badge: 'AI Automation',
  },
  {
    id: 'website',
    title: 'Thiết Kế Website Studio',
    description: 'Kiến trúc website cao cấp, chuẩn SEO, tốc độ vượt trội, tương thích hoàn hảo mọi thiết bị.',
    icon: MonitorSmartphone,
    route: '/services',
    badge: 'Modern Web',
  },
  {
    id: 'custom-software',
    title: 'Phần Mềm Theo Yêu Cầu',
    description: 'Xây dựng web apps, dashboard quản trị và công cụ tự động hóa riêng biệt theo bài toán của doanh nghiệp.',
    icon: CodeXml,
    route: '/services',
    badge: 'Custom Software',
  },
  {
    id: 'mini-app',
    title: 'Phát Triển Mini App',
    description: 'Giải pháp Mini App tối ưu hóa trải nghiệm người dùng, mở rộng kênh tương tác và tỷ lệ chuyển đổi.',
    icon: Smartphone,
    route: '/services',
    badge: 'App Ecosystem',
  },
];

const FeaturedServicesV2 = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="featured-services" className="lm-featured-services">
      <div className="lm-section-container">
        <motion.div
          className="lm-featured-services__head"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="lm-section-eyebrow">
              DỊCH VỤ TRỌNG TÂM
            </div>
            <h2>
              Giải pháp chuyên sâu được tin chọn
            </h2>
          </div>

          <Link to="/services" className="lm-view-all">
            <span>Danh mục dịch vụ</span>
            <ArrowRight size={16} strokeWidth={1.8} />
          </Link>
        </motion.div>

        <div className="lm-featured-services__grid">
          {FEATURED_SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : index * 0.05,
                }}
              >
                <Link to={service.route} className="lm-featured-card">
                  <div className="lm-featured-card__icon">
                    <Icon size={service.iconType === 'brand' ? 24 : 22} />
                  </div>

                  <div className="lm-featured-card__content">
                    <div className="lm-featured-card__meta">
                      <span className="lm-featured-card__badge">{service.badge}</span>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <div className="lm-featured-card__arrow">
                    <ArrowRight size={18} strokeWidth={1.8} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="lm-featured-services__bottom"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="lm-featured-services__bottom-left">
            <Boxes size={18} strokeWidth={1.6} />
            <span>Cần một giải pháp công nghệ hoặc chiến lược riêng biệt?</span>
          </div>
          <Link to="/contact">
            <span>Tư vấn theo yêu cầu</span>
            <ArrowRight size={15} strokeWidth={1.8} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServicesV2;
