import Link from "next/link";
import { BLOG_TAGS, WHITE_PAPERS, postHref, postsForTag, tagLabel } from "@/content/resources";
import { WordRise } from "@/components/motion/WordRise";

function ItemLink({ href, children, tone = "line" }: { href: string; children: React.ReactNode; tone?: "line" | "mist" }) {
  const external = /^https?:/.test(href);
  const cls = `group flex h-full flex-col rounded-[18px] p-6 transition-colors hover:text-brand ${tone === "mist" ? "bg-mist/70 hover:bg-mist" : "border border-ink/10 hover:border-navy"}`;
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Resources listing, shared by /resources and /blog-tags/[tag]. */
export function ResourcesView({ tag }: { tag: string }) {
  const posts = postsForTag(tag);
  const current = tagLabel(tag);
  return (
    <div className="below-header container-x pb-[var(--section-y)]">
      <div className="pt-[clamp(48px,7vw,104px)]" />
      <h1 className="t-display">
        <WordRise>Resources & Content</WordRise>
      </h1>

      <section aria-labelledby="blogs-title" className="mt-[clamp(40px,5vw,72px)]">
        <h2 id="blogs-title" className="t-h2">
          Blogs
        </h2>
        <div className="mt-4">
          <p className="text-sm font-semibold" id="filter-label">
            Filter by:
          </p>
          {/* Native disclosure: works without JavaScript, every option is a real link (crawlable tag pages). */}
          <details className="group relative mt-2 w-full max-w-[260px]">
            <summary
              aria-describedby="filter-label"
              className="flex min-h-11 cursor-pointer list-none items-center justify-between rounded-lg border border-mist-2 bg-paper px-4 text-sm [&::-webkit-details-marker]:hidden"
            >
              {current}
              <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" className="transition-transform group-open:rotate-180">
                <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-mist-2 bg-paper py-1 shadow-lg">
              {BLOG_TAGS.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={t.slug === "resources" ? "/resources" : `/blog-tags/${t.slug}`}
                    aria-current={t.slug === tag ? "page" : undefined}
                    className="block px-4 py-2.5 text-sm hover:bg-mist aria-[current=page]:font-semibold aria-[current=page]:text-brand"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>

        <ul className="stagger mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.title}>
              <ItemLink href={postHref(p)}>
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-lilac">
                  <span aria-hidden className="size-1.5 rounded-full bg-orange" /> {tagLabel(p.tag)}
                </span>
                <h3 className="mt-5 text-lg font-medium leading-snug">{p.title}</h3>
                <span className="mt-auto block pt-8 text-xs text-slate">{p.readTime}</span>
              </ItemLink>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="wp-title" className="mt-[clamp(56px,7vw,96px)]">
        <h2 id="wp-title" className="t-h2">
          White papers
        </h2>
        <ul className="stagger mt-8 grid gap-4 lg:grid-cols-3">
          {WHITE_PAPERS.map((w) => (
            <li key={w.title}>
              <ItemLink href={w.href} tone="mist">
                <span className="text-xs uppercase tracking-[0.12em] text-slate">White paper</span>
                <h3 className="t-h4 mt-4">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{w.text}</p>
              </ItemLink>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
