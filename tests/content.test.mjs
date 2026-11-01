import { test } from "node:test";
import assert from "node:assert/strict";
import { renderMarkdown } from "../src/lib/markdown.js";

test("Markdown preserves readable code and rejects executable HTML and links", () => {
  const { html } = renderMarkdown(
    '## A note\n\n<script>alert(1)</script>\n\n[unsafe](javascript:alert(1))\n\n```python\nprint("hello")\n```',
  );
  assert.ok(!html.includes("<script>"));
  assert.ok(!html.includes('href="javascript:'));
  assert.ok(html.includes("hljs-string"));
  assert.ok(html.includes("language-python"));
});

test("Article headings have unique anchors and Markdown images load lazily", () => {
  const { html, headings } = renderMarkdown(
    "## Repeated heading\n\nText.\n\n## Repeated heading\n\n![Original image](/photos/a.webp)",
  );
  assert.deepEqual(
    headings.map((h) => h.id),
    ["repeated-heading", "repeated-heading-2"],
  );
  assert.ok(html.includes('loading="lazy"'));
  assert.ok(html.includes('alt="Original image"'));
});
