/**
 * Case Studies — single source of truth for /work and /work/:slug.
 *
 * RULES:
 * - results chỉ chứa dữ liệu có thật. Nếu không có số liệu → để null/empty.
 * - Không bịa tên khách hàng, không bịa % tăng trưởng.
 * - Có thể dùng project nội bộ LETAN làm case thật.
 * - slug dùng cho routing (/work/:slug).
 * - featured: true = hiển thị đầu trang /work.
 * - status: 'published' | 'draft' — draft không index, không link.
 */

export const CASE_STUDIES = [
  {
    slug: 'letanmedia-website',
    title: 'LETAN Media — Website Agency AI-first',
    category: 'Web & Software',
    tags: ['web', 'digital'],
    summary: 'Xây dựng website agency AI-first từ zero: React + Vite, design system, 3D hero, chatbot AI tích hợp sẵn — tối ưu tốc độ, SEO và trải nghiệm người dùng.',
    challenge: 'LETAN cần một website thể hiện rõ positioning AI-first agency, khác biệt với template agency phổ thông, đồng thời phải tải nhanh, chuẩn SEO và tích hợp chatbot AI ngay trên trang.',
    solution: 'Triển khai React + Vite với design system tùy chỉnh (Phase 2), hero 3D canvas lightweight, code-split routes, lazy-load Three.js, và chatbot AI-widget chạy trên mọi trang.',
    services: ['Website Development', 'AI Chatbot', 'SEO & GEO'],
    technologies: ['React', 'Vite', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Cloudflare Pages'],
    images: {
      hero: 'https://cdn.letanmedia.me/images/services/website.webp',
      gallery: [
        'https://cdn.letanmedia.me/images/services/website.webp',
        'https://cdn.letanmedia.me/images/services/chatbot-ai.webp',
      ],
    },
    results: null, // Không có số liệu convert/traffic thật
    featured: true,
    status: 'published',
    relatedServices: ['/services/website-development', '/chatbot-ai'],
    relatedSolutions: ['/solutions/web-software'],
  },
  {
    slug: 'chatbot-ai-multichannel',
    title: 'LETAN Chatbot AI — Trợ lý đa kênh',
    category: 'AI Automation',
    tags: ['ai', 'digital'],
    summary: 'Chatbot AI tư vấn và CSKH 24/7 trên nhiều kênh nhắn tin: web widget, Messenger, Telegram, Zalo — sử dụng AI Agent tự xử lý và điều hướng khách hàng.',
    challenge: 'Doanh nghiệp mất nhân sự tư vấn重复, phản hồi chậm vào giờ cao điểm, và không có hệ thống đo lường hiệu quả chăm sóc khách hàng.',
    solution: 'Xây dựng AI Agent xử lý tự nhiên bằng LLM, tích hợp đa kênh (web, Messenger, Telegram, Zalo), tự động điều hướng đến đúng dịch vụ, và ghi log cuộc hội thoại để phân tích.',
    services: ['AI Chatbot', 'Automation Workflow'],
    technologies: ['LLM', 'React', 'Node.js', 'Cloudflare Workers', 'Multi-channel API'],
    images: {
      hero: 'https://cdn.letanmedia.me/images/services/chatbot-ai.webp',
      gallery: [
        'https://cdn.letanmedia.me/images/services/chatbot-ai.webp',
      ],
    },
    results: null, // Không có số liệu conversion thật
    featured: true,
    status: 'published',
    relatedServices: ['/chatbot-ai'],
    relatedSolutions: ['/solutions/ai-automation'],
  },
  {
    slug: 'tiktok-protection',
    title: 'Bảo vệ kênh TikTok — Report & Recovery',
    category: 'Platform Protection',
    tags: ['protection', 'digital'],
    summary: 'Dịch vụ phát hiện, báo cáo và gỡ bỏ nội dung vi phạm trên TikTok: video mạo danh, nội dung vu khống, reup bản quyền — theo dõi tiến độ real-time.',
    challenge: 'Kênh TikTok bị mạo danh, video giả mạo lan truyền nhanh, và chủ kênh không biết cách report hiệu quả hoặc quy trình quá phức tạp.',
    solution: 'Xây dựng hệ thống theo dõi kênh, phát hiện vi phạm tự động, soạn hồ sơ báo cáo chuẩn平台要求, và theo dõi tiến độ xử lý qua dashboard.',
    services: ['Platform Protection', 'Report TikTok'],
    technologies: ['TikTok API', 'Automation', 'Dashboard', 'Cloudflare Workers'],
    images: {
      hero: 'https://cdn.letanmedia.me/images/services/report-tiktok.webp',
      gallery: [
        'https://cdn.letanmedia.me/images/services/report-tiktok.webp',
      ],
    },
    results: null,
    featured: true,
    status: 'published',
    relatedServices: ['/tiktok-report', '/services/platform-protection'],
    relatedSolutions: ['/solutions/platform-protection'],
  },
  {
    slug: 'youtube-defense',
    title: 'Bảo vệ kênh YouTube — DMCA & Defense',
    category: 'Platform Protection',
    tags: ['protection', 'digital'],
    summary: 'Xử lý vi phạm bản quyền DMCA, kháng nghị gậy bản quyền, gỡ video reup và kênh mạo danh trên YouTube — quy trình pháp lý rõ ràng.',
    challenge: 'Kênh YouTube bị kẻ xấu reup nội dung, gửi DMCA giả, hoặc mạo danh thương hiệu — chủ kênh thiếu kinh nghiệm pháp lý và kỹ thuật để xử lý.',
    solution: 'Hệ thống thu thập chứng cứ số, soạn tài liệu DMCA/counter-notification chuẩn, đệ trình lên YouTube, và theo dõi直至 khi vi phạm được gỡ bỏ.',
    services: ['Platform Protection', 'Report YouTube'],
    technologies: ['YouTube API', 'Legal Workflow', 'Evidence Collection', 'Automation'],
    images: {
      hero: 'https://cdn.letanmedia.me/images/services/report-tiktok.webp', // CDN chưa có ảnh YouTube riêng
      gallery: [
        'https://cdn.letanmedia.me/images/services/report-tiktok.webp',
      ],
    },
    results: null,
    featured: false,
    status: 'published',
    relatedServices: ['/youtube-report', '/services/platform-protection'],
    relatedSolutions: ['/solutions/platform-protection'],
  },
];

/**
 * Get all published case studies.
 */
export function getPublishedCases() {
  return CASE_STUDIES.filter((c) => c.status === 'published');
}

/**
 * Get a single case study by slug. Returns null if not found or draft.
 */
export function getCaseBySlug(slug) {
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs || cs.status !== 'published') return null;
  return cs;
}

/**
 * Get featured case studies.
 */
export function getFeaturedCases() {
  return getPublishedCases().filter((c) => c.featured);
}

/**
 * Get case studies filtered by tag.
 */
export function getCasesByTag(tag) {
  if (!tag || tag === 'all') return getPublishedCases();
  return getPublishedCases().filter((c) => c.tags.includes(tag));
}

/**
 * All available filter tags.
 */
export const FILTER_TAGS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'ai', label: 'AI' },
  { key: 'digital', label: 'Digital' },
  { key: 'web', label: 'Web' },
  { key: 'protection', label: 'Protection' },
];
