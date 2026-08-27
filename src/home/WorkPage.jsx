import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from './Reveal';
import { getFeaturedCases, getCasesByTag, FILTER_TAGS } from '../data/caseStudies';
import { track, ANALYTICS_EVENTS } from '../lib/analytics';
import './home.css';

const CAPABILITIES = [
  { label: 'AI Automation', desc: 'Chatbot AI, workflow tự động, LLM agent' },
  { label: 'Digital Growth', desc: 'SEO, GEO, Social Media, Paid Ads' },
  { label: 'Web & Software', desc: 'Website, Mini App, dashboard, tool' },
  { label: 'Platform Protection', desc: 'Report TikTok, YouTube, Facebook' },
];const WorkPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const featured = getFeaturedCases();
  const filtered = getCasesByTag(activeFilter);

  useEffect(() => {
    track(ANALYTICS_EVENTS.VIEW_WORK, { source_page: '/work' });
  }, []);

  return (
    <>
      <Seo
        title="Dự án — Selected Work | LETAN Media"
        description="Những hệ thống, chiến dịch và sản phẩm số được LETAN xây dựng để giải quyết bài toán tăng trưởng thực tế."
        path="/work"
      />

      {/* Hero */}
      <section className="hm-section hm-work-hero" style={{ paddingTop: '160px', paddingBottom: '80px' }}>
        <div className="hm-wrap">
          <Reveal>
            <span className="hm-eyebrow">Selected Work</span>
            <h1 className="hm-h2" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
              Những hệ thống, chiến dịch và sản phẩm số được LETAN xây dựng
            </h1>
            <p className="hm-lead" style={{ marginTop: '18px', maxWidth: '680px' }}>
              Để giải quyết bài toán tăng trưởng thực tế — không phải demo, không phải concept.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured Projects */}
      {featured.length > 0 && (
        <section className="hm-section hm-section--tight" aria-label="Dự án nổi bật">
          <div className="hm-wrap">
            <Reveal>
              <span className="hm-eyebrow">Nổi bật</span>
            </Reveal>
            <div className="hm-work__grid" style={{ marginTop: '24px' }}>
              {featured.map((cs, i) => (
                <Reveal
                  as={Link}
                  to={`/work/${cs.slug}`}
                  key={cs.slug}
                  className="hm-work__card is-wide"
                  delay={i * 0.06}
                  style={{ '--c1': getGradient(cs.category).c1, '--c2': getGradient(cs.category).c2 }}
                >
                  <span className="hm-work__arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
                  <span className="hm-work__cat">{cs.category}</span>
                  <h3 className="hm-work__title">{cs.title}</h3>
                  <p className="hm-work__desc">{cs.summary}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects with Filter */}
      <section className="hm-section hm-section--tight" id="all-work" aria-label="Tất cả dự án">
        <div className="hm-wrap">
          <Reveal className="hm-work__head">
            <div>
              <span className="hm-eyebrow">Tất cả dự án</span>
              <h2 className="hm-h2">Portfolio</h2>
            </div>
          </Reveal>

          {/* Filters */}
          <Reveal style={{ marginBottom: '36px' }}>
            <div className="hm-filters" role="tablist" aria-label="Lọc dự án">
              {FILTER_TAGS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={activeFilter === t.key}
                  className={`hm-filter-btn ${activeFilter === t.key ? 'active' : ''}`}
                  onClick={() => setActiveFilter(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Grid */}
          <div className="hm-work__grid">
            {filtered.length === 0 ? (
              <Reveal style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0' }}>
                <p className="hm-muted" style={{ fontSize: '1.1rem' }}>Chưa có dự án trong danh mục này.</p>
              </Reveal>
            ) : (
              filtered.map((cs, i) => (
                <Reveal
                  as={Link}
                  to={`/work/${cs.slug}`}
                  key={cs.slug}
                  className="hm-work__card"
                  delay={i * 0.05}
                  style={{ '--c1': getGradient(cs.category).c1, '--c2': getGradient(cs.category).c2 }}
                >
                  <span className="hm-work__arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
                  <span className="hm-work__cat">{cs.category}</span>
                  <h3 className="hm-work__title">{cs.title}</h3>
                  <p className="hm-work__desc">{cs.summary}</p>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="hm-section hm-section--tight" style={{ background: 'var(--color-surface-1)', borderTop: 'var(--border-subtle)' }} aria-label="Năng lực">
        <div className="hm-wrap">
          <Reveal>
            <span className="hm-eyebrow">Năng lực</span>
            <h2 className="hm-h2">Chúng tôi làm được gì</h2>
          </Reveal>
          <div className="hm-services__grid" style={{ marginTop: '36px' }}>
            {CAPABILITIES.map((cap, i) => (
              <Reveal key={cap.label} className="hm-service" delay={i * 0.06}>
                <h3 className="hm-service__name">{cap.label}</h3>
                <p className="hm-service__desc">{cap.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="hm-section hm-final" aria-label="Liên hệ LETAN">
        <div className="hm-final__bg" aria-hidden="true" />
        <div className="hm-wrap hm-final__inner">
          <Reveal>
            <h2 className="hm-final__title">Bạn có dự án cần triển khai?</h2>
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

/** Simple category → gradient mapper for cards. */
function getGradient(category) {
  const map = {
    'AI Automation': { c1: 'rgba(47,212,167,0.9)', c2: 'rgba(13,18,32,0.7)' },
    'Platform Protection': { c1: 'rgba(79,124,255,0.9)', c2: 'rgba(19,25,39,0.7)' },
    'Web & Software': { c1: 'rgba(38,217,242,0.85)', c2: 'rgba(13,18,32,0.7)' },
    'Digital Growth': { c1: 'rgba(79,124,255,0.85)', c2: 'rgba(19,25,39,0.7)' },
  };
  return map[category] || { c1: 'rgba(79,124,255,0.85)', c2: 'rgba(19,25,39,0.7)' };
}

export default WorkPage;
