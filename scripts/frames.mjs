// Viewport frames while scrolling (to review scroll-linked motion): node scripts/frames.mjs <url> <out-prefix> <width> <step> <count>
import { chromium } from "@playwright/test";
const [url, out, w = "1440", step = "700", count = "14"] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const p = await b.newPage({ viewport: { width: +w, height: +w < 800 ? 760 : 860 } });
await p.goto(url, { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
for (let k = 0; k < +count; k++) {
  await p.screenshot({ path: `${out}-${String(k).padStart(2, "0")}.png` });
  for (let s = 0; s < 7; s++) { await p.mouse.wheel(0, +step / 7); await p.waitForTimeout(60); }
  await p.waitForTimeout(900);
}
await b.close();
