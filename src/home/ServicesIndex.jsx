import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import Reveal from './Reveal';
import { getAllServices } from '../data/services';
import './home.css';

const ServicesIndex = () => {
  const services = getAllServices();

  return (
    <div className="lm-services-index-page">
      <Seo
        title="Dịch vụ — AI, Digital Growth & Platform Protection | LETAN Media"
        description="Danh mục dịch vụ LETAN Media: SEO & GEO, Social Media, Paid Ads, TikTok Growth, Platform Protection, Chatbot AI, Website Development."
        path="/services"
      />

      {/* Hero */}
      <section className="hm-section hm-section--tight" style={{ paddingTop: '140px', paddingBottom: '40px' }}>
        <div className="hm-wrap">
          <Breadcrumbs />
          <Reveal>
            <span className="lm-section-eyebrow">HỆ SINH THÁI DỊCH VỤ · SOLUTIONS DIRECTORY</span>
            <h1 className="hm-h2" style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)', marginTop: '12px' }}>
              Giải pháp số hóa & tăng trưởng bứt phá
            </h1>
            <p className="hm-lead" style={{ marginTop: '16px', maxWidth: '720px' }}>
              Mỗi dịch vụ tại LETAN Media được xây dựng từ bài toán thực tế của cá nhân và doanh nghiệp — kết hợp công nghệ AI, năng lực kỹ thuật và thực thi đa kênh chuẩn mực.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="hm-section hm-section--tight" style={{ paddingTop: '20px', paddingBottom: '80px' }}>
        <div className="hm-wrap">
          <div className="hm-services-index-grid">
            {services.map((s, i) => (
              <Reveal
                as={Link}
                to={`/services/${s.slug}`}
                key={s.slug}
                className="hm-services-index-card"
                delay={i * 0.05}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span className="hm-services-index-card__eyebrow">{s.eyebrow}</span>
                  <div className="lm-card-arrow" style={{ opacity: 0.8 }}>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <h2 className="hm-services-index-card__title">{s.shortTitle}</h2>
                <p className="hm-services-index-card__desc">{s.description.split('.')[0]}.</p>
                {s.outcomes?.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-champagne)', fontSize: '0.82rem', fontWeight: 500, marginTop: '8px' }}>
                    <CheckCircle2 size={14} />
                    <span>{s.outcomes[0]}</span>
                  </div>
                )}
                <span className="hm-link-arrow" style={{ marginTop: 'auto', paddingTop: '16px' }}>
                  <span>Chi tiết giải pháp</span>
                  <ArrowRight size={15} />
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Climax CTA */}
      <section className="lm-about-cta" style={{ paddingTop: '20px', paddingBottom: '100px' }}>
        <div className="lm-section-container">
          <div className="lm-final-cta__panel">
            <div className="lm-final-cta__ambient" aria-hidden="true" />
            <div className="lm-final-cta__content">
              <div className="lm-final-cta__eyebrow">
                <span className="lm-final-cta__eyebrow-dot" />
                TƯ VẤN GIẢI PHÁP
              </div>
              <h2>
                Bạn đang tìm kiếm giải pháp nào
                <br />
                <span>cho doanh nghiệp của mình?</span>
              </h2>
              <p>
                Đội ngũ kỹ thuật và chuyên gia của LETAN Media sẽ phản hồi, rà soát hiện trạng và đề xuất phương án tối ưu trong vòng 24 giờ.
              </p>
              <div className="lm-final-cta__actions">
                <Link to="/contact" className="lm-btn lm-btn--primary">
                  <span>Trao đổi với chúng tôi</span>
                  <ArrowRight size={17} strokeWidth={1.8} />
                </Link>
                <Link to="/work" className="lm-btn lm-btn--secondary">
                  <span>Xem dự án thực tế</span>
                  <ArrowUpRight size={17} strokeWidth={1.8} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesIndex;
