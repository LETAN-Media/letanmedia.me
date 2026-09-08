import React, { useState } from 'react';
import {
  motion,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Cpu,
  Send,
  ShieldCheck,
  Zap,
} from 'lucide-react';

const SUGGESTIONS = [
  {
    id: 'growth',
    label: 'Tư vấn tăng trưởng TikTok',
    prompt: 'Tôi muốn tư vấn chiến lược tăng trưởng TikTok và xây dựng kênh cho thương hiệu.',
  },
  {
    id: 'trust',
    label: 'Kiểm tra hồ sơ Tích Xanh',
    prompt: 'Tư vấn quy trình và kiểm tra điều kiện xác minh tích xanh TikTok / Facebook.',
  },
  {
    id: 'website',
    label: 'Thiết kế Website cao cấp',
    prompt: 'Tôi cần thiết kế website doanh nghiệp chuẩn SEO, tốc độ cao và phong cách hiện đại.',
  },
  {
    id: 'chatbot',
    label: 'Tích hợp Chatbot AI',
    prompt: 'Tôi muốn tích hợp trợ lý Chatbot AI vào website và fanpage để chăm sóc khách hàng.',
  },
];

const openAssistant = (message = '') => {
  const detail = message.trim() ? { message: message.trim() } : {};
  window.dispatchEvent(
    new CustomEvent('open-home-chatbot', {
      detail,
    }),
  );
};

const LetanAIV2 = () => {
  const reduceMotion = useReducedMotion();
  const [input, setInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = input.trim();
    if (!message) return;
    openAssistant(message);
    setInput('');
  };

  return (
    <section id="ai-assistant" className="lm-ai">
      <div className="lm-section-container">
        <div className="lm-ai__layout">
          {/* Left Column: AI Capabilities Narrative */}
          <motion.div
            className="lm-ai__content"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="lm-section-eyebrow">
              TRÍ TUỆ NHÂN TẠO ỨNG DỤNG
            </div>

            <h2>
              Trợ lý AI chuyên biệt
              <br />
              cho từng bài toán vận hành
            </h2>

            <p>
              LETAN AI có thể được cấu hình trên nguồn tri thức và luồng nghiệp vụ của doanh nghiệp để hỗ trợ tư vấn, sàng lọc yêu cầu và kết nối người dùng với bước xử lý phù hợp.
            </p>

            <div className="lm-ai__features">
              <div className="lm-ai__feature-item">
                <div className="lm-ai__feature-icon">
                  <Zap size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <h3>Phản hồi theo ngữ cảnh</h3>
                  <p>Ưu tiên câu trả lời ngắn gọn dựa trên nhu cầu và thông tin người dùng cung cấp.</p>
                </div>
              </div>

              <div className="lm-ai__feature-item">
                <div className="lm-ai__feature-icon">
                  <ShieldCheck size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <h3>Bám sát nguồn tri thức</h3>
                  <p>Có thể kết nối tài liệu dịch vụ, quy trình nội bộ và hướng dẫn đã được doanh nghiệp duyệt.</p>
                </div>
              </div>

              <div className="lm-ai__feature-item">
                <div className="lm-ai__feature-icon">
                  <Cpu size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <h3>Tích hợp theo quy trình</h3>
                  <p>Kết nối với website và các bước chuyển tiếp phù hợp với phạm vi triển khai.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Studio Console UI */}
          <motion.div
            className="lm-ai__visual"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.1 }}
          >
            <div className="lm-ai-console">
              {/* Console Top Header */}
              <div className="lm-ai-console__header">
                <div className="lm-ai-console__title">
                  <span className="lm-ai-console__dot" />
                  <span>LETAN AI · PRODUCT DEMO</span>
                </div>
                <div className="lm-ai-console__badge">
                  <span>DEMO</span>
                </div>
              </div>

              {/* Console Dialogue Box */}
              <div className="lm-ai-console__body">
                <div className="lm-ai-msg lm-ai-msg--user">
                  <div className="lm-ai-msg__avatar">Bạn</div>
                  <div className="lm-ai-msg__bubble">
                    Tôi muốn tìm hiểu giải pháp tăng trưởng và xác minh tài khoản cho doanh nghiệp.
                  </div>
                </div>

                <div className="lm-ai-msg lm-ai-msg--assistant">
                  <div className="lm-ai-msg__avatar">
                    <Bot size={14} />
                  </div>
                  <div className="lm-ai-msg__bubble">
                    Chào bạn! LETAN Media sẵn sàng đồng hành cùng bạn với 3 bước trọng tâm:
                    <ol>
                      <li>Rà soát tổng thể kênh & điều kiện đáp ứng chính sách.</li>
                      <li>Hoàn thiện hồ sơ xác thực và định danh thương hiệu.</li>
                      <li>Thiết lập tuyến tăng trưởng nội dung bằng công nghệ AI.</li>
                    </ol>
                    Bạn có thể chọn câu hỏi gợi ý bên dưới để trao đổi trực tiếp!
                  </div>
                </div>
              </div>

              {/* Quick Suggestion Chips */}
              <div className="lm-ai-console__chips">
                {SUGGESTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="lm-ai-console__chip"
                    onClick={() => openAssistant(item.prompt)}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={12} strokeWidth={1.8} />
                  </button>
                ))}
              </div>

              {/* Interactive Input Trigger */}
              <form
                className="lm-ai-console__form"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Nhập câu hỏi hoặc chọn gợi ý phía trên..."
                  aria-label="Nhập câu hỏi cho LETAN AI"
                />
                <button
                  type="submit"
                  className="lm-ai-console__submit"
                  aria-label="Gửi câu hỏi"
                >
                  <Send size={15} strokeWidth={2} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LetanAIV2;
