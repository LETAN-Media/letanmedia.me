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
  ChevronDown,
  Sparkles,
  Bell,
  Zap,
  MessageCircle,
  TrendingUp,
  BrainCircuit,
  Eye,
  Globe,
  CheckCircle2
} from "lucide-react";

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  cta: string;
  mockType: string;
}

const features: Feature[] = [
  {
    id: "multi-channel",
    icon: <Monitor className="w-5 h-5" />,
    title: "Hội Thoại Đa Kênh Hợp Nhất",
    subtitle: "Quản lý tập trung Zalo, Messenger, Telegram, WhatsApp trong một màn hình",
    description: "Kết nối và quản lý tất cả các kênh nhắn tin từ một nền tảng duy nhất. Dữ liệu khách hàng và lịch sử trò chuyện được đồng bộ theo thời gian thực.",
    bullets: [
      "Kết nối Fanpage Messenger & Instagram Direct",
      "Đồng bộ Zalo OA & Zalo cá nhân",
      "Tích hợp Telegram Bot & WhatsApp Business API",
      "Live Chat trực tiếp trên Website doanh nghiệp",
    ],
    cta: "Trải nghiệm đa kênh",
    mockType: "chat",
  },
  {
    id: "quick-reply",
    icon: <Code2 className="w-5 h-5" />,
    title: "AI Tự Động Trả Lời & Tư Vấn Thông Minh",
    subtitle: "Tự động học kịch bản và trả lời tự nhiên như chuyên viên tư vấn",
    description: "Không cần kịch bản cứng nhắc. AI hiểu ngữ cảnh, phân tích câu hỏi của khách hàng và tự động đề xuất hoặc gửi câu trả lời chuẩn xác chỉ trong 1 giây.",
    bullets: [
      "Tự động học tài liệu sản phẩm và FAQ của doanh nghiệp",
      "Trả lời tự nhiên, có cảm xúc và đúng tone giọng thương hiệu",
      "Hỗ trợ gợi ý câu trả lời nhanh cho nhân viên duyệt trước khi gửi",
    ],
    cta: "Xem kịch bản mẫu",
    mockType: "ai-reply",
  },
  {
    id: "orders",
    icon: <ShoppingBag className="w-5 h-5" />,
    title: "Tự Động Chốt Đơn & Quản Lý Đơn Hàng",
    subtitle: "Thu thập thông tin đặt hàng và tạo đơn tự động",
    description: "AI nhận diện nhu cầu mua hàng, tự động trích xuất tên, số điện thoại, địa chỉ và thông tin sản phẩm để tạo đơn hàng ngay trong khung chat.",
    bullets: [
      "Trích xuất thông tin khách hàng chính xác bằng AI",
      "Tự động tính phí ship và thông báo trạng thái đơn",
      "Đồng bộ trực tiếp với hệ thống quản lý bán hàng (POS / ERP)",
    ],
    cta: "Khám phá tạo đơn tự động",
    mockType: "order",
  },
  {
    id: "notes-schedule",
    icon: <CalendarDays className="w-5 h-5" />,
    title: "Ghi Chú & Lập Lịch Tự Động",
    subtitle: "Nhắc lịch hẹn, lịch tư vấn và chăm sóc khách hàng",
    description: "AI tự động phát hiện các cuộc hẹn trong hội thoại, tạo nhắc nhở cho tư vấn viên và gửi tin nhắn thông báo tự động cho khách hàng đúng giờ.",
    bullets: [
      "Tự động phát hiện ngày giờ hẹn trong tin nhắn",
      "Tích hợp Google Calendar và hệ thống nhắc nhở nội bộ",
      "Gửi thông báo nhắc lịch tự động cho khách trước 1 giờ",
    ],
    cta: "Tìm hiểu lập lịch AI",
    mockType: "schedule",
  },
  {
    id: "sentiment",
    icon: <Frown className="w-5 h-5" />,
    title: "Phân Tích Cảm Xúc & Cảnh Báo Khủng Hoảng",
    subtitle: "Phát hiện sớm khách hàng bức xúc để xử lý kịp thời",
    description: "Hệ thống AI giám sát độ hài lòng của khách hàng theo thời gian thực. Tự động gắn cờ đỏ và điều phối ngay cho quản lý khi phát hiện phản hồi tiêu cực.",
    bullets: [
      "Nhận diện cảm xúc: Hài lòng, Thắc mắc, Bức xúc, Khiếu nại",
      "Cảnh báo tức thì qua Telegram / Zalo cho trưởng nhóm",
      "Giảm thiểu 95% nguy cơ bùng phát khủng hoảng truyền thông",
    ],
    cta: "Xem tính năng an toàn",
    mockType: "sentiment",
  },
  {
    id: "reports",
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Báo Cáo & Phân Tích Hiệu Suất Real-Time",
    subtitle: "Báo cáo chi tiết về chuyển đổi, doanh thu và năng suất nhân sự",
    description: "Theo dõi chính xác số lượng lead, tỷ lệ chốt đơn, thời gian phản hồi trung bình và hiệu quả tư vấn của từng kênh trong một dashboard trực quan.",
    bullets: [
      "Biểu đồ tăng trưởng tin nhắn và tỷ lệ chuyển đổi",
      "Đánh giá thời gian phản hồi SLA của từng nhân sự",
      "Xuất báo cáo định kỳ định dạng Excel / PDF",
    ],
    cta: "Xem mẫu báo cáo",
    mockType: "reports",
  },
];

function MockDisplay({ type }: { type: string }) {
  if (type === "chat" || type === "ai-reply") {
    return (
      <div className="space-y-3">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">KH</div>
          <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 text-xs sm:text-sm text-gray-200 max-w-[80%]">
            Shop ơi, bên mình có gói AI Chatbot kết nối Zalo OA và Fanpage không ạ? Giá khoảng bao nhiêu?
          </div>
        </div>
        <div className="flex items-start gap-2.5 justify-end">
          <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl rounded-tr-none p-3 text-xs sm:text-sm text-emerald-200 max-w-[85%] shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 mb-1">
              <Sparkles className="w-3 h-3" /> Letan AI Agent (Phản hồi sau 0.8s)
            </div>
            Dạ chào Anh/Chị! LETAN Media hỗ trợ kết nối đồng thời cả Zalo OA và Fanpage chỉ trong 5 phút. Dữ liệu được đồng bộ về 1 nơi và có hỗ trợ dùng thử miễn phí. Em gửi bảng tính năng chi tiết nhé!
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-gray-950 text-xs font-bold">AI</div>
        </div>
      </div>
    );
  }

  if (type === "order") {
    return (
      <div className="p-4 rounded-xl bg-white/[0.04] border border-emerald-500/30 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> AI Tạo Đơn Thành Công
          </span>
          <span className="text-[11px] text-gray-400">#LT-8942</span>
        </div>
        <div className="text-xs text-gray-300 space-y-1">
          <div><strong className="text-white">Khách hàng:</strong> Nguyễn Văn An (0912.xxx.899)</div>
          <div><strong className="text-white">Gói:</strong> Chatbot AI Doanh Nghiệp Pro (Zalo + Messenger)</div>
          <div><strong className="text-white">Địa chỉ:</strong> Quận 1, TP. Hồ Chí Minh</div>
        </div>
        <div className="pt-1 text-right">
          <span className="inline-block px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">Đã đồng bộ CRM</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
      <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
        <span>Hiệu suất vận hành hôm nay</span>
        <span className="text-emerald-400 font-semibold">+24.5%</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-white/5 p-2 rounded-lg">
          <div className="text-base font-bold text-white">1,480</div>
          <div className="text-[10px] text-gray-400">Tin nhắn AI xử lý</div>
        </div>
        <div className="bg-white/5 p-2 rounded-lg">
          <div className="text-base font-bold text-emerald-400">0.8s</div>
          <div className="text-[10px] text-gray-400">Tốc độ phản hồi</div>
        </div>
        <div className="bg-white/5 p-2 rounded-lg">
          <div className="text-base font-bold text-cyan-400">98.2%</div>
          <div className="text-[10px] text-gray-400">Độ hài lòng</div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [openId, setOpenId] = useState<string>("multi-channel");

  return (
    <section id="features" className="py-20 sm:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Tính Năng <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Đột Phá Của AI Agent</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Hệ sinh thái tự động hóa toàn diện giúp doanh nghiệp tiếp cận khách hàng nhanh hơn 10 lần, 
            tiết kiệm 80% chi phí nhân sự và tối đa hóa doanh thu.
          </p>
        </motion.div>

        {/* Feature Accordion Items */}
        <div className="space-y-4">
          {features.map((feature, index) => {
            const isOpen = openId === feature.id;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "bg-white/[0.04] border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.12)]" 
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
                }`}
              >
                {/* Header button */}
                <button
                  onClick={() => setOpenId(isOpen ? "" : feature.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                      isOpen 
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.25)]" 
                        : "bg-white/5 text-gray-400 border border-white/5"
                    }`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className={`text-base sm:text-lg font-bold transition-colors ${
                        isOpen ? "text-white" : "text-gray-200"
                      }`}>
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mt-0.5 line-clamp-1">
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-2 ${
                    isOpen ? "rotate-180 text-emerald-400" : ""
                  }`} />
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-7 border-t border-white/5 pt-5">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          {/* Left text & bullets */}
                          <div className="lg:col-span-7 space-y-4">
                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                              {feature.description}
                            </p>
                            <div className="space-y-2.5 pt-1">
                              {feature.bullets.map((bullet, i) => (
                                <div key={i} className="flex items-start gap-2.5">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-gray-300 font-medium">{bullet}</span>
                                </div>
                              ))}
                            </div>
                            <div className="pt-3">
                              <a
                                href="tel:0765178999"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs sm:text-sm font-semibold hover:bg-emerald-500/30 hover:scale-105 transition-all"
                              >
                                <span>{feature.cta}</span>
                                <Sparkles className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>

                          {/* Right simulated preview */}
                          <div className="lg:col-span-5 bg-[#0a0f1d] border border-white/10 rounded-2xl p-4 shadow-xl">
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                              <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                <span className="text-[11px] font-mono text-gray-400 ml-2">LETAN AI Console</span>
                              </div>
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            </div>
                            <MockDisplay type={feature.mockType} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
