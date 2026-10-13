import React, { useEffect } from 'react';
import Seo from '../components/Seo';
import V2PageHeader from '../components/V2PageHeader';
import V2PageFooter from '../components/V2PageFooter';
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

function ToolNetworksPage() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return undefined;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="tnw-page">
      <Seo
        title="ToolNetWorks — Software, AI & API"
        description="ToolNetWorks phát triển phần mềm, AI và API. Tìm hiểu AI TikTok Manager, chính sách quyền riêng tư, điều khoản và quy trình xóa dữ liệu."
        path="/toolnetworks"
      />

      <V2PageHeader overlay inverse />

      <section className="tnw-hero" aria-labelledby="tnw-title">
        <div className="tnw-hero__glow" aria-hidden="true" />
        <div className="tnw-shell tnw-hero__grid">
          <div className="tnw-hero__copy">
            <p className="tnw-eyebrow">SOFTWARE · AI · API</p>
            <h1 id="tnw-title">ToolNet<span>Works</span></h1>
            <p className="tnw-hero__lead">
              Thương hiệu phát triển phần mềm, hệ thống AI và API cho những quy trình vận hành cần độ chính xác, khả năng kiểm soát và khả năng mở rộng.
            </p>
            <div className="tnw-hero__actions">
              <a className="tnw-button tnw-button--primary" href="#ai-tiktok-manager">Khám phá AI TikTok Manager</a>
              <a className="tnw-button tnw-button--ghost" href="#privacy">Xem chính sách dữ liệu</a>
            </div>
          </div>

          <div className="tnw-system-map" aria-label="Mô hình mỗi tài khoản có pipeline và AI riêng">
            <div className="tnw-system-map__topline">
              <span>LIVE SYSTEM MAP</span>
              <span className="tnw-system-map__status">CONTROLLED</span>
            </div>
            <div className="tnw-system-map__account">
              <span className="tnw-system-map__index">ACCOUNT 01</span>
              <span className="tnw-system-map__node">PIPELINE 01</span>
              <span className="tnw-system-map__node tnw-system-map__node--accent">AI 01</span>
              <span className="tnw-system-map__node">INBOX 01</span>
            </div>
            <div className="tnw-system-map__account">
              <span className="tnw-system-map__index">ACCOUNT 02</span>
              <span className="tnw-system-map__node">PIPELINE 02</span>
              <span className="tnw-system-map__node tnw-system-map__node--accent">AI 02</span>
              <span className="tnw-system-map__node">INBOX 02</span>
            </div>
            <div className="tnw-system-map__account">
              <span className="tnw-system-map__index">ACCOUNT N</span>
              <span className="tnw-system-map__node">PIPELINE N</span>
              <span className="tnw-system-map__node tnw-system-map__node--accent">AI N</span>
              <span className="tnw-system-map__node">INBOX N</span>
            </div>
            <p>Mỗi tài khoản · Một cấu hình · Một luồng kiểm soát riêng</p>
          </div>
        </div>
      </section>

      <nav className="tnw-local-nav" aria-label="Điều hướng ToolNetWorks">
        <div className="tnw-shell">
          <a href="#ai-tiktok-manager">Product</a>
          <a href="#features">Features</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#data-deletion">Data Deletion</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <div className="tnw-main">
        <section className="tnw-section tnw-product" id="ai-tiktok-manager">
          <div className="tnw-shell">
            <div className="tnw-section-head">
              <p className="tnw-eyebrow">01 / FLAGSHIP SYSTEM</p>
              <h2>AI TikTok Manager</h2>
              <p>Hệ thống quản lý nhiều tài khoản TikTok, trong đó mỗi tài khoản có Pipeline, System Prompt và AI riêng.</p>
            </div>

            <div className="tnw-product__layout">
              <div className="tnw-product__statement">
                <p className="tnw-product__lead">Một inbox tập trung.<br />Nhiều luồng vận hành độc lập.</p>
                <p>
                  Hệ thống tiếp nhận sự kiện và hội thoại trong phạm vi quyền TikTok được cấp, đưa chúng vào đúng workspace, áp dụng pipeline của tài khoản đó, rồi tạo hoặc gửi phản hồi theo chế độ khách hàng đã cấu hình.
                </p>
              </div>
              <ol className="tnw-flow" aria-label="Luồng xử lý AI TikTok Manager">
                <li><span>01</span><strong>Authorized account</strong><small>Khách hàng chủ động kết nối và cấp quyền.</small></li>
                <li><span>02</span><strong>Inbound message</strong><small>Sự kiện được định tuyến vào đúng inbox.</small></li>
                <li><span>03</span><strong>Account pipeline</strong><small>Áp dụng rule, System Prompt và ngữ cảnh riêng.</small></li>
                <li><span>04</span><strong>Reply & history</strong><small>Phản hồi theo chế độ cấu hình và lưu dấu vết hội thoại.</small></li>
              </ol>
            </div>
          </div>
        </section>

        <section className="tnw-section tnw-features" id="features">
          <div className="tnw-shell">
            <div className="tnw-section-head tnw-section-head--compact">
              <p className="tnw-eyebrow">02 / CAPABILITIES</p>
              <h2>Các tính năng cốt lõi</h2>
            </div>
            <div className="tnw-feature-list">
              {FEATURES.map((feature) => (
                <article className="tnw-feature" key={feature.number}>
                  <span>{feature.number}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tnw-section tnw-policy" id="privacy">
          <div className="tnw-shell tnw-policy__grid">
            <aside className="tnw-policy__aside">
              <p className="tnw-eyebrow">03 / PRIVACY POLICY</p>
              <h2>Chính sách quyền riêng tư</h2>
              <p>Cập nhật lần cuối: 13/10/2026</p>
            </aside>
            <div className="tnw-policy__content">
              <p className="tnw-policy__intro">
                Phần này mô tả dữ liệu AI TikTok Manager cần để vận hành, dữ liệu đi qua chức năng nào và khách hàng kiểm soát dữ liệu ra sao.
              </p>

              <div className="tnw-data-table" role="table" aria-label="Dữ liệu ToolNetWorks xử lý">
                <div className="tnw-data-table__head" role="row">
                  <span role="columnheader">Chức năng</span>
                  <span role="columnheader">Dữ liệu liên quan</span>
                  <span role="columnheader">Mục đích</span>
                </div>
                {DATA_ROWS.map((row) => (
                  <div className="tnw-data-table__row" role="row" key={row.source}>
                    <strong role="cell">{row.source}</strong>
                    <span role="cell">{row.data}</span>
                    <span role="cell">{row.purpose}</span>
                  </div>
                ))}
              </div>

              {PRIVACY_SECTIONS.map((section, index) => (
                <article className="tnw-legal-block" key={section.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{section.title}</h3>
                    {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tnw-section tnw-policy" id="terms">
          <div className="tnw-shell tnw-policy__grid">
            <aside className="tnw-policy__aside">
              <p className="tnw-eyebrow">04 / TERMS OF SERVICE</p>
              <h2>Điều khoản sử dụng</h2>
              <p>Áp dụng cho AI TikTok Manager và dịch vụ ToolNetWorks.</p>
            </aside>
            <div className="tnw-policy__content">
              <p className="tnw-policy__intro">
                Việc sử dụng dịch vụ đồng nghĩa với việc khách hàng hiểu phạm vi tự động hóa, quyền hạn tài khoản và trách nhiệm khi vận hành phản hồi bằng AI.
              </p>
              {TERMS_SECTIONS.map((section, index) => (
                <article className="tnw-legal-block" key={section.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{section.title}</h3>
                    <p>{section.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tnw-section tnw-deletion" id="data-deletion">
          <div className="tnw-shell">
            <div className="tnw-section-head">
              <p className="tnw-eyebrow">05 / DATA DELETION</p>
              <h2>Ngắt kết nối và yêu cầu xóa dữ liệu</h2>
              <p>Quy trình công khai dành cho chủ tài khoản hoặc người được ủy quyền hợp lệ.</p>
            </div>

            <ol className="tnw-deletion__steps">
              <li><span>01</span><div><h3>Ngắt kết nối</h3><p>Ngắt tài khoản trong khu vực quản lý AI TikTok Manager và/hoặc thu hồi quyền của ứng dụng trong phần cài đặt tài khoản TikTok. Hệ thống sẽ dừng nhận dữ liệu mới từ kết nối đó.</p></div></li>
              <li><span>02</span><div><h3>Gửi yêu cầu</h3><p>Email đến <a href="mailto:infor@letanmedia.me?subject=ToolNetWorks%20Data%20Deletion%20Request">infor@letanmedia.me</a> với tiêu đề “ToolNetWorks Data Deletion Request”. Cung cấp email workspace, tên doanh nghiệp và tài khoản TikTok cần xóa; không gửi mật khẩu hoặc access token.</p></div></li>
              <li><span>03</span><div><h3>Xác minh phạm vi</h3><p>ToolNetWorks phản hồi qua email để xác minh thẩm quyền và xác nhận phạm vi: token kết nối, metadata tài khoản, lịch sử hội thoại, System Prompt, cấu hình pipeline và phản hồi đã lưu.</p></div></li>
              <li><span>04</span><div><h3>Xử lý và xác nhận</h3><p>Sau khi xác minh, dữ liệu trong phạm vi sẽ được xóa hoặc ẩn danh khỏi hệ thống hoạt động. ToolNetWorks gửi xác nhận hoàn tất và thông báo rõ nếu có bản ghi bắt buộc phải giữ vì nghĩa vụ pháp lý, chống gian lận hoặc sự cố bảo mật.</p></div></li>
            </ol>

            <div className="tnw-deletion__note">
              <strong>Phạm vi không mặc định bao gồm</strong>
              <p>Dữ liệu thống kê đã ẩn danh không thể liên kết ngược với tài khoản; chứng từ giao dịch; hoặc bằng chứng sự cố phải lưu theo pháp luật. Thời gian xử lý và ngoại lệ hợp pháp, nếu có, sẽ được thông báo trong quá trình xác minh.</p>
            </div>
          </div>
        </section>

        <section className="tnw-section tnw-review-note" aria-labelledby="tnw-review-title">
          <div className="tnw-shell tnw-review-note__inner">
            <p className="tnw-eyebrow">IMPORTANT</p>
            <h2 id="tnw-review-title">Minh bạch không đồng nghĩa với được phê duyệt.</h2>
            <p>
              Website, Privacy Policy, Terms và Data Deletion đầy đủ giúp hồ sơ nhất quán hơn nhưng không bảo đảm TikTok phê duyệt Business Messaging API. ToolNetWorks không phải TikTok, không đại diện hoặc ngụ ý được TikTok bảo trợ. Khi đăng ký dưới tên doanh nghiệp, tên pháp nhân, địa chỉ, mã số và người đại diện trong hồ sơ phải khớp chính xác với giấy tờ hợp lệ.
            </p>
            <a href="https://developers.tiktok.com/docs/en/our-guidelines-developer-guidelines" target="_blank" rel="noopener noreferrer">Xem TikTok Developer Guidelines</a>
          </div>
        </section>

        <section className="tnw-section tnw-contact" id="contact">
          <div className="tnw-shell tnw-contact__inner">
            <div>
              <p className="tnw-eyebrow">06 / CONTACT</p>
              <h2>Liên hệ ToolNetWorks</h2>
            </div>
            <div className="tnw-contact__details">
              <p>Hỗ trợ sản phẩm, quyền riêng tư và yêu cầu xóa dữ liệu</p>
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
