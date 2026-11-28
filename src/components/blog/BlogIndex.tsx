import Link from "next/link";
import { BLOG_TAGS, FEATURED_POST, postsForTag, tagHref, tagLabel } from "@/content/resources";
import { TAG_SEO } from "@/content/seo";
import { WordRise } from "@/components/motion/WordRise";
import { NArch } from "@/components/brand/NArch";
import { FeaturedPostCard, PostCard } from "./PostCard";
import { WhitePapersBand } from "./WhitePapers";

/** Category filter: every option is a real, crawlable link. */
export function CategoryChips({ current }: { current: string }) {
  return (
    <nav aria-label="Blog categories" className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] [scrollbar-width:none]">
      <ul className="flex w-max gap-2 pb-1 lg:w-auto lg:flex-wrap">
        {BLOG_TAGS.map((t) => {
          const on = t.slug === current;
          return (
            <li key={t.slug}>
              <Link
                href={tagHref(t.slug)}
                aria-current={on ? "page" : undefined}
                className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-full border px-4 text-sm transition-colors ${
                  on ? "border-ink bg-ink text-paper" : "border-ink/15 text-ink hover:border-navy hover:text-brand"
                }`}
              >
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Blog listing, shared by /blog (tag "resources" = all) and /blog-tags/[tag]. */
export function BlogIndex({ tag }: { tag: string }) {
  const all = tag === "resources";
  const posts = postsForTag(tag);
  const featured = all ? FEATURED_POST : null;
  const grid = featured ? posts.filter((p) => p.slug !== featured.slug) : posts;
  return (
    <>
      <header className="below-header relative isolate overflow-hidden">
        <NArch strokeWidth={26} className="pointer-events-none absolute right-[-4%] top-[18%] -z-10 hidden h-[115%] text-brand/[.07] lg:block" />
        <div className="container-x pb-[clamp(28px,4vw,48px)] pt-[clamp(48px,7vw,104px)]">
          <p className="eyebrow rise text-brand">{all ? "NeuSix Blog" : "Blog category"}</p>
          <h1 className="t-display mt-3 max-w-[18ch]">
            <WordRise>{all ? "Insights on AI transformation" : tagLabel(tag)}</WordRise>
          </h1>
          <p className="rise mt-5 max-w-[62ch] text-lg leading-relaxed text-body" style={{ ["--d" as string]: "300ms" }}>
            {all
              ? "Practical perspectives from the NeuSix team on enterprise AI, modernization, governance, delivery models and the execution that turns strategy into measurable outcomes."
              : TAG_SEO[tag]?.intro}
          </p>
          <div className="rise mt-[clamp(28px,3.5vw,44px)]" style={{ ["--d" as string]: "450ms" }}>
            <CategoryChips current={tag} />
          </div>
        </div>
      </header>

      <section aria-label={all ? "All articles" : `${tagLabel(tag)} articles`} className="container-x pb-[calc(var(--section-y)/2)]">
        {featured && (
          <div className="reveal mb-[clamp(28px,3.5vw,48px)]">
            <FeaturedPostCard post={featured} />
          </div>
        )}
        {all && <h2 className="t-h2 mb-8">Latest articles</h2>}
        <ul className="stagger grid gap-[clamp(16px,2vw,24px)] sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} headingLevel={all ? 3 : 2} />
            </li>
          ))}
        </ul>
        {!all && (
          <p className="mt-10 text-sm">
            <Link href="/blog" className="font-medium text-navy underline underline-offset-4 hover:text-brand">
              See all articles
            </Link>
          </p>
        )}
      </section>

      <WhitePapersBand />
    </>
  );
}
