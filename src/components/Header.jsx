import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  {
    index: '01',
    label: 'Dịch vụ',
    href: '#services',
  },
  {
    index: '02',
    label: 'Dự án',
    href: '#portfolio',
  },
  {
    index: '03',
    label: 'Về chúng tôi',
    href: '#about',
  },
  {
    index: '04',
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
      setScrolled(window.scrollY > 24);
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
      if (event.key !== 'Escape') {
        return;
      }

      setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const resolveHash = (hash) => {
    if (location.pathname === '/') {
      return hash;
    }

    return `/${hash}`;
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
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
            <a href={resolveHash('#services')}>
              Dịch vụ
            </a>

            <a href={resolveHash('#portfolio')}>
              Dự án
            </a>

            <a href={resolveHash('#about')}>
              Về chúng tôi
            </a>

            <Link to="/contact">
              Liên hệ
            </Link>
          </nav>

          <div className="lm-header__actions">
            <Link
              to="/contact"
              className="lm-header__cta"
            >
              <span>Tư vấn ngay</span>
              <ArrowUpRight
                size={16}
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
                <X size={24} strokeWidth={1.8} />
              ) : (
                <Menu size={24} strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={[
          'lm-mobile-menu',
          mobileMenuOpen
            ? 'lm-mobile-menu--open'
            : '',
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
          <div className="lm-mobile-menu__eyebrow">
            Navigation
          </div>

          <nav
            className="lm-mobile-menu__nav"
            aria-label="Điều hướng mobile"
          >
            {NAV_ITEMS.map((item) => {
              const content = (
                <>
                  <span className="lm-mobile-menu__index">
                    {item.index}
                  </span>

                  <span className="lm-mobile-menu__label">
                    {item.label}
                  </span>

                  <ArrowUpRight
                    className="lm-mobile-menu__arrow"
                    size={22}
                    strokeWidth={1.5}
                  />
                </>
              );

              if (item.to) {
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="lm-mobile-menu__item"
                    onClick={closeMobileMenu}
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <a
                  key={item.label}
                  href={resolveHash(item.href)}
                  className="lm-mobile-menu__item"
                  onClick={closeMobileMenu}
                >
                  {content}
                </a>
              );
            })}
          </nav>

          <div className="lm-mobile-menu__footer">
            <span>AI</span>
            <span>Digital Growth</span>
            <span>Software</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
