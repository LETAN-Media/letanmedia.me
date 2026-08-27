import React, { useState } from 'react';
import './ui.css';

export function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  return <Tag className={`ui-container ${className}`} {...rest}>{children}</Tag>;
}

export function Section({ className = '', children, ...rest }) {
  return <section className={`ui-section ${className}`} {...rest}>{children}</section>;
}

export function SectionHeader({ eyebrow, title, subtitle, className = '', children }) {
  return (
    <div className={`ui-section-header ${className}`}>
      {eyebrow && <span className="ui-eyebrow">{eyebrow}</span>}
      {title && <h2 className="ui-title">{title}</h2>}
      {subtitle && <p className="ui-subtitle">{subtitle}</p>}
      {children}
    </div>
  );
}

export function Button({ variant = 'primary', size, as: Tag = 'button', href, className = '', children, ...rest }) {
  const cls = ['ui-btn', `ui-btn--${variant}`, size ? `ui-btn--${size}` : '', className].filter(Boolean).join(' ');
  if (Tag === 'a' || href) {
    return <a href={href} className={cls} {...rest}>{children}</a>;
  }
  return <Tag className={cls} {...rest}>{children}</Tag>;
}

export function Card({ className = '', children, ...rest }) {
  return <div className={`ui-card ${className}`} {...rest}>{children}</div>;
}

export function Badge({ variant, className = '', children }) {
  const cls = ['ui-badge', variant ? `ui-badge--${variant}` : '', className].filter(Boolean).join(' ');
  return <span className={cls}>{children}</span>;
}

export function Input({ label, className = '', ...rest }) {
  return (
    <label className="ui-field">
      {label && <span className="ui-label">{label}</span>}
      <input className={`ui-input ${className}`} {...rest} />
    </label>
  );
}

export function Textarea({ label, className = '', ...rest }) {
  return (
    <label className="ui-field">
      {label && <span className="ui-label">{label}</span>}
      <textarea className={`ui-textarea ${className}`} {...rest} />
    </label>
  );
}

export function Modal({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div className="ui-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="ui-modal" onClick={(e) => e.stopPropagation()}>
        {title && <h3 style={{ marginBottom: 16, fontFamily: 'var(--font-space)' }}>{title}</h3>}
        {children}
      </div>
    </div>
  );
}

export function Tabs({ tabs = [], defaultId }) {
  const [active, setActive] = useState(defaultId || (tabs[0] && tabs[0].id));
  const current = tabs.find((t) => t.id === active) || tabs[0];
  return (
    <div>
      <div className="ui-tabs-nav" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === active}
            className={`ui-tab ${t.id === active ? 'ui-tab--active' : ''}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="ui-tab-panel" role="tabpanel">{current && current.content}</div>
    </div>
  );
}

export function Accordion({ items = [] }) {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className="ui-accordion-item" key={i}>
            <button
              className="ui-accordion-trigger"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{item.title}</span>
              <span className={`ui-accordion-icon ${isOpen ? 'ui-accordion-icon--open' : ''}`}>+</span>
            </button>
            {isOpen && <div className="ui-accordion-panel">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}

export function Stats({ items = [] }) {
  return (
    <div style={{ display: 'grid', gap: 32, gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
      {items.map((s, i) => (
        <div key={i}>
          <div className="ui-stat-value">{s.value}{s.suffix}</div>
          <div className="ui-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export function ServiceCard({ icon, title, description, href }) {
  const inner = (
    <>
      {icon && <div className="ui-service-card-icon">{icon}</div>}
      <h3 className="ui-service-card-title">{title}</h3>
      {description && <p className="ui-service-card-desc">{description}</p>}
    </>
  );
  return href ? <a className="ui-card ui-service-card" href={href}>{inner}</a> : <div className="ui-card ui-service-card">{inner}</div>;
}

export function CaseCard({ title, category, image, href }) {
  return (
    <a className="ui-card ui-case-card" href={href}>
      <div className="ui-case-card-media" style={image ? { backgroundImage: `url(${image})` } : undefined} />
      <div className="ui-case-card-body">
        {category && <div className="ui-case-card-cat">{category}</div>}
        <div className="ui-case-card-title">{title}</div>
      </div>
    </a>
  );
}
