import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CheckCircle2,
  Cpu,
  Layers,
  Shield,
  TrendingUp,
} from 'lucide-react';

const PRINCIPLES = [
  {
    id: '01',
    title: 'AI-First Engineering',
    description:
      'Đánh giá nơi AI và tự động hóa thực sự phù hợp với quy trình, ưu tiên những điểm có thể giảm thao tác lặp lại và hỗ trợ ra quyết định.',
    icon: Cpu,
  },
  {
    id: '02',
    title: 'Data-Driven Strategy',
    description:
      'Kết hợp dữ liệu định lượng với bối cảnh thương hiệu để xây dựng giả thuyết, triển khai và điều chỉnh theo kết quả quan sát được.',
    icon: TrendingUp,
  },
  {
    id: '03',
    title: 'Production-Grade Quality',
    description:
      'Sản phẩm được kiểm tra theo phạm vi về hiệu năng, bảo mật và khả năng vận hành trước khi bàn giao.',
    icon: Layers,
  },
  {
    id: '04',
    title: 'End-to-End Protection',
    description:
      'Rà soát hồ sơ, bằng chứng và quy trình xử lý theo chính sách áp dụng của từng nền tảng và từng trường hợp.',
    icon: Shield,
  },
];

const STANDARDS = [
  {
    id: '01',
    label: 'Phạm vi rõ ràng',
    detail: 'Mục tiêu, đầu việc và tiêu chí bàn giao được thống nhất trước triển khai.',
    icon: CheckCircle2,
  },
  {
    id: '02',
    label: 'Kiểm thử trước bàn giao',
    detail: 'Luồng chính và các rủi ro liên quan được kiểm tra theo phạm vi dự án.',
    icon: Layers,
  },
  {
    id: '03',
    label: 'Theo dõi khi vận hành',
    detail: 'Tín hiệu thực tế được dùng để phát hiện vấn đề và ưu tiên vòng cải tiến tiếp theo.',
    icon: Cpu,
  },
  {
    id: '04',
    label: 'Bảo mật theo phạm vi',
    detail: 'Quyền truy cập và dữ liệu nhạy cảm được xem xét theo kiến trúc của từng giải pháp.',
    icon: Shield,
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

        {/* Qualitative delivery standards */}
        <div className="lm-results">
          <motion.div
            className="lm-results__heading"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            <div className="lm-section-eyebrow">
              CHUẨN THỰC THI
            </div>
            <h2>Cách LETAN kiểm soát chất lượng</h2>
          </motion.div>

          <div className="lm-results__grid">
            {STANDARDS.map((standard, index) => {
              const Icon = standard.icon;
              return (
                <motion.div
                  key={standard.id}
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
                  <strong>{standard.id}</strong>
                  <span>{standard.label}</span>
                  <small>{standard.detail}</small>
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
