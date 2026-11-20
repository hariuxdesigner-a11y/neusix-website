import type { Metadata } from "next";
import Link from "next/link";
import { FEATURED_POST, SORTED_POSTS } from "@/content/resources";
import { WordRise } from "@/components/motion/WordRise";
import { NArch } from "@/components/brand/NArch";
import { VideoCtaCard } from "@/components/cinematic/Bands";
import { ArrowChip, LinkArrow } from "@/components/ui/Icon";
import { FeaturedPostCard, PostCard } from "@/components/blog/PostCard";
import { WhitePapersBand } from "@/components/blog/WhitePapers";
import { Breadcrumbs, JsonLd, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/content/site";

export const metadata: Metadata = pageMetadata("/resources");

const HUB = [
  { href: "/blog", label: "Blogs", text: "Focused articles on AI transformation, governance, AI COE, modernization, engagement models and ODC engineering." },
  { href: "/white-papers", label: "White Papers", text: "In-depth guides for enterprise leaders, from the AI transformation playbook to modernization without disruption." },
];

export default function ResourcesPage() {
  const latest = SORTED_POSTS.filter((p) => p.slug !== FEATURED_POST.slug).slice(0, 3);
  return (
    <>
      <Breadcrumbs items={[{ name: "Resources", path: "/resources" }]} />
      <JsonLd data={{ "@type": "CollectionPage", name: "NeuSix Resources", url: `${SITE_URL}/resources`, hasPart: [{ "@type": "Blog", "@id": `${SITE_URL}/blog#blog`, url: `${SITE_URL}/blog` }, { "@type": "CollectionPage", url: `${SITE_URL}/white-papers` }] }} />
      <header className="below-header relative isolate overflow-hidden">
        <NArch strokeWidth={26} className="pointer-events-none absolute right-[-4%] top-[18%] -z-10 hidden h-[115%] text-brand/[.07] lg:block" />
        <div className="container-x pb-[clamp(32px,4vw,56px)] pt-[clamp(48px,7vw,104px)]">
          <h1 className="t-display max-w-[18ch]">
            <WordRise>Resources & Content</WordRise>
          </h1>
          <p className="rise mt-5 max-w-[62ch] text-lg leading-relaxed text-body" style={{ ["--d" as string]: "300ms" }}>
            Blogs and white papers from NeuSix on AI transformation, modernization, AI Centers of Excellence, governance, engagement models and ODC engineering.
          </p>
          <ul className="stagger mt-[clamp(32px,4vw,56px)] grid gap-4 md:grid-cols-2">
            {HUB.map((h) => (
              <li key={h.href}>
                <Link href={h.href} className="group flex h-full items-start justify-between gap-6 rounded-card border border-ink/10 p-[clamp(22px,3vw,36px)] transition-colors hover:border-navy/40">
                  <span>
                    <span className="t-h3 block">{h.label}</span>
                    <span className="mt-3 block max-w-[48ch] text-[15px] leading-relaxed text-body">{h.text}</span>
                  </span>
                  <ArrowChip />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section aria-labelledby="latest" className="container-x pb-[var(--section-y)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="latest" className="t-h2 reveal">
            From the blog
          </h2>
          <Link href="/blog" className="group reveal inline-flex items-center gap-2 text-sm font-medium text-navy">
            All articles <LinkArrow />
          </Link>
        </div>
        <div className="reveal mt-[clamp(28px,3.5vw,48px)]">
          <FeaturedPostCard post={FEATURED_POST} headingLevel={3} />
        </div>
        <ul className="stagger mt-[clamp(16px,2vw,24px)] grid gap-[clamp(16px,2vw,24px)] sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </section>

      <WhitePapersBand />
      <VideoCtaCard />
    </>
  );
}
