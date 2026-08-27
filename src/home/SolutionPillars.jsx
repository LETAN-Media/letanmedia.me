import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Bot, Code2, ShieldCheck, Lock } from 'lucide-react';
import Reveal from './Reveal';

const PILLARS = [
  {
    num: '01',
    title: 'Digital Growth',
    en: 'Search, Social & Paid',
    problem: 'Thiếu hệ thống tăng trưởng đo lường được trên tìm kiếm và mạng xã hội.',
    outcome: 'Lưu lượng chất lượng và chuyển đổi tăng trưởng bền vững qua SEO, GEO, Social & Ads.',
    to: '/solutions/digital-growth',
    icon: TrendingUp,
  },
  {
    num: '02',
    title: 'AI Automation',
    en: 'Workflow & Agent',
    problem: 'Quy trình lặp lại tốn nhân sự và dễ sai sót.',
    outcome: 'Tự động hóa bằng AI Agent & workflow, vận hành 24/7 không gián đoạn.',
    to: '/solutions/ai-automation',
    icon: Bot,
  },
  {
    num: '03',
    title: 'Web & Software',
    en: 'Build & Platform',
    problem: 'Không có nền tảng riêng để thu hút và vận hành khách hàng.',
    outcome: 'Website, Mini App và phần mềm theo yêu cầu — tốc độ và bảo mật chuẩn sản xuất.',
    to: '/solutions/web-software',
    icon: Code2,
  },
  {
    num: '04',
    title: 'Brand & Trust',
    en: 'PR & Reputation',
    problem: 'Uy tín thương hiệu dễ tổn thương trước tin giả và khủng hoảng.',
    outcome: 'Xây dựng vị thế và phủ sóng truyền thông, bảo vệ danh tiếng chủ động.',
    to: '/solutions/brand-trust',
    icon: ShieldCheck,
  },
  {
    num: '05',
    title: 'Platform Protection',
    en: 'Report & Defense',
    problem: 'Kênh bị mạo danh, bản quyền vi phạm và nội dung phá hoại.',
    outcome: 'Phát hiện, báo cáo và gỡ bỏ vi phạm trên TikTok, YouTube, Facebook.',
    to: '/solutions/platform-protection',
    icon: Lock,
  },
];

const SolutionPillars = () => (
  <section className="hm-section" id="solutions" aria-label="Giải pháp LETAN">
    <div className="hm-wrap">
      <Reveal className="hm-section-header" style={{ marginBottom: '40px', maxWidth: '760px' }}>
        <span className="hm-eyebrow">Giải pháp</span>
        <h2 className="hm-h2">Năm trụ cột để thương hiệu tăng tốc</h2>
        <p className="hm-lead">
          Mỗi giải pháp bắt đầu từ bài toán kinh doanh, không từ công cụ. Chúng tôi kết hợp
          chiến lược, AI và vận hành để tạo kết quả đo lường được.
        </p>
      </Reveal>

      <div className="hm-pillars">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal as="article" key={p.num} className="hm-pillar" delay={i * 0.05}>
              <div className="hm-pillar__num">{p.num}</div>
              <div className="hm-pillar__title">
                <Icon size={20} style={{ verticalAlign: '-3px', marginRight: 10, color: 'var(--color-primary)' }} />
                {p.title}
                <small>{p.en}</small>
              </div>
              <div className="hm-pillar__body">
                <div className="hm-pillar__row">
                  <span className="hm-pillar__k">Vấn đề</span>
                  <span className="hm-pillar__v">{p.problem}</span>
                </div>
                <div className="hm-pillar__row">
                  <span className="hm-pillar__k">Kết quả</span>
                  <span className="hm-pillar__v">{p.outcome}</span>
                </div>
              </div>
              <Link to={p.to} className="hm-link-arrow hm-pillar__cta">
                Tìm hiểu <ArrowRight size={16} />
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default SolutionPillars;
