import type { Metadata } from "next";
import { VideoHero } from "@/components/cinematic/VideoHero";
import { ProofStrip } from "@/components/cinematic/ProofStrip";
import { StatementBand, VideoCtaCard, SectionHead } from "@/components/cinematic/Bands";
import { VideoTabs } from "@/components/cinematic/VideoTabs";
import { ApproachBand, OutcomeShowcase, ResourcesTeaser, ServiceShowcase, WhyBand } from "@/components/cinematic/HomeBlocks";
import { HOME_OUTCOMES } from "@/content/services";
import { getCaseStudy } from "@/content/case-studies";
import { SITE } from "@/content/site";
import { FAQS } from "@/content/extras";
import { ClientMarquee, FaqSection, ImpactCases, IndustriesStrip } from "@/components/cinematic/Extras";
import { LineIcon } from "@/components/motion/LineIcon";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/");

const COMPETENCIES = [
  { label: "Extended Reality", media: "comp-xr", icon: "/assets/comp-extended-reality.svg" },
  { label: "Enterprise Automation", media: "comp-automation", icon: "/assets/comp-enterprise-automation.svg" },
  { label: "Robotics", media: "comp-robotics", icon: "/assets/comp-robotics.svg" },
  { label: "Quantum Computing", media: "comp-quantum", icon: "/assets/comp-quantum-computing.svg" },
  { label: "Block Chain", media: "comp-blockchain", icon: "/assets/comp-block-chain.svg" },
  { label: "IoT", media: "comp-iot", icon: "/assets/comp-iot.svg" },
] as const;

export default function HomePage() {
  const featured = getCaseStudy("logistics-ports")!;
  return (
    <>
      <VideoHero
        media="home-hero"
        eyebrow="Shipping Impact"
        title="Harnessing AI to create relevance, not just competence"
        primary={{ label: "Book a Free Consultation", href: "/contact-us" }}
        secondary={{ label: "Explore Services", href: "/services/services-neusix" }}
        pill={{ label: `Case Study | ${featured.industry}`, title: featured.title, href: `/case-studies/${featured.slug}` }}
      />

      <ClientMarquee />

      <ProofStrip
        stats={[
          { value: "10+", label: "engagements delivered" },
          { value: "98%", label: "client satisfaction" },
          { value: "15+", label: "years applied experience" },
        ]}
      />

      <StatementBand
        media="home-purpose"
        id="purpose-title"
        align="split"
        title="Purpose-built AI transformation. Measurable outcomes"
        ctas={[
          { label: "Explore Services", href: "/services/services-neusix" },
          { label: "Book a Free Consultation", href: "/contact-us" },
        ]}
      >
        NeuSix helps organizations move beyond competence to true relevance by modernizing systems, redesigning how work gets done, and deploying production-grade AI that delivers real operational and
        business impact.
      </StatementBand>

      <section aria-labelledby="competencies-title" className="section-y">
        <div className="container-x">
          <SectionHead id="competencies-title" title="Our competencies" />
          <div className="mt-[clamp(32px,4vw,56px)]">
            <VideoTabs tabs={COMPETENCIES.map((c) => ({ ...c, icon: <LineIcon src={c.icon} className="size-full" /> }))} />
          </div>
        </div>
      </section>

      <ServiceShowcase />
      <IndustriesStrip />
      <ApproachBand />
      <OutcomeShowcase items={HOME_OUTCOMES} />
      <ImpactCases exclude={featured.slug} />
      <WhyBand />
      <FaqSection items={FAQS} />
      <VideoCtaCard />
      <ResourcesTeaser />
    </>
  );
}
