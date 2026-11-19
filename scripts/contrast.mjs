// Contrast audit: axe color-contrast on every page (motion reduced so everything is in its final state).
// node scripts/contrast.mjs <base> <widths> <path...>
import { chromium } from "@playwright/test";
import fs from "node:fs";
const axe = fs.readFileSync(new URL("../node_modules/axe-core/axe.min.js", import.meta.url), "utf8");
const [base, widths, ...paths] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const agg = new Map();
for (const w of widths.split(",").map(Number)) for (const p of paths) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: "reduce" });
  const pg = await ctx.newPage();
  await pg.goto(base + p, { waitUntil: "networkidle" });
  await pg.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, 0); document.querySelectorAll(".reveal,.stagger,.draw-icon").forEach((e) => e.classList.add("is-in")); });
  await pg.waitForTimeout(800);
  await pg.addScriptTag({ content: axe });
  const res = await pg.evaluate(async () => (await window.axe.run(document, { runOnly: ["color-contrast"], resultTypes: ["violations"] })).violations);
  for (const v of res) for (const n of v.nodes) {
    const d = n.any[0]?.data || {};
    const key = `${n.target.join(" ").slice(-90)} | fg ${d.fgColor} bg ${d.bgColor} ratio ${d.contrastRatio} need ${d.expectedContrastRatio}`;
    const e = agg.get(key) || { n: 0, pages: new Set(), html: n.html.slice(0, 110) };
    e.n++; e.pages.add(`${p}@${w}`); agg.set(key, e);
  }
  await ctx.close();
}
await b.close();
const rows = [...agg.entries()].sort((a, b) => b[1].n - a[1].n);
console.log("distinct issues:", rows.length);
for (const [k, e] of rows) console.log(`${e.n}x ${k}\n    ${e.html}\n    ${[...e.pages].slice(0, 4).join(", ")}`);
