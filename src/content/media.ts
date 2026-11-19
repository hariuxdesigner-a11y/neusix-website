/* Cinematic video map: each clip is chosen against the text of the section it sits behind.
 * See docs/PLAN-V2-CINEMATIC.md §6 and docs/MEDIA-CREDITS.md.
 *
 * Files live in /public/media:
 *   <id>.mp4                  desktop (≤1920 wide, ≤2.4 Mbps)
 *   <id>-m.mp4                mobile, 960×540
 *   <id>.jpg                  poster (first frame), shown before playback, for reduced motion and data saver
 *   <id>-m.jpg                3:4 centre-cropped poster for phones (scripts/encode-media.sh makes it)
 * Set `ready: true` once the files exist. Until then the section shows a brand-colour stand-in.
 */

export type MediaId =
  | "home-hero" | "home-purpose" | "comp-xr" | "comp-automation" | "comp-robotics" | "comp-quantum" | "comp-blockchain" | "comp-iot"
  | "home-approach" | "consult" | "services-hero" | "services-stages"
  | "svc-ai-transformation-page" | "svc-modernization" | "svc-digital-transformation" | "svc-software-engineering-services" | "svc-ai-center-of-excellence" | "svc-offshore-development-center"
  | "industries-hero" | "ind-healthcare" | "ind-retail" | "ind-bfsi" | "ind-manufacturing" | "ind-aviation" | "ind-realestate" | "ind-professional" | "ind-energy" | "ind-public"
  | "cases-hero" | "cs-healthcare-life-sciences" | "cs-legal" | "cs-airlines-aviation" | "cs-retail-consumer-travel-retail" | "cs-logistics-ports" | "cs-manufacturing-industrial"
  | "about-careers" | "about-global" | "contact";

export type Media = {
  concept: string;
  /** brand colour used for the stand-in and to tint the overlay */
  tint: string;
  /** CSS object-position, keeps the subject in frame on tall phone screens */
  focal?: string;
  ready?: boolean;
  credit?: { source: string; url: string; author?: string; license: string };
};

import { MEDIA_CREDITS } from "./media-credits";

const INK = "#313168";
const LILAC = "#6d6eb5";

export const MEDIA: Record<MediaId, Media> = {
  "home-hero": { concept: "Macro push through a glowing data/neural network resolving into a modern enterprise space", tint: LILAC },
  "home-purpose": { concept: "Operations control room, team at large data walls", tint: INK },
  "comp-xr": { concept: "Person using an AR/VR headset; holographic interface", tint: "#995ba5" },
  "comp-automation": { concept: "Connected workflow lines / automated sorting conveyor", tint: "#ef703d" },
  "comp-robotics": { concept: "Industrial robotic arm, macro, precise motion", tint: "#d43c3c" },
  "comp-quantum": { concept: "Quantum processor / cryostat macro", tint: LILAC },
  "comp-blockchain": { concept: "Abstract chained data blocks", tint: "#f6a042" },
  "comp-iot": { concept: "Smart city sensors / connected devices at night", tint: "#649e4f" },
  "home-approach": { concept: "Team workshop at a whiteboard to sprint to dashboards (soft)", tint: LILAC },
  consult: { concept: "Two people in a calm conversation in a modern office", tint: INK },
  "services-hero": { concept: "Engineers in a modern enterprise workspace with data overlays", tint: LILAC },
  "services-stages": { concept: "Abstract data flowing left to right through connected nodes", tint: INK },
  "svc-ai-transformation-page": { concept: "AI agents / orchestration: nodes passing tasks, then a production dashboard", tint: "#6d6eb5" },
  "svc-modernization": { concept: "Data centre / cloud infrastructure dolly shot", tint: "#ef703d" },
  "svc-digital-transformation": { concept: "People moving through digital journeys: touchscreens, mobile, service counters", tint: "#f6a042" },
  "svc-software-engineering-services": { concept: "Macro code on screen, engineers reviewing architecture", tint: "#d43c3c" },
  "svc-ai-center-of-excellence": { concept: "Leadership team in a strategy/governance session with data walls", tint: "#995ba5" },
  "svc-offshore-development-center": { concept: "Distributed team stand-up / day-to-night city timelapse", tint: "#649e4f" },
  "industries-hero": { concept: "Aerial: city, industry and infrastructure at dusk", tint: LILAC },
  "ind-healthcare": { concept: "Hospital / clinic operations", tint: LILAC },
  "ind-retail": { concept: "Omnichannel store, shoppers and screens", tint: LILAC },
  "ind-bfsi": { concept: "Banking / financial data floor", tint: LILAC },
  "ind-manufacturing": { concept: "Smart factory production line", tint: LILAC },
  "ind-aviation": { concept: "Airport apron / logistics movement", tint: LILAC },
  "ind-realestate": { concept: "Construction site, cranes, drone view", tint: LILAC },
  "ind-professional": { concept: "Consulting team at work", tint: LILAC },
  "ind-energy": { concept: "Wind farm / grid operations", tint: LILAC },
  "ind-public": { concept: "Smart city traffic and infrastructure", tint: LILAC },
  "cases-hero": { concept: "Abstract data transitioning into real operations", tint: INK },
  "cs-healthcare-life-sciences": { concept: "Clinic front desk / patient journey", tint: LILAC },
  "cs-legal": { concept: "Legal documents and research", tint: LILAC },
  "cs-airlines-aviation": { concept: "Airport e-gates / passenger flow", tint: LILAC },
  "cs-retail-consumer-travel-retail": { concept: "Duty-free / travel retail store", tint: LILAC },
  "cs-logistics-ports": { concept: "Container port aerial and control room", tint: LILAC },
  "cs-manufacturing-industrial": { concept: "Food production line robotics and vision", tint: LILAC },
  "about-careers": { concept: "Engineers collaborating in natural light", tint: LILAC },
  "about-global": {
    concept: "Earth at night from orbit, slow rotation",
    tint: INK,
    ready: true,
    // original asset already on the live NeuSix site (generic sample clip), used as a stand-in
    credit: { source: "neusix.com (existing Webflow asset)", url: "https://www.neusix.com/case-studies/logistics-ports", license: "NeuSix site asset" },
  },
  contact: { concept: "Very subtle abstract light / data drift", tint: INK },
};

/** Clips are "ready" when encoded files exist (listed in media-credits.ts) or flagged here. */
for (const [id, credit] of Object.entries(MEDIA_CREDITS)) {
  const m = MEDIA[id as MediaId];
  if (m && credit) {
    m.ready = true;
    m.credit = credit;
  }
}

export const mediaSrc = (id: MediaId) => ({
  mp4: `/media/${id}.mp4`,
  mobile: `/media/${id}-m.mp4`,
  poster: `/media/${id}.jpg`,
  posterMobile: `/media/${id}-m.jpg`,
});
