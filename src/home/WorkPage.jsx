import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Seo from '../components/Seo';
import V2PageHeader from '../components/V2PageHeader';
import V2PageFooter from '../components/V2PageFooter';
import Reveal from './Reveal';
import { getFeaturedCases, getCasesByTag, FILTER_TAGS } from '../data/caseStudies';
import { track, ANALYTICS_EVENTS } from '../lib/analytics';
import './WorkPageV2.css';

const CAPABILITIES = [
  { label: 'AI Automation', desc: 'Chatbot AI, workflow tự động, LLM agent.' },
  { label: 'Digital Growth', desc: 'SEO, GEO, Social Media, Paid Ads.' },
  { label: 'Web & Software', desc: 'Website, Mini App, dashboard, tool nội bộ.' },
  { label: 'Platform Protection', desc: 'Report TikTok, YouTube, Facebook.' },
];

const formatNumber = (n) => String(n).padStart(2, '0');

const ProjectCard = ({ cs, lead = false, delay = 0 }) => (
  <Reveal as={Link} to={`/work/${cs.slug}`} className={`wp2-card${lead ? ' wp2-card--lead' : ''}`} delay={delay}>
    <div className="wp2-card__media">
      {cs.images?.hero && (
        <img src={cs.images.hero} alt={cs.title} loading="lazy" />
      )}
    </div>
    <div className="wp2-card__body">
      <span className="wp2-card__cat">{cs.category}</span>
      <h3 className="wp2-card__title">{cs.title}</h3>
      <p className="wp2-card__summary">{cs.summary}</p>
      <span className="wp2-card__cta">
        Xem dự án
        <span className="wp2-arrow" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={2} /></span>
      </span>
    </div>
  </Reveal>
);

const WorkPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const featured = getFeaturedCases();
  const filtered = getCasesByTag(activeFilter);

  useEffect(() => {
    track(ANALYTICS_EVENTS.VIEW_WORK, { source_page: '/work' });
  }, []);

  return (
    <div className="wp2">
      <Seo
        title="Dự án — Selected Work | LETAN Media"
        description="Những hệ thống, chiến dịch và sản phẩm số được LETAN xây dựng để giải quyết bài toán tăng trưởng thực tế."
        path="/work"
      />

      <V2PageHeader />

      {/* Hero */}
      <section className="wp2-hero">
        <div className="wp2-hero__inner">
          <Reveal>
            <p className="wp2-hero__eyebrow">SELECTED WORK · LETAN MEDIA</p>
            <h1 className="wp2-hero__title">
              DỰ ÁN
              <br />
              THỰC CHIẾN
            </h1>
            <p className="wp2-hero__kicker">Selected projects &amp; digital systems</p>
            <p className="wp2-hero__subtitle">
              Những sản phẩm số, hệ thống AI và giải pháp bảo vệ nền tảng được LETAN Media trực tiếp xây dựng và triển khai.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured Projects — editorial, one lead + smaller siblings */}
      {featured.length > 0 && (
        <section className="wp2-featured" aria-label="Dự án nổi bật">
          <div className="wp2-featured__inner">
            <Reveal>
              <p className="wp2-section-eyebrow">Nổi bật</p>
            </Reveal>
            <div className="wp2-featured__grid">
              {featured.map((cs, i) => (
                <ProjectCard cs={cs} lead={i === 0} delay={i * 0.06} key={cs.slug} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio — compact grid, all published projects, filterable */}
      <section className="wp2-portfolio" id="all-work" aria-label="Tất cả dự án">
        <div className="wp2-portfolio__inner">
          <Reveal className="wp2-portfolio__head">
            <p className="wp2-section-eyebrow">Tất cả dự án</p>
            <h2 className="wp2-section-title">Portfolio</h2>
          </Reveal>

          <Reveal>
            <div className="wp2-filters" role="tablist" aria-label="Lọc dự án">
              {FILTER_TAGS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={activeFilter === t.key}
                  className={`wp2-filter-btn${activeFilter === t.key ? ' is-active' : ''}`}
                  onClick={() => setActiveFilter(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="wp2-grid">
            {filtered.length === 0 ? (
              <Reveal className="wp2-empty">
                <p>Chưa có dự án trong danh mục này.</p>
              </Reveal>
            ) : (
              filtered.map((cs, i) => (
                <ProjectCard cs={cs} delay={i * 0.05} key={cs.slug} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="wp2-capabilities" aria-label="Năng lực">
        <div className="wp2-capabilities__inner">
          <Reveal>
            <p className="wp2-section-eyebrow">Năng lực</p>
            <h2 className="wp2-section-title">Chúng tôi làm được gì</h2>
          </Reveal>
          <div className="wp2-cap-grid">
            {CAPABILITIES.map((cap, i) => (
              <Reveal key={cap.label} className="wp2-cap-card" delay={i * 0.06}>
                <span className="wp2-cap-card__num">{formatNumber(i + 1)}</span>
                <h3 className="wp2-cap-card__title">{cap.label}</h3>
                <p className="wp2-cap-card__desc">{cap.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="wp2-cta" aria-label="Khởi động dự án">
        <div className="wp2-cta__panel">
          <Reveal>
            <p className="wp2-cta__eyebrow">
              <span className="wp2-cta__dot" aria-hidden="true" />
              KHỞI ĐỘNG DỰ ÁN
            </p>
            <h2 className="wp2-cta__title">
              Bạn có bài toán kinh doanh
              <br />
              cần hiện thực hóa bằng công nghệ?
            </h2>
            <p className="wp2-cta__desc">
              Từ việc xây dựng hệ thống web, tích hợp AI tự động hóa đến bảo vệ kênh thương hiệu — chúng tôi sẵn sàng đồng hành cùng bạn.
            </p>
            <div className="wp2-cta__actions">
              <Link to="/contact" className="wp2-btn wp2-btn--primary">
                <span>Trao đổi về dự án</span>
                <ArrowRight size={17} strokeWidth={1.8} />
              </Link>
              <Link to="/services" className="wp2-btn wp2-btn--secondary">
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

export default WorkPage;
