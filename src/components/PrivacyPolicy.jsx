import React from 'react';
import LegalLayout from './LegalLayout';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: '1. Bên kiểm soát dữ liệu & Phạm vi áp dụng',
      items: [
        'Bên chịu trách nhiệm kiểm soát và xử lý dữ liệu cá nhân là LETAN Media, vận hành website letanmedia.me. Chính sách áp dụng cho mọi tương tác qua website, hotline, Zalo, Telegram, email, chatbot AI, biểu mẫu đăng ký và các kênh mạng xã hội chính thức của LETAN Media.'
      ]
    },
    {
      title: '2. Thông tin chúng tôi thu thập',
      items: [
        '• Thông tin liên hệ: họ tên, số điện thoại, email, địa chỉ, Zalo, Telegram.',
        '• Thông tin dịch vụ report/xử lý vi phạm: link video, kênh, livestream, bài viết, bằng chứng liên quan.',
        '• Dữ liệu cá nhân nhạy cảm (chỉ khi dịch vụ yêu cầu, có sự đồng ý riêng bằng văn bản): thông tin đăng nhập tài khoản của chính khách hàng, CCCD/hộ chiếu, giấy phép kinh doanh, giấy chứng nhận nhãn hiệu.',
        '• Thông tin giao dịch: mã đơn hàng, thời gian và phương thức thanh toán, lịch sử giao dịch. Không lưu trữ số thẻ ngân hàng hay mật khẩu Internet Banking.',
        '• Dữ liệu truy cập website: địa chỉ IP, loại trình duyệt, thiết bị, cookie, nhật ký truy cập.'
      ]
    },
    {
      title: '3. Mục đích sử dụng',
      items: [
        'Thông tin được dùng để: tiếp nhận và xử lý yêu cầu tư vấn; triển khai, theo dõi tiến độ và bàn giao dịch vụ; xử lý thanh toán; phòng chống gian lận; cải thiện chất lượng dịch vụ và bảo mật hệ thống; thực hiện nghĩa vụ pháp luật. LETAN Media không sử dụng dữ liệu ngoài phạm vi đã thông báo.'
      ]
    },
    {
      title: '4. Sự đồng ý đối với dữ liệu nhạy cảm',
      items: [
        'Đối với dữ liệu cá nhân nhạy cảm (CCCD, thông tin tài khoản, hồ sơ xác minh danh tính...), LETAN Media chỉ thu thập sau khi có sự đồng ý riêng, rõ ràng của khách hàng cho từng mục đích cụ thể, tách biệt với việc đồng ý sử dụng dịch vụ nói chung. Khách hàng có quyền từ chối cung cấp và có thể rút lại sự đồng ý bất kỳ lúc nào.'
      ]
    },
    {
      title: '5. Bảo mật & Chia sẻ thông tin',
      items: [
        '• Không mua bán dữ liệu khách hàng dưới mọi hình thức.',
        '• Không chia sẻ cho bên thứ ba khi chưa có sự đồng ý, trừ khi pháp luật yêu cầu hoặc cần thiết để triển khai dịch vụ (đơn vị thanh toán, hạ tầng kỹ thuật).',
        '• Chỉ nhân sự được phân quyền mới được truy cập dữ liệu cần thiết cho công việc.',
        '• Áp dụng biện pháp kỹ thuật và quản lý phù hợp để giảm thiểu rủi ro rò rỉ, mất mát hoặc truy cập trái phép.'
      ]
    },
    {
      title: '6. Lưu trữ & Chuyển dữ liệu',
      items: [
        'Dữ liệu được lưu trữ trong thời gian cần thiết để hoàn thành dịch vụ, chăm sóc khách hàng, giải quyết tranh chấp và thực hiện nghĩa vụ pháp lý, sau đó sẽ được xóa hoặc ẩn danh. Trường hợp dữ liệu được lưu trữ hoặc xử lý trên hạ tầng máy chủ đặt ngoài lãnh thổ Việt Nam, LETAN Media áp dụng các biện pháp bảo vệ tương đương và tuân thủ quy định pháp luật hiện hành về chuyển dữ liệu cá nhân ra nước ngoài.'
      ]
    },
    {
      title: '7. Quyền của khách hàng',
      items: [
        '• Yêu cầu xem, chỉnh sửa hoặc xóa dữ liệu đang được lưu trữ (trong phạm vi pháp luật cho phép).',
        '• Rút lại sự đồng ý xử lý dữ liệu và từ chối nhận thông tin quảng bá.',
        '• Gửi khiếu nại hoặc phản ánh liên quan đến việc xử lý dữ liệu cá nhân.'
      ]
    },
    {
      title: '8. Cookie & Trẻ vị thành niên',
      items: [
        'Website sử dụng cookie để duy trì phiên đăng nhập, ghi nhớ tùy chọn và phân tích lưu lượng truy cập; bạn có thể quản lý cookie qua trình duyệt hoặc thông báo hiển thị khi truy cập lần đầu. LETAN Media không chủ đích thu thập dữ liệu của người dưới 16 tuổi mà không có sự đồng ý của cha mẹ/người giám hộ.'
      ]
    },
    {
      title: '9. Cập nhật chính sách & Liên hệ',
      items: [
        'LETAN Media có quyền cập nhật chính sách này; phiên bản mới có hiệu lực từ thời điểm đăng tải trên website. Mọi câu hỏi vui lòng liên hệ: Hotline/Zalo 0765 178 999 · Telegram @Tanlemedia · Email infor@letanmedia.me · Website letanmedia.me.'
      ]
    }
  ];

  return (
    <LegalLayout
      titlePrefix="Chính Sách"
      titleHighlight="Quyền Riêng Tư"
      updateDate="Cập nhật lần cuối: Tháng 07/2026"
      intro="LETAN Media (&quot;chúng tôi&quot;) cam kết tôn trọng và bảo vệ quyền riêng tư của khách hàng, đối tác và người dùng (&quot;bạn&quot;). Chính sách này quy định cách chúng tôi thu thập, sử dụng, lưu trữ, bảo vệ và xử lý thông tin cá nhân khi bạn truy cập website, liên hệ tư vấn hoặc sử dụng dịch vụ của LETAN Media. Việc bạn tiếp tục sử dụng website hoặc dịch vụ đồng nghĩa với việc bạn đã đọc, hiểu và đồng ý với chính sách này."
      sections={sections}
    />
  );
};

export default PrivacyPolicy;
