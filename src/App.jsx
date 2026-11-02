import { Component } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import Home from "./views/Home";
import { Work, CaseStudy } from "./views/Work";
import { Writing, Article } from "./views/Writing";
import Photos from "./views/Photos";
import { About, Now } from "./views/Personal";
import Strava from "./views/Strava";
import StravaTrophies from "./views/StravaTrophies";
import NotFound from "./views/NotFound";
import { getMetadata } from "./lib/metadata";

class PageErrorBoundary extends Component {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    if (this.state.error)
      return (
        <div className="error-page wrap">
          <p className="eyebrow gold">A SMALL INTERRUPTION</p>
          <h1>Something didn’t load.</h1>
          <p>Please try the page again.</p>
          <a className="text-link" href={this.props.path}>
            Reload this page ↗
          </a>
        </div>
      );
    return this.props.children;
  }
}

export default function App() {
  const { pathname } = useLocation();
  const metadata = getMetadata(pathname);
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:url" content={metadata.url} />
      <meta
        property="og:type"
        content={metadata.article ? "article" : "website"}
      />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta
        name="robots"
        content={metadata.notFound ? "noindex, follow" : "index, follow"}
      />
      <link rel="canonical" href={metadata.url} />
      <SiteLayout>
        <PageErrorBoundary key={pathname} path={pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/writing/:slug" element={<Article />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/strava" element={<Strava />} />
            <Route path="/strava/trophies" element={<StravaTrophies />} />
            <Route
              path="/cycling"
              element={<Navigate to="/strava" replace />}
            />
            <Route
              path="/running"
              element={<Navigate to="/strava" replace />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/now" element={<Now />} />
            <Route path="/projects" element={<Navigate to="/work" replace />} />
            <Route path="/blog" element={<Navigate to="/writing" replace />} />
            <Route
              path="/blog/myblogs"
              element={<Navigate to="/writing" replace />}
            />
            <Route
              path="/blog/photography"
              element={<Navigate to="/photos" replace />}
            />
            <Route path="/skills" element={<Navigate to="/about" replace />} />
            <Route
              path="/certifications"
              element={<Navigate to="/about" replace />}
            />
            <Route
              path="/experience"
              element={<Navigate to="/about" replace />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageErrorBoundary>
      </SiteLayout>
    </>
  );
}
