import { Bot, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                Letan<span className="text-emerald-400">AI</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Chatbot AI Agent thế hệ mới — Tự động hóa tư vấn, bán hàng và chăm sóc khách hàng 24/7.
            </p>
          </div>
          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">
              Dịch vụ
            </h4>
            <ul className="space-y-3">
              {[
                "Chatbot Zalo",
                "Chatbot Telegram",
                "Chatbot WhatsApp",
                "Chatbot Website",
                "Chatbot Facebook",
                "Chatbot Lark",
              ].map((item) => (
                <li key={item}>
                  <span className="text-gray-400 text-sm hover:text-emerald-400 transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* Features */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">
              Tính năng
            </h4>
            <ul className="space-y-3">
              {[
                "Đa kênh",
                "AI tự động train",
                "Phân tích cảm xúc",
                "Báo cáo & Analytics",
                "Tích hợp CRM",
                "API & Webhook",
              ].map((item) => (
                <li key={item}>
                  <span className="text-gray-400 text-sm hover:text-emerald-400 transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">
              Liên hệ
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:0765178999"
                  className="flex items-center gap-2 text-gray-400 text-sm hover:text-emerald-400 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  0765.178.999
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@letanmedia.site"
                  className="flex items-center gap-2 text-gray-400 text-sm hover:text-emerald-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  support@letanmedia.site
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>LetanMedia — Social Media Services</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 LetanMedia. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-gray-500 text-sm hover:text-gray-300 transition-colors cursor-pointer">
              Privacy
            </span>
            <span className="text-gray-500 text-sm hover:text-gray-300 transition-colors cursor-pointer">
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
