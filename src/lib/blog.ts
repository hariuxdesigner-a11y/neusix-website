import fs from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import { getPostMeta, type BlogPost } from "@/content/resources";
import { SITE_URL } from "@/content/site";

/**
 * Blog articles live in src/content/blog/<slug>.md (first-party Markdown in the repo).
 * Frontmatter: description, keywords, takeaways (list). Listing fields (title, tag, image,
 * date, excerpt) live in BLOG_POSTS (src/content/resources.ts) so menus and cards can use them.
 * A "## Frequently asked questions" section with "### question" entries becomes the FAQ block
 * (and FAQPage structured data).
 */

export type TocItem = { id: string; text: string };
export type FaqItem = { q: string; a: string; aHtml: string };
export type Post = BlogPost & {
  description: string;
  seoTitle?: string;
  keywords: string[];
  takeaways: string[];
  bodyHtml: string; // everything before the FAQ
  outroHtml: string; // sections after the FAQ (closing call to action)
  faq: FaqItem[];
  toc: TocItem[];
  words: number;
  minutes: number;
};

const FAQ_HEADING = /^##\s+Frequently asked questions\s*$/im;

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&amp;|&/g, " and ")
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const stripMd = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_`]/g, "");

function parseFrontmatter(src: string): { data: Record<string, string | string[]>; body: string } {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: src };
  const data: Record<string, string | string[]> = {};
  let listKey: string | null = null;
  for (const line of m[1].split(/\r?\n/)) {
    const item = line.match(/^\s*-\s+(.*)$/);
    if (item && listKey) {
      (data[listKey] as string[]).push(item[1].trim());
      continue;
    }
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const [, k, v] = kv;
    if (v === "") {
      data[k] = [];
      listKey = k;
    } else {
      data[k] = v.trim().replace(/^"(.*)"$/, "$1");
      listKey = null;
    }
  }
  return { data, body: src.slice(m[0].length) };
}

/** Markdown → HTML with heading ids, external links in a new tab and scrollable tables. */
function render(md: string): string {
  const html = marked.parse(md, { async: false, gfm: true }) as string;
  return html
    .replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, n, inner) => `<h${n} id="${slugify(inner)}">${inner}</h${n}>`)
    .replace(/<a href="(https?:\/\/[^"]+)">/g, '<a href="$1" target="_blank" rel="noopener noreferrer">')
    .replace(/<table>/g, '<div class="table-wrap" role="region" aria-label="Comparison table" tabindex="0"><table>')
    .replace(/<\/table>/g, "</table></div>");
}

function splitFaq(body: string): { before: string; faqMd: string; after: string } {
  const m = body.match(FAQ_HEADING);
  if (!m || m.index === undefined) return { before: body, faqMd: "", after: "" };
  const before = body.slice(0, m.index);
  const rest = body.slice(m.index + m[0].length);
  const next = rest.search(/^##\s+/m);
  return next === -1 ? { before, faqMd: rest, after: "" } : { before, faqMd: rest.slice(0, next), after: rest.slice(next) };
}

function parseFaq(md: string): FaqItem[] {
  return md
    .split(/^###\s+/m)
    .slice(1)
    .map((chunk) => {
      const [q, ...rest] = chunk.split(/\r?\n/);
      const a = rest.join("\n").trim();
      return { q: q.trim(), a: stripMd(a).replace(/\s+/g, " "), aHtml: render(a) };
    })
    .filter((f) => f.q && f.a);
}

export async function getPost(slug: string): Promise<Post | null> {
  "use cache"; // file read at build time; the page is fully static
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const meta = getPostMeta(slug);
  if (!meta) return null;
  let src: string;
  try {
    src = await fs.readFile(path.join(process.cwd(), "src/content/blog", `${slug}.md`), "utf8");
  } catch {
    return null;
  }
  const { data, body } = parseFrontmatter(src);
  const { before, faqMd, after } = splitFaq(body);
  const faq = parseFaq(faqMd);

  const toc: TocItem[] = [];
  for (const m of body.matchAll(/^##\s+(.+)$/gm)) {
    const text = stripMd(m[1].trim());
    toc.push({ id: FAQ_HEADING.test(m[0]) ? "faq" : slugify(text), text });
  }

  const words = stripMd(body).replace(/[#|>-]/g, " ").split(/\s+/).filter(Boolean).length;
  const list = (v: string | string[] | undefined) => (Array.isArray(v) ? v : typeof v === "string" ? v.split(",").map((s) => s.trim()).filter(Boolean) : []);

  return {
    ...meta,
    description: (data.description as string) ?? meta.excerpt,
    seoTitle: (data.seoTitle as string) || undefined,
    keywords: list(data.keywords),
    takeaways: list(data.takeaways),
    bodyHtml: render(before),
    outroHtml: after ? render(after) : "",
    faq,
    toc,
    words,
    minutes: Math.max(1, Math.round(words / 220)),
  };
}

export const postUrl = (slug: string) => `${SITE_URL}/blog/${slug}`;
