import React from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../config/assets';
import ImageWithFallback from './ImageWithFallback';

const projects = [
  { id: 1, title: "Dự án 01", imgAvif: ASSETS.portfolio.project1, imgWebp: ASSETS.portfolio.project1.replace('.avif', '.webp'), size: "large" },
  { id: 2, title: "Dự án 02", imgAvif: ASSETS.portfolio.project2, imgWebp: ASSETS.portfolio.project2.replace('.avif', '.webp'), size: "small" },
  { id: 3, title: "Dự án 03", imgAvif: ASSETS.portfolio.project3, imgWebp: ASSETS.portfolio.project3.replace('.avif', '.webp'), size: "medium" },
  { id: 4, title: "Dự án 04", imgAvif: ASSETS.portfolio.project4, imgWebp: ASSETS.portfolio.project4.replace('.avif', '.webp'), size: "small" },
  { id: 5, title: "Dự án 05", imgAvif: ASSETS.portfolio.project5, imgWebp: ASSETS.portfolio.project5.replace('.avif', '.webp'), size: "large" },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="section">
      <div className="section-header">
        <h2 className="section-title">Dự án tiêu biểu</h2>
      </div>
      <div className="masonry-grid">
        {projects.map((proj, i) => (
          <motion.div 
            key={proj.id} 
            className={`portfolio-card masonry-${proj.size}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <ImageWithFallback srcAvif={proj.imgAvif} srcWebp={proj.imgWebp} alt={proj.title} className="portfolio-image" />
            <div className="portfolio-overlay">
              <h3>{proj.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
