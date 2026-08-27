import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, ShieldAlert, Play } from 'lucide-react';
import Reveal from './Reveal';

const PRODUCTS = [
  {
    icon: MessageSquare,
    name: 'Chatbot AI',
    tag: 'AI-Powered',
    desc: 'Trợ lý AI đa kênh tư vấn và chốt khách 24/7. Tích hợp Messenger, Telegram, Zalo và website — phản hồi tức thì, không cần nhân sự.',
    to: '/chatbot-ai',
    color: 'var(--color-ai)',
  },
  {
    icon: ShieldAlert,
    name: 'TikTok Report',
    tag: 'Protection',
    desc: 'Phát hiện, báo cáo và gỡ bỏ nội dung vi phạm, mạo danh, vu khống trên TikTok. Xử lý chuyên nghiệp, theo dõi tiến độ real-time.',
    to: '/tiktok-report',
    color: 'var(--color-digital)',
  },
  {
    icon: Play,
    name: 'YouTube Report',
    tag: 'Defense',
    desc: 'Bảo vệ kênh YouTube: báo cáo DMCA, kháng nghị gậy bản quyền, gỡ video reup và xử lý kênh mạo danh thương hiệu.',
    to: '/youtube-report',
    color: 'var(--color-primary)',
  },
];

const Products = () => (
  <section className="hm-section" id="products" aria-label="Sản phẩm AI by LETAN">
    <div className="hm-wrap">
      <Reveal>
        <span className="hm-eyebrow">Sản phẩm AI</span>
        <h2 className="hm-h2">AI-powered tools by LETAN</h2>
        <p className="hm-lead" style={{ marginBottom: '48px' }}>
          Không chỉ là dịch vụ agency — đây là sản phẩm AI vận hành tự động, giúp bạn giải quyết vấn đề ngay lập tức.
        </p>
      </Reveal>

      <div className="hm-products__grid">
        {PRODUCTS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal as={Link} to={p.to} key={p.name} className="hm-product" delay={i * 0.08}>
              <div className="hm-product__glow" aria-hidden="true" />
              <div className="hm-product__icon" style={{ background: `color-mix(in srgb, ${p.color} 12%, transparent)`, color: p.color }}>
                <Icon size={24} />
              </div>
              <span className="hm-product__tag" style={{ color: p.color }}>{p.tag}</span>
              <h3 className="hm-product__name">{p.name}</h3>
              <p className="hm-product__desc">{p.desc}</p>
              <span className="hm-link-arrow" style={{ marginTop: 'auto' }}>
                Truy cập <ArrowRight size={16} />
              </span>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default Products;
