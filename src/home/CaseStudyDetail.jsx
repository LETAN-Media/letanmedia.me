import React, { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from './Reveal';
import { getCaseBySlug, getPublishedCases } from '../data/caseStudies';
import { track, ANALYTICS_EVENTS } from '../lib/analytics';
import './home.css';

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

  return (
    <>
      <Seo
        title={`${cs.title} | LETAN Media`}
        description={cs.summary}
        path={`/work/${cs.slug}`}
        image={cs.images?.hero}
      />

      {/* Breadcrumb */}
      <nav className="hm-wrap" aria-label="Breadcrumb" style={{ paddingTop: '120px', paddingBottom: '0' }}>
        <Reveal>
          <div className="hm-breadcrumb">
            <Link to="/work" className="hm-breadcrumb-link">
              <ArrowLeft size={14} /> Dự án
            </Link>
            <span className="hm-breadcrumb-sep" aria-hidden="true">/</span>
            <span className="hm-breadcrumb-current">{cs.title}</span>
          </div>
        </Reveal>
      </nav>

      {/* Hero */}
      <section className="hm-section hm-section--tight" style={{ paddingTop: '40px' }}>
        <div className="hm-wrap">
          <Reveal>
            <span className="hm-eyebrow">{cs.category}</span>
            <h1 className="hm-h2" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', marginBottom: '24px' }}>
              {cs.title}
            </h1>
            <p className="hm-lead" style={{ maxWidth: '720px' }}>{cs.summary}</p>
          </Reveal>

          {/* Hero image */}
          {cs.images?.hero && (
            <Reveal delay={0.15} style={{ marginTop: '48px' }}>
              <div className="hm-case-hero-img">
                <img
                  src={cs.images.hero}
                  alt={cs.title}
                  loading="eager"
                  width="1200"
                  height="675"
                  style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', display: 'block' }}
                />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Overview — Services & Technologies */}
      <section className="hm-section hm-section--tight">
        <div className="hm-wrap">
          <div className="hm-case-meta-grid">
            {cs.services && cs.services.length > 0 && (
              <Reveal className="hm-case-meta-block">
                <h3 className="hm-case-meta-label">Dịch vụ</h3>
                <div className="hm-case-tags">
                  {cs.services.map((s) => (
                    <span key={s} className="hm-case-tag">{s}</span>
                  ))}
                </div>
              </Reveal>
            )}
            {cs.technologies && cs.technologies.length > 0 && (
              <Reveal className="hm-case-meta-block" delay={0.08}>
                <h3 className="hm-case-meta-label">Công nghệ</h3>
                <div className="hm-case-tags">
                  {cs.technologies.map((t) => (
                    <span key={t} className="hm-case-tag hm-case-tag--tech">{t}</span>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Challenge */}
      {cs.challenge && (
        <section className="hm-section hm-section--tight" style={{ background: 'var(--color-surface-1)', borderTop: 'var(--border-subtle)', borderBottom: 'var(--border-subtle)' }}>
          <div className="hm-wrap">
            <div className="hm-case-content-grid">
              <Reveal>
                <span className="hm-case-section-num">01</span>
                <h2 className="hm-h3">Thách thức</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="hm-case-body">{cs.challenge}</p>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Solution / Strategy */}
      {cs.solution && (
        <section className="hm-section hm-section--tight">
          <div className="hm-wrap">
            <div className="hm-case-content-grid">
              <Reveal>
                <span className="hm-case-section-num">02</span>
                <h2 className="hm-h3">Giải pháp</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="hm-case-body">{cs.solution}</p>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Visual Proof — Gallery */}
      {cs.images?.gallery && cs.images.gallery.length > 0 && (
        <section className="hm-section hm-section--tight" aria-label="Hình ảnh dự án">
          <div className="hm-wrap">
            <Reveal>
              <span className="hm-case-section-num">03</span>
              <h2 className="hm-h3" style={{ marginBottom: '32px' }}>Visual Proof</h2>
            </Reveal>
            <div className="hm-case-gallery">
              {cs.images.gallery.map((img, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <img
                    src={img}
                    alt={`${cs.title} — hình ${i + 1}`}
                    loading="lazy"
                    width="1200"
                    height="675"
                    style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)', display: 'block' }}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {cs.results && cs.results.length > 0 && (
        <section className="hm-section hm-section--tight" style={{ background: 'var(--color-surface-1)', borderTop: 'var(--border-subtle)' }}>
          <div className="hm-wrap">
            <Reveal>
              <span className="hm-case-section-num">04</span>
              <h2 className="hm-h3" style={{ marginBottom: '32px' }}>Kết quả</h2>
            </Reveal>
            <div className="hm-case-results-grid">
              {cs.results.map((r, i) => (
                <Reveal key={i} className="hm-case-result" delay={i * 0.08}>
                  <div className="hm-metric__value">{r.value}</div>
                  <div className="hm-metric__label">{r.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {cs.relatedServices && cs.relatedServices.length > 0 && (
        <section className="hm-section hm-section--tight">
          <div className="hm-wrap">
            <Reveal>
              <h2 className="hm-h3" style={{ marginBottom: '28px' }}>Liên quan</h2>
            </Reveal>
            <div className="hm-case-related">
              {cs.relatedServices.map((route) => (
                <Reveal key={route}>
                  <Link to={route} className="hm-case-related-link">
                    {formatRouteLabel(route)} <ArrowUpRight size={14} />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next Project + CTA */}
      <section className="hm-section hm-final" aria-label="Dự án tiếp theo">
        <div className="hm-final__bg" aria-hidden="true" />
        <div className="hm-wrap hm-final__inner">
          {nextCase && nextCase.slug !== cs.slug && (
            <Reveal>
              <p className="hm-muted" style={{ marginBottom: '12px', textAlign: 'center' }}>Dự án tiếp theo</p>
              <Link to={`/work/${nextCase.slug}`} className="hm-case-next-link">
                {nextCase.title} <ArrowUpRight size={18} />
              </Link>
            </Reveal>
          )}
          <Reveal delay={0.1} className="hm-final__actions" style={{ marginTop: '40px' }}>
            <Link to="/work" className="ui-btn ui-btn--secondary ui-btn--lg">
              <ArrowLeft size={16} /> Xem tất cả dự án
            </Link>
            <Link to="/contact" className="ui-btn ui-btn--primary ui-btn--lg">
              Trao đổi với LETAN
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
};

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

export default CaseStudyDetail;
