import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Mail, Check, AlertCircle, Loader2 } from 'lucide-react';
import Seo from '../../components/Seo';
import Reveal from '../../home/Reveal';
import { track, ANALYTICS_EVENTS } from '../../lib/analytics';
import { captureUtm, buildUtmPayload } from '../../lib/utm';
import { getAllServices } from '../../data/services';
import '../../home/home.css';

const CONTACT_CHANNELS = [
  { type: 'phone', label: 'Hotline', value: '0765 178 999', href: 'tel:0765178999', icon: Phone, trackEvent: ANALYTICS_EVENTS.CLICK_PHONE },
  { type: 'zalo', label: 'Zalo', value: 'Nhắn Zalo', href: 'https://zalo.me/0765178999', icon: MessageCircle, trackEvent: ANALYTICS_EVENTS.CLICK_ZALO, external: true },
  { type: 'telegram', label: 'Telegram', value: '@Tanlemedia', href: 'https://t.me/Tanlemedia', icon: MessageCircle, trackEvent: ANALYTICS_EVENTS.CLICK_TELEGRAM, external: true },
  { type: 'email', label: 'Email', value: 'infor@letanmedia.me', href: 'mailto:infor@letanmedia.me', icon: Mail, trackEvent: ANALYTICS_EVENTS.CLICK_EMAIL },
];

const BUDGET_OPTIONS = [
  'Dưới 10 triệu',
  '10–30 triệu',
  '30–50 triệu',
  '50–100 triệu',
  'Trên 100 triệu',
  'Chưa xác định',
];

const CONTACT_PREFERENCES = [
  { value: 'zalo', label: 'Zalo' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'phone', label: 'Điện thoại' },
  { value: 'email', label: 'Email' },
];

/** Build service options from services.js + "Khác" fallback */
function getServiceOptions() {
  const services = getAllServices();
  return [
    ...services.map((s) => ({ value: s.slug, label: s.shortTitle })),
    { value: 'other', label: 'Khác / Chưa xác định' },
  ];
}

/** Client-side validation */
function validate(fields) {
  const errors = {};
  if (!fields.name?.trim()) errors.name = 'Vui lòng nhập họ tên.';
  else if (fields.name.trim().length > 100) errors.name = 'Họ tên quá dài (tối đa 100 ký tự).';

  if (!fields.contact?.trim()) errors.contact = 'Vui lòng nhập email hoặc số điện thoại.';
  else {
    const v = fields.contact.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const isPhone = /^[0-9+\-\s()]{7,20}$/.test(v);
    if (!isEmail && !isPhone) errors.contact = 'Email hoặc số điện thoại không hợp lệ.';
  }

  if (!fields.message?.trim()) errors.message = 'Vui lòng nhập nội dung.';
  else if (fields.message.trim().length > 2000) errors.message = 'Nội dung quá dài (tối đa 2000 ký tự).';

  if (fields.website && fields.website.trim()) {
    try { new URL(fields.website.trim()); } catch {
      errors.website = 'URL không hợp lệ.';
    }
  }

  return errors;
}

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const preselectService = searchParams.get('service') || '';

  const [fields, setFields] = useState({
    name: '',
    company: '',
    contact: '',
    service: preselectService,
    website: '',
    budget: '',
    message: '',
    preferredContact: 'zalo',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState(''); // must stay empty
  const formStartRef = useRef(null);
  const formStarted = useRef(false);

  // Capture UTM on mount
  useEffect(() => { captureUtm(); }, []);

  // Preselect service from URL
  useEffect(() => {
    if (preselectService) {
      setFields((f) => ({ ...f, service: preselectService }));
    }
  }, [preselectService]);

  // Track view
  useEffect(() => {
    track(ANALYTICS_EVENTS.VIEW_CONTACT, { source_page: window.location.pathname });
  }, []);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));

    // Track form start (first interaction)
    if (!formStarted.current) {
      formStarted.current = true;
      formStartRef.current = Date.now();
      track(ANALYTICS_EVENTS.FORM_START, { service_slug: fields.service || null });
    }

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }, [errors, fields.service]);

  const onBlur = useCallback((e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  }, []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    // Honeypot check — silent reject
    if (honeypot) return;

    // Timing check — reject if submitted too fast (< 3s)
    if (formStartRef.current && (Date.now() - formStartRef.current) < 3000) {
      // Silently reject — don't reveal anti-spam
      setStatus('success');
      return;
    }

    // Validate
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTouched({ name: true, contact: true, message: true });
      track(ANALYTICS_EVENTS.FORM_ERROR, { errors: Object.keys(errs).join(','), service_slug: fields.service || null });
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    const utmPayload = buildUtmPayload();
    const payload = {
      name: fields.name.trim(),
      company: fields.company.trim() || null,
      contact: fields.contact.trim(),
      service: fields.service || null,
      website: fields.website.trim() || null,
      budget: fields.budget || null,
      message: fields.message.trim(),
      preferredContact: fields.preferredContact,
      sourcePage: window.location.pathname,
      referrer: document.referrer || null,
      ...utmPayload,
    };

    try {
      const apiUrl = import.meta.env.VITE_CONTACT_API_URL || '/api/contact';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error ${res.status}`);
      }

      setStatus('success');
      track(ANALYTICS_EVENTS.GENERATE_LEAD, {
        service_slug: fields.service || null,
        source_page: payload.sourcePage,
        utm_source: utmPayload.utmSource || null,
        utm_campaign: utmPayload.utmCampaign || null,
      });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp.');
      track(ANALYTICS_EVENTS.FORM_ERROR, { error: 'server', service_slug: fields.service || null });
    }
  }, [fields, honeypot]);

  const serviceOptions = getServiceOptions();

  return (
    <>
      <Seo
        title="Liên hệ | LETAN Media — Tư vấn AI & Digital Growth"
        description="Kết nối với LETAN Media để nhận tư vấn giải pháp AI, truyền thông số và phát triển phần mềm."
        path="/contact"
      />

      {/* Breadcrumb */}
      <nav className="hm-wrap" aria-label="Breadcrumb" style={{ paddingTop: '120px', paddingBottom: '0' }}>
        <Reveal>
          <div className="hm-breadcrumb">
            <Link to="/" className="hm-breadcrumb-link">
              <ArrowLeft size={14} /> Trang chủ
            </Link>
            <span className="hm-breadcrumb-sep" aria-hidden="true">/</span>
            <span className="hm-breadcrumb-current">Liên hệ</span>
          </div>
        </Reveal>
      </nav>

      {/* Hero */}
      <section className="hm-section hm-section--tight" style={{ paddingTop: '40px' }}>
        <div className="hm-wrap">
          <Reveal>
            <span className="hm-eyebrow">Liên hệ</span>
            <h1 className="hm-h2" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', marginBottom: '18px' }}>
              Trao đổi với LETAN
            </h1>
            <p className="hm-lead" style={{ maxWidth: '640px' }}>
              Digital Growth, AI Automation, Website/Software hoặc Platform Protection — cho chúng tôi biết bạn cần gì, chúng tôi sẽ phản hồi trong 24h.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form + Channels */}
      <section className="hm-section hm-section--tight">
        <div className="hm-wrap">
          <div className="hm-contact-grid">
            {/* Form */}
            <Reveal>
              {status === 'success' ? (
                <div className="hm-contact-success" role="status" aria-live="polite">
                  <div className="hm-contact-success__icon">
                    <Check size={32} />
                  </div>
                  <h2 className="hm-h3">Đã nhận thông tin!</h2>
                  <p className="hm-lead" style={{ marginTop: '12px' }}>
                    Cảm ơn bạn. LETAN sẽ liên hệ trong vòng 24h qua kênh bạn chọn.
                  </p>
                  <button
                    className="ui-btn ui-btn--secondary"
                    style={{ marginTop: '24px' }}
                    onClick={() => {
                      setStatus('idle');
                      setFields({ name: '', company: '', contact: '', service: preselectService, website: '', budget: '', message: '', preferredContact: 'zalo' });
                      setErrors({});
                      setTouched({});
                      formStarted.current = false;
                    }}
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="hm-contact-form">
                  {/* Honeypot — hidden from real users */}
                  <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
                    <label htmlFor="website_hp">Website</label>
                    <input
                      id="website_hp"
                      name="website_hp"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="hm-form-row">
                    <FormField
                      label="Họ tên"
                      name="name"
                      value={fields.name}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={touched.name && errors.name}
                      required
                      autoComplete="name"
                      placeholder="Nguyễn Văn A"
                    />
                    <FormField
                      label="Công ty"
                      name="company"
                      value={fields.company}
                      onChange={onChange}
                      onBlur={onBlur}
                      autoComplete="organization"
                      placeholder="Tên công ty (không bắt buộc)"
                    />
                  </div>

                  <div className="hm-form-row">
                    <FormField
                      label="Email hoặc Số điện thoại"
                      name="contact"
                      value={fields.contact}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={touched.contact && errors.contact}
                      required
                      autoComplete="email"
                      placeholder="you@email.com hoặc 0765178999"
                    />
                    <div className="hm-form-field">
                      <label className="hm-form-label" htmlFor="service">Dịch vụ quan tâm</label>
                      <select
                        id="service"
                        name="service"
                        value={fields.service}
                        onChange={onChange}
                        className="hm-form-select"
                      >
                        <option value="">Chọn dịch vụ...</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="hm-form-row">
                    <FormField
                      label="Website / Social URL"
                      name="website"
                      value={fields.website}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={touched.website && errors.website}
                      autoComplete="url"
                      placeholder="https://..."
                      type="url"
                    />
                    <div className="hm-form-field">
                      <label className="hm-form-label" htmlFor="budget">Ngân sách dự kiến</label>
                      <select
                        id="budget"
                        name="budget"
                        value={fields.budget}
                        onChange={onChange}
                        className="hm-form-select"
                      >
                        <option value="">Chọn khoảng...</option>
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <FormField
                    label="Nội dung"
                    name="message"
                    value={fields.message}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={touched.message && errors.message}
                    required
                    as="textarea"
                    placeholder="Mô tả ngắn gọn dự án hoặc vấn đề bạn cần giải quyết..."
                  />

                  {/* Preferred contact */}
                  <div className="hm-form-field">
                    <label className="hm-form-label">Liên hệ qua</label>
                    <div className="hm-contact-prefs">
                      {CONTACT_PREFERENCES.map((pref) => (
                        <label key={pref.value} className={`hm-contact-pref ${fields.preferredContact === pref.value ? 'active' : ''}`}>
                          <input
                            type="radio"
                            name="preferredContact"
                            value={pref.value}
                            checked={fields.preferredContact === pref.value}
                            onChange={onChange}
                            className="hm-sr-only"
                          />
                          {pref.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Consent */}
                  <label className="hm-form-consent">
                    <input type="checkbox" required className="hm-sr-only" />
                    <span className="hm-form-consent__check" aria-hidden="true" />
                    <span>Tôi đồng ý để LETAN Media sử dụng thông tin trên để liên hệ về yêu cầu này. Xem <Link to="/policy">Chính sách bảo mật</Link>.</span>
                  </label>

                  {status === 'error' && (
                    <div className="hm-form-error" role="alert" aria-live="assertive">
                      <AlertCircle size={18} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="ui-btn ui-btn--primary ui-btn--lg"
                    disabled={status === 'loading'}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {status === 'loading' ? (
                      <><Loader2 size={18} className="hm-spin" /> Đang gửi...</>
                    ) : (
                      'Gửi yêu cầu tư vấn'
                    )}
                  </button>
                </form>
              )}
            </Reveal>

            {/* Contact Channels */}
            <Reveal delay={0.1}>
              <div className="hm-contact-channels">
                <h3 className="hm-h3" style={{ marginBottom: '24px' }}>Hoặc liên hệ trực tiếp</h3>
                {CONTACT_CHANNELS.map((ch) => {
                  const Icon = ch.icon;
                  return (
                    <a
                      key={ch.type}
                      href={ch.href}
                      className="hm-contact-channel"
                      target={ch.external ? '_blank' : undefined}
                      rel={ch.external ? 'noopener noreferrer' : undefined}
                      onClick={() => track(ch.trackEvent, { source_page: '/contact' })}
                    >
                      <div className="hm-contact-channel__icon">
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="hm-contact-channel__label">{ch.label}</div>
                        <div className="hm-contact-channel__value">{ch.value}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="hm-section hm-section--tight" style={{ background: 'var(--color-surface-1)', borderTop: 'var(--border-subtle)', borderBottom: 'var(--border-subtle)' }}>
        <div className="hm-wrap">
          <Reveal>
            <span className="hm-eyebrow">Quy trình</span>
            <h2 className="hm-h3" style={{ marginBottom: '36px' }}>Sau khi bạn gửi thông tin</h2>
          </Reveal>
          <div className="hm-service-process">
            {[
              { step: 'Nhận thông tin', desc: 'LETAN nhận yêu cầu và phân tích trong 24h.' },
              { step: 'Tư vấn', desc: 'Liên hệ qua kênh bạn chọn để trao đổi chi tiết.' },
              { step: 'Đề xuất', desc: 'Gửi đề xuất giải pháp và báo giá phù hợp.' },
              { step: 'Triển khai', desc: 'Ký hợp đồng và bắt đầu triển khai theo plan.' },
            ].map((p, i) => (
              <Reveal key={i} className="hm-service-step" delay={i * 0.08}>
                <div className="hm-service-step__num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="hm-service-step__title">{p.step}</h3>
                <p className="hm-service-step__desc">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Short FAQ */}
      <section className="hm-section hm-section--tight">
        <div className="hm-wrap">
          <Reveal>
            <span className="hm-eyebrow">FAQ</span>
            <h2 className="hm-h3" style={{ marginBottom: '36px' }}>Câu hỏi nhanh</h2>
          </Reveal>
          <div className="hm-service-faq" role="list" style={{ maxWidth: '780px' }}>
            {[
              { q: 'Phản hồi trong bao lâu?', a: 'Thông thường trong 24h. Trường hợp gấp có thể liên hệ hotline hoặc Zalo để được hỗ trợ ngay.' },
              { q: 'Có cần đặt cọc không?', a: 'Không đặt cọc khi tư vấn. Chỉ thanh toán khi đã thống nhất scope và ký hợp đồng.' },
              { q: 'Làm việc với khách hàng ở xa?', a: 'Có. LETAN làm việc với khách hàng trên toàn quốc qua online — Zalo, Telegram, email và video call.' },
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

/** Reusable form field */
function FormField({ label, name, value, onChange, onBlur, error, required, as, autoComplete, placeholder, type = 'text' }) {
  const Tag = as === 'textarea' ? 'textarea' : 'input';
  return (
    <div className="hm-form-field">
      <label className="hm-form-label" htmlFor={name}>
        {label} {required && <span className="hm-form-required" aria-label="bắt buộc">*</span>}
      </label>
      <Tag
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        placeholder={placeholder}
        type={as !== 'textarea' ? type : undefined}
        className={`hm-form-input ${error ? 'hm-form-input--error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        rows={as === 'textarea' ? 5 : undefined}
      />
      {error && (
        <span id={`${name}-error`} className="hm-form-error-text" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

/** FAQ accordion item */
function FaqItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);
  const panelId = `contact-faq-${index}`;
  const triggerId = `contact-faq-trigger-${index}`;

  return (
    <div className="hm-faq-item" role="listitem">
      <button
        id={triggerId}
        className="hm-faq-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
      >
        <span>{question}</span>
        <span className={`hm-faq-icon ${open ? 'open' : ''}`} aria-hidden="true">+</span>
      </button>
      {open && (
        <div id={panelId} role="region" aria-labelledby={triggerId} className="hm-faq-panel">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default ContactPage;
