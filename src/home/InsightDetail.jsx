import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Seo from '../components/Seo';
import V2PageHeader from '../components/V2PageHeader';
import V2PageFooter from '../components/V2PageFooter';
import Reveal from './Reveal';
import { getInsightBySlug, getRelatedInsights, getPublishedInsights } from '../data/insights';
import { track, ANALYTICS_EVENTS } from '../lib/analytics';
import '../components/V2PageKit.css';
import './InsightDetailV2.css';

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
  const currentIndex = allInsights.findIndex((item) => item.slug === slug);
  const nextInsight = allInsights[(currentIndex + 1) % allInsights.length];
  const articleBlocks = insight.content.map((block, index) => ({
    ...block,
    id: block.type === 'heading' ? `article-section-${index}` : undefined,
  }));
  const tableOfContents = articleBlocks.filter((block) => block.type === 'heading');
  const readingMinutes = getReadingMinutes(insight.content);

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
    <div className="v2k insd">
      <Seo
        title={insight.seo.title}
        description={insight.seo.description}
        path={insight.seo.path}
        image={insight.heroImage}
        type="article"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <V2PageHeader overlay inverse />

      <header className="insd-hero">
        <div className="insd-shell">
          <Reveal>
            <nav className="insd-breadcrumb" aria-label="Breadcrumb">
              <Link to="/insights">Insights</Link>
              <span aria-hidden="true">/</span>
              <span>{insight.category}</span>
            </nav>
          </Reveal>

          <div className="insd-hero__grid">
            <Reveal>
              <p className="insd-eyebrow">{insight.category}</p>
              <h1 className="insd-title">{insight.title}</h1>
              <p className="insd-deck">{insight.description}</p>
            </Reveal>

            <Reveal delay={0.08} className="insd-meta" aria-label="Thông tin bài viết">
              <div>
                <span>Tác giả</span>
                <strong>{insight.author}</strong>
              </div>
              <div>
                <span>Xuất bản</span>
                <strong>{formatDate(insight.publishedAt)}</strong>
              </div>
              {insight.updatedAt !== insight.publishedAt && (
                <div>
                  <span>Cập nhật</span>
                  <strong>{formatDate(insight.updatedAt)}</strong>
                </div>
              )}
              <div>
                <span>Thời gian đọc</span>
                <strong>{readingMinutes} phút</strong>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {insight.heroImage && (
        <section className="insd-visual" aria-label="Hình ảnh bài viết">
          <div className="insd-shell">
            <Reveal>
              <figure className="insd-figure">
                <img
                  src={insight.heroImage}
                  alt={insight.title}
                  loading="eager"
                  width="1200"
                  height="675"
                />
                <figcaption>
                  <span>LETAN Media Insights</span>
                  <span>{insight.category}</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>
      )}

      <section className="insd-reading">
        <div className="insd-reading__inner">
          {tableOfContents.length > 0 && (
            <aside className="insd-toc" aria-label="Mục lục bài viết">
              <p className="insd-toc__label">Trong bài viết</p>
              <ol>
                {tableOfContents.map((block, index) => (
                  <li key={block.id}>
                    <a href={`#${block.id}`}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {block.text}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          )}

          <article className="insd-article">
            {articleBlocks.map((block, index) => (
              <ContentBlock key={`${block.type}-${index}`} block={block} lead={index === 0} />
            ))}
          </article>
        </div>
      </section>

      {insight.relatedServices?.length > 0 && (
        <section className="insd-services" aria-labelledby="insd-services-title">
          <div className="insd-shell insd-services__inner">
            <Reveal>
              <p className="insd-section-label">Dịch vụ liên quan</p>
              <h2 id="insd-services-title">Từ kiến thức đến triển khai thực tế.</h2>
            </Reveal>
            <div className="insd-service-links">
              {insight.relatedServices.map((route, index) => (
                <Reveal key={route} delay={index * 0.05}>
                  <Link to={route}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{formatServiceLabel(route)}</strong>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedInsights.length > 0 && (
        <section className="insd-related" aria-labelledby="insd-related-title">
          <div className="insd-shell">
            <Reveal className="insd-related__head">
              <p className="insd-section-label">Đọc tiếp</p>
              <h2 id="insd-related-title">Bài viết liên quan</h2>
            </Reveal>
            <div className="insd-related__grid">
              {relatedInsights.map((related, index) => (
                <Reveal key={related.slug} delay={index * 0.06}>
                  <Link to={`/insights/${related.slug}`} className="insd-related-card">
                    <span className="insd-related-card__category">{related.category}</span>
                    <h3>{related.title}</h3>
                    <p>{related.description}</p>
                    <span className="insd-related-card__cta">Đọc bài viết</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {nextInsight && nextInsight.slug !== insight.slug && (
        <section className="insd-next" aria-label="Bài tiếp theo">
          <div className="insd-shell">
            <Reveal>
              <p className="insd-section-label">Bài tiếp theo</p>
              <Link to={`/insights/${nextInsight.slug}`}>{nextInsight.title}</Link>
            </Reveal>
          </div>
        </section>
      )}

      <section className="v2k-cta insd-cta" aria-label="Trao đổi cùng LETAN">
        <div className="v2k-cta__panel">
          <Reveal>
            <p className="v2k-cta__eyebrow">TƯ VẤN &amp; TRIỂN KHAI</p>
            <h2 className="v2k-cta__title">Bạn có câu hỏi về nội dung này hoặc cần triển khai cho doanh nghiệp?</h2>
            <p className="v2k-cta__desc">
              Đội ngũ LETAN Media sẵn sàng trao đổi và đề xuất kế hoạch triển khai phù hợp với dự án của bạn.
            </p>
            <div className="v2k-cta__actions">
              <Link to="/contact" className="v2k-btn v2k-btn--primary">Trao đổi với LETAN</Link>
              <Link to="/insights" className="v2k-btn v2k-btn--secondary">Xem tất cả bài viết</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <V2PageFooter />
    </div>
  );
};

function ContentBlock({ block, lead }) {
  switch (block.type) {
    case 'heading':
      return <h2 id={block.id} className="insd-article__heading">{block.text}</h2>;
    case 'paragraph':
      return <p className={`insd-article__paragraph${lead ? ' is-lead' : ''}`}>{block.text}</p>;
    case 'list':
      return (
        <ul className="insd-article__list">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      );
    default:
      return null;
  }
}

function getReadingMinutes(content) {
  const words = content
    .flatMap((block) => block.items || block.text || '')
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
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
    '/chatbot-ai': 'Chatbot AI Platform',
    '/tiktok-report': 'TikTok Report',
    '/youtube-report': 'YouTube Report',
  };
  return map[route] || route.split('/').filter(Boolean).pop();
}

export default InsightDetail;
