import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  Lock,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import Seo from '../../components/Seo';
import V2PageHeader from '../../components/V2PageHeader';
import V2PageFooter from '../../components/V2PageFooter';
import '../../components/V2PageKit.css';
import './AboutPageV2.css';

const PILLARS = [
  {
    id: '01',
    title: 'AI-First Engineering',
    desc: 'Tích hợp các mô hình ngôn ngữ lớn (LLM), AI Chatbot và workflow tự động hóa sâu vào hoạt động thực tế, giúp doanh nghiệp vận hành 24/7 và giải phóng nguồn lực.',
    icon: Bot,
    tag: 'Trí tuệ nhân tạo',
  },
  {
    id: '02',
    title: 'Omni-Channel Digital Growth',
    desc: 'Chiến lược tăng trưởng đa kênh trên TikTok, Facebook, YouTube và SEO/GEO dựa trên dữ liệu định lượng, tối ưu hóa tỷ lệ chuyển đổi và vị thế thương hiệu.',
    icon: TrendingUp,
    tag: 'Tăng trưởng số',
  },
  {
    id: '03',
    title: 'Platform Protection & Trust',
    desc: 'Bảo vệ tài sản số, gỡ bỏ vi phạm bản quyền DMCA, xử lý khủng hoảng truyền thông và hỗ trợ xác minh tích xanh chính chủ theo đúng chính sách các nền tảng.',
    icon: ShieldCheck,
    tag: 'Bảo vệ thương hiệu',
  },
  {
    id: '04',
    title: 'Production-Grade Software',
    desc: 'Phát triển website chuẩn studio cao cấp, web application và hệ thống quản trị chuyên biệt với tốc độ tải trang vượt trội, chuẩn SEO và bảo mật tối đa.',
    icon: Code2,
    tag: 'Kỹ thuật phần mềm',
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
    <div className="v2k abt2">
      <Seo
        title="Về LETAN Media | AI-First Digital Agency"
        description="LETAN Media — agency AI-first chuyên giải pháp AI, truyền thông số, phát triển phần mềm và bảo vệ nền tảng thương hiệu cho cá nhân và doanh nghiệp."
        path="/about"
      />

      <V2PageHeader />

      {/* Hero */}
      <section className="v2k-hero">
        <div className="v2k-hero__inner">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="v2k-hero__eyebrow">VỀ CHÚNG TÔI · AGENCY MANIFESTO</p>
            <h1 className="v2k-hero__title">
              KIẾN TẠO VỊ THẾ SỐ
              <br />
              BẰNG CÔNG NGHỆ AI
            </h1>
            <p className="v2k-hero__subtitle">
              LETAN Media là agency AI-first kết hợp trí tuệ nhân tạo, truyền thông số và kỹ thuật phần mềm để giúp cá nhân và doanh nghiệp xây dựng năng lực tăng trưởng vượt trội trong kỷ nguyên số.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Philosophy */}
      <section className="abt2-philosophy">
        <div className="v2k-section__inner">
          <div className="abt2-philosophy__grid">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
            >
              <p className="v2k-section-eyebrow">Triết lý hoạt động</p>
              <h2 className="abt2-philosophy__title">Không bán lý thuyết mơ hồ. Đo lường bằng kết quả cụ thể.</h2>
              <p className="abt2-philosophy__text">
                Chúng tôi tin rằng công nghệ chỉ thực sự có giá trị khi mang lại tác động rõ rệt vào hoạt động kinh doanh. Thay vì các giải pháp chung chung, LETAN Media tập trung vào chiều sâu kỹ thuật, sự tuân thủ chuẩn mực chính sách nền tảng và tính bền vững lâu dài của từng dự án.
              </p>
              <p className="abt2-philosophy__text">
                Từ việc bảo vệ một kênh TikTok/YouTube khỏi các cuộc tấn công vi phạm bản quyền, đến việc triển khai một trợ lý Chatbot AI phản hồi khách hàng trong tích tắc — mọi việc chúng tôi làm đều hướng tới sự an tâm và tăng trưởng bền bỉ của đối tác.
              </p>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <div className="abt2-quote">
                <span className="abt2-quote__badge">Cam kết cốt lõi</span>
                <blockquote>
                  &ldquo;Công nghệ tiên phong chỉ phát huy sức mạnh tối đa khi đi kèm sự am hiểu sâu sắc về nền tảng và kỷ luật thực thi nghiêm ngặt.&rdquo;
                </blockquote>
                <div className="abt2-quote__author">
                  <strong>LETAN Media Leadership</strong>
                  <span>AI, Media &amp; Digital Growth Studio</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4 Core Strategic Pillars */}
      <section className="abt2-section">
        <div className="v2k-section__inner">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="abt2-section__head"
          >
            <p className="v2k-section-eyebrow">Hệ thống năng lực</p>
            <h2 className="v2k-section-title">4 trụ cột chiến lược của LETAN Media</h2>
            <p className="abt2-section__lead">
              Một hệ sinh thái giải pháp đồng bộ được xây dựng để đáp ứng toàn diện mọi bài toán số hóa của doanh nghiệp.
            </p>
          </motion.div>

          <div className="abt2-pillars">
            {PILLARS.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  className="v2k-card abt2-pillar"
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.08 }}
                >
                  <div className="abt2-pillar__top">
                    <span className="v2k-num">{pillar.id}</span>
                    <span className="v2k-tag">{pillar.tag}</span>
                  </div>
                  <div className="abt2-pillar__icon"><Icon size={22} /></div>
                  <h3 className="v2k-card__title">{pillar.title}</h3>
                  <p className="v2k-card__desc">{pillar.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-Step Methodology */}
      <section className="abt2-section abt2-section--alt">
        <div className="v2k-section__inner">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="abt2-section__head"
          >
            <p className="v2k-section-eyebrow">Quy trình thực thi</p>
            <h2 className="v2k-section-title">Quy trình chuẩn hóa 4 bước</h2>
            <p className="abt2-section__lead">
              Tối ưu hóa thời gian bàn giao và kiểm soát chất lượng chặt chẽ ở từng giai đoạn.
            </p>
          </motion.div>

          <div className="abt2-method">
            {METHODOLOGY.map((item, index) => (
              <motion.div
                key={item.step}
                className="v2k-card"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.07 }}
              >
                <span className="v2k-num">{item.step}</span>
                <h3 className="v2k-card__title">{item.title}</h3>
                <p className="v2k-card__desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics & SLAs */}
      <section className="abt2-section">
        <div className="v2k-section__inner">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="abt2-section__head"
          >
            <p className="v2k-section-eyebrow">Tiêu chuẩn dịch vụ</p>
            <h2 className="v2k-section-title">Cam kết SLA &amp; an toàn kỹ thuật</h2>
          </motion.div>

          <div className="abt2-metrics">
            {METRICS.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  className="abt2-metric"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.06 }}
                >
                  <div className="abt2-metric__icon"><Icon size={20} strokeWidth={1.75} /></div>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                  <small>{metric.detail}</small>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="v2k-cta">
        <div className="v2k-cta__panel">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
          >
            <p className="v2k-cta__eyebrow">
              <span className="v2k-cta__dot" aria-hidden="true" />
              HỢP TÁC CÙNG LETAN
            </p>
            <h2 className="v2k-cta__title">
              Sẵn sàng nâng cấp năng lực số
              <br />
              cho doanh nghiệp của bạn?
            </h2>
            <p className="v2k-cta__desc">
              Từ chiến lược tăng trưởng, ứng dụng AI đến bảo vệ kênh và xây dựng phần mềm — đội ngũ kỹ thuật của chúng tôi luôn sẵn sàng hỗ trợ bạn.
            </p>
            <div className="v2k-cta__actions">
              <Link to="/contact" className="v2k-btn v2k-btn--primary">
                <span>Gửi yêu cầu tư vấn</span>
                <ArrowRight size={17} strokeWidth={1.8} />
              </Link>
              <button type="button" className="v2k-btn v2k-btn--secondary" onClick={openAssistant}>
                <MessageSquare size={17} strokeWidth={1.7} />
                <span>Trao đổi với LETAN AI</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <V2PageFooter />
    </div>
  );
};

export default AboutPage;
