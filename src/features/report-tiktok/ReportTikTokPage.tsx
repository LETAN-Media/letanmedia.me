import ReportAgent from "./agents/ReportAgent";
import ScreenshotCarousel from './ScreenshotCarousel'
import React, { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  UserCheck,
  ChevronRight,
  CheckCircle2,
  Clock,
  FileText,
  Send,
  ShieldCheck,
  Ban,
  Video,
  MessageSquare,
  ArrowRight,
  Globe,
  X,
  Menu,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  Moon,
  Sun,
  TrendingUp,
  Users,
  AlertCircle,
  FileWarning,
  Trash,
  EyeOff,
  Hand,
  BadgeCheck,
  CreditCard,
  Headphones,
  LockKeyhole,
  Scissors,
  ScrollText,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import MarketingHeader from "./MarketingHeader";
/* ═══════════════════════════════════════════
   THEME & LANGUAGE CONTEXT
   ═══════════════════════════════════════════ */
type Theme = "dark" | "light";
type Lang = "vi" | "en";
interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}
const AppContext = createContext<AppContextType>({
  theme: "dark",
  toggleTheme: () => {},
  lang: "vi",
  setLang: () => {},
  t: (k) => k,
});
const useApp = () => useContext(AppContext);
/* ── Dictionary ── */
const DICT: Record<Lang, Record<string, string>> = {
  vi: {
    // Nav
    nav_home: "Trang chủ",
    nav_services: "Dịch vụ",
    nav_pricing: "Bảng giá",
    nav_contact: "Liên hệ",
    nav_quote: "Báo giá ngay",
    nav_quote_btn: "Báo giá ngay",
    nav_contact_telegram: "Liên hệ Telegram/Zalo",
    // Hero
    hero_badge: "Dịch vụ uy tín hàng đầu",
    hero_title_1: "Dịch Vụ",
    hero_title_2: "Report TikTok",
    hero_desc:
      "Hỗ trợ rip kênh TikTok và video TikTok có nội dung xấu nhằm bảo vệ danh tiếng trên mạng xã hội. Đội ngũ dày dặn kinh nghiệm, xử lý nhanh chóng với chi phí hợp lý nhất.",
    hero_cta_primary: "Báo giá ngay",
    hero_cta_secondary: "Tìm hiểu quy trình",
    // Stats
    stat_customers: "Khách hàng",
    stat_success: "Tỷ lệ thành công",
    stat_time: "Thời gian xử lý",
    stat_security: "Bảo mật",
    // Services
    svc_badge: "Dịch vụ chuyên sâu",
    svc_title_1: "Rip Kênh &",
    svc_title_2: "Rip Video",
    svc_desc:
      "Lựa chọn dịch vụ phù hợp với nhu cầu của bạn. Mỗi loại hình đều có quy trình và chiến lược xử lý riêng biệt.",
    svc_tab_channel: "Rip Kênh TikTok",
    svc_tab_video: "Rip Video TikTok",
    svc_channel_title: "Rip Kênh TikTok",
    svc_channel_sub: "Xoá sổ kênh vi phạm vĩnh viễn",
    svc_video_title: "Rip Video TikTok",
    svc_video_sub: "Xoá video vi phạm vĩnh viễn",
    svc_channel_heading: "Dịch vụ Rip Kênh TikTok",
    svc_video_heading: "Dịch vụ Rip Video TikTok",
    svc_cta: "Yêu cầu báo giá",
    svc_guarantee: "Hoàn tiền 100% nếu không thành công",
    // Process
    proc_badge: "Quy trình chuyên nghiệp",
    proc_title_1: "Quy Trình",
    proc_title_2: "Dịch Vụ",
    proc_desc:
      "4 bước đơn giản, minh bạch và hiệu quả để xử lý nội dung TikTok của bạn.",
    proc_step1_title: "Tiếp nhận thông tin",
    proc_step1_desc:
      "Khách hàng cung cấp liên kết (URL) đến kênh hoặc video TikTok cần xử lý.",
    proc_step2_title: "Đánh giá & xác định",
    proc_step2_desc:
      "Kiểm tra và đánh giá nội dung để xác định mức độ khó / dễ thực hiện.",
    proc_step3_title: "Báo giá & thời gian",
    proc_step3_desc:
      "Cung cấp báo giá chi tiết và thời gian hoàn thành dự kiến.",
    proc_step4_title: "Thông báo kết quả",
    proc_step4_desc:
      "Hoàn thành xử lý, thông báo kết quả. Khách kiểm tra trước khi thanh toán.",
    // Commitments
    com_badge: "Cam kết của chúng tôi",
    com_title_1: "CAM KẾT",
    com_title_2: "BẢO MẬT",
    com_desc:
      "LETAN MEDIA cam kết bảo mật tuyệt đối mọi thông tin của khách hàng trong suốt quá trình sử dụng dịch vụ report TikTok.",
    // FAQ
    faq_badge: "Giải đáp thắc mắc",
    faq_title_1: "Câu Hỏi",
    faq_title_2: "Thường Gặp",
    faq_q1: "Dịch vụ report TikTok có an toàn không?",
    faq_a1:
      "Hoàn toàn an toàn. Chúng tôi không yêu cầu mật khẩu, không lưu trữ thông tin sau khi hoàn thành. Toàn bộ quy trình được mã hóa và bảo mật tuyệt đối.",
    faq_q2: "Thời gian xử lý mất bao lâu?",
    faq_a2:
      "Thông thường từ 24-72 giờ tùy thuộc vào mức độ phức tạp của nội dung cần xử lý. Kênh lớn hoặc video viral có thể cần thêm thời gian.",
    faq_q3: "Có cần cung cấp tài khoản TikTok cá nhân không?",
    faq_a3:
      "Không. Chúng tôi KHÔNG yêu cầu mật khẩu hay thông tin đăng nhập TikTok của bạn. Chỉ cần URL kênh/video cần xử lý.",
    faq_q4: "Nếu không thành công thì sao?",
    faq_a4:
      "Chúng tôi cam kết hoàn tiền 100% nếu không đạt được kết quả như đã thỏa thuận. Chi phí rõ ràng, không phát sinh phụ phí.",
    faq_q5: "Có bảo mật danh tính người yêu cầu không?",
    faq_a5:
      "Tuyệt đối. Chúng tôi cam kết không làm lộ danh tính người yêu cầu report dưới bất kỳ hình thức nào.",
    faq_q6: "Có hỗ trợ tư vấn trước khi sử dụng dịch vụ không?",
    faq_a6:
      "Có. Chúng tôi hỗ trợ tư vấn miễn phí trước khi triển khai dịch vụ để đánh giá khả thi và đưa ra giải pháp tối ưu.",
    // Contact
    ct_badge: "Liên hệ ngay",
    ct_title_1: "Yêu Cầu",
    ct_title_2: "Báo Giá",
    ct_desc:
      "Điền thông tin bên dưới để nhận báo giá chi tiết và tư vấn miễn phí từ đội ngũ chuyên gia của LETAN MEDIA.",
    ct_name: "Họ và tên",
    ct_name_ph: "Nhập họ và tên",
    ct_phone: "Số điện thoại / Zalo",
    ct_phone_ph: "Nhập số điện thoại",
    ct_url: "URL kênh / video TikTok",
    ct_url_ph: "https://tiktok.com/@username/...",
    ct_type: "Loại dịch vụ",
    ct_type_channel: "Rip Kênh TikTok",
    ct_type_video: "Rip Video TikTok",
    ct_note: "Ghi chú thêm",
    ct_note_ph: "Mô tả chi tiết nội dung cần xử lý...",
    ct_submit: "Gửi yêu cầu báo giá",
    ct_success_title: "Đã gửi thành công!",
    ct_success_desc: "Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.",
    ct_hotline: "Hotline",
    ct_email: "Email",
    ct_address: "Địa chỉ",
    ct_address_val: "Việt Nam",
    // Footer
    ft_desc:
      "Dịch vụ report TikTok uy tín hàng đầu. Bảo vệ danh tiếng, xử lý nhanh chóng, bảo mật tuyệt đối.",
    ft_services: "Dịch vụ",
    ft_links: "Liên kết",
    ft_rights: "© 2024 LETAN MEDIA. All rights reserved.",
    ft_security: "Bảo mật & Uy tín",
  },
  en: {
    // Nav
    nav_home: "Home",
    nav_services: "Services",
    nav_pricing: "Pricing",
    nav_contact: "Contact",
    nav_quote: "Get a Quote",
    nav_quote_btn: "Get a Quote",
    nav_contact_telegram: "Contact Telegram/Zalo",
    // Hero
    hero_badge: "Top Trusted Service",
    hero_title_1: "TikTok Report",
    hero_title_2: "Service",
    hero_desc:
      "Support removing TikTok channels and videos with harmful content to protect your reputation on social media. Experienced team, fast processing at the most reasonable cost.",
    hero_cta_primary: "Get a Quote",
    hero_cta_secondary: "Learn the Process",
    // Stats
    stat_customers: "Customers",
    stat_success: "Success Rate",
    stat_time: "Processing Time",
    stat_security: "Security",
    // Services
    svc_badge: "Specialized Services",
    svc_title_1: "Channel &",
    svc_title_2: "Video Removal",
    svc_desc:
      "Choose the service that fits your needs. Each type has its own process and handling strategy.",
    svc_tab_channel: "Remove Channel",
    svc_tab_video: "Remove Video",
    svc_channel_title: "Remove TikTok Channel",
    svc_channel_sub: "Permanently delete violating channels",
    svc_video_title: "Remove TikTok Video",
    svc_video_sub: "Permanently delete violating videos",
    svc_channel_heading: "TikTok Channel Removal Service",
    svc_video_heading: "TikTok Video Removal Service",
    svc_cta: "Request a Quote",
    svc_guarantee: "100% refund if unsuccessful",
    // Process
    proc_badge: "Professional Process",
    proc_title_1: "Service",
    proc_title_2: "Process",
    proc_desc:
      "4 simple, transparent and effective steps to handle your TikTok content.",
    proc_step1_title: "Receive Information",
    proc_step1_desc:
      "Customer provides the URL of the TikTok channel or video to be processed.",
    proc_step2_title: "Evaluate & Determine",
    proc_step2_desc:
      "Check and evaluate content to determine difficulty level.",
    proc_step3_title: "Quote & Timeline",
    proc_step3_desc:
      "Provide detailed quote and estimated completion time.",
    proc_step4_title: "Notify Results",
    proc_step4_desc:
      "Complete processing, notify results. Customer checks before payment.",
    // Commitments
    com_badge: "Our Commitments",
    com_title_1: "PRIVACY",
    com_title_2: "COMMITMENTS",
    com_desc:
      "LETAN MEDIA is committed to absolute confidentiality of all customer information throughout the TikTok report service process.",
    // FAQ
    faq_badge: "Frequently Asked Questions",
    faq_title_1: "Frequently",
    faq_title_2: "Asked Questions",
    faq_q1: "Is the TikTok report service safe?",
    faq_a1:
      "Completely safe. We do not require passwords, do not store information after completion. The entire process is encrypted and absolutely secure.",
    faq_q2: "How long does processing take?",
    faq_a2:
      "Usually 24-72 hours depending on the complexity of the content to be processed. Large channels or viral videos may require additional time.",
    faq_q3: "Do I need to provide my personal TikTok account?",
    faq_a3:
      "No. We do NOT require your TikTok password or login information. Only the URL of the channel/video to be processed is needed.",
    faq_q4: "What if it doesn't work?",
    faq_a4:
      "We commit to 100% refund if the agreed results are not achieved. Clear costs, no hidden fees.",
    faq_q5: "Is the requester's identity kept confidential?",
    faq_a5:
      "Absolutely. We commit to not revealing the identity of the report requester under any circumstances.",
    faq_q6: "Is there free consultation before using the service?",
    faq_a6:
      "Yes. We provide free consultation before deploying the service to assess feasibility and provide optimal solutions.",
    // Contact
    ct_badge: "Contact Now",
    ct_title_1: "Request a",
    ct_title_2: "Quote",
    ct_desc:
      "Fill in the information below to receive a detailed quote and free consultation from LETAN MEDIA's expert team.",
    ct_name: "Full Name",
    ct_name_ph: "Enter your full name",
    ct_phone: "Phone / Zalo",
    ct_phone_ph: "Enter phone number",
    ct_url: "TikTok Channel / Video URL",
    ct_url_ph: "https://tiktok.com/@username/...",
    ct_type: "Service Type",
    ct_type_channel: "Remove TikTok Channel",
    ct_type_video: "Remove TikTok Video",
    ct_note: "Additional Notes",
    ct_note_ph: "Describe the content to be processed in detail...",
    ct_submit: "Send Quote Request",
    ct_success_title: "Sent Successfully!",
    ct_success_desc: "We will contact you within 24 hours.",
    ct_hotline: "Hotline",
    ct_email: "Email",
    ct_address: "Address",
    ct_address_val: "Vietnam",
    // Footer
    ft_desc:
      "Top trusted TikTok report service. Protect reputation, fast processing, absolute security.",
    ft_services: "Services",
    ft_links: "Links",
    ft_rights: "© 2024 LETAN MEDIA. All rights reserved.",
    ft_security: "Security & Trust",
  },
};
/* ═══════════════════════════════════════════
   COLOR SYSTEM — TikTok Theme
   ═══════════════════════════════════════════ */
const C = {
  // Primary
  red: "#FE2C55",
  redDark: "#E60039",
  redLight: "#FF4D6D",
  // Secondary
  cyan: "#25F4EE",
  cyanDark: "#00D4D0",
  // Neutrals Dark
  black: "#000000",
  blackSoft: "#0F0F0F",
  blackElevated: "#161823",
  gray900: "#1F1F1F",
  gray800: "#2B2B2B",
  gray700: "#3A3A3A",
  gray600: "#555555",
  gray500: "#8A8B91",
  gray400: "#A6A7AB",
  // Neutrals Light
  white: "#FFFFFF",
  gray100: "#F1F1F2",
  gray200: "#E4E4E6",
  gray300: "#C9C9CD",
  // Gradients
  redGradient: "linear-gradient(135deg, #FE2C55 0%, #E60039 100%)",
  cyanGradient: "linear-gradient(135deg, #25F4EE 0%, #00D4D0 100%)",
};
/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};
const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};
const slideRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */
type TabKey = "channel" | "video";
interface StepData {
  num: string;
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
}
function getSteps(t: (k: string) => string): StepData[] {
  return [
    {
      num: "01",
      icon: <Send className="w-5 h-5" />,
      titleKey: "proc_step1_title",
      descKey: "proc_step1_desc",
    },
    {
      num: "02",
      icon: <FileText className="w-5 h-5" />,
      titleKey: "proc_step2_title",
      descKey: "proc_step2_desc",
    },
    {
      num: "03",
      icon: <Clock className="w-5 h-5" />,
      titleKey: "proc_step3_title",
      descKey: "proc_step3_desc",
    },
    {
      num: "04",
      icon: <CheckCircle2 className="w-5 h-5" />,
      titleKey: "proc_step4_title",
      descKey: "proc_step4_desc",
    },
  ];
}
function getCommitments(t: (k: string) => string) {
  return [
    {
      icon: <Trash className="w-6 h-6" />,
      title: t("com_no_store"),
      desc: t("com_no_store_desc"),
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: t("com_no_share"),
      desc: t("com_no_share_desc"),
    },
    {
      icon: <EyeOff className="w-6 h-6" />,
      title: t("com_private"),
      desc: t("com_private_desc"),
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: t("com_one_on_one"),
      desc: t("com_one_on_one_desc"),
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t("com_anon"),
      desc: t("com_anon_desc"),
    },
    {
      icon: <LockKeyhole className="w-6 h-6" />,
      title: t("com_no_pass"),
      desc: t("com_no_pass_desc"),
    },
    {
      icon: <BadgeCheck className="w-6 h-6" />,
      title: t("com_encrypt"),
      desc: t("com_encrypt_desc"),
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: t("com_pro"),
      desc: t("com_pro_desc"),
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: t("com_consult"),
      desc: t("com_consult_desc"),
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: t("com_clear_cost"),
      desc: t("com_clear_cost_desc"),
    },
  ];
}
// Add missing commitment keys to dict
DICT.vi.com_no_store = "Không lưu trữ thông tin";
DICT.vi.com_no_store_desc = "Không lưu trữ thông tin khách hàng sau khi hoàn thành dịch vụ.";
DICT.vi.com_no_share = "Không chia sẻ dữ liệu";
DICT.vi.com_no_share_desc = "Không chia sẻ dữ liệu, nội dung hoặc thông tin cá nhân cho bên thứ ba.";
DICT.vi.com_private = "Trao đổi riêng tư";
DICT.vi.com_private_desc = "Toàn bộ quá trình trao đổi được thực hiện riêng tư và bảo mật.";
DICT.vi.com_one_on_one = "Hỗ trợ 1:1 trực tiếp";
DICT.vi.com_one_on_one_desc = "Hỗ trợ 1:1 trực tiếp với đội ngũ xử lý chuyên nghiệp.";
DICT.vi.com_anon = "Không lộ danh tính";
DICT.vi.com_anon_desc = "Cam kết không làm lộ danh tính người yêu cầu report.";
DICT.vi.com_no_pass = "Không yêu cầu mật khẩu";
DICT.vi.com_no_pass_desc = "Không yêu cầu cung cấp mật khẩu hoặc thông tin đăng nhập TikTok.";
DICT.vi.com_encrypt = "Mã hóa thông tin";
DICT.vi.com_encrypt_desc = "Mọi thông tin liên kết, video hoặc tài khoản được mã hóa.";
DICT.vi.com_pro = "Đội ngũ kỹ thuật chuyên nghiệp";
DICT.vi.com_pro_desc = "Kinh nghiệm xử lý nhiều trường hợp khó, đảm bảo an toàn.";
DICT.vi.com_consult = "Tư vấn miễn phí";
DICT.vi.com_consult_desc = "Hỗ trợ tư vấn miễn phí trước khi triển khai dịch vụ.";
DICT.vi.com_clear_cost = "Chi phí rõ ràng";
DICT.vi.com_clear_cost_desc = "Không phát sinh phụ phí ngoài báo giá ban đầu.";
DICT.en.com_no_store = "No Information Storage";
DICT.en.com_no_store_desc = "We do not store customer information after service completion.";
DICT.en.com_no_share = "No Data Sharing";
DICT.en.com_no_share_desc = "We do not share data, content or personal information with third parties.";
DICT.en.com_private = "Private Communication";
DICT.en.com_private_desc = "The entire exchange process is conducted privately and securely.";
DICT.en.com_one_on_one = "1:1 Direct Support";
DICT.en.com_one_on_one_desc = "Direct 1:1 support with professional handling team.";
DICT.en.com_anon = "Anonymous Identity";
DICT.en.com_anon_desc = "Committed to not revealing the identity of the report requester.";
DICT.en.com_no_pass = "No Password Required";
DICT.en.com_no_pass_desc = "We do not require TikTok password or login information.";
DICT.en.com_encrypt = "Encrypted Information";
DICT.en.com_encrypt_desc = "All link, video or account information is encrypted.";
DICT.en.com_pro = "Professional Technical Team";
DICT.en.com_pro_desc = "Experience handling many difficult cases, ensuring safety.";
DICT.en.com_consult = "Free Consultation";
DICT.en.com_consult_desc = "Free consultation support before deploying the service.";
DICT.en.com_clear_cost = "Clear Costs";
DICT.en.com_clear_cost_desc = "No additional fees beyond the initial quote.";
function getFAQs(t: (k: string) => string) {
  return [
    { q: t("faq_q1"), a: t("faq_a1") },
    { q: t("faq_q2"), a: t("faq_a2") },
    { q: t("faq_q3"), a: t("faq_a3") },
    { q: t("faq_q4"), a: t("faq_a4") },
    { q: t("faq_q5"), a: t("faq_a5") },
    { q: t("faq_q6"), a: t("faq_a6") },
  ];
}
function getChannelItems(t: (k: string) => string) {
  return [
    t("svc_ch_1") || "Rip kênh giả mạo để trục lợi cá nhân — ngăn chặn gian lận và lừa đảo.",
    t("svc_ch_2") || "Xoá kênh có nội dung phân biệt vùng miền, chống phá nhà nước.",
    t("svc_ch_3") || "Loại bỏ kênh vi phạm chính sách, bản quyền tác giả hoặc nhãn hiệu.",
    t("svc_ch_4") || "Report kênh có đánh giá không chính xác, ảnh hưởng uy tín cá nhân / doanh nghiệp.",
  ];
}
function getVideoItems(t: (k: string) => string) {
  return [
    t("svc_vd_1") || "Rip video có nội dung bốc phốt — bảo vệ danh tiếng trước thông tin sai lệch.",
    t("svc_vd_2") || "Xoá video vi phạm chính sách TikTok, duy trì môi trường lành mạnh.",
    t("svc_vd_3") || "Report video reup không có sự đồng ý của chủ sở hữu — bảo vệ quyền lợi.",
    t("svc_vd_4") || "Ưu điểm: Nhanh chóng, giá hợp lý, video bị xoá vĩnh viễn.",
    t("svc_vd_5") || "Lưu ý: Đối thủ có thể đăng video khác sau khi bị xoá.",
  ];
}
// Add service items to dict
DICT.vi.svc_ch_1 = "Rip kênh giả mạo để trục lợi cá nhân — ngăn chặn gian lận và lừa đảo.";
DICT.vi.svc_ch_2 = "Xoá kênh có nội dung phân biệt vùng miền, chống phá nhà nước.";
DICT.vi.svc_ch_3 = "Loại bỏ kênh vi phạm chính sách, bản quyền tác giả hoặc nhãn hiệu.";
DICT.vi.svc_ch_4 = "Report kênh có đánh giá không chính xác, ảnh hưởng uy tín cá nhân / doanh nghiệp.";
DICT.vi.svc_vd_1 = "Rip video có nội dung bốc phốt — bảo vệ danh tiếng trước thông tin sai lệch.";
DICT.vi.svc_vd_2 = "Xoá video vi phạm chính sách TikTok, duy trì môi trường lành mạnh.";
DICT.vi.svc_vd_3 = "Report video reup không có sự đồng ý của chủ sở hữu — bảo vệ quyền lợi.";
DICT.vi.svc_vd_4 = "Ưu điểm: Nhanh chóng, giá hợp lý, video bị xoá vĩnh viễn.";
DICT.vi.svc_vd_5 = "Lưu ý: Đối thủ có thể đăng video khác sau khi bị xoá.";
DICT.en.svc_ch_1 = "Remove impersonation channels for personal gain — prevent fraud and scams.";
DICT.en.svc_ch_2 = "Delete channels with discriminatory content, anti-state material.";
DICT.en.svc_ch_3 = "Remove channels violating policies, copyright or trademark.";
DICT.en.svc_ch_4 = "Report channels with inaccurate reviews affecting personal / business reputation.";
DICT.en.svc_vd_1 = "Remove expose videos — protect reputation from misinformation.";
DICT.en.svc_vd_2 = "Delete videos violating TikTok policies, maintain healthy environment.";
DICT.en.svc_vd_3 = "Report reuploaded videos without owner's consent — protect rights.";
DICT.en.svc_vd_4 = "Advantages: Fast, reasonable price, video permanently deleted.";
DICT.en.svc_vd_5 = "Note: Opponents may post different videos after removal.";
/* ═══════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════ */
function HeroSection() {
  const { theme, t } = useApp();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 120]);
  const y2 = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const isDark = theme === "dark";
  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Background layers */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-b from-black via-[#0a0a0a] to-[#050505]"
            : "bg-gradient-to-b from-white via-gray-50 to-gray-100"
        }`}
      />
      
      {/* Animated glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ background: `radial-gradient(circle, ${C.red}15, transparent 70%)` }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: `radial-gradient(circle, ${C.cyan}10, transparent 70%)` }}
        />
      </div>
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background:
                i % 3 === 0 ? C.red : i % 3 === 1 ? C.cyan : isDark ? "#ffffff30" : "#00000020",
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div style={{ y: y1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 border"
            style={{
              background: isDark ? `${C.red}10` : `${C.red}08`,
              borderColor: isDark ? `${C.red}25` : `${C.red}20`,
              color: C.red,
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: C.red }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: C.red }}
              />
            </span>
            {t("hero_badge")}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6"
          >
            <span className={isDark ? "text-white" : "text-black"}>
              {t("hero_title_1")}
            </span>
            <br />
            <span style={{ color: C.red }}>{t("hero_title_2")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t("hero_desc")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              href="#contact"
              className="group px-6 sm:px-8 py-3.5 sm:py-4 text-white font-bold rounded-xl transition-all duration-300 flex items-center gap-2 hover:scale-105"
              style={{
                background: C.redGradient,
                boxShadow: `0 8px 30px ${C.red}40`,
              }}
            >
              <span>{t("hero_cta_primary")}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#process"
              className={`px-6 sm:px-8 py-3.5 sm:py-4 font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 border ${
                isDark
                  ? "border-white/20 text-white hover:bg-white/5"
                  : "border-black/20 text-black hover:bg-black/5"
              }`}
            >
              <span>{t("hero_cta_secondary")}</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </motion.div>
        </motion.div>
        {/* Stats - FIXED RESPONSIVE */}
        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 sm:mt-20 md:mt-24 w-full max-w-lg sm:max-w-2xl md:max-w-3xl mx-auto px-2 sm:px-4"
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {[
              {
                icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
                num: "500+",
                label: t("stat_customers"),
              },
              {
                icon: <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />,
                num: "98%",
                label: t("stat_success"),
              },
              {
                icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
                num: "24h",
                label: t("stat_time"),
              },
              {
                icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
                num: "100%",
                label: t("stat_security"),
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                  isDark
                    ? "bg-white/[0.03] border-white/[0.08] hover:border-[#FE2C55]/30"
                    : "bg-black/[0.02] border-black/[0.06] hover:border-[#FE2C55]/30"
                }`}
              >
                <div className="mb-1.5 sm:mb-2 flex justify-center" style={{ color: C.red }}>
                  {s.icon}
                </div>
                <div
                  className={`text-xl sm:text-2xl md:text-3xl font-bold mb-0.5 sm:mb-1 ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {s.num}
                </div>
                <div
                  className={`text-xs sm:text-sm ${
                    isDark ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown
          className={`w-5 h-5 sm:w-6 sm:h-6 ${isDark ? "text-gray-600" : "text-gray-400"}`}
        />
      </motion.div>
    </section>
  );
}
function ServiceTabs() {
  const { theme, t } = useApp();
  const [active, setActive] = useState<TabKey>("channel");
  const isDark = theme === "dark";
  const channelItems = getChannelItems(t);
  const videoItems = getVideoItems(t);
  return (
    <section
      id="services"
      className={`py-20 sm:py-28 relative ${isDark ? "bg-[#0a0a0a]" : "bg-gray-50"}`}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-12 sm:mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border"
            style={{
              background: isDark ? `${C.red}10` : `${C.red}08`,
              borderColor: isDark ? `${C.red}20` : `${C.red}15`,
              color: C.red,
            }}
          >
            <Scissors className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{t("svc_badge")}</span>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {t("svc_title_1")}{" "}
            <span style={{ color: C.red }}>{t("svc_title_2")}</span>
          </h2>
          <p
            className={`max-w-2xl mx-auto text-base sm:text-lg px-4 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t("svc_desc")}
          </p>
        </motion.div>
        {/* Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div
            className={`inline-flex p-1 rounded-xl sm:rounded-2xl border ${
              isDark
                ? "bg-white/[0.03] border-white/[0.08]"
                : "bg-black/[0.02] border-black/[0.06]"
            }`}
          >
            <button
              onClick={() => setActive("channel")}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                active === "channel"
                  ? "text-white shadow-lg"
                  : isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-black"
              }`}
              style={
                active === "channel"
                  ? {
                      background: C.redGradient,
                      boxShadow: `0 4px 20px ${C.red}40`,
                    }
                  : {}
              }
            >
              <Ban className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {t("svc_tab_channel")}
            </button>
            <button
              onClick={() => setActive("video")}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                active === "video"
                  ? "text-white shadow-lg"
                  : isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-black"
              }`}
              style={
                active === "video"
                  ? {
                      background: C.redGradient,
                      boxShadow: `0 4px 20px ${C.red}40`,
                    }
                  : {}
              }
            >
              <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {t("svc_tab_video")}
            </button>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center"
          >
            {/* Left: Visual */}
            <div className="relative order-2 md:order-1">
              <div className="aspect-[4/3] max-w-md mx-auto relative">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
                  style={{
                    background:
                      active === "channel"
                        ? `radial-gradient(circle, ${C.red}30, transparent 70%)`
                        : `radial-gradient(circle, ${C.cyan}20, transparent 70%)`,
                  }}
                />
                <div
                  className={`relative h-full rounded-2xl sm:rounded-3xl border p-6 sm:p-8 flex flex-col items-center justify-center ${
                    isDark
                      ? "bg-gradient-to-br from-white/[0.05] to-white/[0.01] border-white/[0.08]"
                      : "bg-gradient-to-br from-white to-gray-50 border-black/[0.06] shadow-lg"
                  }`}
                >
                  {active === "channel" ? (
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-2xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${C.red}20, ${C.redDark}10)`,
                          border: `1px solid ${C.red}25`,
                        }}
                      >
                        <Ban className="w-10 h-10 sm:w-12 sm:h-12" style={{ color: C.red }} />
                      </motion.div>
                      <h3
                        className={`text-xl sm:text-2xl font-bold mb-1 sm:mb-2 ${
                          isDark ? "text-white" : "text-black"
                        }`}
                      >
                        {t("svc_channel_title")}
                      </h3>
                      <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                        {t("svc_channel_sub")}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-2xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${C.cyan}15, ${C.cyanDark}08)`,
                          border: `1px solid ${C.cyan}25`,
                        }}
                      >
                        <Video
                          className="w-10 h-10 sm:w-12 sm:h-12"
                          style={{ color: C.cyan }}
                        />
                      </motion.div>
                      <h3
                        className={`text-xl sm:text-2xl font-bold mb-1 sm:mb-2 ${
                          isDark ? "text-white" : "text-black"
                        }`}
                      >
                        {t("svc_video_title")}
                      </h3>
                      <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                        {t("svc_video_sub")}
                      </p>
                    </div>
                  )}
                  {/* Decorative dots */}
                  <div
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                    style={{ background: active === "channel" ? `${C.red}40` : `${C.cyan}40` }}
                  />
                  <div
                    className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                    style={{ background: active === "channel" ? `${C.red}25` : `${C.cyan}25` }}
                  />
                </div>
              </div>
            </div>
            {/* Right: Content */}
            <div className="order-1 md:order-2">
              <h3
                className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {active === "channel" ? t("svc_channel_heading") : t("svc_video_heading")}
              </h3>
              <div className="space-y-2.5 sm:space-y-3">
                {(active === "channel" ? channelItems : videoItems).map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ x: 4 }}
                    className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all duration-200 ${
                      isDark
                        ? "bg-white/[0.02] border-white/[0.06] hover:border-[#FE2C55]/25"
                        : "bg-white border-black/[0.04] hover:border-[#FE2C55]/25 shadow-sm"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      <CheckCircle2
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        style={{ color: C.red }}
                      />
                    </div>
                    <p
                      className={`text-sm sm:text-base leading-relaxed ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <Link
                  href="#contact"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 text-sm sm:text-base hover:scale-105"
                  style={{
                    background: C.redGradient,
                    boxShadow: `0 4px 20px ${C.red}30`,
                  }}
                >
                  <span>{t("svc_cta")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span
                  className={`text-xs sm:text-sm ${
                    isDark ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  {t("svc_guarantee")}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
function ProcessSection() {
  const { theme, t } = useApp();
  const isDark = theme === "dark";
  const steps = getSteps(t);
  return (
    <section
      id="process"
      className={`py-20 sm:py-28 relative overflow-hidden ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full blur-[100px] sm:blur-[150px] opacity-30"
          style={{ background: `radial-gradient(circle, ${C.red}08, transparent 70%)` }}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-12 sm:mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border"
            style={{
              background: isDark ? `${C.red}10` : `${C.red}08`,
              borderColor: isDark ? `${C.red}20` : `${C.red}15`,
              color: C.red,
            }}
          >
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{t("proc_badge")}</span>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {t("proc_title_1")}{" "}
            <span style={{ color: C.red }}>{t("proc_title_2")}</span>
          </h2>
          <p
            className={`max-w-2xl mx-auto text-base sm:text-lg px-4 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t("proc_desc")}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div
                className={`h-full p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                  isDark
                    ? "bg-gradient-to-b from-white/[0.06] to-white/[0.01] border-white/[0.08] hover:border-[#FE2C55]/25"
                    : "bg-gradient-to-b from-white to-gray-50 border-black/[0.06] hover:border-[#FE2C55]/25 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${C.red}15, ${C.redDark}08)`,
                      border: `1px solid ${C.red}20`,
                      color: C.red,
                    }}
                  >
                    {step.icon}
                  </div>
                  <span
                    className={`text-3xl sm:text-4xl font-bold transition-colors ${
                      isDark ? "text-white/10 group-hover:text-[#FE2C55]/15" : "text-black/5 group-hover:text-[#FE2C55]/10"
                    }`}
                  >
                    {step.num}
                  </span>
                </div>
                <h3
                  className={`text-base sm:text-lg font-bold mb-2 sm:mb-3 ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {t(step.titleKey)}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {t(step.descKey)}
                </p>
              </div>
              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px]">
                  <div
                    className="w-full h-full"
                    style={{
                      background: `linear-gradient(to right, ${C.red}30, transparent)`,
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
function CommitmentSection() {
  const { theme, t } = useApp();
  const isDark = theme === "dark";
  const commitments = getCommitments(t);
  return (
    <section
      className={`py-20 sm:py-28 relative ${isDark ? "bg-[#0a0a0a]" : "bg-gray-50"}`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at center, ${C.red}08, transparent 70%)`,
          }}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-12 sm:mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border"
            style={{
              background: isDark ? `${C.red}10` : `${C.red}08`,
              borderColor: isDark ? `${C.red}20` : `${C.red}15`,
              color: C.red,
            }}
          >
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{t("com_badge")}</span>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {t("com_title_1")}{" "}
            <span style={{ color: C.red }}>{t("com_title_2")}</span>
          </h2>
          <p
            className={`max-w-2xl mx-auto text-base sm:text-lg px-4 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t("com_desc")}
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
        >
          {commitments.map((c, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                isDark
                  ? "bg-gradient-to-b from-white/[0.05] to-white/[0.01] border-white/[0.08] hover:border-[#FE2C55]/20"
                  : "bg-white border-black/[0.05] hover:border-[#FE2C55]/20 shadow-sm"
              }`}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${C.red}12, ${C.redDark}06)`,
                  border: `1px solid ${C.red}18`,
                  color: C.red,
                }}
              >
                {c.icon}
              </div>
              <h3
                className={`text-base sm:text-lg font-bold mb-1.5 sm:mb-2 ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {c.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {c.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
function FAQSection() {
  const { theme, t } = useApp();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const isDark = theme === "dark";
  const faqs = getFAQs(t);
  return (
    <section
      className={`py-20 sm:py-28 relative ${
        isDark ? "bg-gradient-to-b from-[#050505] to-[#0a0a0a]" : "bg-gradient-to-b from-gray-100 to-white"
      }`}
    >
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-12 sm:mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border"
            style={{
              background: isDark ? `${C.red}10` : `${C.red}08`,
              borderColor: isDark ? `${C.red}20` : `${C.red}15`,
              color: C.red,
            }}
          >
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{t("faq_badge")}</span>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {t("faq_title_1")}{" "}
            <span style={{ color: C.red }}>{t("faq_title_2")}</span>
          </h2>
        </motion.div>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-xl sm:rounded-2xl border overflow-hidden transition-all duration-200 ${
                isDark
                  ? "bg-white/[0.03] border-white/[0.08]"
                  : "bg-white border-black/[0.06] shadow-sm"
              } ${openIdx === i ? (isDark ? "border-[#FE2C55]/20" : "border-[#FE2C55]/20") : ""}`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className={`w-full flex items-center justify-between p-4 sm:p-6 text-left transition-colors ${
                  isDark ? "hover:bg-white/[0.02]" : "hover:bg-black/[0.01]"
                }`}
              >
                <span
                  className={`font-semibold text-sm sm:text-base pr-4 ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIdx === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {openIdx === i ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" style={{ color: C.red }} />
                  ) : (
                    <ChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                  )}
                </motion.div>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div
                      className={`px-4 sm:px-6 pb-4 sm:pb-6 text-sm sm:text-base leading-relaxed border-t ${
                        isDark
                          ? "text-gray-400 border-white/[0.05] pt-3 sm:pt-4"
                          : "text-gray-600 border-black/[0.04] pt-3 sm:pt-4"
                      }`}
                    >
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
function ContactSection() {
  const { theme, t } = useApp();
  const [form, setForm] = useState({
    name: "",
    contact: "",
    url: "",
    type: "channel",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const isDark = theme === "dark";
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };
  return (
    <section
      id="contact"
      className={`py-20 sm:py-28 relative overflow-hidden ${
        isDark ? "bg-[#0a0a0a]" : "bg-gray-50"
      }`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full blur-[80px] sm:blur-[120px] opacity-20"
          style={{ background: `radial-gradient(circle, ${C.red}10, transparent 70%)` }}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Left: Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border"
              style={{
                background: isDark ? `${C.red}10` : `${C.red}08`,
                borderColor: isDark ? `${C.red}20` : `${C.red}15`,
                color: C.red,
              }}
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t("ct_badge")}</span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {t("ct_title_1")}{" "}
              <span style={{ color: C.red }}>{t("ct_title_2")}</span>
            </h2>
            <p
              className={`text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {t("ct_desc")}
            </p>
            <div className="space-y-4 sm:space-y-6">
              {[
                {
                  icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5" />,
                  label: t("ct_hotline"),
                  value: "+84 765 178 999",
                },
                {
                  icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />,
                  label: t("ct_email"),
                  value: "support@letanmedia.site",
                },
                {
                  icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />,
                  label: t("ct_address"),
                  value: t("ct_address_val"),
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 sm:gap-4"
                >
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${C.red}12, ${C.redDark}06)`,
                      border: `1px solid ${C.red}18`,
                      color: C.red,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      className={`text-xs sm:text-sm ${
                        isDark ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      {item.label}
                    </div>
                    <div
                      className={`text-sm sm:text-base font-medium ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      {item.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`p-5 sm:p-8 rounded-2xl sm:rounded-3xl border ${
                isDark
                  ? "bg-gradient-to-b from-white/[0.06] to-white/[0.01] border-white/[0.08]"
                  : "bg-white border-black/[0.06] shadow-xl"
              }`}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 sm:py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${C.red}15, ${C.redDark}08)`,
                      border: `1px solid ${C.red}20`,
                    }}
                  >
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: C.red }} />
                  </motion.div>
                  <h3
                    className={`text-lg sm:text-xl font-bold mb-2 ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    {t("ct_success_title")}
                  </h3>
                  <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                    {t("ct_success_desc")}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {[
                    {
                      label: t("ct_name"),
                      type: "text",
                      key: "name",
                      placeholder: t("ct_name_ph"),
                    },
                    {
                      label: t("ct_phone"),
                      type: "text",
                      key: "contact",
                      placeholder: t("ct_phone_ph"),
                    },
                    {
                      label: t("ct_url"),
                      type: "url",
                      key: "url",
                      placeholder: t("ct_url_ph"),
                    },
                  ].map((field) => (
                    <div key={field.key}>
                      <label
                        className={`block text-xs sm:text-sm mb-1.5 sm:mb-2 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) =>
                          setForm({ ...form, [field.key]: e.target.value })
                        }
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base transition-all duration-200 border focus:outline-none ${
                          isDark
                            ? "bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-[#FE2C55]/40 focus:ring-1 focus:ring-[#FE2C55]/20"
                            : "bg-gray-50 border-black/8 text-black placeholder-gray-400 focus:border-[#FE2C55]/40 focus:ring-1 focus:ring-[#FE2C55]/20"
                        }`}
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      className={`block text-xs sm:text-sm mb-1.5 sm:mb-2 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {t("ct_type")}
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base transition-all duration-200 border focus:outline-none appearance-none ${
                        isDark
                          ? "bg-white/5 border-white/10 text-white focus:border-[#FE2C55]/40"
                          : "bg-gray-50 border-black/8 text-black focus:border-[#FE2C55]/40"
                      }`}
                    >
                      <option value="channel" className={isDark ? "bg-[#1a1a1a]" : "bg-white"}>
                        {t("ct_type_channel")}
                      </option>
                      <option value="video" className={isDark ? "bg-[#1a1a1a]" : "bg-white"}>
                        {t("ct_type_video")}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      className={`block text-xs sm:text-sm mb-1.5 sm:mb-2 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {t("ct_note")}
                    </label>
                    <textarea
                      rows={3}
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base transition-all duration-200 border focus:outline-none resize-none ${
                        isDark
                          ? "bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-[#FE2C55]/40 focus:ring-1 focus:ring-[#FE2C55]/20"
                          : "bg-gray-50 border-black/8 text-black placeholder-gray-400 focus:border-[#FE2C55]/40 focus:ring-1 focus:ring-[#FE2C55]/20"
                      }`}
                      placeholder={t("ct_note_ph")}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 sm:py-4 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: C.redGradient,
                      boxShadow: `0 8px 30px ${C.red}35`,
                    }}
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{t("ct_submit")}</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
function Footer() {
  const { theme, t } = useApp();
  const isDark = theme === "dark";
  return (
    <footer
      className={`py-12 sm:py-16 relative border-t ${
        isDark ? "bg-[#050505] border-white/5" : "bg-white border-black/5"
      }`}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 sm:mb-6">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center"
                style={{ background: C.redGradient }}
              >
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex items-baseline">
                <span className="text-lg sm:text-xl font-bold" style={{ color: C.red }}>
                  LETAN
                </span>
                <span
                  className={`text-lg sm:text-xl font-bold ml-1 ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  MEDIA
                </span>
              </div>
            </Link>
            <p
              className={`text-sm sm:text-base leading-relaxed max-w-md ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {t("ft_desc")}
            </p>
          </div>
          <div>
            <h4
              className={`text-sm sm:text-base font-semibold mb-3 sm:mb-4 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {t("ft_services")}
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {[t("svc_tab_channel"), t("svc_tab_video"), t("com_consult"), t("nav_quote")].map(
                (item) => (
                  <li key={item}>
                    <span
                      className={`text-sm transition-colors cursor-pointer ${
                        isDark
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-black"
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4
              className={`text-sm sm:text-base font-semibold mb-3 sm:mb-4 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {t("ft_links")}
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {[t("nav_home"), t("nav_services"), t("proc_badge"), t("com_badge"), t("nav_contact")].map(
                (item) => (
                  <li key={item}>
                    <span
                      className={`text-sm transition-colors cursor-pointer ${
                        isDark
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-black"
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div
          className={`pt-6 sm:pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 ${
            isDark ? "border-white/5" : "border-black/5"
          }`}
        >
          <p
            className={`text-xs sm:text-sm ${
              isDark ? "text-gray-600" : "text-gray-500"
            }`}
          >
            {t("ft_rights")}
          </p>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: C.red }} />
            <span className={isDark ? "text-gray-500" : "text-gray-500"}>
              {t("ft_security")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function ReportTikTokPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [lang, setLang] = useState<Lang>("vi");
  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const t = (key: string): string => {
    return DICT[lang][key] || key;
  };
  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, setLang, t }}>
      <main
        className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <MarketingHeader />
        <HeroSection />
        <ServiceTabs />
        <ScreenshotCarousel />
        <ProcessSection />
        <CommitmentSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </main>
      <ReportAgent />
    </AppContext.Provider>
  );
}
