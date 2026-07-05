import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Scale, Unlock, ShieldCheck, AlertTriangle } from 'lucide-react';
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
    title: "Report Bản Quyền (DMCA)",
    description: "Xử lý triệt để các video reup, vi phạm bản quyền hình ảnh, âm thanh, đánh cắp chất xám trên nền tảng.",
    icon: <Scale size={32} />
  },
  {
    title: "Gỡ Video Bôi Nhọ/Fake News",
    description: "Đánh sập nhanh chóng các content bẩn, định hướng dư luận xấu gây ảnh hưởng tới uy tín thương hiệu.",
    icon: <AlertTriangle size={32} />
  },
  {
    title: "Phục Hồi Tài Khoản",
    description: "Kháng cáo chuyên sâu giúp lấy lại tài khoản bị khóa vô lý hoặc do đối thủ cạnh tranh không lành mạnh.",
    icon: <Unlock size={32} />
  },
  {
    title: "Bảo Vệ Thương Hiệu Tổng Thể",
    description: "Giám sát kênh 24/7, tự động rà soát phát hiện video vi phạm và thiết lập lá chắn bảo vệ an toàn.",
    icon: <ShieldCheck size={32} />
  }
];

export default function TikTokReportPage() {
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

          <div className="tiktok-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="tiktok-card"
              >
                <div className="tiktok-icon-wrapper">
                  {service.icon}
                </div>
                <h3 className="tiktok-card-title">{service.title}</h3>
                <p className="tiktok-card-desc">{service.description}</p>
              </motion.div>
            ))}
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
