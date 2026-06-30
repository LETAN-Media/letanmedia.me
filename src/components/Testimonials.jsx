import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  { id: 1, text: "LETAN Media đã giúp chúng tôi tự động hóa hoàn toàn quy trình CSKH, tiết kiệm hơn 40% chi phí nhân sự.", author: "Nguyễn Văn A", role: "CEO, TechVn" },
  { id: 2, text: "Dịch vụ TikTok cực kỳ hiệu quả. Tài khoản của công ty đã được xác minh nhanh chóng và chuyên nghiệp.", author: "Trần Thị B", role: "Marketing Manager" },
  { id: 3, text: "Website thiết kế bởi LETAN Media thực sự đạt chuẩn quốc tế. Rất hài lòng với chất lượng dịch vụ.", author: "Lê Hoàng C", role: "Founder, EcomStore" },
  { id: 4, text: "Hệ thống CRM tùy chỉnh giúp công ty chúng tôi quản lý dữ liệu hiệu quả hơn bao giờ hết.", author: "Phạm Văn D", role: "Director, BuildTech" },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="section">
        <div className="section-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Khách hàng nói <span className="gradient-text">Gì về chúng tôi</span>
          </motion.h2>
        </div>
        
        <div className="testimonials-slider">
          {testimonials.map((testi, i) => (
            <motion.div 
              key={testi.id} 
              className="testimonial-card"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="testimonial-text">"{testi.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testi.author.charAt(0)}
                </div>
                <div className="author-info">
                  <h4>{testi.author}</h4>
                  <p>{testi.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
