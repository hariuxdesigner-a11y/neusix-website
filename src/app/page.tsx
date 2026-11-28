import type { Metadata } from "next";
import { ProofStrip } from "@/components/cinematic/ProofStrip";
import { StatementBand, VideoCtaCard, SectionHead } from "@/components/cinematic/Bands";
import { CompetencyShowcase, type Competency } from "@/components/cinematic/CompetencyShowcase";
import { ApproachBand, OutcomeShowcase, ResourcesTeaser, ServiceShowcase, WhyBand } from "@/components/cinematic/HomeBlocks";
import { HOME_OUTCOMES } from "@/content/services";
import { SITE } from "@/content/site";
import { FAQS } from "@/content/extras";
import { ClientMarquee, FaqSection, ImpactCases, IndustriesStrip } from "@/components/cinematic/Extras";
import { HomeHero } from "@/components/cinematic/HomeHero";
import { ServiceLibrary } from "@/components/cinematic/ServiceLibrary";
import { pageMetadata } from "@/lib/seo";
import type { MediaId } from "@/content/media";

export const metadata: Metadata = pageMetadata("/");

/** Home banner only: the capability lines the banner cycles through, each with its own footage. */
const HERO_LINES: { label: string; media: MediaId }[] = [
  { label: "Enterprise AI", media: "home-hero" },
  { label: "Edge AI", media: "hero-edge-ai" },
  { label: "Physical AI", media: "hero-physical-ai" },
  { label: "Digital Twins", media: "hero-digital-twins" },
  { label: "AR / VR / MR / XR", media: "hero-xr" },
];

const COMPETENCIES: Competency[] = [
  {
    label: "Extended Reality",
    code: "XR",
    media: "comp-xr",
    icon: "xr",
    title: "See the work before it exists.",
    body: "We build AR, VR and mixed-reality tools for training, remote assistance and design review, so teams can rehearse, inspect and decide inside a faithful model of the real thing.",
    uses: ["Immersive training", "Remote expert assistance", "Spatial design review"],
    area: "AR / VR / XR / MR",
  },
  {
    label: "Enterprise Automation",
    code: "AUT",
    media: "comp-automation",
    icon: "automation",
    title: "Work that runs itself, with people in charge.",
    body: "We combine document AI, agents and workflow orchestration to take repetitive steps out of finance, operations and service, with approvals and audit trails built in.",
    uses: ["Document processing", "Agentic workflows", "Exception handling"],
    area: "Enterprise AI",
  },
  {
    label: "Robotics",
    code: "ROB",
    media: "comp-robotics",
    icon: "robotics",
    title: "Machines that see, plan and act safely.",
    body: "From perception to motion planning, we build the software that lets robots, drones and autonomous equipment work alongside people on the floor and in the field.",
    uses: ["Pick and inspect", "Autonomous navigation", "Teleoperation"],
    area: "Physical AI",
  },
  {
    label: "Quantum Computing",
    code: "QC",
    media: "comp-quantum",
    icon: "quantum",
    title: "Ready for the next class of compute.",
    body: "We help teams find the optimization and simulation problems where quantum and quantum-inspired methods could pay off, and run focused pilots that test them honestly.",
    uses: ["Readiness assessment", "Optimization pilots", "Quantum-inspired solvers"],
  },
  {
    label: "Blockchain",
    code: "BCH",
    media: "comp-blockchain",
    icon: "blockchain",
    title: "Records every party can trust.",
    body: "We design shared-ledger workflows for provenance, verifiable credentials and settlement, so partners can exchange data without reconciling it all over again.",
    uses: ["Supply-chain provenance", "Verifiable credentials", "Tokenized assets"],
    area: "Blockchain",
  },
  {
    label: "IoT",
    code: "IOT",
    media: "comp-iot",
    icon: "iot",
    title: "Every asset, connected and understood.",
    body: "We connect sensors and machines from plant floor to field, stream their data reliably, and turn it into alerts, dashboards and digital twins.",
    uses: ["Condition monitoring", "Fleet telemetry", "Remote control"],
    area: "IoT",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero
        media={HERO_LINES.map((l) => l.media)}
        eyebrow="Shipping Impact"
        title="Harnessing AI to create relevance, not just competence"
        lede="We modernize systems, redesign how work gets done, and deploy production-grade AI that delivers measurable business impact."
        primary={{ label: "Book a Free Consultation", href: "/contact-us" }}
        secondary={{ label: "Explore Services", href: "/services/services-neusix" }}
        labels={HERO_LINES.map((l) => l.label)}
        next={{ label: "See how we deliver", href: "#after-hero" }}
      />
      <div id="after-hero" className="scroll-mt-[var(--header-h)]" />

      <ClientMarquee />

      <ProofStrip
        stats={[
          { value: "10+", label: "engagements delivered" },
          { value: "98%", label: "client satisfaction" },
          { value: "160+", label: "years of combined applied research experience" },
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

      <ServiceLibrary />

      <section aria-labelledby="competencies-title" className="section-y">
        <div className="container-x">
          <SectionHead id="competencies-title" title="Our competencies" />
          <div className="mt-[clamp(32px,4vw,56px)]">
            <CompetencyShowcase items={COMPETENCIES} />
          </div>
        </div>
      </section>

      <ServiceShowcase />
      <IndustriesStrip />
      <ApproachBand />
      <OutcomeShowcase items={HOME_OUTCOMES} />
      <ImpactCases />
      <WhyBand />
      <FaqSection items={FAQS} />
      <VideoCtaCard />
      <ResourcesTeaser />
    </>
  );
}
