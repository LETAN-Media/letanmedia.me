import { motion } from "framer-motion";
import { Hash, Smartphone, Zap, Layers, ArrowRight } from "lucide-react";
const mobileFeatures = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Đơn giản và Nhanh chóng",
    description: "Chỉ với vài thao tác, bạn đã có thể tạo chatbot AI Agent hoạt động ngay lập tức. Không cần kiến thức lập trình.",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "Các ứng dụng tại một nơi",
    description: "Tích hợp mọi ứng dụng doanh nghiệp vào một nền tảng duy nhất. Quản lý chat, ghi chú, lập lịch, tạo đơn hàng, đặt phòng, kiểm kho, xem báo cáo một cách liền mạch.",
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    title: "Điều hành Doanh nghiệp ở mọi nơi",
    description: "Theo dõi và điều hành doanh nghiệp của bạn từ bất kỳ đâu, trên mọi thiết bị. Mobile-first design giúp bạn không bỏ lỡ bất kỳ tin nhắn nào.",
  },
];
export function MobileFirstSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Mobile-First
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Chúng tôi tập trung vào việc tối ưu hóa trải nghiệm trên ứng dụng di động, giúp bạn truy cập nhanh chóng và dễ dàng, mọi lúc mọi nơi.
          </p>
        </motion.div>
        <div className="space-y-6">
          {mobileFeatures.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all bg-gray-50/50"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <div className="relative w-64 h-[500px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full" />
            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
              <div className="bg-emerald-500 p-4 pt-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Hash className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm">LetanAI</span>
                </div>
              </div>
              <div className="flex-1 p-3 space-y-2 bg-gray-50">
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex-shrink-0" />
                  <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 text-xs text-gray-600 shadow-sm">
                    Xin chào! Tôi có thể giúp gì ạ?
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <div className="bg-emerald-500 rounded-2xl rounded-tr-sm px-3 py-2 text-xs text-white">
                    Tôi muốn tạo chatbot
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex-shrink-0" />
                  <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 text-xs text-gray-600 shadow-sm">
                    Dạ, em hỗ trợ ngay ạ!
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white border-t border-gray-100">
                <div className="h-8 bg-gray-100 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
