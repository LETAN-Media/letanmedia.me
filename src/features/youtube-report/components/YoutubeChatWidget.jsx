import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ShieldCheck, Phone } from 'lucide-react';

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style={{ display: 'block' }}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.024 0 12 0 12s0 3.976.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.858.51 9.388.51 9.388.51s7.53 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.976 24 12 24 12s0-3.976-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const suggestions = [
  "Làm sao gỡ video bản quyền?",
  "Báo cáo kênh mạo danh?",
  "Làm sao report video bôi nhọ?",
  "Hỗ trợ gỡ gậy bản quyền Youtube?"
];

export default function YoutubeChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Chào bạn! Tôi là trợ lý AI của LETAN Media. Bạn cần tư vấn về vấn đề gì trên YouTube? Hãy nhắn cho tôi nhé!'
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

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    if (!textToSend) {
      setInput('');
    }

    const updatedMessages = [...messages, { role: 'user', content: text }];
    setMessages(updatedMessages);
    setIsLoading(true);

    const fallbackMessage = "🤖 LETAN Shield AI hiện đang bận hoặc đang được nâng cấp.\n\nĐể được hỗ trợ ngay, vui lòng liên hệ:\n\n📞 Hotline/Zalo: 0765 178 999\n💬 Telegram: @Tanlemedia";

    const systemPromptMessage = {
      role: "system",
      content: `Bạn là chatbot tư vấn chuyên biệt của LETAN Media.
Nhiệm vụ chính:
- Tư vấn dịch vụ report YouTube, xử lý kênh giả mạo, video bôi nhọ, fake news, bản quyền, livestream, vi phạm nguyên tắc cộng đồng.
- Trả lời ngắn gọn, chuyên nghiệp, dễ hiểu.
- Không hứa chắc 100% nếu chưa kiểm tra case. Khuyến khích khách gọi Hotline/Zalo.

QUY TẮC CHỐNG LẠM DỤNG (BẮT BUỘC TUÂN THỦ):
1. TUYỆT ĐỐI KHÔNG viết code, KHÔNG viết tool, phần mềm, script dưới bất kỳ hình thức nào.
2. TUYỆT ĐỐI KHÔNG làm toán, không viết văn, không làm thơ, không giải bài tập, không tư vấn kiến thức phổ thông ngoài lề.
3. Nếu người dùng hỏi những vấn đề không liên quan đến dịch vụ của LETAN Media, hãy từ chối lịch sự và hướng họ quay lại chủ đề chính.`
    };

    const payloadMessages = [
      systemPromptMessage,
      ...updatedMessages.map(m => ({ role: m.role, content: m.content }))
    ];

    try {
      const chatApiUrl = import.meta.env.VITE_CHATBOT_API_URL || '/api/report-youtube/chat';
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
          ? "⚠️ Hệ thống AI hiện không khả dụng. Đã chuyển sang chế độ **Tư vấn thủ công - Liên hệ ngay**.\n\nVui lòng liên hệ trực tiếp với chuyên viên để được hỗ trợ xử lý sự cố YouTube khẩn cấp:\n\n📞 Hotline/Zalo: 0765 178 999\n💬 Telegram: @Tanlemedia"
          : (data.message || fallbackMessage);
          
        setMessages(prev => [...prev, { role: 'assistant', content: finalMessage }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const nextErrorCount = consecutiveErrors + 1;
      setConsecutiveErrors(nextErrorCount);
      
      const finalMessage = nextErrorCount >= 2 
        ? "⚠️ Hệ thống AI hiện không khả dụng. Đã chuyển sang chế độ **Tư vấn thủ công - Liên hệ ngay**.\n\nVui lòng liên hệ trực tiếp với chuyên viên để được hỗ trợ xử lý sự cố YouTube khẩn cấp:\n\n📞 Hotline/Zalo: 0765 178 999\n💬 Telegram: @Tanlemedia"
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

  return (
    <div className="youtube-chat-widget">
      {/* Floating Button */}
      <motion.button
        className="youtube-chat-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <YoutubeIcon />}
        {!isOpen && (
          <span className="pulse-glow" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="youtube-chat-window"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="youtube-chat-header">
              <div className="youtube-chat-header-info">
                <div className="bot-avatar">
                  <div className="bot-avatar-inner">
                    <ShieldCheck size={20} />
                  </div>
                </div>
                <div>
                  <h4 className="bot-name">LETAN Shield AI</h4>
                  <span className="bot-status">Trực tuyến - Tư vấn 24/7</span>
                </div>
              </div>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="youtube-chat-body">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.role}`}>
                  <div className="message-bubble">
                    <p style={{ whiteSpace: 'pre-line', margin: 0 }}>{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="chat-message assistant loading">
                  <div className="message-bubble" style={{ minWidth: '180px' }}>
                    <p style={{ margin: '0 0 6px 0', fontSize: '0.8rem', opacity: 0.7 }}>
                      LETAN Shield AI đang suy nghĩ...
                    </p>
                    <div className="flex gap-1 items-center">
                      <span className="dot-flashing" />
                      <span className="dot-flashing" />
                      <span className="dot-flashing" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Manual Consult buttons when error occurs */}
            {consecutiveErrors >= 2 && (
              <div className="manual-consult-banner">
                <a href="tel:0765178999" className="consult-btn call">
                  <Phone size={14} style={{ marginRight: '6px' }} /> Gọi Hotline: 0765 178 999
                </a>
                <a href="https://t.me/Tanlemedia" target="_blank" rel="noopener noreferrer" className="consult-btn telegram">
                  <TelegramIcon size={14} style={{ marginRight: '6px' }} /> Nhắn Telegram @Tanlemedia
                </a>
              </div>
            )}

            {/* Suggestions */}
            {messages.length === 1 && !isLoading && (
              <div className="chat-suggestions">
                {suggestions.map((sug, idx) => (
                  <button 
                    key={idx} 
                    className="suggestion-chip"
                    onClick={() => handleSend(sug)}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Footer Input */}
            <div className="youtube-chat-footer">
              <input
                type="text"
                placeholder="Nhập câu hỏi của bạn tại đây..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <button 
                onClick={() => handleSend()} 
                disabled={isLoading || !input.trim()}
                className="send-btn"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
