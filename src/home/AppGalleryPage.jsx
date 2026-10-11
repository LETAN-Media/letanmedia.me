import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Seo from '../components/Seo';
import V2PageHeader from '../components/V2PageHeader';
import V2PageFooter from '../components/V2PageFooter';
import { getPublishedCases } from '../data/caseStudies';
import './WebsiteGalleryPage.css';
import './AppGalleryPage.css';

// Curated from published repository data only. Add future app/software case
// slugs here after their project data and preview image have been verified.
const APP_PROJECT_SLUGS = new Set([
  'chatbot-ai-multichannel',
]);

const appProjects = getPublishedCases().filter((project) => (
  APP_PROJECT_SLUGS.has(project.slug) && project.images?.hero
));

const appCategories = [
  {
    id: 'mobile',
    eyebrow: '01 / Mobile products',
    title: 'App Mobile',
    detail: 'iOS · Android · Cross-platform',
  },
  {
    id: 'zalo',
    eyebrow: '02 / Mini app ecosystem',
    title: 'App Zalo Mini',
    detail: 'Mini App · Customer journey · Loyalty',
  },
];

function AppCategoryPanel({ category }) {
  return (
    <article className={`agp-category-panel agp-category-panel--${category.id}`}>
      <div className="agp-category-panel__copy">
        <p>{category.eyebrow}</p>
        <h2>{category.title}</h2>
        <span>{category.detail}</span>
        <small>Danh mục dự án đang cập nhật</small>
      </div>
      <div className="agp-category-panel__visual" aria-hidden="true">
        <i /><i /><i /><i />
      </div>
    </article>
  );
}

function AppProjectCard({ project, index }) {
  const capabilities = [...project.services, ...project.technologies].slice(0, 6);

  return (
    <article className="agp-project">
      <Link
        className="agp-project__media"
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

      <div className="agp-project__body">
        <div className="agp-project__meta">
          <span>{project.category}</span>
          <span>Featured app</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>

        <ul className="agp-project__capabilities" aria-label="Công nghệ và năng lực">
          {capabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>

        <Link className="agp-project__cta" to={`/work/${project.slug}`}>
          Xem chi tiết dự án
          <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>
    </article>
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

        <section className="agp-categories" aria-label="Danh mục ứng dụng">
          {appCategories.map((category) => (
            <AppCategoryPanel category={category} key={category.id} />
          ))}
        </section>

        <section className="agp-showcase" aria-labelledby="agp-showcase-title">
          <div className="agp-showcase__head">
            <div>
              <p>03 / AI Automation</p>
              <h2 id="agp-showcase-title">Featured application</h2>
            </div>
            <span aria-label={`${appProjects.length} dự án`}>
              {String(appProjects.length).padStart(2, '0')}
            </span>
          </div>

          <div className="agp-projects">
            {appProjects.map((project, index) => (
              <AppProjectCard project={project} index={index} key={project.slug} />
            ))}
          </div>
        </section>
      </main>

      <V2PageFooter />
    </div>
  );
}
