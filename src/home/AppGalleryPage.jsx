import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import V2PageHeader from '../components/V2PageHeader';
import { getPublishedCases } from '../data/caseStudies';
import './WebsiteGalleryPage.css';

// Curated from published repository data only. Add future app/software case
// slugs here after their project data and preview image have been verified.
const APP_PROJECT_SLUGS = new Set([
  'chatbot-ai-multichannel',
]);

const appProjects = getPublishedCases().filter((project) => (
  APP_PROJECT_SLUGS.has(project.slug) && project.images?.hero
));

function AppProjectCard({ project, index }) {
  return (
    <Link
      className="wgp-card"
      to={`/work/${project.slug}`}
      aria-label={`Xem dự án ${project.title}`}
    >
      <img
        src={project.images.hero}
        alt={`App preview — ${project.title}`}
        loading={index === 0 ? 'eager' : 'lazy'}
        fetchPriority={index === 0 ? 'high' : 'auto'}
        decoding="async"
        width="1200"
        height="675"
      />
    </Link>
  );
}

function GalleryFooter() {
  return (
    <>
      <section className="wgp-final" aria-labelledby="agp-final-title">
        <p id="agp-final-title">Start building <em>magic</em> today.</p>
        <div className="wgp-final__actions">
          <Link className="wgp-button wgp-button--outline" to="/contact">Đặt lịch hẹn</Link>
          <Link className="wgp-button wgp-button--light" to="/contact">Bắt đầu dự án</Link>
        </div>
      </section>

      <footer className="wgp-footer">
        <div className="wgp-footer__links">
          <div><span>PRODUCT</span><Link to="/">Trang chủ</Link><Link to="/services">Dịch vụ</Link></div>
          <div><span>RESOURCES</span><Link to="/work">Dự án</Link><Link to="/insights">Insights</Link><Link to="/contact">Liên hệ</Link></div>
          <div><span>COMPANY</span><Link to="/about">Giới thiệu</Link><Link to="/policy">Chính sách</Link></div>
          <div><span>CONTACT</span><a href="mailto:infor@letanmedia.me">Email</a><a href="tel:0765178999">0765 178 999</a></div>
        </div>
        <p className="wgp-footer__copyright">LETAN Media © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}

export default function AppGalleryPage() {
  return (
    <div className="wgp">
      <Seo
        title="App Gallery | LETAN Media"
        description="App Gallery giới thiệu các ứng dụng và phần mềm được LETAN Media trực tiếp thiết kế và phát triển."
        path="/appgallery"
      />

      <V2PageHeader overlay inverse />

      <main>
        <section className="wgp-hero">
          <h1>Explore next-gen Apps with LETAN Media.</h1>
          <div className="wgp-hero__actions">
            <Link className="wgp-button wgp-button--outline" to="/contact">Đặt lịch hẹn</Link>
            <Link className="wgp-button wgp-button--light" to="/contact">Bắt đầu dự án</Link>
          </div>
        </section>

        <section className="wgp-gallery" aria-label="Bộ sưu tập ứng dụng và phần mềm">
          <div className="wgp-gallery__grid">
            {appProjects.map((project, index) => (
              <AppProjectCard project={project} index={index} key={project.slug} />
            ))}
            <div className="wgp-category"><h2>AI Automation</h2></div>
            <div className="wgp-category"><h2>Apps &amp; Software</h2></div>
          </div>
        </section>
      </main>

      <GalleryFooter />
    </div>
  );
}
