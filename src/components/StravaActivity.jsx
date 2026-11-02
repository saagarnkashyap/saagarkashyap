import { useEffect, useId, useRef, useState } from "react";

const embedOrigin = "https://strava-embeds.com";

export default function StravaActivity({ activity, index }) {
  const frame = useRef(null);
  const id = useId();
  const namespace = `strava-${activity.id}-${id.replace(/[^a-zA-Z0-9]/g, "")}`;
  const [height, setHeight] = useState(650);
  const query = new URLSearchParams({
    style: "standard",
    fromEmbed: "false",
    token: activity.token,
  });

  useEffect(() => {
    // Match the official embed's resize protocol, scoped to this iframe.
    const onMessage = (event) => {
      if (
        event.origin !== embedOrigin ||
        event.source !== frame.current?.contentWindow ||
        !Array.isArray(event.data) ||
        event.data[0] !== namespace ||
        event.data[1] !== "BROADCAST_IFRAME_HEIGHT"
      )
        return;
      const nextHeight = Number(event.data[2]);
      if (Number.isFinite(nextHeight)) {
        setHeight(Math.max(240, Math.min(nextHeight, 1600)));
      }
    };
    const onFocus = () =>
      frame.current?.contentWindow?.postMessage(
        [namespace, "BROADCAST_HOST_FOCUS", {}],
        embedOrigin,
      );
    window.addEventListener("message", onMessage);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("focus", onFocus);
    };
  }, [namespace]);

  return (
    <article className="strava-activity">
      <iframe
        ref={frame}
        title={`Strava selected activity ${index + 1}`}
        src={`${embedOrigin}/activity/${activity.id}?${query}#ns=${namespace}`}
        width="554"
        height={height}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <a
        href={`https://www.strava.com/activities/${activity.id}`}
        target="_blank"
        rel="noreferrer"
        className="strava-activity-link mono"
      >
        <span>{String(index + 1).padStart(2, "0")} / OPEN ACTIVITY ON STRAVA</span>
        <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}
