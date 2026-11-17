import { chromium } from "@playwright/test";
const b = await chromium.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await p.evaluate(()=>document.querySelector('#outcomes-title').scrollIntoView());
await p.waitForTimeout(4000);
const s=await p.$('#outcomes-title');const sec=await s.evaluateHandle(e=>e.closest('section'));
await sec.asElement().screenshot({path:'/tmp/qa/outc.png'});
await b.close();
