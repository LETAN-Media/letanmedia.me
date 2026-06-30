import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { id: '01', title: 'Tiếp nhận yêu cầu' },
  { id: '02', title: 'Tư vấn giải pháp' },
  { id: '03', title: 'Triển khai' },
  { id: '04', title: 'Tối ưu' },
  { id: '05', title: 'Hỗ trợ dài hạn' },
];

const Process = () => {
  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Quy trình</h2>
        <p className="section-subtitle">Chuyên nghiệp, minh bạch và hiệu quả.</p>
      </div>
      <div className="process-list">
        {steps.map((step, i) => (
          <motion.div 
            key={step.id} 
            className="process-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="process-number">{step.id}</div>
            <div className="process-title">{step.title}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Process;
