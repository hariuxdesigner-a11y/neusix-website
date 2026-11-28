import type { Metadata } from "next";
import { IndustryExplorer } from "@/components/industries/IndustryExplorer";
import { VideoHero } from "@/components/cinematic/VideoHero";
import { SectionHead, VideoCtaCard } from "@/components/cinematic/Bands";
import { ApproachBand } from "@/components/cinematic/HomeBlocks";
import { INDUSTRIES, PROBLEMS } from "@/content/industries";
import { Breadcrumbs, pageMetadata } from "@/lib/seo";

// The live page has no meta description and the title "Industries landing page"; these use its own hero copy.
export const metadata: Metadata = pageMetadata("/our-work/industries");

export default function IndustriesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Industries", path: "/our-work/industries" }]} />
      <div className="contents">
        <VideoHero
          media="industries-hero"
          eyebrow="Our Work"
          title="AI transformation across industries built to survive the real world."
          primary={{ label: "Book a Free Consultation", href: "/contact-us" }}
          secondary={{ label: "Case Studies", href: "/our-work/case-studies" }}
        />
        <IndustryExplorer items={INDUSTRIES} />
        <section aria-labelledby="problems-title" className="section-band bg-mist/70">
          <div className="container-x">
            <SectionHead id="problems-title" eyebrow="Challenges" title="The Problems We Solve" sub="What most industries actually need from AI" />
            <ul className="stagger mt-[clamp(32px,4vw,56px)] grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {PROBLEMS.map((p, i) => (
                <li key={p.title} className="flex flex-col rounded-card bg-paper p-6 ring-1 ring-ink/[.05] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(49,49,104,.45)] sm:min-h-[240px]">
                  <span className="flex items-center gap-3 text-sm text-brand">
                    <span aria-hidden className="h-px w-6 bg-brand" />0{i + 1}
                  </span>
                  <h3 className="t-h4 mt-4 sm:mt-auto sm:pt-10">{p.title}</h3>
                  <p className="mt-2 text-sm text-body">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <ApproachBand />
      <VideoCtaCard />
    </>
  );
}
