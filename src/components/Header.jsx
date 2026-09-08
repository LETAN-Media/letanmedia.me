import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, MessageCircle, Phone, Send, X } from 'lucide-react';

const NAV_ITEMS = [
  {
    index: '01',
    label: 'Dịch vụ',
    to: '/services',
    hash: 'services',
  },
  {
    index: '02',
    label: 'Dự án',
    to: '/work',
    hash: 'portfolio',
  },
  {
    index: '03',
    label: 'Về LETAN',
    to: '/about',
    hash: 'about',
  },
  {
    index: '04',
    label: 'Kiến thức',
    to: '/insights',
  },
  {
    index: '05',
    label: 'Liên hệ',
    to: '/contact',
  },
];

const Header = () => {
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => {
      setScrolled(window.scrollY > 20);
    };

    updateHeader();

    window.addEventListener('scroll', updateHeader, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', updateHeader);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (item, event) => {
    if (location.pathname === '/' && item.hash) {
      const el = document.getElementById(item.hash);
      if (el) {
        event.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isNavActive = (item) => {
    if (item.to === '/services' && location.pathname.startsWith('/services')) return true;
    if (item.to === '/work' && location.pathname.startsWith('/work')) return true;
    if (item.to === '/about' && location.pathname === '/about') return true;
    if (item.to === '/insights' && location.pathname.startsWith('/insights')) return true;
    if (item.to === '/contact' && location.pathname === '/contact') return true;
    return false;
  };

  return (
    <>
      <header
        className={[
          'lm-header',
          scrolled ? 'lm-header--scrolled' : '',
          mobileMenuOpen ? 'lm-header--menu-open' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="lm-header__inner">
          <Link
            to="/"
            className="lm-header__logo"
            aria-label="LETAN Media"
            onClick={closeMobileMenu}
          >
            LETAN <span>Media</span>
          </Link>

          <nav
            className="lm-header__nav"
            aria-label="Điều hướng chính"
          >
            {NAV_ITEMS.map((item) => {
              const active = isNavActive(item);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={active ? 'is-active' : ''}
                  onClick={(e) => handleNavClick(item, e)}
                >
                  <span>{item.index}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="lm-header__actions">
            <div className="lm-header__status" aria-label="Hệ thống AI đang hoạt động">
              <span className="lm-header__status-dot" />
              <span>AI Ready 24/7</span>
            </div>

            <Link
              to="/contact"
              className="lm-header__cta"
            >
              <span>Tư vấn ngay</span>
              <ArrowUpRight
                size={15}
                strokeWidth={1.8}
              />
            </Link>

            <button
              type="button"
              className="lm-header__burger"
              aria-label={
                mobileMenuOpen
                  ? 'Đóng menu'
                  : 'Mở menu'
              }
              aria-expanded={mobileMenuOpen}
              onClick={() => {
                setMobileMenuOpen((current) => !current);
              }}
            >
              {mobileMenuOpen ? (
                <X size={22} strokeWidth={1.8} />
              ) : (
                <Menu size={22} strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={[
          'lm-mobile-menu',
          mobileMenuOpen ? 'lm-mobile-menu--open' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden={!mobileMenuOpen}
      >
        <button
          type="button"
          className="lm-mobile-menu__backdrop"
          aria-label="Đóng menu"
          tabIndex={mobileMenuOpen ? 0 : -1}
          onClick={closeMobileMenu}
        />

        <div className="lm-mobile-menu__panel">
          <div className="lm-mobile-menu__header">
            <div className="lm-mobile-menu__eyebrow">
              LETAN Media · Menu
            </div>
            <button
              type="button"
              className="lm-mobile-menu__close"
              onClick={closeMobileMenu}
              aria-label="Đóng menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav
            className="lm-mobile-menu__nav"
            aria-label="Điều hướng mobile"
          >
            {NAV_ITEMS.map((item) => {
              const active = isNavActive(item);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`lm-mobile-menu__item ${active ? 'is-active' : ''}`}
                  onClick={(e) => handleNavClick(item, e)}
                >
                  <span className="lm-mobile-menu__index">
                    {item.index}
                  </span>
                  <span className="lm-mobile-menu__label">
                    {item.label}
                  </span>
                  <ArrowUpRight
                    className="lm-mobile-menu__arrow"
                    size={18}
                    strokeWidth={1.5}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="lm-mobile-menu__quick-contacts">
            <div className="lm-mobile-menu__quick-title">Kênh hỗ trợ trực tiếp</div>
            <div className="lm-mobile-menu__quick-grid">
              <a href="tel:0765178999" className="lm-mobile-quick-card">
                <Phone size={15} />
                <span>0765 178 999</span>
              </a>
              <a href="https://zalo.me/0765178999" target="_blank" rel="noopener noreferrer" className="lm-mobile-quick-card">
                <MessageCircle size={15} />
                <span>Zalo 24/7</span>
              </a>
              <a href="https://t.me/Tanlemedia" target="_blank" rel="noopener noreferrer" className="lm-mobile-quick-card">
                <Send size={15} />
                <span>Telegram</span>
              </a>
            </div>
          </div>

          <div className="lm-mobile-menu__footer">
            <Link to="/contact" className="lm-btn lm-btn--primary" onClick={closeMobileMenu} style={{ width: '100%', justifyContent: 'center' }}>
              <span>Bắt đầu dự án ngay</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
