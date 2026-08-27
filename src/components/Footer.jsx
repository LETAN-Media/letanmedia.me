import React from 'react';
import { Link } from 'react-router-dom';
import { FOOTER } from '../lib/ia';
import { MessageCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer-grid">
      {FOOTER.map((col) => (
        <div key={col.title} className={`footer-col ${col.brand ? 'footer-brand-col' : ''}`}>
          <h4>{col.title}</h4>
          {col.brand ? (
            <p className="footer-brand-desc">
              Giải pháp AI, truyền thông số và phát triển phần mềm dành cho cá nhân và doanh nghiệp.
            </p>
          ) : (
            <ul>
              {col.links.map((l, i) => (
                <li key={i}>
                  {l.to ? (
                    <Link to={l.to}>{l.label}</Link>
                  ) : (
                    <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{l.label}</a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>

    <div className="footer-bottom">
      <span>&copy; 2026 LETAN Media. All rights reserved.</span>
      <div className="footer-social">
        <a href="https://t.me/Tanlemedia" target="_blank" rel="noopener noreferrer">Telegram</a>
        <a href="https://letanmedia.me" target="_blank" rel="noopener noreferrer">Website</a>
        <a href="/chamsocpage/">Chăm sóc fanpage</a>
      </div>
      <div className="footer-legal">
        <Link to="/policy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/data-deletion">Data deletion</Link>
      </div>
    </div>

    <Link to="/chatbot-ai" className="floating-ai" title="LETAN AI Assistant" aria-label="LETAN AI Assistant">
      <MessageCircle />
    </Link>
  </footer>
);

export default Footer;
