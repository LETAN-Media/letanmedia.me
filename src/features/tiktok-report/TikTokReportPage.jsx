import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Scale, AlertTriangle, UserX, Radio, Ban, ShoppingBag, ChevronDown, Check, X } from 'lucide-react';
import './TikTokReport.css';
import TikTokChatWidget from './components/TikTokChatWidget';
import FeedbackCarousel from './components/FeedbackCarousel';

const TikTokHero3D = lazy(() => import('./components/TikTokHero3D'));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("TikTokReportPage caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="tiktok-page flex items-center justify-center min-h-screen bg-[#050509] text-center px-4">
          <div className="max-w-md p-8 rounded-3xl bg-[#0b0f1a] border border-red-500/20 backdrop-blur-md relative overflow-hidden shadow-[0_0_50px_rgba(255,0,80,0.05)]">
            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#FF0050] opacity-10 blur-[100px] pointer-events-none"></div>
            
            <h2 className="text-2xl font-bold text-white mb-4">Hệ thống đang được cập nhật</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Chúng tôi đang tối ưu hóa trải nghiệm bảo vệ TikTok. Vui lòng tải lại trang hoặc liên hệ trực tiếp để được hỗ trợ nhanh nhất.
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
                className="bg-gradient-to-r from-[#00f2ea] to-[#ff0050] text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:-translate-y-0.5"
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



const workflowSteps = [
  {
    title: "Tiếp nhận yêu cầu",
    desc: "Khách hàng gửi thông tin và mô tả vấn đề cần hỗ trợ qua các kênh liên lạc."
  },
  {
    title: "Kiểm tra liên kết",
    desc: "Tiếp nhận link TikTok, video, kênh hoặc phiên live cần xử lý để phân tích."
  },
  {
    title: "Tư vấn phương án",
    desc: "Đề xuất giải pháp can thiệp tối ưu nhất và báo giá chi tiết cho khách hàng."
  },
  {
    title: "Chốt thời gian",
    desc: "Xác nhận thỏa thuận, cam kết KPI và thời hạn hoàn thành công việc rõ ràng."
  },
  {
    title: "Thanh toán",
    desc: "Khách hàng tiến hành thanh toán chi phí dịch vụ theo lộ trình đã thống nhất."
  },
  {
    title: "Báo cáo kết quả",
    desc: "Cập nhật tiến độ liên tục và bàn giao kết quả đúng hoặc trước thời gian cam kết."
  },
  {
    title: "Bảo mật thông tin",
    desc: "Xóa toàn bộ dữ liệu dự án, cam kết bảo mật 100% danh tính khách hàng."
  }
];

const services = [
  {
    title: "Report Kênh Vi Phạm / Cạnh Tranh Không Lành Mạnh",
    shortDesc: "Hỗ trợ xử lý các kênh có dấu hiệu giả mạo, bôi nhọ, đăng tải thông tin sai sự thật hoặc cạnh tranh không lành mạnh gây ảnh hưởng đến cá nhân, thương hiệu và hoạt động kinh doanh.",
    details: [
      "Xử lý kênh giả mạo cá nhân, thương hiệu, doanh nghiệp hoặc sử dụng hình ảnh trái phép.",
      "Hỗ trợ báo cáo các kênh bốc phốt, công kích, vu khống, đăng thông tin sai sự thật gây ảnh hưởng danh dự và uy tín.",
      "Phân tích nội dung vi phạm để chọn hướng report phù hợp theo chính sách nền tảng.",
      "Ưu tiên các trường hợp gây thiệt hại về hình ảnh, doanh thu, thương hiệu hoặc cộng đồng.",
      "Theo dõi tiến trình và tư vấn phương án xử lý tiếp theo nếu nền tảng yêu cầu bổ sung bằng chứng."
    ],
    ctaText: "Tư vấn Report Kênh",
    icon: <UserX size={32} />
  },
  {
    title: "Gỡ Video Bôi Nhọ / Fake News",
    shortDesc: "Hỗ trợ xử lý video sai sự thật, công kích cá nhân, bôi nhọ thương hiệu hoặc gây định hướng dư luận tiêu cực trên nền tảng.",
    details: [
      "Hỗ trợ xử lý nội dung sai sự thật, công kích cá nhân, bôi nhọ thương hiệu.",
      "Phân tích mức độ vi phạm và hướng xử lý phù hợp theo chính sách từng nền tảng.",
      "Ưu tiên các trường hợp ảnh hưởng đến uy tín cá nhân, thương hiệu, hoạt động kinh doanh hoặc hình ảnh công chúng.",
      "Hỗ trợ chuẩn bị nội dung báo cáo, bằng chứng và lập luận phù hợp.",
      "Theo dõi tình trạng xử lý và đề xuất hướng đi tiếp theo nếu video chưa được gỡ."
    ],
    ctaText: "Tư vấn Gỡ Video",
    icon: <AlertTriangle size={32} />
  },
  {
    title: "Report Bản Quyền (DMCA)",
    shortDesc: "Hỗ trợ xử lý nội dung reup, sử dụng trái phép hình ảnh, âm thanh, video hoặc tài sản thương hiệu mà chưa được cho phép.",
    details: [
      "Xử lý video reup, sử dụng trái phép hình ảnh, âm thanh, nội dung thương hiệu.",
      "Phù hợp với cá nhân, nghệ sĩ, doanh nghiệp, creator bị lấy cắp nội dung.",
      "Hỗ trợ kiểm tra bằng chứng sở hữu và định hướng phương án gửi báo cáo.",
      "Tư vấn cách trình bày nội dung khiếu nại bản quyền rõ ràng, đúng trọng tâm.",
      "Ưu tiên các trường hợp bị sao chép nội dung hàng loạt, gây thiệt hại về lượt xem, doanh thu hoặc hình ảnh thương hiệu."
    ],
    ctaText: "Tư vấn Report Bản Quyền",
    icon: <Scale size={32} />
  },
  {
    title: "Report Phiên Live",
    shortDesc: "Hỗ trợ xử lý các phiên livestream có dấu hiệu vi phạm chính sách, sử dụng nội dung sai phạm hoặc gây ảnh hưởng đến cá nhân, thương hiệu và cộng đồng.",
    details: [
      "Hỗ trợ báo cáo phiên live có nội dung bôi nhọ, công kích, sai sự thật hoặc gây ảnh hưởng uy tín.",
      "Xử lý các phiên live sử dụng trái phép hình ảnh, thương hiệu, sản phẩm hoặc nội dung bản quyền.",
      "Phân tích nội dung live để chọn nhóm vi phạm phù hợp khi gửi báo cáo.",
      "Ưu tiên các trường hợp live gây thiệt hại trực tiếp đến thương hiệu, doanh số hoặc hình ảnh cá nhân.",
      "Tư vấn cách lưu bằng chứng, thời điểm report và hướng xử lý sau khi phiên live kết thúc."
    ],
    ctaText: "Tư vấn Report Phiên Live",
    icon: <Radio size={32} />
  },
  {
    title: "Report Cấm Livestream",
    shortDesc: "Hỗ trợ xử lý tài khoản livestream vi phạm nhiều lần, có dấu hiệu lạm dụng live để bán hàng sai phạm, công kích, giả mạo hoặc gây ảnh hưởng tiêu cực.",
    details: [
      "Hỗ trợ báo cáo tài khoản có hành vi livestream vi phạm chính sách nền tảng.",
      "Xử lý các trường hợp live bán hàng sai quy định, giả mạo thương hiệu hoặc sử dụng nội dung gây hiểu lầm.",
      "Phân tích lịch sử vi phạm và mức độ ảnh hưởng để chọn hướng báo cáo phù hợp.",
      "Ưu tiên các tài khoản live gây ảnh hưởng đến thương hiệu, cá nhân, shop hoặc cộng đồng người xem.",
      "Tư vấn phương án report nhằm hạn chế quyền livestream hoặc yêu cầu nền tảng xem xét tài khoản."
    ],
    ctaText: "Tư vấn Cấm Livestream",
    icon: <Ban size={32} />
  },
  {
    title: "Report TikTok Shop",
    shortDesc: "Hỗ trợ xử lý shop, sản phẩm hoặc nội dung bán hàng có dấu hiệu giả mạo, vi phạm thương hiệu, cạnh tranh không lành mạnh hoặc gây ảnh hưởng đến uy tín kinh doanh.",
    details: [
      "Hỗ trợ báo cáo TikTok Shop giả mạo thương hiệu, sử dụng hình ảnh hoặc thông tin sai lệch.",
      "Xử lý sản phẩm có dấu hiệu vi phạm bản quyền, nhãn hiệu, hình ảnh hoặc nội dung quảng cáo gây hiểu lầm.",
      "Hỗ trợ báo cáo shop cạnh tranh không lành mạnh, đăng thông tin sai sự thật hoặc gây ảnh hưởng đến doanh nghiệp khác.",
      "Phân tích bằng chứng, nội dung vi phạm và hướng xử lý phù hợp theo chính sách TikTok Shop.",
      "Ưu tiên các trường hợp ảnh hưởng trực tiếp đến doanh thu, thương hiệu, sản phẩm hoặc niềm tin khách hàng."
    ],
    ctaText: "Tư vấn Report TikTok Shop",
    icon: <ShoppingBag size={32} />
  }
];


export default function TikTokReportPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showPopover, setShowPopover] = useState(false);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <ErrorBoundary>
    <div className="tiktok-page">
      {/* Hero Section */}
      <section className="tiktok-hero-section">
        <Suspense fallback={<div className="absolute inset-0 bg-[#050505]" />}>
          <TikTokHero3D />
        </Suspense>

        <div className="tiktok-content-overlay">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex justify-center">
              <span className="tiktok-badge">
                <ShieldAlert size={14} /> DỊCH VỤ TAKEDOWN 24/7
              </span>
            </div>
            
            <h1 className="tiktok-title">
              Dịch Vụ Report Tiktok
            </h1>
            
            <p className="tiktok-subtitle">
              Giải pháp can thiệp chuyên sâu: Đánh gậy bản quyền, gỡ video bôi nhọ, 
              report tài khoản tiktok nhanh chóng với công nghệ độc quyền từ LETAN Media.
            </p>
            
            <motion.a 
              href="/#contact" 
              className="tiktok-cta-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Yêu Cầu Hỗ Trợ Khẩn Cấp
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="tiktok-services-section section-block">
        <div className="max-w-7xl mx-auto">
          <div className="section-header">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="section-title"
            >
              Giải Pháp <span className="gradient-text">Bảo Vệ Toàn Diện</span>
            </motion.h2>
          </div>

          <div className="tiktok-accordion-container">
            {services.map((service, index) => {
              const isOpen = activeIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`tiktok-accordion-item ${isOpen ? 'active' : ''}`}
                >
                  <div 
                    className="tiktok-accordion-header"
                    onClick={() => toggleAccordion(index)}
                  >
                    <div className="tiktok-accordion-header-left">
                      <div className="tiktok-icon-wrapper">
                        {service.icon}
                      </div>
                      <div className="tiktok-accordion-title-block">
                        <h3 className="tiktok-card-title">{service.title}</h3>
                        <p className="tiktok-card-desc">{service.shortDesc}</p>
                      </div>
                    </div>
                    <div className="tiktok-accordion-toggle-icon">
                      <ChevronDown 
                        size={20} 
                        className={`arrow-icon ${isOpen ? 'rotated' : ''}`} 
                      />
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ 
                      height: isOpen ? 'auto' : 0,
                      opacity: isOpen ? 1 : 0
                    }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="tiktok-accordion-content-inner">
                      <ul className="tiktok-details-list">
                        {service.details.map((detail, dIdx) => (
                          <li key={dIdx} className="tiktok-detail-item">
                            <span className="tiktok-check-icon">
                              <Check size={16} />
                            </span>
                            <span className="tiktok-detail-text">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="tiktok-accordion-cta-wrapper mt-6">
                        <motion.button 
                          onClick={(e) => {
                            e.preventDefault();
                            setShowPopover(true);
                          }}
                          className="tiktok-accordion-cta-btn w-full max-w-[280px]"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {service.ctaText}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Workflow Section */}
      <section className="tiktok-workflow-section section-block bg-[#050509] relative z-10">
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

          <div className="tiktok-workflow-list flex flex-col gap-4 max-w-4xl mx-auto">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-6 md:p-8 rounded-2xl bg-[#0b0f1a] border border-white/5 backdrop-blur-sm overflow-hidden group hover:border-[#ff0050]/30 transition-all duration-300 flex items-center gap-5 md:gap-8"
              >
                <div className="absolute top-1/2 right-0 w-32 h-32 bg-gradient-to-br from-[#00f2ea] to-[#ff0050] opacity-0 blur-3xl group-hover:opacity-10 transition-opacity duration-500 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="text-5xl md:text-6xl font-black text-transparent -webkit-text-stroke text-stroke-white/10 group-hover:text-white/10 transition-colors flex-shrink-0 min-w-[70px] md:min-w-[100px] text-left md:text-center" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                  0{index + 1}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#00f2ea] mb-2 group-hover:text-white transition-colors">
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
      <section className="tiktok-process-section relative z-10">
        <div className="max-w-5xl mx-auto px-4 relative">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-r from-[#00f2ea]/8 to-[#ff0050]/8 blur-[100px] rounded-full pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="commit-card relative overflow-hidden"
          >
            {/* Inner ambient glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ff0050]/5 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#00f2ea]/5 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="commit-title">
                Cam Kết Từ LETAN Media
              </h2>
              <p className="commit-subtitle">
                Bảo mật tuyệt đối. Xử lý rõ ràng.
              </p>
              
              <p className="commit-desc max-w-2xl">
                Mỗi trường hợp đều được tiếp nhận riêng, tư vấn phương án phù hợp và cập nhật kết quả minh bạch trong suốt quá trình xử lý.
              </p>

              {/* Highlights grid */}
              <div className="commit-list">
                {[
                  { icon: <ShieldAlert size={18} />, text: "Bảo mật 100%" },
                  { icon: <Radio size={18} />, text: "Cập nhật tiến độ" },
                  { icon: <Check size={18} />, text: "Báo cáo kết quả" }
                ].map((highlight, idx) => (
                  <div key={idx} className="commit-item">
                    <div className="commit-icon">
                      {highlight.icon}
                    </div>
                    <span>{highlight.text}</span>
                  </div>
                ))}
              </div>

              <div className="text-center md:text-left">
                <motion.a 
                  href="/#contact" 
                  className="commit-cta"
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
      <FeedbackCarousel />

      {/* Bot Chat AI */}
      <TikTokChatWidget />

      {/* Contact Popup Popover */}
      <AnimatePresence>
        {showPopover && (
          <>
            {/* Transparent backdrop to close when clicked outside */}
            <div 
              className="fixed inset-0 z-[9998] bg-transparent"
              onClick={() => setShowPopover(false)}
            />
            <motion.div 
              className="consult-popover"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <a 
                href="https://zalo.me/0765178999"
                target="_blank"
                rel="noopener noreferrer"
                className="consult-option zalo"
                onClick={() => setShowPopover(false)}
              >
                <img src="https://cdn.letanmedia.me/images/icon-zalo.svg" alt="Zalo" onError={(e) => e.target.style.display='none'} />
                <span>Zalo</span>
              </a>
              <a 
                href="https://t.me/Tanlemedia"
                target="_blank"
                rel="noopener noreferrer"
                className="consult-option telegram"
                onClick={() => setShowPopover(false)}
              >
                <img src="https://cdn.letanmedia.me/images/icon-telegram.svg" alt="Telegram" onError={(e) => e.target.style.display='none'} />
                <span>Telegram</span>
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
    </ErrorBoundary>
  );
}
