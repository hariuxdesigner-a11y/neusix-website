# Testing & QA record

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
