// Keyboard + mobile navigation checks: node scripts/nav-test.mjs <baseUrl>
import { chromium } from "@playwright/test";
const base = process.argv[2];
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ["--no-sandbox"] });
let p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(base + "/", { waitUntil: "networkidle" });
// Tab: skip link, logo, Services button
await p.keyboard.press("Tab");
console.log("1st tab:", await p.evaluate(() => document.activeElement.textContent.trim()));
await p.keyboard.press("Tab"); await p.keyboard.press("Tab");
console.log("3rd tab:", await p.evaluate(() => document.activeElement.textContent.trim()));
await p.keyboard.press("Enter");
console.log("Services expanded:", await p.evaluate(() => document.activeElement.getAttribute("aria-expanded")));
await p.keyboard.press("Tab");
console.log("next focus:", await p.evaluate(() => document.activeElement.textContent.trim()));
await p.keyboard.press("Escape");
console.log("after Esc expanded:", await p.evaluate(() => document.activeElement.getAttribute("aria-expanded")), "focus:", await p.evaluate(() => document.activeElement.textContent.trim()));
// hover opens
await p.hover("text=Our Work");
await p.waitForTimeout(200);
console.log("hover Our Work shows Case Studies:", await p.isVisible("header >> text=Case Studies"));
await p.click("header >> text=Case Studies");
await p.waitForURL("**/our-work/case-studies");
console.log("navigated:", p.url());
await p.close();
// Mobile
p = await b.newPage({ viewport: { width: 375, height: 800 } });
await p.goto(base + "/", { waitUntil: "networkidle" });
await p.click("button[aria-label='Open menu']");
console.log("mobile menu visible:", await p.isVisible("#mobile-menu"));
await p.click("#mobile-menu >> text=Services");
await p.click("#mobile-menu >> text=Modernization");
await p.waitForURL("**/services/modernization");
console.log("mobile navigated:", p.url(), "menu closed:", !(await p.isVisible("#mobile-menu")));
// tag filter dropdown on resources (no JS needed)
await p.goto(base + "/resources");
await p.click("summary");
await p.click("text=Methodology");
await p.waitForURL("**/blog-tags/methodology");
console.log("tag page items:", await p.$$eval("#blogs-title ~ ul li", (l) => l.length));
// case study filter
await p.goto(base + "/our-work/case-studies", { waitUntil: "networkidle" });
await p.click("button:has-text('Legal')");
console.log("filter Legal -> cards:", await p.$$eval("#cs-list-title ~ * , ul li article", (x) => x.length));
await b.close();
