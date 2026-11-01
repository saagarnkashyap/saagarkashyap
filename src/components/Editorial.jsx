import { Link } from "react-router-dom";
import { projectImages } from "../content/project-images";
import { photos, photoSource, photoSrcSet } from "../content/photos";

export function Arrow({ diagonal = false, className = "" }) {
  return (
    <svg
      className={`arrow ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M5 19 19 5M5 5h14v14" />
      ) : (
        <path d="M4 12h15m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}

export function TextLink({ to, children, external = false, className = "" }) {
  const content = (
    <>
      {children}
      <Arrow diagonal={external} />
    </>
  );
  return external ? (
    <a
      className={`text-link ${className}`}
      href={to}
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </a>
  ) : (
    <Link className={`text-link ${className}`} to={to}>
      {content}
    </Link>
  );
}

export function Chapter({ number, children, aside, heading = false }) {
  const Label = heading ? "h2" : "span";
  return (
    <div className="chapter">
      <Label className="eyebrow">
        <span className="chapter-number">{number}</span>
        {children}
      </Label>
      {aside && <span className="chapter-aside mono">{aside}</span>}
    </div>
  );
}

export function PageIntro({
  number,
  label,
  pageTitle = label,
  title,
  italic,
  description,
  children,
  layout = "compact",
}) {
  const supportingText = [title, italic].filter(Boolean).join(" ");
  return (
    <header className={`page-intro wrap page-intro-${layout}`}>
      <div className="page-intro-heading">
        <div className="page-title-row">
          <span className="page-number mono">{number}</span>
          <h1>{pageTitle}</h1>
        </div>
        {children && <div className="page-intro-actions">{children}</div>}
      </div>
      {(supportingText || description) && (
        <div className="page-intro-copy">
          {supportingText && <p className="page-tagline">{supportingText}</p>}
          {description && <p className="intro-description">{description}</p>}
        </div>
      )}
    </header>
  );
}

export function Photo({
  id,
  className = "",
  priority = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
}) {
  const photo = photos.find((p) => p.id === id);
  return (
    <img
      className={className}
      src={photoSource(photo)}
      srcSet={photoSrcSet(photo)}
      sizes={sizes}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}

export function ProjectVisual({ project, large = false }) {
  const image = projectImages[project.slug];
  if (image) {
    return (
      <div
        className={`project-visual visual-screenshot visual-${project.slug}-screenshot ${large ? "is-large" : ""}`}
      >
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
        />
      </div>
    );
  }
  if (project.visual === "ride")
    return (
      <div className="project-visual visual-ride">
        <svg viewBox="0 0 600 260" aria-hidden="true">
          <path d="m0 221 30-5 30-25 25 7 25-58 30 19 30-55 25 18 32-68 30 29 24-35 30 45 25-19 35 68 28-12 25 48 30-24 30 45 41-9" />
        </svg>
        <span className="visual-overline mono">
          THE PERSONAL RIDE COMPANION
        </span>
        <span className="ride-title">
          RideZilla<span>↗</span>
        </span>
        <span className="visual-bottom mono">
          DISTANCE / PACE / PERSPECTIVE
        </span>
      </div>
    );
  if (project.visual === "wafer")
    return (
      <div className="project-visual visual-wafer">
        <div className="wafer-map" aria-hidden="true">
          <div />
        </div>
        <span className="wafer-title">Wafex</span>
        <span className="visual-bottom mono">
          PATTERN RECOGNITION / WM-811K
        </span>
      </div>
    );
  if (project.visual === "neuro")
    return (
      <div className="project-visual visual-neuro">
        <div className="neuro-illustration" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <span className="neuro-title">
          NeuroAsha<span>DEMENTIA COMPANION / RESEARCH</span>
        </span>
        <span className="visual-bottom mono">
          MACHINE LEARNING / A HUMAN QUESTION
        </span>
      </div>
    );
  return (
    <div className="project-visual visual-semiconductor">
      <div className="chip-illustration" aria-hidden="true">
        <div>
          <span>Si</span>
          <small className="mono">14 / SILICON</small>
        </div>
      </div>
      <div className="semiconductor-title">
        A closer look
        <br />
        <em>at the industry.</em>
      </div>
      <span className="visual-bottom mono">
        SEMICONDUCTORS / DATA / CONTEXT
      </span>
    </div>
  );
}

export function ProjectItem({ project, index, featured = false }) {
  return (
    <article className={`project-item ${featured ? "project-featured" : ""}`}>
      <Link
        className="project-cover"
        to={`/work/${project.slug}`}
        aria-label={`Explore ${project.name}`}
      >
        <ProjectVisual project={project} />
        <span className="project-open">
          <Arrow diagonal />
        </span>
      </Link>
      <div className="project-caption">
        <span className="mono project-index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3>
            <Link to={`/work/${project.slug}`}>{project.name}</Link>
          </h3>
          <p>{project.category}</p>
        </div>
        <span className="mono project-caption-note">
          {project.year || "SELECTED WORK"}
        </span>
      </div>
      {featured && <p className="project-description">{project.description}</p>}
    </article>
  );
}
