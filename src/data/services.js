/**
 * Services — single source of truth for /services/* pages.
 *
 * Each service has unique copy, not generic. No fake metrics.
 * relatedCases[] maps to caseStudies.js slugs.
 * relatedSolutions[] maps to /solutions/* routes.
 */

export const SERVICES = [
  {
    slug: 'seo-geo',
    title: 'SEO & GEO — Tăng hiện diện trên Google và AI Search',
    shortTitle: 'SEO & GEO',
    eyebrow: 'Digital Growth',
    description: 'Tối ưu website để được tìm thấy trên Google传统搜索 và AI search (GEO — Generative Engine Optimization). Kết hợp technical SEO, content architecture và entity SEO để tăng traffic tự nhiên bền vững.',
    problem: 'Website của bạn đang ở trang kết quả tìm kiếm thứ 2, thứ 3 — hoặc hoàn toàn vắng mặt trên AI search. Khách hàng tiềm năng tìm kiếm giải pháp nhưng không thấy bạn.',
    outcomes: [
      'Tăng traffic tự nhiên từ tìm kiếm Google',
      'Xuất hiện trong AI search results (ChatGPT, Perplexity, Google AI Overview)',
      'Cải thiện thứ hạng từ khóa cạnh tranh',
      'Tăng conversion từ traffic organic',
    ],
    capabilities: [
      'Technical SEO — crawlability, indexation, Core Web Vitals, structured data',
      'On-page SEO — title, meta, heading architecture, internal linking',
      'Content architecture — topic clusters, content gaps, editorial calendar',
      'Entity SEO — Knowledge Panel, entity signals, brand authority',
      'GEO — AI search optimization, structured data cho LLM consumption',
      'Local SEO — Google Business Profile, NAP consistency, local citations',
      'Image SEO — alt text, WebP/AVIF, image sitemap',
      'Search Console monitoring & monthly reporting',
    ],
    process: [
      { step: 'Audit', desc: 'Phân tíchtechnical SEO, content, đối thủ và cơ hội từ khóa.' },
      { step: 'Strategy', desc: 'Xây dựng chiến lược từ khóa, content plan và roadmap kỹ thuật.' },
      { step: 'Execute', desc: 'Triển khai tối ưu on-page, technical fixes và content creation.' },
      { step: 'Monitor', desc: 'Theo dõi thứ hạng, traffic và conversion — tối ưu liên tục.' },
    ],
    technologies: ['Google Search Console', 'Ahrefs / SEMrush', 'Schema.org', 'Core Web Vitals', 'Cloudflare'],
    relatedCases: [],
    relatedSolutions: ['/solutions/digital-growth'],
    faq: [
      { q: 'SEO phù hợp với loại hình doanh nghiệp nào?', a: 'Bất kỳ doanh nghiệp nào có website và muốn tăng traffic tự nhiên. Đặc biệt phù hợp với doanh nghiệp dịch vụ, B2B, e-commerce và SaaS.' },
      { q: 'Triển khai SEO bao lâu见效?', a: 'SEO là chiến lược dài hạn. Thông thường thấy cải thiện thứ hạng trong 3–6 tháng, traffic tăng ổn định sau 6–12 tháng.' },
      { q: 'GEO (AI Search) khác gì với SEO truyền thống?', a: 'GEO tối ưu để website được trích dẫn trong kết quả AI (ChatGPT, Google AI Overview). yêu cầu structured data rõ ràng và content có authority.' },
      { q: 'Cần cung cấp gì để bắt đầu?', a: 'Access Google Search Console, analytics, và brief về mục tiêu kinh doanh. LETAN sẽ audit miễn phí trước khi đề xuất plan.' },
    ],
    primaryCTA: 'Nhận tư vấn SEO',
    secondaryCTA: 'Xem dự án',
    seo: {
      title: 'Dịch vụ SEO & GEO — Tối ưu tìm kiếm & AI Search | LETAN Media',
      description: 'Dịch vụ SEO và GEO (Generative Engine Optimization) giúp website của bạn được tìm thấy trên Google và AI search. Technical SEO, content architecture, entity SEO.',
      path: '/services/seo-geo',
    },
  },
  {
    slug: 'social-media',
    title: 'Social Media — Vận hành kênh mạng xã hội chuyên nghiệp',
    shortTitle: 'Social Media',
    eyebrow: 'Digital Growth',
    description: 'Quản lý nội dung, vận hành fanpage và phát triển kênh mạng xã hội (TikTok, Facebook, YouTube) với chiến lược nội dung có chủ đích — không phải "post cho có".',
    problem: 'Bạn biết mạng xã hội quan trọng nhưng không có đội ngũ nội dung chuyên nghiệp, không biết nên đăng gì, đăng khi nào, và làm sao để tăng tương tác tự nhiên.',
    outcomes: [
      'Kênh mạng xã hội vận hành đều đặn với nội dung có chiến lược',
      'Tăng tương tác tự nhiên (likes, comments, shares) từ nội dung chất lượng',
      'Xây dựng nhận diện thương hiệu nhất quán qua visual và tone of voice',
      'Chuyển đổi từ tương tác sang khách hàng tiềm năng',
    ],
    capabilities: [
      'Content strategy — chủ đề, format, lịch đăng theo từng nền tảng',
      'Content creation — viết bài, thiết kế graphic, edit video ngắn',
      'Fanpage management — trả lời comment, nhắn tin, quản lý cộng đồng',
      'TikTok content — script, quay, edit video ngắn theo trend',
      'YouTube — planning, SEO title/desc, thumbnail optimization',
      'Brand consistency — visual guideline, tone of voice, posting workflow',
      'Analytics & reporting — theo dõi KPI, đề xuất cải tiến',
    ],
    process: [
      { step: 'Audit', desc: 'Đánh giá kênh hiện tại, đối thủ và cơ hội nội dung.' },
      { step: 'Strategy', desc: 'Xây dựng content calendar, format mix và brand voice.' },
      { step: 'Produce', desc: 'Sản xuất nội dung theo lịch, A/B test format.' },
      { step: 'Optimize', desc: 'Phân tích kết quả, tối ưu posting time và content mix.' },
    ],
    technologies: ['Meta Business Suite', 'TikTok Creator Tools', 'YouTube Studio', 'Canva / Figma', 'Analytics'],
    relatedCases: [],
    relatedSolutions: ['/solutions/digital-growth'],
    faq: [
      { q: 'Social Media service phù hợp với ai?', a: 'Doanh nghiệp muốn xây dựng kênh mạng xã hội chuyên nghiệp nhưng chưa có đội ngũ nội dung in-house, hoặc muốn outsourcing một phần).' },
      { q: 'Bạn có viết content thay chúng tôi không?', a: 'Có. LETAN xây dựng chiến lược nội dung và sản xuất theo lịch — từ caption, hình ảnh đến video ngắn. Bạn duyệt trước khi đăng.' },
      { q: 'Làm sao đo lường hiệu quả?', a: 'Theo dõi follower growth, engagement rate, reach, và conversion. Báo cáo hàng tháng với đề xuất cải tiến.' },
      { q: 'Có hỗ trợ chạy quảng cáo không?', a: 'Social Media service tập trung vào nội dung tự nhiên. Quảng cáo paid là dịch vụ riêng — [Paid Ads](/services/paid-ads).' },
    ],
    primaryCTA: 'Nhận tư vấn Social',
    secondaryCTA: 'Xem dự án',
    seo: {
      title: 'Dịch vụ Social Media — Quản lý & phát triển kênh mạng xã hội | LETAN Media',
      description: 'Dịch vụ quản lý social media: chiến lược nội dung, fanpage, TikTok, YouTube. Xây dựng kênh mạng xã hội chuyên nghiệp với nội dung có chiến lược.',
      path: '/services/social-media',
    },
  },
  {
    slug: 'paid-ads',
    title: 'Paid Ads — Quảng cáo đa nền tảng tối ưu ROI',
    shortTitle: 'Paid Ads',
    eyebrow: 'Digital Growth',
    description: 'Thiết kế, triển khai và tối ưu chiến dịch quảng cáo trên Google Ads, Meta Ads và TikTok Ads — data-driven, tập trung vào conversion và ROAS, không đốt budget.',
    problem: 'Bạn đang chạy quảng cáo nhưng ROAS không đạt kỳ vọng, budget bị lãng phí vào đối tượng không đúng, hoặc không biết cách scale chiến dịch hiệu quả.',
    outcomes: [
      'Tăng conversion và giảm CPA qua tối ưu target Audience',
      'Scale chiến dịch profitable mà không tăng budget proportional',
      'A/B test creative và landing page để cải thiện CTR',
      'Tracking conversion chính xác across platforms',
    ],
    capabilities: [
      'Google Ads — Search, Display, Shopping, Performance Max',
      'Meta Ads — Facebook, Instagram, lead gen, retargeting',
      'TikTok Ads — In-feed, Spark Ads, lead gen',
      'Campaign structure — account hierarchy, naming convention, budget allocation',
      'Tracking — Meta Pixel, Google Tag, conversion API, UTM framework',
      'Creative testing — A/B test headlines, images, videos',
      'Landing page optimization — congruence with ad copy, load speed',
      'Monthly optimization — bid调整, audience refinement, negative keywords',
    ],
    process: [
      { step: 'Audit', desc: 'Phân tích chiến dịch hiện tại, tracking, landing page và budget allocation.' },
      { step: 'Setup', desc: 'Cấu trúc lại account, cài tracking, xây dựng audience framework.' },
      { step: 'Launch', desc: 'Chạy campaign với budget test, A/B test creative và audience.' },
      { step: 'Optimize', desc: 'Tối ưu hàng tuần — bid, audience, creative. Scale profitable campaigns.' },
    ],
    technologies: ['Google Ads', 'Meta Ads Manager', 'TikTok Ads', 'Google Tag Manager', 'GA4', 'Conversion API'],
    relatedCases: [],
    relatedSolutions: ['/solutions/digital-growth'],
    faq: [
      { q: 'Minimum budget để chạy ads hiệu quả?', a: 'Tùy ngành và mục tiêu. LETAN sẽ đề xuất budget phù hợp sau khi audit — không cố ép budget lớn nếu chưa cần thiết.' },
      { q: 'Bạn có cam kết ROAS không?', a: 'Không cam kết số liệu cụ thể vì ROAS phụ thuộc nhiều yếu tố (sản phẩm, giá, đối thủ). LETAN cam kết tối ưu liên tục và minh bạch báo cáo.' },
      { q: 'Có cần landing page riêng không?', a: 'Khuyến nghị có landing page riêng cho mỗi campaign để tăng conversion. LETAN có thể thiết kế nếu cần.' },
      { q: 'Báo cáo như thế nào?', a: 'Báo cáo hàng tuần với số liệu impressions, clicks, conversions, CPA, ROAS. Đề xuất cải tiến mỗi tháng.' },
    ],
    primaryCTA: 'Nhận tư vấn Ads',
    secondaryCTA: 'Xem dự án',
    seo: {
      title: 'Dịch vụ Paid Ads — Google Ads, Meta Ads, TikTok Ads | LETAN Media',
      description: 'Dịch vụ quảng cáo đa nền tảng: Google Ads, Meta Ads, TikTok Ads. Tối ưu ROAS, tracking conversion, A/B test creative. Data-driven, minh bạch.',
      path: '/services/paid-ads',
    },
  },
  {
    slug: 'tiktok-growth',
    title: 'TikTok Growth — Phát triển kênh TikTok bền vững',
    shortTitle: 'TikTok Growth',
    eyebrow: 'Digital Growth',
    description: 'Phát triển kênh TikTok từ strategy đến vận hành: content planning, video production, hashtag strategy, trending analysis và community growth — không mua follow ảo.',
    problem: 'Kênh TikTok của bạn có few followers, video ít view, hoặc không biết cách tận dụng algorithm để tăng reach. Bạn cần chiến lược rõ ràng để phát triển kênh bền vững.',
    outcomes: [
      'Tăng followers và views tự nhiên từ nội dung chất lượng',
      'Xây dựng niche authority trên TikTok trong lĩnh vực của bạn',
      'Tạo hệ thống content pipeline hiệu quả',
      'Chuyển đổi TikTok audience thành khách hàng thực',
    ],
    capabilities: [
      'Content strategy — niche selection, content pillars, posting schedule',
      'Video production — scripting, filming, editing theo format TikTok',
      'Trending analysis — sound trends, hashtag research, format tracking',
      'Hashtag strategy — mix broad + niche + branded hashtags',
      'Analytics — theo dõi views, watch time, follower growth, conversion',
      'Community management — reply comment, duet/stitch strategy',
      'Cross-platform repurpose — đăng lại YouTube Shorts, Instagram Reels',
    ],
    process: [
      { step: 'Audit', desc: 'Phân tích kênh hiện tại, đối thủ, niche opportunities và algorithm signals.' },
      { step: 'Strategy', desc: 'Xây dựng content pillars, posting calendar và growth targets.' },
      { step: 'Produce', desc: 'Sản xuất video theo lịch — script, quay, edit, đăng.' },
      { step: 'Scale', desc: 'Phân tích performance, nhân rộng format hiệu quả, tối ưu posting time.' },
    ],
    technologies: ['TikTok Creator Tools', 'CapCut / Premiere', 'Analytics Dashboard', 'Canva'],
    relatedCases: [],
    relatedSolutions: ['/solutions/digital-growth', '/solutions/brand-trust'],
    faq: [
      { q: 'TikTok Growth khác gì với TikTok Report?', a: 'TikTok Growth tập trung phát triển kênh (content, followers, views). TikTok Report là dịch vụ bảo vệ kênh khi bị vi phạm. Hai dịch vụ bổ trợ nhau.' },
      { q: 'Bạn có cam kết followers không?', a: 'Không cam kết số lượng followers cụ thể. LETAN cam kết chiến lược nội dung đúng đắn và vận hành đều đặn — followers là kết quả của content quality.' },
      { q: 'Cần bao nhiêu video mỗi tuần?', a: 'Tùy niche và mục tiêu. Thường 3–5 video/tuần là optimum cho growth. LETAN sẽ đề xuất sau khi audit.' },
      { q: 'Có cần tôi quay video không?', a: 'Tùy format. Một số video cần bạn xuất hiện, một số có thể làm bằng stock + voiceover. LETAN sẽ tư vấn format phù hợp.' },
    ],
    primaryCTA: 'Nhận tư vấn TikTok',
    secondaryCTA: 'Xem dự án',
    seo: {
      title: 'Dịch vụ TikTok Growth — Phát triển kênh TikTok chuyên nghiệp | LETAN Media',
      description: 'Dịch vụ phát triển kênh TikTok: content strategy, video production, trending analysis, community growth. Phát triển bền vững, không mua follow ảo.',
      path: '/services/tiktok-growth',
    },
  },
  {
    slug: 'platform-protection',
    title: 'Platform Protection — Bảo vệ thương hiệu trên nền tảng số',
    shortTitle: 'Platform Protection',
    eyebrow: 'Brand & Trust',
    description: 'Phát hiện, xử lý và ngăn chặn các hành vi vi phạm trên nền tảng số: mạo danh thương hiệu, vi phạm bản quyền, fake accounts, nội dung gây hại — theo quy trình chuyên nghiệp.',
    problem: 'Thương hiệu của bạn bị mạo danh trên TikTok, YouTube hoặc Facebook. Video giả mạo, tài khoản giả đang gây tổn hại đến danh tiếng và doanh thu của bạn.',
    outcomes: [
      'Gỡ bỏ nội dung vi phạm nhanh chóng theo quy trình platform',
      'Bảo vệ thương hiệu khỏi mạo danh và fake accounts',
      'Ngăn chặn vi phạm tái diễn bằng monitoring hệ thống',
      'Xử lý chuyên nghiệp, minh bạch — không spam report',
    ],
    capabilities: [
      'Impersonation detection — phát hiện tài khoản mạo danh thương hiệu',
      'Copyright protection — DMCA, gỡ video reup, bản quyền nội dung',
      'Trademark enforcement — báo cáo vi phạm nhãn hiệu trên各platform',
      'Fake account removal — xử lý tài khoản giả mạo',
      'Harmful content — gỡ nội dung vu khống, bôi nhọ, sai sự thật',
      'Policy violation reporting — đệ trình report chuẩn platform guidelines',
      'Evidence preparation — thu thập chứng cứ số, metadata, timestamps',
      'Platform escalation — khi report thường không xử lý, escalate lên higher tier',
    ],
    process: [
      { step: 'Assess', desc: 'Đánh giá mức độ vi phạm, loại vi phạm và platform phù hợp.' },
      { step: 'Document', desc: 'Thu thập chứng cứ, soạn hồ sơ báo cáo chuẩn platform requirements.' },
      { step: 'Report', desc: 'Đệ trình report chính thức lên platform, theo dõi tiến độ.' },
      { step: 'Monitor', desc: 'Giám sát sau khi xử lý, phát hiện vi phạm tái diễn.' },
    ],
    technologies: ['TikTok Trust & Safety', 'YouTube CMS', 'Meta IP Manager', 'Evidence Collection Tools', 'Monitoring Dashboard'],
    relatedCases: ['tiktok-protection', 'youtube-defense'],
    relatedSolutions: ['/solutions/platform-protection', '/solutions/brand-trust'],
    faq: [
      { q: 'Bao lâu thì vi phạm được gỡ bỏ?', a: 'Tùy platform và loại vi phạm. Thông thường 3–15 ngày cho report chuẩn. Trường hợp phức tạp có thể lâu hơn — LETAN sẽ cập nhật tiến độ.' },
      { q: 'Bạn có cam kết gỡ bỏ 100% không?', a: 'Không cam kết kết quả vì platform quyết định cuối cùng. LETAN cam kết quy trình chuyên nghiệp, đệ trình đúng chuẩn và theo dõi đến khi có kết quả.' },
      { q: 'Chi phí như thế nào?', a: 'Tùy loại vi phạm và số lượng. LETAN đánh giá miễn phí trước khi báo giá — bạn chỉ trả khi đồng ý triển khai.' },
      { q: 'Có cần cung cấp thông tin gì?', a: 'URL vi phạm, bằng chứng bạn là chủ sở hữu hợp pháp (business license, trademark certificate nếu có), và mô tả ngắn gọn về tình huống.' },
    ],
    primaryCTA: 'Yêu cầu đánh giá',
    secondaryCTA: 'Xem dự án',
    seo: {
      title: 'Dịch vụ Platform Protection — Bảo vệ thương hiệu số | LETAN Media',
      description: 'Bảo vệ thương hiệu trên nền tảng số: xử lý mạo danh, vi phạm bản quyền, fake accounts, nội dung gây hại. Quy trình chuyên nghiệp, minh bạch.',
      path: '/services/platform-protection',
    },
  },
  {
    slug: 'chatbot-ai',
    title: 'Chatbot AI — Triển khai trợ lý AI cho doanh nghiệp',
    shortTitle: 'Chatbot AI',
    eyebrow: 'AI Automation',
    description: 'Triển khai chatbot AI tư vấn và CSKH 24/7 cho doanh nghiệp: từ tư vấn ban đầu, build knowledge base, tích hợp đa kênh (Messenger, Zalo, Website) đến monitoring và tối ưu.',
    problem: 'Doanh nghiệp mất nhân sự tư vấn, phản hồi chậm vào giờ cao điểm, không có hệ thống đo lường hiệu quả CSKH, và khách hàng tiềm năng bị mất vì phản hồi muộn.',
    outcomes: [
      'Phản hồi khách hàng tức thì 24/7 không cần nhân sự',
      'Tự động điều hướng khách hàng đến đúng dịch vụ/sản phẩm',
      'Thu thập dữ liệu khách hàng và phân tích hành vi',
      'Giảm tải cho đội ngũ CSKH với các câu hỏi thường gặp',
    ],
    capabilities: [
      'Tư vấn chatbot — xác định use case, flow hội thoại và integrations',
      'Knowledge base — xây dựng cơ sở kiến thức cho AI từ tài liệu doanh nghiệp',
      'Multi-channel deployment — Messenger, Telegram, Zalo, Website widget',
      'CRM/API integration — kết nối hệ thống quản lý khách hàng hiện tại',
      'Automation workflow — tự động gửi email, tạo ticket, điều hướng',
      'Monitoring & analytics — dashboard theo dõi conversations, conversion',
      'Training & handoff — training đội ngũ vận hành và escalation to human',
    ],
    process: [
      { step: 'Consult', desc: 'Phân tích nghiệp vụ, xác định flow hội thoại và tích hợp cần thiết.' },
      { step: 'Build', desc: 'Xây dựng knowledge base, train AI model, cấu hình multi-channel.' },
      { step: 'Deploy', desc: 'Triển khai lên các kênh, test end-to-end, launch soft.' },
      { step: 'Optimize', desc: 'Theo dõi conversations, cải tiến responses, mở rộng功能.' },
    ],
    technologies: ['LLM (GPT/Claude)', 'Messenger API', 'Telegram Bot', 'Zalo OA', 'Cloudflare Workers', 'React Widget'],
    relatedCases: ['chatbot-ai-multichannel', 'letanmedia-website'],
    relatedSolutions: ['/solutions/ai-automation'],
    faq: [
      { q: 'Chatbot AI service khác gì với sản phẩm Chatbot AI hiện tại?', a: 'Sản phẩm (/chatbot-ai) là demo chatbot có sẵn. Service là tư vấn + triển khai chatbot tùy chỉnh cho doanh nghiệp bạn — với knowledge base riêng, flow riêng và tích hợp hệ thống.' },
      { q: 'Triển khai bao lâu?', a: 'Chatbot cơ bản: 1–2 tuần. Chatbot phức tạp với tích hợp CRM/API: 3–6 tuần. LETAN sẽ đánh giá và đề xuất timeline sau khi tư vấn.' },
      { q: 'AI có trả lời sai không?', a: 'Có thể xảy ra. LETAN thiết kế escalation flow — khi AI không chắc chắn, chuyển sang nhân sự. Bạn cũng có thể cập nhật knowledge base để cải tiến responses.' },
      { q: 'Cần cung cấp gì?', a: 'Tài liệu về sản phẩm/dịch vụ, FAQ hiện tại (nếu có), và thông tin tích hợp hệ thống (CRM, ticketing).' },
    ],
    primaryCTA: 'Nhận tư vấn Chatbot',
    secondaryCTA: 'Xem demo',
    seo: {
      title: 'Dịch vụ Chatbot AI — Triển khai trợ lý AI cho doanh nghiệp | LETAN Media',
      description: 'Triển khai chatbot AI tư vấn và CSKH 24/7: Messenger, Zalo, Website. Knowledge base tùy chỉnh, CRM integration, monitoring dashboard.',
      path: '/services/chatbot-ai',
    },
  },
  {
    slug: 'website-development',
    title: 'Website Development — Thiết kế & lập trình website chuyên nghiệp',
    shortTitle: 'Website Development',
    eyebrow: 'Web & Software',
    description: 'Thiết kế và lập trình website doanh nghiệp, landing page, web application — tốc độ cao, chuẩn SEO, UI/UX premium. Từ corporate site đến complex web app.',
    problem: 'Bạn cần website mới hoặc redesign website cũ — nhưng không muốn templategeneric, cần website phản ánh đúng positioning thương hiệu, tải nhanh và convert tốt.',
    outcomes: [
      'Website chuyên nghiệp, phản ánh đúng brand positioning',
      'Tốc độ tải nhanh (Core Web Vitals tốt) — tốt cho SEO và UX',
      'Responsive design — hoạt động mượt trên mọi thiết bị',
      'SEO-ready architecture — semantic HTML, structured data, meta tags',
    ],
    capabilities: [
      'Corporate website — trang giới thiệu, dịch vụ, blog, liên hệ',
      'Landing page — conversion-focused, A/B test ready',
      'Web application — dashboard, portal, SaaS frontend',
      'API integration — kết nối CRM, payment, third-party services',
      'Performance optimization — lazy load, code split, image optimization',
      'SEO-ready architecture — semantic HTML, meta tags, structured data',
      'Analytics integration — GA4, conversion tracking, heatmaps',
      'Deployment — Cloudflare Pages, Vercel, hoặc VPS theo yêu cầu',
    ],
    process: [
      { step: 'Discover', desc: 'Phân tích yêu cầu, đối tượng mục tiêu và competitors.' },
      { step: 'Design', desc: 'Wireframe, mockup UI/UX, brand alignment review.' },
      { step: 'Develop', desc: 'Lập trình responsive, tích hợp CMS/API, optimize performance.' },
      { step: 'Launch', desc: 'Testing, deploy, analytics setup, handoff documentation.' },
    ],
    technologies: ['React / Next.js / Vite', 'Tailwind CSS', 'Cloudflare Pages', 'Headless CMS', 'Node.js'],
    relatedCases: ['letanmedia-website'],
    relatedSolutions: ['/solutions/web-software'],
    faq: [
      { q: 'Website development phù hợp với loại hình nào?', a: 'Mọi doanh nghiệp cần website: corporate site, landing page cho campaign, web app nội bộ, hoặc SaaS frontend. LETAN tư vấn giải pháp phù hợp với budget và mục tiêu.' },
      { q: 'Bạn dùng công nghệ gì?', a: 'Tùy yêu cầu: React/Vite cho SPA nhanh, Next.js cho SSR/SSG cần SEO mạnh, hoặc static site cho landing page. Luôn tối ưu performance và SEO.' },
      { q: 'Có hỗ trợ hosting và maintenance không?', a: 'Có. LETAN deploy lên Cloudflare Pages hoặc Vercel (miễn phí tier phù hợp nhiều case). Maintenance và updates theo tháng nếu cần.' },
      { q: 'Thời gian hoàn thành?', a: 'Landing page: 1–2 tuần. Corporate website: 3–6 tuần. Web app phức tạp: 6–12 tuần. Timeline cụ thể sau khi discovery.' },
    ],
    primaryCTA: 'Nhận tư vấn Web',
    secondaryCTA: 'Xem dự án',
    seo: {
      title: 'Dịch vụ Website Development — Thiết kế & lập trình website | LETAN Media',
      description: 'Thiết kế và lập trình website doanh nghiệp, landing page, web app. React/Next.js, chuẩn SEO, UI/UX premium, performance tối ưu.',
      path: '/services/website-development',
    },
  },
];

/**
 * Get all services.
 */
export function getAllServices() {
  return SERVICES;
}

/**
 * Get a single service by slug. Returns null if not found.
 */
export function getServiceBySlug(slug) {
  return SERVICES.find((s) => s.slug === slug) || null;
}

/**
 * Get service slugs for route generation.
 */
export function getServiceSlugs() {
  return SERVICES.map((s) => s.slug);
}
