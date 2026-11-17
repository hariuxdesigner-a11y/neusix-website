// QA helper: full-page screenshots + horizontal-overflow / console-error checks.
// Usage: node scripts/qa.mjs <baseUrl> <outDir> <widths comma> <path> [path...]
// e.g.   node scripts/qa.mjs http://localhost:3000 qa-shots 375,1440 / /about
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const [base, outDir, widthsArg, ...paths] = process.argv.slice(2);
const widths = (widthsArg || "375,768,1440").split(",").map(Number);
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ["--no-sandbox"],
});
const report = [];
for (const p of paths.length ? paths : ["/"]) {
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1, reducedMotion: process.env.REDUCED ? "reduce" : "no-preference" });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("requestfailed", (r) => errors.push("FAILED " + r.url()));
    page.on("response", (r) => r.status() >= 400 && errors.push(r.status() + " " + r.url()));
    const res = await page.goto(base + p, { waitUntil: "networkidle" });
    // scroll through to trigger reveals / lazy content
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
      document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-in'));
    });
    await page.evaluate(async () => {
      document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager"));
      await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 4000); }))));
    });
    await page.waitForTimeout(1200);
    const overflow = await page.evaluate(() => {
      const W = document.documentElement.clientWidth;
      const offenders = [...document.querySelectorAll("body *")]
        .filter((e) => {
          const r = e.getBoundingClientRect();
          const s = getComputedStyle(e);
          return r.width > 0 && r.right > W + 1 && s.position !== "fixed" && !e.closest("[aria-hidden=true]") && !e.closest(".-z-10");
        })
        .slice(0, 5)
        .map((e) => `${e.tagName.toLowerCase()}.${String(e.className).slice(0, 60)} R${Math.round(e.getBoundingClientRect().right)}`);
      return { scrollW: document.documentElement.scrollWidth, W, offenders };
    });
    const file = path.join(outDir, `${(p.replace(/\//g, "_") || "_home").replace(/^_$/, "_home")}-${w}.png`);
    if (!process.env.NOSHOT) await page.screenshot({ path: file, fullPage: true });
    report.push({ path: p, width: w, status: res?.status(), hOverflow: overflow.scrollW > overflow.W, ...overflow, errors });
    await ctx.close();
  }
}
await browser.close();
for (const r of report) {
  console.log(
    `${r.status} ${r.path} @${r.width}: ${r.hOverflow ? "OVERFLOW " + r.scrollW : "ok"}${r.offenders.length ? " offenders=" + r.offenders.join(" | ") : ""}${r.errors.length ? " ERRORS=" + r.errors.slice(0, 4).join(" || ") : ""}`,
  );
}
