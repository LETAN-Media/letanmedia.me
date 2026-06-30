import React from 'react';
import { motion } from 'framer-motion';

const AIAssistant = () => {
  return (
    <section className="section ai-assistant-section">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="ai-icon-large">✦</div>
        <h2 className="section-title" style={{ fontSize: '3rem', maxWidth: '800px', margin: '0 auto 30px' }}>
          LETAN AI Assistant giúp khách hàng chọn đúng dịch vụ, nhận tư vấn nhanh và gửi yêu cầu 24/7.
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>
          "Xin chào, tôi là LETAN AI Assistant. Bạn cần tư vấn dịch vụ nào?"
        </p>
      </motion.div>
    </section>
  );
};

export default AIAssistant;
