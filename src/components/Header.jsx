import React, { useEffect, useRef, useState } from 'react';
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
  const menuButtonRef = useRef(null);
  const menuPanelRef = useRef(null);
  const closeButtonRef = useRef(null);

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
    const previouslyFocused = document.activeElement;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !menuPanelRef.current) {
        return;
      }

      const focusable = Array.from(
        menuPanelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      } else {
        menuButton?.focus();
      }
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
            aria-label="LETAN Media — Trang chủ"
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
                  aria-current={active ? 'page' : undefined}
                  onClick={(e) => handleNavClick(item, e)}
                >
                  <span>{item.index}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="lm-header__actions">
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
              ref={menuButtonRef}
              aria-label={
                mobileMenuOpen
                  ? 'Đóng menu'
                  : 'Mở menu'
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="lm-mobile-navigation"
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

      {mobileMenuOpen && (
        <div
          className="lm-mobile-menu lm-mobile-menu--open"
          id="lm-mobile-navigation"
        >
          <button
            type="button"
            className="lm-mobile-menu__backdrop"
            aria-label="Đóng menu"
            tabIndex={-1}
            onClick={closeMobileMenu}
          />

          <div
            className="lm-mobile-menu__panel"
            ref={menuPanelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lm-mobile-menu-title"
          >
          <div className="lm-mobile-menu__header">
            <div className="lm-mobile-menu__eyebrow" id="lm-mobile-menu-title">
              LETAN Media · Menu
            </div>
            <button
              type="button"
              className="lm-mobile-menu__close"
              ref={closeButtonRef}
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
                  aria-current={active ? 'page' : undefined}
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
                <span>Zalo</span>
              </a>
              <a href="https://t.me/Tanlemedia" target="_blank" rel="noopener noreferrer" className="lm-mobile-quick-card">
                <Send size={15} />
                <span>Telegram</span>
              </a>
            </div>
          </div>

          <div className="lm-mobile-menu__footer">
            <Link to="/contact" className="lm-btn lm-btn--primary lm-mobile-menu__cta" onClick={closeMobileMenu}>
              <span>Bắt đầu dự án ngay</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default Header;
