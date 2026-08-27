import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { getPublishedCases } from '../data/caseStudies';

/** Category → gradient for cards. */
function getGradient(category) {
  const map = {
    'AI Automation': { c1: 'rgba(47,212,167,0.9)', c2: 'rgba(13,18,32,0.7)' },
    'Platform Protection': { c1: 'rgba(79,124,255,0.9)', c2: 'rgba(19,25,39,0.7)' },
    'Web & Software': { c1: 'rgba(38,217,242,0.85)', c2: 'rgba(13,18,32,0.7)' },
    'Digital Growth': { c1: 'rgba(79,124,255,0.85)', c2: 'rgba(19,25,39,0.7)' },
  };
  return map[category] || { c1: 'rgba(79,124,255,0.85)', c2: 'rgba(19,25,39,0.7)' };
}

const FeaturedWork = () => (
  <section className="hm-section" id="work" aria-label="Dự án tiêu biểu">
    <div className="hm-wrap">
      <Reveal className="hm-work__head">
        <div>
          <span className="hm-eyebrow">Dự án tiêu biểu</span>
          <h2 className="hm-h2">Những gì chúng tôi thực sự xây dựng</h2>
        </div>
        <Link to="/work" className="hm-link-arrow">
          Xem tất cả dự án <ArrowUpRight size={16} />
        </Link>
      </Reveal>

      <div className="hm-work__grid">
        {getPublishedCases().map((cs, i) => {
          const g = getGradient(cs.category);
          return (
            <Reveal
              as={Link}
              to={`/work/${cs.slug}`}
              key={cs.slug}
              className={`hm-work__card${i === 0 ? ' is-wide' : ''}`}
              delay={i * 0.05}
              style={{ '--c1': g.c1, '--c2': g.c2 }}
            >
              <span className="hm-work__arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
              <span className="hm-work__cat">{cs.category}</span>
              <h3 className="hm-work__title">{cs.title}</h3>
              <p className="hm-work__desc">{cs.summary}</p>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default FeaturedWork;
