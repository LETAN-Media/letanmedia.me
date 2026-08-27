import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV } from '../lib/ia';
import { track, ANALYTICS_EVENTS } from '../lib/analytics';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // desktop mega index
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState({}); // mobile accordion
  const location = useLocation();
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileExpanded({});
  }, [location.pathname]);

  // Scroll lock + ESC for mobile drawer
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
      window.addEventListener('keydown', onKey);
      return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
    }
    document.body.style.overflow = '';
  }, [mobileOpen]);

  const onCta = () => track(ANALYTICS_EVENTS.CLICK_PRIMARY_CTA, { source: 'header' });

  return (
    <header ref={headerRef} className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="site-header-inner">
        <Link to="/" className="site-logo" aria-label="LETAN Media home">LETAN Media</Link>

        {/* Desktop nav */}
        <nav className="site-nav" aria-label="Main">
          {NAV.map((item, i) => (
            item.children ? (
              <div
                key={item.label}
                className={`nav-item ${openMenu === i ? 'open' : ''}`}
                onMouseEnter={() => setOpenMenu(i)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  className="nav-trigger"
                  aria-expanded={openMenu === i}
                  aria-haspopup="true"
                  onClick={() => setOpenMenu(openMenu === i ? null : i)}
                >
                  {item.label}
                  <span className="nav-caret" aria-hidden="true">▾</span>
                </button>
                <div className="mega-panel" role="menu">
                  <div className="mega-grid">
                    {item.children.map((c) => (
                      <Link key={c.to} to={c.to} className="mega-link" role="menuitem">
                        <span className="mega-link-title">{c.label}</span>
                        {c.desc && <span className="mega-link-desc">{c.desc}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className={`nav-link ${item.cta ? 'nav-cta' : ''}`}
                onClick={item.cta ? onCta : undefined}
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="nav-burger"
          aria-label="Mở menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <div className="mobile-drawer-overlay" onClick={() => setMobileOpen(false)} />
          <div className="mobile-drawer-panel">
            <nav className="mobile-nav" aria-label="Mobile">
              {NAV.map((item) => (
                item.children ? (
                  <div key={item.label} className="mobile-group">
                    <button
                      className="mobile-group-trigger"
                      aria-expanded={!!mobileExpanded[item.label]}
                      onClick={() => setMobileExpanded((s) => ({ ...s, [item.label]: !s[item.label] }))}
                    >
                      {item.label}
                      <span className={`nav-caret ${mobileExpanded[item.label] ? 'up' : ''}`} aria-hidden="true">▾</span>
                    </button>
                    {mobileExpanded[item.label] && (
                      <div className="mobile-sub">
                        {item.children.map((c) => (
                          <Link key={c.to} to={c.to} className="mobile-sub-link">{c.label}</Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={`mobile-link ${item.cta ? 'mobile-cta' : ''}`}
                    onClick={item.cta ? onCta : undefined}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
