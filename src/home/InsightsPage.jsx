import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, ArrowRight, Clock } from 'lucide-react';
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

      {/* Breadcrumb */}
      <nav className="hm-wrap" aria-label="Breadcrumb" style={{ paddingTop: '120px', paddingBottom: '0' }}>
        <Reveal>
          <div className="hm-breadcrumb">
            <Link to="/" className="hm-breadcrumb-link">
              <ArrowLeft size={14} /> Trang chủ
            </Link>
            <span className="hm-breadcrumb-sep" aria-hidden="true">/</span>
            <span className="hm-breadcrumb-current">Kiến thức</span>
          </div>
        </Reveal>
      </nav>

      {/* Hero */}
      <section className="hm-section hm-section--tight" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
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

      {/* Climax CTA */}
      <section className="lm-final-cta" aria-label="Liên hệ LETAN">
        <div className="hm-wrap">
          <div className="lm-final-cta__panel">
            <div className="lm-final-cta__content">
              <div className="lm-final-cta__eyebrow">
                <span className="lm-final-cta__eyebrow-dot" />
                ĐỒNG HÀNH & PHÁT TRIỂN
              </div>
              <h2>
                Bạn cần tư vấn giải pháp
                <br />
                <span>dành riêng cho doanh nghiệp?</span>
              </h2>
              <p>
                Đội ngũ chuyên gia LETAN Media sẵn sàng trao đổi chi tiết về kiến trúc AI, chiến lược tăng trưởng và bảo vệ thương hiệu số.
              </p>
              <div className="lm-final-cta__actions">
                <Link to="/contact" className="lm-btn lm-btn--primary">
                  <span>Trao đổi với LETAN</span>
                  <ArrowRight size={17} strokeWidth={1.8} />
                </Link>
                <Link to="/services" className="lm-btn lm-btn--secondary">
                  <span>Khám phá dịch vụ</span>
                  <ArrowUpRight size={17} strokeWidth={1.8} />
                </Link>
              </div>
            </div>
          </div>
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
