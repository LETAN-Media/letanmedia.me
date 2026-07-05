import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  CalendarDays,
  ShoppingBag,
  Code2,
  Clock,
  Frown,
  ImageIcon,
  Languages,
  BarChart3,
  Puzzle,
  ChevronRight,
  Sparkles,
  Bell,
  Zap,
  MessageCircle,
  TrendingUp,
  BrainCircuit,
  Eye,
  Globe,
} from "lucide-react";
interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  bullets: { icon: React.ReactNode; text: string }[];
  cta: string;
  image: string;
  color: string;
}
const features: Feature[] = [
  {
    id: "multi-channel",
    icon: <Monitor className="w-5 h-5" />,
    title: "Đa kênh",
    subtitle: "Quản lý các kênh trong một màn hình",
    description: "Kết nối và quản lý tất cả các kênh nhắn tin từ một nền tảng duy nhất. Đồng bộ dữ liệu khách hàng real-time.",
    bullets: [
      { icon: <MessageCircle className="w-4 h-4" />, text: "Facebook Messenger & Fanpage" },
      { icon: <MessageCircle className="w-4 h-4" />, text: "Zalo OA & Zalo Official" },
      { icon: <Globe className="w-4 h-4" />, text: "Website Live Chat" },
      { icon: <MessageCircle className="w-4 h-4" />, text: "Telegram Bot" },
      { icon: <MessageCircle className="w-4 h-4" />, text: "WhatsApp Business API" },
      { icon: <MessageCircle className="w-4 h-4" />, text: "Lark / Feishu" },
    ],
    cta: "Bắt đầu miễn phí",
    image: "dashboard-multi",
    color: "from-emerald-600 to-green-700",
  },
  {
    id: "notes-schedule",
    icon: <CalendarDays className="w-5 h-5" />,
    title: "Ghi chú, Lập lịch",
    subtitle: "Lập lịch với AI và ghi chú nhanh các nội dung quan trọng",
    description: "AI tự động nhận diện nội dung cần lập lịch và tạo reminder. Ghi chú thông minh ngay trong cuộc hội thoại.",
    bullets: [
      { icon: <Zap className="w-4 h-4" />, text: "Tạo ghi chú và xem trong màn hình Chat" },
      { icon: <Sparkles className="w-4 h-4" />, text: "AI tự động đề xuất lập lịch" },
      { icon: <Bell className="w-4 h-4" />, text: "Gửi thông báo nhắc lịch đúng giờ" },
    ],
    cta: "Bắt đầu miễn phí",
    image: "dashboard-calendar",
    color: "from-emerald-600 to-green-700",
  },
  {
    id: "orders",
    icon: <ShoppingBag className="w-5 h-5" />,
    title: "Đơn hàng",
    subtitle: "Tạo đơn hàng nhanh chóng với AI",
    description: "AI tự động nhận diện nhu cầu đặt hàng từ khách hàng và tạo đơn hàng chỉ trong vài giây.",
    bullets: [
      { icon: <ShoppingBag className="w-4 h-4" />, text: "Tạo đơn hàng và quản lý đơn" },
      { icon: <Sparkles className="w-4 h-4" />, text: "AI tự động đề xuất tạo đơn hàng" },
    ],
    cta: "Bắt đầu miễn phí",
    image: "dashboard-orders",
    color: "from-emerald-600 to-green-700",
  },
  {
    id: "quick-reply",
    icon: <Code2 className="w-5 h-5" />,
    title: "Trả lởi nhanh",
    subtitle: "Tạo ra các câu trả lởi nhanh với AI",
    description: "Không cần soạn sẵn kịch bản. AI tự động tạo câu trả lởi phù hợp với ngữ cảnh và tone giọng doanh nghiệp.",
    bullets: [
      { icon: <Code2 className="w-4 h-4" />, text: "Trả lởi nhanh từ tin nhắn mẫu" },
      { icon: <Languages className="w-4 h-4" />, text: "Dịch văn bản với AI" },
      { icon: <Sparkles className="w-4 h-4" />, text: "Đề xuất hoàn thành câu trả lởi với AI" },
    ],
    cta: "Bắt đầu miễn phí",
    image: "dashboard-reply",
    color: "from-emerald-600 to-green-700",
  },
  {
    id: "slow-response",
    icon: <Clock className="w-5 h-5" />,
    title: "Phản hồi chậm",
    subtitle: "Theo dõi thởi gian phản hồi chậm tin nhắn của nhân viên",
    description: "Hệ thống cảnh báo real-time khi nhân viên phản hồi chậm. AI lọc tin nhắn hợp lệ để đánh giá chính xác.",
    bullets: [
      { icon: <Eye className="w-4 h-4" />, text: "Cảnh báo các tin nhắn nhân viên trả lởi chậm" },
      { icon: <Sparkles className="w-4 h-4" />, text: "AI lọc tiếp tin nhắn trả lởi chậm hợp lệ" },
    ],
    cta: "Bắt đầu miễn phí",
    image: "dashboard-slow",
    color: "from-emerald-600 to-green-700",
  },
  {
    id: "sentiment",
    icon: <Frown className="w-5 h-5" />,
    title: "Cảm xúc",
    subtitle: "Tự động phát hiện nội dung tiêu cực, tích cực",
    description: "AI phân tích cảm xúc khách hàng real-time. Phát hiện sớm khách hàng không hài lòng để xử lý kịp thởi.",
    bullets: [
      { icon: <BrainCircuit className="w-4 h-4" />, text: "AI tự động phát hiện các tin nhắn tiêu cực" },
      { icon: <TrendingUp className="w-4 h-4" />, text: "Báo cáo Quản lý, Lãnh đạo để kịp thởi nắm bắt" },
    ],
    cta: "Bắt đầu miễn phí",
    image: "dashboard-sentiment",
    color: "from-emerald-600 to-green-700",
  },
  {
    id: "media-to-text",
    icon: <ImageIcon className="w-5 h-5" />,
    title: "Media sang chữ",
    subtitle: "Tự động chuyển Hình ảnh, âm thanh thành văn bản",
    description: "Khách hàng gửi ảnh hoặc voice? AI tự động chuyển đổi sang text và xử lý nội dung ngay lập tức.",
    bullets: [
      { icon: <ImageIcon className="w-4 h-4" />, text: "Tự động chuyển hình ảnh, âm thanh sang văn bản" },
      { icon: <Sparkles className="w-4 h-4" />, text: "Từ nội dung văn bản đã chuyển đổi, AI tiếp tục đề xuất hành động" },
    ],
    cta: "Bắt đầu miễn phí",
    image: "dashboard-media",
    color: "from-emerald-600 to-green-700",
  },
  {
    id: "translate",
    icon: <Languages className="w-5 h-5" />,
    title: "Dịch văn bản",
    subtitle: "Dịch tự động giữa khách hàng và nhân viên",
    description: "Giao tiếp đa ngôn ngữ không còn là rào cản. AI dịch real-time giữa khách hàng và nhân viên.",
    bullets: [
      { icon: <Globe className="w-4 h-4" />, text: "Dịch tự động toàn bộ nội dung của khách hàng" },
      { icon: <Sparkles className="w-4 h-4" />, text: "Dịch nội dung chat của nhân viên trước khi gửi" },
    ],
    cta: "Bắt đầu miễn phí",
    image: "dashboard-translate",
    color: "from-emerald-600 to-green-700",
  },
  {
    id: "reports",
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Báo cáo",
    subtitle: "Báo cáo hoạt động kinh doanh từ các Trang của Doanh nghiệp",
    description: "Báo cáo chi tiết về hiệu suất chatbot, nhân viên, và tương tác khách hàng trên tất cả các kênh.",
    bullets: [
      { icon: <Monitor className="w-4 h-4" />, text: "Báo cáo Trang" },
      { icon: <MessageCircle className="w-4 h-4" />, text: "Báo cáo Nhân viên" },
      { icon: <TrendingUp className="w-4 h-4" />, text: "Báo cáo Quảng cáo" },
      { icon: <Frown className="w-4 h-4" />, text: "Báo cáo Cảm xúc" },
    ],
    cta: "Bắt đầu miễn phí",
    image: "dashboard-reports",
    color: "from-emerald-600 to-green-700",
  },
  {
    id: "integrations",
    icon: <Puzzle className="w-5 h-5" />,
    title: "Tích hợp",
    subtitle: "Tích hợp liền mạch dữ liệu Doanh nghiệp",
    description: "Kết nối với CRM, ERP, và các hệ thống quản lý doanh nghiệp hiện có. Tùy biến theo đặc thù ngành.",
    bullets: [
      { icon: <Code2 className="w-4 h-4" />, text: "Tài liệu tích hợp API đầy đủ" },
      { icon: <Puzzle className="w-4 h-4" />, text: "Tạo ứng dụng riêng của Doanh nghiệp ngay trong màn hình Chat" },
    ],
    cta: "Bắt đầu miễn phí",
    image: "dashboard-integrations",
    color: "from-emerald-600 to-green-700",
  },
];
function FeatureCard({ feature, isOpen, onToggle, index }: {
  feature: Feature;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-gray-100 last:border-b-0"
    >
      {/* Header - Always visible */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-4 px-4 sm:px-6 py-4 text-left transition-colors ${
          isOpen ? "bg-gray-50" : "hover:bg-gray-50/50"
        }`}
      >
        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
          isOpen ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-500"
        }`}>
          {feature.icon}
        </div>
        <span className={`flex-1 text-base font-semibold transition-colors ${
          isOpen ? "text-emerald-700" : "text-gray-700"
        }`}>
          {feature.title}
        </span>
        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
          isOpen ? "rotate-90" : ""
        }`} />
      </button>
      {/* Expanded Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`px-4 sm:px-6 pb-6 bg-gradient-to-br ${feature.color}`}>
              <div className="pt-4 pb-2">
                {/* Mock Dashboard UI */}
                <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl overflow-hidden mb-6">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs text-gray-400 ml-2">LetanAI Dashboard</span>
                  </div>
                  <div className="p-4 grid grid-cols-3 gap-3">
                    {/* Chat list */}
                    <div className="col-span-1 bg-gray-50 rounded-xl p-3 space-y-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white shadow-sm">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-500" />
                          <div className="flex-1 min-w-0">
                            <div className="h-2 bg-gray-200 rounded w-3/4 mb-1" />
                            <div className="h-1.5 bg-gray-100 rounded w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Chat area */}
                    <div className="col-span-2 bg-white rounded-xl p-3 space-y-3">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                        <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[70%]">
                          <div className="h-2 bg-gray-300 rounded w-32 mb-1" />
                          <div className="h-2 bg-gray-200 rounded w-24" />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <div className="bg-emerald-500 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[70%]">
                          <div className="h-2 bg-white/60 rounded w-28 mb-1" />
                          <div className="h-2 bg-white/40 rounded w-20" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                        <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[70%]">
                          <div className="h-2 bg-gray-300 rounded w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Feature Details */}
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/90 text-sm mb-4">{feature.subtitle}</p>
                <div className="space-y-3 mb-6">
                  {feature.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                        {bullet.icon}
                      </div>
                      <span className="text-white text-sm font-medium">{bullet.text}</span>
                    </div>
                  ))}
                </div>
                <button className="px-6 py-2.5 bg-white text-emerald-700 font-semibold text-sm rounded-xl hover:bg-emerald-50 transition-colors shadow-lg">
                  {feature.cta}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
export function FeaturesSection() {
  const [openId, setOpenId] = useState<string | null>("multi-channel");
  return (
    <section id="features" className="py-16 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Tính năng nổi bật
          </h2>
          <p className="text-gray-500 text-lg">
            Các tính năng được phát triển dựa trên AI
          </p>
        </motion.div>
        {/* Feature List */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              isOpen={openId === feature.id}
              onToggle={() => setOpenId(openId === feature.id ? null : feature.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
