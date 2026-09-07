import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Boxes,
  CodeXml,
  MonitorSmartphone,
  Smartphone,
} from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { FaFacebookF } from 'react-icons/fa';

const FEATURED_SERVICES = [
  {
    id: 'tiktok-verified',
    title: 'Tích Xanh TikTok',
    description:
      'Tư vấn và thực hiện quy trình xác minh tích xanh TikTok nhanh chóng, uy tín.',
    icon: SiTiktok,
    iconType: 'brand',
    route: '/services',
    accent: 'tiktok',
  },
  {
    id: 'facebook-verified',
    title: 'Tích Xanh Facebook',
    description:
      'Hỗ trợ xác minh tài khoản Facebook, khôi phục tài khoản bị khóa hoặc checkpoint.',
    icon: FaFacebookF,
    iconType: 'brand',
    route: '/services',
    accent: 'facebook',
  },
  {
    id: 'mini-app',
    title: 'Tạo Mini App',
    description:
      'Xây dựng Mini App chuyên nghiệp, tối ưu chuyển đổi và trải nghiệm khách hàng.',
    icon: Smartphone,
    route: '/services',
    accent: 'blue',
  },
  {
    id: 'chatbot-ai',
    title: 'Chatbot AI',
    description:
      'Trợ lý AI 24/7, tự động hóa chăm sóc khách hàng và tối ưu vận hành.',
    icon: Bot,
    route: '/chatbot-ai',
    accent: 'cyan',
  },
  {
    id: 'website',
    title: 'Thiết Kế Website',
    description:
      'Website chuẩn SEO, tốc độ cao, giao diện hiện đại và tối ưu chuyển đổi.',
    icon: MonitorSmartphone,
    route: '/services',
    accent: 'blue',
  },
  {
    id: 'custom-software',
    title: 'Phần Mềm Theo Yêu Cầu',
    description:
      'Phát triển phần mềm theo yêu cầu, tự động hóa và tối ưu quy trình doanh nghiệp.',
    icon: CodeXml,
    route: '/services',
    accent: 'cyan',
  },
];

const FeaturedServicesV2 = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="featured-services"
      className="lm-featured-services"
    >
      <div className="lm-section-container">
        <motion.div
          className="lm-featured-services__head"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="lm-section-eyebrow">
              DỊCH VỤ NỔI BẬT
            </div>
            <h2>
              Những giải pháp được
              <br />
              tin tưởng nhất
            </h2>
          </div>

          <Link
            to="/services"
            className="lm-view-all"
          >
            <span>Xem tất cả</span>
            <ArrowRight
              size={16}
              strokeWidth={1.7}
            />
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
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : index * 0.055,
                }}
              >
                <Link
                  to={service.route}
                  className={`lm-featured-card lm-featured-card--${service.accent}`}
                >
                  <div
                    className={`lm-featured-card__icon ${
                      service.iconType === 'brand'
                        ? 'lm-featured-card__icon--brand'
                        : ''
                    }`}
                  >
                    <Icon
                      size={service.iconType === 'brand' ? 27 : 25}
                    />
                  </div>

                  <div className="lm-featured-card__body">
                    <h3>
                      {service.title}
                      {(service.id === 'tiktok-verified' ||
                        service.id === 'facebook-verified') && (
                        <span
                          className="lm-verified-badge"
                          aria-label="Xác minh"
                        >
                          ✓
                        </span>
                      )}
                    </h3>
                    <p>
                      {service.description}
                    </p>
                  </div>

                  <div className="lm-featured-card__arrow">
                    <ArrowRight
                      size={18}
                      strokeWidth={1.7}
                    />
                  </div>

                  <div
                    className="lm-featured-card__glow"
                    aria-hidden="true"
                  />
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
          <div className="lm-featured-services__bottom-icon">
            <Boxes
              size={18}
              strokeWidth={1.6}
            />
          </div>
          <span>
            Không thấy dịch vụ bạn cần?
          </span>
          <Link to="/contact">
            Yêu cầu giải pháp riêng
            <ArrowRight
              size={15}
              strokeWidth={1.7}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServicesV2;
