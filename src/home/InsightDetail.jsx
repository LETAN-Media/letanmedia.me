import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, Clock, User } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from './Reveal';
import { getInsightBySlug, getRelatedInsights, getPublishedInsights } from '../data/insights';
import { track, ANALYTICS_EVENTS } from '../lib/analytics';
import './home.css';

const InsightDetail = () => {
  const { slug } = useParams();
  const insight = getInsightBySlug(slug);

  useEffect(() => {
    if (insight) track(ANALYTICS_EVENTS.VIEW_INSIGHT, { insight_slug: slug, source_page: `/insights/${slug}` });
  }, [slug, insight]);

  if (!insight) {
    return <Navigate to="/insights" replace />;
  }

  const relatedInsights = getRelatedInsights(slug, 2);
  const allInsights = getPublishedInsights();
  const currentIndex = allInsights.findIndex((i) => i.slug === slug);
  const nextInsight = allInsights[(currentIndex + 1) % allInsights.length];

  // Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: insight.title,
    description: insight.description,
    author: { '@type': 'Organization', name: insight.author },
    publisher: {
      '@type': 'Organization',
      name: 'LETAN Media',
      url: 'https://letanmedia.me',
    },
    datePublished: insight.publishedAt,
    dateModified: insight.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://letanmedia.me${insight.seo.path}`,
    },
    image: insight.heroImage || undefined,
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://letanmedia.me/' },
      { '@type': 'ListItem', position: 2, name: 'Kiến thức', item: 'https://letanmedia.me/insights' },
      { '@type': 'ListItem', position: 3, name: insight.title },
    ],
  };

  return (
    <>
      <Seo
        title={insight.seo.title}
        description={insight.seo.description}
        path={insight.seo.path}
        image={insight.heroImage}
        type="article"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav className="hm-wrap" aria-label="Breadcrumb" style={{ paddingTop: '120px', paddingBottom: '0' }}>
        <Reveal>
          <div className="hm-breadcrumb">
            <Link to="/insights" className="hm-breadcrumb-link">
              <ArrowLeft size={14} /> Kiến thức
            </Link>
            <span className="hm-breadcrumb-sep" aria-hidden="true">/</span>
            <span className="hm-breadcrumb-current">{insight.title}</span>
          </div>
        </Reveal>
      </nav>

      {/* Article Header */}
      <section className="hm-section hm-section--tight" style={{ paddingTop: '40px' }}>
        <div className="hm-wrap">
          <div className="hm-article-header">
            <Reveal>
              <span className="hm-eyebrow">{insight.category}</span>
              <h1 className="hm-h2" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '20px' }}>
                {insight.title}
              </h1>
              <p className="hm-lead" style={{ maxWidth: '720px' }}>{insight.description}</p>
            </Reveal>
            <Reveal delay={0.1} className="hm-article-meta">
              <span><User size={15} /> {insight.author}</span>
              <span><Clock size={15} /> {formatDate(insight.publishedAt)}</span>
              {insight.updatedAt !== insight.publishedAt && (
                <span>Cập nhật: {formatDate(insight.updatedAt)}</span>
              )}
            </Reveal>
          </div>

          {/* Hero image */}
          {insight.heroImage && (
            <Reveal delay={0.15} style={{ marginTop: '40px' }}>
              <img
                src={insight.heroImage}
                alt={insight.title}
                loading="eager"
                width="1200"
                height="675"
                style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', display: 'block', border: 'var(--border-subtle)' }}
              />
            </Reveal>
          )}
        </div>
      </section>

      {/* Article Body */}
      <section className="hm-section hm-section--tight">
        <div className="hm-wrap">
          <article className="hm-article-body">
            {insight.content.map((block, i) => (
              <ContentBlock key={i} block={block} />
            ))}
          </article>
        </div>
      </section>

      {/* Related Services */}
      {insight.relatedServices && insight.relatedServices.length > 0 && (
        <section className="hm-section hm-section--tight" style={{ background: 'var(--color-surface-1)', borderTop: 'var(--border-subtle)' }}>
          <div className="hm-wrap">
            <Reveal>
              <h2 className="hm-h3" style={{ marginBottom: '24px' }}>Dịch vụ liên quan</h2>
            </Reveal>
            <div className="hm-case-related">
              {insight.relatedServices.map((route) => (
                <Reveal key={route}>
                  <Link to={route} className="hm-case-related-link">
                    {formatServiceLabel(route)} <ArrowUpRight size={14} />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Insights */}
      {relatedInsights.length > 0 && (
        <section className="hm-section hm-section--tight">
          <div className="hm-wrap">
            <Reveal>
              <h2 className="hm-h3" style={{ marginBottom: '28px' }}>Bài viết liên quan</h2>
            </Reveal>
            <div className="hm-insights-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
              {relatedInsights.map((ri, i) => (
                <Reveal key={ri.slug} delay={i * 0.06}>
                  <Link to={`/insights/${ri.slug}`} className="hm-insight-card">
                    <div className="hm-insight-card__category">{ri.category}</div>
                    <h3 className="hm-insight-card__title">{ri.title}</h3>
                    <p className="hm-insight-card__desc">{ri.description}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next Article + CTA */}
      <section className="hm-section hm-final" aria-label="Bài tiếp theo">
        <div className="hm-final__bg" aria-hidden="true" />
        <div className="hm-wrap hm-final__inner">
          {nextInsight && nextInsight.slug !== insight.slug && (
            <Reveal>
              <p className="hm-muted" style={{ marginBottom: '12px', textAlign: 'center' }}>Bài tiếp theo</p>
              <Link to={`/insights/${nextInsight.slug}`} className="hm-case-next-link">
                {nextInsight.title} <ArrowUpRight size={18} />
              </Link>
            </Reveal>
          )}
          <Reveal delay={0.1} className="hm-final__actions" style={{ marginTop: '40px' }}>
            <Link to="/insights" className="ui-btn ui-btn--secondary ui-btn--lg">
              <ArrowLeft size={16} /> Xem tất cả bài viết
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

/** Render content block */
function ContentBlock({ block }) {
  switch (block.type) {
    case 'heading':
      return <h2 className="hm-article-h2">{block.text}</h2>;
    case 'paragraph':
      return <p className="hm-article-p">{block.text}</p>;
    case 'list':
      return (
        <ul className="hm-article-list">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatServiceLabel(route) {
  const map = {
    '/services/seo-geo': 'SEO & GEO',
    '/services/social-media': 'Social Media',
    '/services/paid-ads': 'Paid Ads',
    '/services/tiktok-growth': 'TikTok Growth',
    '/services/platform-protection': 'Platform Protection',
    '/services/chatbot-ai': 'Chatbot AI',
    '/services/website-development': 'Website Development',
    '/chatbot-ai': 'Chatbot AI',
    '/tiktok-report': 'TikTok Report',
    '/youtube-report': 'YouTube Report',
  };
  return map[route] || route.split('/').filter(Boolean).pop();
}

export default InsightDetail;
