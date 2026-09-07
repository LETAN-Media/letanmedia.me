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
import {
  getFeaturedCases,
} from '../data/caseStudies';

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
      label: category?.toUpperCase() || 'LETAN PROJECT',
      icon: Code2,
    }
  );
};

const getProjectShortTitle = (project) => {
  if (!project?.title) {
    return 'LETAN Media Project';
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
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 28,
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        duration: 0.58,
        delay: reduceMotion
          ? 0
          : index * 0.06,
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
              <Icon
                size={42}
                strokeWidth={1.4}
              />
            </div>
          )}

          <div className="lm-project-card__media-overlay" />

          <div className="lm-project-card__category">
            <Icon
              size={12}
              strokeWidth={1.7}
            />
            <span>{meta.label}</span>
          </div>

          <div className="lm-project-card__open">
            <ArrowUpRight
              size={19}
              strokeWidth={1.6}
            />
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
                .slice(0, variant === 'hero' ? 4 : 2)
                .map((technology) => (
                  <span key={technology}>
                    {technology}
                  </span>
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

  const projects = getFeaturedCases();

  if (!projects.length) {
    return null;
  }

  const [featured, ...secondary] = projects;
  const secondaryProjects = secondary.slice(0, 2);

  return (
    <section
      id="portfolio"
      className="lm-projects"
    >
      <div className="lm-section-container">
        <motion.div
          className="lm-projects__head"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 22,
                }
          }
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <div>
            <div className="lm-section-eyebrow">
              DỰ ÁN TIÊU BIỂU
            </div>

            <h2>
              Những dự án
              <br />
              đã tạo nên khác biệt
            </h2>

            <p>
              Mỗi dự án là một bài toán thực tế.
              LETAN Media kết hợp công nghệ, AI và
              chiến lược để xây dựng giải pháp có
              thể tiếp tục mở rộng.
            </p>
          </div>

          <Link
            to="/work"
            className="lm-view-all"
          >
            <span>Xem tất cả</span>
            <ArrowRight
              size={16}
              strokeWidth={1.7}
            />
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
              {secondaryProjects.map(
                (project, index) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    variant="small"
                    index={index + 1}
                    reduceMotion={reduceMotion}
                  />
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcaseV2;
