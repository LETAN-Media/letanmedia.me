import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BREADCRUMBS } from '../lib/ia';

const Breadcrumbs = ({ className = '' }) => {
  const { pathname } = useLocation();
  const crumbs = BREADCRUMBS[pathname];
  if (!crumbs || crumbs.length === 0) return null;

  const items = [{ label: 'Trang chủ', to: '/' }, ...crumbs];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.to ? { item: `https://letanmedia.me${c.to}` } : {}),
    })),
  };

  return (
    <nav className={`breadcrumbs ${className}`} aria-label="Breadcrumb">
      <ol>
        {items.map((c, i) => (
          <li key={i}>
            {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            {i < items.length - 1 && <span className="breadcrumbs-sep">/</span>}
          </li>
        ))}
      </ol>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </nav>
  );
};

export default Breadcrumbs;
