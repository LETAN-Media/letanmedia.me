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
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-green-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-emerald-50/50 to-transparent" />
      </div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full mb-8"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-700">
            AI Agent thế hệ mới — Đã có mặt tại Việt Nam
          </span>
        </motion.div>
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
        >
          Cách mạng hóa{" "}
          <span className="relative inline-block">
            <span className="text-emerald-600">{displayText}</span>
            <span className="absolute right-[-4px] top-0 h-full w-[3px] bg-emerald-500 animate-pulse" />
          </span>{" "}
          <br className="hidden sm:block" />
          với AI
        </motion.h1>
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Quản lý các kênh nhắn tin tại một nơi để đơn giản hóa hoạt động kinh doanh.
          <br className="hidden sm:block" />
          Sử dụng Chatbot AI Agent của LetanMedia là miễn phí!
        </motion.p>
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#features"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full overflow-hidden transition-all hover:shadow-xl hover:shadow-gray-900/20"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Bắt đầu miễn phí</span>
            <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="tel:0765178999"
            className="inline-flex items-center gap-2 px-8 py-4 text-gray-700 font-semibold rounded-full border-2 border-gray-200 hover:border-emerald-300 hover:text-emerald-600 transition-all"
          >
            Tư vấn ngay
          </a>
        </motion.div>
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-10 border-t border-gray-100"
        >
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
            Hơn 500+ doanh nghiệp đã tin dùng từ 10+ quốc gia
          </p>
        </motion.div>
      </div>
    </section>
  );
}
