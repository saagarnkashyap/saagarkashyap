import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import {
  Chapter,
  PageIntro,
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
    "Web & personal": ["bheeshma", "ridezilla", "neuroasha"],
    "Data & intelligence": ["semiconductor-insights", "neuroasha", "wafex"],
    Engineering: ["arti-e", "wafex", "semiconductor-insights"],
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
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
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
          </div>
        </div>
        <div className="tech-list mono">
          {project.technologies.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </header>
      <div className="case-visual wrap">
        <ProjectVisual project={project} large />
        <span className="case-visual-caption mono">
          {projectImages[project.slug]?.caption ||
            "PROJECT IDENTITY / EDITORIAL COVER"}
        </span>
      </div>
      <div className="case-body wrap">
        {project.sections.map(([title, text], i) => (
          <section className="case-section" key={title}>
            <div className="case-section-label">
              <span className="mono gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2>{title}</h2>
            </div>
            <p>{text}</p>
          </section>
        ))}
      </div>
      <aside className="next-project wrap">
        <Chapter number="NEXT">Keep exploring</Chapter>
        <Link to={`/work/${next.slug}`}>
          <span>{next.name}</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </aside>
    </article>
  );
}
