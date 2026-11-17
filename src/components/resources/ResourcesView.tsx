import Link from "next/link";
import { BLOG_TAGS, WHITE_PAPERS, postHref, postsForTag, tagLabel } from "@/content/resources";

function ItemLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = /^https?:/.test(href);
  const cls = "group block py-6 transition-colors hover:text-brand focus-visible:text-brand";
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
    <div className="container-x pb-[var(--section-y)] pt-[clamp(48px,7vw,104px)]">
      <h1 className="t-display">Resources &amp; Content</h1>

      <section aria-labelledby="blogs-title" className="mt-[clamp(40px,5vw,72px)] max-w-[760px]">
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

        <ul className="mt-6 divide-y divide-mist-2 border-b border-mist-2">
          {posts.map((p) => (
            <li key={p.title}>
              <ItemLink href={postHref(p)}>
                <h3 className="text-base font-medium leading-snug">{p.title}</h3>
                <p className="mt-1.5 flex items-center gap-2 text-xs text-slate">
                  <span>{tagLabel(p.tag)}</span>
                  <span aria-hidden className="h-3 w-px bg-slate/50" />
                  <span>{p.readTime}</span>
                </p>
              </ItemLink>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="wp-title" className="mt-[clamp(56px,7vw,96px)] max-w-[760px]">
        <h2 id="wp-title" className="t-h2">
          White papers
        </h2>
        <ul className="mt-6 divide-y divide-mist-2 border-b border-mist-2">
          {WHITE_PAPERS.map((w) => (
            <li key={w.title}>
              <ItemLink href={w.href}>
                <h3 className="text-base font-medium leading-snug">{w.title}</h3>
                <p className="mt-1.5 text-sm text-slate">{w.text}</p>
              </ItemLink>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
