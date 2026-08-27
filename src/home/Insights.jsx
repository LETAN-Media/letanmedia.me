import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import Reveal from './Reveal';
import { getPublishedInsights } from '../data/insights';

const Insights = () => {
  const insights = getPublishedInsights().slice(0, 3);

  return (
    <section className="hm-section hm-insights" id="insights" aria-label="Kiến thức & Insights">
      <div className="hm-wrap">
        <Reveal className="hm-work__head">
          <div>
            <span className="hm-eyebrow">Kiến thức</span>
            <h2 className="hm-h2">Insights & kiến thức chuyên sâu</h2>
            <p className="hm-lead" style={{ marginBottom: 0 }}>
              Những bài viết thực tế từ kinh nghiệm vận hành — không phải nội dung AI-generated tràn lan.
            </p>
          </div>
          <Link to="/insights" className="hm-link-arrow">
            Xem tất cả <ArrowUpRight size={16} />
          </Link>
        </Reveal>

        {insights.length > 0 ? (
          <div className="hm-insights-grid" style={{ marginTop: '40px' }}>
            {insights.map((insight, i) => (
              <Reveal key={insight.slug} delay={i * 0.06}>
                <Link to={`/insights/${insight.slug}`} className="hm-insight-card">
                  <div className="hm-insight-card__category">{insight.category}</div>
                  <h3 className="hm-insight-card__title">{insight.title}</h3>
                  <p className="hm-insight-card__desc">{insight.description}</p>
                  <div className="hm-insight-card__meta">
                    <span><Clock size={14} /> {new Date(insight.publishedAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span className="hm-link-arrow" style={{ fontSize: '0.9rem' }}>Đọc tiếp <ArrowUpRight size={14} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={0.15} className="hm-insights__panel" style={{ marginTop: '40px' }}>
            <h4>Đang chuẩn bị nội dung</h4>
            <p>
              LETAN đang tổng hợp những bài viết thực tế nhất từ các dự án đã triển khai.
              Mỗi bài viết đi kèm case study thật, data thật và lesson learned — không viết để SEO.
            </p>
            <div style={{ marginTop: '24px' }}>
              <Link to="/insights" className="hm-link-arrow">
                Theo dõi khi ra mắt <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default Insights;
