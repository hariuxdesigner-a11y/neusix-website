import fs from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

/** Reads src/content/blog/<slug>.md and returns HTML. Content is first-party (in the repo). */
export async function readPostHtml(slug: string): Promise<string | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    const md = await fs.readFile(path.join(process.cwd(), "src/content/blog", `${slug}.md`), "utf8");
    return await marked.parse(md.replace(/^---[\s\S]*?---\s*/, ""));
  } catch {
    return null;
  }
}
