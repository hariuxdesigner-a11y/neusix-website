import type { Metadata } from "next";
import Link from "next/link";
import { WHITE_PAPERS } from "@/content/resources";
import { SITE_URL } from "@/content/site";
import { WordRise } from "@/components/motion/WordRise";
import { NArch } from "@/components/brand/NArch";
import { VideoCtaCard } from "@/components/cinematic/Bands";
import { LinkArrow } from "@/components/ui/Icon";
import { WhitePaperCard } from "@/components/blog/WhitePapers";
import { Breadcrumbs, JsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/white-papers");

export default function WhitePapersPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "White Papers", path: "/white-papers" }]} />
      <JsonLd
        data={{
          "@type": "CollectionPage",
          name: "NeuSix White Papers",
          url: `${SITE_URL}/white-papers`,
          publisher: { "@id": `${SITE_URL}/#organization` },
          hasPart: WHITE_PAPERS.map((w) => ({ "@type": "Report", name: w.title, description: w.text, url: w.href })),
        }}
      />
      <header className="below-header relative isolate overflow-hidden">
        <NArch strokeWidth={26} className="pointer-events-none absolute right-[-4%] top-[18%] -z-10 hidden h-[115%] text-brand/[.07] lg:block" />
        <div className="container-x pb-[clamp(32px,4vw,56px)] pt-[clamp(48px,7vw,104px)]">
          <p className="eyebrow rise text-brand">White papers</p>
          <h1 className="t-display mt-3 max-w-[18ch]">
            <WordRise>In-depth guides for enterprise leaders</WordRise>
          </h1>
          <p className="rise mt-5 max-w-[62ch] text-lg leading-relaxed text-body" style={{ ["--d" as string]: "300ms" }}>
            Practical, long-form guides from NeuSix on AI transformation, building an AI Center of Excellence, and modernizing legacy systems without disrupting the business.
          </p>
        </div>
      </header>
      <section aria-label="White papers" className="container-x pb-[var(--section-y)]">
        <ul className="stagger grid gap-[clamp(16px,2vw,24px)] md:grid-cols-3">
          {WHITE_PAPERS.map((w, i) => (
            <li key={w.title}>
              <WhitePaperCard paper={w} index={i} headingLevel={2} />
            </li>
          ))}
        </ul>
        <div className="mt-[clamp(48px,6vw,88px)] grid gap-8 border-t border-ink/10 pt-[clamp(32px,4vw,56px)] lg:grid-cols-[1fr_1.4fr]">
          <h2 className="t-h3 reveal">Who these guides are for</h2>
          <div className="reveal space-y-4 text-[17px] leading-relaxed text-body">
            <p>
              Each white paper is written for executives and technology leaders who need to make decisions, not just understand trends. They combine strategy with the practical detail needed to act: operating models, governance, sequencing and the measures that show progress.
            </p>
            <p>
              Use the AI Transformation Playbook to move from curiosity to a prioritized, governed roadmap. Use the AI Center of Excellence guide to design, launch and scale a CoE that delivers sustained value. Use Modernization Without Disruption to plan how legacy systems become AI-ready, cloud-native platforms while the business keeps running.
            </p>
          </div>
        </div>
        <div className="reveal mt-[clamp(40px,5vw,72px)] flex flex-wrap items-center justify-between gap-6 rounded-card bg-mist p-[clamp(22px,3vw,36px)]">
          <div>
            <p className="t-h4">Prefer shorter reads?</p>
            <p className="mt-2 text-[15px] text-body">Our blog covers the same topics in focused, practical articles.</p>
          </div>
          <Link href="/blog" className="group inline-flex items-center gap-2 text-sm font-medium text-navy">
            Read the blog <LinkArrow />
          </Link>
        </div>
      </section>
      <VideoCtaCard />
    </>
  );
}
