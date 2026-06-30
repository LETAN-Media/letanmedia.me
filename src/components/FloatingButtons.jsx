import React from 'react';
import { FaPhoneAlt, FaFacebookMessenger, FaRobot } from 'react-icons/fa';
import { SiTelegram } from 'react-icons/si';
import { motion } from 'framer-motion';

const FloatingButtons = () => {
  return (
    <div className="floating-buttons">
      <motion.a 
        href="tel:0765178999" 
        className="float-btn float-hotline"
        title="Hotline"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <FaPhoneAlt />
      </motion.a>
      
      <motion.a 
        href="https://t.me/Tanlemedia" 
        target="_blank" 
        rel="noreferrer"
        className="float-btn float-telegram"
        title="Telegram"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1 }}
      >
        <SiTelegram />
      </motion.a>
      
      <motion.a 
        href="#" 
        className="float-btn float-messenger"
        title="Messenger"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
      >
        <FaFacebookMessenger />
      </motion.a>
      
      <motion.a 
        href="#" 
        className="float-btn float-ai"
        title="AI Chatbot"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3 }}
      >
        <FaRobot />
      </motion.a>
    </div>
  );
};

export default FloatingButtons;
