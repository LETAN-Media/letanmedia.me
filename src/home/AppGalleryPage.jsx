import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Seo from '../components/Seo';
import V2PageHeader from '../components/V2PageHeader';
import V2PageFooter from '../components/V2PageFooter';
import Reveal from './Reveal';
import { getPublishedCases } from '../data/caseStudies';
import './WorkPageV2.css';
import './WebsiteGalleryPage.css';

// Curated from published repository data only. Add future app/software case
// slugs here after their project data and preview image have been verified.
const APP_PROJECT_SLUGS = new Set([
  'chatbot-ai-multichannel',
]);

const appProjects = getPublishedCases().filter((project) => (
  APP_PROJECT_SLUGS.has(project.slug) && project.images?.hero
));

const AppProjectCard = ({ project, delay = 0 }) => (
  <Reveal
    as={Link}
    to={`/work/${project.slug}`}
    className="wp2-card wp2-card--lead wgp-project"
    delay={delay}
  >
    <div className="wp2-card__media">
      <img
        src={project.images.hero}
        alt={`App preview — ${project.title}`}
        loading="eager"
        decoding="async"
        width="1200"
        height="675"
      />
    </div>
    <div className="wp2-card__body">
      <span className="wp2-card__cat">{project.category}</span>
      <h2 className="wp2-card__title">{project.title}</h2>
      <p className="wp2-card__summary">{project.summary}</p>
      <span className="wp2-card__cta">
        Xem chi tiết dự án
        <span className="wp2-arrow" aria-hidden="true">
          <ArrowUpRight size={16} strokeWidth={2} />
        </span>
      </span>
    </div>
  </Reveal>
);

export default function AppGalleryPage() {
  return (
    <div className="wp2 wgp">
      <Seo
        title="App Gallery | LETAN Media"
        description="App Gallery giới thiệu các ứng dụng và phần mềm được LETAN Media trực tiếp thiết kế và phát triển."
        path="/appgallery"
      />

      <V2PageHeader />

      <section className="wp2-hero wgp-hero">
        <div className="wp2-hero__inner">
          <Reveal>
            <p className="wp2-hero__eyebrow">APP GALLERY · LETAN MEDIA</p>
            <h1 className="wp2-hero__title">App Gallery</h1>
            <p className="wp2-hero__kicker">Apps We&apos;ve Built</p>
            <p className="wp2-hero__subtitle">
              Tuyển chọn các ứng dụng và phần mềm được LETAN Media trực tiếp thiết kế
              và phát triển, chỉ sử dụng dự án đã được xác minh trong dữ liệu hiện có.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="wgp-gallery" aria-labelledby="app-gallery-heading">
        <div className="wgp-gallery__inner">
          <Reveal className="wgp-gallery__head">
            <p className="wp2-section-eyebrow">Selected apps &amp; software</p>
            <h2 className="wp2-section-title" id="app-gallery-heading">
              Dự án ứng dụng &amp; phần mềm
            </h2>
          </Reveal>

          {appProjects.length > 0 ? (
            <div className="wgp-gallery__grid">
              {appProjects.map((project, index) => (
                <AppProjectCard
                  key={project.slug}
                  project={project}
                  delay={index * 0.06}
                />
              ))}
            </div>
          ) : (
            <Reveal className="wgp-empty">
              <p>Danh mục ứng dụng đang được cập nhật từ dữ liệu dự án đã xác minh.</p>
            </Reveal>
          )}

          {appProjects.length < 2 && (
            <Reveal className="wgp-status" delay={0.08}>
              <span className="wgp-status__label">Archive status</span>
              <p>
                Danh mục đang được cập nhật. LETAN Media chỉ công bố các ứng dụng và
                phần mềm có dữ liệu cùng hình ảnh đã được xác minh trong repository.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <V2PageFooter />
    </div>
  );
}
