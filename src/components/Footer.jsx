import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          LETAN Media
        </div>
        
        <div className="footer-link-group">
          <h4>Thông tin liên hệ</h4>
          <ul>
            <li>Hotline: <a href="tel:0765178999">0765 178 999</a></li>
            <li>Telegram: <a href="https://t.me/Tanlemedia" target="_blank" rel="noopener noreferrer">@Tanlemedia</a></li>
            <li>Email: <a href="mailto:infor@letanmedia.me">infor@letanmedia.me</a></li>
            <li>Website: <a href="https://letanmedia.me">letanmedia.me</a></li>
          </ul>
        </div>
        
        <div className="footer-link-group">
          <h4>Dịch vụ</h4>
          <ul>
            <li><Link to="/tiktok-report/">Report TikTok</Link></li>
            <li><Link to="/youtube-report">Report YouTube</Link></li>
            <li><a href="/#services">Tích Xanh TikTok</a></li>
            <li><Link to="/chatbot-ai">Chatbot AI</Link></li>
            <li><a href="/#services">Thiết Kế Website</a></li>
            <li><a href="/#services">Phần Mềm Theo Yêu Cầu</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom-single-line">
        <span>&copy; 2026 LETAN Media.</span>
        <Link to="/policy">Privacy policy</Link>
        <Link to="/terms">Terms of service</Link>
        <Link to="/data-deletion">Data deletion</Link>
      </div>
      
      <Link to="/chatbot-ai" className="floating-ai" title="LETAN AI Assistant" aria-label="LETAN AI Assistant">
        <MessageCircle />
      </Link>
    </footer>
  );
};

export default Footer;
