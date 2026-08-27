import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from './Reveal';
import { getAllServices } from '../data/services';
import './home.css';

const ServicesIndex = () => {
  const services = getAllServices();

  return (
    <>
      <Seo
        title="Dịch vụ — AI, Digital Growth & Platform Protection | LETAN Media"
        description="Danh mục dịch vụ LETAN Media: SEO & GEO, Social Media, Paid Ads, TikTok Growth, Platform Protection, Chatbot AI, Website Development."
        path="/services"
      />

      {/* Hero */}
      <section className="hm-section hm-section--tight" style={{ paddingTop: '160px', paddingBottom: '60px' }}>
        <div className="hm-wrap">
          <Reveal>
            <span className="hm-eyebrow">Dịch vụ</span>
            <h1 className="hm-h2" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              Dịch vụ của LETAN Media
            </h1>
            <p className="hm-lead" style={{ marginTop: '18px', maxWidth: '680px' }}>
              Giải pháp AI, truyền thông số và công nghệ — mỗi dịch vụ bắt đầu từ bài toán kinh doanh, không từ công cụ.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="hm-section hm-section--tight">
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
                <span className="hm-services-index-card__eyebrow">{s.eyebrow}</span>
                <h2 className="hm-services-index-card__title">{s.shortTitle}</h2>
                <p className="hm-services-index-card__desc">{s.description.split('.')[0]}.</p>
                <span className="hm-link-arrow" style={{ marginTop: 'auto' }}>
                  Tìm hiểu thêm <ArrowUpRight size={16} />
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hm-section hm-final" aria-label="Liên hệ LETAN">
        <div className="hm-final__bg" aria-hidden="true" />
        <div className="hm-wrap hm-final__inner">
          <Reveal>
            <h2 className="hm-final__title">Bạn cần dịch vụ nào?</h2>
          </Reveal>
          <Reveal delay={0.1} className="hm-final__actions">
            <Link to="/contact" className="ui-btn ui-btn--primary ui-btn--lg">
              Trao đổi với LETAN
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ServicesIndex;
