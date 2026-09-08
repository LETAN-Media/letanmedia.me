import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Code2,
  ShieldCheck,
} from 'lucide-react';
import { getPublishedCases } from '../data/caseStudies';

const CATEGORY_META = {
  'Web & Software': {
    label: 'WEB & SOFTWARE',
    icon: Code2,
  },
  'AI Automation': {
    label: 'AI & AUTOMATION',
    icon: Bot,
  },
  'Platform Protection': {
    label: 'TRUST & PROTECTION',
    icon: ShieldCheck,
  },
};

const getCategoryMeta = (category) => {
  return (
    CATEGORY_META[category] ?? {
      label: category?.toUpperCase() || 'LETAN CASE',
      icon: Code2,
    }
  );
};

const getProjectShortTitle = (project) => {
  if (!project?.title) {
    return 'LETAN Media Case Study';
  }
  const [firstPart] = project.title.split('—');
  return firstPart.trim();
};

const ProjectCard = ({
  project,
  variant = 'small',
  index = 0,
  reduceMotion = false,
}) => {
  if (!project) {
    return null;
  }

  const meta = getCategoryMeta(project.category);
  const Icon = meta.icon;

  return (
    <motion.article
      className={[
        'lm-project-card',
        `lm-project-card--${variant}`,
      ].join(' ')}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.55,
        delay: reduceMotion ? 0 : index * 0.08,
      }}
    >
      <Link
        to={`/work/${project.slug}`}
        className="lm-project-card__link"
        aria-label={`Xem dự án ${project.title}`}
      >
        <div className="lm-project-card__media">
          {project.images?.hero ? (
            <img
              src={project.images.hero}
              alt={project.title}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="lm-project-card__placeholder">
              <Icon size={38} strokeWidth={1.3} />
            </div>
          )}

          <div className="lm-project-card__category">
            <Icon size={12} strokeWidth={1.8} />
            <span>{meta.label}</span>
          </div>

          <div className="lm-project-card__open">
            <ArrowUpRight size={17} strokeWidth={1.8} />
          </div>
        </div>

        <div className="lm-project-card__content">
          <h3>
            {variant === 'hero'
              ? project.title
              : getProjectShortTitle(project)}
          </h3>

          <p>{project.summary}</p>

          {project.technologies?.length > 0 && (
            <div className="lm-project-card__tech">
              {project.technologies
                .slice(0, variant === 'hero' ? 4 : 3)
                .map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
};

const ProjectShowcaseV2 = () => {
  const reduceMotion = useReducedMotion();
  const allCases = getPublishedCases();
  const featured = allCases.find((c) => c.featured) || allCases[0];
  const secondaryProjects = allCases
    .filter((c) => c.slug !== featured?.slug)
    .slice(0, 2);

  return (
    <section id="portfolio" className="lm-projects">
      <div className="lm-section-container">
        <motion.div
          className="lm-projects__head"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="lm-section-eyebrow">
              DỰ ÁN CHỌN LỌC
            </div>

            <h2>
              Sản phẩm & hệ thống
              <br />
              đã được triển khai
            </h2>

            <p>
              Mỗi hồ sơ trình bày một bài toán thực tế, phạm vi triển khai và lựa chọn kỹ thuật đã được ghi nhận trong dự án.
            </p>
          </div>

          <Link to="/work" className="lm-view-all">
            <span>Hồ sơ dự án</span>
            <ArrowRight size={16} strokeWidth={1.8} />
          </Link>
        </motion.div>

        <div className="lm-projects__layout">
          <ProjectCard
            project={featured}
            variant="hero"
            index={0}
            reduceMotion={reduceMotion}
          />

          {secondaryProjects.length > 0 && (
            <div className="lm-projects__secondary">
              {secondaryProjects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  variant="small"
                  index={index + 1}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcaseV2;
