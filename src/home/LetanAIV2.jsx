import React, { useState } from 'react';
import {
  motion,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Code2,
  Globe2,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

const SUGGESTIONS = [
  {
    id: 'growth',
    label: 'Tăng trưởng TikTok',
    prompt:
      'Tôi muốn tư vấn giải pháp tăng trưởng TikTok cho thương hiệu của mình.',
    icon: TrendingUp,
  },
  {
    id: 'website',
    label: 'Thiết kế Website',
    prompt:
      'Tôi muốn tư vấn thiết kế website chuyên nghiệp cho doanh nghiệp.',
    icon: Globe2,
  },
  {
    id: 'automation',
    label: 'AI Automation',
    prompt:
      'Tôi muốn ứng dụng AI và automation vào quy trình kinh doanh.',
    icon: Sparkles,
  },
  {
    id: 'trust',
    label: 'Tích xanh & Trust',
    prompt:
      'Tôi cần tư vấn về tích xanh và xây dựng uy tín thương hiệu.',
    icon: ShieldCheck,
  },
];

const openAssistant = (message = '') => {
  const detail = message.trim()
    ? { message: message.trim() }
    : {};

  window.dispatchEvent(
    new CustomEvent(
      'open-home-chatbot',
      {
        detail,
      },
    ),
  );
};

const LetanAIV2 = () => {
  const reduceMotion = useReducedMotion();

  const [input, setInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = input.trim();

    if (!message) {
      return;
    }

    openAssistant(message);
    setInput('');
  };

  const handleSuggestion = (prompt) => {
    if (!prompt) {
      return;
    }

    openAssistant(prompt);
  };

  return (
    <section
      id="ai-assistant"
      className="lm-ai"
    >
      <div
        className="lm-ai__ambient"
        aria-hidden="true"
      />

      <div className="lm-section-container">
        <div className="lm-ai__layout">

          {/* ================================================
              LEFT — AI VISUAL
              ================================================ */}

          <motion.div
            className="lm-ai__visual"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -28,
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    x: 0,
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
            <div className="lm-ai-orb">
              <div
                className="lm-ai-orb__halo lm-ai-orb__halo--one"
                aria-hidden="true"
              />

              <div
                className="lm-ai-orb__halo lm-ai-orb__halo--two"
                aria-hidden="true"
              />

              <div
                className="lm-ai-orb__halo lm-ai-orb__halo--three"
                aria-hidden="true"
              />

              <div
                className="lm-ai-orb__grid"
                aria-hidden="true"
              />

              <div className="lm-ai-orb__core">
                <div className="lm-ai-orb__face">
                  <Bot
                    size={70}
                    strokeWidth={1.15}
                  />
                </div>

                <div className="lm-ai-orb__eyes">
                  <span />
                  <span />
                </div>
              </div>

              <div
                className="lm-ai-orb__particle lm-ai-orb__particle--1"
                aria-hidden="true"
              />

              <div
                className="lm-ai-orb__particle lm-ai-orb__particle--2"
                aria-hidden="true"
              />

              <div
                className="lm-ai-orb__particle lm-ai-orb__particle--3"
                aria-hidden="true"
              />

              <div
                className="lm-ai-orb__particle lm-ai-orb__particle--4"
                aria-hidden="true"
              />

              <div className="lm-ai-orb__status">
                <span className="lm-ai-orb__status-dot" />

                ONLINE
              </div>

              <div className="lm-ai-orb__tag lm-ai-orb__tag--top">
                AI AGENT
              </div>

              <div className="lm-ai-orb__tag lm-ai-orb__tag--bottom">
                24 / 7
              </div>
            </div>
          </motion.div>


          {/* ================================================
              RIGHT — CONSULTANT UI
              ================================================ */}

          <motion.div
            className="lm-ai__content"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 28,
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    x: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
              delay: reduceMotion
                ? 0
                : 0.08,
            }}
          >
            <div className="lm-section-eyebrow">
              LETAN AI ASSISTANT
            </div>

            <h2>
              Trợ lý AI
              <br />
              luôn sẵn sàng
            </h2>

            <p className="lm-ai__lead">
              Mô tả điều bạn đang cần. LETAN AI sẽ
              phân tích và điều hướng bạn đến giải pháp
              phù hợp.
            </p>

            <div className="lm-ai-panel">
              <div className="lm-ai-panel__header">
                <div className="lm-ai-panel__avatar">
                  <Sparkles
                    size={17}
                    strokeWidth={1.7}
                  />
                </div>

                <div>
                  <strong>
                    LETAN AI
                  </strong>

                  <span>
                    Trợ lý tư vấn thông minh
                  </span>
                </div>

                <div className="lm-ai-panel__live">
                  <span />
                  Online
                </div>
              </div>

              <div className="lm-ai-panel__message">
                <div className="lm-ai-panel__message-icon">
                  <Bot
                    size={17}
                    strokeWidth={1.6}
                  />
                </div>

                <p>
                  Xin chào. Bạn đang muốn phát triển
                  thương hiệu, xây dựng phần mềm hay ứng
                  dụng AI vào doanh nghiệp?
                </p>
              </div>

              <div className="lm-ai-panel__suggestions">
                {SUGGESTIONS.map(
                  (suggestion) => {
                    const Icon =
                      suggestion.icon;

                    return (
                      <button
                        key={suggestion.id}
                        type="button"
                        className="lm-ai-chip"
                        onClick={() =>
                          handleSuggestion(
                            suggestion.prompt,
                          )
                        }
                      >
                        <Icon
                          size={15}
                          strokeWidth={1.7}
                        />

                        <span>
                          {suggestion.label}
                        </span>
                      </button>
                    );
                  },
                )}
              </div>

              <form
                className="lm-ai-panel__form"
                onSubmit={handleSubmit}
              >
                <div className="lm-ai-panel__input-wrap">
                  <Code2
                    className="lm-ai-panel__input-icon"
                    size={17}
                    strokeWidth={1.6}
                  />

                  <input
                    type="text"
                    value={input}
                    onChange={(event) =>
                      setInput(
                        event.target.value,
                      )
                    }
                    placeholder="Hãy cho LETAN AI biết bạn cần gì..."
                    aria-label="Nội dung cần tư vấn"
                  />

                  <button
                    type="submit"
                    aria-label="Gửi cho LETAN AI"
                    disabled={
                      !input.trim()
                    }
                  >
                    <Send
                      size={17}
                      strokeWidth={1.8}
                    />
                  </button>
                </div>
              </form>

              <button
                type="button"
                className="lm-ai-panel__open"
                onClick={() =>
                  openAssistant()
                }
              >
                <span>
                  Mở LETAN AI Assistant
                </span>

                <ArrowRight
                  size={16}
                  strokeWidth={1.7}
                />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LetanAIV2;
