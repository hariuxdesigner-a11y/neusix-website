# Blog articles

Each article is one Markdown file here, `<slug>.md`, published at `/blog/<slug>`.

## Add an article
1. Create `src/content/blog/<slug>.md`:

   ```md
   ---
   seoTitle: Optional shorter search title (max 60 characters)
   description: 120 to 160 character search description.
   keywords: keyword one, keyword two, keyword three
   takeaways:
   - First key takeaway.
   - Second key takeaway.
   ---

   Intro paragraphs...

   ## Section heading        <- becomes a table-of-contents entry
   ### Sub heading

   ## Frequently asked questions   <- optional; becomes the FAQ accordion + FAQPage data
   ### A question?
   The answer.

   ## Closing section
   ```
2. Add an entry to `BLOG_POSTS` in `src/content/resources.ts` (slug, title, tag, image, date, readTime, excerpt).
3. Optional: run `ONLY='^blog-<slug>' node scripts/make-og.mjs` with the site running to create its share image.

The article then appears on /blog, its category page, the sitemap, the home page "Resources & Content" grid
and (if set as `FEATURED_POST`) the Resources menu.

## Current articles
The ten headlines are the ones published on the live NeuSix site. The article bodies were written for this
site (November 2026) by the NeuSix Editorial Team byline: no statistics, client names or results are claimed.
Review them before going live.
