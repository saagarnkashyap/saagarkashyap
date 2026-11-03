import { useState } from "react";
import { Arrow, Chapter, PageIntro, TextLink } from "../components/Editorial";
import { TrophyGrid } from "../components/StravaTrophies";
import {
  stravaMedalPhotos,
  stravaProfile,
  stravaTrophies,
} from "../content/strava";
import { formatDate } from "../lib/articles";

export default function StravaTrophies() {
  const [expanded, setExpanded] = useState(false);
  const visibleTrophies = expanded
    ? stravaTrophies
    : stravaTrophies.slice(0, 6);
  return (
    <div className="trophy-layout">
      <PageIntro
        number="04"
        label="Trophy case"
        layout="trophies"
        description="A few finishes, and the challenges collected along the way."
      >
        <TextLink to={stravaProfile.url} external>
          My Strava profile
        </TextLink>
        <figure className="strava-medal-moments">
          <div className="strava-medal-photos">
            {stravaMedalPhotos.map((photo) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                decoding="async"
              />
            ))}
          </div>
          <figcaption>After the finish.</figcaption>
        </figure>
      </PageIntro>
      <div className="strava-page wrap">
        <section aria-label="All Strava trophies">
          <Chapter number="01" heading>
            Challenge badges
          </Chapter>
          <p className="strava-snapshot mono">
            {stravaTrophies.length} CHALLENGE BADGES / AS OF{" "}
            <time dateTime={stravaProfile.updated}>
              {formatDate(stravaProfile.updated)}
            </time>
          </p>
          <div className="trophy-collection-controls">
            <p aria-live="polite">
              Showing {visibleTrophies.length} of {stravaTrophies.length} badges
            </p>
            <button
              className="text-link"
              aria-expanded={expanded}
              aria-controls="challenge-badges"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show fewer" : "Show more"}
              <Arrow />
            </button>
          </div>
          <TrophyGrid id="challenge-badges" trophies={visibleTrophies} />
          <TextLink to="/strava">Back to Strava</TextLink>
        </section>
      </div>
    </div>
  );
}
