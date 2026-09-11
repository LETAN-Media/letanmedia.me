import React from 'react';
import { Link } from 'react-router-dom';
import './V2PageFooter.css';

const MENU_LINKS = [
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'News', to: '/insights' },
  { label: 'Blog', to: '/insights' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const LEGAL_LINKS = [
  { label: 'Privacy', to: '/policy' },
  { label: 'Terms', to: '/terms' },
];

/**
 * Footer used by pages that need the V2 homepage's visual identity.
 * Static/React-only — no Peach runtime, no WebGL.
 */
export default function V2PageFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="v2p-footer">
      <div className="v2p-footer__inner">
        <div className="v2p-footer__brand">
          <Link to="/" className="v2p-footer__logo">LETAN Media</Link>
          <p className="v2p-footer__tagline">
            Giải pháp AI, truyền thông số và phát triển phần mềm cho cá nhân &amp; doanh nghiệp.
          </p>
          <ul className="v2p-footer__contact">
            <li><a href="tel:0765178999">Hotline/Zalo: 0765 178 999</a></li>
            <li><a href="mailto:infor@letanmedia.me">infor@letanmedia.me</a></li>
            <li><a href="https://t.me/Tanlemedia" target="_blank" rel="noopener noreferrer">Telegram: @Tanlemedia</a></li>
          </ul>
        </div>

        <div className="v2p-footer__col">
          <h3>Menu</h3>
          <ul>
            {MENU_LINKS.map((item) => (
              <li key={item.label}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="v2p-footer__col">
          <h3>Legal</h3>
          <ul>
            {LEGAL_LINKS.map((item) => (
              <li key={item.label}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="v2p-footer__bottom">
        <span>© {year} LETAN Media. All rights reserved.</span>
      </div>
    </footer>
  );
}
