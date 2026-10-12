import React, { useEffect, useState, useMemo, useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Search,
  Check,
  Copy,
  Share2,
  Printer,
  ChevronDown,
  ChevronRight,
  ArrowUp,
  ExternalLink,
  Clock,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  Send,
  Globe,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  Layers,
  Scale
} from 'lucide-react';
import V2PageHeader from './V2PageHeader';
import V2PageFooter from './V2PageFooter';
import './TermsOfService.css';

// Lazy load 3D scene to keep initial paint instantaneous
const TermsHero3D = lazy(() => import('./terms/TermsHero3D'));

const UPDATE_DATE = 'Cập nhật lần cuối: Tháng 07/2026';
const EFFECTIVE_VERSION = 'Phiên bản 2.4 · Có hiệu lực chính thức';
const READ_TIME = '~6 phút đọc';
const JURISDICTION = 'Cộng hòa Xã hội Chủ nghĩa Việt Nam';

const INTRO =
  'Chào mừng bạn đến với LETAN Media. Điều khoản Dịch vụ (“Điều khoản”) này quy định các quyền, nghĩa vụ và điều kiện sử dụng dịch vụ giữa LETAN Media (“LETAN Media”, “chúng tôi”) và khách hàng (“bạn”). Điều khoản áp dụng đối với tất cả sản phẩm, giải pháp và dịch vụ do LETAN Media cung cấp thông qua website, ứng dụng, chatbot hoặc các kênh liên hệ chính thức. Việc truy cập website hoặc sử dụng bất kỳ dịch vụ nào của LETAN Media đồng nghĩa với việc bạn đã đọc, hiểu và đồng ý tuân thủ toàn bộ Điều khoản này.';

const SECTIONS = [
  {
    title: '1. Phạm Vi Áp Dụng',
    summary: 'Phạm vi hiệu lực và quy định bổ sung đối với các dịch vụ chuyên biệt.',
    items: [
      'Điều khoản này áp dụng đối với toàn bộ sản phẩm, dịch vụ và giải pháp do LETAN Media cung cấp.',
      'Đối với một số dịch vụ đặc thù, LETAN Media có thể ban hành thêm các điều kiện hoặc quy định riêng. Các điều kiện này sẽ được thông báo trước khi triển khai và được xem là một phần của Điều khoản Dịch vụ.'
    ]
  },
  {
    title: '2. Dịch Vụ Cung Cấp',
    summary: 'Hệ sinh thái giải pháp công nghệ, truyền thông số và bảo vệ nền tảng.',
    isServicesSection: true,
    items: [
      'LETAN Media cung cấp các giải pháp trong nhiều lĩnh vực công nghệ, truyền thông và nền tảng số, bao gồm nhưng không giới hạn:',
      '• Phát triển website và phần mềm.',
      '• Giải pháp AI và tự động hóa.',
      '• Thiết kế đồ họa và nhận diện thương hiệu.',
      '• Sản xuất nội dung số.',
      '• Quảng cáo và truyền thông.',
      '• Bảo vệ thương hiệu.',
      '• Hỗ trợ bản quyền, nhãn hiệu và quyền sở hữu trí tuệ.',
      '• Hỗ trợ tài khoản trên các nền tảng số.',
      '• Các dịch vụ khác do LETAN Media cung cấp theo từng thời kỳ.',
      'Thông tin chi tiết về từng dịch vụ sẽ được trao đổi trong quá trình tư vấn.'
    ]
  },
  {
    title: '3. Điều Kiện Sử Dụng Dịch Vụ',
    summary: 'Yêu cầu năng lực pháp lý, tính trung thực dữ liệu và chuẩn mực hợp tác.',
    items: [
      'Khi sử dụng dịch vụ của LETAN Media, khách hàng cam kết:',
      '• Có đầy đủ năng lực pháp lý để thực hiện giao dịch.',
      '• Cung cấp thông tin chính xác, đầy đủ và trung thực.',
      '• Có quyền hợp pháp đối với tài khoản, dữ liệu, nội dung hoặc tài liệu cung cấp cho LETAN Media.',
      '• Không sử dụng dịch vụ vào mục đích vi phạm pháp luật hoặc xâm phạm quyền, lợi ích hợp pháp của tổ chức, cá nhân khác.',
      '• Hợp tác với LETAN Media trong quá trình triển khai dịch vụ.',
      'LETAN Media có quyền từ chối cung cấp dịch vụ nếu phát hiện dấu hiệu vi phạm pháp luật hoặc Điều khoản này.'
    ]
  },
  {
    title: '4. Quy Trình Cung Cấp Dịch Vụ',
    summary: 'Chuẩn quy trình 7 bước từ tiếp nhận, lập phương án đến nghiệm thu bàn giao.',
    isProcessSection: true,
    items: [
      'Tùy theo từng loại dịch vụ, quy trình triển khai có thể khác nhau.',
      'Thông thường bao gồm:',
      '• 1. Tiếp nhận yêu cầu.',
      '• 2. Tư vấn và đánh giá phương án phù hợp.',
      '• 3. Báo giá và thống nhất phạm vi công việc.',
      '• 4. Xác nhận triển khai.',
      '• 5. Thực hiện dịch vụ.',
      '• 6. Cập nhật tiến độ khi cần thiết.',
      '• 7. Bàn giao kết quả hoặc hoàn thành dịch vụ.'
    ]
  },
  {
    title: '5. Báo Giá Và Thanh Toán',
    summary: 'Tính minh bạch tài chính, kênh thanh toán chính thức và chi phí phát sinh.',
    isNoticeSection: true,
    noticeType: 'payment',
    items: [
      'Giá dịch vụ được thông báo và thống nhất với khách hàng trước khi triển khai.',
      'Khách hàng có trách nhiệm:',
      '• Kiểm tra chính xác thông tin thanh toán.',
      '• Thanh toán đúng theo thỏa thuận.',
      '• Chỉ thực hiện giao dịch qua các kênh chính thức của LETAN Media.',
      'Trong trường hợp có phát sinh ngoài phạm vi công việc ban đầu, LETAN Media sẽ trao đổi và thống nhất với khách hàng trước khi thực hiện.'
    ]
  },
  {
    title: '6. Hủy Dịch Vụ Và Hoàn Tiền',
    summary: 'Chính sách hoàn phí minh bạch căn cứ trên khối lượng công việc thực tế.',
    isNoticeSection: true,
    noticeType: 'refund',
    items: [
      'Khách hàng có thể yêu cầu hủy dịch vụ trước khi LETAN Media bắt đầu triển khai.',
      'Đối với các dịch vụ đã được thực hiện hoặc đang trong quá trình triển khai, việc hoàn tiền (nếu có) sẽ được xem xét theo từng trường hợp, căn cứ vào khối lượng công việc đã hoàn thành và các thỏa thuận giữa hai bên.',
      'Các chi phí đã phát sinh hoặc các phần công việc đã hoàn thành có thể không thuộc phạm vi được hoàn lại.'
    ]
  },
  {
    title: '7. Quyền Và Nghĩa Vụ Của Khách Hàng',
    summary: 'Minh bạch quyền được tư vấn, theo dõi tiến độ và trách nhiệm đối soát.',
    items: [
      'Khách hàng có quyền:',
      '• Được tư vấn đầy đủ về dịch vụ.',
      '• Được cung cấp thông tin về tiến độ thực hiện.',
      '• Được hỗ trợ trong phạm vi dịch vụ đã thỏa thuận.',
      'Khách hàng có nghĩa vụ:',
      '• Cung cấp thông tin và tài liệu cần thiết.',
      '• Chịu trách nhiệm về tính hợp pháp của thông tin đã cung cấp.',
      '• Thanh toán đúng thời hạn.',
      '• Phối hợp với LETAN Media trong quá trình triển khai dịch vụ.'
    ]
  },
  {
    title: '8. Quyền Và Nghĩa Vụ Của LETAN Media',
    summary: 'Cam kết tính bảo mật, thiện chí nghề nghiệp và chuẩn chất lượng triển khai.',
    items: [
      'LETAN Media có trách nhiệm:',
      '• Cung cấp dịch vụ theo phạm vi đã thống nhất.',
      '• Thực hiện công việc với tinh thần chuyên nghiệp và thiện chí.',
      '• Thông báo khi có thay đổi ảnh hưởng đến tiến độ hoặc phạm vi công việc.',
      '• Bảo mật thông tin khách hàng theo Chính sách Quyền riêng tư.',
      'LETAN Media có quyền:',
      '• Yêu cầu khách hàng cung cấp các thông tin cần thiết để triển khai dịch vụ.',
      '• Từ chối hoặc tạm ngừng cung cấp dịch vụ trong các trường hợp vi phạm Điều khoản.',
      '• Điều chỉnh quy trình làm việc nhằm nâng cao chất lượng dịch vụ.'
    ]
  },
  {
    title: '9. Giới Hạn Trách Nhiệm',
    summary: 'Phạm vi giới hạn đối với thuật toán nền tảng, bên thứ ba và sự kiện bất khả kháng.',
    items: [
      'LETAN Media luôn nỗ lực triển khai dịch vụ theo đúng phạm vi và tiến độ đã thống nhất.',
      'Tuy nhiên, kết quả của một số dịch vụ có thể chịu ảnh hưởng bởi các yếu tố nằm ngoài khả năng kiểm soát của LETAN Media, bao gồm nhưng không giới hạn:',
      '• Chính sách hoặc thuật toán của các nền tảng.',
      '• Quyết định của cơ quan có thẩm quyền.',
      '• Hành vi của bên thứ ba.',
      '• Sự cố kỹ thuật.',
      '• Sự kiện bất khả kháng.',
      'Trong phạm vi pháp luật cho phép, LETAN Media không chịu trách nhiệm đối với các thiệt hại phát sinh từ những yếu tố nằm ngoài khả năng kiểm soát hợp lý của mình.',
      'Nếu pháp luật có quy định khác, trách nhiệm của LETAN Media (nếu có) sẽ không vượt quá giá trị dịch vụ mà khách hàng đã thanh toán cho dịch vụ phát sinh tranh chấp.'
    ]
  },
  {
    title: '10. Quyền Sở Hữu Trí Tuệ',
    summary: 'Bảo hộ bản quyền thương hiệu, quy trình tác nghiệp, thiết kế và mã nguồn phần mềm.',
    items: [
      'Toàn bộ nội dung, thương hiệu, logo, hình ảnh, thiết kế, quy trình, mã nguồn, tài liệu và các sản phẩm trí tuệ do LETAN Media tạo ra thuộc quyền sở hữu của LETAN Media hoặc chủ sở hữu hợp pháp.',
      'Mọi hành vi sao chép, sửa đổi, phân phối hoặc sử dụng cho mục đích thương mại khi chưa có sự chấp thuận bằng văn bản đều không được phép.'
    ]
  },
  {
    title: '11. Chính Sách Quyền Riêng Tư',
    summary: 'Xử lý và bảo vệ dữ liệu cá nhân theo chính sách bảo mật chuyên biệt.',
    isPrivacySection: true,
    items: [
      'Việc thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân của khách hàng được thực hiện theo Chính sách Quyền riêng tư của LETAN Media.',
      'Chính sách Quyền riêng tư là một phần không tách rời của Điều khoản Dịch vụ này.'
    ]
  },
  {
    title: '12. Thay Đổi Điều Khoản',
    summary: 'Quy trình cập nhật phiên bản mới và thời điểm phát sinh hiệu lực.',
    items: [
      'LETAN Media có quyền sửa đổi hoặc cập nhật Điều khoản Dịch vụ khi cần thiết nhằm phù hợp với hoạt động kinh doanh hoặc quy định của pháp luật.',
      'Phiên bản mới sẽ được công bố trên website và có hiệu lực kể từ thời điểm đăng tải.'
    ]
  },
  {
    title: '13. Luật Áp Dụng Và Giải Quyết Tranh Chấp',
    summary: 'Thẩm quyền tài phán theo pháp luật Việt Nam và cơ chế thương lượng thiện chí.',
    items: [
      'Điều khoản này được điều chỉnh theo pháp luật Việt Nam.',
      'Mọi tranh chấp phát sinh sẽ được ưu tiên giải quyết thông qua thương lượng và hòa giải trên tinh thần hợp tác giữa các bên.',
      'Trường hợp không đạt được thỏa thuận, tranh chấp sẽ được giải quyết theo quy định của pháp luật Việt Nam tại cơ quan nhà nước có thẩm quyền.'
    ]
  },
  {
    title: '14. Thông Tin Liên Hệ',
    summary: 'Kênh tiếp nhận chính thức hỗ trợ khách hàng và giải quyết vướng mắc pháp lý.',
    isContactSection: true,
    items: [
      'Nếu có bất kỳ câu hỏi hoặc yêu cầu nào liên quan đến Điều khoản Dịch vụ, vui lòng liên hệ:',
      'LETAN Media',
      '• Hotline/Zalo: 0765 178 999',
      '• Telegram: @Tanlemedia',
      '• Email: infor@letanmedia.me',
      '• Website: letanmedia.me'
    ]
  }
];

const formatNumber = (num) => String(num).padStart(2, '0');

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const searchInputRef = useRef(null);

  // Show toast notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2800);
  };

  // Scroll spy & reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollY / docHeight) * 100))) : 0;
      setReadingProgress(progress);
      setShowBackToTop(scrollY > 480);

      // Detect active section based on document bounding rect
      const triggerY = scrollY + 160;
      let current = 0;
      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(`tos-section-${i}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + scrollY;
          if (top <= triggerY) {
            current = i;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (index) => {
    const el = document.getElementById(`tos-section-${index}`);
    if (el) {
      const headerOffset = 100;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(index);
      setMobileTocOpen(false);
    }
  };

  // Copy section anchor link
  const handleCopySectionLink = (index, title) => {
    const url = `${window.location.origin}${window.location.pathname}#tos-section-${index}`;
    navigator.clipboard.writeText(url).then(() => {
      showToast(`Đã sao chép liên kết: ${title}`);
    }).catch(() => {
      showToast('Đã sao chép liên kết mục.');
    });
  };

  // Copy full page URL
  const handleSharePage = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast('Đã sao chép liên kết trang Điều khoản.');
    }).catch(() => {
      showToast('Đã sao chép liên kết.');
    });
  };

  // Print document
  const handlePrint = () => {
    window.print();
  };

  // Filter sections based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return SECTIONS;
    const query = searchQuery.toLowerCase().trim();
    return SECTIONS.filter((s) => {
      const titleMatch = s.title.toLowerCase().includes(query);
      const summaryMatch = s.summary && s.summary.toLowerCase().includes(query);
      const contentMatch = s.items.some((item) => item.toLowerCase().includes(query));
      return titleMatch || summaryMatch || contentMatch;
    });
  }, [searchQuery]);

  // Section 2: Capability cards data
  const serviceBadges = [
    { title: 'Phát triển website & phần mềm', href: '/work', tag: 'Web & App' },
    { title: 'Giải pháp AI & tự động hóa', href: '/chatbot-ai', tag: 'AI Systems' },
    { title: 'Bảo vệ thương hiệu & Platform', href: '/tiktok-report', tag: 'Protection' },
    { title: 'Report vi phạm YouTube & TikTok', href: '/youtube-report', tag: 'Enforcement' },
    { title: 'Thiết kế đồ họa & nhận diện', tag: 'Design' },
    { title: 'Sản xuất nội dung số', tag: 'Media' },
    { title: 'Quảng cáo & truyền thông số', tag: 'Growth' },
    { title: 'Bản quyền, nhãn hiệu & SHTT', tag: 'Intellectual Property' },
    { title: 'Hỗ trợ tài khoản trên nền tảng số', tag: 'Platforms' }
  ];

  // Section 4: Workflow steps
  const workflowSteps = [
    { num: '01', title: 'Tiếp nhận yêu cầu', desc: 'Ghi nhận chi tiết bài toán, thông tin tài khoản hoặc mục tiêu dự án.' },
    { num: '02', title: 'Tư vấn & thẩm định', desc: 'Phân tích tính khả thi, đánh giá thuật toán và đề xuất phương án tối ưu.' },
    { num: '03', title: 'Báo giá & phạm vi', desc: 'Thống nhất ngân sách, thời hạn hoàn thành và tiêu chí nghiệm thu rõ ràng.' },
    { num: '04', title: 'Xác nhận triển khai', desc: 'Ký kết thỏa thuận hoặc xác nhận chính thức trước khi bắt đầu công việc.' },
    { num: '05', title: 'Thực thi dịch vụ', desc: 'Đội ngũ chuyên môn LETAN Media tiến hành xử lý kỹ thuật hoặc sản xuất.' },
    { num: '06', title: 'Cập nhật tiến độ', desc: 'Báo cáo hiện trạng thường xuyên qua kênh trao đổi chính thức (Telegram/Zalo).' },
    { num: '07', title: 'Bàn giao & hỗ trợ', desc: 'Bàn giao kết quả hoàn tất, đối soát dữ liệu và duy trì chính sách bảo hành.' }
  ];

  // Custom renderer for section body
  const renderSectionBody = (section) => {
    // 1. Specialized: Section 2 (Dịch vụ cung cấp)
    if (section.isServicesSection) {
      return (
        <div className="tos-section-special">
          <p className="tos-paragraph">{section.items[0]}</p>
          <div className="tos-services-grid">
            {serviceBadges.map((svc, i) => (
              <div key={i} className="tos-service-card">
                <div className="tos-service-card__top">
                  <span className="tos-service-card__tag">{svc.tag}</span>
                  {svc.href && (
                    <Link to={svc.href} className="tos-service-card__link" title="Xem chi tiết">
                      <ArrowUpRight size={14} />
                    </Link>
                  )}
                </div>
                <div className="tos-service-card__title">{svc.title}</div>
              </div>
            ))}
          </div>
          <p className="tos-paragraph tos-paragraph--muted" style={{ marginTop: '16px' }}>
            {section.items[section.items.length - 1]}
          </p>
        </div>
      );
    }

    // 2. Specialized: Section 4 (Quy trình)
    if (section.isProcessSection) {
      return (
        <div className="tos-section-special">
          <p className="tos-paragraph">{section.items[0]}</p>
          <div className="tos-process-flow">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="tos-process-item">
                <div className="tos-process-item__num">{step.num}</div>
                <div className="tos-process-item__content">
                  <h4 className="tos-process-item__title">{step.title}</h4>
                  <p className="tos-process-item__desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 3. Specialized: Section 11 (Chính sách quyền riêng tư)
    if (section.isPrivacySection) {
      return (
        <div className="tos-section-special">
          <p className="tos-paragraph">{section.items[0]}</p>
          <p className="tos-paragraph">{section.items[1]}</p>
          <div className="tos-privacy-cta-box">
            <div className="tos-privacy-cta-box__info">
              <ShieldCheck className="tos-privacy-icon" size={24} />
              <div>
                <strong>Chính Sách Bảo Mật & Quyền Riêng Tư</strong>
                <p>Xem toàn bộ quy chế thu thập, mã hóa và bảo vệ dữ liệu khách hàng.</p>
              </div>
            </div>
            <Link to="/policy" className="tos-cta-button tos-cta-button--outline">
              <span>Đọc chính sách bảo mật</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      );
    }

    // 4. Specialized: Section 14 (Thông tin liên hệ)
    if (section.isContactSection) {
      return (
        <div className="tos-section-special">
          <p className="tos-paragraph">{section.items[0]}</p>
          <div className="tos-contact-grid">
            <a href="tel:0765178999" className="tos-contact-card" title="Gọi Hotline">
              <div className="tos-contact-card__icon">
                <Phone size={20} />
              </div>
              <div className="tos-contact-card__info">
                <span className="tos-contact-card__label">Hotline & Zalo</span>
                <span className="tos-contact-card__val">0765 178 999</span>
              </div>
              <ArrowUpRight size={16} className="tos-contact-card__arrow" />
            </a>

            <a
              href="https://t.me/Tanlemedia"
              target="_blank"
              rel="noopener noreferrer"
              className="tos-contact-card"
              title="Nhắn Telegram"
            >
              <div className="tos-contact-card__icon tos-contact-card__icon--tg">
                <Send size={20} />
              </div>
              <div className="tos-contact-card__info">
                <span className="tos-contact-card__label">Telegram Hỗ Trợ</span>
                <span className="tos-contact-card__val">@Tanlemedia</span>
              </div>
              <ExternalLink size={16} className="tos-contact-card__arrow" />
            </a>

            <a href="mailto:infor@letanmedia.me" className="tos-contact-card" title="Gửi Email">
              <div className="tos-contact-card__icon tos-contact-card__icon--mail">
                <Mail size={20} />
              </div>
              <div className="tos-contact-card__info">
                <span className="tos-contact-card__label">Hòm Thư Điện Tử</span>
                <span className="tos-contact-card__val">infor@letanmedia.me</span>
              </div>
              <ArrowUpRight size={16} className="tos-contact-card__arrow" />
            </a>

            <Link to="/" className="tos-contact-card" title="Về Trang Chủ">
              <div className="tos-contact-card__icon tos-contact-card__icon--web">
                <Globe size={20} />
              </div>
              <div className="tos-contact-card__info">
                <span className="tos-contact-card__label">Website Chính Thức</span>
                <span className="tos-contact-card__val">letanmedia.me</span>
              </div>
              <ArrowUpRight size={16} className="tos-contact-card__arrow" />
            </Link>
          </div>
        </div>
      );
    }

    // Default Section items renderer
    const result = [];
    let currentList = [];

    section.items.forEach((item, index) => {
      const trimmed = item.trim();
      if (trimmed.startsWith('•')) {
        currentList.push(trimmed.replace(/^•\s*/, ''));
        return;
      }

      if (currentList.length > 0) {
        result.push(
          <ul key={`list-${index}`} className="tos-list">
            {currentList.map((text, i) => (
              <li key={i} className="tos-list__item">
                <span className="tos-list__bullet" aria-hidden="true" />
                <span className="tos-list__text">{text}</span>
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }

      result.push(
        <p key={`p-${index}`} className="tos-paragraph">
          {item}
        </p>
      );
    });

    if (currentList.length > 0) {
      result.push(
        <ul key="list-end" className="tos-list">
          {currentList.map((text, i) => (
            <li key={i} className="tos-list__item">
              <span className="tos-list__bullet" aria-hidden="true" />
              <span className="tos-list__text">{text}</span>
            </li>
          ))}
        </ul>
      );
    }

    return result;
  };

  return (
    <div className="tos-page">
      {/* Shared V2 Header (Homepage intact) */}
      <V2PageHeader overlay inverse />

      {/* Hero Section */}
      <header className="tos-hero">
        {/* Interactive 3D Legal & Security Lattice */}
        <Suspense fallback={<div className="tos-hero-3d__fallback" />}>
          <TermsHero3D />
        </Suspense>

        <div className="tos-hero__inner">
          {/* Breadcrumb Navigation */}
          <nav className="tos-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="tos-breadcrumb__link">
              Trang chủ
            </Link>
            <span className="tos-breadcrumb__separator" aria-hidden="true">/</span>
            <span className="tos-breadcrumb__current">Điều khoản dịch vụ</span>
          </nav>

          {/* Eyebrow Label */}
          <div className="tos-hero__badge">
            <span className="tos-hero__badge-dot" aria-hidden="true" />
            <span className="tos-hero__badge-text">LETAN MEDIA · PHÁP LÝ & BẢO VỆ NỀN TẢNG</span>
          </div>

          {/* Main Title */}
          <h1 className="tos-hero__title">
            ĐIỀU KHOẢN <span className="tos-hero__title-accent">DỊCH VỤ</span>
          </h1>

          {/* Subtitle */}
          <p className="tos-hero__subtitle">
            Quy định quyền lợi, nghĩa vụ pháp lý và chuẩn mực hợp tác giữa LETAN Media và khách hàng khi sử dụng hệ sinh thái giải pháp AI, truyền thông số và phần mềm.
          </p>

          {/* Metadata Badges */}
          <div className="tos-meta-chips">
            <div className="tos-meta-chip">
              <Calendar size={14} className="tos-meta-chip__icon" />
              <span>{UPDATE_DATE}</span>
            </div>
            <div className="tos-meta-chip">
              <ShieldCheck size={14} className="tos-meta-chip__icon" />
              <span>{EFFECTIVE_VERSION}</span>
            </div>
            <div className="tos-meta-chip">
              <Clock size={14} className="tos-meta-chip__icon" />
              <span>{READ_TIME}</span>
            </div>
            <div className="tos-meta-chip">
              <Scale size={14} className="tos-meta-chip__icon" />
              <span>{JURISDICTION}</span>
            </div>
          </div>

          {/* Executive Intro Statement */}
          <div className="tos-hero__callout">
            <div className="tos-hero__callout-header">
              <Sparkles size={16} className="tos-hero__callout-sparkle" />
              <span className="tos-hero__callout-title">Thông Điệp Cam Kết Minh Bạch</span>
            </div>
            <p className="tos-hero__intro">{INTRO}</p>
          </div>

          {/* Action Toolbar */}
          <div className="tos-toolbar">
            <div className="tos-search-box">
              <Search size={16} className="tos-search-box__icon" />
              <input
                ref={searchInputRef}
                type="text"
                className="tos-search-box__input"
                placeholder="Tìm kiếm điều khoản (ví dụ: hoàn tiền, thanh toán, bản quyền, bảo hành...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Tìm kiếm nội dung điều khoản"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="tos-search-box__clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Xóa tìm kiếm"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="tos-toolbar__actions">
              <button
                type="button"
                className="tos-action-btn"
                onClick={handlePrint}
                title="In hoặc lưu file PDF điều khoản"
              >
                <Printer size={15} />
                <span>In / Lưu PDF</span>
              </button>
              <button
                type="button"
                className="tos-action-btn"
                onClick={handleSharePage}
                title="Sao chép liên kết trang điều khoản"
              >
                <Share2 size={15} />
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Document Body */}
      <main className="tos-body" id="terms-content">
        <div className="tos-body__inner">
          {/* Desktop Sticky Table of Contents */}
          <aside className="tos-toc" aria-label="Mục lục điều khoản">
            <div className="tos-toc__wrapper">
              <div className="tos-toc__header">
                <div className="tos-toc__title-row">
                  <Layers size={15} className="tos-toc__title-icon" />
                  <h2 className="tos-toc__title">Mục Lục Văn Bản</h2>
                </div>
                <div className="tos-toc__progress-indicator">
                  <span className="tos-toc__progress-text">Đã đọc {readingProgress}%</span>
                  <div className="tos-toc__progress-bar">
                    <div
                      className="tos-toc__progress-fill"
                      style={{ width: `${readingProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {searchQuery && (
                <div className="tos-toc__filter-info">
                  Khớp {filteredSections.length} / {SECTIONS.length} điều khoản
                </div>
              )}

              <nav className="tos-toc__nav">
                <ul className="tos-toc__list">
                  {filteredSections.map((section) => {
                    const originalIndex = SECTIONS.findIndex((s) => s.title === section.title);
                    const cleanTitle = section.title.replace(/^\d+\.\s*/, '');
                    const isActive = activeSection === originalIndex;

                    return (
                      <li key={section.title} className="tos-toc__item">
                        <button
                          type="button"
                          className={`tos-toc__link ${isActive ? 'is-active' : ''}`}
                          onClick={() => scrollToSection(originalIndex)}
                        >
                          <span className="tos-toc__number">{formatNumber(originalIndex + 1)}</span>
                          <span className="tos-toc__label">{cleanTitle}</span>
                          {isActive && <ChevronRight size={14} className="tos-toc__arrow" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Quick Legal Help Widget */}
              <div className="tos-toc__support">
                <div className="tos-toc__support-icon">
                  <HelpCircle size={18} />
                </div>
                <div className="tos-toc__support-content">
                  <div className="tos-toc__support-title">Cần Hỗ Trợ Pháp Lý?</div>
                  <p className="tos-toc__support-desc">Đội ngũ LETAN Media hỗ trợ giải đáp 24/7 qua hotline:</p>
                  <a href="tel:0765178999" className="tos-toc__support-link">
                    0765 178 999
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile TOC Drawer Trigger */}
          <div className="tos-mobile-toc-bar">
            <button
              type="button"
              className="tos-mobile-toc-trigger"
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              aria-expanded={mobileTocOpen}
            >
              <div className="tos-mobile-toc-trigger__left">
                <Layers size={16} />
                <span>Mục lục ({SECTIONS.length} điều)</span>
              </div>
              <div className="tos-mobile-toc-trigger__right">
                <span className="tos-mobile-toc-current">
                  Đang xem: {formatNumber(activeSection + 1)}. {SECTIONS[activeSection]?.title.replace(/^\d+\.\s*/, '')}
                </span>
                <ChevronDown size={16} className={mobileTocOpen ? 'is-rotated' : ''} />
              </div>
            </button>

            {/* Mobile Sheet */}
            {mobileTocOpen && (
              <div className="tos-mobile-sheet">
                <div className="tos-mobile-sheet__backdrop" onClick={() => setMobileTocOpen(false)} />
                <div className="tos-mobile-sheet__content">
                  <div className="tos-mobile-sheet__header">
                    <h3>Mục Lục Điều Khoản</h3>
                    <button
                      type="button"
                      className="tos-mobile-sheet__close"
                      onClick={() => setMobileTocOpen(false)}
                    >
                      Đóng
                    </button>
                  </div>
                  <div className="tos-mobile-sheet__body">
                    {SECTIONS.map((section, idx) => {
                      const cleanTitle = section.title.replace(/^\d+\.\s*/, '');
                      const isActive = activeSection === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          className={`tos-mobile-sheet__item ${isActive ? 'is-active' : ''}`}
                          onClick={() => scrollToSection(idx)}
                        >
                          <span className="tos-mobile-sheet__number">{formatNumber(idx + 1)}</span>
                          <span className="tos-mobile-sheet__title">{cleanTitle}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Clauses Content */}
          <section className="tos-content" aria-label="Nội dung điều khoản">
            {filteredSections.length === 0 ? (
              <div className="tos-empty-state">
                <AlertCircle size={40} className="tos-empty-state__icon" />
                <h3>Không tìm thấy kết quả phù hợp</h3>
                <p>Không có điều khoản nào chứa từ khóa &ldquo;{searchQuery}&rdquo;. Vui lòng thử tìm kiếm với cụm từ khác.</p>
                <button
                  type="button"
                  className="tos-cta-button tos-cta-button--outline"
                  onClick={() => setSearchQuery('')}
                >
                  Xóa bộ lọc tìm kiếm
                </button>
              </div>
            ) : (
              filteredSections.map((section) => {
                const originalIndex = SECTIONS.findIndex((s) => s.title === section.title);
                const cleanTitle = section.title.replace(/^\d+\.\s*/, '');

                return (
                  <article
                    key={section.title}
                    id={`tos-section-${originalIndex}`}
                    className="tos-card"
                  >
                    {/* Card Header */}
                    <header className="tos-card__header">
                      <div className="tos-card__index-wrap">
                        <span className="tos-card__number">{formatNumber(originalIndex + 1)}</span>
                        <div className="tos-card__number-line" aria-hidden="true" />
                      </div>

                      <div className="tos-card__title-box">
                        <h2 className="tos-card__title">{cleanTitle}</h2>
                        {section.summary && (
                          <p className="tos-card__summary">{section.summary}</p>
                        )}
                      </div>

                      <button
                        type="button"
                        className="tos-card__copy-link"
                        onClick={() => handleCopySectionLink(originalIndex, cleanTitle)}
                        title="Sao chép đường dẫn trực tiếp đến điều khoản này"
                        aria-label={`Sao chép liên kết điều ${cleanTitle}`}
                      >
                        <Copy size={15} />
                      </button>
                    </header>

                    {/* Card Body */}
                    <div className="tos-card__body">
                      {renderSectionBody(section, originalIndex)}
                    </div>
                  </article>
                );
              })
            )}

            {/* Bottom Document Endorsement Card */}
            <div className="tos-endorsement-panel">
              <div className="tos-endorsement-panel__badge">
                <CheckCircle2 size={18} />
                <span>Hiệu Lực & Tính Ràng Buộc</span>
              </div>
              <h3 className="tos-endorsement-panel__title">
                Hợp Tác Dựa Trên Minh Bạch & Niềm Tin Công Nghệ
              </h3>
              <p className="tos-endorsement-panel__desc">
                Mọi dự án và thỏa thuận triển khai tại LETAN Media đều được bảo chứng bởi Điều khoản dịch vụ và Chính sách quyền riêng tư chính thức. Khi cần ký kết hợp đồng thương mại hoặc thỏa thuận bảo mật NDA riêng cho doanh nghiệp, vui lòng liên hệ đội ngũ pháp chế.
              </p>
              <div className="tos-endorsement-panel__actions">
                <a
                  href="https://t.me/Tanlemedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tos-cta-button tos-cta-button--primary"
                >
                  <span>Liên hệ trao đổi hợp đồng</span>
                  <ArrowUpRight size={16} />
                </a>
                <Link to="/policy" className="tos-cta-button tos-cta-button--ghost">
                  <span>Chính sách quyền riêng tư</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          className="tos-back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Lên đầu trang"
          aria-label="Cuộn lên đầu trang"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="tos-toast" role="status">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Shared V2 Footer (Homepage intact) */}
      <V2PageFooter />
    </div>
  );
}
