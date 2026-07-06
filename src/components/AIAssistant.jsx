import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const AIAssistant = () => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Dispatch custom event to trigger the floating HomeChatWidget
    window.dispatchEvent(new CustomEvent('open-home-chatbot', {
      detail: { message: input }
    }));
    setInput('');
  };

  return (
    <section className="section ai-assistant-section" id="ai-assistant">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center px-6"
      >
        <div className="ai-icon-large" style={{ fontSize: '3rem', marginBottom: '20px', color: '#3b82f6', textShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>✦</div>
        <h2 className="section-title" style={{ fontSize: '2.5rem', maxWidth: '800px', margin: '0 auto 20px', lineHeight: '1.3' }}>
          LETAN AI Assistant giúp khách hàng chọn đúng dịch vụ, nhận tư vấn nhanh và gửi yêu cầu 24/7.
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', marginBottom: '40px' }}>
          "Xin chào, tôi là LETAN AI Assistant. Bạn cần tư vấn dịch vụ nào?"
        </p>

        {/* Interactive Chat Input */}
        <form onSubmit={handleSubmit} className="mock-chat-form" style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
          <input
            type="text"
            placeholder="Hỏi trợ lý AI về dịch vụ report, tích xanh, thiết kế web..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 60px 16px 24px',
              borderRadius: '30px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
              e.target.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255,255,255,0.08)';
              e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
            }}
          />
          <button
            type="submit"
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #22D3EE 0%, #3B82F6 100%)',
              border: 'none',
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
          >
            <Send size={18} />
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default AIAssistant;
