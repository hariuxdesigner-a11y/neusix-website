/**
 * NeuSix Reusable Microservices Library (600 services, 12 areas), from the library NeuSix
 * prepared in November 2026. The full catalogue lives in /public/data/microservices.json and is
 * fetched by the home page section only when it scrolls into view (it is ~115 KB, ~39 KB gzipped).
 * `area` must match the `area` field of the rows in that JSON.
 */
export type LibraryArea = {
  area: string; // key used in the catalogue rows
  label: string; // shorter display name where needed
  code: string; // service ID prefix
  count: number;
  blurb: string;
  drawing: string; // key into the animated drawings
};

export const LIBRARY_TOTAL = 600;

export const LIBRARY_AREAS: LibraryArea[] = [
  { area: "Enterprise AI", label: "Enterprise AI", code: "EAI", count: 80, drawing: "enterprise", blurb: "Document AI, RAG, agents, decision models and the LLMOps and MLOps plumbing every enterprise POC sits on." },
  { area: "Computer Vision", label: "Computer Vision", code: "CV", count: 65, drawing: "vision", blurb: "Detection, inspection, recognition, measurement and video understanding." },
  { area: "Digital Twins", label: "Digital Twins", code: "DTW", count: 55, drawing: "twins", blurb: "Live models of assets, sites and processes for monitoring, simulation and what-if decisions." },
  { area: "IoT", label: "IoT", code: "IOT", count: 55, drawing: "iot", blurb: "Device onboarding, protocols, telemetry, control and sensing from plant floor to field." },
  { area: "Edge AI", label: "Edge AI", code: "EDG", count: 50, drawing: "edge", blurb: "Compressing, deploying, updating and running models on cameras, gateways, vehicles and devices." },
  { area: "Physical AI", label: "Physical AI", code: "PAI", count: 50, drawing: "physical", blurb: "Perception, planning and control for robots, drones and autonomous machines." },
  { area: "AR / VR / XR / MR", label: "AR, VR, XR & MR", code: "XR", count: 50, drawing: "xr", blurb: "Immersive training, remote assistance, visualization and spatial computing." },
  { area: "NLP & NLU", label: "NLP & NLU", code: "NLP", count: 50, drawing: "nlp", blurb: "Language understanding, extraction, summarization and conversation, including Indic and Arabic." },
  { area: "Blockchain", label: "Blockchain", code: "BCH", count: 45, drawing: "blockchain", blurb: "Provenance, verifiable credentials, tokenization and shared-ledger workflows between parties." },
  { area: "Deep Neural Networks", label: "Deep Neural Networks", code: "DNN", count: 40, drawing: "dnn", blurb: "Training, adaptation, optimization and reliability services for deep models." },
  { area: "Frontier & Sovereign Models", label: "Frontier & Sovereign Models", code: "FSM", count: 35, drawing: "frontier", blurb: "Using frontier APIs safely, and running, adapting and governing models on sovereign infrastructure." },
  { area: "Fractals", label: "Fractals", code: "FRC", count: 25, drawing: "fractals", blurb: "Scaling and complexity analysis for texture, signals and materials, plus procedural generation." },
];

export type LibraryService = { id: string; name: string; area: string; desc: string; use: string };
