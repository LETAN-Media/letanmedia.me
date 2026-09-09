import React from 'react';
import Seo from '../components/Seo';
import HeroV2 from './HeroV2';
import './home-v2.css';

const services = [
  {
    number: '01',
    title: 'AI & Automation',
    text: 'Xây dựng hệ thống AI, chatbot, agent và tự động hóa quy trình theo nhu cầu thực tế.',
  },
  {
    number: '02',
    title: 'Digital Growth',
    text: 'Chiến lược tăng trưởng, nội dung và hệ thống digital tập trung vào hiệu quả dài hạn.',
  },
  {
    number: '03',
    title: 'Web & Software',
    text: 'Website, dashboard, SaaS và phần mềm theo yêu cầu với kiến trúc có thể mở rộng.',
  },
  {
    number: '04',
    title: 'Platform Protection',
    text: 'Giải pháp hỗ trợ bảo vệ thương hiệu, nội dung và tài sản số trên các nền tảng.',
  },
];

const capabilities = [
  'AI Agents',
  'Chatbot',
  'Automation',
  'Web Development',
  'SaaS',
  'Dashboard',
  'SEO',
  'Digital Growth',
  'Platform Protection',
];

export default function HomeV2() {
  return (
    <div className="lmv2">
      <Seo
        title="LETAN Media V2"
        description="Bản thử nghiệm giao diện mới của LETAN Media."
        path="/v2"
        noindex
      />

      <nav
        className="lmv2-nav"
        aria-label="LETAN Media V2"
      >
        <a
          href="/v2"
          className="lmv2-nav__logo"
        >
          LETAN
          <span>Media</span>
        </a>

        <div className="lmv2-nav__links">
          <a href="#v2-services">
            Dịch vụ
          </a>

          <a href="#v2-about">
            Về LETAN
          </a>

          <a
            href="/contact"
            className="lmv2-nav__contact"
          >
            Liên hệ
          </a>
        </div>
      </nav>

      <HeroV2 />

      <section
        id="v2-services"
        className="lmv2-section lmv2-services"
      >
        <div className="lmv2-section__head">
          <span className="lmv2-kicker">
            002 / NĂNG LỰC
          </span>

          <h2>
            Công nghệ không chỉ để trình diễn.
            <br />
            Nó phải tạo ra kết quả.
          </h2>
        </div>

        <div className="lmv2-services__grid">
          {services.map((service) => (
            <article
              key={service.number}
              className="lmv2-service"
            >
              <span className="lmv2-service__number">
                {service.number}
              </span>

              <h3>
                {service.title}
              </h3>

              <p>
                {service.text}
              </p>

              <span className="lmv2-service__arrow">
                ↗
              </span>
            </article>
          ))}
        </div>
      </section>

      <section
        id="v2-about"
        className="lmv2-section lmv2-about"
      >
        <div className="lmv2-about__label">
          <span className="lmv2-kicker">
            003 / LETAN
          </span>

          <p>
            AI-FIRST DIGITAL STUDIO
          </p>
        </div>

        <div className="lmv2-about__content">
          <h2>
            Xây những hệ thống
            <br />
            có thể làm việc.
          </h2>

          <p>
            LETAN Media kết hợp AI,
            truyền thông số và phát triển
            phần mềm để biến một bài toán
            kinh doanh thành một hệ thống
            có thể vận hành và mở rộng.
          </p>
        </div>
      </section>

      <section className="lmv2-capabilities">
        <div className="lmv2-capabilities__track">
          {capabilities.map((item) => (
            <span key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="lmv2-cta">
        <span className="lmv2-kicker">
          004 / START
        </span>

        <h2>
          Có một ý tưởng?
          <br />
          Xây nó thành thật.
        </h2>

        <a
          href="/contact"
          className="lmv2-cta__button"
        >
          Bắt đầu dự án
          <span>↗</span>
        </a>
      </section>

      <footer className="lmv2-footer">
        <a
          href="/v2"
          className="lmv2-footer__brand"
        >
          LETAN Media
        </a>

        <span>
          VIETNAM / 2026
        </span>

        <a href="/">
          Homepage hiện tại
        </a>
      </footer>
    </div>
  );
}
