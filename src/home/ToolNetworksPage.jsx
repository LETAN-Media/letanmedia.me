import React, { useEffect, useState } from 'react';
import Seo from '../components/Seo';
import V2PageHeader from '../components/V2PageHeader';
import V2PageFooter from '../components/V2PageFooter';
import Reveal from './Reveal';
import '../components/V2PageKit.css';
import './ToolNetworksPage.css';

const FEATURES = [
  {
    number: '01',
    title: 'Unified Inbox',
    description: 'Tiếp nhận và xử lý hội thoại từ các tài khoản TikTok đã được khách hàng chủ động kết nối và cấp quyền.',
  },
  {
    number: '02',
    title: 'Account-scoped Pipeline',
    description: 'Mỗi tài khoản có pipeline, trạng thái xử lý và quy tắc vận hành riêng; cấu hình không dùng chung ngoài ý muốn.',
  },
  {
    number: '03',
    title: 'AI Auto Reply',
    description: 'Tạo hoặc gửi phản hồi tự động khi khách hàng bật tính năng, trong phạm vi quy tắc và quyền API được cấu hình.',
  },
  {
    number: '04',
    title: 'System Prompt Control',
    description: 'Thiết lập vai trò, ngữ cảnh thương hiệu, giới hạn phản hồi và hướng dẫn riêng cho AI của từng tài khoản.',
  },
  {
    number: '05',
    title: 'History & Account Management',
    description: 'Theo dõi lịch sử hội thoại, trạng thái kết nối, cấu hình tài khoản và các sự kiện vận hành cần thiết.',
  },
];

const FLOW = [
  ['01', 'Tài khoản được ủy quyền', 'Khách hàng chủ động kết nối và cấp quyền.'],
  ['02', 'Inbox tiếp nhận', 'Sự kiện được định tuyến vào đúng workspace.'],
  ['03', 'Pipeline riêng', 'Áp dụng rule, System Prompt và ngữ cảnh của tài khoản.'],
  ['04', 'Phản hồi & lịch sử', 'Phản hồi theo cấu hình và lưu dấu vết hội thoại.'],
];

const DATA_ROWS = [
  {
    source: 'Quản lý tài khoản',
    data: 'Tên hiển thị, ảnh đại diện, định danh tài khoản do TikTok cung cấp, phạm vi quyền và trạng thái kết nối.',
    purpose: 'Nhận diện đúng tài khoản và duy trì kết nối được ủy quyền.',
  },
  {
    source: 'Inbox & hội thoại',
    data: 'Định danh người tham gia, nội dung tin nhắn, thời gian, trạng thái gửi/nhận và dữ liệu hội thoại mà API cho phép.',
    purpose: 'Hiển thị inbox, đồng bộ luồng hội thoại và gửi phản hồi.',
  },
  {
    source: 'Pipeline & AI',
    data: 'System Prompt, quy tắc tự động hóa, ngữ cảnh cần thiết, phản hồi do AI tạo hoặc người dùng chỉnh sửa.',
    purpose: 'Vận hành AI riêng cho từng tài khoản và lưu dấu vết xử lý.',
  },
  {
    source: 'Vận hành hệ thống',
    data: 'Tài khoản quản trị, email liên hệ, nhật ký truy cập, lỗi kỹ thuật và sự kiện bảo mật.',
    purpose: 'Xác thực, hỗ trợ, chẩn đoán lỗi và bảo vệ hệ thống.',
  },
];

const PRIVACY_SECTIONS = [
  {
    title: 'Phạm vi và vai trò',
    body: [
      'Chính sách này áp dụng cho AI TikTok Manager và các dịch vụ phần mềm, AI, API mang thương hiệu ToolNetWorks trên letanmedia.me. ToolNetWorks là thương hiệu sản phẩm; thông tin pháp nhân của bên cung cấp dịch vụ trong từng giao dịch được xác định tại hợp đồng hoặc chứng từ ký kết với khách hàng.',
      'ToolNetWorks chỉ xử lý dữ liệu TikTok khi chủ tài khoản hoặc người được ủy quyền chủ động kết nối tài khoản và cấp các quyền cần thiết. Hệ thống không yêu cầu khách hàng cung cấp mật khẩu TikTok cho luồng kết nối API chính thức.',
    ],
  },
  {
    title: 'Cách AI xử lý hội thoại',
    body: [
      'Khi AI Auto Reply được bật, pipeline có thể chuyển phần nội dung hội thoại và ngữ cảnh cần thiết đến mô hình AI được cấu hình cho đúng tài khoản đó để tạo phản hồi. System Prompt, quy tắc và lịch sử dùng làm ngữ cảnh được giới hạn theo workspace của tài khoản.',
      'Nhà cung cấp mô hình AI, khu vực xử lý và kiểm soát lưu trữ phụ thuộc cấu hình triển khai thực tế và phải được công bố trong cấu hình kỹ thuật hoặc thỏa thuận dịch vụ trước khi khách hàng bật tự động hóa. ToolNetWorks không trộn System Prompt giữa các tài khoản ngoài cấu hình do khách hàng chủ động thiết lập.',
    ],
  },
  {
    title: 'Chia sẻ, lưu trữ và bảo vệ',
    body: [
      'Dữ liệu có thể được truyền cho TikTok để thực hiện yêu cầu API và cho các nhà cung cấp hạ tầng hoặc AI cần thiết để vận hành dịch vụ. ToolNetWorks không bán dữ liệu hội thoại. Quyền truy cập nội bộ được giới hạn theo vai trò và nhu cầu hỗ trợ.',
      'Dữ liệu được lưu khi tài khoản còn kết nối hoặc trong thời gian cần thiết để cung cấp dịch vụ, bảo mật, giải quyết sự cố và đáp ứng nghĩa vụ pháp lý. Khi ngắt kết nối, hệ thống ngừng nhận dữ liệu mới từ kết nối đó. Lịch sử và cấu hình hiện có có thể được xóa theo yêu cầu tại mục Data Deletion; các bản sao lưu sẽ hết hạn theo chu kỳ kỹ thuật áp dụng cho môi trường triển khai.',
    ],
  },
  {
    title: 'Quyền và lựa chọn của khách hàng',
    body: [
      'Khách hàng có thể yêu cầu truy cập, sửa, xuất hoặc xóa dữ liệu thuộc workspace của mình; tắt AI Auto Reply; thay đổi System Prompt; ngắt một tài khoản TikTok; hoặc chấm dứt toàn bộ workspace. Yêu cầu có thể cần bước xác minh để ngăn việc xóa dữ liệu trái phép.',
      'ToolNetWorks xử lý dữ liệu theo phạm vi quyền mà TikTok cấp và theo lựa chọn tính năng của khách hàng. Nếu TikTok thu hồi quyền, tài khoản bị ngắt hoặc API không còn cung cấp dữ liệu, chức năng liên quan có thể dừng hoạt động.',
    ],
  },
];

const TERMS_SECTIONS = [
  {
    title: 'Quyền sử dụng và thẩm quyền tài khoản',
    body: 'Người sử dụng phải có quyền hợp pháp để quản lý các tài khoản TikTok được kết nối, cấp quyền API và xử lý hội thoại của các tài khoản đó. Không được kết nối tài khoản của bên khác khi chưa có ủy quyền phù hợp.',
  },
  {
    title: 'Trách nhiệm với tự động hóa và AI',
    body: 'Khách hàng chịu trách nhiệm cấu hình System Prompt, quy tắc gửi, nội dung thương hiệu và việc bật AI Auto Reply. Kết quả AI có thể không chính xác hoặc không phù hợp trong mọi trường hợp; khách hàng cần giám sát, kiểm thử và áp dụng cơ chế chuyển cho nhân sự khi cần.',
  },
  {
    title: 'Sử dụng được chấp nhận',
    body: 'Không sử dụng ToolNetWorks để spam, quấy rối, lừa đảo, thu thập dữ liệu trái phép, vượt giới hạn API, né tránh biện pháp bảo vệ nền tảng hoặc gửi nội dung vi phạm pháp luật, chính sách TikTok và quyền của bên thứ ba.',
  },
  {
    title: 'Bảo mật và sự cố',
    body: 'Khách hàng phải bảo vệ thông tin đăng nhập ToolNetWorks, giới hạn quyền quản trị và thông báo sớm khi nghi ngờ truy cập trái phép. ToolNetWorks có thể tạm dừng kết nối hoặc tự động hóa khi phát hiện nguy cơ bảo mật, hành vi lạm dụng hoặc yêu cầu từ nền tảng/cơ quan có thẩm quyền.',
  },
  {
    title: 'Phụ thuộc API và tính sẵn sàng',
    body: 'Chức năng nhắn tin phụ thuộc quyền truy cập, phạm vi, giới hạn, webhook và tính sẵn sàng của TikTok Business Messaging API cùng các dịch vụ hạ tầng liên quan. Thay đổi hoặc gián đoạn từ nền tảng có thể làm một phần tính năng tạm thời không khả dụng.',
  },
  {
    title: 'Chấm dứt và dữ liệu',
    body: 'Khách hàng có thể ngắt tài khoản hoặc chấm dứt dịch vụ theo thỏa thuận áp dụng. Sau khi ngắt, ToolNetWorks dừng thu nhận dữ liệu mới từ kết nối đó; yêu cầu xóa dữ liệu hiện có được xử lý theo quy trình Data Deletion bên dưới.',
  },
];

const DELETION_STEPS = [
  {
    number: '01',
    title: 'Ngắt kết nối',
    content: 'Ngắt tài khoản trong khu vực quản lý AI TikTok Manager và/hoặc thu hồi quyền của ứng dụng trong phần cài đặt tài khoản TikTok. Hệ thống sẽ dừng nhận dữ liệu mới từ kết nối đó.',
  },
  {
    number: '02',
    title: 'Gửi yêu cầu',
    content: (
      <>Email đến <a href="mailto:infor@letanmedia.me?subject=ToolNetWorks%20Data%20Deletion%20Request">infor@letanmedia.me</a> với tiêu đề “ToolNetWorks Data Deletion Request”. Cung cấp email workspace, tên doanh nghiệp và tài khoản TikTok cần xóa; không gửi mật khẩu hoặc access token.</>
    ),
  },
  {
    number: '03',
    title: 'Xác minh phạm vi',
    content: 'ToolNetWorks phản hồi qua email để xác minh thẩm quyền và xác nhận phạm vi: token kết nối, metadata tài khoản, lịch sử hội thoại, System Prompt, cấu hình pipeline và phản hồi đã lưu.',
  },
  {
    number: '04',
    title: 'Xử lý và xác nhận',
    content: 'Sau khi xác minh, dữ liệu trong phạm vi sẽ được xóa hoặc ẩn danh khỏi hệ thống hoạt động. ToolNetWorks gửi xác nhận hoàn tất và thông báo rõ nếu có bản ghi bắt buộc phải giữ vì nghĩa vụ pháp lý, chống gian lận hoặc sự cố bảo mật.',
  },
];

function SectionHeading({ index, eyebrow, title, description }) {
  return (
    <div className="tnw2-heading">
      <p className="tnw2-heading__index">{index}</p>
      <div>
        <p className="v2k-section-eyebrow">{eyebrow}</p>
        <h2 className="v2k-section-title">{title}</h2>
        {description ? <p className="tnw2-heading__description">{description}</p> : null}
      </div>
    </div>
  );
}

function ToolNetworksPage() {
  const [headerSolid, setHeaderSolid] = useState(false);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return undefined;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const updateHeader = () => {
      const hero = document.querySelector('.tnw2-hero');
      setHeaderSolid(Boolean(hero && hero.getBoundingClientRect().bottom <= 92));
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);
    return () => {
      window.removeEventListener('scroll', updateHeader);
      window.removeEventListener('resize', updateHeader);
    };
  }, []);

  return (
    <div className={`v2k tnw2${headerSolid ? ' tnw2--header-solid' : ''}`}>
      <Seo
        title="ToolNetWorks — Software, AI & API"
        description="ToolNetWorks phát triển phần mềm, AI và API. Tìm hiểu AI TikTok Manager, chính sách quyền riêng tư, điều khoản và quy trình xóa dữ liệu."
        path="/toolnetworks"
      />

      <V2PageHeader overlay inverse />

      <section className="v2k-hero tnw2-hero" aria-labelledby="tnw-title">
        <div className="v2k-hero__inner">
          <Reveal>
            <p className="v2k-hero__eyebrow">TOOLNETWORKS · SOFTWARE · AI · API</p>
            <h1 className="v2k-hero__title" id="tnw-title">TOOL<span className="tnw2-hero__word">NETWORKS</span></h1>
            <p className="v2k-hero__subtitle">
              Thương hiệu phát triển phần mềm, hệ thống AI và API cho những quy trình vận hành cần độ chính xác, khả năng kiểm soát và khả năng mở rộng.
            </p>
          </Reveal>
        </div>
      </section>

      <nav className="tnw2-index" aria-label="Điều hướng ToolNetWorks">
        <div className="tnw2-index__inner">
          <a href="#ai-tiktok-manager">Product</a>
          <a href="#features">Features</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#data-deletion">Data Deletion</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <div className="tnw2-main">
        <section className="tnw2-section tnw2-product" id="ai-tiktok-manager">
          <div className="v2k-section__inner">
            <Reveal>
              <SectionHeading
                index="01"
                eyebrow="Flagship system"
                title="AI TikTok Manager"
                description="Hệ thống quản lý nhiều tài khoản TikTok, trong đó mỗi tài khoản có Pipeline, System Prompt và AI riêng."
              />
            </Reveal>

            <div className="tnw2-product__body">
              <Reveal className="tnw2-product__statement">
                <p>Một inbox tập trung.<br />Nhiều luồng vận hành độc lập.</p>
                <span>
                  Hệ thống tiếp nhận sự kiện và hội thoại trong phạm vi quyền TikTok được cấp, đưa chúng vào đúng workspace, áp dụng pipeline của tài khoản đó, rồi tạo hoặc gửi phản hồi theo chế độ khách hàng đã cấu hình.
                </span>
              </Reveal>

              <ol className="tnw2-flow" aria-label="Luồng xử lý AI TikTok Manager">
                {FLOW.map(([number, title, description], index) => (
                  <Reveal as="li" delay={index * 0.05} key={number}>
                    <span>{number}</span>
                    <strong>{title}</strong>
                    <p>{description}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="tnw2-section tnw2-section--strong" id="features">
          <div className="v2k-section__inner">
            <Reveal>
              <SectionHeading index="02" eyebrow="Capabilities" title="Các tính năng cốt lõi" />
            </Reveal>
            <div className="tnw2-features">
              {FEATURES.map((feature, index) => (
                <Reveal as="article" className="tnw2-feature" delay={index * 0.04} key={feature.number}>
                  <span>{feature.number}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="tnw2-section tnw2-legal" id="privacy">
          <div className="v2k-section__inner">
            <Reveal>
              <SectionHeading
                index="03"
                eyebrow="Privacy policy"
                title="Chính sách quyền riêng tư"
                description="Cập nhật lần cuối: 13/10/2026"
              />
            </Reveal>

            <div className="tnw2-legal__layout">
              <p className="tnw2-legal__lead">
                Phần này mô tả dữ liệu AI TikTok Manager cần để vận hành, dữ liệu đi qua chức năng nào và khách hàng kiểm soát dữ liệu ra sao.
              </p>

              <div className="tnw2-legal__content">
                <div className="tnw2-data" role="table" aria-label="Dữ liệu ToolNetWorks xử lý">
                  <div className="tnw2-data__head" role="row">
                    <span role="columnheader">Chức năng</span>
                    <span role="columnheader">Dữ liệu liên quan</span>
                    <span role="columnheader">Mục đích</span>
                  </div>
                  {DATA_ROWS.map((row) => (
                    <div className="tnw2-data__row" role="row" key={row.source}>
                      <div role="cell"><small>Chức năng</small><strong>{row.source}</strong></div>
                      <div role="cell"><small>Dữ liệu liên quan</small><span>{row.data}</span></div>
                      <div role="cell"><small>Mục đích</small><span>{row.purpose}</span></div>
                    </div>
                  ))}
                </div>

                <div className="tnw2-legal-list">
                  {PRIVACY_SECTIONS.map((section, index) => (
                    <article key={section.title}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <h3>{section.title}</h3>
                        {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="tnw2-section tnw2-section--strong tnw2-legal" id="terms">
          <div className="v2k-section__inner">
            <Reveal>
              <SectionHeading
                index="04"
                eyebrow="Terms of service"
                title="Điều khoản sử dụng"
                description="Áp dụng cho AI TikTok Manager và dịch vụ ToolNetWorks."
              />
            </Reveal>

            <div className="tnw2-legal__layout">
              <p className="tnw2-legal__lead">
                Việc sử dụng dịch vụ đồng nghĩa với việc khách hàng hiểu phạm vi tự động hóa, quyền hạn tài khoản và trách nhiệm khi vận hành phản hồi bằng AI.
              </p>
              <div className="tnw2-legal__content tnw2-legal-list">
                {TERMS_SECTIONS.map((section, index) => (
                  <article key={section.title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{section.title}</h3>
                      <p>{section.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="tnw2-section tnw2-deletion" id="data-deletion">
          <div className="v2k-section__inner">
            <Reveal>
              <SectionHeading
                index="05"
                eyebrow="Data deletion"
                title="Ngắt kết nối và yêu cầu xóa dữ liệu"
                description="Quy trình công khai dành cho chủ tài khoản hoặc người được ủy quyền hợp lệ."
              />
            </Reveal>

            <ol className="tnw2-deletion__steps">
              {DELETION_STEPS.map((step, index) => (
                <Reveal as="li" delay={index * 0.04} key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.content}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <div className="tnw2-deletion__note">
              <strong>Phạm vi không mặc định bao gồm</strong>
              <p>Dữ liệu thống kê đã ẩn danh không thể liên kết ngược với tài khoản; chứng từ giao dịch; hoặc bằng chứng sự cố phải lưu theo pháp luật. Thời gian xử lý và ngoại lệ hợp pháp, nếu có, sẽ được thông báo trong quá trình xác minh.</p>
            </div>
          </div>
        </section>

        <section className="tnw2-review" aria-labelledby="tnw-review-title">
          <div className="v2k-section__inner tnw2-review__inner">
            <p className="tnw2-review__label">IMPORTANT</p>
            <div>
              <h2 id="tnw-review-title">Minh bạch không đồng nghĩa với được phê duyệt.</h2>
              <p>
                Website, Privacy Policy, Terms và Data Deletion đầy đủ giúp hồ sơ nhất quán hơn nhưng không bảo đảm TikTok phê duyệt Business Messaging API. ToolNetWorks không phải TikTok, không đại diện hoặc ngụ ý được TikTok bảo trợ. Khi đăng ký dưới tên doanh nghiệp, tên pháp nhân, địa chỉ, mã số và người đại diện trong hồ sơ phải khớp chính xác với giấy tờ hợp lệ.
              </p>
              <a href="https://developers.tiktok.com/docs/en/our-guidelines-developer-guidelines" target="_blank" rel="noopener noreferrer">Xem TikTok Developer Guidelines</a>
            </div>
          </div>
        </section>

        <section className="tnw2-contact" id="contact">
          <div className="v2k-section__inner tnw2-contact__inner">
            <div>
              <p className="v2k-section-eyebrow">06 · Contact</p>
              <h2>Liên hệ ToolNetWorks</h2>
            </div>
            <div>
              <p>Hỗ trợ sản phẩm, quyền riêng tư và yêu cầu xóa dữ liệu.</p>
              <a href="mailto:infor@letanmedia.me">infor@letanmedia.me</a>
              <small>Website operator: LETAN Media · letanmedia.me</small>
            </div>
          </div>
        </section>
      </div>

      <V2PageFooter />
    </div>
  );
}

export default ToolNetworksPage;
