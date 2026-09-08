import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  Layers,
  Lock,
  MessageSquare,
  Shield,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';
import Seo from '../../components/Seo';
import Breadcrumbs from '../../components/Breadcrumbs';

const PILLARS = [
  {
    id: '01',
    title: 'AI-First Engineering',
    desc: 'Tích hợp các mô hình ngôn ngữ lớn (LLM), AI Chatbot và workflow tự động hóa sâu vào hoạt động thực tế, giúp doanh nghiệp vận hành 24/7 và giải phóng nguồn lực.',
    icon: Bot,
    tag: 'Trí tuệ nhân tạo',
    colorClass: 'text-ai',
  },
  {
    id: '02',
    title: 'Omni-Channel Digital Growth',
    desc: 'Chiến lược tăng trưởng đa kênh trên TikTok, Facebook, YouTube và SEO/GEO dựa trên dữ liệu định lượng, tối ưu hóa tỷ lệ chuyển đổi và vị thế thương hiệu.',
    icon: TrendingUp,
    tag: 'Tăng trưởng số',
    colorClass: 'text-cyan',
  },
  {
    id: '03',
    title: 'Platform Protection & Trust',
    desc: 'Bảo vệ tài sản số, gỡ bỏ vi phạm bản quyền DMCA, xử lý khủng hoảng truyền thông và hỗ trợ xác minh tích xanh chính chủ theo đúng chính sách các nền tảng.',
    icon: ShieldCheck,
    tag: 'Bảo vệ thương hiệu',
    colorClass: 'text-gold',
  },
  {
    id: '04',
    title: 'Production-Grade Software',
    desc: 'Phát triển website chuẩn studio cao cấp, web application và hệ thống quản trị chuyên biệt với tốc độ tải trang vượt trội, chuẩn SEO và bảo mật tối đa.',
    icon: Code2,
    tag: 'Kỹ thuật phần mềm',
    colorClass: 'text-cobalt',
  },
];

const METHODOLOGY = [
  {
    step: '01',
    title: 'Đánh giá & Khám phá dữ liệu',
    desc: 'Phân tích hiện trạng kênh, rà soát hệ thống kỹ thuật và xác định bài toán tăng trưởng hoặc khủng hoảng cần giải quyết.',
  },
  {
    step: '02',
    title: 'Thiết kế kiến trúc giải pháp',
    desc: 'Xây dựng kịch bản AI, lộ trình nội dung hoặc kiến trúc phần mềm phù hợp nhất với mục tiêu kinh doanh cụ thể.',
  },
  {
    step: '03',
    title: 'Triển khai & Tối ưu chuyển đổi',
    desc: 'Đưa giải pháp vào vận hành thực tế, liên tục đo lường chỉ số định lượng và tinh chỉnh để đạt hiệu quả cao nhất.',
  },
  {
    step: '04',
    title: 'Giám sát 24/7 & Bảo vệ dài hạn',
    desc: 'Duy trì sự ổn định của hệ sinh thái số, cập nhật chính sách nền tảng mới và đồng hành bảo vệ thương hiệu liên tục.',
  },
];

const METRICS = [
  {
    value: '100%',
    label: 'Chuẩn chính sách nền tảng',
    detail: 'Meta, TikTok, YouTube & Google',
    icon: CheckCircle2,
  },
  {
    value: '< 24h',
    label: 'SLA phản hồi khẩn cấp',
    detail: 'Tiếp nhận & kích hoạt quy trình',
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
    detail: 'Cam kết mã hóa và an toàn dữ liệu',
    icon: Lock,
  },
];

const openAssistant = () => {
  window.dispatchEvent(
    new CustomEvent('open-home-chatbot', {
      detail: {
        message: 'Tôi muốn tìm hiểu thêm về năng lực và giải pháp của LETAN Media.',
      },
    }),
  );
};

const AboutPage = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="lm-about-page">
      <Seo
        title="Về LETAN Media | AI-First Digital Agency"
        description="LETAN Media — agency AI-first chuyên giải pháp AI, truyền thông số, phát triển phần mềm và bảo vệ nền tảng thương hiệu cho cá nhân và doanh nghiệp."
        path="/about"
      />

      {/* Hero Section */}
      <section className="lm-about-hero">
        <div className="lm-section-container">
          <Breadcrumbs />

          <motion.div
            className="lm-about-hero__content"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="lm-section-eyebrow">
              VỀ CHÚNG TÔI · AGENCY MANIFESTO
            </div>

            <h1 className="lm-about-hero__title">
              Kiến tạo vị thế số bằng
              <br />
              <span>công nghệ AI & chiến lược thực chiến</span>
            </h1>

            <p className="lm-about-hero__lead">
              LETAN Media là agency AI-first kết hợp trí tuệ nhân tạo, truyền thông số và kỹ thuật phần mềm để giúp cá nhân và doanh nghiệp xây dựng năng lực tăng trưởng vượt trội trong kỷ nguyên số.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Philosophy */}
      <section className="lm-about-philosophy">
        <div className="lm-section-container">
          <div className="lm-about-philosophy__layout">
            <motion.div
              className="lm-about-philosophy__lead"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
            >
              <div className="lm-section-eyebrow">TRIẾT LÝ HOẠT ĐỘNG</div>
              <h2>Không bán lý thuyết mơ hồ. Đo lường bằng kết quả cụ thể.</h2>
              <p>
                Chúng tôi tin rằng công nghệ chỉ thực sự có giá trị khi mang lại tác động rõ rệt vào hoạt động kinh doanh. Thay vì các giải pháp chung chung, LETAN Media tập trung vào chiều sâu kỹ thuật, sự tuân thủ chuẩn mực chính sách nền tảng và tính bền vững lâu dài của từng dự án.
              </p>
              <p>
                Từ việc bảo vệ một kênh TikTok/YouTube khỏi các cuộc tấn công vi phạm bản quyền, đến việc triển khai một trợ lý Chatbot AI phản hồi khách hàng trong tích tắc — mọi việc chúng tôi làm đều hướng tới sự an tâm và tăng trưởng bền bỉ của đối tác.
              </p>
            </motion.div>

            <motion.div
              className="lm-about-philosophy__cards"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <div className="lm-about-quote-card">
                <div className="lm-about-quote-card__badge">CAM KẾT CỐT LÕI</div>
                <blockquote>
                  &ldquo;Công nghệ tiên phong chỉ phát huy sức mạnh tối đa khi đi kèm sự am hiểu sâu sắc về nền tảng và kỷ luật thực thi nghiêm ngặt.&rdquo;
                </blockquote>
                <div className="lm-about-quote-card__author">
                  <strong>LETAN Media Leadership</strong>
                  <span>AI, Media & Digital Growth Studio</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4 Core Strategic Pillars */}
      <section className="lm-about-pillars">
        <div className="lm-section-container">
          <motion.div
            className="lm-about-section-head"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <div className="lm-section-eyebrow">HỆ THỐNG NĂNG LỰC</div>
            <h2>4 trụ cột chiến lược của LETAN Media</h2>
            <p>
              Một hệ sinh thái giải pháp đồng bộ được xây dựng để đáp ứng toàn diện mọi bài toán số hóa của doanh nghiệp.
            </p>
          </motion.div>

          <div className="lm-about-pillars__grid">
            {PILLARS.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  className="lm-about-pillar-card"
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: reduceMotion ? 0 : index * 0.08,
                  }}
                >
                  <div className="lm-about-pillar-card__top">
                    <span className="lm-about-pillar-card__index">{pillar.id}</span>
                    <span className="lm-about-pillar-card__tag">{pillar.tag}</span>
                  </div>
                  <div className="lm-about-pillar-card__icon">
                    <Icon size={24} />
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-Step Methodology */}
      <section className="lm-about-method">
        <div className="lm-section-container">
          <motion.div
            className="lm-about-section-head"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <div className="lm-section-eyebrow">QUY TRÌNH THỰC THI</div>
            <h2>Quy trình chuẩn hóa 4 bước</h2>
            <p>
              Tối ưu hóa thời gian bàn giao và kiểm soát chất lượng chặt chẽ ở từng giai đoạn.
            </p>
          </motion.div>

          <div className="lm-about-method__grid">
            {METHODOLOGY.map((item, index) => (
              <motion.div
                key={item.step}
                className="lm-about-method-card"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : index * 0.07,
                }}
              >
                <div className="lm-about-method-card__step">{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics & SLAs */}
      <section className="lm-about-metrics">
        <div className="lm-section-container">
          <motion.div
            className="lm-about-section-head"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <div className="lm-section-eyebrow">TIÊU CHUẨN DỊCH VỤ</div>
            <h2>Cam kết SLA & an toàn kỹ thuật</h2>
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
      </section>

      {/* Climax CTA */}
      <section className="lm-about-cta">
        <div className="lm-section-container">
          <motion.div
            className="lm-final-cta__panel"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
          >
            <div className="lm-final-cta__ambient" aria-hidden="true" />
            <div className="lm-final-cta__content">
              <div className="lm-final-cta__eyebrow">
                <span className="lm-final-cta__eyebrow-dot" />
                HỢP TÁC CÙNG LETAN
              </div>

              <h2>
                Sẵn sàng nâng cấp năng lực số
                <br />
                <span>cho doanh nghiệp của bạn?</span>
              </h2>

              <p>
                Từ chiến lược tăng trưởng, ứng dụng AI đến bảo vệ kênh và xây dựng phần mềm — đội ngũ kỹ thuật của chúng tôi luôn sẵn sàng hỗ trợ bạn.
              </p>

              <div className="lm-final-cta__actions">
                <Link to="/contact" className="lm-btn lm-btn--primary">
                  <span>Gửi yêu cầu tư vấn</span>
                  <ArrowRight size={17} strokeWidth={1.8} />
                </Link>

                <button
                  type="button"
                  className="lm-btn lm-btn--secondary"
                  onClick={openAssistant}
                >
                  <MessageSquare size={17} strokeWidth={1.7} />
                  <span>Trao đổi với LETAN AI</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
