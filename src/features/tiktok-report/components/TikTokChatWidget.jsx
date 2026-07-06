import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Phone, Send as TelegramIcon } from 'lucide-react';

const suggestions = [
  "Làm sao gỡ video bôi nhọ?",
  "Báo cáo reup bản quyền thế nào?",
  "Bên mình bảo mật thông tin ra sao?",
  "Livestream bị cấm làm sao gỡ?"
];

export default function TikTokChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Chào bạn! Tôi là trợ lý AI chuyên bảo vệ thương hiệu TikTok của LETAN Media. Bạn cần tư vấn về vấn đề gì (bản quyền, gỡ video bôi nhọ, phục hồi live...)? Hãy nhắn cho tôi nhé!'
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
      content: `Bạn là chatbot tư vấn của LETAN Media.
Nhiệm vụ:
- Tư vấn dịch vụ report TikTok.
- Tư vấn xử lý kênh giả mạo, video bôi nhọ, fake news, bản quyền, livestream, TikTok Shop.
- Trả lời ngắn gọn, chuyên nghiệp, dễ hiểu.
- Không hứa chắc 100% nếu chưa kiểm tra case.
- Khuyến khích khách để lại họ tên + số điện thoại/Zalo để được hỗ trợ nhanh.
- Luôn trả lời bằng tiếng Việt.`
    };

    const payloadMessages = [
      systemPromptMessage,
      ...updatedMessages.map(m => ({ role: m.role, content: m.content }))
    ];

    try {
      const chatApiUrl = import.meta.env.VITE_CHATBOT_API_URL || '/api/report-tiktok/chat';
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
        setConsecutiveErrors(0); // reset on success
      } else {
        const nextErrorCount = consecutiveErrors + 1;
        setConsecutiveErrors(nextErrorCount);
        
        const finalMessage = nextErrorCount >= 2 
          ? "⚠️ Hệ thống AI hiện không khả dụng. Đã chuyển sang chế độ **Tư vấn thủ công - Liên hệ ngay**.\n\nVui lòng liên hệ trực tiếp với chuyên viên để được hỗ trợ xử lý sự cố TikTok khẩn cấp:\n\n📞 Hotline/Zalo: 0765 178 999\n💬 Telegram: @Tanlemedia"
          : (data.message || fallbackMessage);
          
        setMessages(prev => [...prev, { role: 'assistant', content: finalMessage }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const nextErrorCount = consecutiveErrors + 1;
      setConsecutiveErrors(nextErrorCount);
      
      const finalMessage = nextErrorCount >= 2 
        ? "⚠️ Hệ thống AI hiện không khả dụng. Đã chuyển sang chế độ **Tư vấn thủ công - Liên hệ ngay**.\n\nVui lòng liên hệ trực tiếp với chuyên viên để được hỗ trợ xử lý sự cố TikTok khẩn cấp:\n\n📞 Hotline/Zalo: 0765 178 999\n💬 Telegram: @Tanlemedia"
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
    <div className="tiktok-chat-widget">
      {/* Floating Button */}
      <motion.button
        className="tiktok-chat-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="pulse-glow" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="tiktok-chat-window"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="tiktok-chat-header">
              <div className="tiktok-chat-header-info">
                <div className="bot-avatar">
                  <Bot size={20} />
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
            <div className="tiktok-chat-body">
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

            {/* Manual Consult buttons when error occurs multiple times */}
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
            <div className="tiktok-chat-footer">
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
