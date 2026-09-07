import { motion } from "framer-motion";
import { Users, Zap, TrendingUp, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const advantages = [
  {
    tag: "Dành cho Khách hàng",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    glowColor: "group-hover:border-emerald-500/40 group-hover:shadow-[0_0_30px_rgba(47,212,167,0.12)]",
    iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: <Users className="w-6 h-6" />,
    title: "Phản hồi tức thì & Cá nhân hóa sâu sắc",
    description:
      "Khách hàng không bao giờ phải chờ đợi. Trợ lý AI thấu hiểu ngữ cảnh, nhớ lịch sử giao dịch và phản hồi tự nhiên, tinh tế như chuyên viên tư vấn hàng đầu.",
    highlights: ["Phản hồi dưới 1 giây", "Nhận diện cảm xúc & ngữ cảnh", "Hỗ trợ đa ngôn ngữ"],
  },
  {
    tag: "Dành cho Đội ngũ & Nhân sự",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    glowColor: "group-hover:border-cyan-500/40 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]",
    iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    icon: <Zap className="w-6 h-6" />,
    title: "Giải phóng 80% khối lượng tác vụ lặp lại",
    description:
      "Tự động giải đáp thắc mắc FAQ, tra cứu tồn kho, tạo báo giá và phân loại ticket. Nhân viên được giải phóng để tập trung chốt sale các giao dịch giá trị cao.",
    highlights: ["Tự động trả lời 80%+ FAQ", "Tự tạo đơn & lưu CRM", "Tiết kiệm 4+ giờ/ngày/nhân sự"],
  },
  {
    tag: "Dành cho Quản lý & Lãnh đạo",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    glowColor: "group-hover:border-purple-500/40 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]",
    iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Ra quyết định chuẩn xác dựa trên dữ liệu thời gian thực",
    description:
      "Hệ thống phân tích báo cáo trực quan, nhận diện xu hướng hành vi khách hàng và cảnh báo cơ hội kinh doanh mới ngay lập tức mà không cần tổng hợp thủ công.",
    highlights: ["Dashboard báo cáo real-time", "Cảnh báo khủng hoảng & rủi ro", "Tối ưu hóa tỷ lệ chuyển đổi"],
  },
];

export function AIAdvantages() {
  return (
    <section className="py-20 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-wider text-emerald-400 uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-First Value Proposition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Giá trị đột phá cho <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              toàn bộ tổ chức của bạn
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Chúng tôi ứng dụng công nghệ AI tiên tiến để xử lý khối lượng công việc nặng nhọc,
            giúp doanh nghiệp tối ưu chi phí vận hành và bứt phá doanh số thần tốc.
          </p>
        </motion.div>

        {/* Advantage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {advantages.map((item, index) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              className={`group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 ${item.glowColor} transition-all duration-300 hover:-translate-y-1`}
            >
              <div>
                {/* Header: Tag + Icon */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${item.badgeColor}`}
                  >
                    {item.tag}
                  </span>
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center ${item.iconBg} transition-transform group-hover:scale-110 duration-300`}
                  >
                    {item.icon}
                  </div>
                </div>

                {/* Title & Desc */}
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Highlights List */}
              <div className="pt-6 border-t border-white/5 space-y-2.5">
                {item.highlights.map((point) => (
                  <div key={point} className="flex items-center gap-2.5 text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <a
            href="tel:0765178999"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-sm tracking-wide rounded-full hover:shadow-[0_0_35px_rgba(47,212,167,0.4)] transition-all duration-300 active:scale-95"
          >
            <span>Tư Vấn Miễn Phí Kiến Trúc AI</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
