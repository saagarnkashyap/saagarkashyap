import manifest from "../content/writing/index.json";
import { readingTime, renderMarkdown } from "./markdown";

const files = import.meta.glob("../content/articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});
const articleDates = new Intl.DateTimeFormat("en", {
  dateStyle: "long",
  timeZone: "UTC",
});
export function formatDate(date) {
  return articleDates.format(new Date(`${date}T00:00:00Z`));
}

export const articles = manifest
  .filter((item) => !item.draft)
  .map((item) => {
    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug) ||
      !item.title ||
      !item.description ||
      !Array.isArray(item.tags) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(item.date) ||
      Number.isNaN(Date.parse(item.date))
    ) {
      throw new Error(`Invalid article metadata: ${item.slug}`);
    }
    const body = files[`../content/articles/${item.slug}.md`];
    if (!body?.trim()) throw new Error(`Missing article body: ${item.slug}.md`);
    return {
      ...item,
      body,
      readingTime: readingTime(body),
      ...renderMarkdown(body),
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));
if (new Set(articles.map((a) => a.slug)).size !== articles.length)
  throw new Error("Article slugs must be unique.");
