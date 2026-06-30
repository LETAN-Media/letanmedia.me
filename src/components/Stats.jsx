import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { number: "5000+", label: "Khách hàng" },
  { number: "10000+", label: "Yêu cầu xử lý" },
  { number: "24/7", label: "Hỗ trợ" },
  { number: "99%", label: "Hài lòng" },
];

const Stats = () => {
  return (
    <section className="section">
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            className="stat-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="stat-number text-gradient-accent">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
