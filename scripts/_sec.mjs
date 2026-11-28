import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
for (const path of process.argv.slice(2)) {
await p.goto("http://localhost:3000"+path, { waitUntil: "networkidle" });
console.log("\n"+path);
console.log(await p.evaluate(() => {
  const main = document.querySelector("main");
  return [...main.querySelectorAll(":scope > section, :scope > div, :scope > div > section")].filter(s=>s.getBoundingClientRect().height>40).map(s => {
    const cs = getComputedStyle(s); const bg = (cs.backgroundColor!=="rgba(0, 0, 0, 0)") || cs.backgroundImage!=="none";
    return `${(s.getAttribute("aria-labelledby")||s.getAttribute("aria-label")||s.tagName).padEnd(22)} pt=${cs.paddingTop} pb=${cs.paddingBottom} mt=${cs.marginTop} mb=${cs.marginBottom} bg=${bg} cls="${s.className.toString().slice(0,90)}"`;
  }).join("\n");
}));
}
await b.close();
