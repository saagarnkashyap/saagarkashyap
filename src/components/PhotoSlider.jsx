import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Arrow, Chapter, Photo } from "./Editorial";
import { featuredPhotos } from "../content/photos";

export default function PhotoSlider() {
  const [current, setCurrent] = useState(0);
  const startX = useRef(null);
  const photo = featuredPhotos[current];
  function move(step) {
    setCurrent(
      (index) => (index + step + featuredPhotos.length) % featuredPhotos.length,
    );
  }

  return (
    <section
      className="section wrap home-photography"
      aria-label="Selected photography"
    >
      <Chapter number="03" heading>
        Through my lens
      </Chapter>
      <div className="photography-heading">
        <h2>
          A few moments,
          <br />
          worth another look.
        </h2>
        <Link className="photography-explore" to="/photos">
          Explore my photography
          <Arrow diagonal />
        </Link>
      </div>
      <div
        className="photo-slider"
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected photographs"
        tabIndex="0"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <div
          className="photo-slide-frame"
          onTouchStart={(event) => {
            startX.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (startX.current !== null) {
              const distance = event.changedTouches[0].clientX - startX.current;
              if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
              startX.current = null;
            }
          }}
        >
          <Photo id={photo.id} sizes="(max-width: 1400px) 100vw, 1280px" />
        </div>
        <div className="photo-slider-controls">
          <p className="mono" aria-live="polite" aria-atomic="true">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(featuredPhotos.length).padStart(2, "0")}
            <span className="slider-collection">{photo.collection}</span>
          </p>
          <div className="photo-slider-dots" aria-label="Choose a photograph">
            {featuredPhotos.map((item, index) => (
              <button
                key={item.id}
                className={index === current ? "active" : ""}
                aria-label={`Show photograph ${index + 1}`}
                aria-pressed={index === current}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
          <div className="photo-slider-arrows">
            <button
              onClick={() => move(-1)}
              aria-label="Previous selected photograph"
            >
              ←
            </button>
            <button
              onClick={() => move(1)}
              aria-label="Next selected photograph"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
