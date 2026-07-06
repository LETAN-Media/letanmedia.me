import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageSquare, X, Send } from 'lucide-react';
import './HomeChatWidget.css';

const suggestions = [
  "Tư vấn Report TikTok",
  "Tư vấn Report YouTube",
  "Đăng ký Tích Xanh",
  "Thiết kế Website & AI"
];

export default function HomeChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Chào bạn, Tôi là trợ lý AI của LETAN Media. Tôi có thể giúp gì cho bạn. ?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSendRef = useRef(null);
  useEffect(() => {
    handleSendRef.current = handleSend;
  });

  useEffect(() => {
    const handleOpenEvent = (e) => {
      setIsOpen(true);
      if (e.detail && e.detail.message) {
        // Wait a small bit for opening animation before sending message
        setTimeout(() => {
          if (handleSendRef.current) {
            handleSendRef.current(e.detail.message);
          }
        }, 300);
      }
    };

    window.addEventListener('open-home-chatbot', handleOpenEvent);
    return () => {
      window.removeEventListener('open-home-chatbot', handleOpenEvent);
    };
  }, []);

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    if (!textToSend) {
      setInput('');
    }

    const updatedMessages = [...messages, { role: 'user', content: text }];
    setMessages(updatedMessages);
    setIsLoading(true);

    const fallbackMessage = "🤖 Hệ thống AI của LETAN Media hiện đang được nâng cấp.\n\nĐể nhận hỗ trợ trực tiếp và báo giá dịch vụ ngay lập tức, vui lòng liên hệ:\n\n📞 Hotline/Zalo: [Gọi/Nhắn Zalo 0765 178 999](https://zalo.me/0765178999)\n💬 Telegram: [Nhắn Telegram @Tanlemedia](https://t.me/Tanlemedia)";

    const systemPromptMessage = {
      role: "system",
      content: `Bạn là chatbot tư vấn và chăm sóc khách hàng (CSKH) của LETAN Media.
Nhiệm vụ chính là tư vấn ngắn gọn và ĐIỀU HƯỚNG người dùng đến đúng các trang dịch vụ của chúng tôi bằng liên kết Markdown dạng: [Tên Nút](/tên-route).

CÁC ROUTE ĐIỀU HƯỚNG BẮT BUỘC DÙNG (KHI NÓI ĐẾN DỊCH VỤ TƯƠNG ỨNG):
1. Dịch vụ Report TikTok (hoặc report kênh/video TikTok vi phạm, giả mạo, tích xanh TikTok...): chèn [Xem Chi Tiết Dịch Vụ TikTok](/tiktok-report) ở dòng cuối.
2. Dịch vụ Report YouTube (bản quyền YouTube, gỡ gậy, giả mạo YouTube...): chèn [Xem Chi Tiết Dịch Vụ YouTube](/youtube-report) ở dòng cuối.
3. Dịch vụ Chatbot AI, phần mềm, thiết kế web, CRM: chèn [Tìm Hiểu Giải Pháp Chatbot AI](/chatbot-ai) ở dòng cuối.
4. Bất kỳ dịch vụ nào khác hoặc khi khách cần báo giá tổng thể: Hãy hướng dẫn khách liên hệ qua Zalo: [Liên Hệ Qua Zalo](https://zalo.me/0765178999) hoặc Telegram: [Liên Hệ Qua Telegram](https://t.me/Tanlemedia).

QUY TẮC CỐNG LẠM DỤNG (BẮT BUỘC):
- Trả lời ngắn gọn, cô đọng, không viết dông dài.
- Tuyệt đối không viết code, không làm thơ, không làm toán.
- Luôn luôn chèn liên kết markdown tương ứng ở dòng cuối để điều hướng người dùng.`
    };

    const payloadMessages = [
      systemPromptMessage,
      ...updatedMessages.map(m => ({ role: m.role, content: m.content }))
    ];

    try {
      const chatApiUrl = import.meta.env.VITE_CHATBOT_API_URL || '/api/home-chat/chat';
      const response = await fetch(chatApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: payloadMessages
        })
      });

      if (response.status !== 200) {
        throw new Error("HTTP error " + response.status);
      }

      const data = await response.json();

      if (data && data.success && data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
        setConsecutiveErrors(0);
      } else {
        const nextErrorCount = consecutiveErrors + 1;
        setConsecutiveErrors(nextErrorCount);
        
        const finalMessage = nextErrorCount >= 2 
          ? "⚠️ Trợ lý AI đang bận. Đã chuyển sang chế độ liên hệ khẩn cấp:\n\n📞 Zalo: [Nhắn Zalo Ngay](https://zalo.me/0765178999)\n💬 Telegram: [Nhắn Telegram Ngay](https://t.me/Tanlemedia)"
          : (data.message || fallbackMessage);
          
        setMessages(prev => [...prev, { role: 'assistant', content: finalMessage }]);
      }
    } catch (error) {
      console.error('Home chat error:', error);
      const nextErrorCount = consecutiveErrors + 1;
      setConsecutiveErrors(nextErrorCount);
      
      const finalMessage = nextErrorCount >= 2 
        ? "⚠️ Trợ lý AI đang bận. Đã chuyển sang chế độ liên hệ khẩn cấp:\n\n📞 Zalo: [Nhắn Zalo Ngay](https://zalo.me/0765178999)\n💬 Telegram: [Nhắn Telegram Ngay](https://t.me/Tanlemedia)"
        : fallbackMessage;

      setMessages(prev => [...prev, { role: 'assistant', content: finalMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessageContent = (content) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const links = [];
    let cleanText = content;

    const matches = [...content.matchAll(regex)];
    if (matches.length > 0) {
      matches.forEach(m => {
        cleanText = cleanText.replace(m[0], '');
        links.push({ text: m[1], url: m[2] });
      });
    }

    cleanText = cleanText.trim().replace(/\n{2,}/g, '\n\n');

    return (
      <div className="message-bubble-wrapper">
        <div style={{ whiteSpace: 'pre-wrap' }}>{cleanText}</div>
        {links.length > 0 && (
          <div className="message-action-links">
            {links.map((link, lIdx) => {
              if (link.url.startsWith('http')) {
                return (
                  <a 
                    key={lIdx} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="chat-action-btn"
                  >
                    {link.text}
                  </a>
                );
              } else {
                return (
                  <Link 
                    key={lIdx} 
                    to={link.url} 
                    className="chat-action-btn"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.text}
                  </Link>
                );
              }
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="home-chat-widget">
      {/* Floating Button */}
      <motion.button
        className="home-chat-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="home-pulse-glow" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="home-chat-window"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="home-chat-header">
              <div className="home-chat-header-info">
                <div className="home-bot-avatar">LT</div>
                <div className="home-bot-name">
                  <h4>LETAN Assistant</h4>
                  <div className="home-bot-status">
                    <span className="home-status-dot"></span>
                    <span>Sẵn sàng hỗ trợ</span>
                  </div>
                </div>
              </div>
              <button className="home-chat-close" onClick={() => setIsOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="home-chat-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`home-chat-message ${msg.role}`}>
                  {renderMessageContent(msg.content)}
                </div>
              ))}
              
              {isLoading && (
                <div className="home-chat-loading">
                  <span className="home-chat-loading-dot"></span>
                  <span className="home-chat-loading-dot"></span>
                  <span className="home-chat-loading-dot"></span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions */}
            <div className="home-chat-suggestions">
              {suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  className="home-chat-suggest-btn"
                  onClick={() => handleSend(sug)}
                  disabled={isLoading}
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="home-chat-input-area">
              <input
                type="text"
                className="home-chat-input"
                placeholder="Nhập nội dung tin nhắn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <button
                className="home-chat-send-btn"
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
