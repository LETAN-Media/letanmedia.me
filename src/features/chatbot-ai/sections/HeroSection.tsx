import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
const typingWords = [
  "Hỗ trợ khách hàng",
  "Tư vấn bán hàng",
  "Chăm sóc 24/7",
  "Tự động hóa",
];
export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");
  useEffect(() => {
    const currentWord = typingWords[wordIndex] ?? ''
    const speed = isDeleting ? 50 : 100;
    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentWord.length) {
        setDisplayText(currentWord.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentWord.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % typingWords.length);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);
  return (
    <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-300 tracking-wide">
            AI Agent Thế Hệ Mới — Tự Động Hóa Toàn Diện
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6"
        >
          Cách mạng hóa{" "}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              {displayText}
            </span>
            <span className="absolute right-[-6px] top-1 bottom-1 w-[3px] bg-emerald-400 animate-pulse" />
          </span>{" "}
          <br />
          với Chatbot AI
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Đồng bộ mọi kênh nhắn tin (Zalo, Facebook, Telegram, WhatsApp) trên một nền tảng duy nhất. 
          Tự động tư vấn, chốt đơn và chăm sóc khách hàng 24/7 với trí tuệ nhân tạo.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="tel:0765178999"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-400 to-teal-400 text-gray-950 font-bold text-base rounded-full shadow-[0_0_30px_rgba(45,212,167,0.35)] hover:shadow-[0_0_45px_rgba(45,212,167,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span>Tư Vấn Miễn Phí 24/7</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold text-base rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] hover:border-emerald-400/50 backdrop-blur-sm transition-all duration-300"
          >
            <span>Khám Phá Tính Năng</span>
          </a>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/10"
        >
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">&lt; 1 giây</div>
            <div className="text-xs sm:text-sm text-gray-400">Tốc độ phản hồi tức thì</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">24/7</div>
            <div className="text-xs sm:text-sm text-gray-400">Hoạt động không nghỉ</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">80%+</div>
            <div className="text-xs sm:text-sm text-gray-400">Tự động xử lý thắc mắc</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">6+ Kênh</div>
            <div className="text-xs sm:text-sm text-gray-400">Đồng bộ đa nền tảng</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
