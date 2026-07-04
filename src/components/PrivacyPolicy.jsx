import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: '1. Thông tin chúng tôi thu thập',
      items: [
        'Thông tin cá nhân: Họ tên, số điện thoại, email, địa chỉ khi bạn đăng ký dịch vụ hoặc liên hệ với chúng tôi.',
        'Thông tin tài khoản: Tên đăng nhập, mật khẩu và các thông tin liên quan đến tài khoản sử dụng dịch vụ.',
        'Thông tin thanh toán: Thông tin thẻ thanh toán, tài khoản ngân hàng phục vụ giao dịch.',
        'Dữ liệu sử dụng: Thông tin về cách bạn tương tác với website, bao gồm địa chỉ IP, trình duyệt, thời gian truy cập.',
        'Cookie và công nghệ theo dõi: Chúng tôi sử dụng cookie để cải thiện trải nghiệm người dùng.',
      ],
    },
    {
      title: '2. Cách chúng tôi sử dụng thông tin',
      items: [
        'Cung cấp, vận hành và duy trì các dịch vụ của LETAN Media.',
        'Cải thiện, cá nhân hóa trải nghiệm người dùng trên website.',
        'Xử lý giao dịch và gửi thông báo liên quan đến dịch vụ.',
        'Liên hệ hỗ trợ khách hàng và giải quyết các vấn đề phát sinh.',
        'Gửi thông tin khuyến mãi, cập nhật dịch vụ (khi có sự đồng ý của bạn).',
        'Tuân thủ nghĩa vụ pháp lý và bảo vệ quyền lợi hợp pháp.',
      ],
    },
    {
      title: '3. Chia sẻ thông tin với bên thứ ba',
      items: [
        'Chúng tôi cam kết không bán, trao đổi hoặc chuyển nhượng thông tin cá nhân của bạn cho bên thứ ba mà không có sự đồng ý, trừ các trường hợp sau:',
        'Đối tác cung cấp dịch vụ: Các bên thứ ba hỗ trợ vận hành website, xử lý thanh toán, phân tích dữ liệu.',
        'Tuân thủ pháp luật: Khi có yêu cầu từ cơ quan nhà nước có thẩm quyền.',
        'Bảo vệ quyền lợi: Khi cần thiết để bảo vệ quyền lợi, tài sản hoặc sự an toàn của LETAN Media và người dùng.',
      ],
    },
    {
      title: '4. Lưu trữ và bảo mật thông tin',
      items: [
        'Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép, thay đổi, tiết lộ hoặc phá hủy.',
        'Dữ liệu của bạn được lưu trữ trên máy chủ an toàn với các lớp bảo vệ nhiều tầng.',
        'Chúng tôi giới hạn quyền truy cập thông tin cá nhân chỉ dành cho nhân viên, đại lý và nhà thầu cần biết để xử lý thông tin.',
        'Thời gian lưu trữ dữ liệu được duy trì trong suốt thời gian bạn sử dụng dịch vụ và theo yêu cầu của pháp luật.',
      ],
    },
    {
      title: '5. Quyền của bạn',
      items: [
        'Quyền truy cập: Yêu cầu xem thông tin cá nhân mà chúng tôi đang lưu trữ.',
        'Quyền chỉnh sửa: Yêu cầu cập nhật hoặc sửa đổi thông tin không chính xác.',
        'Quyền xóa: Yêu cầu xóa thông tin cá nhân của bạn khỏi hệ thống.',
        'Quyền từ chối: Từ chối nhận thông tin tiếp thị và khuyến mãi từ chúng tôi.',
        'Quyền rút lại sự đồng ý: Rút lại sự đồng ý đã cung cấp bất kỳ lúc nào.',
      ],
    },
    {
      title: '6. Cookie',
      items: [
        'Chúng tôi sử dụng cookie và công nghệ tương tự để cải thiện trải nghiệm người dùng, phân tích xu hướng và quản lý website.',
        'Bạn có thể kiểm soát cookie thông qua cài đặt trình duyệt. Tuy nhiên, việc vô hiệu hóa cookie có thể ảnh hưởng đến trải nghiệm sử dụng dịch vụ.',
      ],
    },
    {
      title: '7. Thay đổi chính sách',
      items: [
        'LETAN Media có quyền cập nhật, thay đổi nội dung của Chính sách quyền riêng tư này bất kỳ lúc nào. Mọi thay đổi sẽ được đăng tải trên website và có hiệu lực ngay sau khi đăng tải.',
        'Chúng tôi khuyến khích bạn thường xuyên xem lại chính sách này để cập nhật các thay đổi.',
      ],
    },
    {
      title: '8. Liên hệ',
      items: [
        'Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào liên quan đến Chính sách quyền riêng tư, vui lòng liên hệ với chúng tôi:',
        'Email: support@letanmedia.site',
        'Hotline: 0765 178 999',
        'Website: letanmedia.site',
      ],
    },
  ];

  return (
    <div className="privacy-policy-page">
      <div className="privacy-policy-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="privacy-back-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
            &larr; Quay lại trang chủ
          </Link>

          <h1 className="privacy-title">Chính sách quyền riêng tư</h1>
          <p className="privacy-update">
            Cập nhật lần cuối: Tháng 07, 2026
          </p>
          <p className="privacy-intro">
            LETAN Media cam kết bảo vệ quyền riêng tư của bạn. Chính sách quyền riêng tư này giải thích cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng website letanmedia.site và các dịch vụ của chúng tôi.
          </p>

          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="privacy-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <h2 className="privacy-section-title">{section.title}</h2>
              {section.items.map((item, i) => (
                <p key={i} className="privacy-text">{item}</p>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
