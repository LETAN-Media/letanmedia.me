import React from 'react';
import Reveal from './Reveal';

const PLATFORMS = [
  { name: 'TikTok', note: 'Growth & Protection' },
  { name: 'YouTube', note: 'Channel Defense' },
  { name: 'Facebook', note: 'Page & Trust' },
  { name: 'Web & App', note: 'Build & Software' },
];

const TrustBar = () => (
  <section className="hm-trust" aria-label="Nền tảng và đối tác">
    <div className="hm-wrap hm-trust__inner">
      <Reveal as="span" className="hm-trust__label">
        Vận hành trên các nền tảng số hàng đầu
      </Reveal>
      <div className="hm-trust__logos">
        {PLATFORMS.map((p, i) => (
          <Reveal as="span" key={p.name} delay={i * 0.06} className="hm-trust__item">
            <span className="hm-trust__dot" aria-hidden="true" />
            {p.name}
            <span className="hm-trust__sep" aria-hidden="true">·</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)', fontWeight: 400 }}>{p.note}</span>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;
