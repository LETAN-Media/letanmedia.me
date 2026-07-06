import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Scale, AlertTriangle, UserX, Radio, Ban, ShoppingBag, ChevronDown, Check, X } from 'lucide-react';
import './YoutubeReport.css';

const YoutubeHero3D = lazy(() => import('./components/YoutubeHero3D'));
const FeedbackCarousel = lazy(() => import('./components/FeedbackCarousel'));
const YoutubeChatWidget = lazy(() => import('./components/YoutubeChatWidget'));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("YoutubeReportPage caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="youtube-page flex items-center justify-center min-h-screen bg-[#050509] text-center px-4">
          <div className="max-w-md p-8 rounded-3xl bg-[#1a0b0b] border border-red-500/20 backdrop-blur-md relative overflow-hidden shadow-[0_0_50px_rgba(255,0,0,0.05)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#FF0000] opacity-10 blur-[100px] pointer-events-none"></div>
            
            <h2 className="text-2xl font-bold text-white mb-4">Hệ thống đang được cập nhật</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Chúng tôi đang tối ưu hóa trải nghiệm bảo vệ YouTube. Vui lòng tải lại trang hoặc liên hệ trực tiếp để được hỗ trợ nhanh nhất.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={() => window.location.reload()} 
                className="bg-white text-black font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Tải Lại Trang
              </button>
              <a 
                href="tel:0765178999" 
                className="bg-gradient-to-r from-[#ff0000] to-[#ff4f4f] text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Hỗ Trợ Khẩn Cấp
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const services = [
  {
    id: 'channel-copyright',
    title: 'Report Bản Quyền Kênh',
    description: 'Hỗ trợ xử lý các kênh YouTube sử dụng trái phép nội dung, hình ảnh, thương hiệu hoặc có dấu hiệu sao chép hệ thống nội dung của bạn.',
    details: [
      'Report kênh reup nhiều video.',
      'Xử lý kênh giả mạo cá nhân, nghệ sĩ, doanh nghiệp hoặc thương hiệu.',
      'Hỗ trợ chuẩn bị bằng chứng sở hữu nội dung.',
      'Tư vấn hướng khiếu nại bản quyền phù hợp.'
    ],
    ctaText: 'Tư vấn Report Kênh',
    icon: <ShieldAlert size={32} />
  },
  {
    id: 'video-copyright',
    title: 'Report Bản Quyền Video',
    description: 'Hỗ trợ xử lý từng video YouTube sử dụng trái phép hình ảnh, âm thanh, footage, nội dung sáng tạo hoặc tài sản thương hiệu.',
    details: [
      'Gỡ video reup, cắt ghép, sử dụng lại nội dung không được phép.',
      'Xử lý video vi phạm bản quyền âm thanh, hình ảnh, nội dung thương hiệu.',
      'Hỗ trợ kiểm tra bằng chứng gốc.',
      'Tư vấn quy trình gửi báo cáo DMCA.'
    ],
    ctaText: 'Tư vấn Report Video',
    icon: <Scale size={32} />
  },
  {
    id: 'community-guidelines',
    title: 'Report Kênh Nguyên Tắc Cộng Đồng',
    description: 'Hỗ trợ báo cáo các kênh có dấu hiệu vi phạm nguyên tắc cộng đồng YouTube, bôi nhọ, giả mạo, lừa đảo hoặc đăng nội dung gây ảnh hưởng uy tín.',
    details: [
      'Xử lý kênh đăng nội dung sai sự thật, xúc phạm, bôi nhọ cá nhân/thương hiệu.',
      'Report kênh giả mạo, spam, lừa đảo hoặc gây hiểu lầm.',
      'Phân tích nội dung vi phạm để chọn hướng báo cáo phù hợp.',
      'Tư vấn phương án bảo vệ hình ảnh và uy tín trên YouTube.'
    ],
    ctaText: 'Tư vấn Report Nguyên Tắc',
    icon: <AlertTriangle size={32} />
  },
  {
    id: 'trademark-violation',
    title: 'Report Vi Phạm Nhãn Hiệu',
    description: 'Hỗ trợ xử lý các kênh hoặc video sử dụng trái phép tên thương hiệu, logo, hình ảnh nhận diện hoặc gây nhầm lẫn với nhãn hiệu của doanh nghiệp.',
    details: [
      'Xử lý kênh giả mạo thương hiệu.',
      'Report hành vi sử dụng trái phép logo, tên thương hiệu.',
      'Hỗ trợ các trường hợp mạo danh doanh nghiệp.',
      'Tư vấn phương án bảo vệ quyền sở hữu trí tuệ trên YouTube.',
      'Hỗ trợ chuẩn bị hồ sơ và bằng chứng liên quan đến nhãn hiệu.'
    ],
    ctaText: 'Tư vấn Report Nhãn Hiệu',
    icon: <ShoppingBag size={32} />
  }
];

const workflowSteps = [
  {
    step: "01",
    title: "Tiếp Nhận Thông Tin",
    desc: "Khách hàng cung cấp đường link video vi phạm, thông tin kênh giả mạo hoặc mô tả chi tiết sự cố kênh đang gặp phải."
  },
  {
    step: "02",
    title: "Đánh Giá & Phân Loại",
    desc: "Chuyên viên thẩm định loại hình vi phạm (Bản quyền, Mạo danh, Bôi nhọ) và đưa ra tỷ lệ thành công của trường hợp."
  },
  {
    step: "03",
    title: "Chuẩn Bị Hồ Sơ Kỹ Thuật",
    desc: "Thu thập chứng cứ số, siêu dữ liệu gốc và soạn tài liệu pháp lý chứng minh quyền sở hữu hợp pháp của khách hàng."
  },
  {
    step: "04",
    title: "Gửi Yêu Cầu Can Thiệp",
    desc: "Sử dụng cổng hỗ trợ đối tác (CMS/Content ID Partner) hoặc biểu mẫu pháp lý chính thức gửi trực tiếp đến đội ngũ duyệt của YouTube."
  },
  {
    step: "05",
    title: "Theo Dõi & Đối Thoại",
    desc: "Giám sát phản hồi từ YouTube hàng giờ, cung cấp thêm thông tin đối chứng nếu phía đối tác phản hồi kháng nghị."
  },
  {
    step: "06",
    title: "Hoàn Tất Xử Lý",
    desc: "YouTube phê duyệt yêu cầu: video vi phạm bị xóa bỏ vĩnh viễn hoặc kênh bị khóa/khôi phục thành công."
  },
  {
    step: "07",
    title: "Bàn Giao & Bảo Vệ Lâu Dài",
    desc: "Gửi báo cáo kết quả và tư vấn các biện pháp kỹ thuật phòng ngừa đối thủ tiếp tục reup hoặc spam report về sau."
  }
];

export default function YoutubeReportPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    document.title = "Dịch Vụ Report YouTube Uy Tín, Gỡ Video Vi Phượng — LETAN Media";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Dịch vụ report kênh YouTube vi phạm, gỡ video reup bản quyền, video bôi nhọ danh dự và khôi phục kênh YouTube nhanh chóng. Hỗ trợ 24/7.");
    }
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <ErrorBoundary>
      <div className="youtube-page">
        {/* Hero Section */}
        <section className="youtube-hero-section">
          <Suspense fallback={<div className="absolute inset-0 bg-[#050505]" />}>
            <YoutubeHero3D />
          </Suspense>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10 h-full flex items-center pt-24 pb-16 md:pt-32 md:pb-24">
            <motion.div 
              className="max-w-3xl text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="youtube-badge">YouTube Premium Shield</div>
              
              <h1 className="youtube-title">
                Dịch Vụ Report YouTube
              </h1>
              
              <p className="youtube-subtitle">
                Giải pháp can thiệp chuyên sâu: Đánh gậy bản quyền, gỡ video bôi nhọ, 
                report tài khoản YouTube nhanh chóng với công nghệ độc quyền từ LETAN Media.
              </p>
              
              <motion.a 
                href="tel:0765178999" 
                className="youtube-cta-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Yêu Cầu Hỗ Trợ Khẩn Cấp
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="youtube-services-section section-block">
          <div className="max-w-7xl mx-auto">
            <div className="section-header">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="section-title"
              >
                Dịch Vụ <span className="gradient-text">Report YouTube Toàn Diện</span>
              </motion.h2>
            </div>

            <div className="youtube-accordion-container">
              {services.map((service, index) => {
                const isOpen = activeIndex === index;
                return (
                  <motion.div 
                    key={service.id} 
                    className={`youtube-accordion-item ${isOpen ? 'active' : ''}`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button 
                      className="youtube-accordion-header"
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-4">
                        <span className="youtube-accordion-icon">
                          {service.icon}
                        </span>
                        <h3 className="youtube-accordion-title">{service.title}</h3>
                      </div>
                      <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div 
                          className="youtube-accordion-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="youtube-accordion-content-inner">
                            <p className="text-gray-400 leading-relaxed mb-4">{service.description}</p>
                            <ul className="youtube-details-list">
                              {service.details.map((detail, idx) => (
                                <li key={idx} className="youtube-detail-item">
                                  <span className="youtube-check-icon">
                                    <Check size={14} />
                                  </span>
                                  <span className="youtube-detail-text">{detail}</span>
                                </li>
                              ))}
                            </ul>
                            <motion.button 
                              onClick={(e) => {
                                e.preventDefault();
                                setShowPopover(true);
                              }}
                              className="youtube-accordion-cta-btn w-full max-w-[280px]"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {service.ctaText}
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        
      {/* Workflow Section */}
      <section className="youtube-workflow-section section-block bg-[#090505] relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="section-header">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              Quy Trình <span className="gradient-text">Làm Việc</span>
            </motion.h2>
          </div>

          <div className="youtube-workflow-list flex flex-col gap-4 max-w-4xl mx-auto">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-6 md:p-8 rounded-2xl bg-[#1a0b0b] border border-white/5 backdrop-blur-sm overflow-hidden group hover:border-[#ff0000]/30 transition-all duration-300 flex items-center gap-5 md:gap-8"
              >
                <div className="absolute top-1/2 right-0 w-32 h-32 bg-gradient-to-br from-[#ff0000] to-[#ff4f4f] opacity-0 blur-3xl group-hover:opacity-10 transition-opacity duration-500 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="text-5xl md:text-6xl font-black text-transparent -webkit-text-stroke text-stroke-white/10 group-hover:text-white/10 transition-colors flex-shrink-0 min-w-[70px] md:min-w-[100px] text-left md:text-center" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                  0{index + 1}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#ff0000] mb-2 group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[#a1a1aa] leading-relaxed text-sm md:text-base m-0">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

        {/* Commitment Section */}
        <section className="youtube-commit-section section-block relative z-10">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div 
              className="youtube-commit-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="youtube-commit-glow" />
              <div className="youtube-commit-grid">
                <div className="youtube-commit-text">
                  <h2 className="youtube-commit-title">Cam Kết Từ LETAN Media</h2>
                  <p className="youtube-commit-subtitle">Bảo mật tuyệt đối. Hỗ trợ nhanh chóng.</p>
                  <p className="youtube-commit-desc">
                    Chúng tôi tiếp nhận và xử lý từng trường hợp theo quy trình riêng, 
                    đảm bảo thông tin khách hàng được bảo mật 100% trong suốt quá trình làm việc.
                  </p>
                </div>
                
                <div className="youtube-commit-info-block">
                  <div className="youtube-commit-list">
                    {[
                      { icon: <ShieldAlert size={18} />, text: "Bảo mật 100%" },
                      { icon: <Radio size={18} />, text: "Cập nhật tiến độ" },
                      { icon: <Check size={18} />, text: "Báo cáo kết quả" }
                    ].map((highlight, idx) => (
                      <div key={idx} className="youtube-commit-item">
                        <div className="youtube-commit-icon">
                          {highlight.icon}
                        </div>
                        <span>{highlight.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <motion.a 
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPopover(true);
                    }}
                    className="youtube-commit-cta cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Nhận Báo Giá Chi Tiết
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feedback Carousel Section */}
        <Suspense fallback={<div className="min-h-[400px] bg-[#090505]" />}>
          <FeedbackCarousel />
        </Suspense>

        {/* Bot Chat AI */}
        <Suspense fallback={null}>
          <YoutubeChatWidget />
        </Suspense>

        {/* Contact Popup Popover */}
        <AnimatePresence>
          {showPopover && (
            <motion.div 
              key="backdrop"
              className="fixed inset-0 z-[9998]"
              style={{ backgroundColor: 'transparent' }}
              onClick={() => setShowPopover(false)}
            />
          )}
          {showPopover && (
            <motion.div 
              key="popover"
              className="youtube-consult-popover"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <a 
                href="https://zalo.me/0765178999"
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-consult-option zalo"
                onClick={() => setShowPopover(false)}
              >
                <img src="https://cdn.letanmedia.me/images/icon-zalo.svg" alt="Zalo" onError={(e) => e.target.style.display='none'} />
                <span>Zalo</span>
              </a>
              <a 
                href="https://t.me/Tanlemedia"
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-consult-option telegram"
                onClick={() => setShowPopover(false)}
              >
                <img src="https://cdn.letanmedia.me/images/icon-telegram.svg" alt="Telegram" onError={(e) => e.target.style.display='none'} />
                <span>Telegram</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}
