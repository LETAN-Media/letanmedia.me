import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Bot,
  Code2,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

const ECOSYSTEM_ITEMS = [
  {
    id: 'growth',
    title: 'Digital Growth',
    description: 'Tăng trưởng trên TikTok, Facebook và Social Media.',
    icon: TrendingUp,
    href: '#featured-services',
  },
  {
    id: 'ai',
    title: 'AI Solutions',
    description: 'Ứng dụng AI vào kinh doanh và tự động hóa quy trình.',
    icon: Bot,
    href: '/chatbot-ai',
  },
  {
    id: 'software',
    title: 'Website / Software',
    description: 'Thiết kế website, hệ thống và phần mềm theo yêu cầu.',
    icon: Code2,
    href: '#featured-services',
  },
  {
    id: 'trust',
    title: 'Trust & Branding',
    description: 'Xây dựng uy tín thương hiệu số, tích xanh và PR.',
    icon: ShieldCheck,
    href: '#featured-services',
  },
];

const ServiceEcosystem = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="lm-ecosystem"
    >
      <div className="lm-section-container">
        <motion.div
          className="lm-section-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
        >
          <div className="lm-section-eyebrow">
            HỆ SINH THÁI DỊCH VỤ
          </div>
          <h2>
            Giải pháp toàn diện
            <br />
            cho mọi nhu cầu số
          </h2>
          <p>
            Từ tăng trưởng truyền thông, ứng dụng AI,
            thiết kế website đến phát triển phần mềm theo
            yêu cầu — tất cả trong một hệ sinh thái.
          </p>
        </motion.div>

        <div className="lm-ecosystem__grid">
          {ECOSYSTEM_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.id}
                href={item.href}
                className={`lm-ecosystem-card lm-ecosystem-card--${item.id}`}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: reduceMotion ? 0 : index * 0.07,
                }}
              >
                <div className="lm-ecosystem-card__top">
                  <div className="lm-service-icon">
                    <Icon
                      size={25}
                      strokeWidth={1.7}
                    />
                  </div>
                  <div className="lm-card-arrow">
                    <ArrowUpRight
                      size={17}
                      strokeWidth={1.7}
                    />
                  </div>
                </div>

                <div className="lm-ecosystem-card__content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div
                  className="lm-ecosystem-card__glow"
                  aria-hidden="true"
                />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceEcosystem;
