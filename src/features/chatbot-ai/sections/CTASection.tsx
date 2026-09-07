import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Phone, Mail, ShieldCheck, Clock, CheckCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 p-8 sm:p-14 lg:p-16 text-center overflow-hidden backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.6)]"
        >
          {/* Ambient internal light */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 uppercase mb-8">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ready for Next-Gen AI Automation</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            Sẵn sàng nâng tầm vận hành <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              với Chatbot AI Agent đột phá?
            </span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Đừng để khách hàng rời đi vì phản hồi chậm trễ. Hãy để đội ngũ LETAN Media đồng hành cùng bạn xây dựng hệ thống AI tự động hóa chăm sóc khách hàng 24/7 ngay hôm nay.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="tel:0765178999"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-sm tracking-wide rounded-full hover:shadow-[0_0_35px_rgba(47,212,167,0.4)] transition-all duration-300 active:scale-95"
            >
              <Phone className="w-4 h-4 text-black" />
              <span>Gọi Ngay: 0765 178 999</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="mailto:infor@letanmedia.me"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-gray-200 font-semibold text-sm rounded-full bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>infor@letanmedia.me</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-gray-400 font-mono">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Triển khai nhanh trong 48h</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Bảo mật dữ liệu chuẩn doanh nghiệp</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Hỗ trợ kỹ thuật 24/7</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
