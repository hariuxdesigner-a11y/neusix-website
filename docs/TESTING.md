# Testing & QA record

## Page style / SEO / legal pass, 20 Nov 2026

* Darkness per page now 13–18% (hero + CTA card) on every page; light-top pages 0%. Industries was 83%, About 43%.
* SEO audit `python3 scripts/seo-audit.py http://localhost:3000`: all indexable pages pass (title/description length, unique, canonical,
  Open Graph + Twitter image, one H1, no heading skips, alt text, JSON-LD: Organization, WebSite, BreadcrumbList, Service, Article, FAQPage).
* 24 pages × 8 widths = 192 loads clean; contrast audit 0 issues; nav + form tests pass.
* Lighthouse mobile: Home 99/100/100/100, Industries 100/100/100/100, Privacy 99/100/100/100, About 92, Modernization 90.

## Header / About / contrast / icon pass, 19 Nov 2026

* Contrast: `node scripts/contrast.mjs http://localhost:3000 1440,390 <paths>` (axe-core) on every page → **0 issues** (was 16).
* 232 loads at 8 widths: no horizontal scroll, no errors. Nav + form tests pass.
* Lighthouse mobile: Home 98/100/100/100, About 91/100/100/100, Contact 100/100/100/100, Modernization 84, ODC 91.

## Motion pass (Abridge-style animation), 19 Nov 2026

* 28 URLs + 404 × 8 widths = 232 loads: no horizontal scroll, no console/network errors.
* Reduced motion: no smooth scroll, no parallax, no auto-advancing tabs; all text, counters and icons shown complete.
* Keyboard/mobile navigation and contact form tests pass (form never shows a fake success).
* Lighthouse mobile: Home 99/100/100/100, About 90/100/100/100, Modernization 89, Port case study 86, Contact 100 (performance/accessibility/best practices/SEO); CLS 0 on every page tested.

## v2 cinematic experience (branch `experience-v2`), 19 Nov 2026

Production build, placeholder footage in place (37 clips).

* **Responsive / overflow: PASS.** 28 sitemap URLs + 404 page × 320, 375, 430, 768, 1024, 1280, 1440, 1920 px = 232 loads:
  all 200 (404 page returns 404), **zero horizontal page scroll**, no console or network errors. Elements reported
  past the edge are inside intentional sideways scrollers (logo marquee, competency/stage tabs, related-case carousel).
* **Navigation: PASS.** Skip link → logo → Services; Enter opens the mega menu; **Tab moves into the open panel and
  out to "Our Work"**, Shift+Tab returns to the trigger; Esc closes and restores focus; hover opens; mobile full-screen menu
  accordions navigate and close; resources tag filter; case-study filters.
* **Contact form: PASS.** Empty submit → field errors; no delivery configured → error message, never success;
  webhook configured → success and the JSON arrives at the endpoint.
* **Video behaviour: PASS.** Reduced motion → no video downloaded (posters only). Desktop → hero starts after page load,
  other clips only when within ~600px of the viewport, and play only while visible. Phones (<768px) → only the hero
  clip (mobile encode); other bands show a 3:4 phone poster.
* **Lighthouse (mobile, simulated slow 4G):**

| Page | Perf | A11y | Best pr. | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| Home | 99 | 100 | 100 | 100 | 0.9 s | 0 |
| Modernization | 92 | 100 | 100 | 100 | 3.2 s | 0 |
| About | 97 | 100 | 100 | 100 | 2.5 s | 0 |
| Case study (Port Control Tower) | 86 | 100 | 100 | 100 | 4.0 s | 0 |
| Case studies listing | 88 | 100 | 100 | 100 | 3.9 s | 0 |
| Contact | 100 | 100 | 100 | 100 | 0.9 s | 0 |

  On pages whose largest element is the hero poster image, Lighthouse's *simulated* LCP is 3–4 s; the measured
  load-to-paint of that image was ~250 ms. Final footage/posters should keep posters under ~80 KB (desktop) and ~40 KB (phone).

## v1 rebuild (branch `main`)

All tests ran against the production build (`npm run build && npm start`) on 17 Nov 2026.

## How to run

With the site running on `http://localhost:3000` (set `CHROME_PATH` if Playwright's own browser isn't installed):

```bash
npm run qa                                   # full-page screenshots + overflow + console/network errors, 8 widths
node scripts/qa.mjs http://localhost:3000 qa-shots 375,1440 /about   # specific pages/widths
npm run test:nav                             # keyboard nav, dropdowns, mobile menu, blog tag filter, case study filters
npm run test:form                            # contact form E2E (configure SMTP or CONTACT_WEBHOOK_URL first)
python3 scripts/sheet.py qa-shots/_home-1440.png sheet.jpg 2400 480   # contact sheet for visual review
```

Side-by-side against the original: `node scripts/qa.mjs https://www.neusix.com orig-shots 375,1440 / /about …`
captures the live Webflow site with the same settings, so the two folders can be compared page by page.

## Results

### Responsive / overflow: PASS
All **29 public URLs** (every page, service, case study and blog-tag page) × **320, 375, 430, 768, 1024, 1280, 1440, 1920 px**
= 232 page loads: all HTTP 200, **zero horizontal scrolling**, no console or network errors (apart from
Next.js link prefetches during the test). Elements reported inside the "How it works" stage tabs and the related-case-study
carousel are intentional horizontal scrollers on small screens.
(The live Webflow site scrolls sideways at 768px, where the page is 881px wide, and loses sections between 768 and 1024px.)

### Functional: PASS
* Desktop nav: Tab order (skip link → logo → Services); Enter opens the dropdown, Esc closes it and returns focus; hover opens; links navigate.
* Mobile nav: menu opens, accordion sections expand, links navigate, menu closes on navigation.
* Resources "Filter by" dropdown (works without JS) → tag pages list the right posts.
* Case study filters: Industry/Service/Themes chips filter correctly; empty state + "Clear filters" work.
* Contact form:
  * empty submit → inline errors for area of interest, phone, email;
  * **no delivery configured → shows the error message, never a success**;
  * webhook configured → success, JSON received by the endpoint;
  * SMTP configured (local SMTP server) → success, email received with correct To / Reply-To / subject / body.
* 404 page for unknown URLs; redirects (`/services`, `/contact`, …) return 308.
* Standalone server (`node .next/standalone/server.js`) serves pages, assets, Lottie WASM, sitemap (28 URLs) and robots.txt.

### Lighthouse (mobile, local production build)

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| Home | 99 | 100 | 100 | 100 | 0.9 s | 0 |
| Modernization | 98 | 100 | 100 | 100 | 0.9 s | 0 |
| About | 95 | 100 | 100 | 100 | 2.5 s | 0 |

### Visual comparison
Each page was compared with the live site in a browser at 1440px and 375px: section order, copy, brand colours, fonts,
assets and layout. Automated pixel diffs against the live site from the build server were not possible because
`www.neusix.com` was blocked by the build environment's network allowlist; use the command above to capture both versions.

### Known differences from the live site (by design)
* One responsive layout per section replaces Webflow's separate desktop and mobile copies.
* Hidden live-site elements are not rebuilt (see CONTENT-NOTES.md).
* Scroll animations are simplified, respect reduced-motion, and never hide content when JS is off.
