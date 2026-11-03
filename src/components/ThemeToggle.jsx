import { useEffect, useRef, useState } from "react";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "light" ? "#ffffff" : "#101113");
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  const manuallySelected = useRef(false);
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "light");
    if (!window.matchMedia) return;
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const followDevice = (event) => {
      if (manuallySelected.current) return;
      try {
        const saved = localStorage.getItem("portfolio-theme");
        if (saved === "light" || saved === "dark") return;
      } catch {
        /* A manual choice still wins for this visit without storage. */
      }
      const next = event.matches ? "dark" : "light";
      applyTheme(next);
      setTheme(next);
    };
    preference.addEventListener("change", followDevice);
    return () => preference.removeEventListener("change", followDevice);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    manuallySelected.current = true;
    applyTheme(next);
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      /* The theme still works when storage is unavailable. */
    }
    setTheme(next);
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <svg
        className="theme-sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </svg>
      <svg
        className="theme-moon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M20.5 14A8.7 8.7 0 0 1 10 3.5 8.8 8.8 0 1 0 20.5 14Z" />
      </svg>
    </button>
  );
}
