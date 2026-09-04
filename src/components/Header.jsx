import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="header-logo">LETAN Media</Link>
      <nav className="header-nav">
        <a href={location.pathname === '/' ? '#services' : '/#services'}>Dịch vụ</a>
        <a href={location.pathname === '/' ? '#portfolio' : '/#portfolio'}>Dự án</a>
        <a href={location.pathname === '/' ? '#about' : '/#about'}>Về chúng tôi</a>
        <Link to="/contact">Liên hệ</Link>
      </nav>
      <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>Tư vấn ngay</Link>
    </header>
  );
};

export default Header;
