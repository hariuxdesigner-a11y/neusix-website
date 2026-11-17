// Contact form E2E: node scripts/form-test.mjs <baseUrl> <expect: success|error>
import { chromium } from "@playwright/test";
const [base, expect] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ["--no-sandbox"] });
const p = await b.newPage();
await p.goto(base + "/contact-us", { waitUntil: "networkidle" });
// 1) empty submit -> field errors
await p.click("button[type=submit]");
await p.waitForSelector("#form-status");
console.log("empty submit:", await p.textContent("#form-status"), "| errors:", await p.$$eval("[id^=e-]", (e) => e.map((x) => x.textContent)));
// 2) valid submit
await p.selectOption("#cf-industry", { label: "Professional Services" });
await p.fill("#cf-name", "QA Test");
await p.fill("#cf-phone", "+91 98765 43210");
await p.fill("#cf-email", "qa@example.com");
await p.fill("#cf-message", "Automated test submission <b>html</b>");
await p.click("button[type=submit]");
await p.waitForTimeout(2500);
const ok = await p.$("[role=status]");
const err = await p.$("#form-status");
console.log("valid submit:", ok ? "SUCCESS: " + (await ok.textContent()) : "ERROR: " + (err && (await err.textContent())), "| expected:", expect);
await b.close();
