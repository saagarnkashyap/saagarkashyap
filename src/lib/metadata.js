import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { articles } from "./articles";

const pages = {
  "/": [
    "Saagar Kashyap — About me & experience",
    "Meet Saagar Kashyap: data and planning systems, work experience at GlobalFoundries and Tiger Analytics, and a glimpse of his projects.",
  ],
  "/work": [
    "Selected work",
    "Projects in software, semiconductor systems, computer vision, and data by Saagar Kashyap.",
  ],
  "/writing": [
    "Writing & thinking",
    "Writing and project notes by Saagar Kashyap, including a LinkedIn note on traffic object detection with YOLOv11.",
  ],
  "/photos": [
    "The art of paying attention",
    "Original street, night, and everyday photographs by Saagar Kashyap.",
  ],
  "/strava": [
    "Strava",
    "Saagar Kashyap’s all-time cycling stats, best efforts, bikes, trophy case, and selected activities on Strava.",
  ],
  "/strava/trophies": [
    "Trophy case",
    "Saagar Kashyap’s finisher medal photos and complete collection of Strava challenge badges.",
  ],
  "/about": [
    "A little about Saagar",
    "Saagar Kashyap’s path into data and software, tools in practice, recommendations from teachers and mentors, and opportunities to build useful things.",
  ],
  "/now": [
    "Updates",
    "What is occupying Saagar Kashyap: work, projects, and interests beyond the screen.",
  ],
};
export function getMetadata(pathname) {
  const path = pathname.replace(/\/$/, "") || "/";
  const project = projects.find((p) => path === `/work/${p.slug}`);
  const article = articles.find((a) => path === `/writing/${a.slug}`);
  const page = pages[path];
  const title =
    project?.name || article?.title || page?.[0] || "Page not found";
  return {
    title: path === "/" ? title : `${title} — Saagar Kashyap`,
    description:
      project?.description ||
      article?.description ||
      page?.[1] ||
      "This page could not be found. Return to Saagar Kashyap’s portfolio.",
    url: `${profile.site}${path === "/" ? "/" : path}`,
    notFound: !page && !project && !article,
    article: !!article,
  };
}
export const allPaths = [
  ...Object.keys(pages),
  ...projects.map((p) => `/work/${p.slug}`),
  ...articles.map((a) => `/writing/${a.slug}`),
];
