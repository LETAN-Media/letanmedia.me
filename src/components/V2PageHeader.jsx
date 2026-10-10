import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './V2PageHeader.css';

const NAV_ITEMS = [
  {
    label: 'Service',
    to: '/services',
    children: [
      ['Dịch vụ', '/services'],
      ['Chatbot AI', '/chatbot-ai'],
      ['TikTok Protection', '/tiktok-report'],
      ['YouTube Protection', '/youtube-report'],
    ],
  },
  {
    label: 'Resources',
    to: '/insights',
    children: [
      ['Insights', '/insights'],
      ['Website Gallery', '/websitegallery/'],
      ['App Gallery', '/appgallery/'],
    ],
  },
  {
    label: 'Discover',
    to: '/work',
    children: [
      ['Dự án', '/work'],
      ['Giới thiệu', '/about'],
      ['Liên hệ', '/contact'],
    ],
  },
  { label: 'Contact', to: '/contact' },
];

const ACTION_ITEMS = [
  ['Login', 'https://builder.peachworlds.com/'],
  ['Book a Call', 'https://calendly.com/peachweb/30min'],
  ['Get Started', 'https://builder.peachworlds.com/peachmagic'],
];

function ChevronIcon() {
  return (
    <svg className="v2p-header__chevron" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 4.25 6 8l4-3.75" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 8h14M5 16h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function V2PageHeader() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = 'hidden';

    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll('a[href], button:not([disabled])')
      );
      if (focusable.length === 0) return;

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
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus();
      } else {
        menuButton?.focus();
      }
    };
  }, [menuOpen]);

  return (
    <header className="v2p-header">
      <div className="v2p-header__bar">
        <Link className="v2p-header__brand" to="/" aria-label="LETAN Media — Trang chủ">
          <img
            src="https://image.letanmedia.me/homepage/brand/logo-hero-v1.svg"
            alt="LETAN Media"
          />
        </Link>
        <img
          className="v2p-header__mobile-logo-preload"
          src="https://image.letanmedia.me/homepage/brand/logo-dark-v2.svg"
          alt=""
          aria-hidden="true"
        />

        <nav className="v2p-header__nav-pill" aria-label="Điều hướng chính">
          {NAV_ITEMS.map((item) => (
            <div className="v2p-header__nav-item" key={item.label}>
              <Link className="v2p-header__nav-link" to={item.to}>
                <span>{item.label}</span>
                {item.children ? <ChevronIcon /> : null}
              </Link>
              {item.children ? (
                <div className="v2p-header__dropdown">
                  {item.children.map(([label, to]) => (
                    <Link key={label} to={to}>{label}</Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="v2p-header__actions">
          {ACTION_ITEMS.map(([label, href], index) => (
            <a
              key={label}
              className={`v2p-header__action ${index === 1 ? 'v2p-header__action--outline' : ''} ${index === 2 ? 'v2p-header__action--primary' : ''}`}
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              {label}
            </a>
          ))}
        </div>

        <button
          ref={menuButtonRef}
          className="v2p-header__menu-button"
          type="button"
          aria-label="Mở menu"
          aria-expanded={menuOpen}
          aria-controls="v2p-mobile-navigation"
          onClick={() => setMenuOpen(true)}
        >
          <MenuIcon />
        </button>
      </div>

      {menuOpen ? (
        <div
          ref={panelRef}
          className="v2p-header__mobile-panel"
          id="v2p-mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Menu điều hướng"
        >
          <div className="v2p-header__mobile-top">
            <Link to="/" aria-label="LETAN Media — Trang chủ" onClick={() => setMenuOpen(false)}>
              <img
                className="v2p-header__mobile-logo"
                src="https://image.letanmedia.me/homepage/brand/logo-dark-v2.svg"
                alt="LETAN Media"
              />
            </Link>
            <button
              ref={closeButtonRef}
              className="v2p-header__menu-button"
              type="button"
              aria-label="Đóng menu"
              onClick={() => setMenuOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="v2p-header__mobile-nav" aria-label="Điều hướng mobile">
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)}>
                <span>{item.label}</span>
                <ArrowIcon />
              </Link>
            ))}
          </nav>

          <div className="v2p-header__mobile-actions">
            {ACTION_ITEMS.slice(1).map(([label, href], index) => (
              <a
                key={label}
                className={`v2p-header__action ${index === 0 ? 'v2p-header__action--outline' : 'v2p-header__action--primary'}`}
                href={href}
                target="_blank"
                rel="noreferrer"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
