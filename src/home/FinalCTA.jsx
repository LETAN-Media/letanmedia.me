import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';
import Reveal from './Reveal';

const FinalCTA = () => (
  <section className="hm-section hm-final" id="cta" aria-label="Liên hệ LETAN">
    <div className="hm-final__bg" aria-hidden="true" />
    <div className="hm-wrap hm-final__inner">
      <Reveal>
        <h2 className="hm-final__title">
          Bạn đang cần tăng trưởng, tự động hóa hay xử lý một vấn đề khó trên nền tảng số?
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="hm-final__actions">
        <Link to="/contact" className="ui-btn ui-btn--primary ui-btn--lg">
          Trao đổi với LETAN
        </Link>
        <a href="https://zalo.me/0765178999" target="_blank" rel="noopener noreferrer" className="ui-btn ui-btn--secondary ui-btn--lg">
          Nhắn Zalo
        </a>
      </Reveal>

      <Reveal delay={0.2} className="hm-final__contacts">
        <a href="tel:0765178999">
          <Phone size={16} /> 0765 178 999
        </a>
        <a href="https://t.me/Tanlemedia" target="_blank" rel="noopener noreferrer">
          <MessageCircle size={16} /> Telegram @Tanlemedia
        </a>
        <a href="mailto:infor@letanmedia.me">
          infor@letanmedia.me
        </a>
      </Reveal>
    </div>
  </section>
);

export default FinalCTA;
