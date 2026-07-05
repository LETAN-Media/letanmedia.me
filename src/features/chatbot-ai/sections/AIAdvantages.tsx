import { motion } from "framer-motion";
import { Hash, ArrowRight } from "lucide-react";
const advantages = [
  {
    tag: "Dành cho Khách hàng",
    title: "Trải nghiệm khách hàng vượt trội",
    description:
      "AI cải thiện trải nghiệm khách hàng bằng cách hỗ trợ nhân viên trong quá trình trò chuyện, giúp giảm thiểu thởi gian chờ đợi và tối ưu hóa sự hài lòng của khách hàng. Phản hồi tự nhiên như con người thật.",
    color: "text-orange-500",
    borderColor: "border-orange-200",
    bgColor: "bg-orange-50",
  },
  {
    tag: "Dành cho Nhân viên",
    title: "Giảm tải công việc lặp lại",
    description:
      "AI giải phóng nhân viên khỏi những công việc lặp lại, giúp họ tập trung vào những nhiệm vụ sáng tạo và tạo ra giá trị cao hơn trong công việc. Tự động trả lởi 80% câu hỏi thường gặp.",
    color: "text-emerald-600",
    borderColor: "border-emerald-200",
    bgColor: "bg-emerald-50",
  },
  {
    tag: "Dành cho Quản lý, Lãnh đạo",
    title: "Ra quyết định dựa trên dữ liệu",
    description:
      "Sử dụng sức mạnh của AI để Quản lý và Lãnh đạo ra quyết định nhanh hơn, chính xác hơn với dữ liệu thởi gian thực và cảnh báo thông minh. Giúp giảm rủi ro, tăng hiệu suất và nâng cao kết quả kinh doanh.",
    color: "text-red-500",
    borderColor: "border-red-200",
    bgColor: "bg-red-50",
  },
];
export function AIAdvantages() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            AI-First
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Chúng tôi sử dụng AI xử lý công việc nặng nhọc, nhằm chăn để bạn có thể làm những điều thú vị và tận hưởng cuộc sống.
          </p>
        </motion.div>
        {/* Advantage Cards */}
        <div className="space-y-6">
          {advantages.map((item, index) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl border ${item.borderColor} ${item.bgColor} transition-all hover:shadow-md`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                  <Hash className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <h3 className={`font-bold text-base mb-1 ${item.color}`}>
                    {item.tag}
                  </h3>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href="tel:0765178999"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all hover:shadow-xl"
          >
            Bắt đầu miễn phí
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
