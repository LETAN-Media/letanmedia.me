import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from './Reveal';
import { getPublishedInsights, getFeaturedInsights, getInsightsByCategory, TOPIC_CATEGORIES } from '../data/insights';
import { track, ANALYTICS_EVENTS } from '../lib/analytics';
import './home.css';

const InsightsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const featured = getFeaturedInsights();
  const filtered = getInsightsByCategory(activeCategory);
  const allCount = getPublishedInsights().length;

  useEffect(() => {
    track(ANALYTICS_EVENTS.VIEW_INSIGHT, { source_page: '/insights' });
  }, []);

  return (
    <>
      <Seo
        title="Kiến thức — AI, Digital Growth & Platform Protection | LETAN Media"
        description="Blog & insight về AI, truyền thông số, SEO/GEO, platform protection và web development từ LETAN Media."
        path="/insights"
      />

      {/* Hero */}
      <section className="hm-section hm-section--tight" style={{ paddingTop: '160px', paddingBottom: '60px' }}>
        <div className="hm-wrap">
          <Reveal>
            <span className="hm-eyebrow">Kiến thức</span>
            <h1 className="hm-h2" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              Insights & kiến thức chuyên sâu
            </h1>
            <p className="hm-lead" style={{ marginTop: '18px', maxWidth: '680px' }}>
              {allCount > 0
                ? `${allCount} bài viết thực tế từ kinh nghiệm vận hành — không phải nội dung AI-generated tràn lan.`
                : 'Nội dung đang được chuẩn bị. Mỗi bài viết đi kèm kinh nghiệm thực tế — không viết để SEO.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="hm-section hm-section--tight" aria-label="Bài nổi bật">
          <div className="hm-wrap">
            <Reveal>
              <span className="hm-eyebrow">Nổi bật</span>
            </Reveal>
            <div className="hm-work__grid" style={{ marginTop: '24px' }}>
              {featured.map((insight, i) => (
                <Reveal
                  as={Link}
                  to={`/insights/${insight.slug}`}
                  key={insight.slug}
                  className="hm-work__card is-wide"
                  delay={i * 0.06}
                  style={{ '--c1': getCategoryGradient(insight.category).c1, '--c2': getCategoryGradient(insight.category).c2 }}
                >
                  <span className="hm-work__arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
                  <span className="hm-work__cat">{insight.category}</span>
                  <h2 className="hm-work__title">{insight.title}</h2>
                  <p className="hm-work__desc">{insight.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Topic Filter + Article Grid */}
      <section className="hm-section hm-section--tight" aria-label="Tất cả bài viết">
        <div className="hm-wrap">
          <Reveal className="hm-work__head">
            <div>
              <span className="hm-eyebrow">Tất cả</span>
              <h2 className="hm-h3">Bài viết</h2>
            </div>
          </Reveal>

          {/* Topic Navigation */}
          <Reveal style={{ marginBottom: '36px' }}>
            <div className="hm-filters" role="tablist" aria-label="Lọc theo chủ đề">
              {TOPIC_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  role="tab"
                  aria-selected={activeCategory === cat.key}
                  className={`hm-filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Article Grid */}
          <div className="hm-insights-grid">
            {filtered.length === 0 ? (
              <Reveal style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0' }}>
                <p className="hm-muted" style={{ fontSize: '1.1rem' }}>Chưa có bài viết trong danh mục này.</p>
              </Reveal>
            ) : (
              filtered.map((insight, i) => (
                <Reveal key={insight.slug} delay={i * 0.05}>
                  <Link to={`/insights/${insight.slug}`} className="hm-insight-card">
                    <div className="hm-insight-card__category">{insight.category}</div>
                    <h3 className="hm-insight-card__title">{insight.title}</h3>
                    <p className="hm-insight-card__desc">{insight.description}</p>
                    <div className="hm-insight-card__meta">
                      <span><Clock size={14} /> {formatDate(insight.publishedAt)}</span>
                      <span className="hm-link-arrow" style={{ fontSize: '0.9rem' }}>Đọc tiếp <ArrowUpRight size={14} /></span>
                    </div>
                  </Link>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hm-section hm-final" aria-label="Liên hệ LETAN">
        <div className="hm-final__bg" aria-hidden="true" />
        <div className="hm-wrap hm-final__inner">
          <Reveal>
            <h2 className="hm-final__title">Bạn cần tư vấn về nội dung nào?</h2>
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

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function getCategoryGradient(category) {
  const map = {
    'AI & Automation': { c1: 'rgba(47,212,167,0.9)', c2: 'rgba(13,18,32,0.7)' },
    'Platform Protection': { c1: 'rgba(79,124,255,0.9)', c2: 'rgba(19,25,39,0.7)' },
    'Web & Technology': { c1: 'rgba(38,217,242,0.85)', c2: 'rgba(13,18,32,0.7)' },
    'Digital Growth': { c1: 'rgba(79,124,255,0.85)', c2: 'rgba(19,25,39,0.7)' },
  };
  return map[category] || { c1: 'rgba(79,124,255,0.85)', c2: 'rgba(19,25,39,0.7)' };
}

export default InsightsPage;
