import React, { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import V2PageHeader from '../components/V2PageHeader';
import V2PageFooter from '../components/V2PageFooter';
import Reveal from './Reveal';
import { getCaseBySlug, getPublishedCases } from '../data/caseStudies';
import { track, ANALYTICS_EVENTS } from '../lib/analytics';
import './WorkPageV2.css';
import './CaseStudyV2.css';

/** Format route path to readable label. */
function formatRouteLabel(route) {
  const map = {
    '/chatbot-ai': 'Chatbot AI',
    '/tiktok-report': 'Bảo vệ TikTok',
    '/youtube-report': 'Bảo vệ YouTube',
    '/services/website-development': 'Website Development',
    '/services/platform-protection': 'Platform Protection',
    '/services/seo-geo': 'SEO & GEO',
  };
  return map[route] || route.split('/').filter(Boolean).join(' → ');
}

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const cs = getCaseBySlug(slug);

  useEffect(() => {
    if (cs) track(ANALYTICS_EVENTS.VIEW_CASE_STUDY, { case_slug: slug, source_page: `/work/${slug}` });
  }, [slug, cs]);

  // 404 for unpublished or missing slugs
  if (!cs) {
    return <Navigate to="/work" replace />;
  }

  // Find next project for navigation
  const allCases = getPublishedCases();
  const currentIndex = allCases.findIndex((c) => c.slug === slug);
  const nextCase = allCases[(currentIndex + 1) % allCases.length];
  const hasNext = nextCase && nextCase.slug !== cs.slug;

  return (
    <div className="wp2 csd2">
      <Seo
        title={`${cs.title} | LETAN Media`}
        description={cs.summary}
        path={`/work/${cs.slug}`}
        image={cs.images?.hero}
      />

      <V2PageHeader />

      {/* Hero */}
      <section className="csd2-hero">
        <div className="csd2-hero__inner">
          <Reveal>
            <Link to="/work" className="csd2-back">
              <ArrowLeft size={15} /> Tất cả dự án
            </Link>
            <p className="wp2-section-eyebrow">{cs.category}</p>
            <h1 className="csd2-title">{cs.title}</h1>
            <p className="csd2-summary">{cs.summary}</p>
          </Reveal>

          {(cs.services?.length > 0 || cs.technologies?.length > 0) && (
            <Reveal delay={0.08} className="csd2-meta">
              {cs.services?.length > 0 && (
                <div className="csd2-meta__group">
                  <span className="csd2-meta__label">Dịch vụ</span>
                  <div className="csd2-tags">
                    {cs.services.map((s) => (
                      <span key={s} className="csd2-tag">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {cs.technologies?.length > 0 && (
                <div className="csd2-meta__group">
                  <span className="csd2-meta__label">Công nghệ</span>
                  <div className="csd2-tags">
                    {cs.technologies.map((t) => (
                      <span key={t} className="csd2-tag csd2-tag--tech">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </Reveal>
          )}

          {cs.images?.hero && (
            <Reveal delay={0.15}>
              <div className="csd2-hero__media">
                <img
                  src={cs.images.hero}
                  alt={cs.title}
                  loading="eager"
                  width="1200"
                  height="675"
                />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* 01 — Thách thức */}
      {cs.challenge && (
        <section className="csd2-section">
          <div className="csd2-section__inner">
            <div className="csd2-section__grid">
              <Reveal>
                <span className="csd2-section__num">01</span>
                <h2 className="csd2-section__title">Thách thức</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="csd2-section__body">{cs.challenge}</p>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* 02 — Giải pháp */}
      {cs.solution && (
        <section className="csd2-section csd2-section--alt">
          <div className="csd2-section__inner">
            <div className="csd2-section__grid">
              <Reveal>
                <span className="csd2-section__num">02</span>
                <h2 className="csd2-section__title">Giải pháp</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="csd2-section__body">{cs.solution}</p>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* 03 — Visual Proof */}
      {cs.images?.gallery && cs.images.gallery.length > 0 && (
        <section className="csd2-section" aria-label="Hình ảnh dự án">
          <div className="csd2-section__inner">
            <Reveal>
              <span className="csd2-section__num">03</span>
              <h2 className="csd2-section__title">Visual Proof</h2>
            </Reveal>
            <div className="csd2-gallery">
              {cs.images.gallery.map((img, i) => (
                <Reveal key={i} delay={i * 0.08} className="csd2-gallery__item">
                  <img
                    src={img}
                    alt={`${cs.title} — hình ${i + 1}`}
                    loading="lazy"
                    width="1200"
                    height="675"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 04 — Kết quả */}
      {cs.results && cs.results.length > 0 && (
        <section className="csd2-section csd2-section--alt">
          <div className="csd2-section__inner">
            <Reveal>
              <span className="csd2-section__num">04</span>
              <h2 className="csd2-section__title">Kết quả</h2>
            </Reveal>
            <div className="csd2-results">
              {cs.results.map((r, i) => (
                <Reveal key={i} className="csd2-result" delay={i * 0.08}>
                  <div className="csd2-result__value">{r.value}</div>
                  <div className="csd2-result__label">{r.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related services */}
      {cs.relatedServices && cs.relatedServices.length > 0 && (
        <section className="csd2-section">
          <div className="csd2-section__inner">
            <Reveal>
              <h2 className="csd2-related__title">Liên quan</h2>
              <div className="csd2-tags">
                {cs.relatedServices.map((route) => (
                  <Link key={route} to={route} className="csd2-tag csd2-tag--link">
                    {formatRouteLabel(route)} <ArrowUpRight size={13} />
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Next project */}
      {hasNext && (
        <section className="csd2-next" aria-label="Dự án tiếp theo">
          <div className="csd2-section__inner">
            <Reveal>
              <p className="wp2-section-eyebrow">Dự án tiếp theo</p>
            </Reveal>
            <Reveal delay={0.08} as={Link} to={`/work/${nextCase.slug}`} className="wp2-card wp2-card--lead csd2-next__card">
              <div className="wp2-card__media">
                {nextCase.images?.hero && (
                  <img src={nextCase.images.hero} alt={nextCase.title} loading="lazy" />
                )}
              </div>
              <div className="wp2-card__body">
                <span className="wp2-card__cat">{nextCase.category}</span>
                <h3 className="wp2-card__title">{nextCase.title}</h3>
                <p className="wp2-card__summary">{nextCase.summary}</p>
                <span className="wp2-card__cta">
                  Xem dự án
                  <span className="wp2-arrow" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={2} /></span>
                </span>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="wp2-cta" aria-label="Khởi đầu dự án">
        <div className="wp2-cta__panel">
          <Reveal>
            <p className="wp2-cta__eyebrow">
              <span className="wp2-cta__dot" aria-hidden="true" />
              ĐỒNG HÀNH CHIẾN LƯỢC CÙNG LETAN
            </p>
            <h2 className="wp2-cta__title">
              Bạn muốn đạt được kết quả tương tự
              <br />
              cho thương hiệu của mình?
            </h2>
            <p className="wp2-cta__desc">
              LETAN Media sẵn sàng đồng hành từ khâu phân tích bài toán, xây dựng kiến trúc cho đến triển khai kỹ thuật toàn diện.
            </p>
            <div className="wp2-cta__actions">
              <Link to="/contact" className="wp2-btn wp2-btn--primary">
                <span>Trao đổi về dự án</span>
                <ArrowRight size={17} strokeWidth={1.8} />
              </Link>
              <Link to="/work" className="wp2-btn wp2-btn--secondary">
                <span>Xem tất cả dự án</span>
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

export default CaseStudyDetail;
