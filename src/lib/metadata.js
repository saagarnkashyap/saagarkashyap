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
    "Technical notes, project reflections, and a personal journal by Saagar Kashyap.",
  ],
  "/photos": [
    "The art of paying attention",
    "Original street, night, and everyday photographs by Saagar Kashyap.",
  ],
  "/cycling": [
    "Cycling Journal",
    "A personal logbook for rides, routes, and time outside. Activity records have not been connected yet.",
  ],
  "/about": [
    "A little about Saagar",
    "Data, planning systems, photography, poetry, and the person behind the projects.",
  ],
  "/now": [
    "A little about right now",
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
