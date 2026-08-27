/**
 * Insights — single source of truth for /insights and /insights/:slug.
 *
 * RULES:
 * - Chỉ đăng bài có nội dung thật, có giá trị thực tế.
 * - Không spin content, không keyword stuffing, không AI filler.
 * - status: 'published' | 'draft' — draft không render, không index.
 * - featured: true = hiển thị nổi bật trên /insights.
 */

export const INSIGHTS = [
  {
    slug: 'geo-generative-engine-optimization',
    title: 'GEO là gì? Generative Engine Optimization trong thời đại AI Search',
    description: 'GEO (Generative Engine Optimization) là cách tối ưu nội dung để được AI search trích dẫn. Khác SEO truyền thống, GEO yêu cầu structured data và entity authority.',
    category: 'AI & Automation',
    tags: ['ai', 'geo', 'seo', 'digital'],
    author: 'LETAN Media',
    publishedAt: '2025-07-15',
    updatedAt: '2025-07-15',
    heroImage: 'https://cdn.letanmedia.me/images/services/website.webp',
    content: [
      { type: 'paragraph', text: 'Khi người dùng tìm kiếm trên Google, họ không còn chỉ thấy 10 liên kết蓝色 truyền thống. Google AI Overview, ChatGPT, Perplexity — tất cả đều trích dẫn nội dung trực tiếp trong kết quả. Đây là lúc GEO (Generative Engine Optimization) trở nên quan trọng hơn bao giờ hết.' },
      { type: 'heading', text: 'GEO khác gì với SEO truyền thống?' },
      { type: 'paragraph', text: 'SEO truyền thống tập trung vào thứ hạng — làm sao website xuất hiện ở vị trí cao trên Google. GEO tập trung vào việc được AI trích dẫn — làm sao nội dung của bạn trở thành nguồn mà AI tin tưởng để trả lời câu hỏi người dùng.' },
      { type: 'paragraph', text: 'Điểm khác biệt cốt lõi: SEO tối ưu cho crawler (Googlebot), GEO tối ưu cho cả crawler lẫn LLM (Large Language Model). LLM cần nội dung có cấu trúc rõ ràng, định nghĩa trực tiếp, và entity signals mạnh.' },
      { type: 'heading', text: '5 yếu tố GEO quan trọng' },
      { type: 'list', items: [
        'Structured Data — Schema.org markup giúp AI hiểu context và entity relationships.',
        'Answer-first content — Đặt câu trả lời ở đầu bài, không giấu trong middle paragraph.',
        'Entity authority — Thương hiệu được đề cập nhất quán across các nguồn uy tín.',
        'Citation-ready format — Định nghĩa, bảng, bullet point dễ trích xuất.',
        'Internal linking có ngữ cảnh — Link giữa các bài về cùng chủ đề, tạo topic cluster.',
      ]},
      { type: 'heading', text: 'GEO có thay thế SEO không?' },
      { type: 'paragraph', text: 'Không. GEO bổ sung cho SEO. Website vẫn cần thứ hạng tốt trên Google traditional search. Nhưng giờ đây, ranking cao chưa đủ — bạn cần nội dung đủ tốt để AI chọn trích dẫn. Cả hai đều cần.' },
      { type: 'heading', text: 'Bắt đầu với GEO như thế nào?' },
      { type: 'paragraph', text: 'Bước đầu tiên: kiểm tra structured data trên website, đảm bảo mỗi trang có schema markup phù hợp. Sau đó, cải thiện nội dung theo hướng answer-first — mỗi section nên trả lời một câu hỏi cụ thể, rõ ràng, không water content.' },
    ],
    relatedServices: ['/services/seo-geo'],
    relatedSolutions: ['/solutions/digital-growth'],
    relatedCases: [],
    featured: true,
    status: 'published',
    seo: {
      title: 'GEO là gì? Generative Engine Optimization | LETAN Media',
      description: 'GEO (Generative Engine Optimization) là cách tối ưu nội dung để được AI search trích dẫn. Khác SEO truyền thống, GEO yêu cầu structured data và entity authority.',
      path: '/insights/geo-generative-engine-optimization',
    },
  },
  {
    slug: 'bao-ve-kenh-tiktok-mao-danh',
    title: 'Bảo vệ kênh TikTok khỏi mạo danh và nội dung vi phạm',
    description: 'Kênh TikTok bị mạo danh, video giả mạo lan truyền? Hướng dẫn quy trình phát hiện, báo cáo và gỡ bỏ nội dung vi phạm trên TikTok một cách chuyên nghiệp.',
    category: 'Platform Protection',
    tags: ['protection', 'tiktok', 'digital'],
    author: 'LETAN Media',
    publishedAt: '2025-07-10',
    updatedAt: '2025-07-10',
    heroImage: 'https://cdn.letanmedia.me/images/services/report-tiktok.webp',
    content: [
      { type: 'paragraph', text: 'TikTok phát triển nhanh đồng nghĩa với việc số lượng nội dung vi phạm — mạo danh, reup, vu khống — cũng tăng theo. Đặc biệt nguy hiểm: video giả mạo lan truyền rất nhanh trên algorithm của TikTok, gây thiệt hại danh tiếng trước khi chủ kênh kịp phản ứng.' },
      { type: 'heading', text: 'Các loại vi phạm phổ biến trên TikTok' },
      { type: 'list', items: [
        'Mạo danh tài khoản — Ai đó tạo tài khoản giả using tên và hình ảnh thương hiệu của bạn.',
        'Reup nội dung — Video gốc của bạn bị sao chép và đăng lại trên kênh khác.',
        'Vu khống / bôi nhọ — Video chứa thông tin sai sự thật về thương hiệu hoặc cá nhân.',
        'Vi phạm bản quyền — Sử dụng nhạc, hình ảnh hoặc video mà không có phép.',
      ]},
      { type: 'heading', text: 'Quy trình báo cáo vi phạm trên TikTok' },
      { type: 'paragraph', text: 'TikTok cung cấp hệ thống báo cáo tích hợp, nhưng hiệu quả phụ thuộc vào cách bạn chuẩn bị hồ sơ. Báo cáo chung chung thường bị từ chối. Bạn cần: bằng chứng你是 chủ sở hữu hợp pháp, mô tả rõ ràng loại vi phạm, và metadata (timestamp, URL, screenshot).' },
      { type: 'heading', text: 'Khi nào cần professional help?' },
      { type: 'paragraph', text: 'Nếu vi phạm nghiêm trọng (nhiều video, ảnh hưởng doanh thu, mạo danh trắng trợn), hoặc nếu report thường không xử lý, bạn cần escalation lên higher tier của TikTok Trust & Safety team. Đây là lúc cần dịch vụ platform protection chuyên nghiệp.' },
      { type: 'heading', text: 'Ngăn chặn vi phạm tái diễn' },
      { type: 'paragraph', text: 'Không chỉ gỡ bỏ — bạn cần hệ thống monitoring để phát hiện vi phạm mới ngay khi nó xuất hiện. Kết hợp monitoring + report nhanh + escalation khi cần là cách hiệu quả nhất để bảo vệ kênh.' },
    ],
    relatedServices: ['/services/platform-protection', '/tiktok-report'],
    relatedSolutions: ['/solutions/platform-protection'],
    relatedCases: ['tiktok-protection'],
    featured: true,
    status: 'published',
    seo: {
      title: 'Bảo vệ kênh TikTok khỏi mạo danh và vi phạm | LETAN Media',
      description: 'Hướng dẫn quy trình phát hiện, báo cáo và gỡ bỏ nội dung vi phạm trên TikTok: mạo danh, reup, vu khống. Quy trình chuyên nghiệp.',
      path: '/insights/bao-ve-kenh-tiktok-mao-danh',
    },
  },
  {
    slug: 'chatbot-ai-cho-doanh-nghiep',
    title: 'Chatbot AI cho doanh nghiệp: Triển khai từ A đến Z',
    description: 'Hướng dẫn triển khai chatbot AI tư vấn và CSKH 24/7 cho doanh nghiệp — từ xác định use case, build knowledge base đến deploy đa kênh.',
    category: 'AI & Automation',
    tags: ['ai', 'chatbot', 'automation'],
    author: 'LETAN Media',
    publishedAt: '2025-07-05',
    updatedAt: '2025-07-05',
    heroImage: 'https://cdn.letanmedia.me/images/services/chatbot-ai.webp',
    content: [
      { type: 'paragraph', text: 'Chatbot AI không còn là xu hướng — nó đã trở thành công cụ vận hành thực tế cho doanh nghiệp. Vấn đề không phải "có nên dùng chatbot không" mà là "triển khai như thế nào cho hiệu quả".' },
      { type: 'heading', text: 'Xác định use case trước khi build' },
      { type: 'paragraph', text: ' Sai lầm phổ biến nhất: build chatbot mà không xác định rõ nó sẽ giải quyết vấn đề gì. Chatbot CSKH khác với chatbot bán hàng khác với chatbot hỗ trợ kỹ thuật. Mỗi use case yêu cầu flow hội thoại, knowledge base và integration khác nhau.' },
      { type: 'heading', text: 'Knowledge base — trái tim của chatbot' },
      { type: 'paragraph', text: 'Chatbot chỉ thông minh bằng dữ liệu bạn cung cấp. Knowledge base cần bao gồm: FAQ, thông tin sản phẩm/dịch vụ, chính sách, quy trình xử lý tình huống. Càng chi tiết, chatbot càng trả lời chính xác.' },
      { type: 'heading', text: 'Multi-channel deployment' },
      { type: 'paragraph', text: 'Khách hàng của bạn ở đâu? Messenger? Zalo? Website? Telegram? Chatbot nên hiện diện trên các kênh khách hàng đang dùng, không phải kênh bạn muốn họ dùng. Triển khai đa kênh giúp tăng touchpoint và conversion.' },
      { type: 'heading', text: 'Monitoring và cải tiến' },
      { type: 'paragraph', text: 'Sau khi deploy, monitoring là bước quan trọng nhất. Theo dõi: câu hỏi nào chatbot trả lời sai, câu hỏi nào cần escalate, conversion rate từ chatbot sang khách hàng thực. Dữ liệu này giúp cải tiến liên tục.' },
    ],
    relatedServices: ['/services/chatbot-ai', '/chatbot-ai'],
    relatedSolutions: ['/solutions/ai-automation'],
    relatedCases: ['chatbot-ai-multichannel'],
    featured: false,
    status: 'published',
    seo: {
      title: 'Chatbot AI cho doanh nghiệp: Triển khai từ A đến Z | LETAN Media',
      description: 'Hướng dẫn triển khai chatbot AI tư vấn và CSKH 24/7: xác định use case, build knowledge base, deploy đa kênh, monitoring.',
      path: '/insights/chatbot-ai-cho-doanh-nghiep',
    },
  },
  {
    slug: 'core-web-vitals-2025',
    title: 'Core Web Vitals 2025: Những gì cần biết cho website',
    description: 'Core Web Vitals là gì? INP, LCP, CLS — tại sao chúng ảnh hưởng đến SEO và trải nghiệm người dùng. Cách đo lường và cải thiện.',
    category: 'Web & Technology',
    tags: ['web', 'performance', 'seo'],
    author: 'LETAN Media',
    publishedAt: '2025-06-28',
    updatedAt: '2025-06-28',
    heroImage: 'https://cdn.letanmedia.me/images/services/website.webp',
    content: [
      { type: 'paragraph', text: 'Core Web Vitals là bộ chỉ số do Google đề xuất để đo lường trải nghiệm người dùng thực tế trên website. Từ 2024, INP (Interaction to Next Paint) chính thức thay thế FID — và đây vẫn là yếu tố ranking quan trọng.' },
      { type: 'heading', text: '3 chỉ số Core Web Vitals hiện tại' },
      { type: 'list', items: [
        'LCP (Largest Contentful Paint) — Thời gian render nội dung chính. Target: < 2.5s.',
        'INP (Interaction to Next Paint) — Thời gian phản hồi khi người dùng tương tác. Target: < 200ms.',
        'CLS (Cumulative Layout Shift) — Mức độ layout shift không mong muốn. Target: < 0.1.',
      ]},
      { type: 'heading', text: 'Tại sao Core Web Vitals quan trọng cho SEO' },
      { type: 'paragraph', text: 'Google xác nhận Core Web Vitals là yếu tố ranking. Website có CWV tốt có lợi thế hơn trong search results, đặc biệt khi đối thủ có content tương tự nhưng trải nghiệm kém hơn. Nhưng quan trọng hơn: CWV tốt = người dùng ở lại lâu hơn = conversion cao hơn.' },
      { type: 'heading', text: 'Cách đo lường' },
      { type: 'paragraph', text: 'Sử dụng Google PageSpeed Insights (dựa trên CrUX data — dữ liệu thực từ người dùng), hoặc Chrome DevTools Performance tab. Không chỉ test 1 lần — theo dõi định kỳ vì CWF thay đổi theo traffic và content.' },
      { type: 'heading', text: 'Cải thiện CWV cho website React' },
      { type: 'paragraph', text: 'Với React: lazy-load components below fold, giảm bundle size bằng code splitting, tối ưu images (WebP/AVIF, lazy loading), tránh re-render không cần thiết. Framework như Next.js hoặc Vite giúp cấu hình tốt hơn.' },
    ],
    relatedServices: ['/services/website-development', '/services/seo-geo'],
    relatedSolutions: ['/solutions/web-software'],
    relatedCases: ['letanmedia-website'],
    featured: false,
    status: 'published',
    seo: {
      title: 'Core Web Vitals 2025: INP, LCP, CLS | LETAN Media',
      description: 'Core Web Vitals là gì? INP, LCP, CLS — tại sao ảnh hưởng đến SEO. Cách đo lường và cải thiện cho website React.',
      path: '/insights/core-web-vitals-2025',
    },
  },
];

/**
 * Get all published insights, sorted by publishedAt descending.
 */
export function getPublishedInsights() {
  return INSIGHTS
    .filter((i) => i.status === 'published')
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

/**
 * Get a single insight by slug. Returns null if not found or draft.
 */
export function getInsightBySlug(slug) {
  const insight = INSIGHTS.find((i) => i.slug === slug);
  if (!insight || insight.status !== 'published') return null;
  return insight;
}

/**
 * Get featured insights.
 */
export function getFeaturedInsights() {
  return getPublishedInsights().filter((i) => i.featured);
}

/**
 * Get insights filtered by category.
 */
export function getInsightsByCategory(category) {
  if (!category || category === 'all') return getPublishedInsights();
  return getPublishedInsights().filter((i) => i.category === category);
}

/**
 * Get related insights for a given insight (same category, excluding self).
 */
export function getRelatedInsights(slug, limit = 3) {
  const current = getInsightBySlug(slug);
  if (!current) return [];
  return getPublishedInsights()
    .filter((i) => i.slug !== slug && i.category === current.category)
    .slice(0, limit);
}

/**
 * All available topic categories.
 */
export const TOPIC_CATEGORIES = [
  { key: 'all', label: 'Tất cả' },
  { key: 'AI & Automation', label: 'AI & Automation' },
  { key: 'Digital Growth', label: 'Digital Growth' },
  { key: 'Platform Protection', label: 'Platform Protection' },
  { key: 'Web & Technology', label: 'Web & Technology' },
];
