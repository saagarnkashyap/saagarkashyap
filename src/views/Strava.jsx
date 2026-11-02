import { Arrow, Chapter, PageIntro, TextLink } from "../components/Editorial";
import StravaActivity from "../components/StravaActivity";
import { TrophyGrid } from "../components/StravaTrophies";
import {
  allTimeStats,
  bestEfforts,
  bestEffortTimes,
  bikes,
  stravaActivities,
  stravaProfile,
  stravaTrophies,
  stravaMedalPhotos,
} from "../content/strava";
import { formatDate } from "../lib/articles";

export default function Strava() {
  return (
    <>
      <PageIntro
        number="04"
        label="Strava"
        layout="strava"
        description="Time outside, personal bests, and the bikes along the way."
      >
        <figure className="strava-intro-photo">
          <img
            src={stravaMedalPhotos[0].src}
            alt={stravaMedalPhotos[0].alt}
            width={stravaMedalPhotos[0].width}
            height={stravaMedalPhotos[0].height}
            decoding="async"
          />
        </figure>
        <TextLink to={stravaProfile.url} external>
          My Strava profile
        </TextLink>
      </PageIntro>
      <div className="strava-page wrap">
        <section aria-label="All-time cycling statistics">
          <Chapter number="01" heading>
            All-time cycling
          </Chapter>
          <p className="strava-snapshot mono">
            TOTALS AS OF{" "}
            <time dateTime={stravaProfile.updated}>
              {formatDate(stravaProfile.updated)}
            </time>
          </p>
          <dl className="strava-totals">
            {allTimeStats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>
                  {stat.value}
                  {stat.unit && <span> {stat.unit}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="strava-gear" aria-label="Cycling gear">
          <Chapter number="02" heading>
            Gear
          </Chapter>
          <ul className="strava-bikes">
            {bikes.map((bike) => (
              <li key={bike.name}>
                <TextLink to={bike.url} external>
                  {bike.name}
                </TextLink>
                <span>{bike.distance}</span>
              </li>
            ))}
          </ul>
        </section>
        <section
          className="strava-best-efforts"
          aria-label="Cycling best efforts"
        >
          <Chapter number="03" heading>
            Best efforts
          </Chapter>
          <dl className="strava-records">
            {bestEfforts.map((effort) => (
              <div key={effort.label}>
                <dt>{effort.label}</dt>
                <dd>
                  <TextLink
                    to={`https://www.strava.com/activities/${effort.activity}/best-efforts`}
                    external
                  >
                    {effort.value}
                  </TextLink>
                </dd>
              </div>
            ))}
          </dl>
          <dl
            className="strava-effort-times"
            aria-label="Best cycling times by distance"
          >
            {bestEffortTimes.map((effort) => (
              <div key={effort.label}>
                <dt>{effort.label}</dt>
                <dd>
                  <a
                    href={`https://www.strava.com/activities/${effort.activity}/best-efforts`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${effort.label} best time: ${effort.value}, view on Strava`}
                  >
                    <span>{effort.value}</span>
                    <Arrow diagonal />
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <section
          className="strava-trophy-section"
          aria-label="Strava trophy case"
        >
          <Chapter number="04" heading>
            Trophies
          </Chapter>
          <p className="strava-snapshot mono">
            {stravaTrophies.length} CHALLENGE BADGES / AS OF{" "}
            <time dateTime={stravaProfile.updated}>
              {formatDate(stravaProfile.updated)}
            </time>
          </p>
          <TrophyGrid trophies={stravaTrophies.slice(0, 6)} />
          <div className="strava-trophies">
            <TextLink to="/strava/trophies">Show more trophies</TextLink>
            <TextLink to={stravaProfile.url} external>
              View my trophy case on Strava
            </TextLink>
          </div>
        </section>
        <section
          className="strava-rides"
          aria-label="Selected Strava activities"
        >
          <Chapter number="05" heading>
            Selected activities
          </Chapter>
          <p className="strava-embed-note">
            Seven activities from my Strava. If an embed does not load, open the
            activity using the link below it.
          </p>
          <div className="strava-activities">
            {stravaActivities.map((activity, index) => (
              <StravaActivity
                key={activity.id}
                activity={activity}
                index={index}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
