export function TrophyGrid({ trophies }) {
  return (
    <ul className="strava-trophy-grid">
      {trophies.map((trophy) => (
        <li key={trophy.id}>
          <a href={trophy.url} target="_blank" rel="noreferrer">
            <img
              src={trophy.image}
              alt=""
              width="100"
              height="100"
              loading="lazy"
              decoding="async"
            />
            <span>{trophy.name}</span>
            <time dateTime={trophy.dateTime}>{trophy.date}</time>
          </a>
        </li>
      ))}
    </ul>
  );
}
