import { motion } from "framer-motion";
import {
  MessageCircle,
  Globe,
  Smartphone,
  Bot,
  ArrowRight,
  Check,
  Radio,
  Sparkles,
} from "lucide-react";

const channels = [
  {
    name: "Zalo OA",
    description: "Tích hợp Zalo Official Account chính thức. Tự động phản hồi tin nhắn khách hàng, gửi thông báo chăm sóc định kỳ.",
    icon: <MessageCircle className="w-6 h-6" />,
    badge: "Phổ biến nhất VN",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    glowColor: "group-hover:border-blue-500/40 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]",
    iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    features: ["Tự động trả lời 24/7", "Gửi tin ZNS / Broadcast", "Đồng bộ tệp khách hàng Zalo"],
  },
  {
    name: "Facebook Messenger",
    description: "Tự động trả lời inbox Fanpage và ẩn/phản hồi bình luận bài viết bán hàng để chống cướp khách ngay lập tức.",
    icon: <MessageCircle className="w-6 h-6" />,
    badge: "Meta Partner API",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    glowColor: "group-hover:border-indigo-500/40 group-hover:shadow-[0_0_25px_rgba(99,102,241,0.15)]",
    iconBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    features: ["Tự động inbox khi comment", "Tạo kịch bản chốt đơn", "Tích hợp Ads Click to Messenger"],
  },
  {
    name: "Telegram Bot",
    description: "Kết nối Telegram Bot API bảo mật cao. Hỗ trợ nhóm nội bộ, kênh cộng đồng và quản trị hệ thống tự động.",
    icon: <MessageCircle className="w-6 h-6" />,
    badge: "Bảo mật & Tốc độ",
    badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    glowColor: "group-hover:border-sky-500/40 group-hover:shadow-[0_0_25px_rgba(14,165,233,0.15)]",
    iconBg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    features: ["Hỗ trợ Group & Channel", "Gửi cảnh báo Real-time", "Inline query tốc độ siêu nhanh"],
  },
  {
    name: "WhatsApp Business",
    description: "Kết nối WhatsApp Cloud API phục vụ khách hàng toàn cầu, kiều bào và đối tác thương mại quốc tế.",
    icon: <Smartphone className="w-6 h-6" />,
    badge: "Toàn cầu hóa",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    glowColor: "group-hover:border-emerald-500/40 group-hover:shadow-[0_0_25px_rgba(47,212,167,0.15)]",
    iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    features: ["WhatsApp Business API", "Mẫu tin xác nhận đơn", "Hỗ trợ đa tiền tệ & ngôn ngữ"],
  },
  {
    name: "Lark / Feishu",
    description: "Giải pháp cho doanh nghiệp hiện đại: tích hợp trợ lý nội bộ vào Lark Base, Workflow và phê duyệt tự động.",
    icon: <Bot className="w-6 h-6" />,
    badge: "Enterprise Internal",
    badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    glowColor: "group-hover:border-teal-500/40 group-hover:shadow-[0_0_25px_rgba(20,184,166,0.15)]",
    iconBg: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    features: ["Đồng bộ dữ liệu Base", "Tự động hóa phê duyệt", "Trợ lý tra cứu tri thức nội bộ"],
  },
  {
    name: "Website Live Chat Widget",
    description: "Widget thông minh gắn trực tiếp lên website doanh nghiệp, tùy biến 100% nhận diện thương hiệu và màu sắc.",
    icon: <Globe className="w-6 h-6" />,
    badge: "Nhẹ & Tối ưu SEO",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    glowColor: "group-hover:border-cyan-500/40 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]",
    iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    features: ["Tải trang dưới 50ms", "Chủ động mở lời (Proactive)", "Đồng bộ CRM / Webhook"],
  },
];

export function ChannelsSection() {
  return (
    <section id="channels" className="py-20 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-wider text-cyan-400 uppercase mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>Omnichannel Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Một nền tảng duy nhất — <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Đồng bộ toàn bộ kênh liên lạc
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Dữ liệu khách hàng, ngữ cảnh trò chuyện và lịch sử giao dịch được hợp nhất liên tục theo thời gian thực. Khách hàng nhắn ở bất kỳ đâu, AI đều thấu hiểu tức thì.
          </p>
        </motion.div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {channels.map((channel, index) => (
            <motion.div
              key={channel.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/10 ${channel.glowColor} transition-all duration-300 hover:-translate-y-1`}
            >
              <div>
                {/* Header: Icon + Badge */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center ${channel.iconBg} transition-transform group-hover:scale-110 duration-300`}
                  >
                    {channel.icon}
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${channel.badgeColor}`}
                  >
                    {channel.badge}
                  </span>
                </div>

                {/* Name & Desc */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {channel.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {channel.description}
                </p>
              </div>

              {/* Features List */}
              <div className="pt-5 border-t border-white/5 space-y-2.5">
                {channel.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5 text-xs text-gray-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
