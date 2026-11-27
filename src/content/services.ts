import type { MediaId } from "@/content/media";
/* Service content: copied verbatim from the live service pages (17 Nov 2026).
   Each page shares one template; `accent` drives the page colour theme. */

export type Accent = "purple" | "orange" | "yellow" | "red" | "violet" | "green";

export type Outcome = { label: string; value?: string; lottie: string; text: string };
export type Phase = { name: "Discover" | "Plan" | "Build" | "Scale"; text: string; outputs: string };

export type Service = {
  slug: string;
  href: string;
  name: string;            // card title
  cardText: string;        // card description
  cardGfx: string;         // outline line-art
  cardGfxWhite: string;    // hover / mobile white variant
  accent: Accent;
  seo: { title: string; description: string };
  hero: string;
  stage: { advisory: string[]; development: string[]; managed: string[]; gfx: [string, string, string] };
  intro?: { title: string; text: string; bullets?: boolean };
  whatWeDo: { title: string; text: string }[];
  outcomes: Outcome[];
  useCaseThemes?: string[];
  phases: Phase[];
  phaseIcons: [string, string, string, string];
  phaseNote?: string;
  whatYouGet: string[];
  wygGfx: string[];
};

const A = (f: string) => `/assets/${f}`;

export const SERVICES: Service[] = [
  {
    slug: "ai-transformation-page",
    href: "/services/ai-transformation-page",
    name: "AI Transformation",
    cardText: "Move from pilots to production with a governed roadmap, delivery engine, and measurable outcomes.",
    cardGfx: A("gfx-01-v1.svg"),
    cardGfxWhite: A("ai-transformation-white.svg"),
    accent: "purple",
    seo: {
      title: "AI Transformation Services | Strategy to Deployment | NeuSix",
      description:
        "Accelerate your AI journey with NeuSix's end-to-end AI transformation services, from strategy and model development to deployment, automation, and continuous optimisation.",
    },
    hero: "AI Transformation that moves from pilots to production",
    stage: {
      advisory: ["AI strategy, opportunity mapping, and use-case identification", "Agent workflow design and process engineering"],
      development: ["RAG/agent core, orchestration, and workflow enablement", "Agent development, evaluation, and production rollout"],
      managed: ["Deployment, monitoring, and learning/feedback loops", "Security, governance, and human-in-the-loop escalation"],
      gfx: [A("plays-gfx-01.svg"), A("plays-gfx-02.svg"), A("plays-gfx-03.svg")],
    },
    intro: {
      title: "What AI transformation means at NeuSix",
      text: "AI Transformation isn’t experimentation it’s outcomes. We embed with your teams to redesign workflows, modernize systems, and deliver AI that improves decisions, speed, cost, and quality at scale.",
    },
    whatWeDo: [
      { title: "AI-Powered Workflow Transformation", text: "Streamline and automate end-to-end workflows using intelligent orchestration and decision support." },
      { title: "Production-Grade AI Systems", text: "Models and AI services that run reliably in real environments: monitored, governed, integrated, continuously improved." },
      { title: "AI-Ready Modernization", text: "Modernize platforms, data foundations, and integration layers so AI can be deployed safely and repeatedly." },
    ],
    outcomes: [
      { label: "Reduce cycle time by", lottie: A("rotation1-3.lottie"), text: "through our existing workflow optimization and intelligent workflow automation with absolute decision support." },
      { label: "Cut operation cost by", lottie: A("rotate2-3.lottie"), text: "using our predictive and operations intelligence." },
      { label: "Improve reliability uptime by", value: "95-99%", lottie: A("battery-01.lottie"), text: "with modernization, observability, and resilience patterns" },
    ],
    useCaseThemes: ["Intelligent Automation", "Knowledge Assist", "Predictive Operations", "Decision Intelligence", "Experience Transformation"],
    phases: [
      { name: "Discover", text: "Align on outcomes, map opportunities, understand constraints, define what “impact” means.", outputs: "Use-case portfolio, workflow shortlist, success metrics." },
      { name: "Plan", text: "Roadmap, governance, success metrics, and a delivery plan that can run in the real world.", outputs: "AI solution blueprint, evaluation plan, rollout plan." },
      { name: "Build", text: "Co-creation sprints with stakeholders integrated into workflows, not isolated demos.", outputs: "Production-ready release, model/agent runbooks, dashboards." },
      { name: "Scale", text: "Monitoring, adoption, optimization, and expansion to adjacent use cases.", outputs: "Optimization backlog, scaling roadmap, governance cadence." },
    ],
    phaseIcons: [A("discover-purple.svg"), A("plan-purple.svg"), A("build-purple.svg"), A("scale-purple.svg")],
    whatYouGet: ["Use-case portfolio", "Roadmap", "Reference architecture", "Sprint delivery plan", "Governance guardrails", "Production rollout package"],
    wygGfx: [A("eclipsegfx-01.svg"), A("wyg-gfx-02.svg"), A("wyg-gfx-03.svg"), A("wyg-gfx-04.svg"), A("wyg-gfx-05.svg"), A("wyg-gfx-06.svg")],
  },
  {
    slug: "modernization",
    href: "/services/modernization",
    name: "Modernization",
    cardText: "Make legacy systems cloud-native and AI-ready, without disrupting critical operations.",
    cardGfx: A("gfx-02-v1.svg"),
    cardGfxWhite: A("modernization-white.svg"),
    accent: "orange",
    seo: {
      title: "Application & Infrastructure Modernization | NeuSix",
      description:
        "Migrate from legacy to modern with NeuSix's modernisation services: cloud migration, microservices adoption, API-first architecture, and platform re-engineering for enterprise agility.",
    },
    hero: "Modernize without breaking the business",
    stage: {
      advisory: ["AI-ready modernization blueprint and sequencing plan", "Risk, cost, and reliability baselining"],
      development: ["Cloud-native architecture, APIs, data connectivity, and platform enablement", "Observability, resilience patterns, and security posture upgrades"],
      managed: ["Performance and reliability monitoring, platform ops support", "Continuous optimization and cost control (BOT/BOM)"],
      gfx: [A("play-gfx-orange.svg"), A("play-gfx-orange2.svg"), A("play-gfx-orange3.svg")],
    },
    intro: {
      title: "What we modernize",
      text: "Applications • Data foundations • Integration/API layer • Cloud & infrastructure • Observability & reliability • Security posture",
      bullets: true,
    },
    whatWeDo: [
      { title: "Modernization Blueprint", text: "Target architecture, sequencing, risk plan, and dependency map." },
      { title: "Cloud-Native Foundations", text: "APIs, eventing, containerization, CI/CD, and operational guardrails." },
      { title: "Reliability + Security Upgrades", text: "Performance, resilience patterns, observability, access controls, and audit-ready practices." },
    ],
    outcomes: [
      { label: "Faster release", lottie: A("rotate1-1-1.json"), text: "through standardized delivery pipelines and modular architecture." },
      { label: "Lower run costs", lottie: A("rotate2-1.json"), text: "through infrastructure right-sizing and platform optimization." },
      { label: "Higher uptime", value: "99.5-99.9%", lottie: A("battery-01.lottie"), text: "using observability and resilience patterns" },
    ],
    phases: [
      { name: "Discover", text: "Assess application/data/infrastructure reality: cost, risk, reliability, bottlenecks.", outputs: "Modernization heatmap, risk register, baseline (cost + uptime + performance)." },
      { name: "Plan", text: "Define target architecture and phased modernization plan with safe cutovers.", outputs: "Target architecture, phased roadmap, cutover strategy." },
      { name: "Build", text: "Modernize incrementally: cloud-native enablement, APIs, observability, security hardening.", outputs: "Modernized services, CI/CD pipeline, monitoring/alerting." },
      { name: "Scale", text: "Stabilize and optimize: SRE rhythm, performance tuning, cost optimization.", outputs: "Reliability scorecard, runbooks, FinOps plan." },
    ],
    phaseIcons: [A("discover-orange.svg"), A("plan-orange.svg"), A("build-orange.svg"), A("scale-orange.svg")],
    phaseNote: "Think in systems. Move with intent. Measure what matters.",
    whatYouGet: ["Target architecture blueprint", "Modernization roadmap", "Cloud-native foundation", "Observability & resilience framework", "Security posture upgrade plan", "Cutover & migration runbook"],
    wygGfx: [1, 2, 3, 4, 5, 6].map((n) => A(`wyg-gfx-orange0${n}.svg`)),
  },
  {
    slug: "digital-transformation",
    href: "/services/digital-transformation",
    name: "Digital Transformation",
    cardText: "Redesign journeys and workflows using data + automation to improve speed, adoption, and experience.",
    cardGfx: A("group-56.svg"),
    cardGfxWhite: A("digital-transformation-white.svg"),
    accent: "yellow",
    seo: {
      title: "Digital Transformation Services | Modernise Operations & Scale | NeuSix",
      description:
        "Reimagine your business with NeuSix's digital transformation services. We help enterprises modernise legacy systems, adopt cloud-native architectures, and build data-driven operations.",
    },
    hero: "Transform work. Upgrade experiences.",
    stage: {
      advisory: ["Process engineering and workflow redesign", "Experience blueprint and value measurement model"],
      development: ["Automation implementation and workflow enablement", "AI-assisted decision support embedded into journeys"],
      managed: ["Outcome tracking, adoption support, and continuous improvement cycles", "Governance rhythm for sustained value"],
      gfx: [A("play-gfx-yellow.svg"), A("play-gfx-yellow2.svg"), A("play-gfx-yellow3.svg")],
    },
    intro: {
      title: "What we transform",
      text: "Customer journeys • Employee workflows • Service operations • Back-office processes • Digital product experiences",
      bullets: true,
    },
    whatWeDo: [
      { title: "Workflow Redesign + Automation", text: "Process simplification, orchestration, and intelligent automation." },
      { title: "Human-Centered Experience Design", text: "Interfaces and journeys built for adoption and clarity." },
      { title: "Measurement + Continuous Improvement", text: "KPIs, instrumentation, and iteration loops to improve outcomes quarter after quarter." },
    ],
    outcomes: [
      { label: "Cycle time reduction", lottie: A("20-35.json"), text: "via workflow redesign + automation" },
      { label: "Cost-to-serve reduction by", lottie: A("10-25.json"), text: "by removing friction and rework" },
      { label: "Higher adoption", value: "25-40%", lottie: A("battery-01.lottie"), text: "through user-first experience design and enablement" },
    ],
    phases: [
      { name: "Discover", text: "Map journeys and workflows, identify friction, quantify delays/rework, define outcome KPIs.", outputs: "Journey blueprint, process pain-point map, KPI baseline." },
      { name: "Plan", text: "Design the “to-be” workflow and experience; prioritize automation and decision points.", outputs: "Workflow specs, experience prototype, rollout plan." },
      { name: "Build", text: "Implement workflow enablement + automation; drive adoption with change support.", outputs: "Automated workflows, training assets, adoption playbook." },
      { name: "Scale", text: "Track outcomes and continuously improve; expand to adjacent journeys/teams.", outputs: "KPI dashboard, improvement backlog, expansion roadmap." },
    ],
    phaseIcons: [A("discover-yellow.svg"), A("plan-yellow.svg"), A("build-yellow.svg"), A("scale-yellow.svg")],
    phaseNote: "What we measure: cycle time, cost-to-serve, adoption, rework rate, satisfaction (where relevant).",
    whatYouGet: ["Workflow design", "Intelligent orchestration", "Experience architecture", "Automation & decision support layer", "Measurement & KPI framework", "Performance optimization"],
    wygGfx: [1, 2, 3, 4, 5, 6].map((n) => A(`wyg-gfx-yellow0${n}.svg`)),
  },
  {
    slug: "offshore-development-center",
    href: "/services/offshore-development-center",
    name: "Offshore Development Center (ODC)",
    cardText: "Dedicated delivery pods that extend your engineering capacity with clear ownership and rhythm.",
    cardGfx: A("frame-427319841-4.svg"),
    cardGfxWhite: A("white-icon.svg"),
    accent: "green",
    seo: {
      title: "Offshore Development Center (ODC) | Dedicated Teams | NeuSix",
      description:
        "Set up a dedicated offshore development centre with NeuSix. Access skilled engineering talent, transparent delivery models, and seamless integration with your in-house teams.",
    },
    hero: "An ODC that feels in-house. Ships like a product team.",
    stage: {
      advisory: ["Discovery squads and process engineering support"],
      development: ["Dedicated pods to build, integrate, test, and release", "Engineering capacity with clear ownership and delivery rhythm"],
      managed: ["Operate, enhance, and maintain with measurable SLAs and governance", "Continuous improvement and scaling support"],
      gfx: [A("play-gfx-green.svg"), A("play-gfx-green2.svg"), A("play-gfx-green3.svg")],
    },
    intro: {
      title: "Engagement models",
      text: "Pod-based delivery (outcome + sprint cadence) • Capacity extension (roadmap execution support) • Build-Operate-Transfer (ODC setup + maturity + handover)",
      bullets: true,
    },
    whatWeDo: [
      { title: "Dedicated Pods (Accountable Teams)", text: "Engineering, AI/ML, data, QA and DevOps, configured to your outcomes." },
      { title: "Operating Rhythm + Governance", text: "Cadences, KPIs, reporting, quality gates, and escalation paths." },
      { title: "Continuity + Security by Design", text: "Talent continuity plan, access controls, and compliance alignment to your policies." },
    ],
    outcomes: [
      { label: "Faster throughput", lottie: A("20-40.lottie"), text: "via stable pods and reduced context switching" },
      { label: "Production defects reduction", lottie: A("30-50.lottie"), text: "through standard QA and delivery gates" },
      { label: "On-time delivery rate", value: "90%+", lottie: A("battery-01.lottie"), text: "via governance and measurable operating rhythm" },
    ],
    phases: [
      { name: "Discover", text: "Define pod structure, governance, cadence, success metrics, and quality gates.", outputs: "Pod design, RACI, delivery cadence." },
      { name: "Plan", text: "Ramp plan + tooling + security access model + ways of working.", outputs: "Ramp plan, delivery playbook, access/security setup." },
      { name: "Build", text: "Execute sprints with predictable throughput, QA discipline, and transparent reporting.", outputs: "Sprint deliverables, quality reports, release notes." },
      { name: "Scale", text: "Optimize throughput and continuity; support BOT/BOM transitions if needed.", outputs: "SLA/KPI reporting, continuous improvement plan, transition plan." },
    ],
    phaseIcons: [A("discover-green.svg"), A("plan-green.svg"), A("build-green.svg"), A("scale-green.svg")],
    phaseNote: "What we measure: throughput, predictability, defect leakage, cycle time.",
    whatYouGet: ["Dedicated pods", "Cross-functional teams", "Outcome alignment", "Operating cadence", "Quality governance", "Secure continuity"],
    wygGfx: [1, 2, 3, 4, 5, 6].map((n) => A(`wyg-gfx-green0${n}.svg`)),
  },
  {
    slug: "ai-center-of-excellence",
    href: "/services/ai-center-of-excellence",
    name: "AI Center of Excellence (AI COE)",
    cardText: "Operating model, standards, governance, and enablement to scale AI across teams.",
    cardGfx: A("frame-427319841-5.svg"),
    cardGfxWhite: A("frame-427319841.png"),
    accent: "violet",
    seo: {
      title: "AI Center of Excellence (CoE) | Build Internal AI Capability | NeuSix",
      description:
        "Establish a high-impact AI Center of Excellence with NeuSix. We help you define governance, build reusable AI frameworks, upskill teams, and operationalise AI at enterprise scale.",
    },
    hero: "Build an AI capability that scales safely.",
    stage: {
      advisory: ["COE charter, operating model, decision rights, and governance design", "Standards for data, evaluation, security, and release processes"],
      development: ["Enablement, reusable patterns, accelerators, and MLOps blueprint", "Tooling strategy and platform discipline for production AI"],
      managed: ["Responsible AI governance, trust & compliance, HITL, escalation model", "Ongoing controls, monitoring, and maturity improvement"],
      gfx: [A("play-gfx-purple.svg"), A("play-gfx-purple2.svg"), A("play-gfx-purple3.svg")],
    },
    intro: {
      title: "What we establish",
      text: "AI governance frameworks • Operating models & standards • Evaluation & testing protocols • Responsible AI practices • Team enablement & training • MLOps & platform discipline",
      bullets: true,
    },
    // NOTE: the live AI COE page repeats the ODC "What we do" cards and "What we measure" line verbatim.
    // Kept as published; flagged in docs/CONTENT-NOTES.md for the client to supply COE-specific copy.
    whatWeDo: [
      { title: "Dedicated Pods (Accountable Teams)", text: "Engineering, AI/ML, data, QA and DevOps, configured to your outcomes." },
      { title: "Operating Rhythm + Governance", text: "Cadences, KPIs, reporting, quality gates, and escalation paths." },
      { title: "Continuity + Security by Design", text: "Talent continuity plan, access controls, and compliance alignment to your policies." },
    ],
    outcomes: [
      { label: "Faster AI use-case delivery across teams", lottie: A("2-3x.lottie"), text: "via reusable standards and accelerators" },
      { label: "fewer governance and compliance gaps", lottie: A("50-70.lottie"), text: "through clear governance and monitoring" },
      { label: "Increase in AI adoption by", value: "30–50%", lottie: A("battery-01.lottie"), text: "across business units through enablement and change management" },
    ],
    phases: [
      { name: "Discover", text: "Baseline maturity and define COE charter, decision rights, and governance objectives.", outputs: "COE charter, maturity baseline, governance map." },
      { name: "Plan", text: "Define standards and operating model: intake/prioritization, evaluation, security, release processes.", outputs: "Standards library, intake model, MLOps blueprint." },
      { name: "Build", text: "Enable teams with playbooks, templates, accelerators, and training; establish cadence.", outputs: "Enablement plan, reusable assets, adoption toolkit." },
      { name: "Scale", text: "Run governance operations: responsible AI, trust/compliance, HITL, escalation management.", outputs: "Governance cadence, risk controls, compliance evidence pack." },
    ],
    phaseIcons: [A("discover-violet.svg"), A("plan-violet.svg"), A("build-violet.svg"), A("scale-violet.svg")],
    phaseNote: "What we measure: throughput, predictability, defect leakage, cycle time.",
    whatYouGet: ["Operating model", "Design standards", "Risk governance", "Team enablement", "MLOps blueprint"],
    wygGfx: [1, 2, 3, 4, 5].map((n) => A(`wyg-gfx-purple0${n}.svg`)),
  },
  {
    slug: "software-engineering-services",
    href: "/services/software-engineering-services",
    name: "Software Engineering Services",
    cardText: "Secure, scalable products built with quality systems, observability, and long-term maintainability.",
    cardGfx: A("gfx-06-v4.svg"),
    cardGfxWhite: A("software-white.svg"),
    accent: "red",
    seo: {
      title: "Software Engineering Services | Custom Development & DevOps | NeuSix",
      description:
        "Build scalable, production-grade software with NeuSix. Our engineering teams deliver full-stack development, DevOps, CI/CD, quality engineering, and platform builds aligned to your roadmap.",
    },
    hero: "Engineering built for longevity.",
    stage: {
      advisory: ["Solution architecture, integration planning, and delivery blueprint", "Security and reliability guardrails for production systems"],
      development: ["Build scalable products, APIs, and agent-enabled systems", "Integration, testing, and observability by default"],
      managed: ["Application ops, monitoring, and continuous improvement releases", "Security hardening and incident readiness support"],
      gfx: [A("play-gfx-red.svg"), A("play-gfx-red2.svg"), A("play-gfx-red3.svg")],
    },
    intro: {
      title: "What we build",
      text: "Web & mobile products • APIs & integrations • Platforms & internal tools • DevOps & reliability systems • Quality engineering",
      bullets: true,
    },
    whatWeDo: [
      { title: "Product-Grade Delivery", text: "Architecture, engineering, and release discipline that scales." },
      { title: "Quality + Observability by Default", text: "Testing strategy, monitoring, performance baselines, and incident readiness." },
      { title: "Security by Design", text: "Access controls, secure SDLC practices, and compliance alignment." },
    ],
    outcomes: [
      { label: "Faster release cycles", lottie: A("30-50-ses.lottie"), text: "with stable quality gates" },
      { label: "99.5%+ uptime and", lottie: A("40-60.lottie"), text: "faster incident resolution via observability" },
      { label: "Maintenance effort reduction and rework", lottie: A("25-40-ses.lottie"), text: "via clean architecture and standards" },
    ],
    phases: [
      { name: "Discover", text: "Clarify product goals, constraints, integration needs, and non-functional requirements (NFRs).", outputs: "Architecture draft, NFRs, delivery plan." },
      { name: "Plan", text: "Finalize design and engineering plan: API contracts, testing strategy, security posture.", outputs: "Design specs, integration plan, test strategy." },
      { name: "Build", text: "Ship production-ready releases with CI/CD, automated testing, observability, security-by-design.", outputs: "Production releases, test automation, dashboards." },
      { name: "Scale", text: "Improve performance and reliability; expand roadmap and harden operations.", outputs: "Performance report, SRE runbooks, scale roadmap." },
    ],
    phaseIcons: [A("discover-red.svg"), A("plan-red.svg"), A("build-red.svg"), A("scale-red.svg")],
    phaseNote: "Think in systems. Move with intent. Measure what matters.",
    whatYouGet: ["Product delivery", "Architecture & engineering", "Testing strategy", "Security design", "Access controls"],
    wygGfx: [1, 2, 3, 4, 5].map((n) => A(`wyg-gfx-red0${n}.svg`)),
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

/** Order used on the home page / services hub cards. */
export const SERVICE_CARD_ORDER = [
  "ai-transformation-page",
  "modernization",
  "digital-transformation",
  "offshore-development-center",
  "ai-center-of-excellence",
  "software-engineering-services",
];

export const APPROACH_DEFAULT: { name: Phase["name"]; text: string; icon: string }[] = [
  { name: "Discover", text: "Align on outcomes, map opportunities, understand constraints, define what “impact” means.", icon: A("discover-01.svg") },
  { name: "Plan", text: "Roadmap, governance, success metrics, and a delivery plan that can run in the real world.", icon: A("plan-01.svg") },
  { name: "Build", text: "Co-creation sprints with stakeholders integrated into workflows, not isolated demos.", icon: A("build-01.svg") },
  { name: "Scale", text: "Monitoring, adoption, optimization, and expansion to adjacent use cases.", icon: A("scale-01.svg") },
];

export const WHY_NEUSIX = [
  { n: "01", title: "We co-create. We embed. We enable.", text: "We work inside real constraints (people, processes, systems), so transformation sticks." },
  { n: "02", title: "Built for leaders who want transformation, not tools.", text: "Enterprise-grade engineering with governance, reliability, and adoption designed in." },
  { n: "03", title: "Decisions, not just dashboards.", text: "We build intelligence that improves action, cycle time, cost, and quality, not just reporting." },
];

export const COMMERCIAL_MODELS = [
  { gfx: A("model-gfx-01.svg"), title: "Build & Transfer (B&T)", text: "NeuSix builds the solution and hands it over to your team with documentation, enablement, and transition support." },
  { gfx: A("model-gfx-02.svg"), title: "Build-Operate-Transfer (BOT)", text: "NeuSix builds and operates the solution for an agreed period, then transfers to your team once stable and adoption is proven." },
  { gfx: A("model-gfx-03.svg"), title: "Build-Operate-Maintain (BOM)", text: "NeuSix builds and continues to operate and maintain the solution long-term with clear SLAs, governance, and continuous improvement." },
];
export const COMMERCIAL_NOTE = "The right model depends on your internal capability maturity, timeline urgency, and governance needs.";

export const HOME_OUTCOMES = SERVICES[0].outcomes;

/**
 * One NeuSix colour system for every service page (Nov 2026: per-service colours removed for
 * consistency). The Accent keys stay on each service so a future theme could bring them back,
 * but every key now resolves to the brand palette.
 */
const BRAND_ACCENT = "#6d6eb5"; // lilac: lines, bars, soft washes
const BRAND_ACCENT_INK = "#403e8e"; // brand indigo: icons and small graphics on white (AA)
export const ACCENT_INK: Record<Accent, string> = { purple: BRAND_ACCENT_INK, violet: BRAND_ACCENT_INK, orange: BRAND_ACCENT_INK, yellow: BRAND_ACCENT_INK, red: BRAND_ACCENT_INK, green: BRAND_ACCENT_INK };
export const ACCENT_HEX: Record<Accent, string> = { purple: BRAND_ACCENT, violet: BRAND_ACCENT, orange: BRAND_ACCENT, yellow: BRAND_ACCENT, red: BRAND_ACCENT, green: BRAND_ACCENT };

/**
 * The footage that represents each service everywhere: home banner reel, the service page
 * banner and the home service cards. Swap a line here to change a service's video site-wide.
 */
export const SERVICE_CLIP: Record<string, MediaId> = {
  "ai-transformation-page": "svc-ai-transformation-page", // team working with holographic AI data screens
  modernization: "svc-modernization", // engineers upgrading a data centre
  "digital-transformation": "svc-digital-transformation", // team running the business from tablet dashboards
  "offshore-development-center": "svc-offshore-development-center", // diverse dedicated team at work
  "ai-center-of-excellence": "svc-ai-center-of-excellence", // leadership team reviewing data on a whiteboard
  "software-engineering-services": "svc-software-engineering-services", // developer at screens full of code
};
export const serviceClip = (slug: string) => SERVICE_CLIP[slug] ?? (`svc-${slug}` as MediaId);
