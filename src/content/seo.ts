/*
 * Search titles and descriptions (what Google shows in results) for every page.
 * Titles: ≤ 60 characters including "| NeuSix". Descriptions: 120–160 characters, unique per page.
 * Built from NeuSix's existing copy; edit freely.
 */
export type Seo = { title: string; description: string; og: string };

export const SEO: Record<string, Seo> = {
  "/": {
    title: "NeuSix | AI-Powered Enterprise Automation & Digital Innovation",
    description:
      "NeuSix is a DeepTech AI transformation company delivering enterprise AI, automation, modernization and software engineering—from pilots to production.",
    og: "home",
  },
  "/services/services-neusix": {
    title: "AI Transformation & Engineering Services | NeuSix",
    description:
      "NeuSix helps organizations modernize foundations, redesign workflows, and deploy production-grade AI—services designed to ship measurable outcomes.",
    og: "services",
  },
  "/services/ai-transformation-page": {
    title: "AI Transformation Services | Strategy to Deployment | NeuSix",
    description:
      "End-to-end AI transformation from NeuSix: strategy, use-case prioritization, production deployment and adoption that moves AI from pilots to production.",
    og: "svc-ai-transformation-page",
  },
  "/services/modernization": {
    title: "Application & Infrastructure Modernization | NeuSix",
    description:
      "Modernize legacy applications, data and infrastructure without breaking the business: cloud, data, API layers and observability by NeuSix.",
    og: "svc-modernization",
  },
  "/services/digital-transformation": {
    title: "Digital Transformation Services for Enterprises | NeuSix",
    description:
      "Redesign journeys and workflows with NeuSix digital transformation: process redesign, automation and AI-assisted decisions that improve speed and experience.",
    og: "svc-digital-transformation",
  },
  "/services/software-engineering-services": {
    title: "Software Engineering Services & DevOps | NeuSix",
    description:
      "Production-grade software engineering from NeuSix: full-stack development, cloud-native architecture, DevOps and quality engineering built for longevity.",
    og: "svc-software-engineering-services",
  },
  "/services/ai-center-of-excellence": {
    title: "AI Center of Excellence (CoE) Services | NeuSix",
    description:
      "Set up an AI Center of Excellence with NeuSix: governance, platforms, talent and a use-case pipeline that lets AI scale safely across the enterprise.",
    og: "svc-ai-center-of-excellence",
  },
  "/services/offshore-development-center": {
    title: "Offshore Development Center (ODC) | Dedicated Teams | NeuSix",
    description:
      "Build a dedicated Offshore Development Center with NeuSix: engineering talent that feels in-house, ships like a product team and is governed for quality.",
    og: "svc-offshore-development-center",
  },
  "/our-work/industries": {
    title: "Industries | AI Transformation Across Industries | NeuSix",
    description:
      "AI transformation for healthcare, BFSI, retail, manufacturing, aviation, logistics, energy, real estate and the public sector—built for the real world.",
    og: "industries",
  },
  "/our-work/case-studies": {
    title: "AI Transformation Case Studies | NeuSix",
    description:
      "NeuSix case studies in healthcare, legal, aviation, travel retail, ports and manufacturing: AI transformation that moves from pilots to production.",
    og: "case-studies",
  },
  "/case-studies/healthcare-life-sciences": {
    title: "AI Patient Growth & Lifetime Intelligence | NeuSix",
    description:
      "Healthcare & Life Sciences case study: lower CAC, stronger bookings and higher repeat visits with AI-powered patient growth and lifetime intelligence.",
    og: "cs-healthcare-life-sciences",
  },
  "/case-studies/legal": {
    title: "Enterprise LLM for Legal Research & Discovery | NeuSix",
    description:
      "Legal case study: an enterprise LLM layer for research and discovery that delivers faster discovery cycles, consistent synthesis and audit-ready outputs.",
    og: "cs-legal",
  },
  "/case-studies/airlines-aviation": {
    title: "Airline Biometrics, Digital Twin & Predictive AI | NeuSix",
    description:
      "Airlines case study: faster processing, smoother passenger journeys and stronger operational control with biometrics, a digital twin and predictive AI.",
    og: "cs-airlines-aviation",
  },
  "/case-studies/retail-consumer-travel-retail": {
    title: "AI-Powered Travel Retail Transformation | NeuSix",
    description:
      "Travel retail case study: more relevant shopping, better execution and stronger conversion with personalization, computer vision and inventory AI.",
    og: "cs-retail-consumer-travel-retail",
  },
  "/case-studies/logistics-ports": {
    title: "AI-Driven Port Control Tower | Case Study | NeuSix",
    description:
      "Logistics & Ports case study: an AI-driven port control tower for higher throughput, fewer delays and faster decisions with operational transparency.",
    og: "cs-logistics-ports",
  },
  "/case-studies/manufacturing-industrial": {
    title: "FMCG Food Manufacturing Automation | NeuSix",
    description:
      "Manufacturing case study: robotics, machine vision and a digital twin for FMCG food production—higher throughput, lower downtime, consistent quality.",
    og: "cs-manufacturing-industrial",
  },
  "/resources": {
    title: "AI Transformation Blogs & White Papers | NeuSix",
    description:
      "Blogs and white papers from NeuSix on AI transformation, modernization, AI COE, governance, engagement models and ODC engineering.",
    og: "resources",
  },
  "/about": {
    title: "About NeuSix | DeepTech AI Transformation Company",
    description:
      "NeuSix is a DeepTech AI transformation company helping enterprises discover, plan, build and scale intelligent systems that deliver measurable outcomes.",
    og: "about",
  },
  "/contact-us": {
    title: "Contact NeuSix | Book a Free AI Consultation",
    description:
      "Contact NeuSix to discuss AI transformation, modernization or software engineering. Book a free 30-minute consultation with our team.",
    og: "contact",
  },
  "/privacy-policy": {
    title: "Privacy Policy | NeuSix Technology Services",
    description:
      "How NeuSix Technology Services Private Limited collects, uses, shares and protects personal data, and the rights you have over your information.",
    og: "default",
  },
  "/terms-of-service": {
    title: "Terms of Service | NeuSix Technology Services",
    description:
      "The terms that apply when you use the NeuSix website, including acceptable use, intellectual property, disclaimers and governing law.",
    og: "default",
  },
  "/cookie-policy": {
    title: "Cookie Policy | NeuSix Technology Services",
    description:
      "Which cookies and similar technologies the NeuSix website uses, why, and how you can control them in your browser.",
    og: "default",
  },
};

/* Topic (blog tag) pages: unique heading copy so each page stands on its own in search. */
export const TAG_SEO: Record<string, { intro: string; description: string }> = {
  "engagement-models": {
    intro: "How to choose between build & transfer, build-operate-transfer and build-operate-manage—and what each model means for speed, control and cost.",
    description: "NeuSix articles on engagement models: build & transfer, build-operate-transfer and build-operate-manage, and how to choose the right one for your team.",
  },
  modernization: {
    intro: "Practical guidance on modernizing applications, data and infrastructure without breaking the business.",
    description: "NeuSix articles on modernization: moving legacy applications, data and infrastructure to modern platforms without disrupting the business.",
  },
  "ai-governance": {
    intro: "Governance, risk and reliability practices that let enterprise AI scale safely.",
    description: "NeuSix articles on AI governance: the controls, risk management and reliability practices that let enterprise AI scale safely and responsibly.",
  },
  "ai-coe": {
    intro: "Building an AI Center of Excellence: operating model, platforms, talent and a use-case pipeline.",
    description: "NeuSix articles on building an AI Center of Excellence: operating model, governance, platforms, talent and a use-case pipeline that scales.",
  },
  methodology: {
    intro: "The NeuSix Execution System—Discover, Plan, Build, Scale—and the methods behind shipping measurable impact.",
    description: "NeuSix articles on methodology: the Discover, Plan, Build, Scale execution system and the practices behind shipping measurable AI impact.",
  },
  "market-pov": {
    intro: "Our point of view on where enterprise AI and digital transformation are heading.",
    description: "NeuSix market point of view: where enterprise AI, automation and digital transformation are heading, and what it means for business leaders.",
  },
  "odc-engineering": {
    intro: "Running offshore development centers and engineering teams that ship like product teams.",
    description: "NeuSix articles on ODC and engineering: running offshore development centers and engineering teams that feel in-house and ship like product teams.",
  },
  "leadership-pov": {
    intro: "Perspectives from NeuSix leadership on AI strategy, transformation and value.",
    description: "Perspectives from NeuSix leadership on AI strategy, enterprise transformation, ROI and building the capabilities that make AI deliver value.",
  },
  "ai-transformation": {
    intro: "Moving AI from pilots to production: strategy, use cases, adoption and measurable outcomes.",
    description: "NeuSix articles on AI transformation: moving from pilots to production with the right strategy, use cases, adoption plan and measurable outcomes.",
  },
};
