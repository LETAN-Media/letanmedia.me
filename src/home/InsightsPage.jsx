import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Clock } from 'lucide-react';
import Seo from '../components/Seo';
import V2PageHeader from '../components/V2PageHeader';
import V2PageFooter from '../components/V2PageFooter';
import Reveal from './Reveal';
import { getPublishedInsights, getFeaturedInsights, getInsightsByCategory, TOPIC_CATEGORIES } from '../data/insights';
import { track, ANALYTICS_EVENTS } from '../lib/analytics';
import '../components/V2PageKit.css';
import './InsightsPageV2.css';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });
}

const ArticleCard = ({ insight, lead = false, delay = 0 }) => (
  <Reveal as={Link} to={`/insights/${insight.slug}`} className={`v2k-card ins2-card${lead ? ' ins2-card--lead' : ''}`} delay={delay}>
    {insight.heroImage && (
      <div className="v2k-card__media">
        <img src={insight.heroImage} alt={insight.title} loading="lazy" />
      </div>
    )}
    <span className="v2k-card__eyebrow">{insight.category}</span>
    <h3 className="v2k-card__title">{insight.title}</h3>
    <p className="v2k-card__desc">{insight.description}</p>
    <div className="ins2-card__meta">
      <span><Clock size={13} /> {formatDate(insight.publishedAt)}</span>
      <span className="v2k-card__cta">
        Đọc tiếp
        <span className="v2k-arrow" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={2} /></span>
      </span>
    </div>
  </Reveal>
);

const InsightsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const featured = getFeaturedInsights();
  const filtered = getInsightsByCategory(activeCategory);
  const allCount = getPublishedInsights().length;

  useEffect(() => {
    track(ANALYTICS_EVENTS.VIEW_INSIGHT, { source_page: '/insights' });
  }, []);

  return (
    <div className="v2k ins2">
      <Seo
        title="Kiến thức — AI, Digital Growth & Platform Protection | LETAN Media"
        description="Blog & insight về AI, truyền thông số, SEO/GEO, platform protection và web development từ LETAN Media."
        path="/insights"
      />

      <V2PageHeader />

      {/* Hero */}
      <section className="v2k-hero">
        <div className="v2k-hero__inner">
          <Reveal>
            <p className="v2k-hero__eyebrow">INSIGHTS · LETAN MEDIA</p>
            <h1 className="v2k-hero__title">
              KIẾN THỨC
              <br />
              CHUYÊN SÂU
            </h1>
            <p className="v2k-hero__subtitle">
              {allCount > 0
                ? `${allCount} bài viết thực tế từ kinh nghiệm vận hành — không phải nội dung AI-generated tràn lan.`
                : 'Nội dung đang được chuẩn bị. Mỗi bài viết đi kèm kinh nghiệm thực tế — không viết để SEO.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="ins2-featured" aria-label="Bài nổi bật">
          <div className="v2k-section__inner">
            <Reveal>
              <p className="v2k-section-eyebrow">Nổi bật</p>
            </Reveal>
            <div className="ins2-featured__grid">
              {featured.map((insight, i) => (
                <ArticleCard insight={insight} lead={i === 0} delay={i * 0.06} key={insight.slug} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Topic Filter + Article Grid */}
      <section className="ins2-all" aria-label="Tất cả bài viết">
        <div className="v2k-section__inner">
          <Reveal className="ins2-all__head">
            <p className="v2k-section-eyebrow">Tất cả</p>
            <h2 className="v2k-section-title">Bài viết</h2>
          </Reveal>

          <Reveal>
            <div className="v2k-filters" role="tablist" aria-label="Lọc theo chủ đề">
              {TOPIC_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  role="tab"
                  aria-selected={activeCategory === cat.key}
                  className={`v2k-filter-btn${activeCategory === cat.key ? ' is-active' : ''}`}
                  onClick={() => setActiveCategory(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="ins2-grid">
            {filtered.length === 0 ? (
              <Reveal className="ins2-empty">
                <p>Chưa có bài viết trong danh mục này.</p>
              </Reveal>
            ) : (
              filtered.map((insight, i) => (
                <ArticleCard insight={insight} delay={i * 0.05} key={insight.slug} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="v2k-cta">
        <div className="v2k-cta__panel">
          <Reveal>
            <p className="v2k-cta__eyebrow">
              <span className="v2k-cta__dot" aria-hidden="true" />
              ĐỒNG HÀNH &amp; PHÁT TRIỂN
            </p>
            <h2 className="v2k-cta__title">
              Bạn cần tư vấn giải pháp
              <br />
              dành riêng cho doanh nghiệp?
            </h2>
            <p className="v2k-cta__desc">
              Đội ngũ chuyên gia LETAN Media sẵn sàng trao đổi chi tiết về kiến trúc AI, chiến lược tăng trưởng và bảo vệ thương hiệu số.
            </p>
            <div className="v2k-cta__actions">
              <Link to="/contact" className="v2k-btn v2k-btn--primary">
                <span>Trao đổi với LETAN</span>
                <ArrowRight size={17} strokeWidth={1.8} />
              </Link>
              <Link to="/services" className="v2k-btn v2k-btn--secondary">
                <span>Khám phá dịch vụ</span>
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

export default InsightsPage;
