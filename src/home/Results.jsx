import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import Reveal from './Reveal';

const METRICS = [
  { value: 24, suffix: '/7', label: 'AI vận hành', note: 'Chatbot AI tư vấn & CSKH tự động' },
  { value: 6, suffix: '', label: 'Nền tảng số', note: 'TikTok · YouTube · Facebook · Web · App · Zalo' },
  { value: 5, suffix: '', label: 'Giải pháp cốt lõi', note: 'Digital · AI · Web · Trust · Protection' },
  { value: 1, suffix: '', label: 'Đội ngũ tập trung', note: 'AI-first, không nhân sự thừa' },
];

function useCountUp(target, duration = 1800, active = false) {
  const [val, setVal] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, active]);

  return val;
}

function MetricItem({ item, index, active }) {
  const count = useCountUp(item.value, 1800, active);
  return (
    <Reveal as="div" className="hm-metric" delay={index * 0.08}>
      <div className="hm-metric__value">
        {count.toLocaleString('vi-VN')}
        {item.suffix && <span className="accent">{item.suffix}</span>}
      </div>
      <div className="hm-metric__label">{item.label}</div>
      {item.note && <span className="hm-metric__note">{item.note}</span>}
    </Reveal>
  );
}

const Results = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) { setInView(true); return; }
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section className="hm-section hm-results" id="results" ref={sectionRef} aria-label="Kết quả & năng lực">
      <div className="hm-wrap">
        <Reveal>
          <span className="hm-eyebrow">Kết quả & năng lực</span>
          <h2 className="hm-h2">Chúng tôi làm được gì</h2>
          <p className="hm-lead" style={{ marginBottom: '48px' }}>
            Con số phản ánh năng lực thực tế — không phải KPI营销.
          </p>
        </Reveal>

        <div className="hm-metrics">
          {METRICS.map((m, i) => (
            <MetricItem key={m.label} item={m} index={i} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
