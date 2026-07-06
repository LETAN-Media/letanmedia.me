import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TikTokIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 256 256"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M168.5 24c8.4 33.7 29.1 53.7 63.5 56.1v43.1c-19.9.6-38.2-4.9-55.2-15.8v65.7c0 49.1-32.2 80.9-79.8 78.6-36.7-1.8-68.7-30.1-73.1-66.8-5.2-43.6 28.9-80.6 71.1-80.6 5.5 0 10.8.6 16 1.9v44.6c-5-2.1-10.4-3.1-16-2.8-17.8.8-32.4 15.2-33.3 33-.9 19.7 14.8 36 34.3 36 18.9 0 34.2-15.3 34.2-34.2V24h38.3z" />
  </svg>
);

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
            <li>Telegram: <a href="https://t.me/Tanlemedia" target="_blank" rel="noreferrer">@Tanlemedia</a></li>
            <li>Email: <a href="mailto:support@letanmedia.site">support@letanmedia.site</a></li>
            <li>Website: <a href="https://letanmedia.site">letanmedia.site</a></li>
          </ul>
        </div>
        
        <div className="footer-link-group">
          <h4>Dịch vụ</h4>
          <ul>
            <li><a href="#">Report TikTok</a></li>
            <li><a href="#">Tích Xanh TikTok</a></li>
            <li><a href="#">Chatbot AI</a></li>
            <li><a href="#">Thiết Kế Website</a></li>
            <li><a href="#">Phần Mềm Theo Yêu Cầu</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div>&copy; {new Date().getFullYear()} LETAN Media. All rights reserved.</div>
        <div>
          <Link to="/policy" style={{ marginRight: '20px' }}>Chính sách bảo mật</Link>
          <a href="#">Điều khoản dịch vụ</a>
        </div>
      </div>
      
      <a href="/tiktok-report" className="floating-ai" title="LETAN AI Assistant">
        <TikTokIcon />
      </a>
    </footer>
  );
};

export default Footer;
