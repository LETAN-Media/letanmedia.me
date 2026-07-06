import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import './LegalLayout.css';

const renderSectionContent = (items) => {
  const result = [];
  let currentList = [];

  items.forEach((item, index) => {
    const trimmed = item.trim();
    if (trimmed.startsWith('•')) {
      const cleanedText = trimmed.replace(/^•\s*/, '');
      currentList.push(cleanedText);
    } else {
      if (currentList.length > 0) {
        result.push(
          <ul key={`list-${index}`} className="legal-list">
            {currentList.map((liText, liIdx) => (
              <li key={liIdx} className="legal-list-item">
                <span className="legal-list-icon">
                  <Check size={16} />
                </span>
                <span>{liText}</span>
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
      result.push(
        <p key={`p-${index}`} className="legal-paragraph">
          {item}
        </p>
      );
    }
  });

  if (currentList.length > 0) {
    result.push(
      <ul key="list-end" className="legal-list">
        {currentList.map((liText, liIdx) => (
          <li key={liIdx} className="legal-list-item">
            <span className="legal-list-icon">
              <Check size={16} />
            </span>
            <span>{liText}</span>
          </li>
        ))}
      </ul>
    );
  }

  return result;
};

export default function LegalLayout({ 
  titlePrefix, 
  titleHighlight, 
  updateDate, 
  intro, 
  sections 
}) {
  const [activeSection, setActiveSection] = useState(0);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 240;
      let currentSection = 0;

      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(`section-${i}`);
        if (el && el.offsetTop <= scrollPosition) {
          currentSection = i;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (index) => {
    const el = document.getElementById(`section-${index}`);
    if (el) {
      const offset = el.offsetTop - 120;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
      setActiveSection(index);
    }
  };

  const handleMobileLinkClick = (index) => {
    scrollToSection(index);
    setMobileTocOpen(false);
  };

  // Helper to format section number: e.g. 1 -> "01"
  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <div className="legal-page-wrapper">
      <div className="legal-container">
        
        {/* Hero Header */}
        <header className="legal-header">
          <Link to="/" className="legal-back-link">
            <ArrowLeft size={16} /> Quay lại Trang chủ
          </Link>
          
          <motion.h1 
            className="legal-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {titlePrefix} <span className="legal-title-gradient">{titleHighlight}</span>
          </motion.h1>
          
          <motion.p 
            className="legal-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {updateDate}
          </motion.p>
          
          <motion.div 
            className="legal-intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {intro}
          </motion.div>
        </header>

        {/* Sidebar Table of Contents (Desktop) */}
        <aside className="legal-toc-sidebar">
          <h3 className="legal-toc-title">Mục lục</h3>
          <ul className="legal-toc-list">
            {sections.map((section, index) => {
              // Extract short title (strip numbers if present)
              const cleanTitle = section.title.replace(/^\d+\.\s*/, '');
              return (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(index)}
                    className={`legal-toc-link ${activeSection === index ? 'active' : ''}`}
                    style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%' }}
                  >
                    {formatNumber(index + 1)} {cleanTitle}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Accordion Table of Contents (Mobile) */}
        <div className="legal-toc-mobile">
          <button 
            className="legal-toc-mobile-trigger"
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
          >
            <span>Mục lục văn bản</span>
            {mobileTocOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          <AnimatePresence>
            {mobileTocOpen && (
              <motion.div 
                className="legal-toc-mobile-content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                {sections.map((section, index) => {
                  const cleanTitle = section.title.replace(/^\d+\.\s*/, '');
                  return (
                    <button
                      key={index}
                      onClick={() => handleMobileLinkClick(index)}
                      className={`legal-toc-mobile-link ${activeSection === index ? 'active' : ''}`}
                      style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%' }}
                    >
                      {formatNumber(index + 1)} {cleanTitle}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Body */}
        <main className="legal-content">
          {sections.map((section, index) => {
            const cleanTitle = section.title.replace(/^\d+\.\s*/, '');
            return (
              <motion.section 
                key={index}
                id={`section-${index}`}
                className="legal-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="legal-section-header">
                  <span className="legal-section-number">{formatNumber(index + 1)}</span>
                  <h2 className="legal-section-title">{cleanTitle}</h2>
                </div>
                
                <div className="legal-section-body">
                  {renderSectionContent(section.items)}
                </div>
              </motion.section>
            );
          })}


        </main>

      </div>
    </div>
  );
}
