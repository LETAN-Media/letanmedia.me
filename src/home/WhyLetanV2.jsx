import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  Lock,
  Shield,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

const PRINCIPLES = [
  {
    id: '01',
    title: 'AI-First Engineering',
    description:
      'Tích hợp mô hình AI và tự động hóa vào quy trình thực tế, loại bỏ thao tác thủ công và tạo ra năng lực cạnh tranh vượt trội.',
    icon: Cpu,
  },
  {
    id: '02',
    title: 'Data-Driven Strategy',
    description:
      'Mọi quyết định phân phối nội dung, truyền thông số và tối ưu chuyển đổi đều dựa trên dữ liệu định lượng, không cảm tính.',
    icon: TrendingUp,
  },
  {
    id: '03',
    title: 'Production-Grade Quality',
    description:
      'Sản phẩm công nghệ và nền tảng web được phát triển với tiêu chuẩn khắt khe về tốc độ tải trang, bảo mật và khả năng chịu tải cao.',
    icon: Layers,
  },
  {
    id: '04',
    title: 'End-to-End Protection',
    description:
      'Quy trình bảo vệ kênh, xử lý vi phạm bản quyền và xác minh uy tín thương hiệu theo quy chuẩn chính sách toàn cầu của các nền tảng.',
    icon: Shield,
  },
];

const METRICS = [
  {
    value: '100%',
    label: 'Chuẩn chính sách nền tảng',
    detail: 'Meta, TikTok & YouTube API',
    icon: CheckCircle2,
  },
  {
    value: '< 24h',
    label: 'SLA phản hồi & kích hoạt',
    detail: 'Tiếp nhận xử lý khủng hoảng',
    icon: Clock,
  },
  {
    value: '99.9%',
    label: 'Độ sẵn sàng hệ thống',
    detail: 'Chatbot & automation workflows',
    icon: Cpu,
  },
  {
    value: 'Zero-Trust',
    label: 'Bảo mật quyền riêng tư',
    detail: 'Mã hóa và cam kết bảo mật thông tin',
    icon: Lock,
  },
];

const WhyLetanV2 = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="lm-why">
      <div className="lm-section-container">
        <motion.div
          className="lm-why__heading"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="lm-section-eyebrow">
            NGUYÊN TẮC HOẠT ĐỘNG
          </div>

          <h2>
            Cam kết hiệu quả thực chất,
            <br />
            không dừng lại ở lý thuyết
          </h2>

          <p>
            Công nghệ chỉ có ý nghĩa khi tạo ra bước chuyển đổi cụ thể trong kinh doanh. LETAN Media chú trọng vào chiều sâu kỹ thuật, tính ổn định và giá trị dài hạn của mỗi sản phẩm bàn giao.
          </p>
        </motion.div>

        <div className="lm-why__reasons">
          {PRINCIPLES.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.id}
                className="lm-reason"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : index * 0.07,
                }}
              >
                <div className="lm-reason__top">
                  <span className="lm-reason__number">{item.id}</span>
                  <div className="lm-reason__icon">
                    <Icon size={19} strokeWidth={1.75} />
                  </div>
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            );
          })}
        </div>

        {/* Results & SLAs */}
        <div className="lm-results">
          <motion.div
            className="lm-results__heading"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            <div className="lm-section-eyebrow">
              CHỈ SỐ TIÊU CHUẨN
            </div>
            <h2>Năng lực thực thi & cam kết SLA</h2>
          </motion.div>

          <div className="lm-results__grid">
            {METRICS.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  className="lm-metric"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: reduceMotion ? 0 : index * 0.06,
                  }}
                >
                  <div className="lm-metric__icon">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                  <small>{metric.detail}</small>
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
