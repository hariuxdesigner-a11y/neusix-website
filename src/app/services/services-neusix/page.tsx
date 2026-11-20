import type { Metadata } from "next";
import { CommercialModels } from "@/components/sections/CommercialModels";
import { VideoHero } from "@/components/cinematic/VideoHero";
import { SectionHead, StatementBand, VideoCtaCard } from "@/components/cinematic/Bands";
import { ApproachBand, ServiceShowcase, WhyBand } from "@/components/cinematic/HomeBlocks";
import { Breadcrumbs, JsonLd, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/content/site";
import { SERVICES as SERVICE_LIST } from "@/content/services";

export const metadata: Metadata = pageMetadata("/services/services-neusix");

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
      <Breadcrumbs items={[{ name: "Services", path: "/services/services-neusix" }]} />
      <JsonLd data={{ "@type": "ItemList", name: "NeuSix services", itemListElement: SERVICE_LIST.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.name, url: `${SITE_URL}${s.href}` })) }} />
      <VideoHero
        media="services-hero"
        size="tall"
        eyebrow="Services"
        title="Services designed to ship measurable outcomes"
        text="NeuSix helps organizations modernize foundations, redesign workflows, and deploy production-grade AI built for reliability, governance, and ROI."
        primary={{ label: "Book a Free Consultation", href: "/contact-us" }}
      />

      <ServiceShowcase eyebrow="Services" />

      <StatementBand media="services-stages" id="trend-title" title="We’re not trend-chasers. We’re problem-solvers.">
        Our services sit at the intersection of AI, automation, engineering, and business strategy so transformation doesn’t stay in slides; it shows up in operations.
      </StatementBand>

      <ApproachBand />

      <section aria-labelledby="stages-title" className="section-y">
        <div className="container-x">
          <SectionHead
            id="stages-title"
            title="Stages of AI Workflow Transformation"
            text="Enterprises typically scale AI through three stages Advisory, Development & Integration, and Managed Services. NeuSix supports all three stages while keeping our service offerings consistent."
          />
          <ol className="stagger mt-[clamp(32px,4vw,56px)] grid gap-px overflow-hidden rounded-[22px] bg-ink/10 md:grid-cols-3">
            {STAGES.map((st, i) => (
              <li key={st.name} className="flex flex-col bg-paper p-7 transition-colors duration-300 hover:bg-mist/60 sm:p-8">
                <span className="text-sm text-brand">0{i + 1}</span>
                <h3 className="t-h3 mt-8">{st.name}</h3>
                <ul className="mt-5 space-y-3">
                  {st.items.map((t) => (
                    <li key={t} className="flex gap-2.5 text-sm leading-relaxed">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-lilac" />
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-8 text-sm font-semibold">Services in play:</p>
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

      <WhyBand />
      <CommercialModels />
      <VideoCtaCard />
    </>
  );
}
