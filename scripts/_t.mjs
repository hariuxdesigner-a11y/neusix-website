import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome" });
const checks = { "/": [["NeuSix at a glance","purpose-title"],["purpose-title","library-title"],["faq-title","cta-title"],["clients-title","NeuSix at a glance"],["industries-title","approach-title"],["approach-title","outcomes-title"]], "/about": [["Vision and mission","join"],["join","awards"]], "/services/modernization": [["stage-title","intro-title"],["intro-title","wwd-title"],["wwd-title","outcomes-title"],["wyg-title","models-title"],["svc-faq-title","cta-title"]], "/our-work/industries": [["Industries we serve","problems-title"]], "/case-studies/legal": [["exec","oh"],["changed","measured"],["gov","More case studies"]] };
for (const w of [1440, 390]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 }, reducedMotion: "reduce" });
  for (const [path, pairs] of Object.entries(checks)) {
    await p.goto("http://localhost:3000" + path, { waitUntil: "networkidle" });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } });
    await p.waitForTimeout(500);
    const out = await p.evaluate((pairs) => {
      const sel = (n) => document.querySelector(`section[aria-labelledby="${n}"], section[aria-label="${n}"]`);
      const vis = (s) => { const sr = s.getBoundingClientRect(); let t = Infinity, bt = -Infinity;
        for (const e of s.querySelectorAll("*")) { const st = getComputedStyle(e); if (st.display === "none" || st.visibility === "hidden" || +st.opacity === 0) continue; if (e.closest("[aria-hidden=true]")) continue;
          const r = e.getBoundingClientRect(); if (r.height < 2 || r.width < 2) continue;
          const txt = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
          const card = (st.backgroundColor !== "rgba(0, 0, 0, 0)" && st.position !== "absolute" && st.position !== "fixed") || parseFloat(st.borderTopWidth) > 0 && st.position !== "absolute";
          if (!(txt || /^(IMG|VIDEO|CANVAS|BUTTON)$/.test(e.tagName) || card)) continue;
          t = Math.min(t, r.top); bt = Math.max(bt, r.bottom); }
        const cs = getComputedStyle(s); if (cs.backgroundColor !== "rgba(0, 0, 0, 0)") { t = sr.top; bt = sr.bottom; }
        return [Math.max(t, sr.top), Math.min(bt, sr.bottom)]; };
      return pairs.map(([a, c]) => { const A = sel(a), C = sel(c); if (!A || !C) return [a, c, "missing"]; return [a, c, Math.round(vis(C)[0] - vis(A)[1])]; });
    }, pairs);
    for (const r of out) console.log(w, path, r.join(" | "));
  }
  await p.close();
}
await b.close();
