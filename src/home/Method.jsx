import React from 'react';
import Reveal from './Reveal';

const STEPS = [
  {
    num: '01',
    title: 'Chiến lược',
    en: 'Strategy',
    desc: 'Phân tích bài toán, thị trường và đối thủ. Xác định kênh,metrics và lộ trình tăng trưởng phù hợp — không copy-paste plan.',
  },
  {
    num: '02',
    title: 'Xây dựng',
    en: 'Build',
    desc: 'Triển khai hệ thống: website, chatbot AI, workflow tự động hóa, content pipeline hoặc chiến dịch ads — всё theo plan战略.',
  },
  {
    num: '03',
    title: 'Tăng trưởng',
    en: 'Growth',
    desc: 'Vận hành, tối ưu và scale: SEO, GEO, social growth, paid media — kết hợp AI để phản ứng nhanh và giảm chi phí nhân sự.',
  },
  {
    num: '04',
    title: 'Tối ưu',
    en: 'Optimize',
    desc: 'Đo lường, phân tích data và cải tiến liên tục. AI agent giám sát 24/7, phát hiện vấn đề trước khi khách hàng nhận ra.',
  },
];

const Method = () => (
  <section className="hm-section hm-method" id="method" aria-label="Phương pháp LETAN">
    <div className="hm-wrap">
      <Reveal>
        <span className="hm-eyebrow">Phương pháp</span>
        <h2 className="hm-h2">LETAN Method</h2>
        <p className="hm-lead" style={{ marginBottom: '56px' }}>
          Cách chúng tôi biến chiến lược thành kết quả — bốn giai đoạn rõ ràng, mỗi bước có owner và KPI riêng.
        </p>
      </Reveal>

      <div className="hm-method__steps">
        {STEPS.map((s, i) => (
          <Reveal as="article" key={s.num} className="hm-step" delay={i * 0.08}>
            {i < STEPS.length - 1 && <div className="hm-step__line" aria-hidden="true" />}
            <div className="hm-step__num">{s.num}</div>
            <h3 className="hm-step__title">{s.title} <small style={{ color: 'var(--color-muted)', fontSize: '0.8rem', fontWeight: 400, marginLeft: 8 }}>{s.en}</small></h3>
            <p className="hm-step__desc">{s.desc}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Method;
