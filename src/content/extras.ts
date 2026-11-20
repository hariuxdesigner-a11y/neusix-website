/* Content added in v2 for a better visitor experience (approved by NeuSix, 19 Nov 2026).
   FAQ answers and contact steps are built from existing NeuSix copy; see docs/CONTENT-NOTES.md.
   Review and edit freely. */
import { COMMERCIAL_MODELS } from "./services";
import { INDUSTRIES } from "./industries";

/* ── Client logos ─────────────────────────────────────────────────────────────
   Logos supplied by NeuSix (20 Nov 2026), prepared for a light background in /public/clients/
   (backgrounds removed, white lettering recoloured to NeuSix ink, brand accents kept).
   `ratio` = width / height of the file; the carousel uses it to size every logo to the same
   visual weight. To add a client: drop the logo in /public/clients/ and add a line below. */
export type Client = { name: string; logo: string; ratio: number; boost?: number /* optional size tweak for very light/thin logos */ };

export const CLIENTS: Client[] = [
  { name: "Tiger Analytics", logo: "/clients/tiger-analytics.svg", ratio: 2.61 },
  { name: "Onward Technologies", logo: "/clients/onward-technologies.svg", ratio: 4.05 },
  { name: "Volanté Technologies", logo: "/clients/volante.png", ratio: 5.12 },
  { name: "Suri & Co. Chartered Accountants", logo: "/clients/suri-co.png", ratio: 3.12 },
  { name: "Vigilant360", logo: "/clients/vigilant360.png", ratio: 5.36 },
  { name: "Lloyd Laboratories", logo: "/clients/lloyd-laboratories.png", ratio: 1.72 },
  { name: "Geri Care", logo: "/clients/geri-care.png", ratio: 4.56 },
  { name: "8bit.ai", logo: "/clients/8bit-ai.png", ratio: 3.26 },
  { name: "Glosel", logo: "/clients/glosel.png", ratio: 1.21 },
  { name: "Pathscript", logo: "/clients/path-script.png", ratio: 4.26 },
  { name: "Isaac Luxe", logo: "/clients/isaac-luxe.png", ratio: 5.07, boost: 1.25 },
];

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
    a: "With a free 30-minute consultation. We’ll understand your goals and constraints, share a practical path to measurable impact, and outline next steps, with no obligations. From there, work follows the NeuSix Execution System: Discover, Plan, Build and Scale.",
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
    a: "We work inside real constraints (people, processes, systems), so transformation sticks. Enterprise-grade engineering with governance, reliability, and adoption designed in, and co-creation sprints integrated into workflows, not isolated demos.",
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
  { n: "02", title: "A 30-minute call", text: "We’ll understand your goals and constraints. Fast, practical, and tailored." },
  { n: "03", title: "A practical path to impact", text: "We share a practical path to measurable impact and outline next steps, with no obligations." },
];
