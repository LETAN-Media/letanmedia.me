/**
 * Prerender script — runs after `vite build` to generate static HTML
 * for SEO-critical routes. Crawlers get full HTML content without JS.
 *
 * Usage: node scripts/prerender.mjs
 * Called automatically in build script after vite build.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '../dist');
const INDEX_HTML = resolve(DIST, 'index.html');
const TEMPLATE_HTML = readFileSync(INDEX_HTML, 'utf-8');

// Import data sources to generate dynamic routes
const servicesMod = await import('../src/data/services.js');
const casesMod = await import('../src/data/caseStudies.js');
const insightsMod = await import('../src/data/insights.js');

const { getServiceSlugs, getServiceBySlug } = servicesMod;
const { getPublishedCases, getCaseBySlug } = casesMod;
const { getPublishedInsights, getInsightBySlug } = insightsMod;

/** SEO metadata for static routes */
const STATIC_ROUTES = {
  '/': {
    title: 'LETAN Media — AI, Marketing & Digital Growth',
    description: 'Giải pháp AI, truyền thông số và phát triển phần mềm dành cho cá nhân và doanh nghiệp. Premium AI-first digital agency.',
  },
  '/services': {
    title: 'Dịch vụ — AI, Digital Growth & Platform Protection | LETAN Media',
    description: 'Danh mục dịch vụ LETAN Media: SEO & GEO, Social Media, Paid Ads, TikTok Growth, Platform Protection, Chatbot AI, Website Development.',
  },
  '/work': {
    title: 'Dự án — Selected Work | LETAN Media',
    description: 'Những hệ thống, chiến dịch và sản phẩm số được LETAN xây dựng để giải quyết bài toán tăng trưởng thực tế.',
  },
  '/insights': {
    title: 'Kiến thức — AI, Digital Growth & Platform Protection | LETAN Media',
    description: 'Blog & insight về AI, truyền thông số, SEO/GEO, platform protection và web development từ LETAN Media.',
  },
  '/contact': {
    title: 'Liên hệ | LETAN Media — Tư vấn AI & Digital Growth',
    description: 'Kết nối với LETAN Media để nhận tư vấn giải pháp AI, truyền thông số và phát triển phần mềm.',
  },
  '/about': {
    title: 'Về LETAN Media | AI-first Digital Agency',
    description: 'Agency AI-first chuyên AI, truyền thông số và phần mềm.',
  },
  '/policy': {
    title: 'Chính sách bảo mật | LETAN Media',
    description: 'Chính sách bảo mật và xử lý dữ liệu khách hàng của LETAN Media.',
  },
  '/terms': {
    title: 'Điều khoản dịch vụ | LETAN Media',
    description: 'Điều khoản dịch vụ của LETAN Media dành cho cá nhân và doanh nghiệp.',
  },
  '/chatbot-ai': {
    title: 'Chatbot AI & Phần mềm tự động hóa | LETAN Media',
    description: 'Giải pháp Chatbot AI, phần mềm và tự động hóa quy trình cho doanh nghiệp từ LETAN Media.',
  },
  '/tiktok-report': {
    title: 'Dịch vụ Report & Bảo vệ kênh TikTok | LETAN Media',
    description: 'Bảo vệ và xử lý khủng hoảng kênh TikTok: report vi phạm, gỡ video, DMCA, tích xanh.',
  },
  '/tiktok-report-policy': {
    title: 'Chính sách bảo hành Report TikTok & Bảo mật | LETAN Media',
    description: 'Chính sách bảo hành dịch vụ Report TikTok và cam kết bảo mật thông tin khách hàng của LETAN Media.',
  },
  '/youtube-report': {
    title: 'Dịch Vụ Report YouTube Uy Tín, Gỡ Video Vi Phạm — LETAN Media',
    description: 'Dịch vụ report kênh YouTube vi phạm, gỡ video reup bản quyền DMCA, video bôi nhọ danh dự và khôi phục kênh YouTube nhanh chóng. Hỗ trợ 24/7.',
  },
};

function generateRouteHtml(routePath, meta) {
  const template = TEMPLATE_HTML;

  let html = template.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`
  );

  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeHtml(meta.description)}"`
  );

  const canonical = `https://letanmedia.me${routePath === '/' ? '/' : routePath}`;
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${canonical}"`
  );

  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeHtml(meta.title)}"`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeHtml(meta.description)}"`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${canonical}"`
  );

  html = html.replace(
    /<meta property="twitter:title" content="[^"]*"/,
    `<meta property="twitter:title" content="${escapeHtml(meta.title)}"`
  );
  html = html.replace(
    /<meta property="twitter:description" content="[^"]*"/,
    `<meta property="twitter:description" content="${escapeHtml(meta.description)}"`
  );

  const prerenderContent = generatePrerenderContent(routePath, meta);
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${prerenderContent}</div>`
  );

  return html;
}

function generatePrerenderContent(routePath, meta) {
  const esc = escapeHtml;

  if (routePath === '/v2') {
    return `
<div class="lmv2-prerender">
  <h1>LETAN Media</h1>
  <p>AI · MEDIA · SOFTWARE</p>
</div>`;
  }

  if (routePath === '/') {
    return `
<nav aria-label="Breadcrumb"><a href="/">LETAN Media</a></nav>
<h1>${esc(meta.title.split('—')[0].trim())}</h1>
<p>${esc(meta.description)}</p>
<section aria-label="Giải pháp">
<h2>Giải pháp</h2>
<ul>
<li><a href="/solutions/digital-growth">Digital Growth</a></li>
<li><a href="/solutions/ai-automation">AI Automation</a></li>
<li><a href="/solutions/web-software">Web &amp; Software</a></li>
<li><a href="/solutions/brand-trust">Brand &amp; Trust</a></li>
<li><a href="/solutions/platform-protection">Platform Protection</a></li>
</ul>
</section>
<section aria-label="Dịch vụ">
<h2>Dịch vụ</h2>
<ul>
<li><a href="/services/seo-geo">SEO &amp; GEO</a></li>
<li><a href="/services/social-media">Social Media</a></li>
<li><a href="/services/paid-ads">Paid Ads</a></li>
<li><a href="/services/tiktok-growth">TikTok Growth</a></li>
<li><a href="/services/platform-protection">Platform Protection</a></li>
<li><a href="/services/chatbot-ai">Chatbot AI</a></li>
<li><a href="/services/website-development">Website Development</a></li>
</ul>
</section>
<section aria-label="Dự án"><h2><a href="/work">Dự án</a></h2></section>
<section aria-label="Kiến thức"><h2><a href="/insights">Kiến thức</a></h2></section>
<section aria-label="Liên hệ"><h2><a href="/contact">Liên hệ</a></h2></section>`;
  }

  if (routePath.startsWith('/services/')) {
    const slug = routePath.replace('/services/', '');
    const service = getServiceBySlug(slug);
    if (!service) return `<h1>${esc(meta.title)}</h1><p>${esc(meta.description)}</p>`;
    return `
<nav aria-label="Breadcrumb"><a href="/services">Dịch vụ</a> / <span>${esc(service.shortTitle)}</span></nav>
<h1>${esc(service.title)}</h1>
<p>${esc(service.description)}</p>
<section><h2>Bài toán</h2><p>${esc(service.problem)}</p></section>
${service.outcomes?.length ? `<section><h2>Outcome</h2><ul>${service.outcomes.map(o => `<li>${esc(o)}</li>`).join('')}</ul></section>` : ''}
${service.faq?.length ? `<section><h2>Câu hỏi thường gặp</h2>${service.faq.map(f => `<div><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join('')}</section>` : ''}
<a href="/contact">Liên hệ</a>`;
  }

  if (routePath === '/services') {
    const slugs = getServiceSlugs();
    return `
<h1>${esc(meta.title.split('—')[0].trim())}</h1>
<p>${esc(meta.description)}</p>
<ul>${slugs.map(s => `<li><a href="/services/${s}">${esc(s)}</a></li>`).join('')}</ul>
<a href="/contact">Liên hệ</a>`;
  }

  if (routePath === '/work') {
    const cases = getPublishedCases();
    return `
<h1>${esc(meta.title.split('—')[0].trim())}</h1>
<p>${esc(meta.description)}</p>
<ul>${cases.map(c => `<li><a href="/work/${c.slug}">${esc(c.title)}</a> — ${esc(c.category)}</li>`).join('')}</ul>`;
  }

  if (routePath.startsWith('/work/')) {
    const slug = routePath.replace('/work/', '');
    const cs = getCaseBySlug(slug);
    if (!cs) return `<h1>${esc(meta.title)}</h1><p>${esc(meta.description)}</p>`;
    return `
<nav aria-label="Breadcrumb"><a href="/work">Dự án</a> / <span>${esc(cs.title)}</span></nav>
<h1>${esc(cs.title)}</h1>
<p>${esc(cs.summary)}</p>
${cs.challenge ? `<section><h2>Thách thức</h2><p>${esc(cs.challenge)}</p></section>` : ''}
${cs.solution ? `<section><h2>Giải pháp</h2><p>${esc(cs.solution)}</p></section>` : ''}
<a href="/contact">Liên hệ</a>`;
  }

  if (routePath === '/insights') {
    const insights = getPublishedInsights();
    return `
<h1>${esc(meta.title.split('—')[0].trim())}</h1>
<p>${esc(meta.description)}</p>
<ul>${insights.map(i => `<li><a href="/insights/${i.slug}">${esc(i.title)}</a> — ${esc(i.category)}</li>`).join('')}</ul>`;
  }

  if (routePath.startsWith('/insights/')) {
    const slug = routePath.replace('/insights/', '');
    const insight = getInsightBySlug(slug);
    if (!insight) return `<h1>${esc(meta.title)}</h1><p>${esc(meta.description)}</p>`;
    const bodyHtml = insight.content?.map(b => {
      if (b.type === 'heading') return `<h2>${esc(b.text)}</h2>`;
      if (b.type === 'paragraph') return `<p>${esc(b.text)}</p>`;
      if (b.type === 'list') return `<ul>${b.items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>`;
      return '';
    }).join('') || '';
    return `
<nav aria-label="Breadcrumb"><a href="/insights">Kiến thức</a> / <span>${esc(insight.title)}</span></nav>
<h1>${esc(insight.title)}</h1>
<p>${esc(insight.description)}</p>
<article>${bodyHtml}</article>
<a href="/contact">Liên hệ</a>`;
  }

  return `<h1>${esc(meta.title)}</h1><p>${esc(meta.description)}</p>`;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ─── Main ────────────────────────────────────────────────────
console.log('[prerender] Starting...');

const routes = new Map();

// Static routes
for (const [path, meta] of Object.entries(STATIC_ROUTES)) {
  routes.set(path, meta);
}

// Dynamic: services
for (const slug of getServiceSlugs()) {
  const svc = getServiceBySlug(slug);
  routes.set(`/services/${slug}`, {
    title: svc?.seo?.title || `Dịch vụ ${slug} | LETAN Media`,
    description: svc?.seo?.description || `Dịch vụ ${slug} từ LETAN Media.`,
  });
}

// Dynamic: case studies (published only)
for (const cs of getPublishedCases()) {
  routes.set(`/work/${cs.slug}`, {
    title: cs.seo?.title || `${cs.title} | LETAN Media`,
    description: cs.seo?.description || cs.summary,
  });
}

// Dynamic: insights (published only)
for (const insight of getPublishedInsights()) {
  routes.set(`/insights/${insight.slug}`, {
    title: insight.seo?.title || `${insight.title} | LETAN Media`,
    description: insight.seo?.description || insight.description,
  });
}

let generated = 0;
for (const [path, meta] of routes) {
  const html = generateRouteHtml(path, meta);
  const outPath = path === '/'
    ? resolve(DIST, 'index.html')
    : resolve(DIST, path.slice(1), 'index.html');

  const dir = dirname(outPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  writeFileSync(outPath, html, 'utf-8');
  generated++;
}

console.log(`[prerender] Generated ${generated} static HTML files`);
