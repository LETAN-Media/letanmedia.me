/**
 * Sitemap generator — builds sitemap.xml from data sources at build time.
 * Run after vite build + prerender.
 *
 * Usage: node scripts/generate-sitemap.mjs
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '../dist');
const SITE_URL = 'https://letanmedia.me';

// Import data
const { getServiceSlugs } = await import('../src/data/services.js');
const { getPublishedCases } = await import('../src/data/caseStudies.js');
const { getPublishedInsights } = await import('../src/data/insights.js');

const today = new Date().toISOString().split('T')[0];

const routes = [];

// Static public routes
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/work', priority: '0.8', changefreq: 'weekly' },
  { path: '/insights', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/chatbot-ai', priority: '0.7', changefreq: 'monthly' },
  { path: '/tiktok-report', priority: '0.7', changefreq: 'monthly' },
  { path: '/tiktok-report-policy', priority: '0.4', changefreq: 'yearly' },
  { path: '/youtube-report', priority: '0.7', changefreq: 'monthly' },
  { path: '/policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

routes.push(...staticRoutes);

// Service pages
for (const slug of getServiceSlugs()) {
  routes.push({
    path: `/services/${slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  });
}

// Published case studies
for (const cs of getPublishedCases()) {
  routes.push({
    path: `/work/${cs.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: cs.updatedAt || cs.publishedAt,
  });
}

// Published insights
for (const insight of getPublishedInsights()) {
  routes.push({
    path: `/insights/${insight.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: insight.updatedAt || insight.publishedAt,
  });
}

// Generate XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>
    <loc>${SITE_URL}${r.path}</loc>${r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : ''}
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

writeFileSync(resolve(DIST, 'sitemap.xml'), xml, 'utf-8');
console.log(`[sitemap] Generated sitemap.xml with ${routes.length} URLs`);
