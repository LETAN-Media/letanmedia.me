import { motion } from "framer-motion";
import {
  ShoppingCart,
  GraduationCap,
  Building2,
  UtensilsCrossed,
  HeartPulse,
  Plane,
  ArrowRight,
  Layers,
} from "lucide-react";

const useCases = [
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Bán lẻ & Thương mại điện tử",
    badge: "Tăng 35% tỷ lệ chốt",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    iconBg: "bg-gradient-to-br from-orange-500/20 to-amber-500/10 text-orange-400 border-orange-500/30",
    description:
      "Tư vấn sản phẩm chuẩn xác theo sở thích, tự động tra cứu tồn kho, xử lý đơn hàng và thông báo trạng thái giao hàng tức thì.",
    impact: "Tự động upsell & cross-sell theo lịch sử xem hàng",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Giáo dục & Tuyển sinh",
    badge: "Tự động 90% tư vấn",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    iconBg: "bg-gradient-to-br from-blue-500/20 to-cyan-500/10 text-blue-400 border-blue-500/30",
    description:
      "Tư vấn khóa học, phân tích trình độ học viên, cung cấp học phí và tự động nhắc nhở lịch khai giảng hoặc nộp bài tập qua Zalo.",
    impact: "Tích hợp đồng bộ hệ thống LMS & CRM giáo dục",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Bất động sản & Tài chính",
    badge: "Sàng lọc Lead 24/7",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    iconBg: "bg-gradient-to-br from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30",
    description:
      "Sàng lọc khách hàng tiềm năng, tính bảng lãi suất dự kiến, gửi tài liệu dự án và tự động chuyển giao cho nhân viên tư vấn VIP.",
    impact: "Bảo mật đa tầng & tuân thủ quy chuẩn dữ liệu",
  },
  {
    icon: <UtensilsCrossed className="w-6 h-6" />,
    title: "Nhà hàng & Chuỗi F&B",
    badge: "Giảm 0s chờ đợi",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    iconBg: "bg-gradient-to-br from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/30",
    description:
      "Đặt bàn tự động, gợi ý menu theo khẩu vị, ghi nhận yêu cầu dị ứng và gửi voucher tri ân khách hàng thân thiết định kỳ.",
    impact: "Kết nối trực tiếp hệ thống POS & máy in hóa đơn",
  },
  {
    icon: <HeartPulse className="w-6 h-6" />,
    title: "Y tế, Nha khoa & Thẩm mỹ",
    badge: "Giảm 50% no-show",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    iconBg: "bg-gradient-to-br from-rose-500/20 to-pink-500/10 text-rose-400 border-rose-500/30",
    description:
      "Đặt lịch khám online, gửi tin nhắn tự động nhắc hẹn trước 24h, hướng dẫn quy trình tiền phẫu và theo dõi sau điều trị tận tâm.",
    impact: "Chăm sóc sau khám 1-1 không bỏ sót bệnh nhân",
  },
  {
    icon: <Plane className="w-6 h-6" />,
    title: "Du lịch, Khách sạn & Nghỉ dưỡng",
    badge: "Đa ngôn ngữ Quốc tế",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    iconBg: "bg-gradient-to-br from-cyan-500/20 to-teal-500/10 text-cyan-400 border-cyan-500/30",
    description:
      "Hỗ trợ du khách trong và ngoài nước đặt phòng, tư vấn lịch trình tour, giải đáp thắc mắc dịch vụ bằng tiếng Việt, Anh, Hàn, Trung...",
    impact: "Phục vụ khách quốc tế không lo rào cản múi giờ",
  },
];

export function UseCasesSection() {
  return (
    <section id="usecases" className="py-20 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-wider text-emerald-400 uppercase mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Tailored Industry Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Tùy biến chuyên sâu cho <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              từng lĩnh vực kinh doanh
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Không có kịch bản rập khuôn. LETAN Media huấn luyện mô hình AI trên chính dữ liệu sản phẩm, tài liệu nội bộ và ngôn ngữ giao tiếp đặc thù của doanh nghiệp bạn.
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {useCases.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(47,212,167,0.1)] transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Header: Icon + Badge */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center ${item.iconBg} transition-transform group-hover:scale-110 duration-300`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Bottom Impact & Action Link */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">
                  {item.impact}
                </span>
                <a
                  href="tel:0765178999"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors"
                >
                  <span>Tư vấn</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
