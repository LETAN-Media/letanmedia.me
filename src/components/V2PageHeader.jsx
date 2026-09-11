import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './V2PageHeader.css';

// Nav mirrors the homepage (V2) menu structure. "News" and "Blog" both
// point at the Insights hub until dedicated routes exist for each.
const NAV_ITEMS = [
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'News', to: '/insights' },
  { label: 'Blog', to: '/insights' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

/**
 * Lightweight header used by pages that need the V2 homepage's visual
 * identity (logo, nav, hamburger) without pulling in the Peach/WebGL
 * runtime or the older dark "redesign" Header.jsx used elsewhere.
 */
export default function V2PageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const raf = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

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
    const triggerButton = menuButtonRef.current;
    return () => {
      window.cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      triggerButton?.focus();
    };
  }, [menuOpen]);

  return (
    <header className="v2p-header">
      <div className="v2p-header__inner">
        <Link
          to="/"
          className="v2p-header__logo"
          aria-label="LETAN Media — Trang chủ"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/v2/images/logo1.svg?v=letan1"
            alt="LETAN Media"
            className="v2p-header__logo-img"
          />
        </Link>

        <nav className="v2p-header__nav" aria-label="Điều hướng chính">
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="v2p-header__burger"
          aria-label="Mở menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={20} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      {menuOpen && (
        <div className="v2p-header__overlay" role="dialog" aria-modal="true" aria-label="Menu điều hướng">
          <div className="v2p-header__overlay-inner" ref={panelRef}>
            <div className="v2p-header__overlay-top">
              <img
                src="/v2/images/logo1.svg?v=letan1"
                alt="LETAN Media"
                className="v2p-header__logo-img"
              />
              <button
                ref={closeButtonRef}
                type="button"
                className="v2p-header__close"
                aria-label="Đóng menu"
                onClick={() => setMenuOpen(false)}
              >
                <X size={22} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>

            <nav className="v2p-header__overlay-nav" aria-label="Điều hướng chính (mobile)">
              {NAV_ITEMS.map((item) => (
                <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
