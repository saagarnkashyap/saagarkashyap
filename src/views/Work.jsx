import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  PageIntro,
  ProjectAnimationControl,
  ProjectItem,
  ProjectVisual,
  TextLink,
} from "../components/Editorial";
import { projects } from "../content/projects";
import { projectImages } from "../content/project-images";
import NotFound from "./NotFound";

export function Work() {
  const [filter, setFilter] = useState("All work");
  const filters = [
    "All work",
    "Web & personal",
    "Data & intelligence",
    "Engineering",
  ];
  const groups = {
    "Web & personal": ["bheeshma", "ridezilla", "neuroasha", "claudetrippy"],
    "Data & intelligence": [
      "semiconductor-insights",
      "neuroasha",
      "wafex",
      "falconet",
      "drishtinet",
    ],
    Engineering: [
      "arti-e",
      "wafex",
      "semiconductor-insights",
      "falconet",
      "claudetrippy",
    ],
  };
  const visible =
    filter === "All work"
      ? projects
      : projects.filter((p) => groups[filter].includes(p.slug));
  return (
    <>
      <PageIntro
        number="01"
        label="The work archive"
        pageTitle="Work archive"
        layout="archive"
        description="Software, data, and a few experiments that took on a life of their own. Each starts with something I wanted to understand."
      />
      <section className="wrap archive-section">
        <div className="filter-bar" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              aria-pressed={f === filter}
              className={f === filter ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
          <span className="mono filter-count" aria-live="polite">
            {String(visible.length).padStart(2, "0")} PROJECTS
          </span>
        </div>
        <div className="work-grid">
          {visible.map((p) => (
            <ProjectItem
              key={p.slug}
              project={p}
              index={projects.indexOf(p)}
              featured
            />
          ))}
        </div>
        <p className="archive-footnote mono">
          AN EVOLVING SELECTION. MORE EXPERIMENTS ON{" "}
          <a
            href="https://github.com/saagarnkashyap"
            target="_blank"
            rel="noreferrer"
          >
            GITHUB ↗
          </a>
        </p>
      </section>
    </>
  );
}

export function CaseStudy() {
  const { slug } = useParams();
  const [animationPaused, setAnimationPaused] = useState(false);
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;
  const index = projects.indexOf(project);
  const relatedProjects = Array.from(
    { length: Math.min(4, projects.length - 1) },
    (_, offset) => projects[(index + offset + 1) % projects.length],
  );
  return (
    <article className={`case-study theme-${project.theme}`}>
      <header className="case-header wrap">
        <TextLink to="/work">Back to all work</TextLink>
        <div className="case-kicker mono">
          <span>
            {String(index + 1).padStart(2, "0")} / {project.category}
          </span>
          {project.year && <span>{project.year}</span>}
        </div>
        <h1>
          {project.name}
          <span className="gold">.</span>
        </h1>
        <p className="case-subtitle">{project.subtitle}</p>
        <div className="case-intro">
          <p>{project.description}</p>
          <div className="case-links">
            {project.live && (
              <TextLink to={project.live} external>
                Open live project
              </TextLink>
            )}
            {project.repository && (
              <TextLink to={project.repository} external>
                Source on GitHub
              </TextLink>
            )}
            {project.links?.map((link) => (
              <TextLink key={link.url} to={link.url} external>
                {link.label}
              </TextLink>
            ))}
          </div>
        </div>
        <div className="tech-list mono">
          {project.technologies.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </header>
      <div className="case-visual wrap">
        {projectImages[project.slug]?.poster ? (
          <div className="project-preview">
            <ProjectVisual project={project} large paused={animationPaused} />
            <ProjectAnimationControl
              paused={animationPaused}
              onToggle={() => setAnimationPaused(!animationPaused)}
            />
          </div>
        ) : (
          <ProjectVisual project={project} large />
        )}
        <span className="case-visual-caption mono">
          {projectImages[project.slug]?.caption ||
            "PROJECT IDENTITY / EDITORIAL COVER"}
        </span>
      </div>
      <section className="case-readme wrap" aria-label="Project overview">
        <div className="case-readme-file">
          <div className="case-readme-header mono">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M4 1.5h5l3 3v10H4zM9 1.5v3h3M6 8h4M6 11h4" />
            </svg>
            README.md
          </div>
          <div className="case-readme-content">
            <h2>In brief</h2>
            <ul>
              {project.summary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {project.note && <p className="case-readme-note">{project.note}</p>}
          </div>
        </div>
      </section>
      <section className="case-related wrap" aria-label="More projects">
        <div className="case-related-heading">
          <h2>More projects</h2>
          <TextLink to="/work">View all work</TextLink>
        </div>
        <div className="home-project-grid case-project-grid">
          {relatedProjects.map((item) => (
            <ProjectItem
              key={item.slug}
              project={item}
              index={projects.indexOf(item)}
            />
          ))}
        </div>
      </section>
    </article>
  );
}
