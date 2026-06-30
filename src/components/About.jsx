import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section about-section">
      <motion.div 
        className="about-title"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2>Về LETAN Media</h2>
      </motion.div>
      <motion.div 
        className="about-content-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        <p>
          LETAN Media là đơn vị cung cấp giải pháp truyền thông số, AI, TikTok Services, website, phần mềm và tự động hóa cho cá nhân, nhà sáng tạo nội dung và doanh nghiệp.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
