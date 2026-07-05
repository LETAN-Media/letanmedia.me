import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2 } from "lucide-react";
import { REPORT_AGENT_SYSTEM_PROMPT } from "./buildSystemPrompt";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const BUBBLE_MESSAGES = [
  "👋 Xin chào bạn",
  "📱 Bạn cần report TikTok?",
  "🔥 Tư vấn miễn phí",
  "⚡ Nhấn để trò chuyện",
];

const BUBBLE_INTERVAL = 5000;

const INITIAL_MESSAGE: Message = {
  id: "init",
  role: "assistant",
  content:
    "👋 Chào bạn! Cần report TikTok? Hãy nhắn cho tôi nội dung cần hỗ trợ..",
  timestamp: new Date(),
};

export default function ReportAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;
    const interval = setInterval(() => {
      setShowBubble(false);
      setTimeout(() => {
        setBubbleIndex((prev) => (prev + 1) % BUBBLE_MESSAGES.length);
        setShowBubble(true);
      }, 300);
    }, BUBBLE_INTERVAL);
    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        chatWindowRef.current &&
        !chatWindowRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest("[data-trigger]")
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
    return undefined;
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const apiMessages = [
        {
          role: "user",
          content: `${REPORT_AGENT_SYSTEM_PROMPT}\n\nKhách hỏi: ${text}`,
        },
      ];

      const response = await fetch("/api/report-tiktok/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      const reply =
        data.choices?.[0]?.message?.content ||
        "Xin lỗi, tôi không thể trả lời lúc này. Vui lòng thử lại sau.";

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ trực tiếp với LETAN MEDIA.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => setIsOpen((prev) => !prev);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 md:bottom-6 md:right-6">
        <AnimatePresence>
          {!isOpen && showBubble && (
            <motion.div
              data-trigger
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={toggleChat}
              className="relative mb-1 cursor-pointer select-none"
            >
              <div className="rounded-2xl bg-white px-4 py-2.5 text-sm font-medium text-gray-800 shadow-lg shadow-black/10 ring-1 ring-black/5">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={bubbleIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="inline-block whitespace-nowrap"
                  >
                    {BUBBLE_MESSAGES[bubbleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 bg-white shadow-sm ring-1 ring-black/5" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          data-trigger
          onClick={toggleChat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center rounded-full shadow-xl shadow-black/20 ring-2 ring-white/20"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-[72px] w-[72px] overflow-hidden rounded-full md:h-[84px] md:w-[84px]">
            <img
              src="/chatbots/report-agent/tiktok.gif"
              alt="TikTok Report Agent"
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 md:h-4 md:w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-green-500 md:h-4 md:w-4" />
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-20 right-4 z-50 flex h-[520px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f] shadow-2xl shadow-black/40 md:bottom-24 md:right-6"
          >
            <div className="flex items-center gap-3 border-b border-white/10 bg-[#1a1a1a] px-4 py-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/10">
                <img
                  src="/chatbots/report-agent/tiktok.gif"
                  alt="Agent"
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-[#1a1a1a]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">TikTok Report Expert</h3>
                <p className="flex items-center gap-1 text-xs text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Đang hoạt động
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3">
              <div className="flex flex-col gap-3">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user" ? "bg-white/10 text-white" : "bg-[#1a1a1a] text-gray-100"
                    }`}>
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                      <div className={`mt-1 text-[10px] ${msg.role === "user" ? "text-white/40" : "text-gray-500"}`}>
                        {msg.timestamp.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                    <div className="flex items-center gap-1 rounded-2xl bg-[#1a1a1a] px-3.5 py-2.5">
                      <Loader2 size={14} className="animate-spin text-gray-400" />
                      <span className="text-xs text-gray-400">Đang trả lời...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-white/10 bg-[#1a1a1a] px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập tin nhắn..."
                    className="w-full rounded-xl bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-white/10 transition-all focus:ring-white/30"
                  />
                </div>
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-black transition-all hover:bg-gray-200 disabled:opacity-40"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
