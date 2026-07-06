import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-logo">LETAN Media</div>
      <nav className="header-nav">
        <a href="#services">Dịch vụ</a>
        <a href="#knowledge">Kiến thức</a>
        <a href="#contact">Liên hệ</a>
      </nav>
      <button className="btn-primary">Tư vấn ngay</button>
    </header>
  );
};

export default Header;
