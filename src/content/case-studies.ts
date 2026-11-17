/* Case studies: copied verbatim from https://www.neusix.com/case-studies/* (17 Nov 2026).
   Add a new case study by appending an object here; listing, filters, detail page,
   sitemap and "related" carousel pick it up automatically. */

export type Highlight = { value?: string; label: string; trend?: "up" | "down" };
export type Stage = { label: string; title: string; body: string[] };

export type CaseStudy = {
  slug: string;
  industry: string;
  title: string;
  impact: string;
  tags: string[];
  filters: { industry: string; services: string[]; themes: string[] };
  card: Highlight[];
  executive: { paragraphs: string[]; flow?: string; bullets?: string[]; bulletsIntro?: string; highlightsTitle?: string; highlights?: string[] };
  outcomeHighlights: string[];
  context: { intro: string; points: string[]; outro: string };
  challenge: { intro: string; bottlenecks: string[] };
  shipped: { intro: string; groups: { title: string; items: string[] }[] };
  howItWorks: { title: string; stages: Stage[] };
  outcomes: { title: string; items: string[] }[];
  measured: { title: string; text: string }[];
  governance: { intro?: string; items: string[] };
};

export const FILTER_GROUPS = {
  industry: ["Healthcare", "Legal", "Retail", "Airlines", "Manufacturing", "BFSI", "Logistics"],
  services: [
    "AI Transformation",
    "Modernization",
    "Software Engineering",
    "AI COE",
    "Digital Transformation",
    "ODC",
    "Decision Intelligence",
    "Automation",
    "LLM Layer",
    "Control Tower",
    "Digital Twin",
    "Computer Vision",
  ],
  themes: ["Governance", "Vision", "Predictive Ops", "Personalization"],
} as const;

const ADOPTION = { title: "Adoption:", text: "active users, repeat usage, workflow completion rates" };

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "healthcare-life-sciences",
    industry: "Healthcare & Life Sciences",
    title: "AI-Powered Patient Growth & Lifetime Intelligence",
    impact: "Lower CAC, stronger bookings, higher repeat visits — with transparency at every step",
    tags: ["AI Transformation", "Decision Intelligence", "Workflow Automation", "CRM Enablement", "Growth & Retention"],
    filters: { industry: "Healthcare", services: ["AI Transformation", "Decision Intelligence", "Automation"], themes: ["Personalization"] },
    card: [
      { value: "2.8x", label: "ROAS achieved", trend: "up" },
      { value: "28%", label: "Conversion increase", trend: "up" },
      { value: "22%", label: "CAC reduction", trend: "down" },
    ],
    executive: {
      paragraphs: [
        "NeuSix partnered with a multi-location healthcare network (hospitals and specialty/aesthetic clinics) to build an end-to-end Patient Growth & Lifetime Intelligence system—a governed AI layer that improves performance across the full patient lifecycle:",
      ],
      flow: "Acquire → Convert → Retain → Grow",
      bulletsIntro: "Instead of optimizing campaigns in isolation, the organization moved to a measurable operating system connecting:",
      bullets: [
        "Lead + campaign intelligence",
        "Persona-driven engagement",
        "Sales enablement with contextual scripts and objection handling",
        "CRM-ready call summaries and next-best-actions",
        "Lifetime intelligence (repeat, LTV, churn risk) with automated reactivation",
      ],
    },
    outcomeHighlights: ["36% consult booking conversion rate achieved", "-22% CAC reduction", "2.8x ROAS uplift", "+15 locations deployed"],
    context: {
      intro: "The client operates a network of hospitals and specialty clinics across multiple locations. Patient acquisition and conversion happen through a blend of:",
      points: ["Paid + organic campaigns", "Web forms and inbound calls", "WhatsApp/chat conversations", "Contact center / front-desk follow-ups", "CRM logging and appointment scheduling"],
      outro: "Leadership’s goal was to build a **repeatable growth engine** that drives consistent outcomes across locations while remaining governed, measurable, and operationally adoptable.",
    },
    challenge: {
      intro: "Despite strong demand, performance varied widely across locations even with similar marketing investments.",
      bottlenecks: [
        "Leads arrived with inconsistent data and duplicates",
        "Limited visibility into what drives bookings (beyond dashboards)",
        "Uneven follow-up discipline and conversion handling across teams",
        "No persona-driven approach to engagement and call flows",
        "Scripts and objection handling depended heavily on individual skill",
        "Post-consult / post-treatment lifecycle was under-leveraged: repeat visits, dormant users, churn risk, and cross-sell",
      ],
    },
    shipped: {
      intro: "NeuSix shipped a modular system spanning acquisition, conversion, and lifetime value—designed for multi-location healthcare operations.",
      groups: [
        {
          title: "Pillar A — Lead & Campaign Intelligence (Acquire)",
          items: [
            "Lead ingestion + validation + enrichment",
            "De-duplication and unified lead schema",
            "AI scoring engine (conversion likelihood + score drivers)",
            "Persona clustering (tone, budget sensitivity, urgency)",
            "Campaign intelligence and channel optimization",
            "Segmenting for targeting and retargeting",
          ],
        },
        {
          title: "Pillar B — Sales Enablement & Script Intelligence (Convert)",
          items: [
            "AI Script Generator — contextual call script based on lead score, persona, interest, and budget sensitivity",
            "Persona-Based Script Customization — adjust tone (luxury / price-sensitive / urgency-driven)",
            "Objection Handling AI — real-time rebuttals (price, time constraints, trust, alternatives)",
            "Call Summary Generator — structured notes auto-created for CRM logging",
            "Conversion Recommendation Engine — next best action (discount / follow-up timing / alternate service)",
            "Script Performance Analytics — track which scripts drive higher booking rates",
          ],
        },
        {
          title: "Pillar C — Customer Lifetime Intelligence (Retain & Grow)",
          items: [
            "Repeat Purchase Prediction — repurchase probability based on history and service type",
            "Dormant User Detection — identify customers inactive after X days post-service",
            "Cross-Sell Recommendation — suggest next best treatment/service",
            "Reactivation Trigger Automation — WhatsApp/Email/SMS based on probability drop or dormancy",
            "Churn Risk Alerts — flag reduced engagement or negative sentiment signals",
            "Retargeting Audience Sync — push dormant/high-LTV segments to Meta/Google Ads",
          ],
        },
      ],
    },
    howItWorks: {
      title: "How It Works (Lifecycle Flow)",
      stages: [
        {
          label: "Stage 1",
          title: "Acquire (Lead + Campaign Intelligence)",
          body: [
            "Leads from ads/forms/calls/WhatsApp enter a unified pipeline",
            "Data is validated, standardized, and de-duplicated",
            "Leads are scored and clustered into personas",
            "Campaign intelligence identifies what works and what wastes spend",
            "Segments are synced to ad platforms for improved targeting and retargeting",
          ],
        },
        {
          label: "Stage 2",
          title: "Convert (Script Intelligence + Conversion Decision Support)",
          body: [
            "When a lead is assigned, the contact center / sales team receives a dynamic script tailored to: lead score, persona, interest area, and budget sensitivity",
            "Script tone auto-adjusts based on persona positioning",
            "Objection handling AI suggests real-time responses during calls",
            "Post-call, the system generates a CRM-ready call summary",
            "Next-best-action engine recommends follow-up timing, offers, or alternatives",
            "Script analytics connects scripts to booking outcomes and creates an improvement loop",
          ],
        },
        {
          label: "Stage 3",
          title: "Retain & Grow (Lifetime Intelligence + Reactivation Automation)",
          body: [
            "Customers are scored for repeat probability, churn risk, and LTV",
            "Dormant customers are detected and flagged",
            "Cross-sell recommendations are generated based on history",
            "Reactivation triggers run targeted WhatsApp/Email/SMS campaigns",
            "Segments are synced to ad platforms for lifecycle retargeting",
          ],
        },
      ],
    },
    outcomes: [
      { title: "Performance Outcomes (representative)", items: ["36% consult booking conversion rate achieved", "-22% reduction in CAC", "2.8× ROAS uplift"] },
      // NOTE: as published on the live page (reads like manufacturing copy); flagged in docs/CONTENT-NOTES.md
      { title: "Operational Outcomes", items: ["Reduced variance across shifts and operators", "Faster detection of issues and reduced rework", "Higher predictability in production flow and quality handling"] },
      {
        title: "Lifetime Outcomes (typical impact areas)",
        items: ["Increased repeat visits through prediction + targeted reactivation", "Higher LTV through cross-sell recommendations", "Reduced churn risk through early alerts and intervention"],
      },
    ],
    measured: [
      { title: "Acquisition", text: "CAC, ROAS, lead quality index, lead-to-contact SLA" },
      { title: "Conversion", text: "consult booking conversion rate (overall + by persona), script performance, objection patterns, follow-up compliance" },
      { title: "Retention", text: "repeat rate, dormant % trend, reactivation conversion, churn risk distribution, LTV uplift" },
    ],
    governance: {
      items: [
        "Role-based access controls for lead and customer data",
        "Audit trails for AI recommendations (why a lead was scored / why an action was suggested)",
        "Monitoring for data pipeline health and drift signals",
        "Human-in-the-loop controls for discounting and sensitive actions",
        "Standardization templates to scale adoption across locations",
      ],
    },
  },
  {
    slug: "legal",
    industry: "Legal",
    title: "Enterprise LLM Layer for Legal Research & Discovery",
    impact: "Faster discovery cycles, consistent synthesis, audit-ready outputs",
    tags: ["AI Transformation", "LLM", "Semantic Retrieval", "Knowledge Assist", "Governance"],
    filters: { industry: "Legal", services: ["AI Transformation", "LLM Layer"], themes: ["Governance"] },
    card: [{ label: "Search across 1,254 documents and 4.2M pages" }, { label: "Evidence summaries with 98% confidence (internal scoring)" }],
    executive: {
      paragraphs: [
        "NeuSix partnered with a legal organization handling complex, document-heavy matters to deliver an Enterprise LLM Layer that transforms legal research and discovery from keyword-only workflows into governed, evidence-linked intelligence.",
        "The solution enables teams to ask questions in natural language, retrieve relevant evidence across massive corpuses, and generate structured outputs—while maintaining strong governance, traceability, and access control.",
      ],
      highlightsTitle: "Outcome Highlights (representative)",
      highlights: [
        "Enabled research and synthesis across 1,254 documents totaling 4.2M pages",
        "Evidence summaries generated with 98% confidence (internal scoring)",
        "Faster path from question → evidence → structured summary",
        "Improved defensibility through source-linked answers and auditability",
      ],
    },
    outcomeHighlights: [
      "Enabled search and synthesis across 1,254 documents and 4.2M pages",
      "Evidence summaries generated with 98% confidence (internal scoring)",
      "More consistent structure and formatting of summaries across teams",
      "Reduced analyst time spent on repetitive search and synthesis",
      "Faster path from question → evidence → structured summary → export",
      "Source-linked answers (citations + audit trail)",
      "Strong governance to support confidentiality and compliance expectations",
    ],
    context: {
      intro: "The client’s teams routinely work with large collections of legal documents and case materials. Their outcomes depend on:",
      points: ["Speed of finding relevant evidence", "Consistency of summaries and reasoning", "Confidentiality and access control", "Auditability and defensibility of outputs", "Repeatability across matters and teams"],
      outro: "They needed an AI solution that was **practical, explainable, and safe**—not a generic chatbot.",
    },
    challenge: {
      intro: "Traditional workflows were slowing down research and increasing effort.",
      bottlenecks: [
        "Keyword-only search limitations: Relevant evidence was missed due to phrasing mismatch, inconsistent tagging, and limited semantic understanding.",
        "Slow synthesis + variability in output quality: Analysts manually summarized findings, leading to uneven depth and formatting.",
        "Low trust without traceability: Legal workflows require “show me the evidence,” not answers without citations.",
        "Governance constraints: Confidentiality, role-based access, and audit trails are mandatory.",
        "High cost of repetition: Similar questions were repeatedly researched across matters, consuming analyst bandwidth.",
      ],
    },
    shipped: {
      intro: "NeuSix shipped an Enterprise LLM Layer designed for legal research and discovery—built to be evidence-first, governed, and scalable.",
      groups: [
        {
          title: "Retrieval Foundation (RAG Core)",
          items: [
            "Semantic retrieval across unstructured and structured sources",
            "Chunking and metadata strategy aligned to legal use cases",
            "Evidence-first response grounding (answers tied to sources)",
          ],
        },
        {
          title: "Governed LLM Reasoning Layer",
          items: ["Responses constrained by retrieved evidence", "Structured output templates (summaries, issue outlines, timelines)", "Confidence scoring (internal) and consistency checks"],
        },
        {
          title: "Trust, Security & Governance",
          items: ["Role-based access controls (zero-trust style)", "Audit trail for query → retrieval → response → cited sources", "Guardrails for safe behavior and controlled outputs"],
        },
        {
          title: "Analyst Workflow Enablement",
          items: ["Natural-language Q&A interface", "“Find → Cite → Summarize → Export” workflows", "Reusable prompt patterns aligned to legal tasks"],
        },
      ],
    },
    howItWorks: {
      title: "How It Works (Explainable by Design)",
      stages: [
        { label: "Stage 1", title: "Retrieve", body: ["The system retrieves relevant passages using semantic search and metadata filters across the entire corpus."] },
        { label: "Stage 2", title: "Ground", body: [] },
        {
          label: "Stage 3",
          title: "Structure",
          body: ["Outputs follow legal-friendly formats:", "Evidence summaries", "Issue-based outlines", "Timeline extraction", "Consistency/contradiction checks (where applicable)"],
        },
        { label: "Stage 4", title: "Govern", body: ["Every interaction is controlled and auditable:", "Who accessed what", "What was retrieved", "What was generated", "What sources were cited"] },
      ],
    },
    outcomes: [
      { title: "Scale & Coverage", items: ["Enabled search and synthesis across 1,254 documents and 4.2M pages"] },
      { title: "Quality & Confidence", items: ["Evidence summaries generated with 98% confidence (internal scoring)", "More consistent structure and formatting of summaries across teams"] },
      { title: "Productivity", items: ["Reduced analyst time spent on repetitive search and synthesis", "Faster path from question → evidence → structured summary → export"] },
      { title: "Trust & Defensibility", items: ["Source-linked answers (citations + audit trail)", "Strong governance to support confidentiality and compliance expectations"] },
    ],
    measured: [
      { title: "Coverage & retrieval quality:", text: "precision, recall (internal evaluation), citation rate" },
      { title: "User productivity:", text: "time-to-first-evidence, time-to-summary, repeat query reduction" },
      { title: "Trust & safety:", text: "access policy compliance, audit completeness, controlled output adherence" },
      ADOPTION,
    ],
    governance: {
      intro: "This was shipped as a governance-first system (not a “general-purpose chatbot”):",
      items: [
        "Role-based access controls aligned to confidentiality",
        "Evidence-only grounded generation with citations",
        "Auditability of all outputs",
        "Controlled templates for consistent, review-friendly formats",
        "Human review pathways for critical outputs",
      ],
    },
  },
  {
    slug: "airlines-aviation",
    industry: "Airlines / Aviation",
    title: "Digital Passenger Experience Transformation (Biometrics + Digital Twin + Predictive AI)",
    impact: "Faster processing, smoother journeys, stronger operational control — at scale",
    tags: ["Experience Transformation", "Biometrics", "Digital Twin", "Predictive AI", "Operations Intelligence"],
    filters: { industry: "Airlines", services: ["Digital Transformation", "Digital Twin", "Computer Vision"], themes: ["Predictive Ops", "Vision"] },
    card: [{ value: "35–40%", label: "reduction in processing time (biometric flow)", trend: "down" }, { label: "Passenger authenticated in less than 3 seconds" }],
    executive: {
      paragraphs: [
        "NeuSix partnered with an airline/aviation ecosystem to modernize the passenger journey using a combination of biometric authentication, digital twin simulation, and predictive intelligence.",
        "The objective was clear: reduce friction in high-volume passenger flows while improving safety, reliability, and operational transparency.",
      ],
    },
    outcomeHighlights: [
      "35–40% reduction in processing time through biometric passenger flow",
      "Passenger authenticated in <3 seconds",
      "Improved journey continuity and operational efficiency across checkpoints",
      "Foundation built for scalable, data-driven passenger experience upgrades",
    ],
    context: {
      intro: "Aviation environments operate under intense constraints:",
      points: [
        "Peak passenger surges",
        "High-security requirements",
        "Multiple handoffs across checkpoints",
        "Dependency on real-time coordination between teams and systems",
        "Need for predictable processing times to reduce congestion and delays",
      ],
      outro: "The client’s growth and network expansion required passenger operations that could scale without degrading experience.",
    },
    challenge: {
      intro: "Passenger experience and operational flow were constrained by fragmentation and manual friction.",
      bottlenecks: [
        "Fragmented passenger identity and flow: Multiple checks created delays, queues, and inconsistent experience.",
        "High variance during peak surges: Processing time varied significantly by time of day, staffing, and operational disruptions.",
        "Limited ability to simulate and plan improvements: Changes to passenger flows were hard to test safely before deployment.",
        "Visibility gaps across checkpoints: Leaders needed clear visibility into what’s congested, what’s breaking next, and what actions to take.",
      ],
    },
    shipped: {
      intro: "NeuSix delivered a modular passenger experience and operational intelligence layer.",
      groups: [
        {
          title: "Biometric Passenger Flow (Identity & Access)",
          items: ["Facial recognition-based passenger authentication", "Faster identity verification across checkpoints", "Integration logic to support operational flow continuity"],
        },
        {
          title: "Digital Twin for Journey & Terminal Flow",
          items: ["Simulation of passenger movement and checkpoint capacity", "Scenario planning for peak surges and layout changes", "“Test before deploy” approach to reduce operational risk"],
        },
        {
          title: "Predictive Intelligence Layer",
          items: ["Early warning indicators for congestion build-up", "Predictive insights for staffing and flow optimization", "Operational decision support to reduce delays"],
        },
        {
          title: "Experience Enhancements (Optional Layer)",
          items: ["Smart wayfinding concepts (AR/VR-type guidance, where applicable)", "Service experience improvements through better flow continuity"],
        },
        {
          title: "Operational Transparency Cockpit",
          items: ["Visibility into processing times, queues, and bottlenecks", "Exception flags and resolution workflows", "Measurement-driven continuous improvement cadence"],
        },
      ],
    },
    howItWorks: {
      title: "How It Works (Explainable by Design)",
      stages: [
        { label: "Stage 1:", title: "Authenticate Fast (Biometrics)", body: ["Passengers are authenticated in < 3 seconds, reducing repeated manual identity friction."] },
        { label: "Stage 2:", title: "Model the System (Digital Twin)", body: ["Journey flows are simulated under different load and staffing scenarios to identify bottlenecks before live rollout."] },
        {
          label: "Stage 3:",
          title: "Predict and Act (AI Decision Support)",
          body: ["Predictive intelligence highlights upcoming congestion and suggests actions—staffing adjustments, lane changes, or flow interventions."],
        },
        { label: "Stage 4:", title: "Measure and Improve", body: ["Operational telemetry provided transparency into drivers of downtime and quality loss, enabling continuous improvement."] },
      ],
    },
    outcomes: [
      // NOTE: "Experience Outcomes" as published on the live page (reads like the retail copy); flagged in docs/CONTENT-NOTES.md
      { title: "Experience Outcomes (representative)", items: ["Personalized recommendations achieved 85–96% match (model scoring)", "Improved ability to tailor content and offers by persona and context"] },
      {
        title: "Operational Outcomes",
        items: ["Better peak management through predictive insights", "Improved coordination and faster response to congestion and exceptions", "Enhanced visibility into flow performance and bottleneck drivers"],
      },
      {
        title: "Strategic Impact",
        items: [
          "Foundation created for scalable passenger experience modernization",
          "Reduced operational risk in upgrades through digital twin simulation",
          "Stronger long-term capability for data-driven journey optimization",
        ],
      },
    ],
    measured: [
      { title: "Flow performance:", text: "processing time, queue length, throughput, peak variance" },
      { title: "Biometric performance:", text: "authentication success rate, time-to-authenticate, exception handling rate" },
      { title: "Operational readiness:", text: "congestion risk indicators, staffing alignment signals" },
      { title: "Experience indicators:", text: "friction points reduced, journey continuity measures" },
      ADOPTION,
    ],
    governance: {
      intro: "What We Measured (Shipping Transparency)",
      items: [
        "Flow performance: processing time, queue length, throughput, peak variance",
        "Biometric performance: authentication success rate, time-to-authenticate (< 3s), exception handling rate",
        "Operational readiness: congestion risk indicators, staffing alignment signals",
        "Experience indicators: friction points reduced, journey continuity measures",
        "Adoption: usage of cockpit dashboards, action completion rates",
      ],
    },
  },
  {
    slug: "retail-consumer-travel-retail",
    industry: "Retail & Consumer (Travel Retail)",
    title: "AI‑Powered Travel Retail Transformation (Personalization + CV + Inventory Intelligence)",
    impact: "More relevant shopping, better execution, stronger conversion readiness — with measurable transparency",
    tags: ["AI Transformation", "Personalization", "Computer Vision", "Retail Intelligence", "Omnichannel"],
    filters: { industry: "Retail", services: ["AI Transformation", "Computer Vision"], themes: ["Personalization", "Vision"] },
    card: [{ label: "Real‑time analytics for campaign and store execution" }, { label: "Personalized recommendations with 85–96% match (model scoring)" }],
    executive: {
      paragraphs: [
        "NeuSix partnered with a travel retail organization operating at large scale to modernize retail execution using an AI layer combining **personalization**, **computer vision**, and **inventory intelligence**.",
        "The goal was to move from generic campaigns and limited shopper insights to real-time, store-aware retail intelligence—making recommendations more relevant, execution more consistent, and decision-making more measurable.",
      ],
    },
    outcomeHighlights: [
      "Personalized recommendations achieved 85–96% match (model scoring)",
      "Real-time analytics improved visibility into store and campaign execution",
      "Stronger readiness for conversion and upsell through shopper-intent intelligence",
      "Foundation laid for scalable omnichannel experiences",
    ],
    context: {
      intro: "Travel retail operates under unique constraints:",
      points: [
        "High footfall variability driven by flight schedules and seasons",
        "Short shopping windows and high-intent journeys",
        "Thousands of stores and complex execution dependencies",
        "Multi-category product mix with inventory and merchandising complexity",
        "Campaigns need to be localized while maintaining brand consistency",
      ],
      outro: "The client wanted a system that improves relevance at the shopper level and execution at the store level—without creating operational chaos.",
    },
    challenge: {
      intro: "Performance was constrained by limited real-time visibility and generic engagement.",
      bottlenecks: [
        "Generic campaigns and broad segmentation: Messaging and offers weren’t tuned to intent and context.",
        "Limited visibility into shopper behavior and store execution: Decisions were made with delayed signals and incomplete ground truth.",
        "Inventory and merchandising misalignment: Promotions didn’t always align with store-level availability and readiness.",
        "Inconsistent experience across stores: Execution quality varied across locations, reducing predictability and scale.",
      ],
    },
    shipped: {
      intro: "NeuSix shipped a modular AI system that connects shopper intelligence, store execution visibility, and inventory-aware decision support.",
      groups: [
        {
          title: "Personalization & Recommendation Engine",
          items: ["Recommendation models informed by shopper signals, store context, and intent", "Persona/segment logic to tune offers and content", "Recommendation explainability (model scoring and confidence)"],
        },
        {
          title: "Computer Vision for Store & Shopper Intelligence",
          items: [
            "Visual signals to measure store execution and shopper interactions (where applicable)",
            "Detection of merchandising patterns and compliance signals",
            "Real-time / near real-time analytics layer for operational actionability",
          ],
        },
        {
          title: "Inventory Intelligence & Availability-Aware Experiences",
          items: ["Visibility into inventory readiness and constraints", "Intelligence layer to reduce “promotion without availability” failures", "Inputs for campaign tuning and store-level recommendations"],
        },
        {
          title: "Real-Time Retail Analytics Cockpit",
          items: ["Campaign performance visibility by store/region/category", "Execution and compliance views", "Decision support for next best actions"],
        },
      ],
    },
    howItWorks: {
      title: "How It Works (Explainable by Design)",
      stages: [
        { label: "Stage 1:", title: "Understand Shopper Intent", body: ["The system uses behavioral and contextual signals to infer intent and match shoppers to relevant offers and experiences."] },
        {
          label: "Stage 2:",
          title: "See Store Reality (Ground Truth)",
          body: ["Computer vision and operational signals provide visibility into store execution, merchandising conditions, and on-ground readiness."],
        },
        {
          label: "Stage 3:",
          title: "Align Recommendations with Availability",
          body: ["Recommendations and campaigns are tuned using inventory intelligence so experiences remain practical and conversion-friendly."],
        },
        {
          label: "Stage 4:",
          title: "Optimize in Real Time",
          body: ["The analytics cockpit highlights what’s performing, what’s stuck, and what needs action—enabling consistent execution at scale."],
        },
      ],
    },
    outcomes: [
      { title: "Experience Outcomes (representative)", items: ["Personalized recommendations achieved 85–96% match (model scoring)", "Improved ability to tailor content and offers by persona and context"] },
      // NOTE: "Execution Outcomes" and "Strategic Impact" as published (read like ports / manufacturing copy); flagged in docs/CONTENT-NOTES.md
      {
        title: "Execution Outcomes",
        items: ["Faster cross-team coordination (terminal ↔ yard ↔ gate)", "Earlier identification of congestion and dwell-risk containers", "Improved throughput readiness through prioritization and focus"],
      },
      {
        title: "Strategic Impact",
        items: ["Created a repeatable automation blueprint for scale", "Reduced risk of future changes via digital twin simulation", "Foundation built for broader “smart manufacturing” roadmap"],
      },
    ],
    measured: [
      { title: "Relevance:", text: "recommendation match score, persona alignment, engagement indicators" },
      { title: "Execution:", text: "store compliance signals, campaign rollout adherence, response-by-store" },
      { title: "Inventory readiness:", text: "availability alignment, promotion-to-availability gaps" },
      { title: "Performance visibility:", text: "time-to-detect issues, time-to-correct actions" },
      ADOPTION,
    ],
    governance: {
      items: [
        "Role-based access to operational and analytics views",
        "Clear measurement definitions for execution and performance",
        "Monitoring of data freshness and pipeline health",
        "Controlled rollout and iteration loops to reduce disruption at scale",
      ],
    },
  },
  {
    slug: "logistics-ports",
    industry: "Logistics & Ports",
    title: "AI‑Driven Port Control Tower",
    impact: "Higher throughput, fewer delays, faster decisions — with operational transparency",
    tags: ["AI Transformation", "Control Tower", "Predictive Ops", "Workflow Orchestration", "Observability"],
    filters: { industry: "Logistics", services: ["AI Transformation", "Control Tower"], themes: ["Predictive Ops"] },
    card: [
      { value: "30–40%", label: "dwell time reduction", trend: "up" },
      { value: "25%", label: "faster exception resolution", trend: "down" },
      { label: "Double‑digit demurrage reduction" },
    ],
    executive: {
      paragraphs: [
        "NeuSix partnered with a port/terminal operator to build an AI-Driven Port Control Tower—a real-time operational intelligence layer that unified terminal, yard, and gate views into one decision-making cockpit.",
        "The control tower enabled leaders and ops teams to see what’s happening now, what will break next, and what actions will reduce delays—moving from reactive firefighting to proactive operations.",
      ],
    },
    outcomeHighlights: [
      "30–40% reduction in dwell time",
      "25% faster exception resolution",
      "Double-digit reduction in demurrage-related leakage",
      "Improved operational coordination across terminal, yard, and gate teams",
    ],
    context: {
      intro: "Port operations are high-velocity, multi-party systems where even small delays compound quickly. The client operates a complex environment with:",
      points: [
        "Multiple operational zones (terminal, yard, gate)",
        "High volume of container moves and time-critical handoffs",
        "Exceptions (delays, misroutes, congestion) that cascade across the system",
        "Multiple stakeholders needing a common operational picture",
      ],
      outro: "They needed an operations layer that provided real-time clarity, predictive insights, and actionable workflows.",
    },
    challenge: {
      intro: "The client’s daily reality was constrained by fragmented data and reactive coordination.",
      bottlenecks: [
        "Low real-time visibility: Data was spread across systems, spreadsheets, and team updates.",
        "Exceptions surfaced late: Bottlenecks were often identified only after impact (queue buildup, missed slots, yard congestion).",
        "Manual coordination overhead: Teams spent time aligning status across functions instead of executing.",
        "Lack of predictive decision support: Leaders lacked “what’s likely to happen next” insights to preempt issues.",
        "Limited transparency on root causes: Dwell time and demurrage impacts were visible, but drivers were not consistently measurable.",
      ],
    },
    shipped: {
      intro: "NeuSix shipped a control tower capability designed for operational decision-making, not reporting.",
      groups: [
        {
          title: "Unified Operations Cockpit",
          items: [
            "Terminal operations view (status, throughput, hotspots)",
            "Yard view (congestion, stack health, move readiness)",
            "Gate operations view (queue status, turn times, exception flags)",
            "Role-specific views for leaders vs supervisors vs operators",
          ],
        },
        {
          title: "Exception Intelligence",
          items: ["Exception identification and prioritization", "Root-cause hints (where possible)", "SLA timers and escalation triggers", "Action workflows for resolution ownership"],
        },
        {
          title: "Predictive Operations Layer",
          items: ["Early warning signals for congestion build-up", "Pattern-based forecasting for dwell-risk containers", "“Next best actions” playbook suggestions (operational levers)"],
        },
        {
          title: "Transparency & Measurement",
          items: ["Dwell time drivers and segmentation", "Demurrage leakage visibility", "Throughput and turnaround metrics", "Operational scorecards by zone and shift"],
        },
      ],
    },
    howItWorks: {
      title: "How It Works (Explainable by Design)",
      stages: [
        { label: "Stage 1", title: "Sense (Real-time State)", body: ["The control tower continuously ingests operational signals and presents a live view across terminal, yard, and gate."] },
        {
          label: "Stage 2",
          title: "Detect (Exceptions + Risks)",
          body: ["Exceptions are flagged and prioritized with context—what’s blocked, where congestion is building, what’s deviating from normal."],
        },
        {
          label: "Stage 3",
          title: "Decide (Decision Support)",
          body: ["Supervisors receive suggested actions: re-route moves, rebalance yard priorities, focus on dwell-risk containers, resolve gate bottlenecks."],
        },
        {
          label: "Stage 4",
          title: "Act (Workflow + Accountability)",
          body: ["Exceptions move through owned workflows with timers, escalation, and measurement—so resolution is accountable, not ad-hoc."],
        },
      ],
    },
    outcomes: [
      { title: "Operational Outcomes (representative)", items: ["30–40% reduction in dwell time", "25% faster exception resolution", "Double-digit reduction in demurrage-related leakage"] },
      {
        title: "Execution Outcomes",
        items: ["Faster cross-team coordination (terminal ↔ yard ↔ gate)", "Earlier identification of congestion and dwell-risk containers", "Improved throughput readiness through prioritization and focus"],
      },
      {
        title: "Transparency Outcomes",
        items: ["Clearer visibility into drivers of delay", "Shift/location-level scorecards and continuous improvement rhythm", "Leaders could see what’s real, what’s stuck, and what’s trending"],
      },
    ],
    measured: [
      { title: "Operational health:", text: "dwell time, turn times, throughput, congestion indicators" },
      { title: "Exceptions:", text: "exception rate, time-to-resolve, escalation rate, ownership compliance" },
      { title: "Financial leakage:", text: "demurrage-related impact trends (driver-based visibility)" },
      ADOPTION,
    ],
    governance: {
      items: [
        "Role-based access and operational accountability",
        "Auditability of exception handling workflows (ownership + timestamps)",
        "Observability for pipeline health and data freshness",
        "Alerts and controls to prevent silent failures in monitoring",
      ],
    },
  },
  {
    slug: "manufacturing-industrial",
    industry: "Manufacturing & Industrial",
    title: "FMCG Food Manufacturing Automation (Robotics + Vision + Digital Twin)",
    impact: "Higher throughput, lower downtime, consistent quality — with a scalable automation blueprint",
    tags: ["Industrial AI", "Automation", "Robotics", "Computer Vision", "Digital Twin", "Modernization"],
    filters: { industry: "Manufacturing", services: ["Automation", "Computer Vision", "Digital Twin", "Modernization"], themes: ["Vision"] },
    card: [
      { value: "97%+", label: "classification accuracy", trend: "up" },
      { value: "75%", label: "downtime reduction", trend: "down" },
      { value: "18+", label: "FTE saved", trend: "up" },
      { label: "55–60 units/min throughput" },
    ],
    executive: {
      paragraphs: [
        "NeuSix partnered with an FMCG food manufacturing operation to modernize and automate critical production workflows using robotics, computer vision inspection, and digital twin simulation.",
        "The program reduced manual handling bottlenecks, minimized downtime drivers, and improved quality consistency—while creating a scalable blueprint for expansion across lines and plants.",
      ],
    },
    outcomeHighlights: [
      "18+ FTE capacity saved through automation",
      "75% reduction in downtime",
      "Production throughput increased to 55–60 units/min",
      "Inspection accuracy improved to 97%+ classification accuracy",
    ],
    context: {
      intro: "The client operates high-volume food manufacturing lines where performance depends on:",
      points: [
        "Reliable material flow and minimal stoppages",
        "Consistent quality inspection",
        "Fast recovery from micro-stoppages and exceptions",
        "Repeatable line performance across shifts and environments",
      ],
      outro: "They wanted a transformation that could be executed without compromising safety, uptime, or product integrity.",
    },
    challenge: {
      intro: "Production was impacted by a combination of manual processes and limited real-time intelligence.",
      bottlenecks: [
        "Material handling bottlenecks: Manual handling created variability, fatigue risk, and inconsistent line flow.",
        "Manual quality inspection constraints: Human inspection caused inconsistency at high speed and increased rework.",
        "Downtime drivers were hard to diagnose: Teams lacked structured insights into causes and patterns behind stoppages.",
        "Scaling improvements across lines was slow: Changes were not easily simulated or standardized across plants/lines.",
      ],
    },
    shipped: {
      intro: "NeuSix shipped an end-to-end industrial automation solution combining mechanical automation and AI intelligence.",
      groups: [
        {
          title: "Robotic Material Handling",
          items: ["Automated material movement at critical line points", "Exception handling and safe-state controls", "Standardized flow to reduce bottlenecks and variability"],
        },
        {
          title: "Vision-Based Quality Inspection",
          items: ["Computer vision inspection at production speed", "Classification models for defect detection and quality flags", "Real-time alerts and routing for rejects/rework"],
        },
        {
          title: "Digital Twin Simulation",
          items: [
            "Line simulation to validate layout changes and throughput assumptions",
            "Scenario planning for bottleneck relief and capacity growth",
            "“Test before deploy” method to reduce risk of downtime during change",
          ],
        },
        {
          title: "Operational Monitoring & Reporting",
          items: ["Visibility into throughput, rejects, and downtime patterns", "Shift-level performance views and actionable dashboards", "Baselines and measurement for continuous improvement"],
        },
      ],
    },
    howItWorks: {
      title: "How It Works (Explainable by Design)",
      stages: [
        { label: "Stage 1:", title: "Automate the Flow", body: ["Robotics reduced manual dependency, stabilized material movement, and improved line continuity."] },
        { label: "Stage 2:", title: "Inspect at Speed", body: ["Computer vision enabled consistent inspection and faster detection of anomalies than manual checks."] },
        { label: "Stage 3:", title: "Simulate Before Changing Reality", body: ["The digital twin allowed teams to test throughput and layout scenarios before live deployment."] },
        { label: "Stage 4:", title: "Measure and Improve", body: ["Operational telemetry provided transparency into drivers of downtime and quality loss, enabling continuous improvement."] },
      ],
    },
    outcomes: [
      {
        title: "Performance Outcomes (representative)",
        items: ["18+ FTE capacity saved through automation", "75% reduction in downtime", "Throughput increased to 55–60 units/min", "97%+ inspection classification accuracy"],
      },
      { title: "Operational Outcomes", items: ["Reduced variance across shifts and operators", "Faster detection of issues and reduced rework", "Higher predictability in production flow and quality handling"] },
      {
        title: "Strategic Impact",
        items: ["Created a repeatable automation blueprint for scale", "Reduced risk of future changes via digital twin simulation", "Foundation built for broader “smart manufacturing” roadmap"],
      },
    ],
    measured: [
      { title: "Throughput:", text: "units/min, line utilization, micro-stoppage frequency" },
      { title: "Quality:", text: "defect rate, false reject rate, rework volume" },
      { title: "Reliability:", text: "downtime minutes, MTTR, recurring stoppage patterns" },
      { title: "Automation health:", text: "robot cycle stability, CV model drift indicators (where applicable)" },
      { title: "Adoption:", text: "shift compliance, usage of dashboards and alerts" },
    ],
    governance: {
      intro: "Industrial environments demand safety and stability:",
      items: [
        "Safe-state controls and exception handling in automation flows",
        "Operational visibility for auditability of actions and outcomes",
        "Monitoring for system health and performance degradation",
        "Documentation and training for sustained adoption across shifts",
      ],
    },
  },
];

export const getCaseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
