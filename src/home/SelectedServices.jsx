import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';

const SERVICES = [
  {
    idx: '01',
    name: 'SEO & GEO',
    desc: 'Tối ưu thứ hạng Google và hiện diện AI Search / GEO — đón đầu xu hướng tìm kiếm sinh tạo.',
    to: '/services/seo-geo',
  },
  {
    idx: '02',
    name: 'Paid Media',
    desc: 'Chiến dịch quảng cáo Facebook, Google, TikTok tối ưu ROI — data-driven, không đốt budget.',
    to: '/services/paid-ads',
  },
  {
    idx: '03',
    name: 'Social Growth',
    desc: 'Phát triển kênh TikTok, Facebook, YouTube — content strategy, tăng follow và engagement bền vững.',
    to: '/services/tiktok-growth',
  },
  {
    idx: '04',
    name: 'AI Chatbot',
    desc: 'Chatbot AI tư vấn & CSKH 24/7 đa kênh — Messenger, Telegram, Zalo, web widget.',
    to: '/chatbot-ai',
  },
  {
    idx: '05',
    name: 'Website Development',
    desc: 'Thiết kế & lập trình website, landing page, dashboard — tốc độ cao, chuẩn SEO, UI/UX premium.',
    to: '/services/website-development',
  },
  {
    idx: '06',
    name: 'Platform Protection',
    desc: 'Báo cáo vi phạm, xử lý khủng hoảng, gỡ nội dung mạo danh trên TikTok, YouTube, Facebook.',
    to: '/services/platform-protection',
  },
];

const SelectedServices = () => (
  <section className="hm-section" id="services" aria-label="Dịch vụ trọng tâm">
    <div className="hm-wrap">
      <Reveal>
        <span className="hm-eyebrow">Dịch vụ</span>
        <h2 className="hm-h2">Dịch vụ trọng tâm</h2>
        <p className="hm-lead" style={{ marginBottom: '48px' }}>
          Chọn lọc những dịch vụ quan trọng nhất — nơi LETAN tạo ra kết quả rõ ràng nhất cho khách hàng.
        </p>
      </Reveal>

      <div className="hm-services__grid">
        {SERVICES.map((s, i) => (
          <Reveal as={Link} to={s.to} key={s.name} className="hm-service" delay={i * 0.06}>
            <span className="hm-service__idx">{s.idx}</span>
            <h3 className="hm-service__name">{s.name}</h3>
            <p className="hm-service__desc">{s.desc}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="hm-services__cta">
        <Link to="/services" className="hm-link-arrow">
          Xem tất cả dịch vụ <ArrowUpRight size={16} />
        </Link>
      </Reveal>
    </div>
  </section>
);

export default SelectedServices;
