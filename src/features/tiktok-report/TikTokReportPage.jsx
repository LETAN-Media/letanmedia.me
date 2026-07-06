import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Scale, AlertTriangle, UserX, Radio, Ban, ShoppingBag, ChevronDown, Check } from 'lucide-react';
import './TikTokReport.css';

const TikTokHero3D = lazy(() => import('./components/TikTokHero3D'));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-10 text-red-500 bg-black min-h-screen"><h1>Error in TikTokReportPage: {this.state.error?.toString()}</h1><pre>{this.state.error?.stack}</pre></div>;
    }
    return this.props.children;
  }
}


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
              Xử Lý Khủng Hoảng & <br />
              Bảo Vệ Tài Khoản TikTok
            </h1>
            
            <p className="tiktok-subtitle">
              Giải pháp can thiệp chuyên sâu: Đánh gậy bản quyền, gỡ video bôi nhọ, 
              và khôi phục tài khoản nhanh chóng với công nghệ độc quyền từ LETAN Media.
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
      <section className="tiktok-services-section">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="tiktok-section-title"
          >
            Giải Pháp <span className="tiktok-accent-cyan">Bảo Vệ Toàn Diện</span>
          </motion.h2>

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
                      <div className="tiktok-accordion-cta-wrapper">
                        <motion.a 
                          href="/#contact" 
                          className="tiktok-accordion-cta-btn"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {service.ctaText}
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Commitment Section */}
      <section className="tiktok-process-section">
        <div className="max-w-4xl mx-auto text-center px-4">
           <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-16 px-8 rounded-3xl bg-gradient-to-b from-[rgba(255,0,80,0.08)] to-transparent border border-[rgba(255,0,80,0.15)] backdrop-blur-md relative overflow-hidden"
           >
             {/* Decorative glow */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#FF0050] opacity-10 blur-[100px] pointer-events-none"></div>
             
             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight">Cam Kết Của LETAN Media</h2>
             <p className="text-[#a1a1aa] text-lg md:text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
               Với kinh nghiệm xử lý hàng trăm ca khủng hoảng mạng xã hội phức tạp, 
               chúng tôi cam kết bảo mật 100% thông tin khách hàng, tốc độ xử lý trong vòng <strong className="text-[#00F2FE] font-semibold">24-48h</strong> và hoàn tiền nếu không đạt kết quả.
             </p>
             <motion.a 
               href="/#contact" 
               className="inline-block bg-white text-black font-bold py-4 px-8 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:-translate-y-1"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
                Nhận Báo Giá Chi Tiết
             </motion.a>
           </motion.div>
        </div>
      </section>
    </div>
    </ErrorBoundary>
  );
}
