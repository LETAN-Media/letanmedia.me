import React from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

const openAssistant = () => {
  window.dispatchEvent(
    new CustomEvent(
      'open-home-chatbot',
      {
        detail: {},
      },
    ),
  );
};

const FinalCTAV2 = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="lm-final-cta">
      <div className="lm-section-container">
        <motion.div
          className="lm-final-cta__panel"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                }
          }
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <div
            className="lm-final-cta__grid"
            aria-hidden="true"
          />

          <div
            className="lm-final-cta__glow lm-final-cta__glow--one"
            aria-hidden="true"
          />

          <div
            className="lm-final-cta__glow lm-final-cta__glow--two"
            aria-hidden="true"
          />

          <div
            className="lm-final-cta__horizon"
            aria-hidden="true"
          >
            <span className="lm-final-cta__mountain lm-final-cta__mountain--1" />
            <span className="lm-final-cta__mountain lm-final-cta__mountain--2" />
            <span className="lm-final-cta__mountain lm-final-cta__mountain--3" />
          </div>

          <div className="lm-final-cta__content">
            <div className="lm-final-cta__eyebrow">
              <Sparkles
                size={14}
                strokeWidth={1.7}
              />

              LETAN MEDIA
            </div>

            <h2>
              Có một ý tưởng?
              <br />
              <span>
                Hãy biến nó thành hiện thực.
              </span>
            </h2>

            <p>
              Từ chiến lược tăng trưởng, AI,
              website đến phần mềm theo yêu cầu —
              LETAN Media có thể đồng hành từ ý
              tưởng đến sản phẩm hoàn chỉnh.
            </p>

            <div className="lm-final-cta__actions">
              <Link
                to="/contact"
                className="lm-final-cta__primary"
              >
                <span>
                  Bắt đầu dự án
                </span>

                <ArrowRight
                  size={17}
                  strokeWidth={1.8}
                />
              </Link>

              <button
                type="button"
                className="lm-final-cta__secondary"
                onClick={openAssistant}
              >
                <MessageCircle
                  size={17}
                  strokeWidth={1.7}
                />

                <span>
                  Hỏi LETAN AI
                </span>
              </button>
            </div>
          </div>

          <div
            className="lm-final-cta__signature"
            aria-hidden="true"
          >
            LET'S
            <br />
            BUILD
            <br />
            IT.
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTAV2;
