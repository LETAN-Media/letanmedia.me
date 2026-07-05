import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
const quickReplies = [
  "Tôi muốn tạo chatbot",
  "Bảng giá dịch vụ",
  "Hỗ trợ kỹ thuật",
  "Tư vấn miễn phí",
];
const initialMessages = [
  {
    id: 1,
    sender: "bot",
    text: "Xin chào Anh/Chị, Chatbot AI Agent LetanMedia có thể hỗ trợ được gì anh/chị ạ?",
    time: "Vừa xong",
  },
];
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text,
      time: "Vừa xong",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    // Simulate bot response
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        "Tôi muốn tạo chatbot": "Dạ, LetanMedia hỗ trợ tạo chatbot cho Zalo, Telegram, WhatsApp, Facebook, Website, và Lark. Anh/Chị muốn tạo cho kênh nào ạ? Hotline: 0765.178.999",
        "Bảng giá dịch vụ": "Dạ, LetanMedia có gói Miễn phí để trải nghiệm. Gói Pro chỉ từ 499K/tháng với đầy đủ tính năng AI. Anh/Chị để lại SĐT, team em sẽ gửi báo giá chi tiết ạ.",
        "Hỗ trợ kỹ thuật": "Dạ, team kỹ thuật LetanMedia hỗ trợ 24/7. Anh/Chị vui lòng mô tả lỗi gặp phải hoặc gọi hotline 0765.178.999 để được hỗ trợ ngay ạ.",
        "Tư vấn miễn phí": "Dạ, LetanMedia tư vấn miễn phí. Anh/Chị vui lòng để lại SĐT hoặc gọi hotline 0765.178.999, team em sẽ liên hệ trong 5 phút ạ.",
      };
      const botText = botResponses[text] || "Dạ, LetanMedia đã nhận được tin nhắn. Team sẽ phản hồi sớm nhất. Hotline hỗ trợ 24/7: 0765.178.999 ạ.";
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: botText,
          time: "Vừa xong",
        },
      ]);
    }, 800);
  };
  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gray-900 rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full border-2 border-gray-900 animate-ping opacity-20" />
          </motion.button>
        )}
      </AnimatePresence>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
            style={{ height: "520px", maxHeight: "calc(100vh - 100px)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">LetanAI Agent</p>
                  <p className="text-xs text-gray-400">Trực tuyến</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                    msg.sender === "bot" ? "bg-emerald-500" : "bg-gray-300"
                  }`}>
                    {msg.sender === "bot" ? (
                      <Bot className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-white" />
                    )}
                  </div>
                  <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "bot"
                      ? "bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-sm"
                      : "bg-emerald-500 text-white rounded-tr-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {/* Quick Replies */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSend(reply)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-emerald-300 hover:text-emerald-600 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Input */}
            <div className="p-3 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all"
                />
                <button
                  onClick={() => handleSend(inputValue)}
                  className="p-2.5 bg-emerald-500 rounded-full text-white hover:bg-emerald-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
