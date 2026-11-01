import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Arrow, PageIntro, Photo } from "../components/Editorial";
import { photos, photoSource } from "../content/photos";

export default function Photos() {
  const [collection, setCollection] = useState("All photographs");
  const [params, setParams] = useSearchParams();
  const id = params.get("photo");
  const selected = photos.find((p) => p.id === id);
  const filtered =
    collection === "All photographs"
      ? photos
      : photos.filter((p) => p.collection === collection);
  const dialog = useRef(null);
  const returnFocus = useRef(null);
  const collections = [
    "All photographs",
    ...new Set(photos.map((p) => p.collection)),
  ];
  const openPhoto = (photo, event) => {
    returnFocus.current = event.currentTarget;
    setParams({ photo: photo.id }, { replace: true });
  };
  const closePhoto = () => {
    setParams({}, { replace: true });
  };

  useEffect(() => {
    const modal = dialog.current;
    if (selected) {
      if (!modal.open) modal.showModal();
      document.body.style.overflow = "hidden";
    } else {
      modal?.close();
      document.body.style.overflow = "";
      returnFocus.current?.focus({ preventScroll: true });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  function move(step) {
    const group = filtered.some((p) => p.id === id) ? filtered : photos;
    const i = group.findIndex((p) => p.id === id);
    setParams(
      { photo: group[(i + step + group.length) % group.length].id },
      { replace: true },
    );
  }

  function handleViewerKeyDown(event) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    }
    if (event.key === "Tab") {
      const controls = [...dialog.current.querySelectorAll("button")];
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  return (
    <>
      <PageIntro
        number="03"
        label="A photographic archive"
        pageTitle="Photography"
        layout="gallery"
        description="Light through a window. A street after dark. Something ordinary that asked for another look. All photographs are my own."
      />
      <section className="photos-archive wrap">
        <div className="filter-bar" aria-label="Filter photographs">
          {collections.map((c) => (
            <button
              key={c}
              aria-pressed={c === collection}
              className={c === collection ? "active" : ""}
              onClick={() => setCollection(c)}
            >
              {c}
            </button>
          ))}
          <span className="mono filter-count" aria-live="polite">
            {String(filtered.length).padStart(2, "0")} PHOTOGRAPHS
          </span>
        </div>
        <div className="photo-gallery">
          {filtered.map((photo, index) => (
            <figure key={photo.id}>
              <button
                className="gallery-image"
                onClick={(event) => openPhoto(photo, event)}
                aria-label={`View photograph: ${photo.alt}`}
              >
                <Photo
                  id={photo.id}
                  sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw"
                />
                <span className="photo-expand">
                  <Arrow diagonal />
                </span>
              </button>
              <figcaption className="mono">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{photo.collection}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <dialog
        className="photo-dialog"
        ref={dialog}
        aria-label="Photograph viewer"
        aria-describedby={selected ? "lightbox-caption" : undefined}
        onCancel={closePhoto}
        onClick={(event) => {
          if (event.target === event.currentTarget) closePhoto();
        }}
        onKeyDown={handleViewerKeyDown}
      >
        {selected && (
          <div className="lightbox-inner">
            <div className="lightbox-top mono">
              <span>
                {String(photos.indexOf(selected) + 1).padStart(2, "0")} /{" "}
                {photos.length} — {selected.collection}
              </span>
              <button onClick={closePhoto} aria-label="Close photograph viewer">
                CLOSE <span aria-hidden="true">×</span>
              </button>
            </div>
            <img
              src={photoSource(selected, 1600)}
              alt={selected.alt}
              width={selected.width}
              height={selected.height}
            />
            <div className="lightbox-bottom">
              <p
                id="lightbox-caption"
                className={selected.caption ? "" : "caption-pending"}
              >
                {selected.caption || "Caption to come."}
              </p>
              <div className="lightbox-controls">
                <button
                  onClick={() => move(-1)}
                  aria-label="Previous photograph"
                >
                  ←
                </button>
                <button onClick={() => move(1)} aria-label="Next photograph">
                  →
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
