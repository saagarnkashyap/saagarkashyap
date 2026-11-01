import { Chapter, Photo } from "./Editorial";
import { experience } from "../content/profile";

export function PersonalIntro() {
  return (
    <section className="about-opening wrap" aria-label="Introduction">
      <div className="about-image">
        <Photo id="the-doorway" priority />
        <span className="mono">
          SOMETHING THAT CAUGHT MY EYE / FROM THE ARCHIVE
        </span>
      </div>
      <div className="about-prose">
        <p className="large-copy">
          I like a good question.
          <br />
          And seeing <em>where it goes.</em>
        </p>
        <p>
          I work with data and planning systems. The practical side of that is
          Python, SQL, dashboards, and automation. The part I enjoy is making a
          complicated process a little clearer for the person using it.
        </p>
        <p>
          That curiosity wanders. It’s led me to a Bhagavad Gita companion,
          semiconductor analysis, computer vision, and a browser-based robotic
          workcell.
        </p>
        <p>
          Outside that work, there’s photography, poetry, cycling, and music
          editing. I like noticing small things. Having a camera in my pocket
          helps.
        </p>
        <a
          className="text-link"
          href="/Saagar-Kashyap-Resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          The résumé, if you’d like it <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

export function WorkExperience({ includeEducation = false }) {
  return (
    <section
      className="section wrap"
      id="experience"
      aria-label="Work experience"
    >
      <Chapter number="01" heading>
        Work experience
      </Chapter>
      <div className="experience-list">
        {experience.map((item) => (
          <article key={item.company}>
            <span className="mono muted">{item.dates}</span>
            <div>
              <div className="company-identity">
                {item.logo && (
                  <span
                    className={`company-logo company-logo-${item.logoStyle}`}
                  >
                    <img
                      src={item.logo}
                      alt={`${item.company} logo`}
                      width={item.logoWidth}
                      height="43"
                      loading="lazy"
                    />
                  </span>
                )}
                <h3 className="company-name">{item.company}</h3>
              </div>
              <h3>{item.role}</h3>
              <p>{item.detail}</p>
            </div>
          </article>
        ))}
        {includeEducation && (
          <article>
            <span className="mono muted">2022 — 2026</span>
            <div>
              <h2>VIT, Andhra Pradesh</h2>
              <h3>
                Bachelor of Engineering · Computer Science and Engineering
              </h3>
              <p>
                CGPA 8.04 / 10. Also part of the Hostel Committee and Kannada
                Association, leading creative work for cultural events and
                mentoring juniors.
              </p>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
