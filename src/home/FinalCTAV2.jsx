import React from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowRight,
  MessageSquare,
  Sparkles,
  Zap,
} from 'lucide-react';

const openAssistant = () => {
  window.dispatchEvent(
    new CustomEvent('open-home-chatbot', {
      detail: {},
    }),
  );
};

const FinalCTAV2 = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="lm-final-cta">
      <div className="lm-section-container">
        <motion.div
          className="lm-final-cta__panel"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          {/* Subtle Ambient Refraction */}
          <div className="lm-final-cta__ambient" aria-hidden="true" />

          <div className="lm-final-cta__content">
            <div className="lm-final-cta__eyebrow">
              <span className="lm-final-cta__eyebrow-dot" />
              BẮT ĐẦU DỰ ÁN
            </div>

            <h2>
              Sẵn sàng kiến tạo bước đột phá số
              <br />
              <span>cùng LETAN Media?</span>
            </h2>

            <p>
              Từ chiến lược tăng trưởng truyền thông đến triển khai hệ thống phần mềm và tích hợp AI tự động — chúng tôi luôn sẵn sàng đồng hành từ ý tưởng đến kết quả đo lường được.
            </p>

            <div className="lm-final-cta__actions">
              <Link to="/contact" className="lm-btn lm-btn--primary">
                <span>Tư vấn chiến lược ngay</span>
                <ArrowRight size={17} strokeWidth={1.8} />
              </Link>

              <button
                type="button"
                className="lm-btn lm-btn--secondary"
                onClick={openAssistant}
              >
                <MessageSquare size={17} strokeWidth={1.7} />
                <span>Trao đổi với LETAN AI</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTAV2;
