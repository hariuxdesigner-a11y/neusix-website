# NeuSix website (Next.js rebuild)

A fluid-responsive, production-ready rebuild of **https://www.neusix.com** (originally built in Webflow).
The NeuSix brand, copy, page structure, URLs and visual assets are preserved; the engineering is new:
one fluid layout per section (no separate desktop/mobile copies), accessible navigation and forms,
real contact-form delivery, SEO metadata, and a typed content layer.

## Quick start

```bash
npm install            # also copies the Lottie renderer (WASM) into /public/lottie
cp .env.example .env.local   # then fill in the contact-form settings
npm run dev            # http://localhost:3000
```

Production:

```bash
npm run build          # builds + prepares the self-contained .next/standalone bundle
npm start              # or: npm run start:standalone  (node .next/standalone/server.js)
```

Requires **Node.js 20.9+** (Node 22 LTS recommended).

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router, React 19, TypeScript), static pre-rendering for every page |
| Styling | Tailwind CSS v4 with NeuSix brand tokens in `src/app/globals.css`; fluid type/spacing with `clamp()` |
| Fonts | Lora (headings) + Google Sans Flex (UI/body), self-hosted via `next/font` |
| Motion | `motion` (scroll-driven rocket on Home), CSS scroll reveals, Lottie dials via `@lottiefiles/dotlottie-react` (self-hosted WASM). All respect `prefers-reduced-motion`; content is visible without JavaScript |
| Forms | Server Action + `zod` validation + honeypot + rate limit → SMTP (`nodemailer`) and/or webhook |
| QA | Playwright scripts in `scripts/` (screenshots, overflow, console, form, keyboard nav) |

## Project structure

```
src/
  app/                         Routes (URLs match the live site)
    page.tsx                   /
    services/services-neusix/  /services/services-neusix   (services hub)
    services/[slug]/           /services/<6 service pages>  (one template, accent colour per page)
    our-work/industries/       /our-work/industries
    our-work/case-studies/     /our-work/case-studies      (filterable listing)
    case-studies/[slug]/       /case-studies/<6 case studies>
    resources/                 /resources   (+ /resources/[slug] for on-site articles)
    blog-tags/[tag]/           /blog-tags/<10 category pages>
    about/  contact-us/        /about, /contact-us (form + server action)
    sitemap.ts robots.ts not-found.tsx
  components/
    layout/                    SiteHeader (desktop dropdowns + mobile drawer), SiteFooter
    sections/                  Shared sections: ServiceCards, OurApproach, TypicalOutcomes, WhyNeuSix,
                               CommercialModels, CtaBand, TrustStrip
    home/ services/ industries/ case-studies/ resources/  Page-specific sections
    ui/                        Button, Orbs, LottieOnView, RevealObserver
  content/                     ALL site copy lives here (typed data); edit text without touching layout
    site.ts services.ts industries.ts case-studies.ts resources.ts about.ts blog/*.md
public/assets/                 Original NeuSix assets downloaded from the Webflow CDN
scripts/                       qa.mjs, form-test.mjs, nav-test.mjs, sheet.py, postbuild/postinstall helpers
docs/                          AUDIT.md, DEPLOYMENT-HOSTINGER.md, TESTING.md, CONTENT-NOTES.md
```

## Editing content

* **Copy changes:** edit the matching file in `src/content/`.
* **New case study:** append an object to `CASE_STUDIES` in `src/content/case-studies.ts`. The listing, filters, detail page, related carousel and sitemap update automatically.
* **New blog post:** add to `BLOG_POSTS` in `src/content/resources.ts`. Either link out (`href`) or publish on-site (`slug` + `src/content/blog/<slug>.md`).
* **Leadership team (About page):** the data is in `src/content/about.ts`. It is hidden on the live site, so it's off here too. Set `SHOW_TEAM = true` to publish it.

## Environment variables

See `.env.example`. The contact form needs **SMTP** (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`)
and/or a **webhook** (`CONTACT_WEBHOOK_URL`). If neither is set, submissions show the original Webflow error message
and nothing is reported as sent.

## Deployment

Hostinger: see **[docs/DEPLOYMENT-HOSTINGER.md](docs/DEPLOYMENT-HOSTINGER.md)**.

## Testing

See **[docs/TESTING.md](docs/TESTING.md)**. Short version (with the site running on :3000):

```bash
npm run qa          # screenshots + overflow/console checks at 8 widths → qa-shots/
npm run test:nav    # keyboard + mobile navigation, filters
npm run test:form   # contact form E2E (needs a delivery channel configured)
```
