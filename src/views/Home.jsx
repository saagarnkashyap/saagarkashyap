import { Link } from "react-router-dom";
import {
  Arrow,
  Chapter,
  PageIntro,
  ProjectVisual,
} from "../components/Editorial";
import {
  PersonalIntro,
  WorkExperience,
} from "../components/PersonalBackground";
import { projects } from "../content/projects";
import PhotoSlider from "../components/PhotoSlider";

const previews = ["bheeshma", "arti-e", "wafex", "neuroasha"].map((slug) =>
  projects.find((project) => project.slug === slug),
);

export default function Home() {
  return (
    <div className="home-profile">
      <PageIntro
        number="00"
        label="A little about me"
        layout="home"
        pageTitle={
          <>
            Hello, I'm <span className="home-name">Saagar.</span>
          </>
        }
      />
      <PersonalIntro />
      <WorkExperience />
      <section
        className="section wrap home-projects"
        aria-label="Project previews"
      >
        <Chapter number="02" heading>
          A glimpse of the projects
        </Chapter>
        <div className="home-projects-heading">
          <h2>
            A few things
            <br />
            <em>I’ve built.</em>
          </h2>
          <Link className="all-work-button" to="/work">
            View all work
            <Arrow diagonal />
          </Link>
        </div>
        <div className="home-project-grid">
          {previews.map((project) => (
            <Link
              className="home-project-preview"
              to="/work"
              key={project.slug}
              aria-label={`View ${project.name} in all work`}
            >
              <ProjectVisual project={project} />
              <span className="home-project-title">
                <span>{project.name}</span>
                <Arrow diagonal />
              </span>
            </Link>
          ))}
        </div>
        <Link className="all-work-button all-work-button-mobile" to="/work">
          View all work
          <Arrow diagonal />
        </Link>
      </section>
      <PhotoSlider />
    </div>
  );
}
