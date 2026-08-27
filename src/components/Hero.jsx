import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import HeroBase from './hero/HeroBase';
import { track, ANALYTICS_EVENTS } from '../lib/analytics';

const Hero3D = lazy(() => import('./Hero3D'));

const Hero = () => {
  const visual = (
    <Suspense fallback={<div style={{ position: 'absolute', inset: 0 }} />}>
      <div className="hm-hero__bg" aria-hidden="true">
        <Hero3D />
        <div className="hm-hero__grid-overlay" />
        <div className="hm-hero__scroll">
          Scroll
          <span />
        </div>
      </div>
    </Suspense>
  );

  const actions = (
    <>
      <Link
        to="/contact"
        className="ui-btn ui-btn--primary ui-btn--lg"
        onClick={() => track(ANALYTICS_EVENTS.CLICK_PRIMARY_CTA)}
      >
        Nhận tư vấn chiến lược
      </Link>
      <Link to="/work" className="ui-btn ui-btn--secondary ui-btn--lg">
        Xem dự án
      </Link>
    </>
  );

  return (
    <HeroBase
      className="hm-hero"
      contentClassName="hm-hero__content"
      titleClassName="hm-hero__title"
      subtitleClassName="hm-hero__sub"
      actionsClassName="hm-hero__actions"
      visual={visual}
      badge={<span className="ui-badge ui-badge--digital">AI-first Digital Agency</span>}
      title={(
        <>
          AI + Digital Growth<br />
          cho thương hiệu<br />
          <span className="accent">muốn đi nhanh hơn</span>
        </>
      )}
      subtitle="LETAN kết hợp chiến lược Digital, AI và công nghệ để xây dựng hệ thống tăng trưởng, tự động hóa và bảo vệ thương hiệu."
      actions={actions}
    />
  );
};

export default Hero;
