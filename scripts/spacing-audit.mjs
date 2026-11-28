// Measures the visible gap between consecutive page sections (content edge to content edge).
import { chromium } from "playwright";
const base = process.argv[2] || "http://localhost:3000";
const widths = (process.argv[3] || "1440,390").split(",").map(Number);
const paths = process.argv.slice(4);
const b = await chromium.launch({ channel: "chrome" });
for (const w of widths) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: "reduce" });
  for (const path of paths) {
    const p = await ctx.newPage();
    await p.goto(base + path, { waitUntil: "networkidle" });
    // reveal everything
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } scrollTo(0, 0); });
    await p.waitForTimeout(800);
    const rows = await p.evaluate(() => {
      const main = document.querySelector("main") || document.body;
      const secs = [...main.children].flatMap(c => c.tagName === "SECTION" || c.tagName === "DIV" && c.querySelector(":scope > section") === null ? [c] : [...c.children]).filter(s => s.getBoundingClientRect().height > 40);
      const ext = (s) => {
        const sr = s.getBoundingClientRect();
        const cs = getComputedStyle(s);
        if ((cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent") || cs.backgroundImage !== "none") return [sr.top, sr.bottom];
        let top = Infinity, bot = -Infinity;
        for (const e of s.querySelectorAll("*")) {
          const st = getComputedStyle(e);
          if (st.display === "none" || st.visibility === "hidden") continue;
          const r = e.getBoundingClientRect();
          if (r.width < 2 || r.height < 2) continue;
          const own = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
          const media = /^(IMG|VIDEO|CANVAS|svg|BUTTON|INPUT|TEXTAREA|SELECT)$/.test(e.tagName);
          const box = (st.backgroundColor !== "rgba(0, 0, 0, 0)" && st.backgroundColor !== "transparent") || st.backgroundImage !== "none" || parseFloat(st.borderTopWidth) > 0;
          if (!(own || media || box)) continue;
          if (e.closest("[aria-hidden=true]") && !media) continue;
          top = Math.min(top, r.top); bot = Math.max(bot, r.bottom);
        }
        return [Math.max(top, sr.top), Math.min(bot, sr.bottom)];
      };
      const out = [];
      for (let k = 0; k < secs.length - 1; k++) {
        const a = ext(secs[k]), c = ext(secs[k + 1]);
        const name = (s) => (s.getAttribute("aria-labelledby") || s.getAttribute("aria-label") || (typeof s.className === "string" ? s.className.slice(0, 40) : "") || s.tagName);
        out.push([Math.round(c[0] - a[1]), name(secs[k]), name(secs[k + 1])]);
      }
      return out;
    });
    console.log(`\n${w} ${path}`);
    for (const [g, a, c] of rows) console.log(String(g).padStart(5), " ", a, "→", c);
    await p.close();
  }
  await ctx.close();
}
await b.close();
