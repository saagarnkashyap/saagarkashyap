import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { profile } from "../content/profile";
import { articles } from "../lib/articles";
import { Arrow } from "./Editorial";
import ThemeToggle from "./ThemeToggle";

const links = [
  ["Home", "/"],
  ["Work", "/work"],
  ...(articles.length > 0 ? [["Writing", "/writing"]] : []),
  ["Photos", "/photos"],
  ["Strava", "/strava"],
  ["Trophies", "/strava/trophies"],
  ["About", "/about"],
];

export default function SiteLayout({ children }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const main = useRef(null);
  const firstRender = useRef(true);
  const menuButton = useRef(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    main.current?.focus({ preventScroll: true });
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header wrap">
        <Link
          to="/"
          className="wordmark"
          aria-label="Saagar Kashyap home"
          onClick={() => setOpen(false)}
        >
          <span className="wordmark-first-name">Saagar</span>{" "}
          <span className="wordmark-last-name">Kashyap</span>
        </Link>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <path d="m6 6 12 12M6 18 18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <nav
          id="site-nav"
          className={`site-nav ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map(([name, url]) => (
            <NavLink
              key={url}
              to={url}
              end={url === "/" || url === "/strava"}
              onClick={() => setOpen(false)}
            >
              {name}
              <span className="nav-dot" />
            </NavLink>
          ))}
        </nav>
        <NavLink
          className="now-link"
          to="/now"
          title="Updates on work, projects, and life"
        >
          Updates
          <Arrow diagonal />
        </NavLink>
        <ThemeToggle />
      </header>
      <main id="main" ref={main} tabIndex="-1" key={pathname}>
        {children}
      </main>
      <footer className="site-footer wrap">
        <div className="footer-main">
          <div>
            <p className="eyebrow">ALWAYS OPEN TO A GOOD CONVERSATION</p>
            <a className="footer-invitation" href={`mailto:${profile.email}`}>
              Have something
              <br />
              in <em>mind?</em>
              <Arrow diagonal />
            </a>
          </div>
          <div className="footer-links">
            <a href={`mailto:${profile.email}`}>
              Email
              <Arrow diagonal />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
              <Arrow diagonal />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
              <Arrow diagonal />
            </a>
            <a
              href="/Saagar-Kashyap-Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Résumé
              <Arrow diagonal />
            </a>
          </div>
        </div>
        <div className="footer-bottom mono">
          <span>© {new Date().getUTCFullYear()} SAAGAR KASHYAP</span>
          <span>A PERSONAL CORNER OF THE INTERNET.</span>
          <Link to="/now">
            WORK & LIFE UPDATES <Arrow diagonal />
          </Link>
        </div>
      </footer>
    </>
  );
}
