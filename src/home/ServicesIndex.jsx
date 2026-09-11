import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Seo from '../components/Seo';
import V2PageHeader from '../components/V2PageHeader';
import V2PageFooter from '../components/V2PageFooter';
import Reveal from './Reveal';
import { getAllServices } from '../data/services';
import '../components/V2PageKit.css';
import './ServicesIndexV2.css';

const ServicesIndex = () => {
  const services = getAllServices();

  return (
    <div className="v2k svc2">
      <Seo
        title="Dịch vụ — AI, Digital Growth & Platform Protection | LETAN Media"
        description="Danh mục dịch vụ LETAN Media: SEO & GEO, Social Media, Paid Ads, TikTok Growth, Platform Protection, Chatbot AI, Website Development."
        path="/services"
      />

      <V2PageHeader />

      {/* Hero */}
      <section className="v2k-hero">
        <div className="v2k-hero__inner">
          <Reveal>
            <p className="v2k-hero__eyebrow">SERVICES · LETAN MEDIA</p>
            <h1 className="v2k-hero__title">
              GIẢI PHÁP
              <br />
              SỐ HÓA
            </h1>
            <p className="v2k-hero__subtitle">
              Mỗi dịch vụ tại LETAN Media được xây dựng từ bài toán thực tế của cá nhân và doanh nghiệp — kết hợp công nghệ AI, năng lực kỹ thuật và thực thi đa kênh chuẩn mực.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="svc2-grid-section">
        <div className="v2k-section__inner">
          <div className="svc2-grid">
            {services.map((s, i) => (
              <Reveal
                as={Link}
                to={`/services/${s.slug}`}
                key={s.slug}
                className="v2k-card svc2-card"
                delay={i * 0.05}
              >
                <span className="v2k-card__eyebrow">{s.eyebrow}</span>
                <h2 className="v2k-card__title">{s.shortTitle}</h2>
                <p className="v2k-card__desc">{s.description.split('.')[0]}.</p>
                {s.outcomes?.length > 0 && (
                  <div className="svc2-card__outcome">
                    <CheckCircle2 size={14} />
                    <span>{s.outcomes[0]}</span>
                  </div>
                )}
                <span className="v2k-card__cta">
                  Chi tiết giải pháp
                  <span className="v2k-arrow" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={2} /></span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="v2k-cta">
        <div className="v2k-cta__panel">
          <Reveal>
            <p className="v2k-cta__eyebrow">
              <span className="v2k-cta__dot" aria-hidden="true" />
              TƯ VẤN GIẢI PHÁP
            </p>
            <h2 className="v2k-cta__title">
              Bạn đang tìm kiếm giải pháp nào
              <br />
              cho doanh nghiệp của mình?
            </h2>
            <p className="v2k-cta__desc">
              Đội ngũ kỹ thuật và chuyên gia của LETAN Media sẽ phản hồi, rà soát hiện trạng và đề xuất phương án tối ưu trong vòng 24 giờ.
            </p>
            <div className="v2k-cta__actions">
              <Link to="/contact" className="v2k-btn v2k-btn--primary">
                <span>Trao đổi với chúng tôi</span>
                <ArrowRight size={17} strokeWidth={1.8} />
              </Link>
              <Link to="/work" className="v2k-btn v2k-btn--secondary">
                <span>Xem dự án thực tế</span>
                <ArrowUpRight size={17} strokeWidth={1.8} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <V2PageFooter />
    </div>
  );
};

export default ServicesIndex;
