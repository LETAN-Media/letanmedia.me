import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  BarChart3,
  Bot,
  Clock3,
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';

const REASONS = [
  {
    id: '01',
    title: 'AI-First Approach',
    description:
      'Ứng dụng AI vào từng quy trình cốt lõi để tối ưu hiệu suất và giảm chi phí.',
    icon: Zap,
  },
  {
    id: '02',
    title: 'Data-Driven Strategy',
    description:
      'Mọi chiến lược truyền thông và phát triển đều được xây dựng dựa trên dữ liệu.',
    icon: BarChart3,
  },
  {
    id: '03',
    title: 'Premium Quality',
    description:
      'Sản phẩm được đầu tư về hiệu năng, trải nghiệm người dùng và khả năng mở rộng.',
    icon: Sparkles,
  },
  {
    id: '04',
    title: 'Long-term Partner',
    description:
      'Đồng hành cùng khách hàng qua từng giai đoạn phát triển thay vì chỉ xử lý ngắn hạn.',
    icon: ShieldCheck,
  },
];

const METRICS = [
  {
    value: '5000+',
    label: 'Khách hàng',
    icon: Users,
  },
  {
    value: '10000+',
    label: 'Yêu cầu xử lý',
    icon: BarChart3,
  },
  {
    value: '24/7',
    label: 'Hỗ trợ',
    icon: Clock3,
  },
  {
    value: '99%',
    label: 'Hài lòng',
    icon: Heart,
  },
];

const WhyLetanV2 = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="lm-why">
      <div className="lm-section-container">
        <motion.div
          className="lm-why__heading"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 24 }
          }
          whileInView={
            reduceMotion
              ? undefined
              : { opacity: 1, y: 0 }
          }
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <div className="lm-section-eyebrow">
            VÌ SAO CHỌN LETAN MEDIA?
          </div>

          <h2>
            Đối tác đồng hành
            <br />
            đáng tin cậy
          </h2>

          <p>
            Công nghệ chỉ tạo ra giá trị khi giải quyết
            được bài toán thực tế. LETAN Media tập trung
            vào hiệu quả, khả năng mở rộng và mối quan hệ
            lâu dài.
          </p>
        </motion.div>

        <div className="lm-why__reasons">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.article
                key={reason.id}
                className="lm-reason"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 20,
                      }
                }
                whileInView={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion
                    ? 0
                    : index * 0.065,
                }}
              >
                <div className="lm-reason__top">
                  <span className="lm-reason__number">
                    {reason.id}
                  </span>

                  <div className="lm-reason__icon">
                    <Icon
                      size={21}
                      strokeWidth={1.7}
                    />
                  </div>
                </div>

                <h3>{reason.title}</h3>

                <p>{reason.description}</p>

                <div
                  className="lm-reason__glow"
                  aria-hidden="true"
                />
              </motion.article>
            );
          })}
        </div>

        <div className="lm-results">
          <motion.div
            className="lm-results__heading"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 20 }
            }
            whileInView={
              reduceMotion
                ? undefined
                : { opacity: 1, y: 0 }
            }
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.55,
            }}
          >
            <div>
              <div className="lm-section-eyebrow">
                NHỮNG CON SỐ BIẾT NÓI
              </div>

              <h2>
                Kết quả tạo nên
                <br />
                niềm tin
              </h2>
            </div>

            <div className="lm-results__symbol">
              <Bot
                size={23}
                strokeWidth={1.5}
              />
            </div>
          </motion.div>

          <div className="lm-results__grid">
            {METRICS.map((metric, index) => {
              const Icon = metric.icon;

              return (
                <motion.div
                  key={metric.label}
                  className="lm-metric"
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          scale: 0.97,
                          y: 16,
                        }
                  }
                  whileInView={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          scale: 1,
                          y: 0,
                        }
                  }
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.48,
                    delay: reduceMotion
                      ? 0
                      : index * 0.06,
                  }}
                >
                  <div className="lm-metric__icon">
                    <Icon
                      size={22}
                      strokeWidth={1.65}
                    />
                  </div>

                  <strong>
                    {metric.value}
                  </strong>

                  <span>
                    {metric.label}
                  </span>

                  <div
                    className="lm-metric__glow"
                    aria-hidden="true"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyLetanV2;
