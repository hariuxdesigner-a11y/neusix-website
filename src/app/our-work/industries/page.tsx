import type { Metadata } from "next";
import { IndustryExplorer } from "@/components/industries/IndustryExplorer";
import { VideoHero } from "@/components/cinematic/VideoHero";
import { SectionHead, VideoCtaCard } from "@/components/cinematic/Bands";
import { ApproachBand } from "@/components/cinematic/HomeBlocks";
import { INDUSTRIES, PROBLEMS } from "@/content/industries";

// The live page has no meta description and the title "Industries landing page"; these use its own hero copy.
const title = "Industries | AI Transformation Across Industries | NeuSix";
const description = "AI transformation across industries built to survive the real world.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/our-work/industries" },
  openGraph: { title, description, url: "/our-work/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <div className="bg-ink text-paper">
        <VideoHero
          media="industries-hero"
          eyebrow="Our Work"
          title="AI transformation across industries built to survive the real world."
          primary={{ label: "Book a Free Consultation", href: "/contact-us" }}
          secondary={{ label: "Case Studies", href: "/our-work/case-studies" }}
        />
        <IndustryExplorer items={INDUSTRIES} />
        <section aria-labelledby="problems-title" className="section-y border-t border-white/10">
          <div className="container-x">
            <SectionHead id="problems-title" dark title="The Problems We Solve" sub="What most industries actually need from AI" />
            <ul className="stagger mt-[clamp(32px,4vw,56px)] grid gap-px overflow-hidden rounded-[22px] bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
              {PROBLEMS.map((p, i) => (
                <li key={p.title} className="flex flex-col bg-ink p-6 transition-colors duration-300 hover:bg-navy/40 sm:min-h-[220px]">
                  <span className="text-sm text-lilac-bright">0{i + 1}</span>
                  <h3 className="t-h4 mt-4 sm:mt-auto sm:pt-10">{p.title}</h3>
                  <p className="mt-2 text-sm text-paper/85">{p.text}</p>
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
