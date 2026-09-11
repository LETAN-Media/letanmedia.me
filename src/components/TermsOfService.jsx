import React, { useEffect, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import V2PageHeader from './V2PageHeader';
import V2PageFooter from './V2PageFooter';
import './TermsOfService.css';

const INTRO =
  'Chào mừng bạn đến với LETAN Media. Điều khoản Dịch vụ (“Điều khoản”) này quy định các quyền, nghĩa vụ và điều kiện sử dụng dịch vụ giữa LETAN Media (“LETAN Media”, “chúng tôi”) và khách hàng (“bạn”). Điều khoản áp dụng đối với tất cả sản phẩm, giải pháp và dịch vụ do LETAN Media cung cấp thông qua website, ứng dụng, chatbot hoặc các kênh liên hệ chính thức. Việc truy cập website hoặc sử dụng bất kỳ dịch vụ nào của LETAN Media đồng nghĩa với việc bạn đã đọc, hiểu và đồng ý tuân thủ toàn bộ Điều khoản này.';

const UPDATE_DATE = 'Cập nhật lần cuối: Tháng 07/2026';

const SECTIONS = [
  {
    title: '1. Phạm Vi Áp Dụng',
    items: [
      'Điều khoản này áp dụng đối với toàn bộ sản phẩm, dịch vụ và giải pháp do LETAN Media cung cấp.',
      'Đối với một số dịch vụ đặc thù, LETAN Media có thể ban hành thêm các điều kiện hoặc quy định riêng. Các điều kiện này sẽ được thông báo trước khi triển khai và được xem là một phần của Điều khoản Dịch vụ.'
    ]
  },
  {
    title: '2. Dịch Vụ Cung Cấp',
    items: [
      'LETAN Media cung cấp các giải pháp trong nhiều lĩnh vực công nghệ, truyền thông và nền tảng số, bao gồm nhưng không giới hạn:',
      '• Phát triển website và phần mềm.',
      '• Giải pháp AI và tự động hóa.',
      '• Thiết kế đồ họa và nhận diện thương hiệu.',
      '• Sản xuất nội dung số.',
      '• Quảng cáo và truyền thông.',
      '• Bảo vệ thương hiệu.',
      '• Hỗ trợ bản quyền, nhãn hiệu và quyền sở hữu trí tuệ.',
      '• Hỗ trợ tài khoản trên các nền tảng số.',
      '• Các dịch vụ khác do LETAN Media cung cấp theo từng thời kỳ.',
      'Thông tin chi tiết về từng dịch vụ sẽ được trao đổi trong quá trình tư vấn.'
    ]
  },
  {
    title: '3. Điều Kiện Sử Dụng Dịch Vụ',
    items: [
      'Khi sử dụng dịch vụ của LETAN Media, khách hàng cam kết:',
      '• Có đầy đủ năng lực pháp lý để thực hiện giao dịch.',
      '• Cung cấp thông tin chính xác, đầy đủ và trung thực.',
      '• Có quyền hợp pháp đối với tài khoản, dữ liệu, nội dung hoặc tài liệu cung cấp cho LETAN Media.',
      '• Không sử dụng dịch vụ vào mục đích vi phạm pháp luật hoặc xâm phạm quyền, lợi ích hợp pháp của tổ chức, cá nhân khác.',
      '• Hợp tác với LETAN Media trong quá trình triển khai dịch vụ.',
      'LETAN Media có quyền từ chối cung cấp dịch vụ nếu phát hiện dấu hiệu vi phạm pháp luật hoặc Điều khoản này.'
    ]
  },
  {
    title: '4. Quy Trình Cung Cấp Dịch Vụ',
    items: [
      'Tùy theo từng loại dịch vụ, quy trình triển khai có thể khác nhau.',
      'Thông thường bao gồm:',
      '• 1. Tiếp nhận yêu cầu.',
      '• 2. Tư vấn và đánh giá phương án phù hợp.',
      '• 3. Báo giá và thống nhất phạm vi công việc.',
      '• 4. Xác nhận triển khai.',
      '• 5. Thực hiện dịch vụ.',
      '• 6. Cập nhật tiến độ khi cần thiết.',
      '• 7. Bàn giao kết quả hoặc hoàn thành dịch vụ.'
    ]
  },
  {
    title: '5. Báo Giá Và Thanh Toán',
    items: [
      'Giá dịch vụ được thông báo và thống nhất với khách hàng trước khi triển khai.',
      'Khách hàng có trách nhiệm:',
      '• Kiểm tra chính xác thông tin thanh toán.',
      '• Thanh toán đúng theo thỏa thuận.',
      '• Chỉ thực hiện giao dịch qua các kênh chính thức của LETAN Media.',
      'Trong trường hợp có phát sinh ngoài phạm vi công việc ban đầu, LETAN Media sẽ trao đổi và thống nhất với khách hàng trước khi thực hiện.'
    ]
  },
  {
    title: '6. Hủy Dịch Vụ Và Hoàn Tiền',
    items: [
      'Khách hàng có thể yêu cầu hủy dịch vụ trước khi LETAN Media bắt đầu triển khai.',
      'Đối với các dịch vụ đã được thực hiện hoặc đang trong quá trình triển khai, việc hoàn tiền (nếu có) sẽ được xem xét theo từng trường hợp, căn cứ vào khối lượng công việc đã hoàn thành và các thỏa thuận giữa hai bên.',
      'Các chi phí đã phát sinh hoặc các phần công việc đã hoàn thành có thể không thuộc phạm vi được hoàn lại.'
    ]
  },
  {
    title: '7. Quyền Và Nghĩa Vụ Của Khách Hàng',
    items: [
      'Khách hàng có quyền:',
      '• Được tư vấn đầy đủ về dịch vụ.',
      '• Được cung cấp thông tin về tiến độ thực hiện.',
      '• Được hỗ trợ trong phạm vi dịch vụ đã thỏa thuận.',
      'Khách hàng có nghĩa vụ:',
      '• Cung cấp thông tin và tài liệu cần thiết.',
      '• Chịu trách nhiệm về tính hợp pháp của thông tin đã cung cấp.',
      '• Thanh toán đúng thời hạn.',
      '• Phối hợp với LETAN Media trong quá trình triển khai dịch vụ.'
    ]
  },
  {
    title: '8. Quyền Và Nghĩa Vụ Của LETAN Media',
    items: [
      'LETAN Media có trách nhiệm:',
      '• Cung cấp dịch vụ theo phạm vi đã thống nhất.',
      '• Thực hiện công việc với tinh thần chuyên nghiệp và thiện chí.',
      '• Thông báo khi có thay đổi ảnh hưởng đến tiến độ hoặc phạm vi công việc.',
      '• Bảo mật thông tin khách hàng theo Chính sách Quyền riêng tư.',
      'LETAN Media có quyền:',
      '• Yêu cầu khách hàng cung cấp các thông tin cần thiết để triển khai dịch vụ.',
      '• Từ chối hoặc tạm ngừng cung cấp dịch vụ trong các trường hợp vi phạm Điều khoản.',
      '• Điều chỉnh quy trình làm việc nhằm nâng cao chất lượng dịch vụ.'
    ]
  },
  {
    title: '9. Giới Hạn Trách Nhiệm',
    items: [
      'LETAN Media luôn nỗ lực triển khai dịch vụ theo đúng phạm vi và tiến độ đã thống nhất.',
      'Tuy nhiên, kết quả của một số dịch vụ có thể chịu ảnh hưởng bởi các yếu tố nằm ngoài khả năng kiểm soát của LETAN Media, bao gồm nhưng không giới hạn:',
      '• Chính sách hoặc thuật toán của các nền tảng.',
      '• Quyết định của cơ quan có thẩm quyền.',
      '• Hành vi của bên thứ ba.',
      '• Sự cố kỹ thuật.',
      '• Sự kiện bất khả kháng.',
      'Trong phạm vi pháp luật cho phép, LETAN Media không chịu trách nhiệm đối với các thiệt hại phát sinh từ những yếu tố nằm ngoài khả năng kiểm soát hợp lý của mình.',
      'Nếu pháp luật có quy định khác, trách nhiệm của LETAN Media (nếu có) sẽ không vượt quá giá trị dịch vụ mà khách hàng đã thanh toán cho dịch vụ phát sinh tranh chấp.'
    ]
  },
  {
    title: '10. Quyền Sở Hữu Trí Tuệ',
    items: [
      'Toàn bộ nội dung, thương hiệu, logo, hình ảnh, thiết kế, quy trình, mã nguồn, tài liệu và các sản phẩm trí tuệ do LETAN Media tạo ra thuộc quyền sở hữu của LETAN Media hoặc chủ sở hữu hợp pháp.',
      'Mọi hành vi sao chép, sửa đổi, phân phối hoặc sử dụng cho mục đích thương mại khi chưa có sự chấp thuận bằng văn bản đều không được phép.'
    ]
  },
  {
    title: '11. Chính Sách Quyền Riêng Tư',
    items: [
      'Việc thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân của khách hàng được thực hiện theo Chính sách Quyền riêng tư của LETAN Media.',
      'Chính sách Quyền riêng tư là một phần không tách rời của Điều khoản Dịch vụ này.'
    ]
  },
  {
    title: '12. Thay Đổi Điều Khoản',
    items: [
      'LETAN Media có quyền sửa đổi hoặc cập nhật Điều khoản Dịch vụ khi cần thiết nhằm phù hợp với hoạt động kinh doanh hoặc quy định của pháp luật.',
      'Phiên bản mới sẽ được công bố trên website và có hiệu lực kể từ thời điểm đăng tải.'
    ]
  },
  {
    title: '13. Luật Áp Dụng Và Giải Quyết Tranh Chấp',
    items: [
      'Điều khoản này được điều chỉnh theo pháp luật Việt Nam.',
      'Mọi tranh chấp phát sinh sẽ được ưu tiên giải quyết thông qua thương lượng và hòa giải trên tinh thần hợp tác giữa các bên.',
      'Trường hợp không đạt được thỏa thuận, tranh chấp sẽ được giải quyết theo quy định của pháp luật Việt Nam tại cơ quan nhà nước có thẩm quyền.'
    ]
  },
  {
    title: '14. Thông Tin Liên Hệ',
    items: [
      'Nếu có bất kỳ câu hỏi hoặc yêu cầu nào liên quan đến Điều khoản Dịch vụ, vui lòng liên hệ:',
      'LETAN Media',
      '• Hotline/Zalo: 0765 178 999',
      '• Telegram: @Tanlemedia',
      '• Email: infor@letanmedia.me',
      '• Website: letanmedia.me'
    ]
  }
];

const formatNumber = (num) => String(num).padStart(2, '0');

const renderSectionBody = (items) => {
  const result = [];
  let currentList = [];

  items.forEach((item, index) => {
    const trimmed = item.trim();
    if (trimmed.startsWith('•')) {
      currentList.push(trimmed.replace(/^•\s*/, ''));
      return;
    }
    if (currentList.length > 0) {
      result.push(
        <ul key={`list-${index}`} className="tos-list">
          {currentList.map((text, i) => (
            <li key={i} className="tos-list__item">
              <span className="tos-list__icon"><Check size={14} strokeWidth={2.5} /></span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
    result.push(<p key={`p-${index}`} className="tos-paragraph">{item}</p>);
  });

  if (currentList.length > 0) {
    result.push(
      <ul key="list-end" className="tos-list">
        {currentList.map((text, i) => (
          <li key={i} className="tos-list__item">
            <span className="tos-list__icon"><Check size={14} strokeWidth={2.5} /></span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    );
  }

  return result;
};

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      let current = 0;
      for (let i = 0; i < SECTIONS.length; i += 1) {
        const el = document.getElementById(`tos-section-${i}`);
        if (el && el.offsetTop <= scrollPosition) current = i;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index) => {
    const el = document.getElementById(`tos-section-${index}`);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 96, behavior: 'smooth' });
      setActiveSection(index);
    }
  };

  return (
    <div className="tos-page">
      <V2PageHeader />

      {/* App.jsx already wraps routed content in <main id="main-content">;
          avoid a nested/duplicate <main> landmark here. */}
      <>
        {/* Hero */}
        <section className="tos-hero">
          <div className="tos-hero__inner">
            <p className="tos-hero__eyebrow">LETAN MEDIA · TERMS</p>
            <h1 className="tos-hero__title">
              ĐIỀU KHOẢN
              <br />
              DỊCH VỤ
            </h1>
            <p className="tos-hero__subtitle">
              Quyền, nghĩa vụ và điều kiện sử dụng dịch vụ giữa LETAN Media và khách hàng.
            </p>
            <p className="tos-hero__date">{UPDATE_DATE}</p>
            <p className="tos-hero__intro">{INTRO}</p>
          </div>
        </section>

        {/* Body */}
        <section className="tos-body">
          <div className="tos-body__inner">
            {/* Desktop sticky TOC */}
            <aside className="tos-toc">
              <h2 className="tos-toc__title">Mục lục</h2>
              <ul className="tos-toc__list">
                {SECTIONS.map((section, index) => {
                  const cleanTitle = section.title.replace(/^\d+\.\s*/, '');
                  return (
                    <li key={section.title}>
                      <button
                        type="button"
                        className={`tos-toc__link${activeSection === index ? ' is-active' : ''}`}
                        onClick={() => scrollToSection(index)}
                      >
                        {formatNumber(index + 1)} {cleanTitle}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* Mobile accordion TOC */}
            <details className="tos-toc-mobile">
              <summary className="tos-toc-mobile__trigger">
                <span>Mục lục văn bản</span>
                <ChevronDown size={18} aria-hidden="true" />
              </summary>
              <ul className="tos-toc-mobile__list">
                {SECTIONS.map((section, index) => {
                  const cleanTitle = section.title.replace(/^\d+\.\s*/, '');
                  return (
                    <li key={section.title}>
                      <button type="button" onClick={() => scrollToSection(index)}>
                        {formatNumber(index + 1)} {cleanTitle}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </details>

            {/* Content */}
            <div className="tos-content">
              {SECTIONS.map((section, index) => {
                const cleanTitle = section.title.replace(/^\d+\.\s*/, '');
                return (
                  <section key={section.title} id={`tos-section-${index}`} className="tos-card">
                    <div className="tos-card__header">
                      <span className="tos-card__number">{formatNumber(index + 1)}</span>
                      <h2 className="tos-card__title">{cleanTitle}</h2>
                    </div>
                    <div className="tos-card__body">{renderSectionBody(section.items)}</div>
                  </section>
                );
              })}
            </div>
          </div>
        </section>
      </>

      <V2PageFooter />
    </div>
  );
};

export default TermsOfService;
