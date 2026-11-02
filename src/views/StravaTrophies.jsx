import { Chapter, PageIntro, TextLink } from "../components/Editorial";
import { TrophyGrid } from "../components/StravaTrophies";
import {
  stravaMedalPhotos,
  stravaProfile,
  stravaTrophies,
} from "../content/strava";
import { formatDate } from "../lib/articles";

export default function StravaTrophies() {
  return (
    <div className="trophy-layout">
      <PageIntro number="04" label="Trophy case" layout="logbook">
        <TextLink to={stravaProfile.url} external>
          My Strava profile
        </TextLink>
      </PageIntro>
      <div className="strava-page wrap">
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
          <TrophyGrid trophies={stravaTrophies} />
          <TextLink to="/strava">Back to Strava</TextLink>
        </section>
      </div>
    </div>
  );
}
