import { Chapter, PageIntro, TextLink } from "../components/Editorial";
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
  stravaPortrait,
  stravaPhotoCutout,
} from "../content/strava";
import { formatDate } from "../lib/articles";

const totals = Object.fromEntries(
  allTimeStats.map(({ label, value, unit }) => [
    label,
    `${value}${unit ? ` ${unit}` : ""}`,
  ]),
);
const longestRide = bestEfforts.find(
  (effort) => effort.label === "Longest ride",
);

export default function Strava() {
  return (
    <>
      <PageIntro
        number="04"
        label="Strava"
        layout="strava"
        description="Time outside, personal bests, and the bikes along the way."
      >
        <figure className="strava-intro-photo strava-ink-portrait">
          <img
            className="strava-portrait-light"
            src={stravaPortrait.src}
            alt={stravaPortrait.alt}
            width={stravaPortrait.width}
            height={stravaPortrait.height}
            decoding="async"
          />
          <img
            className="strava-portrait-dark"
            src={stravaPhotoCutout.src}
            alt={stravaPhotoCutout.alt}
            width={stravaPhotoCutout.width}
            height={stravaPhotoCutout.height}
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
          <p className="strava-cycling-story">
            As of{" "}
            <time dateTime={stravaProfile.updated}>
              {formatDate(stravaProfile.updated)}
            </time>
            , I’ve logged <strong>{totals.Activities} activities</strong>,
            covered <strong>{totals.Distance}</strong>, and climbed{" "}
            <strong>{totals["Elevation gain"]}</strong>. That’s{" "}
            <strong>{totals.Time}</strong> spent on my bike.
          </p>
          <p className="strava-cycling-story strava-longest-ride">
            My longest ride so far is{" "}
            <a
              className="strava-inline-link"
              href={`https://www.strava.com/activities/${longestRide.activity}/best-efforts`}
              target="_blank"
              rel="noreferrer"
            >
              {longestRide.value}
            </a>
            .
          </p>
        </section>
        <section className="strava-gear" aria-label="Cycling gear">
          <Chapter number="02" heading>
            Gear
          </Chapter>
          <p className="strava-gear-story">
            These are my bikes:{" "}
            {bikes.map((bike, index) => (
              <span key={bike.name}>
                {index > 0 && (index === bikes.length - 1 ? ", and " : ", ")}
                <a
                  className="strava-inline-link"
                  href={bike.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {bike.name}
                </a>{" "}
                ({bike.distance})
              </span>
            ))}
            .
          </p>
        </section>
        <section
          className="strava-best-efforts"
          aria-label="Cycling best efforts"
        >
          <Chapter number="03" heading>
            Personal bests
          </Chapter>
          <p className="strava-embed-note">
            My quickest recorded cycling efforts, by distance.
          </p>
          <ul
            className="strava-effort-times"
            aria-label="Best cycling times by distance"
          >
            {bestEffortTimes.map((effort) => (
              <li key={effort.label}>
                I finished{" "}
                <strong>
                  {effort.label.endsWith(" mile")
                    ? `${effort.label}s`
                    : effort.label.replace("K", " km")}
                </strong>{" "}
                in{" "}
                <a
                  href={`https://www.strava.com/activities/${effort.activity}/best-efforts`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${effort.label} best time: ${effort.value}, view on Strava`}
                >
                  {effort.value}
                </a>
                .
              </li>
            ))}
          </ul>
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
