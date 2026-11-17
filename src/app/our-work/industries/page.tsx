import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Orbs } from "@/components/ui/Orbs";
import { IndustryExplorer } from "@/components/industries/IndustryExplorer";
import { OurApproach } from "@/components/sections/OurApproach";
import { CtaBand } from "@/components/sections/CtaBand";
import { TrustStrip } from "@/components/sections/TrustStrip";
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
    <div className="bg-ink text-paper">
      <section aria-labelledby="ind-hero" className="relative isolate overflow-hidden">
        <Orbs preset="dark" dim />
        <div className="container-x flex min-h-[clamp(440px,calc(100svh-var(--header-h)),860px)] flex-col items-center justify-center py-20 text-center">
          <h1 id="ind-hero" className="t-display max-w-[20ch]">
            AI transformation across industries built to survive the real world.
          </h1>
          <Button href="/contact-us" className="reveal mt-10">
            Book a Free Consultation
          </Button>
        </div>
      </section>

      <IndustryExplorer items={INDUSTRIES} />

      <section aria-labelledby="problems-title" className="section-y">
        <div className="container-x">
          <div className="reveal text-center">
            <h2 id="problems-title" className="t-h2">
              The Problems We Solve
            </h2>
            <p className="mt-2 text-sm text-paper/80 sm:text-base">What most industries actually need from AI</p>
          </div>
          <ul className="mx-auto mt-[clamp(32px,4vw,56px)] grid max-w-[1100px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEMS.map((p, i) => (
              <li
                key={p.title}
                className="reveal flex min-h-[180px] flex-col justify-end rounded-card border border-white/10 bg-white/[.03] p-6 transition-colors hover:border-lilac/60"
                style={{ ["--reveal-delay" as string]: `${(i % 3) * 100}ms` }}
              >
                <h3 className="t-h4">{p.title}</h3>
                <p className="mt-2 text-sm text-paper/80">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <OurApproach dark />
      <CtaBand dark />
      <TrustStrip dark />
    </div>
  );
}
