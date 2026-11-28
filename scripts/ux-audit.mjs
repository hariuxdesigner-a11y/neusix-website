// UX audit: console errors, small tap targets (mobile), unlabeled form fields, missing focus styles, images without dimensions.
import { chromium } from "playwright";
const base = process.argv[2]; const paths = process.argv.slice(3);
const b = await chromium.launch({ channel: "chrome" });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
const summary = {};
for (const path of paths) {
  const p = await ctx.newPage(); const errs = [];
  p.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 120)));
  p.on("pageerror", (e) => errs.push("pageerror " + e.message.slice(0, 120)));
  await p.goto(base + path, { waitUntil: "networkidle" });
  const r = await p.evaluate(() => {
    const vis = (e) => { const s = getComputedStyle(e), r = e.getBoundingClientRect(); return s.display !== "none" && s.visibility !== "hidden" && r.width > 0 && r.height > 0 && !e.closest("[aria-hidden=true],[inert]"); };
    const small = [...document.querySelectorAll("a[href], button, input, select, textarea, [role=tab], [role=button]")].filter(vis).filter((e) => {
      const r = e.getBoundingClientRect(); if (r.width >= 44 && r.height >= 44) return false;
      // inline text links inside paragraphs are fine
      if (e.tagName === "A" && e.closest("p, li") && getComputedStyle(e).display === "inline") return false;
      return r.height < 24 || r.width < 24;
    }).map((e) => `${e.tagName.toLowerCase()}:${(e.getAttribute("aria-label") || e.textContent || e.getAttribute("name") || "").trim().slice(0, 30)} ${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`);
    const unlabeled = [...document.querySelectorAll("input:not([type=hidden]), select, textarea")].filter((e) => !(e.labels?.length || e.getAttribute("aria-label") || e.getAttribute("aria-labelledby"))).map((e) => e.name || e.id);
    const imgs = [...document.querySelectorAll("img")].filter((i) => !(i.getAttribute("width") && i.getAttribute("height")) && !i.closest("[data-nimg=fill]") && getComputedStyle(i).position !== "absolute").map((i) => i.src.split("/").pop().slice(0, 40));
    return { small: [...new Set(small)].slice(0, 8), unlabeled, imgs: imgs.slice(0, 5), viewport: document.querySelector('meta[name=viewport]')?.content, lang: document.documentElement.lang };
  });
  // keyboard focus: tab through first 15 stops and check a visible outline/ring
  const nofocus = [];
  await p.keyboard.press("Tab");
  for (let k = 0; k < 15; k++) {
    const f = await p.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; const s = getComputedStyle(e); const ring = s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0 || s.boxShadow !== "none"; return ring ? null : (e.tagName + ":" + (e.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 25)); });
    if (f) nofocus.push(f);
    await p.keyboard.press("Tab");
  }
  summary[path] = { errs: errs.slice(0, 3), ...r, nofocus: [...new Set(nofocus)].slice(0, 5) };
  await p.close();
}
for (const [k, v] of Object.entries(summary)) {
  const bad = v.errs.length || v.small.length || v.unlabeled.length || v.imgs.length || v.nofocus.length || !v.lang;
  console.log(bad ? "!!" : "ok", k, bad ? JSON.stringify({ errs: v.errs, small: v.small, unlabeled: v.unlabeled, imgs: v.imgs, nofocus: v.nofocus, lang: v.lang }) : "");
}
await b.close();
