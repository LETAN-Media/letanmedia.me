import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isTikTokActive = location.pathname.startsWith('/tiktok-report');
  const isYouTubeActive = location.pathname.startsWith('/youtube-report');

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="header-logo" onClick={() => setMobileMenuOpen(false)}>LETAN Media</Link>
      
      <nav className={`header-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <a 
          href={location.pathname === '/' ? '#services' : '/#services'} 
          onClick={() => setMobileMenuOpen(false)}
        >
          Dịch vụ
        </a>
        <Link 
          to="/tiktok-report/" 
          className={isTikTokActive ? 'active' : ''}
          onClick={() => setMobileMenuOpen(false)}
        >
          Report TikTok
        </Link>
        <Link 
          to="/youtube-report" 
          className={isYouTubeActive ? 'active' : ''}
          onClick={() => setMobileMenuOpen(false)}
        >
          Report YouTube
        </Link>
        <a 
          href={location.pathname === '/' ? '#portfolio' : '/#portfolio'} 
          onClick={() => setMobileMenuOpen(false)}
        >
          Dự án
        </a>
        <a 
          href={location.pathname === '/' ? '#about' : '/#about'} 
          onClick={() => setMobileMenuOpen(false)}
        >
          Về chúng tôi
        </a>
        <Link 
          to="/contact" 
          onClick={() => setMobileMenuOpen(false)}
        >
          Liên hệ
        </Link>

        <div className="header-mobile-cta">
          <Link 
            to="/contact" 
            className="btn-primary" 
            style={{ textDecoration: 'none' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Tư vấn ngay
          </Link>
        </div>
      </nav>

      <div className="header-actions">
        <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>
          Tư vấn ngay
        </Link>
        <button 
          type="button"
          className={`header-burger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

export default Header;
