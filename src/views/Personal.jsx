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
      <section className="section wrap credentials">
        <Chapter number="03">A few formalities</Chapter>
        <h2>
          Learning, with <em>a paper trail.</em>
        </h2>
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

export function Cycling() {
  return (
    <>
      <PageIntro
        number="04"
        label="Cycling Journal"
        layout="logbook"
        description="A personal logbook for rides, routes, and time outside."
      />
      <section className="running-journal wrap">
        <div className="logbook-heading">
          <span className="mono gold">THE LOGBOOK</span>
          <span className="mono muted">NO ACTIVITIES PUBLISHED YET</span>
        </div>
        <div className="running-empty">
          <div className="cycling-illustration" aria-hidden="true">
            <svg viewBox="0 0 360 220">
              <circle cx="75" cy="150" r="53" />
              <circle cx="285" cy="150" r="53" />
              <path
                className="cycle-frame"
                d="m75 150 65-80 55 80H75m65-80h100l45 80m-90 0 45-80-10-30h30M140 70l-10-25m-12 0h36"
              />
              <circle cx="195" cy="150" r="9" />
              <path d="m195 150 15 13h13m-28-13-15-13h-11" />
            </svg>
          </div>
          <div>
            <span className="eyebrow">ROOM FOR THE ROAD AHEAD</span>
            <h2>
              The rides happen.
              <br />
              <em>The log comes next.</em>
            </h2>
            <p>
              There aren’t any activity records here yet. When the journal is
              connected, this will be a place for real distances, recent rides,
              and routes worth remembering.
            </p>
            <span className="integration-label mono">
              <span className="status-dot" />
              ACTIVITY CONNECTION PENDING
            </span>
          </div>
        </div>
        <div className="logbook-columns">
          <div>
            <span className="mono gold">01 / THE DISTANCE</span>
            <h3>Over time.</h3>
            <p>
              A space for yearly distance and consistency, once activity data is
              available.
            </p>
          </div>
          <div>
            <span className="mono gold">02 / THE ROUTES</span>
            <h3>Out and back.</h3>
            <p>
              Favorite loops and longer detours, shared when there’s a real
              route to show.
            </p>
          </div>
          <div>
            <span className="mono gold">03 / THE NOTES</span>
            <h3>More than numbers.</h3>
            <p>
              A place for the small things a ride leaves you thinking about.
            </p>
          </div>
        </div>
      </section>
      <aside className="running-related wrap">
        <Chapter number="↗">A related experiment</Chapter>
        <div>
          <h2>
            Before this logbook,
            <br />
            there was <em>RideZilla.</em>
          </h2>
          <p>
            A personal cycling dashboard built around Strava activity data. A
            different project, and another way of looking at time spent outside.
          </p>
          <TextLink to="/work/ridezilla">Explore RideZilla</TextLink>
        </div>
      </aside>
    </>
  );
}
