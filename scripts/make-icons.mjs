// Renders favicon / app icons from the NeuSix "N" mark: node scripts/make-icons.mjs
import { chromium } from "@playwright/test";
import fs from "node:fs";
const D = "M33.75 227C33.75 124 115 33.75 243 33.75C375 33.75 460.75 109 460.75 239V495.25";
const tile = (size, { pad = 0.22, bg = "linear-gradient(145deg,#403e8e,#2d2d5f 60%,#1e1f41)", stroke = "#fcfcfd", sw = 70, radius = 0 } = {}) => `
<body style="margin:0;width:${size}px;height:${size}px;display:grid;place-items:center;background:${bg};border-radius:${radius}px;overflow:hidden">
<svg viewBox="0 0 495 529" style="width:${(1 - pad * 2) * size}px;height:${(1 - pad * 2) * size}px;overflow:visible" fill="none"><path d="${D}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/></svg></body>`;
const out = [
  ["src/app/apple-icon.png", 180, { pad: 0.24 }],
  ["public/brand/icon-192.png", 192, { pad: 0.24 }],
  ["public/brand/icon-512.png", 512, { pad: 0.24 }],
  ["public/brand/icon-maskable-512.png", 512, { pad: 0.3 }],
  ["/tmp/fav-48.png", 48, { pad: 0.1, bg: "transparent", stroke: "#2D2D5F", sw: 84 }],
  ["/tmp/fav-32.png", 32, { pad: 0.08, bg: "transparent", stroke: "#2D2D5F", sw: 92 }],
  ["/tmp/fav-16.png", 16, { pad: 0.06, bg: "transparent", stroke: "#2D2D5F", sw: 100 }],
];
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
for (const [file, size, opt] of out) {
  const p = await b.newPage({ viewport: { width: size, height: size } });
  await p.setContent(tile(size, opt));
  await p.screenshot({ path: file, omitBackground: opt.bg === "transparent" });
  await p.close();
  console.log(file);
}
await b.close();
