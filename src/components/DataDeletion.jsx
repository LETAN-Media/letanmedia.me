import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Globe, CheckCircle, Send, User, MessageSquare, ShieldAlert } from 'lucide-react';
import './DataDeletion.css';

const DataDeletion = () => {
  useEffect(() => {
    document.title = 'Yêu cầu xóa dữ liệu cá nhân — LETAN Media';
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    fbUserId: '',
    requestContent: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.fullName.trim()) {
      tempErrors.fullName = 'Vui lòng nhập họ và tên';
    } else if (formData.fullName.trim().length < 2) {
      tempErrors.fullName = 'Họ và tên phải có ít nhất 2 ký tự';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Vui lòng nhập email';
    } else if (!emailRegex.test(formData.email.trim())) {
      tempErrors.email = 'Email không đúng định dạng';
    }

    if (!formData.requestContent.trim()) {
      tempErrors.requestContent = 'Vui lòng nhập nội dung yêu cầu';
    } else if (formData.requestContent.trim().length < 10) {
      tempErrors.requestContent = 'Nội dung yêu cầu phải chi tiết hơn (tối thiểu 10 ký tự)';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for the field being typed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate premium API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        fbUserId: '',
        requestContent: ''
      });
    }, 1500);
  };

  return (
    <div className="deletion-page-wrapper">
      <div className="deletion-container">
        
        {/* Navigation back */}
        <div className="deletion-back-container">
          <Link to="/" className="deletion-back-link">
            <ArrowLeft size={16} /> Quay lại Trang chủ
          </Link>
        </div>

        {/* Brand Header */}
        <header className="deletion-header">
          <div className="deletion-logo-badge">
            <span className="logo-text">LETAN Media</span>
          </div>
          <h1 className="deletion-title">
            Yêu cầu <span className="deletion-title-gradient">xóa dữ liệu cá nhân</span>
          </h1>
          <p className="deletion-subtitle">
            Người dùng có thể yêu cầu xóa dữ liệu cá nhân được lưu trữ bởi ứng dụng của chúng tôi. 
            Sau khi nhận được yêu cầu, chúng tôi sẽ xử lý trong vòng 7 ngày làm việc.
          </p>
        </header>

        <div className="deletion-grid">
          
          {/* Left Column: Info & Contacts */}
          <div className="deletion-info-card">
            <h2 className="info-title">Thông tin liên hệ</h2>
            <p className="info-description">
              Nếu bạn gặp khó khăn trong quá trình gửi yêu cầu hoặc cần trao đổi trực tiếp, 
              vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi qua các kênh dưới đây:
            </p>

            <div className="info-links-list">
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Mail size={18} className="info-icon text-cyan" />
                </div>
                <div className="info-content">
                  <span className="info-label">Email hỗ trợ</span>
                  <a href="mailto:infor@letanmedia.me" className="info-value">
                    infor@letanmedia.me
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Phone size={18} className="info-icon text-blue" />
                </div>
                <div className="info-content">
                  <span className="info-label">Hotline</span>
                  <a href="tel:0765178999" className="info-value">
                    0765 178 999
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Globe size={18} className="info-icon text-purple" />
                </div>
                <div className="info-content">
                  <span className="info-label">Website</span>
                  <a href="https://letanmedia.me" target="_blank" rel="noopener noreferrer" className="info-value">
                    https://letanmedia.me
                  </a>
                </div>
              </div>
            </div>

            <div className="info-disclaimer">
              <ShieldAlert size={16} className="disclaimer-icon" />
              <span>
                Quy trình xóa dữ liệu là không thể đảo ngược. Tất cả tài khoản, 
                dữ liệu liên kết và cấu hình cá nhân sẽ bị hủy vĩnh viễn sau khi hoàn tất.
              </span>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="deletion-form-card">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="deletion-form"
                  onSubmit={handleSubmit}
                  className="deletion-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  noValidate
                >
                  <h2 className="form-title">Gửi yêu cầu xóa dữ liệu</h2>
                  
                  {/* Name field */}
                  <div className="form-group">
                    <label htmlFor="fullName">Họ và tên <span className="required">*</span></label>
                    <div className="input-wrapper">
                      <User size={18} className="input-icon" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Nguyễn Văn A"
                        className={errors.fullName ? 'input-error' : ''}
                      />
                    </div>
                    {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                  </div>

                  {/* Email field */}
                  <div className="form-group">
                    <label htmlFor="email">Email <span className="required">*</span></label>
                    <div className="input-wrapper">
                      <Mail size={18} className="input-icon" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@domain.com"
                        className={errors.email ? 'input-error' : ''}
                      />
                    </div>
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  {/* Facebook User ID field */}
                  <div className="form-group">
                    <label htmlFor="fbUserId">
                      Facebook User ID <span className="optional">(không bắt buộc)</span>
                    </label>
                    <div className="input-wrapper text-neutral-400">
                      <span className="input-icon font-space-bold">FB</span>
                      <input
                        type="text"
                        id="fbUserId"
                        name="fbUserId"
                        value={formData.fbUserId}
                        onChange={handleChange}
                        placeholder="Nhập ID người dùng Facebook nếu có"
                      />
                    </div>
                  </div>

                  {/* Request Content field */}
                  <div className="form-group">
                    <label htmlFor="requestContent">Nội dung yêu cầu <span className="required">*</span></label>
                    <div className="textarea-wrapper">
                      <MessageSquare size={18} className="textarea-icon" />
                      <textarea
                        id="requestContent"
                        name="requestContent"
                        value={formData.requestContent}
                        onChange={handleChange}
                        placeholder="Chi tiết về lý do và tài khoản/dữ liệu cần xóa..."
                        className={errors.requestContent ? 'input-error' : ''}
                        rows={4}
                      />
                    </div>
                    {errors.requestContent && <span className="error-message">{errors.requestContent}</span>}
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className={`btn-submit-request ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex-center">
                        <svg className="spinner animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang ghi nhận...
                      </span>
                    ) : (
                      <span className="flex-center">
                        Gửi yêu cầu xóa dữ liệu <Send size={16} className="btn-icon" />
                      </span>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-message"
                  className="success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="success-icon-wrapper">
                    <CheckCircle size={64} className="success-icon" />
                  </div>
                  <h3 className="success-title">Đã tiếp nhận yêu cầu</h3>
                  <p className="success-description">
                    Yêu cầu của bạn đã được ghi nhận. Chúng tôi sẽ xử lý trong thời gian sớm nhất.
                  </p>
                  
                  <div className="success-actions">
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="btn-reset-form"
                    >
                      Gửi yêu cầu mới
                    </button>
                    <Link to="/" className="btn-home-redirect">
                      Trở lại trang chủ
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DataDeletion;
