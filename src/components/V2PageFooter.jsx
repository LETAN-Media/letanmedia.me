import React from 'react';
import { Link } from 'react-router-dom';
import './V2PageFooter.css';

const FOOTER_COLUMNS = [
  {
    title: 'PRODUCT',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Services', to: '/services' },
    ],
  },
  {
    title: 'RESOURCES',
    links: [
      { label: 'Work', to: '/work' },
      { label: 'Website Gallery', to: '/websitegallery/' },
      { label: 'App Gallery', to: '/appgallery/' },
      { label: 'Insights', to: '/insights' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Privacy Policy', to: '/policy' },
      { label: 'Terms', to: '/terms' },
    ],
  },
  {
    title: 'CONTACT',
    links: [
      { label: 'Email', href: 'mailto:infor@letanmedia.me' },
      { label: '0765 178 999', href: 'tel:0765178999' },
      { label: 'Telegram', href: 'https://t.me/Tanlemedia', external: true },
    ],
  },
];

const SOCIAL_ICONS = [
  ['Discord', '/v2/images/ico-discord.svg'],
  ['YouTube', '/v2/images/ico-yt.svg'],
  ['X', '/v2/images/ico-x.svg'],
  ['LinkedIn', '/v2/images/ico-linked.svg'],
  ['Instagram', '/v2/images/ico-insta.svg'],
];

function FooterLink({ item }) {
  if (item.href) {
    return (
      <a
        href={item.href}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noopener noreferrer' : undefined}
      >
        {item.label}
      </a>
    );
  }

  return <Link to={item.to}>{item.label}</Link>;
}

/**
 * Shared footer for inner pages. Its structure and proportions mirror the
 * static V2 homepage footer without importing or modifying the Peach runtime.
 */
export default function V2PageFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="v2p-footer" aria-labelledby="v2p-footer-title">
      <div className="v2p-footer__cta">
        <Link className="v2p-footer__logo" to="/" aria-label="LETAN Media — Home">
          <img
            src="https://image.letanmedia.me/homepage/brand/logo1-v2.svg"
            alt="LETAN Media"
          />
        </Link>

        <p id="v2p-footer-title">
          Start building <em>magic</em> today.
        </p>

        <div className="v2p-footer__actions">
          <Link className="v2p-footer__button v2p-footer__button--outline" to="/contact">
            Book a Call
          </Link>
          <Link className="v2p-footer__button v2p-footer__button--light" to="/contact">
            Get Started
          </Link>
        </div>
      </div>

      <div className="v2p-footer__lower">
        <nav className="v2p-footer__links" aria-label="Footer navigation">
          {FOOTER_COLUMNS.map((column) => (
            <div className="v2p-footer__column" key={column.title}>
              <h2>{column.title}</h2>
              {column.links.map((item) => (
                <FooterLink item={item} key={`${column.title}-${item.label}`} />
              ))}
            </div>
          ))}
        </nav>

        <div className="v2p-footer__socials" aria-label="Social media channels">
          {SOCIAL_ICONS.map(([label, src]) => (
            <span className="v2p-footer__social" title={label} key={label}>
              <img src={src} alt="" aria-hidden="true" loading="lazy" />
            </span>
          ))}
        </div>

        <p className="v2p-footer__copyright">LETAN Media © {year}</p>
        <img
          className="v2p-footer__gradient"
          src="/v2/images/gradient.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      </div>
    </footer>
  );
}
