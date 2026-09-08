import { useEffect } from 'react';

const SITE_URL = 'https://letanmedia.me';
const DEFAULT_IMAGE = 'https://letanmedia.me/images/hero-poster.webp';

/**
 * SEO component that renders meta tags in JSX for prerender/SSG
 * AND updates them client-side via useEffect for SPA navigation.
 *
 * During prerender (server): renderToString outputs <meta> tags directly.
 * During hydration (client): useEffect updates existing tags (no duplicate creation).
 * During SPA navigation: useEffect updates tags for new route.
 */
export default function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
}) {
  const canonical =
    SITE_URL + (path === '/' ? '/' : path.endsWith('/') ? path : path + '/');

  // Client-side: update <title> and ensure meta tags exist/update
  useEffect(() => {
    document.title = title;

    const upsertMeta = (selector, attr, key, content) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const upsertLink = (rel, href) => {
      let el = document.head.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    upsertMeta('meta[name="description"]', 'name', 'description', description);
    upsertLink('canonical', canonical);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', type);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', image);
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'LETAN Media');
    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);
    upsertMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
  }, [title, description, canonical, image, type, noindex]);

  // Render meta tags in JSX for prerender/SSG compatibility.
  // During client render these are no-ops (useEffect handles updates).
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="LETAN Media" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
    </>
  );
}
