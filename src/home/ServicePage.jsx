import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from './Reveal';
import { getServiceBySlug } from '../data/services';
import { getPublishedCases } from '../data/caseStudies';
import { track, ANALYTICS_EVENTS } from '../lib/analytics';
import './home.css';

const ServicePage = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  useEffect(() => {
    if (service) {
      track(ANALYTICS_EVENTS.VIEW_SERVICE, { service_slug: service.slug, source_page: '/services' });
    }
  }, [service]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const relatedCases = getPublishedCases().filter(
    (cs) => service.relatedCases.includes(cs.slug)
  );

  const trackCta = (location) => {
    track(ANALYTICS_EVENTS.CLICK_PRIMARY_CTA, {
      service_slug: service.slug,
      source_page: `/services/${service.slug}`,
      cta_location: location,
    });
  };

  const trackContact = (type, location) => {
    const eventMap = {
      zalo: ANALYTICS_EVENTS.CLICK_ZALO,
      phone: ANALYTICS_EVENTS.CLICK_PHONE,
      telegram: ANALYTICS_EVENTS.CLICK_TELEGRAM,
    };
    track(eventMap[type] || ANALYTICS_EVENTS.CLICK_PRIMARY_CTA, {
      service_slug: service.slug,
      source_page: `/services/${service.slug}`,
      cta_location: location,
    });
  };

  // FAQPage schema
  const faqSchema = service.faq && service.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  } : null;

  // BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://letanmedia.me/' },
      { '@type': 'ListItem', position: 2, name: 'Dịch vụ', item: 'https://letanmedia.me/services' },
      { '@type': 'ListItem', position: 3, name: service.shortTitle },
    ],
  };

  return (
    <>
      <Seo
        title={service.seo.title}
        description={service.seo.description}
        path={service.seo.path}
      />

      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav className="hm-wrap" aria-label="Breadcrumb" style={{ paddingTop: '120px', paddingBottom: '0' }}>
        <Reveal>
          <div className="hm-breadcrumb">
            <Link to="/services" className="hm-breadcrumb-link">
              <ArrowLeft size={14} /> Dịch vụ
            </Link>
            <span className="hm-breadcrumb-sep" aria-hidden="true">/</span>
            <span className="hm-breadcrumb-current">{service.shortTitle}</span>
          </div>
        </Reveal>
      </nav>

      {/* Hero */}
      <section className="hm-section hm-section--tight" style={{ paddingTop: '40px' }}>
        <div className="hm-wrap">
          <Reveal>
            <span className="hm-eyebrow">{service.eyebrow}</span>
            <h1 className="hm-h2" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', marginBottom: '24px' }}>
              {service.title}
            </h1>
            <p className="hm-lead" style={{ maxWidth: '720px' }}>{service.description}</p>
          </Reveal>
          <Reveal delay={0.12} style={{ marginTop: '36px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              className="ui-btn ui-btn--primary ui-btn--lg"
              onClick={() => trackCta('hero')}
            >
              {service.primaryCTA}
            </Link>
            {service.secondaryCTA && relatedCases.length > 0 && (
              <Link to={`/work/${relatedCases[0].slug}`} className="ui-btn ui-btn--secondary ui-btn--lg">
                {service.secondaryCTA}
              </Link>
            )}
          </Reveal>
        </div>
      </section>

      {/* Problem */}
      {service.problem && (
        <section className="hm-section hm-section--tight" style={{ background: 'var(--color-surface-1)', borderTop: 'var(--border-subtle)', borderBottom: 'var(--border-subtle)' }}>
          <div className="hm-wrap">
            <div className="hm-case-content-grid">
              <Reveal>
                <span className="hm-case-section-num">01</span>
                <h2 className="hm-h3">Bài toán</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="hm-case-body">{service.problem}</p>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Outcomes */}
      {service.outcomes && service.outcomes.length > 0 && (
        <section className="hm-section hm-section--tight">
          <div className="hm-wrap">
            <Reveal>
              <span className="hm-eyebrow">Kết quả mong đợi</span>
              <h2 className="hm-h3" style={{ marginBottom: '32px' }}>Outcome cho khách hàng</h2>
            </Reveal>
            <div className="hm-service-outcomes">
              {service.outcomes.map((o, i) => (
                <Reveal key={i} className="hm-service-outcome" delay={i * 0.06}>
                  <Check size={20} style={{ color: 'var(--color-ai)', flexShrink: 0, marginTop: 2 }} />
                  <span>{o}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Capabilities */}
      {service.capabilities && service.capabilities.length > 0 && (
        <section className="hm-section hm-section--tight" style={{ background: 'var(--color-surface-1)', borderTop: 'var(--border-subtle)', borderBottom: 'var(--border-subtle)' }}>
          <div className="hm-wrap">
            <Reveal>
              <span className="hm-eyebrow">Năng lực</span>
              <h2 className="hm-h3" style={{ marginBottom: '32px' }}>Chúng tôi làm gì</h2>
            </Reveal>
            <div className="hm-service-capabilities">
              {service.capabilities.map((cap, i) => (
                <Reveal key={i} className="hm-service-cap" delay={i * 0.04}>
                  {cap}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {service.process && service.process.length > 0 && (
        <section className="hm-section hm-section--tight">
          <div className="hm-wrap">
            <Reveal>
              <span className="hm-eyebrow">Quy trình</span>
              <h2 className="hm-h3" style={{ marginBottom: '36px' }}>Cách chúng tôi triển khai</h2>
            </Reveal>
            <div className="hm-service-process">
              {service.process.map((p, i) => (
                <Reveal key={i} className="hm-service-step" delay={i * 0.08}>
                  <div className="hm-service-step__num">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="hm-service-step__title">{p.step}</h3>
                  <p className="hm-service-step__desc">{p.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Work */}
      {relatedCases.length > 0 && (
        <section className="hm-section hm-section--tight" style={{ background: 'var(--color-surface-1)', borderTop: 'var(--border-subtle)' }}>
          <div className="hm-wrap">
            <Reveal className="hm-work__head">
              <div>
                <span className="hm-eyebrow">Dự án liên quan</span>
                <h2 className="hm-h3">Case study</h2>
              </div>
            </Reveal>
            <div className="hm-work__grid" style={{ marginTop: '24px' }}>
              {relatedCases.map((cs, i) => (
                <Reveal
                  as={Link}
                  to={`/work/${cs.slug}`}
                  key={cs.slug}
                  className="hm-work__card"
                  delay={i * 0.06}
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

      {/* Related Solutions */}
      {service.relatedSolutions && service.relatedSolutions.length > 0 && (
        <section className="hm-section hm-section--tight">
          <div className="hm-wrap">
            <Reveal>
              <h2 className="hm-h3" style={{ marginBottom: '24px' }}>Giải pháp liên quan</h2>
            </Reveal>
            <div className="hm-case-related">
              {service.relatedSolutions.map((route) => (
                <Reveal key={route}>
                  <Link to={route} className="hm-case-related-link">
                    {formatSolutionLabel(route)} <ArrowUpRight size={14} />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {service.faq && service.faq.length > 0 && (
        <section className="hm-section hm-section--tight" style={{ background: 'var(--color-surface-1)', borderTop: 'var(--border-subtle)', borderBottom: 'var(--border-subtle)' }}>
          <div className="hm-wrap">
            <Reveal>
              <span className="hm-eyebrow">FAQ</span>
              <h2 className="hm-h3" style={{ marginBottom: '36px' }}>Câu hỏi thường gặp</h2>
            </Reveal>
            <div className="hm-service-faq" role="list">
              {service.faq.map((item, i) => (
                <FaqItem key={i} question={item.q} answer={item.a} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final Climax CTA */}
      <section className="lm-final-cta" aria-label="Liên hệ LETAN">
        <div className="hm-wrap">
          <div className="lm-final-cta__panel">
            <div className="lm-final-cta__content">
              <div className="lm-final-cta__eyebrow">
                <span className="lm-final-cta__eyebrow-dot" />
                KHỞI ĐẦU DỰ ÁN CÙNG LETAN
              </div>
              <h2>
                Bạn cần {service.shortTitle.toLowerCase()}
                <br />
                <span>cho doanh nghiệp của mình?</span>
              </h2>
              <p>
                Đội ngũ kỹ thuật và chuyên gia của LETAN Media sẽ phản hồi, rà soát hiện trạng và đề xuất giải pháp tối ưu trong vòng 24 giờ.
              </p>
              <div className="lm-final-cta__actions">
                <Link
                  to="/contact"
                  className="lm-btn lm-btn--primary"
                  onClick={() => trackCta('final')}
                >
                  <span>{service.primaryCTA}</span>
                  <ArrowRight size={17} strokeWidth={1.8} />
                </Link>
                <a
                  href="https://zalo.me/0765178999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lm-btn lm-btn--secondary"
                  onClick={() => trackContact('zalo', 'final')}
                >
                  <span>Nhắn Zalo trực tiếp</span>
                  <ArrowUpRight size={17} strokeWidth={1.8} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

/** FAQ accordion item with accessible markup. */
function FaqItem({ question, answer, index }) {
  const [open, setOpen] = React.useState(false);
  const panelId = `faq-panel-${index}`;
  const triggerId = `faq-trigger-${index}`;

  return (
    <div className="hm-faq-item" role="listitem">
      <button
        id={triggerId}
        className="hm-faq-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
      >
        <span>{question}</span>
        <span className={`hm-faq-icon ${open ? 'open' : ''}`} aria-hidden="true">+</span>
      </button>
      {open && (
        <div id={panelId} role="region" aria-labelledby={triggerId} className="hm-faq-panel">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

function formatSolutionLabel(route) {
  const map = {
    '/solutions/digital-growth': 'Digital Growth',
    '/solutions/ai-automation': 'AI Automation',
    '/solutions/web-software': 'Web & Software',
    '/solutions/brand-trust': 'Brand & Trust',
    '/solutions/platform-protection': 'Platform Protection',
  };
  return map[route] || route.split('/').filter(Boolean).pop();
}

export default ServicePage;
