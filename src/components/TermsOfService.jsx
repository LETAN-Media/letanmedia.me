import React from 'react';
import LegalLayout from './LegalLayout';

const TermsOfService = () => {
  const sections = [
    {
      title: '1. Quy định chung & Phạm vi áp dụng',
      items: [
        'Bên chịu trách nhiệm vận hành website letanmedia.me và cung cấp các dịch vụ liên quan là LETAN Media. Các điều khoản này áp dụng cho mọi tương tác, thỏa thuận và dịch vụ được triển khai thông qua website, chatbot AI, các biểu mẫu đăng ký, hotline hoặc các kênh liên lạc chính thức.'
      ]
    },
    {
      title: '2. Dịch vụ & Nghĩa vụ của LETAN Media',
      items: [
        '• Cung cấp các giải pháp công nghệ, thiết kế website, xây dựng chatbot AI và dịch vụ xử lý tranh chấp, gỡ vi phạm bản quyền trên môi trường số (TikTok, YouTube...).',
        '• Cam kết tư vấn trung thực, áp dụng đúng quy trình kỹ thuật và chính sách nền tảng để bảo vệ quyền lợi tối đa của khách hàng.',
        '• Hỗ trợ cập nhật tiến độ liên tục và bàn giao kết quả theo đúng thỏa thuận riêng giữa hai bên.'
      ]
    },
    {
      title: '3. Trách nhiệm & Cam kết của Khách hàng',
      items: [
        '• Cung cấp thông tin chính xác, tài liệu hợp lệ và bằng chứng sở hữu chính chủ (CCCD, đăng ký kinh doanh, chứng nhận thương hiệu...) khi sử dụng dịch vụ xác minh hoặc gỡ vi phạm.',
        '• Khách hàng chịu trách nhiệm hoàn toàn trước pháp luật về tính sở hữu của các tài sản số mà mình yêu cầu LETAN Media xử lý.',
        '• Không sử dụng dịch vụ của chúng tôi cho các mục đích lừa đảo, phá hoại, cạnh tranh không lành mạnh hoặc xâm phạm quyền lợi hợp pháp của bất kỳ cá nhân hay tổ chức nào.',
        '• Thanh toán đầy đủ và đúng hạn chi phí dịch vụ theo thỏa thuận đã ký kết.'
      ]
    },
    {
      title: '4. Quyền sở hữu trí tuệ',
      items: [
        'Mọi tài liệu, thiết kế, mã nguồn, cấu trúc chatbot AI và các sản phẩm sáng tạo do LETAN Media phát triển thuộc quyền sở hữu trí tuệ của LETAN Media.',
        'Khách hàng được cấp quyền sử dụng sản phẩm bàn giao theo đúng phạm vi thỏa thuận nhưng không được sao chép, sửa đổi hoặc phân phối thương mại hóa ngoài mục đích đã thống nhất.'
      ]
    },
    {
      title: '5. Giới hạn trách nhiệm',
      items: [
        'LETAN Media cam kết nỗ lực tối đa để hoàn thành dịch vụ, tuy nhiên kết quả cuối cùng phụ thuộc hoàn toàn vào quyết định và thuật toán xử lý của các nền tảng bên thứ ba (như TikTok, YouTube, Facebook...).',
        'Chúng tôi không chịu trách nhiệm đối với bất kỳ tổn thất doanh thu, gián tiếp hoặc các thiệt hại phát sinh từ quyết định của nền tảng bên thứ ba nằm ngoài tầm kiểm soát của chúng tôi.'
      ]
    },
    {
      title: '6. Điều khoản thanh toán & Hoàn phí',
      items: [
        'Chi tiết về chi phí, đặt cọc và chính sách hoàn phí (nếu có) sẽ được quy định cụ thể trong hợp đồng hoặc thỏa thuận dịch vụ riêng biệt.',
        'Đối với các trường hợp dịch vụ không thành công do lỗi kỹ thuật chủ quan từ phía LETAN Media, chúng tôi cam kết thực hiện đúng chính sách hoàn tiền hoặc hỗ trợ lại theo thỏa thuận.'
      ]
    },
    {
      title: '7. Bảo mật thông tin',
      items: [
        'LETAN Media cam kết bảo mật tuyệt đối 100% thông tin cá nhân, tài khoản và hồ sơ dự án của khách hàng.',
        'Chúng tôi không mua bán, trao đổi hoặc chia sẻ thông tin của bạn cho bất kỳ bên thứ ba nào khi chưa có sự đồng ý riêng bằng văn bản, trừ khi pháp luật có yêu cầu bắt buộc.'
      ]
    },
    {
      title: '8. Thay đổi điều khoản',
      items: [
        'Chúng tôi có quyền cập nhật hoặc điều chỉnh các điều khoản này bất kỳ lúc nào để phù hợp với sự thay đổi của công nghệ và quy định pháp luật.',
        'Mọi thay đổi sẽ được công bố công khai trên website và có hiệu lực ngay tại thời điểm đăng tải.'
      ]
    },
    {
      title: '9. Thông tin liên hệ & Giải quyết tranh chấp',
      items: [
        'Mọi vướng mắc hoặc tranh chấp phát sinh trong quá trình sử dụng dịch vụ sẽ được giải quyết trước tiên thông qua thương lượng thiện chí giữa hai bên.',
        'Liên hệ chính thức: Hotline/Zalo 0765 178 999 · Telegram @Tanlemedia · Email infor@letanmedia.me · Website letanmedia.me.'
      ]
    }
  ];

  return (
    <LegalLayout
      titlePrefix="Điều Khoản"
      titleHighlight="Dịch Vụ"
      updateDate="Cập nhật lần cuối: Tháng 07/2026"
      intro="Chào mừng bạn đến với LETAN Media. Các điều khoản dịch vụ này quy định các điều kiện pháp lý, trách nhiệm và nghĩa vụ giữa LETAN Media (&quot;chúng tôi&quot;) và bạn (&quot;khách hàng&quot; hoặc &quot;người dùng&quot;) khi truy cập website letanmedia.me hoặc sử dụng các dịch vụ công nghệ, digital marketing và giải quyết sự cố của chúng tôi. Việc bạn tiếp tục sử dụng website hoặc sử dụng dịch vụ đồng nghĩa với việc chấp thuận hoàn toàn các điều khoản này."
      sections={sections}
    />
  );
};

export default TermsOfService;
