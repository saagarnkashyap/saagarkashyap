import { Chapter, PageIntro, TextLink } from "../components/Editorial";
import { certifications, profile, skills } from "../content/profile";
import {
  PersonalIntro,
  WorkExperience,
} from "../components/PersonalBackground";
import now from "../content/now.json";
import { formatDate } from "../lib/articles";

export function About() {
  return (
    <>
      <PageIntro
        number="05"
        label="The person behind the projects"
        pageTitle="About me"
        layout="profile"
      />
      <PersonalIntro />
      <WorkExperience includeEducation />
      <section className="section wrap">
        <Chapter number="02">The things I work with</Chapter>
        <div className="skills-grid">
          {skills.map((group) => (
            <div key={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section
        className="section wrap credentials"
        id="certificates"
        aria-label="Certificates"
      >
        <Chapter number="03" heading>
          Certificates
        </Chapter>
        <ul>
          {certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>
      <section className="personal-note wrap">
        <span className="eyebrow gold">BEYOND THE WORK</span>
        <div>
          <p>
            There’s always something
            <br />
            else <em>to pay attention to.</em>
          </p>
          <TextLink to="/now">What’s occupying me now</TextLink>
        </div>
      </section>
    </>
  );
}

export function Now() {
  return (
    <>
      <PageIntro
        number="06"
        label="A now page"
        pageTitle="Now"
        title="A little about"
        italic="right now."
        description={now.intro}
      >
        <p className="mono now-updated">
          LAST UPDATED{" "}
          <time dateTime={now.updated}>{formatDate(now.updated)}</time>
        </p>
      </PageIntro>
      <section className="now-items wrap">
        {now.items.map((item, i) => (
          <article key={item.label}>
            <span className="mono gold">
              0{i + 1} / {item.label}
            </span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              {item.link && (
                <TextLink to={item.link}>{item.linkLabel}</TextLink>
              )}
            </div>
          </article>
        ))}
        <div className="now-footnote">
          <span className="gold" aria-hidden="true">
            ✳
          </span>
          <p>This page changes. The curiosity is fairly constant.</p>
          <a href={`mailto:${profile.email}`} className="mono">
            SAY HELLO ↗
          </a>
        </div>
      </section>
    </>
  );
}
