import React from 'react';
import LegalLayout from './LegalLayout';

const TikTokReportPolicy = () => {
  const sections = [
    {
      title: '1. Phạm Vi Áp Dụng',
      items: [
        'Chính sách này áp dụng cho các dịch vụ hỗ trợ Report TikTok do LETAN Media trực tiếp tiếp nhận và triển khai.',
        'Bao gồm report kênh, video, livestream, TikTok Shop, nội dung giả mạo, bôi nhọ, sai sự thật, xâm phạm bản quyền hoặc các trường hợp vi phạm chính sách nền tảng.',
        'LETAN Media chỉ tiếp nhận các trường hợp có căn cứ hợp lý về vi phạm chính sách TikTok, quyền sở hữu trí tuệ, quyền cá nhân, thương hiệu hoặc quy định pháp luật có liên quan.'
      ]
    },
    {
      title: '2. Chính Sách Bảo Hành',
      items: [
        'Bảo hành là việc LETAN Media tiếp tục kiểm tra và hỗ trợ xử lý lại trong phạm vi công việc đã thỏa thuận nếu phát sinh vấn đề thuộc điều kiện bảo hành.',
        'Thời hạn bảo hành, số lần hỗ trợ lại và phạm vi cụ thể được xác nhận theo từng đơn hàng hoặc báo giá trước khi triển khai.',
        '• Bảo hành chỉ áp dụng đối với đúng đối tượng và vụ việc đã tiếp nhận.',
        '• Không tự động phát sinh thời hạn bảo hành nếu đơn hàng không ghi nhận nội dung này.',
        '• Bảo hành không đồng nghĩa với việc LETAN Media có quyền quyết định kết quả cuối cùng của TikTok.'
      ]
    },
    {
      title: '3. Trường Hợp Được Bảo Hành',
      items: [
        'Trong thời hạn bảo hành đã xác nhận, LETAN Media sẽ kiểm tra và hỗ trợ lại phần công việc thuộc đúng phạm vi ban đầu khi:',
        '• Nội dung hoặc tài khoản mục tiêu xuất hiện lại với cùng bản chất vi phạm.',
        '• Kết quả bị thay đổi do TikTok rà soát lại nhưng hồ sơ vẫn còn đủ căn cứ để tiếp tục xử lý.',
        '• Cần bổ sung bằng chứng hoặc lập luận trong cùng vụ việc đã được hai bên thống nhất.',
        'Mỗi yêu cầu bảo hành sẽ được kiểm tra trước khi xác nhận thuộc phạm vi hỗ trợ miễn phí.'
      ]
    },
    {
      title: '4. Trường Hợp Không Thuộc Bảo Hành',
      items: [
        'Bảo hành không áp dụng đối với các trường hợp ngoài phạm vi ban đầu, bao gồm:',
        '• Link, tài khoản, video, livestream hoặc shop mới.',
        '• Nội dung đã được chỉnh sửa đáng kể hoặc đăng lại dưới hình thức khác.',
        '• TikTok thay đổi chính sách, thuật toán hoặc cơ chế kiểm duyệt.',
        '• Chủ tài khoản mục tiêu khiếu nại và được TikTok khôi phục theo quyết định riêng của nền tảng.',
        '• Khách hàng cung cấp thông tin hoặc bằng chứng không chính xác, không đầy đủ hoặc không có quyền sử dụng.',
        '• Yêu cầu có dấu hiệu report sai sự thật, quấy rối, lạm dụng hệ thống hoặc nhằm hạn chế nội dung hợp pháp.'
      ]
    },
    {
      title: '5. Cam Kết Bảo Mật Khách Hàng',
      items: [
        'LETAN Media cam kết chỉ sử dụng thông tin khách hàng cho mục đích đánh giá, triển khai và hỗ trợ dịch vụ đã thỏa thuận.',
        '• Không bán, cho thuê hoặc trao đổi dữ liệu khách hàng cho bên thứ ba vì mục đích thương mại.',
        '• Không công khai tên, tài khoản, hồ sơ, bằng chứng hoặc nội dung trao đổi nếu chưa có sự đồng ý.',
        '• Chỉ người trực tiếp tham gia xử lý hồ sơ mới được tiếp cận thông tin cần thiết.',
        '• Hạn chế tối đa việc thu thập các dữ liệu không liên quan.',
        '• Case study hoặc nội dung minh họa chỉ được sử dụng khi đã ẩn thông tin nhận diện hoặc được khách hàng chấp thuận.'
      ]
    },
    {
      title: '6. Mật Khẩu, OTP Và Quyền Truy Cập',
      items: [
        'Đối với quy trình Report TikTok thông thường, LETAN Media không yêu cầu khách hàng cung cấp mật khẩu, mã OTP hoặc mã xác thực hai lớp.',
        'Khách hàng tuyệt đối không gửi OTP hoặc mã 2FA cho bất kỳ cá nhân nào tự nhận là nhân viên LETAN Media nếu chưa được xác minh.',
        'Nếu trường hợp đặc biệt cần quyền truy cập tài khoản theo yêu cầu của khách hàng, phạm vi truy cập phải được thống nhất trước và chỉ sử dụng đúng mục đích.'
      ]
    },
    {
      title: '7. Lưu Trữ Và Xóa Dữ Liệu',
      items: [
        'Dữ liệu dự án chỉ được lưu trong thời gian cần thiết để triển khai, đối soát và hỗ trợ sau dịch vụ.',
        'Sau khi công việc hoàn tất và không còn nhu cầu lưu trữ hợp lý, dữ liệu không cần thiết có thể được xóa hoặc ẩn danh.',
        'Khách hàng có thể yêu cầu xóa tài liệu đã cung cấp sau khi dịch vụ hoàn thành, trừ dữ liệu cần lưu theo nghĩa vụ pháp lý, kế toán hoặc giải quyết tranh chấp.'
      ]
    },
    {
      title: '8. Giới Hạn Trách Nhiệm',
      items: [
        'LETAN Media cam kết thực hiện đúng phạm vi công việc đã thống nhất và sử dụng phương án phù hợp với hồ sơ khách hàng cung cấp.',
        'TikTok là bên có quyền quyết định cuối cùng đối với việc gỡ nội dung, hạn chế tài khoản, khóa tính năng, xử lý bản quyền hoặc các biện pháp kiểm duyệt khác.',
        'LETAN Media không thực hiện report sai sự thật, giả mạo tài liệu, lạm dụng hệ thống hoặc các phương thức trái với chính sách nền tảng.'
      ]
    },
    {
      title: '9. Tiếp Nhận Yêu Cầu Bảo Hành',
      items: [
        'Khi cần bảo hành, khách hàng vui lòng gửi lại thông tin đơn hàng, link hiện tại và mô tả tình trạng phát sinh.',
        'LETAN Media sẽ kiểm tra hồ sơ và xác nhận yêu cầu có thuộc phạm vi bảo hành hay không trước khi triển khai.',
        'Nếu yêu cầu nằm ngoài phạm vi bảo hành, LETAN Media sẽ thông báo rõ trước khi phát sinh bất kỳ chi phí bổ sung nào.'
      ]
    },
    {
      title: '10. Thông Tin Liên Hệ',
      items: [
        'Mọi yêu cầu liên quan đến bảo hành Report TikTok hoặc bảo mật thông tin vui lòng liên hệ:',
        'LETAN Media',
        '• Hotline/Zalo: 0765 178 999',
        '• Telegram: @Tanlemedia',
        '• Email: infor@letanmedia.me',
        '• Website: letanmedia.me'
      ]
    }
  ];

  return (
    <LegalLayout
      titlePrefix="Chính Sách Bảo Hành"
      titleHighlight="Report TikTok"
      updateDate="Cập nhật lần cuối: Tháng 09/2026"
      intro="Chính sách này quy định phạm vi bảo hành dịch vụ Report TikTok và cam kết bảo mật thông tin khách hàng của LETAN Media. Mục tiêu là đảm bảo quyền lợi khách hàng, minh bạch phạm vi hỗ trợ và bảo vệ danh tính, dữ liệu cũng như hồ sơ trong suốt quá trình sử dụng dịch vụ."
      sections={sections}
    />
  );
};

export default TikTokReportPolicy;
