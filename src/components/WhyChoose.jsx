import React from 'react';
import { motion } from 'framer-motion';

const WhyChoose = () => {
  const points = [
    { id: '01', title: 'AI-First Approach', desc: 'Ứng dụng AI vào từng quy trình cốt lõi để tối ưu hóa hiệu suất và giảm chi phí.' },
    { id: '02', title: 'Data-Driven Strategy', desc: 'Mọi chiến lược truyền thông và phát triển đều được phân tích dựa trên dữ liệu thật.' },
    { id: '03', title: 'Premium Quality', desc: 'Sản phẩm phần mềm và website đạt chuẩn quốc tế, tốc độ cao và UI/UX xuất sắc.' },
    { id: '04', title: 'Long-term Partner', desc: 'Đồng hành cùng sự tăng trưởng bền vững của doanh nghiệp qua từng giai đoạn.' }
  ];

  return (
    <section className="section why-choose-section">
      <div className="section-header">
        <h2 className="section-title">Why choose<br/>LETAN Media?</h2>
      </div>
      <div className="timeline-grid">
        {points.map((point, i) => (
          <motion.div 
            key={point.id}
            className="timeline-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="timeline-number">{point.id}</div>
            <div className="timeline-content">
              <h3>{point.title}</h3>
              <p>{point.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
