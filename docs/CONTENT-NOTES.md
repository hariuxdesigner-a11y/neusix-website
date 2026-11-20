# Content notes for the NeuSix team

The rebuild copies the live site's content verbatim. The agreed fixes (typos and dead links) are applied.
Everything else that looks wrong is **kept as published** and listed here, because changing it would mean
inventing copy. Each item needs input from NeuSix.

## Fixed in the rebuild (as agreed)

| Live site | Rebuild |
|---|---|
| Footer link "AIl Services" | "All Services" |
| "Tranforming" / "Addaptive AI" in hidden hero ticker | Ticker not rebuilt (it is hidden on the live site) |
| "Start a Conversation" → `#` | Not shown (it is hidden on the live site); every consultation CTA → `/contact-us` |
| Case study "Book a Free Consultation" → `#` | → `/contact-us` |
| "Read Case Study" with no link (Typical outcomes) | Hidden on the live site; not rebuilt |
| Case study filter chips "AITransformation", "Computer" | "AI Transformation", "Computer Vision", and the filters now work |
| Logistics case: "Exceptions surfaced late Bottlenecks: were often…" | "Exceptions surfaced late: Bottlenecks were often…" |
| Inconsistent "Book a free Consultation" | "Book a Free Consultation" |
| Nav labels rendered in Arial | Brand font (Google Sans Flex) |
| Page titles "NeuSix website", "Industries landing page", "About", missing meta descriptions | Titles/descriptions built from each page's own copy |

**Not actually missing:** the "Reduce cycle time by ___" figures are animated Lottie dials (e.g. 20–35%, 10–25%), now self-hosted.

## Needs NeuSix input (kept as published)

1. **Blog articles:** all 10 blog cards link to the *same* Google Doc. Supply the right link per article (or the article text to publish on-site). See `src/content/resources.ts`.
2. **Privacy Policy / Terms of Service / Cookie Policy:** shown as text in the footer; no pages exist. Supply the policy text to publish them.
3. **Case study hero video:** the live site uses one generic sample clip (`file_example_MP4_640_3MG`) for every case study. In v2 each case study has its own placeholder clip matched to its industry; replace with real footage when available.
4. **AI COE page:** "What we do" cards and "What we measure" line are identical to the ODC page.
5. **Healthcare case study:** "Operational Outcomes" reads like manufacturing copy ("production flow").
6. **Airlines case study:** "Experience Outcomes" repeats the retail case's personalization results.
7. **Retail case study:** "Execution Outcomes" (terminal/yard/gate) and "Strategic Impact" (smart manufacturing) belong to other cases.
8. **Legal case study:** "How It Works → Stage 2: Ground" has no description on the live site.
9. **Leadership team (About):** present in the markup but hidden on the live site; the two hidden copies disagree on titles
   (e.g. Harsh Patel "CTrO & CSO" vs "CTrO & CCO"). Confirm titles, then set `SHOW_TEAM = true` in `src/content/about.ts`.
10. **Client names with stars (About):** "Suri & Co, Impacteers, Symnn, Vigilant Inc, Zolvit, Isaac Luxe" are hidden on the live site with no testimonial text; not rebuilt.

## Content hidden on the live site (intentionally not rebuilt)

Template nav ("Link 1/2/3"), the "Transforming enterprises with …" AI-terms ticker and topic orbs, the "Read Case Study" links, and
the "Start a Conversation" buttons. All of these are `display:none` / zero-height on every screen size of the live site.

## v2 cinematic experience (branch `experience-v2`)

* **No copy was rewritten.** Section labels shown as small eyebrows ("Shipping Impact", "Services", "Our Work", "Resources",
  "Case Study | <industry>") are existing NeuSix labels reused; no new navigation items were added.
* **Hero "news" pill** on Home links to the Port Control Tower case study as an agreed placeholder. Change it in `src/app/page.tsx`.
* **All 37 videos are placeholders** (Mixkit free licence, credits in `docs/MEDIA-CREDITS.md`). `src/content/media.ts`
  describes the shot each section should get, as a brief for the final footage.
* `about-global` reuses the earth clip already on the live site.

## Added content (19 Nov 2026, approved by NeuSix to improve the experience)

All new copy is in `src/content/extras.ts` (plus small mappings in `industries.ts`) so it can be reviewed in one place.
No statistics, client names or testimonials were invented; FAQ answers reuse existing NeuSix statements.

| Where | What was added |
|---|---|
| Home | **Client logo carousel — placeholders** ("Our Clients / Trusted by enterprise teams"). Replace the 10 dummy logos in `extras.ts` → `CLIENTS` with real ones (files in `public/clients/`). |
| Home | **Industries** tiles (9 industries → their section on the Industries page) |
| Home | **Case studies** row (3 cases besides the featured Port Control Tower) |
| Home, service pages, Contact | **FAQ** (6 questions; services show the first 5). Includes FAQ structured data for search engines. |
| Service pages | **Related case studies** (matching the service first, then others) |
| Industries | Anchor per industry (`/our-work/industries#healthcare` …) and **links to related case studies** |
| Case study pages | **Previous / Next case study** navigation |
| Contact | **What happens next** (3 steps, from the consultation copy) |
| Header | Hover/active states unified; menu no longer changes colour when a dropdown opens; current page underlined |

## Motion pass (19 Nov 2026) — new short copy

* Home outcomes: "Measured in cycle time, cost, and reliability—not in slides."
* Home impact headline: "Shipped across 6 industries / from pilots to production" (6 = industries covered by the case studies; updates automatically).
* About: "Our Conviction" label over the first intro paragraph; "Our Values" label above Our DNA.

## Header, About, contrast & icon pass (19 Nov 2026)

* About: hero buttons "Book a Free Consultation" and "Case Studies"; small labels "NeuSix Scoreboard", "Recognition", "Where we work";
  a link tile "See the outcomes in our case studies". The separate scoreboard row was merged into the stats grid (all values kept,
  incl. Squad Size 17). The decorative "team base" strip was removed.
* Award images are now lightweight WebP copies of the original artwork (`a-r-1.webp`, `a-r-2.webp`).
* Home: client logo strip (placeholders) moved directly under the hero.

## Page style, SEO and legal pages (20 Nov 2026)

* **One page style:** every page = video hero → light content → dark rounded CTA card. Statement bands, Why NeuSix, Stage Fit,
  What you get, Outcome Highlights, Industries, About values/presence and the 404 page are now light. Small labels added for the
  new light layouts: "Our Difference", "Deliverables", "Results", "Challenges", "Error 404".
* **SEO copy** lives in `src/content/seo.ts` (title ≤ 60 chars and a unique 120–160 char description for every page, plus topic-page
  intros). Built from existing page copy. Share images (1200×630) are in `public/og/`; regenerate with `node scripts/make-og.mjs`
  while the site runs on localhost:3000.
* Topic pages (`/blog-tags/*`) are `noindex, follow` and not in the sitemap: each lists only 1–2 posts that all link to the same
  Google Doc. Remove `noindex` in `src/app/blog-tags/[tag]/page.tsx` once real articles exist.
* **Legal pages** (`/privacy-policy`, `/terms-of-service`, `/cookie-policy`) describe what the site actually does today: contact form
  only, no cookies, no analytics. **Have them reviewed by your legal adviser**, and update them if you add analytics, a CRM, chat,
  or a dedicated privacy contact email. Terms name the courts at Hyderabad, Telangana (registered office) — confirm this choice.
* Footer: designer credit removed; legal links are live; copyright shows the legal entity name.

## NeuSix "N" mark (20 Nov 2026)

* Supplied favicon artwork traced to a vector (98.8% match): `public/brand/neusix-n.svg` (navy #2D2D5F).
* Site icons: `src/app/icon.svg` (browser tab, switches to light lilac in dark mode), `src/app/favicon.ico` (16/32/48),
  `src/app/apple-icon.png` (180, white N on brand navy), `public/brand/icon-192/512.png` + maskable icon, `src/app/manifest.ts`.
  Regenerate with `node scripts/make-icons.mjs`.
* Brand motif `src/components/brand/NArch.tsx` (draws itself in): closing CTA card on every page, footer watermark, behind
  "Why NeuSix", About "Our Conviction", 404 page, mobile menu, list bullets on the legal pages, and all share images.
* Fixed the CTA card text: "…outline next steps, with no obligations."
