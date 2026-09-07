import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';

const SERVICE_LINKS = [
  {
    label: 'Report TikTok',
    to: '/tiktok-report',
  },
  {
    label: 'Report YouTube',
    to: '/youtube-report',
  },
  {
    label: 'Chatbot AI',
    to: '/chatbot-ai',
  },
  {
    label: 'Tất cả dịch vụ',
    to: '/services',
  },
];

const COMPANY_LINKS = [
  {
    label: 'Về LETAN',
    to: '/about',
  },
  {
    label: 'Dự án',
    to: '/work',
  },
  {
    label: 'Insights',
    to: '/insights',
  },
  {
    label: 'Liên hệ',
    to: '/contact',
  },
];

const FooterV2 = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="lm-footer">
      <div className="lm-section-container">
        <div className="lm-footer__top">
          <div className="lm-footer__brand">
            <Link
              to="/"
              className="lm-footer__logo"
              aria-label="LETAN Media"
            >
              LETAN <span>Media</span>
            </Link>

            <p>
              AI · Marketing · Digital Growth
            </p>

            <span className="lm-footer__description">
              Giải pháp AI, truyền thông số và
              phát triển phần mềm dành cho cá nhân
              và doanh nghiệp.
            </span>

            <div className="lm-footer__socials">
              <a
                href="https://t.me/Tanlemedia"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send
                  size={15}
                  strokeWidth={1.7}
                />

                Telegram

                <ArrowUpRight
                  size={13}
                  strokeWidth={1.6}
                />
              </a>

              <a
                href="https://zalo.me/0765178999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle
                  size={15}
                  strokeWidth={1.7}
                />

                Zalo

                <ArrowUpRight
                  size={13}
                  strokeWidth={1.6}
                />
              </a>
            </div>
          </div>


          <div className="lm-footer__column">
            <h3>
              Dịch vụ
            </h3>

            <nav>
              {SERVICE_LINKS.map(
                (item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </div>


          <div className="lm-footer__column">
            <h3>
              LETAN
            </h3>

            <nav>
              {COMPANY_LINKS.map(
                (item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </div>


          <div className="lm-footer__contact">
            <h3>
              Liên hệ
            </h3>

            <a
              href="tel:0765178999"
              className="lm-footer__contact-item"
            >
              <Phone
                size={16}
                strokeWidth={1.6}
              />

              <span>
                0765 178 999
              </span>
            </a>

            <a
              href="mailto:infor@letanmedia.me"
              className="lm-footer__contact-item"
            >
              <Mail
                size={16}
                strokeWidth={1.6}
              />

              <span>
                infor@letanmedia.me
              </span>
            </a>

            <Link
              to="/contact"
              className="lm-footer__contact-cta"
            >
              <span>
                Gửi yêu cầu tư vấn
              </span>

              <ArrowRightIcon />
            </Link>
          </div>
        </div>


        <div className="lm-footer__divider" />


        <div className="lm-footer__bottom">
          <div className="lm-footer__copyright">
            © {year} LETAN Media.
            All rights reserved.
          </div>

          <nav className="lm-footer__legal">
            <Link to="/policy">
              Privacy
            </Link>

            <Link to="/terms">
              Terms
            </Link>

            <Link to="/data-deletion">
              Data deletion
            </Link>
          </nav>

          <a
            href="#top"
            className="lm-footer__backtop"
            onClick={(event) => {
              event.preventDefault();

              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};

const ArrowRightIcon = () => (
  <ArrowUpRight
    size={15}
    strokeWidth={1.7}
  />
);

export default FooterV2;
