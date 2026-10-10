const LOGO_URL = 'https://image.letanmedia.me/homepage/brand/logo-hero-v1.svg';
const MOBILE_LOGO_URL = 'https://image.letanmedia.me/homepage/brand/logo-dark-v2.svg';

const NAV_ITEMS = [
  {
    label: 'Service',
    href: '/services',
    children: [
      ['Dịch vụ', '/services'],
      ['Chatbot AI', '/chatbot-ai'],
      ['TikTok Protection', '/tiktok-report'],
      ['YouTube Protection', '/youtube-report'],
    ],
  },
  {
    label: 'Resources',
    href: '/insights',
    children: [
      ['Insights', '/insights'],
      ['Website Gallery', '/websitegallery/'],
      ['App Gallery', '/appgallery/'],
    ],
  },
  {
    label: 'Discover',
    href: '/work',
    children: [
      ['Dự án', '/work'],
      ['Giới thiệu', '/about'],
      ['Liên hệ', '/contact'],
    ],
  },
  { label: 'Contact', href: '/contact' },
];

const ACTION_ITEMS = [
  ['Login', 'https://builder.peachworlds.com/'],
  ['Book a Call', 'https://calendly.com/peachweb/30min'],
  ['Get Started', 'https://builder.peachworlds.com/peachmagic'],
];

const styles = `
  @font-face {
    font-family: "Letan Haas";
    src: url("https://files.peachworlds.com/website/67ceb542-3b40-4b6f-a780-2744b8cef469/neuehaasdisplayroman.ttf");
    font-display: swap;
  }

  :host {
    --header-ink: #20174e;
    --header-panel: #ffffff;
    --header-panel-muted: #f2f1f5;
    --header-line: rgba(32, 23, 78, 0.14);
    --header-height: 91px;
    position: fixed;
    inset: 0 0 auto;
    z-index: 1000000000;
    display: block;
    height: var(--header-height);
    pointer-events: none;
    font-family: "Letan Haas", Arial, sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; }
  a { color: inherit; text-decoration: none; }
  button, a { font: inherit; }

  .bar {
    width: 100%;
    min-height: var(--header-height);
    padding: 16px 24px 0;
    display: grid;
    grid-template-columns: minmax(240px, 1fr) minmax(400px, auto) minmax(320px, 1fr);
    align-items: start;
    pointer-events: none;
  }

  :host(:not([home])) .bar {
    padding-bottom: 16px;
    background: rgba(255, 255, 255, 0.88);
    border-bottom: 1px solid rgba(32, 23, 78, 0.08);
    backdrop-filter: blur(18px);
  }

  .brand,
  .nav-pill,
  .actions,
  .menu-button { pointer-events: auto; }

  .brand {
    width: max-content;
    height: 48px;
    display: inline-flex;
    align-items: center;
    line-height: 0;
  }

  .brand img {
    width: auto;
    height: 48px;
    display: block;
  }

  .nav-pill {
    position: relative;
    width: 411px;
    min-width: 0;
    height: 50px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
  }

  :host(:not([home])) .nav-pill { background: rgba(32, 23, 78, 0.08); }

  .nav-item {
    position: relative;
    height: 50px;
    display: flex;
    align-items: center;
  }

  .nav-link {
    height: 50px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: var(--header-ink);
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    white-space: nowrap;
    transition: opacity 160ms ease;
  }

  .nav-link:hover,
  .nav-link:focus-visible { opacity: 0.55; }

  .chevron {
    width: 11px;
    height: 11px;
    transition: transform 160ms ease;
  }

  .nav-item:hover .chevron,
  .nav-item:focus-within .chevron { transform: rotate(180deg); }

  .dropdown {
    position: absolute;
    top: 58px;
    left: 50%;
    width: 250px;
    padding: 12px;
    display: grid;
    gap: 2px;
    border: 1px solid rgba(32, 23, 78, 0.06);
    border-radius: 20px;
    background: var(--header-panel);
    box-shadow: 0 18px 48px rgba(17, 10, 52, 0.12);
    opacity: 0;
    visibility: hidden;
    transform: translate(-50%, -8px);
    transition: opacity 160ms ease, transform 160ms ease, visibility 160ms ease;
  }

  .nav-item:hover .dropdown,
  .nav-item:focus-within .dropdown {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0);
  }

  .dropdown a {
    min-height: 42px;
    padding: 9px 12px;
    display: flex;
    align-items: center;
    border-radius: 12px;
    color: var(--header-ink);
    font-size: 16px;
    line-height: 20px;
  }

  .dropdown a:hover,
  .dropdown a:focus-visible { background: var(--header-panel-muted); }

  .actions {
    justify-self: end;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
  }

  .action {
    height: 50px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    border-radius: 16px;
    color: var(--header-ink);
    font-size: 18px;
    white-space: nowrap;
    transition: opacity 160ms ease, background-color 160ms ease;
  }

  .action:hover,
  .action:focus-visible { opacity: 0.68; }
  .action--outline {
    padding: 0 12px;
    border-color: var(--header-ink);
  }
  .action--primary {
    padding: 0 12px;
    color: #ffffff;
    background: var(--header-ink);
  }

  .menu-button {
    display: none;
    width: 40px;
    height: 40px;
    padding: 0;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 12px;
    color: #ffffff;
    background: var(--header-ink);
    cursor: pointer;
  }

  .menu-button svg { width: 22px; height: 22px; }

  .mobile-panel {
    position: fixed;
    inset: 0;
    z-index: 2;
    padding: 16px 24px 28px;
    display: flex;
    flex-direction: column;
    color: var(--header-ink);
    background: #e7e7ea;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 180ms ease, visibility 180ms ease;
  }

  .mobile-panel[data-open="true"] {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .mobile-top {
    min-height: 40px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .mobile-logo { width: auto; height: 38px; display: block; }

  .mobile-nav {
    margin-top: 38px;
    display: grid;
  }

  .mobile-nav a {
    min-height: 59px;
    padding: 14px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(32, 23, 78, 0.12);
    font-size: 28px;
    line-height: 31px;
  }

  .mobile-nav svg { width: 21px; height: 21px; }

  .mobile-actions {
    margin-top: auto;
    padding-top: 28px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .mobile-actions .action:first-child { display: none; }
  .mobile-actions .action { width: 100%; font-size: 16px; }

  @media (max-width: 1099px) {
    :host { --header-height: 56px; }

    .bar {
      min-height: 56px;
      padding: 16px 24px 0;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    :host(:not([home])) .bar { padding-bottom: 16px; }
    .brand, .brand img { height: 38px; }
    .nav-pill, .actions { display: none; }
    .menu-button { display: inline-flex; }
  }

  @media (max-width: 420px) {
    .bar, .mobile-panel { padding-left: 24px; padding-right: 24px; }
    .brand img, .mobile-logo { max-width: 166px; object-fit: contain; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }
  }
`;

const chevronDown = `
  <svg class="chevron" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M2 4.25 6 8l4-3.75" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
`;

const arrowRight = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M14 7l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
`;

const menuIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 8h14M5 16h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
  </svg>
`;

const closeIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
  </svg>
`;

function navMarkup() {
  return NAV_ITEMS.map((item) => `
    <div class="nav-item">
      <a class="nav-link" href="${item.href}">
        <span>${item.label}</span>${item.children ? chevronDown : ''}
      </a>
      ${item.children ? `
        <div class="dropdown">
          ${item.children.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}
        </div>
      ` : ''}
    </div>
  `).join('');
}

function actionsMarkup(className = 'actions') {
  return `
    <div class="${className}">
      ${ACTION_ITEMS.map(([label, href], index) => `
        <a
          class="action ${index === 1 ? 'action--outline' : ''} ${index === 2 ? 'action--primary' : ''}"
          href="${href}"
          target="_blank"
          rel="noreferrer"
        >${label}</a>
      `).join('')}
    </div>
  `;
}

function installHomepageBridge() {
  if (!document.getElementById('letan-site-header-home-bridge')) {
    const bridge = document.createElement('style');
    bridge.id = 'letan-site-header-home-bridge';
    bridge.textContent = `
      html.letan-site-header-ready #ir9fo,
      html.letan-site-header-ready #i9wvtj,
      html.letan-site-header-ready #i0gnr9t,
      html.letan-site-header-ready #i25h83e,
      html.letan-site-header-ready #i27b3qz {
        display: none !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(bridge);
  }
  document.documentElement.classList.add('letan-site-header-ready');
}

class LetanSiteHeader extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>${styles}</style>
      <header class="bar">
        <a class="brand" href="/" aria-label="LETAN Media — Trang chủ">
          <img src="${LOGO_URL}" alt="LETAN Media" />
        </a>
        <nav class="nav-pill" aria-label="Điều hướng chính">
          ${navMarkup()}
        </nav>
        ${actionsMarkup()}
        <button class="menu-button" type="button" aria-label="Mở menu" aria-expanded="false">
          ${menuIcon}
        </button>
      </header>
      <div class="mobile-panel" data-open="false" role="dialog" aria-modal="true" aria-label="Menu điều hướng">
        <div class="mobile-top">
          <a href="/" aria-label="LETAN Media — Trang chủ">
            <img class="mobile-logo" src="${MOBILE_LOGO_URL}" alt="LETAN Media" />
          </a>
          <button class="menu-button close-button" type="button" aria-label="Đóng menu">
            ${closeIcon}
          </button>
        </div>
        <nav class="mobile-nav" aria-label="Điều hướng mobile">
          ${NAV_ITEMS.map((item) => `<a href="${item.href}"><span>${item.label}</span>${arrowRight}</a>`).join('')}
        </nav>
        ${actionsMarkup('mobile-actions')}
      </div>
    `;

    this.menuButton = shadow.querySelector('.bar .menu-button');
    this.closeButton = shadow.querySelector('.close-button');
    this.panel = shadow.querySelector('.mobile-panel');
    this.previousOverflow = '';

    this.openMenu = () => {
      this.previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      this.panel.dataset.open = 'true';
      this.menuButton.setAttribute('aria-expanded', 'true');
      this.closeButton.focus();
    };

    this.closeMenu = ({ restoreFocus = true } = {}) => {
      document.body.style.overflow = this.previousOverflow;
      this.panel.dataset.open = 'false';
      this.menuButton.setAttribute('aria-expanded', 'false');
      if (restoreFocus) this.menuButton.focus();
    };

    this.onKeyDown = (event) => {
      if (this.panel.dataset.open !== 'true') return;
      if (event.key === 'Escape') {
        this.closeMenu();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [...this.panel.querySelectorAll('a[href], button:not([disabled])')];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && shadow.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && shadow.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    this.menuButton.addEventListener('click', this.openMenu);
    this.closeButton.addEventListener('click', () => this.closeMenu());
    this.panel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => this.closeMenu({ restoreFocus: false }));
    });
    window.addEventListener('keydown', this.onKeyDown);

    if (this.hasAttribute('home')) installHomepageBridge();
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this.onKeyDown);
    if (this.panel?.dataset.open === 'true') {
      document.body.style.overflow = this.previousOverflow;
    }
  }
}

if (!customElements.get('letan-site-header')) {
  customElements.define('letan-site-header', LetanSiteHeader);
}
