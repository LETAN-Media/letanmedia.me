import { motion } from "framer-motion";
import {
  ShoppingCart,
  GraduationCap,
  Building2,
  UtensilsCrossed,
  HeartPulse,
  Plane,
  ArrowRight,
} from "lucide-react";
const useCases = [
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Bán hàng & Thương mại điện tử",
    description:
      "Tư vấn sản phẩm 24/7, xử lý đơn hàng, theo dõi vận chuyển, chăm sóc sau bán. AI hiểu nhu cầu và gợi ý sản phẩm phù hợp.",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Giáo dục & Đào tạo",
    description:
      "Tư vấn khóa học, lập lịch học, nhắc nhở bài tập, hỗ trợ học viên. Tích hợp với hệ thống LMS.",
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Ngân hàng & Tài chính",
    description:
      "Tư vấn sản phẩm tài chính, hỗ trợ tra cứu thông tin, xử lý yêu cầu. Đảm bảo bảo mật và tuân thủ quy định.",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
  },
  {
    icon: <UtensilsCrossed className="w-6 h-6" />,
    title: "Nhà hàng & F&B",
    description:
      "Đặt bàn, gọi món, tư vấn menu, xử lý feedback. Tích hợp với hệ thống POS và quản lý bếp.",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
  },
  {
    icon: <HeartPulse className="w-6 h-6" />,
    title: "Y tế & Sức khỏe",
    description:
      "Đặt lịch khám, tư vấn sức khỏe cơ bản, nhắc nhở uống thuốc. Tích hợp với hệ thống quản lý bệnh viện.",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-100",
  },
  {
    icon: <Plane className="w-6 h-6" />,
    title: "Du lịch & Khách sạn",
    description:
      "Tư vấn tour, đặt phòng, hỗ trợ hành khách 24/7. Đa ngôn ngữ, đa kênh.",
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-100",
  },
];
export function UseCasesSection() {
  return (
    <section id="usecases" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ứng dụng đa ngành
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Chatbot AI Agent của LetanMedia được tùy biến theo đặc thù từng ngành nghề. Dù bạn kinh doanh gì, AI đều có thể hỗ trợ.
          </p>
        </motion.div>
        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative p-6 rounded-2xl border ${item.borderColor} ${item.bgColor} hover:shadow-lg transition-all duration-300`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {item.description}
              </p>
              <a
                href="tel:0765178999"
                className="inline-flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-emerald-600 transition-colors"
              >
                Tìm hiểu thêm
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
