import React from 'react';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section className="cta-section">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Sẵn sàng tăng trưởng<br/>cùng LETAN Media?</h2>
        <div className="cta-buttons">
          <button className="btn-primary">Tư vấn ngay</button>
          <button className="btn-outline">Xem dịch vụ</button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
