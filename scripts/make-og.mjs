// Renders the 1200×630 social share images in public/og/ (run with the site on localhost:3000).
// node scripts/make-og.mjs [baseUrl]
import { chromium } from "@playwright/test";
import fs from "node:fs";
const base = process.argv[2] || "http://localhost:3000";
const seo = fs.readFileSync(new URL("../src/content/seo.ts", import.meta.url), "utf8");
const titleOf = (path) => {
  const m = seo.match(new RegExp(`"${path.replace(/[/-]/g, (c) => "\\" + c)}": \\{\\s*title: "([^"]+)"`));
  return m ? m[1].replace(/\s*\|\s*NeuSix$/, "").replace(/^NeuSix \| /, "").split(" | ")[0] : "";
};
const cards = [
  { key: "default", media: "home-hero", eyebrow: "NeuSix", title: "Transforming enterprises with deep tech AI solutions and intelligent automation." },
  { key: "home", media: "home-hero", eyebrow: "Shipping Impact", title: "Harnessing AI to create relevance, not just competence" },
  { key: "services", media: "services-hero", eyebrow: "Services", title: "Services designed to ship measurable outcomes" },
  ...["ai-transformation-page", "modernization", "digital-transformation", "software-engineering-services", "ai-center-of-excellence", "offshore-development-center"].map((s) => ({
    key: `svc-${s}`, media: `svc-${s}`, eyebrow: "Services", title: titleOf(`/services/${s}`),
  })),
  { key: "industries", media: "industries-hero", eyebrow: "Industries", title: "AI transformation across industries built to survive the real world." },
  { key: "case-studies", media: "cases-hero", eyebrow: "Case Studies", title: "AI Transformation that moves from pilots to production" },
  ...["healthcare-life-sciences", "legal", "airlines-aviation", "retail-consumer-travel-retail", "logistics-ports", "manufacturing-industrial"].map((s) => ({
    key: `cs-${s}`, media: `cs-${s}`, eyebrow: "Case Study", title: titleOf(`/case-studies/${s}`),
  })),
  { key: "resources", media: "home-approach", eyebrow: "Resources & Content", title: "Blogs and white papers on AI transformation" },
  { key: "about", media: "about-global", eyebrow: "About NeuSix", title: "A DeepTech AI transformation company delivering measurable outcomes" },
  { key: "contact", media: "contact", eyebrow: "Contact", title: "Book a Free Consultation" },
];
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
for (const c of cards) {
  await p.setContent(`<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Lora:wght@500&family=Google+Sans+Flex:wght@400;600&display=block" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;position:relative;overflow:hidden;background:#0f0f1f;font-family:'Google Sans Flex',sans-serif}
img.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.ov{position:absolute;inset:0;background:linear-gradient(90deg,rgba(15,15,31,.92) 0%,rgba(15,15,31,.7) 50%,rgba(15,15,31,.25) 100%),linear-gradient(0deg,rgba(15,15,31,.6),transparent 50%)}
.c{position:absolute;inset:64px 72px;display:flex;flex-direction:column;justify-content:space-between;color:#fcfcfd}
.logo{height:26px;width:auto;align-self:flex-start}
.e{font-size:18px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;color:#d9daf2;display:flex;align-items:center;gap:14px}.e:before{content:"";width:40px;height:2px;background:#ef703d}
h1{font-family:Lora,serif;font-weight:500;font-size:${c.title.length > 60 ? 54 : 64}px;line-height:1.1;max-width:880px;margin-top:20px}
.u{font-size:18px;color:#d9daf2}</style></head><body>
<img class="bg" src="${base}/media/${c.media}.jpg"><div class="ov"></div>
<svg viewBox="0 0 495 529" style="position:absolute;right:70px;bottom:-90px;height:560px;overflow:visible" fill="none"><path d="M33.75 227C33.75 124 115 33.75 243 33.75C375 33.75 460.75 109 460.75 239V495.25" stroke="rgba(217,218,242,.22)" stroke-width="30" stroke-linecap="round"/></svg>
<div class="c"><img class="logo" src="${base}/assets/neusix-logo-white.svg"><div><p class="e">${c.eyebrow}</p><h1>${c.title}</h1></div><p class="u">neusix.com</p></div></body></html>`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `public/og/${c.key}.jpg`, type: "jpeg", quality: 82 });
  console.log("og", c.key, c.title);
}
await b.close();
