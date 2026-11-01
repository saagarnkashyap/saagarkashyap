import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Arrow, Chapter, PageIntro, TextLink } from "../components/Editorial";
import { articles, formatDate } from "../lib/articles";
import { writingLinks } from "../content/links";
import NotFound from "./NotFound";

export function Writing() {
  const [filter, setFilter] = useState("All notes");
  const tags = ["All notes", ...new Set(articles.flatMap((a) => a.tags))];
  const visible = articles.filter(
    (a) => filter === "All notes" || a.tags.includes(filter),
  );
  return (
    <>
      <PageIntro
        number="02"
        label="Writing & thinking"
        pageTitle="Writing"
        layout="writing"
        description="A notebook for technical ideas, project reflections, poetry, and the things that don't fit anywhere else."
      >
        <a className="rss-link mono" href="/rss.xml">
          FOLLOW VIA RSS <span aria-hidden="true">↗</span>
        </a>
      </PageIntro>
      <section className="writing-archive wrap">
        {articles.length > 0 ? (
          <>
            <div className="filter-bar" aria-label="Filter articles by tag">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className={tag === filter ? "active" : ""}
                  aria-pressed={tag === filter}
                  onClick={() => setFilter(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="article-list">
              {visible.map((a) => (
                <article key={a.slug}>
                  <div className="mono muted">
                    <time dateTime={a.date}>{formatDate(a.date)}</time>
                    <span>{a.readingTime} MIN READ</span>
                  </div>
                  <Link to={`/writing/${a.slug}`}>
                    <h2>{a.title}</h2>
                    <Arrow diagonal />
                  </Link>
                  <p>{a.description}</p>
                  <div className="article-tags mono">
                    {a.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="writing-empty">
            <div className="notebook-mark" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div>
              <span className="eyebrow gold">THE NOTEBOOK IS OPEN</span>
              <h2>
                Nothing published.
                <br />
                <em>Plenty to notice.</em>
              </h2>
              <p>
                There aren’t any essays here yet. When there are, this will be
                their home. For now, a couple of notes from the original journal
                live on LinkedIn.
              </p>
            </div>
          </div>
        )}
        <div className="elsewhere">
          <Chapter number="↗">Notes elsewhere</Chapter>
          {writingLinks.map((note, i) => (
            <a
              href={note.href}
              target="_blank"
              rel="noreferrer"
              key={note.href}
              className="external-note"
            >
              <span className="mono gold">0{i + 1}</span>
              <div>
                <span className="mono muted">{note.label}</span>
                <h3>{note.title}</h3>
              </div>
              <span className="mono muted">LINKEDIN</span>
              <Arrow diagonal />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

export function Article() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return <NotFound />;
  return (
    <div className="reading-page">
      <article className="reading-wrap">
        <TextLink to="/writing">Back to the journal</TextLink>
        <header className="article-header">
          <div className="article-tags mono">
            {article.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <div className="mono">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span>{article.readingTime} MIN READ</span>
            <span>SAAGAR KASHYAP</span>
          </div>
        </header>
        {article.headings.length > 3 && (
          <details className="article-toc">
            <summary className="mono">IN THIS NOTE</summary>
            <nav aria-label="Table of contents">
              {article.headings.map((h) => (
                <a key={h.id} href={`#${h.id}`}>
                  {h.text}
                </a>
              ))}
            </nav>
          </details>
        )}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
        <footer className="article-end">
          <span className="gold" aria-hidden="true">
            ✳
          </span>
          <p>Thanks for reading.</p>
          <TextLink to="/writing">More from the journal</TextLink>
        </footer>
      </article>
    </div>
  );
}
