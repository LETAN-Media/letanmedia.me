import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Phone, Mail } from "lucide-react";
export function CTASection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-emerald-50 to-transparent rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">
              Bắt đầu ngay hôm nay
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Một trải nghiệm hoàn toàn khác biệt
            <br />
            với AI bắt đầu từ đây...
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
            Đừng để khách hàng chờ đợi. Hãy để AI Agent của LetanMedia đồng hành cùng doanh nghiệp bạn 24/7.
          </p>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="tel:0765178999"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full overflow-hidden transition-all hover:shadow-xl hover:shadow-gray-900/20"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">Bắt đầu miễn phí</span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="mailto:support@letanmedia.site"
              className="inline-flex items-center gap-2 px-8 py-4 text-gray-700 font-semibold rounded-full border-2 border-gray-200 hover:border-emerald-300 hover:text-emerald-600 transition-all"
            >
              <Mail className="w-4 h-4" />
              Nhận tư vấn
            </a>
          </div>
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
            <a
              href="tel:0765178999"
              className="flex items-center gap-2 hover:text-emerald-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Hotline: 0765.178.999
            </a>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />
            <a
              href="mailto:support@letanmedia.site"
              className="flex items-center gap-2 hover:text-emerald-600 transition-colors"
            >
              <Mail className="w-4 h-4" />
              support@letanmedia.site
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
