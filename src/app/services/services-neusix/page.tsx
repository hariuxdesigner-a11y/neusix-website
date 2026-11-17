import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Orbs } from "@/components/ui/Orbs";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { OurApproach } from "@/components/sections/OurApproach";
import { WhyNeuSix } from "@/components/sections/WhyNeuSix";
import { CommercialModels } from "@/components/sections/CommercialModels";
import { CtaBand } from "@/components/sections/CtaBand";
import { TrustStrip } from "@/components/sections/TrustStrip";

const title = "Our Services | AI Transformation, Modernization & Engineering | NeuSix";
const description =
  "NeuSix helps organizations modernize foundations, redesign workflows, and deploy production-grade AI built for reliability, governance, and ROI.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/services-neusix" },
  openGraph: { title, description, url: "/services/services-neusix" },
};

const STAGES = [
  {
    name: "Advisory",
    items: ["Strategy & opportunity map", "Use cases + Workflow/agent design", "Governance + Value measurement"],
    services: ["AI Transformation", "AI COE", "Digital Transformation"],
  },
  {
    name: "Development & Integration",
    items: ["Architecture + Orchestration", "RAG / retrieval + Data enablement", "Agent build + Integration"],
    services: ["AI Transformation", "ODC", "Software Engineering", "Modernization"],
  },
  {
    name: "Managed Services",
    items: ["Deploy + Monitor + Optimize", "Security + Controls", "Responsible AI + HITL governance"],
    services: ["Modernization", "AI COE", "Software Engineering", "ODC"],
  },
];

export default function ServicesHubPage() {
  return (
    <>
      <section aria-labelledby="hub-title" className="relative isolate overflow-hidden">
        <Orbs preset="hero" dim />
        <div className="container-x grid gap-10 py-[clamp(72px,10vw,150px)] lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <h1 id="hub-title" className="t-display max-w-[14ch]">
            Services designed to ship measurable outcomes
          </h1>
          <div className="reveal max-w-[460px]" style={{ ["--reveal-delay" as string]: "120ms" }}>
            <p className="text-base leading-relaxed">
              NeuSix helps organizations modernize foundations, redesign workflows, and deploy production-grade AI built for reliability, governance, and ROI.
            </p>
            <Button href="/contact-us" className="mt-6">
              Book a Free Consultation
            </Button>
          </div>
        </div>
      </section>

      <ServiceCards />

      <section aria-labelledby="trend-title" className="bg-ink text-paper">
        <div className="container-x py-[clamp(72px,9vw,140px)] text-center">
          <h2 id="trend-title" className="t-display reveal mx-auto max-w-[18ch]">
            We’re not trend-chasers. We’re problem-solvers.
          </h2>
          <p className="reveal mx-auto mt-6 max-w-[60ch] text-sm leading-relaxed text-paper/85 sm:text-base">
            Our services sit at the intersection of AI, automation, engineering, and business strategy so transformation doesn’t stay in slides; it shows up in operations.
          </p>
        </div>
      </section>

      <OurApproach />

      <section aria-labelledby="stages-title" className="bg-mist/60">
        <div className="container-x section-y">
          <div className="reveal mx-auto max-w-[760px] text-center">
            <h2 id="stages-title" className="t-h2">
              Stages of AI Workflow Transformation
            </h2>
            <p className="mt-4 text-sm leading-relaxed sm:text-base">
              Enterprises typically scale AI through three stages Advisory, Development &amp; Integration, and Managed Services. NeuSix supports all three stages while keeping our service offerings
              consistent.
            </p>
          </div>
          <ol className="mt-[clamp(32px,4vw,56px)] grid gap-4 md:grid-cols-3 md:gap-5">
            {STAGES.map((st, i) => (
              <li key={st.name} className="reveal flex flex-col rounded-card border border-lilac-soft bg-paper p-7" style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}>
                <span className="text-sm text-lilac">0{i + 1}</span>
                <h3 className="t-h4 mt-3">{st.name}</h3>
                <ul className="mt-5 space-y-3">
                  {st.items.map((t) => (
                    <li key={t} className="flex gap-2.5 text-sm leading-relaxed">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-lilac" />
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-6 text-sm font-semibold">Services in play:</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {st.services.map((sv) => (
                    <li key={sv} className="rounded-full bg-mist px-3 py-1.5 text-xs text-navy">
                      {sv}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <WhyNeuSix />
      <CommercialModels />
      <CtaBand />
      <TrustStrip />
    </>
  );
}
