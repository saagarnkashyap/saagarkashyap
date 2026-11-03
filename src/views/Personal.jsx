import { Chapter, PageIntro, TextLink } from "../components/Editorial";
import { profile, skills } from "../content/profile";
import { recommendations, selectedCertificates } from "../content/about";
import now from "../content/now.json";
import { formatDate } from "../lib/articles";

export function About() {
  return (
    <div className="about-page">
      <PageIntro
        number="05"
        label="The person behind the projects"
        pageTitle="About me"
        layout="profile"
      />
      <section
        className="about-story wrap"
        aria-label="Background and interests"
      >
        <div className="about-story-prose">
          <p className="about-lead">
            I’m interested in what happens between understanding a problem and
            making something useful from it.
          </p>
          <p>
            I studied Computer Science and Engineering at VIT, Andhra Pradesh.
            My work has taken me from business analysis at Tiger Analytics to
            planning systems at GlobalFoundries: different settings for the same
            practical questions about data, processes, and the people using
            them.
          </p>
          <p>
            I care about clarity. A dashboard should make a comparison easier;
            automation should take recurring work off someone’s hands. My own
            projects give me room to explore those ideas through semiconductor
            analysis, computer vision, and software people can interact with.
          </p>
          <p>
            Away from that work, I take photographs, write poetry, cycle, and
            experiment with music editing. They give me other ways to look
            closely, follow a thought, or spend time outside the screen.
          </p>
          <div className="about-story-links">
            <TextLink to="/photos">My photographs</TextLink>
            <TextLink to="/strava">Time on the bike</TextLink>
          </div>
        </div>
        <aside
          className="about-direction"
          aria-labelledby="about-direction-title"
        >
          <span className="eyebrow gold">LOOKING AHEAD</span>
          <h2 id="about-direction-title">Useful data. Useful software.</h2>
          <p>
            I’m open to opportunities and collaborations where I can work with
            data, build software, and make everyday processes clearer or easier.
            I’d like to keep learning by working on problems that matter to the
            people using the result.
          </p>
          <div className="about-skill-groups" aria-label="Skills and interests">
            {skills.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <ul className="about-skill-tags">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="about-contact-links">
            <TextLink to={`mailto:${profile.email}`} external>
              Let’s talk
            </TextLink>
            <TextLink to="/Saagar-Kashyap-Resume.pdf" external>
              Read my résumé
            </TextLink>
          </div>
        </aside>
      </section>
      <section
        className="section wrap about-recommendations"
        id="recommendations"
        aria-label="Recommendations"
      >
        <Chapter number="01" heading>
          Recommendations
        </Chapter>
        <div className="about-section-intro">
          <p>Perspectives from teachers and mentors who have worked with me.</p>
          <TextLink
            to={`${profile.linkedin}details/recommendations/?detailScreenTabIndex=0`}
            external
          >
            Read on LinkedIn
          </TextLink>
        </div>
        <div className="recommendation-grid">
          {recommendations.map((recommendation) => (
            <article className="recommendation" key={recommendation.url}>
              <figure>
                <blockquote className="recommendation-excerpt">
                  <p>“{recommendation.excerpt}”</p>
                </blockquote>
                <figcaption>
                  <h3>
                    <a
                      href={recommendation.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {recommendation.name}
                    </a>
                  </h3>
                  <p>{recommendation.role}</p>
                  <p className="recommendation-context">
                    {recommendation.relationship} ·{" "}
                    <time dateTime={recommendation.date}>
                      {formatDate(recommendation.date)}
                    </time>
                  </p>
                </figcaption>
              </figure>
              <details>
                <summary
                  aria-label={`Read full recommendation from ${recommendation.name}`}
                >
                  Read full recommendation
                  <span aria-hidden="true" className="recommendation-toggle" />
                </summary>
                <blockquote className="recommendation-full">
                  {recommendation.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </blockquote>
              </details>
            </article>
          ))}
        </div>
      </section>
      <section
        className="section wrap credentials"
        id="certificates"
        aria-label="Certificates"
      >
        <Chapter number="02" heading>
          Certificates
        </Chapter>
        <ul>
          {selectedCertificates.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>
      <section className="personal-note wrap">
        <span className="eyebrow gold">BEYOND THE WORK</span>
        <div>
          <p>A little more about life outside the projects.</p>
          <TextLink to="/now">Latest updates</TextLink>
        </div>
      </section>
    </div>
  );
}

export function Now() {
  return (
    <>
      <PageIntro
        number="06"
        label="Updates"
        pageTitle="Updates"
        title="Work, projects, and life lately."
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
