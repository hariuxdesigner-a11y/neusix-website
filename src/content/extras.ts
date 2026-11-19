/* Content added in v2 for a better visitor experience (approved by NeuSix, 19 Nov 2026).
   FAQ answers and contact steps are built from existing NeuSix copy; see docs/CONTENT-NOTES.md.
   Review and edit freely. */
import { COMMERCIAL_MODELS } from "./services";
import { INDUSTRIES } from "./industries";

/* ── Client logos ─────────────────────────────────────────────────────────────
   PLACEHOLDERS. Replace each entry with a real client: put the logo file (SVG preferred,
   single colour or full colour) in /public/clients/ and set `name` + `logo`.
   Delete `placeholder: true` once real logos are in. The section hides itself if the list is empty. */
export type Client = { name: string; logo: string; placeholder?: boolean };

export const CLIENTS: Client[] = Array.from({ length: 10 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { name: `Client ${n}`, logo: `/clients/placeholder-${n}.svg`, placeholder: true };
});

export const CLIENTS_SECTION = {
  eyebrow: "Our Clients",
  title: "Trusted by enterprise teams",
};

/* ── FAQ ──────────────────────────────────────────────────────────────────── */
export type Faq = { q: string; a: string };

const industryList = INDUSTRIES.map((i) => i.name.replace(/\s*\(.*\)$/, "")).join(", ");

export const FAQS: Faq[] = [
  {
    q: "How does an engagement with NeuSix start?",
    a: "With a free 30-minute consultation. We’ll understand your goals and constraints, share a practical path to measurable impact, and outline next steps—no obligations. From there, work follows the NeuSix Execution System: Discover, Plan, Build and Scale.",
  },
  {
    q: "Which engagement models do you offer?",
    a: `${COMMERCIAL_MODELS.map((m) => m.title).join(", ")}. The right model depends on your internal capability maturity, timeline urgency, and governance needs.`,
  },
  {
    q: "Which industries do you work with?",
    a: `${industryList}.`,
  },
  {
    q: "How do you make sure AI reaches production, not just a pilot?",
    a: "We work inside real constraints—people, processes, systems—so transformation sticks. Enterprise-grade engineering with governance, reliability, and adoption designed in, and co-creation sprints integrated into workflows, not isolated demos.",
  },
  {
    q: "How do you measure success?",
    a: "We measure success by the tangible business outcomes we create, not by the volume of code we write. In Discover we agree what “impact” means, and we track it through monitoring, adoption and optimization as the solution scales.",
  },
  {
    q: "Where is your team based?",
    a: "India is the core location for our delivery hubs. USA, UAE, UK, and ANZ are client proximity locations, and follow-the-sun 24/7 delivery is our support model.",
  },
];

/* ── Contact page: what happens after you submit ─────────────────────────── */
export const CONTACT_STEPS = [
  { n: "01", title: "Tell us about your goals", text: "Share your area of interest and what you’d like to achieve using the form on this page." },
  { n: "02", title: "A 30-minute call", text: "We’ll understand your goals and constraints—fast, practical, and tailored." },
  { n: "03", title: "A practical path to impact", text: "We share a practical path to measurable impact and outline next steps, with no obligations." },
];
