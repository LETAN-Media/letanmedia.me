import { motion } from "framer-motion";
import {
  MessageCircle,
  Globe,
  Smartphone,
  Bot,
  ArrowRight,
  Check,
} from "lucide-react";
const channels = [
  {
    name: "Zalo OA",
    description: "Kết nối Zalo Official Account, tự động trả lởi tin nhắn khách hàng trên Zalo.",
    icon: <MessageCircle className="w-6 h-6" />,
    color: "bg-blue-500",
    features: ["Tự động trả lởi", "Gửi broadcast", "Quản lý follower"],
  },
  {
    name: "Telegram",
    description: "Tích hợp Telegram Bot API, hỗ trợ group và channel.",
    icon: <MessageCircle className="w-6 h-6" />,
    color: "bg-sky-500",
    features: ["Bot API", "Group support", "Inline queries"],
  },
  {
    name: "WhatsApp",
    description: "Kết nối WhatsApp Business API, tiếp cận khách hàng quốc tế.",
    icon: <Smartphone className="w-6 h-6" />,
    color: "bg-green-500",
    features: ["Business API", "Template messages", "Rich media"],
  },
  {
    name: "Facebook",
    description: "Tích hợp Fanpage Messenger, tự động hóa comment và inbox.",
    icon: <MessageCircle className="w-6 h-6" />,
    color: "bg-blue-600",
    features: ["Messenger", "Comment auto", "Lead ads"],
  },
  {
    name: "Lark / Feishu",
    description: "Kết nối Lark (Feishu) cho doanh nghiệp, hỗ trợ workflow.",
    icon: <Bot className="w-6 h-6" />,
    color: "bg-indigo-500",
    features: ["Bot integration", "Workflow", "Approval"],
  },
  {
    name: "Website",
    description: "Nhúng chat widget lên website, tùy chỉnh giao diện theo thương hiệu.",
    icon: <Globe className="w-6 h-6" />,
    color: "bg-emerald-500",
    features: ["Live chat", "Tùy chỉnh UI", "Proactive chat"],
  },
];
export function ChannelsSection() {
  return (
    <section id="channels" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Kết nối đa kênh
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Một nền tảng — Mọi kênh nhắn tin. Đồng bộ dữ liệu khách hàng real-time trên tất cả các kênh.
          </p>
        </motion.div>
        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((channel, index) => (
            <motion.div
              key={channel.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl border border-gray-100 bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${channel.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                {channel.icon}
              </div>
              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {channel.name}
              </h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                {channel.description}
              </p>
              {/* Features */}
              <div className="space-y-2">
                {channel.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
              {/* Hover arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 text-emerald-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
