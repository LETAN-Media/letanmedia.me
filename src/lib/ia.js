/**
 * Information Architecture — single source of truth for Phase 3.
 *
 * - NAV:        desktop mega-menu + mobile drawer structure
 * - FOOTER:     footer column groups
 * - SITEMAP:    target URL taxonomy (reference for sitemap generation)
 * - ROUTES:     route config consumed by App.jsx (real / placeholder / redirect)
 * - BREADCRUMBS: per-route crumb map (also for BreadcrumbList schema later)
 * - LINK_RULES: internal-linking rules (documented, applied manually not via auto-keyword injection)
 *
 * Existing indexed routes (/chatbot-ai, /tiktok-report, /youtube-report, /chamsocpage)
 * are KEPT as canonical. New taxonomy paths either render a reserved placeholder
 * (noindex, not in sitemap) or 301-redirect to the canonical page.
 */

export const NAV = [
  {
    label: 'Giải pháp',
    children: [
      { label: 'Digital Growth', to: '/solutions/digital-growth', desc: 'Tăng trưởng toàn diện trên tìm kiếm & mạng xã hội.' },
      { label: 'AI Automation', to: '/solutions/ai-automation', desc: 'Tự động hóa quy trình bằng AI.' },
      { label: 'Web & Software', to: '/solutions/web-software', desc: 'Web & phần mềm theo yêu cầu.' },
      { label: 'Brand & Trust', to: '/solutions/brand-trust', desc: 'Xây dựng uy tín thương hiệu.' },
      { label: 'Platform Protection', to: '/solutions/platform-protection', desc: 'Bảo vệ kênh khỏi tin giả & đối thủ.' },
    ],
  },
  {
    label: 'Dịch vụ',
    children: [
      { label: 'SEO & GEO', to: '/services/seo-geo', desc: 'Tối ưu tìm kiếm & hiện diện bản đồ.' },
      { label: 'Social Media', to: '/services/social-media', desc: 'Quản lý & chăm sóc fanpage.' },
      { label: 'Paid Ads', to: '/services/paid-ads', desc: 'Quảng cáo tối ưu ROI.' },
      { label: 'TikTok Growth', to: '/services/tiktok-growth', desc: 'Phát triển kênh TikTok.' },
      { label: 'Platform Protection', to: '/services/platform-protection', desc: 'Xử lý khủng hoảng & báo cáo vi phạm.' },
      { label: 'Chatbot AI', to: '/chatbot-ai', desc: 'Trợ lý AI & tự động hóa khách hàng.' },
      { label: 'Website Development', to: '/services/website-development', desc: 'Thiết kế & lập trình website.' },
    ],
  },
  { label: 'Dự án', to: '/work' },
  {
    label: 'LetanAI',
    children: [
      { label: 'Chatbot AI', to: '/chatbot-ai', desc: 'Trợ lý AI đa kênh.' },
      { label: 'TikTok Report', to: '/tiktok-report', desc: 'Gỡ bỏ nội dung vi phạm TikTok.' },
      { label: 'YouTube Report', to: '/youtube-report', desc: 'Bảo vệ kênh YouTube.' },
    ],
  },
  { label: 'Kiến thức', to: '/insights' },
  { label: 'Về LETAN', to: '/about' },
  { label: 'Liên hệ', to: '/contact', cta: true },
];

export const FOOTER = [
  {
    title: 'LETAN Media',
    brand: true,
    links: [
      { label: 'Hotline', href: 'tel:0765178999' },
      { label: 'Telegram', href: 'https://t.me/Tanlemedia', external: true },
      { label: 'Email', href: 'mailto:infor@letanmedia.me' },
    ],
  },
  {
    title: 'Giải pháp',
    links: [
      { label: 'Digital Growth', to: '/solutions/digital-growth' },
      { label: 'AI Automation', to: '/solutions/ai-automation' },
      { label: 'Web & Software', to: '/solutions/web-software' },
      { label: 'Brand & Trust', to: '/solutions/brand-trust' },
      { label: 'Platform Protection', to: '/solutions/platform-protection' },
    ],
  },
  {
    title: 'Dịch vụ',
    links: [
      { label: 'SEO & GEO', to: '/services/seo-geo' },
      { label: 'Social Media', to: '/services/social-media' },
      { label: 'Paid Ads', to: '/services/paid-ads' },
      { label: 'TikTok Growth', to: '/services/tiktok-growth' },
      { label: 'Chatbot AI', to: '/chatbot-ai' },
      { label: 'Website Development', to: '/services/website-development' },
    ],
  },
  {
    title: 'Sản phẩm',
    links: [
      { label: 'Chatbot AI', to: '/chatbot-ai' },
      { label: 'TikTok Report', to: '/tiktok-report' },
      { label: 'YouTube Report', to: '/youtube-report' },
    ],
  },
  {
    title: 'Công ty',
    links: [
      { label: 'Dự án', to: '/work' },
      { label: 'Kiến thức', to: '/insights' },
      { label: 'Về LETAN', to: '/about' },
      { label: 'Liên hệ', to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/policy' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Data Deletion', to: '/data-deletion' },
    ],
  },
];

// Target taxonomy (reference). Real content pages are flagged `real`.
export const SITEMAP = {
  '/': { real: true },
  '/solutions': { index: true },
  '/services': { real: true },
  '/work': { real: true },
  '/insights': { real: true },
  '/about': { real: true },
  '/contact': { real: true },
  '/products': { index: true },
  '/legal': { index: true },
  '/chatbot-ai': { real: true },
  '/tiktok-report': { real: true },
  '/youtube-report': { real: true },
  '/services/seo-geo': { real: true },
  '/services/social-media': { real: true },
  '/services/paid-ads': { real: true },
  '/services/tiktok-growth': { real: true },
  '/services/platform-protection': { real: true },
  '/services/chatbot-ai': { real: true },
  '/services/website-development': { real: true },
};

// 301 redirects: new taxonomy path -> canonical existing route.
export const REDIRECTS = [
  { from: '/products/chatbot-ai', to: '/chatbot-ai' },
  { from: '/products/tiktok-report', to: '/tiktok-report' },
  { from: '/products/youtube-report', to: '/youtube-report' },
];

// Breadcrumb map for known routes (home omitted). Extend as pages get real content.
export const BREADCRUMBS = {
  '/solutions/digital-growth': [{ label: 'Giải pháp', to: '/solutions' }, { label: 'Digital Growth' }],
  '/solutions/ai-automation': [{ label: 'Giải pháp', to: '/solutions' }, { label: 'AI Automation' }],
  '/solutions/web-software': [{ label: 'Giải pháp', to: '/solutions' }, { label: 'Web & Software' }],
  '/solutions/brand-trust': [{ label: 'Giải pháp', to: '/solutions' }, { label: 'Brand & Trust' }],
  '/solutions/platform-protection': [{ label: 'Giải pháp', to: '/solutions' }, { label: 'Platform Protection' }],
  '/services/seo-geo': [{ label: 'Dịch vụ', to: '/services' }, { label: 'SEO & GEO' }],
  '/services/social-media': [{ label: 'Dịch vụ', to: '/services' }, { label: 'Social Media' }],
  '/services/paid-ads': [{ label: 'Dịch vụ', to: '/services' }, { label: 'Paid Ads' }],
  '/services/tiktok-growth': [{ label: 'Dịch vụ', to: '/services' }, { label: 'TikTok Growth' }],
  '/services/platform-protection': [{ label: 'Dịch vụ', to: '/services' }, { label: 'Platform Protection' }],
  '/services/website-development': [{ label: 'Dịch vụ', to: '/services' }, { label: 'Website Development' }],
  '/services/chatbot-ai': [{ label: 'Dịch vụ', to: '/services' }, { label: 'Chatbot AI' }],
  '/chatbot-ai': [{ label: 'Sản phẩm', to: '/products' }, { label: 'Chatbot AI' }],
  '/tiktok-report': [{ label: 'Sản phẩm', to: '/products' }, { label: 'TikTok Report' }],
  '/youtube-report': [{ label: 'Sản phẩm', to: '/products' }, { label: 'YouTube Report' }],
  '/work': [{ label: 'Dự án' }],
  '/insights': [{ label: 'Kiến thức' }],
  '/about': [{ label: 'Về LETAN' }],
  '/contact': [{ label: 'Liên hệ' }],
};

export const LINK_RULES = [
  'Solution -> related Services (cross-link)',
  'Service -> related Case Studies (Work)',
  'Service -> related Insights',
  'Insight -> related Service',
  'Product -> related Solution',
  'Case Study -> related Service',
  'Every commercial page -> Contact',
  'No bulk auto keyword-linking',
];
