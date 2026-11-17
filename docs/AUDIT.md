# NeuSix website rebuild: Milestone 1 audit

Reference: https://www.neusix.com/ (Webflow site, CDN `cdn.prod.website-files.com/699c35a1ae4d1b7ce7228b16/`)
Audited: 17 Nov 2026. Sources: page fetches of the live site plus the live DOM and computed styles in a browser at 320, 375, 768, 1024 and 1440px.

> **Status key:** ✅ inspected directly · 🔶 inferred from shared template or navigation, to be inspected in full during build

---

## 1. Pages (27 public URLs)

| # | URL | Page | Status |
|---|---|---|---|
| 1 | `/` | Home | ✅ |
| 2 | `/services/services-neusix` | All Services (hub) | ✅ |
| 3 | `/services/ai-transformation-page` | AI Transformation | ✅ |
| 4 | `/services/modernization` | Modernization | 🔶 service template |
| 5 | `/services/digital-transformation` | Digital Transformation | 🔶 service template |
| 6 | `/services/software-engineering-services` | Software Engineering | 🔶 service template |
| 7 | `/services/ai-center-of-excellence` | AI COE | 🔶 service template |
| 8 | `/services/offshore-development-center` | ODC Services | ✅ |
| 9 | `/our-work/industries` | Industries | ✅ |
| 10 | `/our-work/case-studies` | Case Studies listing | ✅ |
| 11 | `/case-studies/healthcare-life-sciences` | Case study (CMS) | 🔶 |
| 12 | `/case-studies/legal` | Case study (CMS) | ✅ |
| 13 | `/case-studies/airlines-aviation` | Case study (CMS) | 🔶 |
| 14 | `/case-studies/retail-consumer-travel-retail` | Case study (CMS) | 🔶 |
| 15 | `/case-studies/logistics-ports` | Case study (CMS) | 🔶 |
| 16 | `/case-studies/manufacturing-industrial` | Case study (CMS) | 🔶 |
| 17 | `/resources` | Resources & Content (blogs + white papers) | ✅ |
| 18–27 | `/blog-tags/{resources, engagement-models, modernization, ai-governance, ai-coe, methodology, market-pov, odc-engineering, leadership-pov, ai-transformation}` | Blog category filter pages (CMS) | ✅ (modernization), 🔶 rest |
| 28 | `/about` | About | ✅ |
| 29 | `/contact-us` | Contact | ✅ |

**Not present on the live site:**
- **Blog article pages.** All 10 blog cards link to the *same* Google Doc (`docs.google.com/document/d/16AQqz4e…`). The 3 white papers link to 3 separate Google Docs.
- **Privacy Policy / Terms of Service / Cookie Policy.** These appear as footer text with no link and no page.
- No `sitemap.xml` (it returns an error), no cookie banner, no 404 page found yet.

## 2. Navigation & URL structure

**Header:** Logo → `/` · **Services ▾** (All Services, AI Transformation, Modernization, Digital Transformation, Software Engineering, AI COE, ODC Services) · **Our Work ▾** (Industries, Case Studies) · Resources · About · **Contact** (dark pill button)
- The markup also contains a hidden template nav ("Link 1/2/3", `.nav-section`, display:none). This is Webflow leftover and won't be rebuilt.
- The mobile hamburger opens below 768px. At 768px the desktop nav is still shown with a very small logo.

**Footer:** logo + tagline "Transforming enterprises with deep tech AI solutions and intelligent automation." · social icons (LinkedIn, Facebook, Instagram, YouTube) · **Services** column (link labelled "AIl Services", sic) · **Company** column (Resources, About Us, Contact) · "© 2026 NeuSix. All rights reserved." · "Designed and developed by Twist Open UX" → twistopen.in · Privacy / Terms / Cookie (unlinked)

**Social URLs:** linkedin.com/company/neusix · facebook.com/profile.php?id=61589978183199 · instagram.com/neusix.24 · youtube.com/@neusix-h8g

**CTA destinations:**
| CTA | Destination |
|---|---|
| Book a Free Consultation / Schedule a Discovery Call / Get in touch | `/contact-us` |
| Explore Services | `/services/services-neusix` |
| Service card "Explore" | matching service page |
| Case study card "Explore" | matching `/case-studies/*` |
| **Start a Conversation** (every page) | `#`: **dead link** |
| **Read Case Study** (Typical outcomes, ×3 per page) | **no href** |
| Case study "See it in action", mid-page "Book a Free Consultation" | `#`: **dead link** |
| Case study carousel arrows | no target |

## 3. Section inventory

**Global, repeated on almost every page:** Header → … → *Book a Free Consultation* CTA band (copy: 30-min no-obligation call; "Fast, practical, and tailored. We'll keep it grounded in your reality.") → trust strip "Building NeuSix with outcome-driven talent shaped @" + logos → Footer.

**Home:** Hero ("Shipping Impact" / "Harnessing AI to create relevance, not just competence" + floating colour orbs + rotating ticker of 17 AI terms) → "Transforming enterprises with" orb topics → **Our competencies** (scroll-driven rocket animation; 6 items; separate mobile rocket) → Intro stats (10+ / 98% / 15+; "We optimize for: Impact, Value, Transparency, and ROI.") → **Our Services** (6 cards with line-art SVGs) → Principles 01–03 → **Why NeuSix** (image + 3 principles) → **Our Approach** (Discover / Plan / Build / Scale) → **Typical outcomes** (3 metrics) → banner → CTA → trust strip → footer

**Services hub:** Hero "Services designed to ship measurable outcomes" → Our Services (6) → "We're not trend-chasers. We're problem-solvers." → Our Approach → Stages of AI Workflow Transformation (Advisory / Development & Integration / Managed Services) → Why NeuSix → Commercial Models (B&T, BOT, BOM) → CTA

**Service page template** (AI Transformation, ODC, presumably the other 4). Each page has its own accent colour (AI Transformation = purple, ODC = green): Hero → Stage Fit → definition ("What AI transformation means…" / ODC "Engagement models") → What we do (3) → Typical outcomes (3) → Use-case themes (AI T only) → How We Ship Impact (4 phases + typical outputs) → What you get (6, rendered twice for desktop/mobile) → Commercial Models → CTA

**Industries:** Hero "AI transformation across industries built to survive the real world." → 9 industry blocks (areas / outcomes / solutions) → The Problems We Solve (5) → Our Approach → CTA

**Case studies listing:** Hero → filters (Industry ×7, Service ×12, Themes ×4) → 6 cards with Outcome Highlights → CTA

**Case study detail** (legal): breadcrumb → hero (category, H1, tags, "See it in action", demo video) → Executive Summary → Outcome Highlights → Client Context → The Challenge → What NeuSix Shipped (4 groups) → mid-page CTA → How It Works (tabs) → Outcomes → What We Measured → Governance → related case studies carousel → CTA

**Resources:** "Resources & Content" → Blogs + "Filter by:" (10 tag links) → 10 blog cards (title, tag, read time; **no dates**) → White papers (3) → CTA

**About:** Hero "About NeuSix" + film image → Typical outcomes (4 stats) → Our DNA (4) → Vision & Mission → NeuSix scoreboard → Leadership (7) → Architects, Engineers & Specialists (10) → client names with stars (6) → Careers "Build What Matters. Join NeuSix." → Awards & Recognition → Global Presence & Delivery Reach (world map) → CTA "Ready to Transform Your Enterprise with AI?"

**Contact:** "Get in Touch" + intro → form (Area of interest: 9 industries + other fields, to be inspected in full) → Office address (Banjara Hills, Hyderabad 500 034) → trust strip
- Webflow form messages: "Thank you! Your submission has been received!" / "Oops! Something went wrong while submitting the form."
- Webflow's built-in form handler processes submissions, and the destination inbox isn't visible from outside. **You'll need to confirm where submissions go today.**

## 4. Branding & typography

**Colours** (the site's own CSS variables):
| Token | Value | Use |
|---|---|---|
| `--neusix-dark-blue` / `--neu-blue-black-dark` | `#0F0F1F` | headings, Contact pill, dark sections |
| `--neusix-blue-700` | `#403E8E` | brand blue |
| (button) | `#313168` | primary buttons |
| `--neusix-light-purple` | `#6D6EB5` | line art, accents |
| `--neusix-blue-white` | `#F1F1F9` | light section bg |
| `--neusix-white-text` | `#FCFCFD` | page bg / text on dark |
| `--neusix-orange` | `#EF703D` | orb / accent |
| `--neusix-yellow` | `#F6A042` | orb / accent |
| `--neusix-green` | `#649E4F` | ODC accent |
| `--neusix-purple` | `#995BA5` | AI T accent |
| `--phenix-red` | `#D43C3C` | orb / accent |
| `--neu-blue--black--light` | `#9494A6` | muted text |
| others | `#D9DAF2`, `#292929`, `#333`, `#4A4A5A`, `#E7E8F3` | borders, body text |

**Fonts** (Google Fonts):
- **Lora**: headings (e.g. section H2 at 40px/400 desktop) and display text
- **Google Sans Flex** (300–700): body (16px/24px), buttons (14px), labels
- Nav links currently render in **Arial** (Webflow default, very likely unintended). *Decision needed: keep Arial or switch to Google Sans Flex?*
- The page also loads **Lato, Varela, Ubuntu and Vollkorn**, which are never used. Dropping them is a performance win with no visual change.

**Buttons:** pill, `border-radius: 24px`, bg `#313168`, white 14px Google Sans Flex, padding 15px.
**Breakpoints in use:** Webflow defaults: 479 / 767 / 991px, plus 1280 / 1440.
**Favicon:** `fevi_light.png`, apple-touch `SSI.png`.

## 5. Asset inventory

Every asset lives on the Webflow CDN. Most are SVG line-art and can be reused at full fidelity.
- **Logos:** header `Group 1.svg`, footer `neusix-footer-logo.svg`, white variants (`neusix-logo-white.svg`, `logo-neu-white.svg`), `Logo_home.png`, `Logo_home-dark.png`, trust-strip `bal.svg`
- **Home:** rocket `r-top / r-mid / r-bottom.svg`, `rocket-mobile.svg`, decorative line SVGs (×3), service line-art `gfx-01…06`, `Home_Why_NeuSix.png`, `mobile-blue-banner03.png`, approach icons `discover/plan/build/scale-01.svg`, `ArrowRight.svg`, `line-divider-lottie.svg`
- **Service pages:** `plays-gfx-01…03` (+ green variants), phase icons in purple/green variants, `wyg-gfx-02…06` (+ green), `eclipsegfx-01.svg`, `radial-button-bullet.svg`, `model-gfx-01…03.svg`, `Services_Why_NeuSix.png`, `why-neusix-service-mobile.png`
- **Case studies:** `outcome-banner.svg`, `CS_i2`, `CS-i3.svg`, `Frame 427320460.png`, `Play.png`, `Pause.svg`, carousel arrows, metric caret/arrow PNGs, demo video **`file_example_MP4_640_3MG.mp4`** (a generic sample clip, not NeuSix footage)
- **About:** `film.png` / `film-mobile.svg`, `typical outcomes.png`, `Our DNA bg.png`, `V&M_lines.svg`, **17 portrait photos**, `stars.svg`, `team_base.png`, awards `A&R_1/2.svg`, world map set (`G&D_*.svg`, `world 1.svg`)
- **Social icons:** 4 SVGs
- **Video:** only the case-study sample clip above. **Lottie:** none (the "lottie" filename is a static SVG).

## 6. Responsiveness problems found (measured, not guessed)

| Viewport | Problem |
|---|---|
| **768px (tablet)** | **Horizontal scroll: page is 881px wide.** Caused by `div-block-16 / sec-08` (930px) and the coloured orb cards. |
| 768–1024px | *Why NeuSix* section collapses to 20px and *Our Approach* to 282px. Desktop-only blocks are hidden before the mobile versions show, so content goes missing at tablet sizes. |
| 768px | Full desktop nav squeezed in, with a tiny logo. No tablet-appropriate nav. |
| 1024px | Small overflow (5px) from `div-block-12/14`. |
| 320–375px | Typical-outcome text blocks positioned 10px off the left edge. Orb cards overflow the right edge by up to 28px at 320px. Service cards looked clipped at 320px (possibly mid-animation, to be re-verified). |
| Mobile | 11 tap targets smaller than 32px. |
| All | **Separate mobile and desktop copies of whole sections** (rocket, services, Why NeuSix, What you get; leadership listed twice with *conflicting job titles*). Webflow swaps them at fixed breakpoints, so in-between widths break. |
| All | 74 elements start at `opacity: 0` until a scroll animation fires, so content is blank if JS is slow or the animation misfires. |
| All | Layout is breakpoint-stepped (fixed px sizes), not fluid. |

**SEO/a11y issues to fix along the way:** home page has no H1 (the hero is an H2); most images have no alt text; no canonical, no Open Graph on home; no sitemap; dead `#` links.

## 7. Content issues on the live site (need your call)

The brief says preserve content exactly, but these look like mistakes:
1. Typos: "AIl Services" (footer), "Tranforming" (hero), "Addaptive AI" (ticker)
2. "Reduce cycle time by ___" and "Cut operation cost by ___" have **no figure**
3. Identical metrics repeated across unrelated case studies ("18+% FTE saved", "75% downtime reduction"…), apparently template filler
4. Case study demo is a generic sample video
5. All 10 blogs open the same Google Doc
6. "Start a Conversation", "Read Case Study" and the legal links go nowhere
7. Leadership titles differ between the two copies on About (e.g. Harsh Patel "CTrO & CSO" vs "CTrO & CCO")

## 8. Proposed stack

- **Next.js (App Router, latest stable) + React + TypeScript**, server-rendered/static pages with one Node runtime for the contact form
- **Tailwind CSS v4** with the brand tokens above as CSS variables. Fluid type and spacing via `clamp()`; one DOM per section (no mobile/desktop duplicates)
- **Motion (Framer Motion)** for scroll reveals, rocket and ticker. Respects `prefers-reduced-motion`. Content is visible without JS.
- **Content layer:** typed MDX/JSON files in the repo for services, case studies, industries, blog entries, white papers and team, so new posts need no code changes. Tag pages are generated from blog tags.
- **Fonts:** `next/font` self-hosting Lora + Google Sans Flex only
- **Images:** original SVGs inline/static; PNGs through `next/image` (AVIF/WebP, lazy below the fold)
- **Contact form:** server action with validation (zod), honeypot + rate-limit, sent via SMTP (e.g. your Hostinger business email) or Resend. Shows success only after the send succeeds. Configured in `.env`.
- **SEO:** per-page metadata/OG, canonical, `sitemap.xml`, `robots.txt`, JSON-LD Organization, custom 404
- **QA:** Playwright screenshot diffs (original vs rebuild) at all 8 viewports, plus link, console and overflow checks

## 9. Development & deployment plan

1. **Asset & content capture:** download every CDN asset and verbatim copy from all 29 URLs into the repo
2. **Foundation:** tokens, fonts, layout primitives, Header (with accessible dropdowns + mobile drawer), Footer, CTA band, trust strip
3. **Pages:** Home → Services hub + 6 service pages (one template, accent colour per page) → Industries → Case studies listing + 6 details → Resources + 10 tag routes → About → Contact
4. **Interactions:** rocket scroll, orb animation, ticker, approach/tabs, case-study filters and carousel, video
5. **Form:** wire up the backend and test real delivery
6. **QA loop:** screenshot-diff at 320/375/430/768/1024/1280/1440/1920, fix, repeat; Lighthouse; a11y
7. **Production:** build, README, `.env.example`, testing doc, Hostinger guide

**Hosting:** Hostinger runs Next.js server apps only on **Business Web Hosting or Cloud (Startup/Professional/Enterprise)** plans, deployed as a "Web App" from GitHub or a ZIP. Premium/Single plans would force a static export, which can't run the contact form. *Which Hostinger plan do you have?*

## 10. Blockers / what I need from you

1. **Network access for downloads:** my build environment can't reach `www.neusix.com` or `cdn.prod.website-files.com` (blocked by the allowlist). To download the original assets and run screenshot comparisons, please allow these domains in claude.ai → Settings → Capabilities: `neusix.com`, `cdn.prod.website-files.com`, `fonts.googleapis.com`, `fonts.gstatic.com`. Without them I can still read pages through the browser, but pulling ~150 assets that way is slow and fragile.
2. **Content mistakes (section 7):** keep exactly as-is, or fix the obvious typos and dead links?
3. **Contact form destination:** which email address should receive submissions?
4. **Hostinger plan:** Business, Cloud, or something else?
