import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

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

    try {
      const response = await fetch('/api/report-tiktok/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();

      if (response.ok && data.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.error || 'Xin lỗi, hiện tại hệ thống AI đang bận. Bạn vui lòng liên hệ hotline/Zalo hoặc điền form ở dưới để được kỹ thuật viên hỗ trợ trực tiếp.' 
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Không thể kết nối đến máy chủ AI. Vui lòng kiểm tra kết nối mạng hoặc điền form đăng ký tư vấn phía dưới để nhận phản hồi nhanh nhất.' 
      }]);
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
                    <p>{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="chat-message assistant loading">
                  <div className="message-bubble">
                    <span className="dot-flashing" />
                    <span className="dot-flashing" />
                    <span className="dot-flashing" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

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
