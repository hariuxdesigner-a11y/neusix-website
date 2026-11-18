/* Copied verbatim from https://www.neusix.com/our-work/industries (17 Nov 2026). */
import type { MediaId } from "./media";

export type Industry = { name: string; where: string; wins: string; themes: string; media: MediaId };

export const INDUSTRIES: Industry[] = [
  {
    media: "ind-healthcare",
    name: "Healthcare & Life Sciences",
    where: "Where we help: patient/clinic operations, care coordinator workflows, revenue workflows, knowledge support.",
    wins: "Typical wins: faster cycle times, fewer operational exceptions, improved experience and quality controls.",
    themes: "Common solution themes: intelligent triage, workflow automation, decision support, knowledge assist.",
  },
  {
    media: "ind-retail",
    name: "Retail & Consumer (Omnichannel)",
    where: "Where we help: merchandising ops, store workflows, customer support, inventory/process visibility",
    wins: "Typical wins: reduced friction, faster decisions, improved execution consistency",
    themes: "Common solution themes: operations intelligence, anomaly detection, assistive workflows, process redesign",
  },
  {
    media: "ind-bfsi",
    name: "BFSI (Banking, Financial Services & Insurance)",
    where: "Where we help: underwriting/claims workflows, risk operations, compliance-ready automation",
    wins: "Typical wins: faster processing with controls, reduced operational cost, stronger governance",
    themes: "Common solution themes: decision intelligence, audit-friendly automation, monitoring and controls",
  },
  {
    media: "ind-manufacturing",
    name: "Manufacturing & Industrial",
    where: "Where we help: production operations, quality workflows, maintenance operations, supply chain visibility",
    wins: "Typical wins: reduced downtime, improved quality consistency, faster issue resolution",
    themes: "Common solution themes: predictive operations, anomaly detection, workflow orchestration",
  },
  {
    media: "ind-aviation",
    name: "Aviation, Travel & Logistics",
    where: "Where we help: operations control, turnaround workflows, service operations, exception handling",
    wins: "Typical wins: reduced delays and escalations, faster handoffs, better operational clarity",
    themes: "Common solution themes: decision support, real-time orchestration, observability-led modernization",
  },
  {
    media: "ind-realestate",
    name: "Real Estate & Construction",
    where: "Where we help: project workflows, approvals, vendor coordination, reporting integrity",
    wins: "Typical wins: reduced cycle time, better governance on decisions, fewer bottlenecks",
    themes: "Common solution themes: workflow redesign, automation, structured decision support",
  },
  {
    media: "ind-professional",
    name: "Professional Services",
    where: "Where we help: delivery workflows, knowledge workflows, operational governance",
    wins: "Typical wins: improved execution, faster delivery, better client experience",
    themes: "Common solution themes: knowledge assist, decision support, operating rhythm and governance",
  },
  {
    media: "ind-energy",
    name: "Energy & Utilities",
    where: "Where we help: asset operations, reliability workflows, field operations support",
    wins: "Typical wins: improved reliability, faster triage, reduced operational cost",
    themes: "Common solution themes: predictive ops, workflow automation, modernization",
  },
  {
    media: "ind-public",
    name: "Public Sector & Smart Infrastructure",
    where: "Where we help: citizen services workflows, grievance/requests routing, compliance processes",
    wins: "Typical wins: reduced cycle time, better transparency, measurable service outcomes",
    themes: "Common solution themes: orchestration, governance-first automation, decision support",
  },
];

export const PROBLEMS = [
  { title: "Decision support, not demos", text: "AI that improves real decisions and reduces rework" },
  { title: "Workflow automation with accountability", text: "orchestration, controls, and clear ownership" },
  { title: "Modernization that enables AI", text: "data foundations, APIs, observability, reliability" },
  { title: "Governance that leaders trust", text: "security, auditability, monitoring, responsible use" },
  { title: "Adoption that sticks", text: "change enablement and operating rhythm" },
];
