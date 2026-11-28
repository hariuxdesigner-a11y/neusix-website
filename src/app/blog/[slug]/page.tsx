import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, formatDate, relatedPosts, tagHref, tagLabel } from "@/content/resources";
import { SERVICES } from "@/content/services";
import { SITE, SITE_URL } from "@/content/site";
import { getPost, postUrl } from "@/lib/blog";
import { Breadcrumbs, JsonLd, pageMetadata } from "@/lib/seo";
import { WordRise } from "@/components/motion/WordRise";
import { MediaPoster } from "@/components/media/MediaPoster";
import { NArch } from "@/components/brand/NArch";
import { VideoCtaCard } from "@/components/cinematic/Bands";
import { ArrowChip, Icon, LinkArrow } from "@/components/ui/Icon";
import { PostCard, TagPill } from "@/components/blog/PostCard";
import { ReadingProgress, ShareLinks, TocNav } from "@/components/blog/PostChrome";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const meta = pageMetadata(`/blog/${slug}`, { title: post.seoTitle ?? (`${post.title} | NeuSix`.length <= 60 ? `${post.title} | NeuSix` : post.title), description: post.description, type: "article", og: `blog-${slug}` });
  return {
    ...meta,
    keywords: post.keywords,
    authors: [{ name: "NeuSix Editorial Team", url: `${SITE_URL}/about` }],
    openGraph: { ...meta.openGraph, type: "article", publishedTime: post.date, modifiedTime: post.date, section: tagLabel(post.tag), tags: post.keywords },
  };
}

/** The service most related to each blog topic (sidebar call to action). */
const TOPIC_SERVICE: Record<string, string> = {
  "odc-engineering": "offshore-development-center",
  "market-pov": "ai-transformation-page",
  "ai-governance": "ai-transformation-page",
  "ai-transformation": "ai-transformation-page",
  "ai-coe": "ai-center-of-excellence",
  modernization: "modernization",
  "leadership-pov": "ai-transformation-page",
};

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const url = postUrl(slug);
  const service = SERVICES.find((s) => s.slug === TOPIC_SERVICE[post.tag]);
  const related = relatedPosts(slug, 3);
  const image = `${SITE_URL}/og/blog-${slug}.jpg`;

  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: tagLabel(post.tag), path: tagHref(post.tag) }, { name: post.title, path: `/blog/${slug}` }]} />
      <JsonLd
        data={{
          "@type": "BlogPosting",
          "@id": `${url}#article`,
          mainEntityOfPage: url,
          url,
          headline: post.title,
          description: post.description,
          image: [image],
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: "en-US",
          articleSection: tagLabel(post.tag),
          keywords: post.keywords.join(", "),
          wordCount: post.words,
          author: { "@type": "Organization", name: "NeuSix Editorial Team", url: `${SITE_URL}/about` },
          publisher: { "@id": `${SITE_URL}/#organization`, "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/icon-512.png` } },
          isPartOf: { "@type": "Blog", "@id": `${SITE_URL}/blog#blog`, name: "NeuSix Blog" },
        }}
      />
      {post.faq.length > 0 && (
        <JsonLd
          data={{
            "@type": "FAQPage",
            mainEntity: post.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      )}
      <ReadingProgress targetId="article-body" />

      <article className="flex flex-col">
        <header className="below-header relative isolate overflow-hidden">
          <NArch strokeWidth={26} className="pointer-events-none absolute right-[-6%] top-[14%] -z-10 hidden h-[110%] text-brand/[.06] lg:block" />
          <div className="container-x pt-[clamp(40px,6vw,88px)]">
            <nav aria-label="Breadcrumb" className="rise text-sm text-slate">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <li>
                  <Link href="/blog" className="hover:text-brand">
                    Blog
                  </Link>
                </li>
                <li aria-hidden>
                  <Icon name="chevron-right" size={14} />
                </li>
                <li>
                  <Link href={tagHref(post.tag)} className="hover:text-brand">
                    {tagLabel(post.tag)}
                  </Link>
                </li>
              </ol>
            </nav>
            <div className="mt-8 max-w-[880px]">
              <TagPill tag={post.tag} />
              <h1 className="t-display mt-4 !text-[clamp(2.1rem,1.4rem+2.8vw,3.75rem)]">
                <WordRise>{post.title}</WordRise>
              </h1>
              <p className="rise mt-6 max-w-[62ch] text-[clamp(1.05rem,1rem+.3vw,1.25rem)] leading-relaxed text-body" style={{ ["--d" as string]: "350ms" }}>
                {post.excerpt}
              </p>
            </div>
            <div className="rise mt-8 flex flex-wrap items-center justify-between gap-6 border-y border-ink/10 py-5" style={{ ["--d" as string]: "450ms" }}>
              <div className="flex items-center gap-3">
                <span aria-hidden className="flex size-11 items-center justify-center rounded-full bg-ink">
                  <NArch strokeWidth={70} draw={false} className="h-[20px] text-paper" />
                </span>
                <div className="text-sm">
                  <p className="font-medium text-ink">NeuSix Editorial Team</p>
                  <p className="text-slate">
                    <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readTime}
                  </p>
                </div>
              </div>
              <ShareLinks url={url} title={post.title} />
            </div>
          </div>
        </header>

        <div className="container-x mt-[clamp(28px,4vw,56px)]">
          <MediaPoster id={post.image} priority className="reveal aspect-[16/9] rounded-[clamp(16px,2vw,28px)] sm:aspect-[21/9]" sizes="(min-width: 1280px) 1200px, 94vw" />
        </div>

        <div className="container-x grid gap-[clamp(32px,5vw,80px)] pb-[clamp(56px,7vw,112px)] pt-[clamp(36px,5vw,72px)] lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)]">
          <div id="article-body" className="min-w-0 max-w-[74ch]">
            {/* mobile table of contents */}
            <details className="group mb-10 rounded-2xl border border-ink/10 lg:hidden">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 text-sm font-medium [&::-webkit-details-marker]:hidden">
                On this page
                <Icon name="chevron-down" size={16} className="transition-transform group-open:rotate-180" />
              </summary>
              <ol className="space-y-2 border-t border-ink/10 px-5 py-4 text-[15px]">
                {post.toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="text-slate hover:text-brand">
                      {t.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            {post.takeaways.length > 0 && (
              <aside aria-labelledby="takeaways" className="relative isolate mb-12 overflow-hidden rounded-card bg-mist p-[clamp(22px,3vw,36px)]">
                <NArch strokeWidth={36} draw={false} className="absolute -right-6 -top-4 -z-10 h-[150%] text-brand/[.08]" />
                <h2 id="takeaways" className="eyebrow text-brand">
                  Key takeaways
                </h2>
                <ul className="mt-5 space-y-3">
                  {post.takeaways.map((t) => (
                    <li key={t} className="flex gap-3 text-[16px] leading-relaxed text-ink">
                      <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-orange" />
                      {t}
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            <div className="prose-neusix prose-article" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />

            {post.faq.length > 0 && (
              <section aria-labelledby="faq" className="mt-14">
                <h2 id="faq" className="t-h3 scroll-mt-28">
                  Frequently asked questions
                </h2>
                <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
                  {post.faq.map((f, i) => (
                    <details key={f.q} className="group" open={i === 0}>
                      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                        <h3 className="text-[17px] font-medium">{f.q}</h3>
                        <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-full bg-mist transition-transform duration-300 group-open:rotate-45">
                          <Icon name="plus" size={16} />
                        </span>
                      </summary>
                      <div className="prose-neusix pb-6 pr-12 text-body" dangerouslySetInnerHTML={{ __html: f.aHtml }} />
                    </details>
                  ))}
                </div>
              </section>
            )}

            {post.outroHtml && <div className="prose-neusix prose-article mt-4" dangerouslySetInnerHTML={{ __html: post.outroHtml }} />}

            <footer className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-ink/10 pt-8">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-slate">Filed under</span>
                <Link href={tagHref(post.tag)} className="rounded-full border border-ink/15 px-3 py-1.5 hover:border-navy hover:text-brand">
                  {tagLabel(post.tag)}
                </Link>
              </div>
              <ShareLinks url={url} title={post.title} />
            </footer>

            <div className="mt-10 flex gap-5 rounded-card border border-ink/10 p-6">
              <span aria-hidden className="flex size-14 shrink-0 items-center justify-center rounded-full bg-ink">
                <NArch strokeWidth={70} draw={false} className="h-[24px] text-paper" />
              </span>
              <div>
                <p className="font-medium text-ink">NeuSix Editorial Team</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-body">
                  Perspectives from the NeuSix team of AI, engineering and transformation practitioners, drawn from our work helping enterprises move AI from pilots to production.
                </p>
                <Link href="/about" className="group mt-3 inline-flex items-center gap-2 text-sm font-medium text-navy">
                  About NeuSix <LinkArrow />
                </Link>
              </div>
            </div>
          </div>

          <aside className="hidden lg:order-first lg:block">
            <div className="sticky top-[calc(var(--header-h)+24px)] space-y-8">
              <TocNav items={post.toc} />
              {service ? (
                <Link href={service.href} className="group relative isolate block overflow-hidden rounded-card bg-ink p-6 text-paper">
                  <NArch strokeWidth={34} draw={false} className="absolute -bottom-10 -right-8 -z-10 h-[150%] text-lilac-soft/20" />
                  <span className="eyebrow text-lilac-soft">Related service</span>
                  <span className="t-h4 mt-3 block">{service.name}</span>
                  <span className="mt-2 block text-[14px] leading-relaxed text-paper/80">{service.cardText}</span>
                  <span className="mt-6 flex justify-end">
                    <ArrowChip tone="dark" />
                  </span>
                </Link>
              ) : (
                <Link href="/contact-us" className="group relative isolate block overflow-hidden rounded-card bg-ink p-6 text-paper">
                  <NArch strokeWidth={34} draw={false} className="absolute -bottom-10 -right-8 -z-10 h-[150%] text-lilac-soft/20" />
                  <span className="eyebrow text-lilac-soft">Talk to NeuSix</span>
                  <span className="t-h4 mt-3 block">Book a Free Consultation</span>
                  <span className="mt-2 block text-[14px] leading-relaxed text-paper/80">A 30-minute call to map a practical path to measurable impact.</span>
                  <span className="mt-6 flex justify-end">
                    <ArrowChip tone="dark" />
                  </span>
                </Link>
              )}
            </div>
          </aside>
        </div>
      </article>

      <section aria-labelledby="related" className="section-band border-t border-ink/5 bg-mist/50">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="related" className="t-h2 reveal">
              Keep reading
            </h2>
            <Link href="/blog" className="group reveal inline-flex items-center gap-2 text-sm font-medium text-navy">
              All articles <LinkArrow />
            </Link>
          </div>
          <ul className="stagger mt-[clamp(28px,3.5vw,48px)] grid gap-[clamp(16px,2vw,24px)] sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <VideoCtaCard />
    </>
  );
}
