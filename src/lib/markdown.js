import MarkdownIt from "markdown-it";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import sql from "highlight.js/lib/languages/sql";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";

Object.entries({ javascript, typescript, python, sql, json, bash }).forEach(
  ([name, language]) => hljs.registerLanguage(name, language),
);
hljs.registerAliases(["js"], { languageName: "javascript" });
hljs.registerAliases(["ts"], { languageName: "typescript" });
hljs.registerAliases(["sh"], { languageName: "bash" });

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight(code, language) {
    return language && hljs.getLanguage(language)
      ? hljs.highlight(code, { language }).value
      : "";
  },
});
const defaultImage = md.renderer.rules.image;
md.renderer.rules.image = (tokens, index, options, env, self) => {
  tokens[index].attrSet("loading", "lazy");
  tokens[index].attrSet("decoding", "async");
  return defaultImage(tokens, index, options, env, self);
};

export function renderMarkdown(source) {
  const tokens = md.parse(source, {});
  const headings = [];
  const seen = new Map();
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === "heading_open") {
      const text = tokens[i + 1].content;
      const base =
        text
          .toLowerCase()
          .replace(/[^\p{L}\p{N}]+/gu, "-")
          .replace(/^-|-$/g, "") || "section";
      const count = seen.get(base) || 0;
      const id = count ? `${base}-${count + 1}` : base;
      seen.set(base, count + 1);
      tokens[i].attrSet("id", id);
      if (tokens[i].tag === "h2") headings.push({ id, text });
    }
  }
  return { html: md.renderer.render(tokens, md.options, {}), headings };
}

export function readingTime(source) {
  return Math.max(
    1,
    Math.ceil(
      source
        .replace(/```[\s\S]*?```/g, "")
        .split(/\s+/)
        .filter(Boolean).length / 220,
    ),
  );
}
