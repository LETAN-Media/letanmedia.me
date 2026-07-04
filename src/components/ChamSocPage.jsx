import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './ChamSocPage.css';

const ChamSocPage = () => {
  useEffect(() => {
    document.title = "Dịch vụ Chăm sóc Fanpage Trọn gói | LETAN Media";
  }, []);

  return (
    <div className="chamsoc-page">
      {/* HERO SECTION */}
      <section className="chamsoc-hero">
        <div className="chamsoc-hero-bg">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>
        <div className="chamsoc-container relative z-10">
          <motion.div 
            className="chamsoc-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="chamsoc-badge">Dịch vụ Nổi bật</span>
            <h1 className="chamsoc-title">
              Chăm Sóc Fanpage Trọn Gói <br/>
              <span className="text-glow">"Tặng Ngay Website Xịn"</span>
            </h1>
            <p className="chamsoc-desc">Uy tín làm nên thương hiệu. Giải pháp toàn diện giúp doanh nghiệp của bạn bứt phá trên nền tảng mạng xã hội.</p>
            <div className="chamsoc-actions">
              <a href="#chamsoc-contact" className="btn-primary">Nhận tư vấn ngay</a>
              <a href="#chamsoc-pricing" className="btn-outline" style={{marginLeft: '20px'}}>Xem bảng giá</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US (Bento Grid) */}
      <section className="chamsoc-section bg-surface">
        <div className="chamsoc-container">
          <div className="chamsoc-section-header">
            <h2>Ưu điểm vượt trội</h2>
            <p>Khi lựa chọn dịch vụ tại LETAN Media</p>
          </div>
          
          <div className="chamsoc-bento">
            <motion.div className="chamsoc-bento-card" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
              <div className="bento-icon">✨</div>
              <h3>Hình ảnh nổi bật</h3>
              <p>Thiết kế bám sát phong cách và tôn vinh giá trị cốt lõi của thương hiệu.</p>
            </motion.div>
            <motion.div className="chamsoc-bento-card" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{delay: 0.1}} viewport={{once:true}}>
              <div className="bento-icon">✍️</div>
              <h3>Nội dung trau chuốt</h3>
              <p>Bài viết ấn tượng, được tối ưu riêng nhằm đánh trúng tâm lý khách hàng mục tiêu.</p>
            </motion.div>
            <motion.div className="chamsoc-bento-card" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{delay: 0.2}} viewport={{once:true}}>
              <div className="bento-icon">🎯</div>
              <h3>Cá nhân hóa</h3>
              <p>Fanpage chuyên nghiệp, tạo nên bản sắc riêng biệt không đụng hàng với đối thủ.</p>
            </motion.div>
            <motion.div className="chamsoc-bento-card" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{delay: 0.3}} viewport={{once:true}}>
              <div className="bento-icon">📊</div>
              <h3>Báo cáo định kỳ</h3>
              <p>Thống kê công việc hàng tháng và vạch ra định hướng phát triển tiếp theo rõ ràng.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="chamsoc-section">
        <div className="chamsoc-container">
          <div className="chamsoc-section-header text-center">
            <h2>Quy Trình Làm Việc</h2>
            <p>Tối ưu, nhanh gọn & chặt chẽ</p>
          </div>

          <div className="chamsoc-timeline">
            {[
              "Nhận yêu cầu, trao đổi với khách hàng",
              "Ký kết hợp đồng",
              "Lên ý tưởng, đề xuất kế hoạch",
              "Gửi kế hoạch chăm sóc Fanpage",
              "Triển khai công việc",
              "Tiếp nhận ý kiến trao đổi",
              "Báo cáo và định hướng phát triển"
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="timeline-step"
                initial={{opacity:0, x: -30}}
                whileInView={{opacity:1, x:0}}
                viewport={{once:true}}
                transition={{delay: index * 0.1}}
              >
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h4>Bước {index + 1}</h4>
                  <p>{step}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="chamsoc-pricing" className="chamsoc-section bg-surface">
        <div className="chamsoc-container">
          <div className="chamsoc-section-header text-center">
            <h2>Bảng Giá Dịch Vụ</h2>
            <p>Đầu tư hợp lý - Sinh lời bền vững</p>
          </div>

          <div className="pricing-grid">
            {/* Basic */}
            <div className="pricing-card">
              <h3>Gói Cơ Bản</h3>
              <div className="price">Liên hệ</div>
              <ul className="pricing-features">
                <li>Lên định hướng nội dung</li>
                <li>8 Bài viết chuẩn SEO / tháng</li>
                <li>Thiết kế hình ảnh banner cơ bản</li>
                <li>Báo cáo tổng kết tháng</li>
              </ul>
              <button className="btn-outline w-full mt-auto">Chọn gói này</button>
            </div>

            {/* Standard (Recommended) */}
            <div className="pricing-card popular">
              <div className="popular-badge">Đề xuất</div>
              <h3>Gói Tiêu Chuẩn</h3>
              <div className="price text-glow">Liên hệ</div>
              <ul className="pricing-features">
                <li>Xây dựng chiến lược toàn diện</li>
                <li>15 Bài viết chất lượng / tháng</li>
                <li>2 Video / Reels ngắn</li>
                <li>Setup & Tối ưu Fanpage</li>
                <li>Hỗ trợ Seeding cơ bản</li>
              </ul>
              <button className="btn-primary w-full mt-auto">Chọn gói này</button>
            </div>

            {/* Premium */}
            <div className="pricing-card">
              <h3>Gói Cao Cấp</h3>
              <div className="price">Liên hệ</div>
              <ul className="pricing-features">
                <li>Chiến lược & Định vị thương hiệu</li>
                <li>30 Bài viết viral / tháng</li>
                <li>4 Video / Reels chất lượng cao</li>
                <li>Quản trị & Chăm sóc tin nhắn 24/7</li>
                <li>Tặng thiết kế Website Landing Page</li>
              </ul>
              <button className="btn-outline w-full mt-auto">Chọn gói này</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="chamsoc-contact" className="chamsoc-section chamsoc-cta">
        <div className="chamsoc-container text-center relative z-10">
          <h2>Sẵn sàng bứt phá doanh thu?</h2>
          <p>Để lại thông tin, chuyên viên của LETAN Media sẽ liên hệ hỗ trợ bạn ngay lập tức.</p>
          <button className="btn-primary" style={{marginTop: '30px', transform: 'scale(1.2)'}}>Liên hệ nhận tư vấn MIỄN PHÍ</button>
        </div>
        <div className="cta-glow"></div>
      </section>
    </div>
  );
};

export default ChamSocPage;
