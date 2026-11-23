import type { ReactNode } from "react";
import { Marquee } from "@/components/motion/Marquee";
import { SectionHead } from "./Bands";

/**
 * "Agent primitives": the AI building blocks NeuSix connects into enterprise workflows, shown as a
 * drifting strip of cards, each with a small animated technical drawing (thin ink lines, one
 * indigo accent, one orange signal). Pure SVG + CSS keyframes / SMIL; motion stops for
 * prefers-reduced-motion. Copy is drawn from NeuSix's services and case studies; no figures claimed.
 */

const Ln = "ap-ln";
const Ac = "ap-ac";

function Svg({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 200 120" className="ap-svg h-auto w-full" aria-hidden focusable="false">
      <text x="10" y="114" className="ap-lbl">
        {label}
      </text>
      {children}
    </svg>
  );
}

const DRAWINGS: Record<string, ReactNode> = {
  retrieval: (
    <Svg label="query → top-k chunks">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${22 + i * 8} ${18 + i * 8})`}>
          <rect width="58" height="70" rx="3" className={`${Ln} ap-paper`} />
          {[14, 24, 34, 44, 54].map((y) => (
            <path key={y} d={`M8 ${y}H${y % 20 === 4 ? 40 : 50}`} className="ap-ln ap-thin" />
          ))}
        </g>
      ))}
      <rect x="44" y="56" width="42" height="9" rx="2" className="ap-hl ap-chunk" />
      <circle cx="168" cy="40" r="9" className={Ac} />
      <text x="164.5" y="43.5" className="ap-lbl ap-lbl-ac">q</text>
      <path d="M159 42 L92 60" className={`${Ac} ap-flow`} />
      <circle cx="92" cy="60" r="2.6" className="ap-dot ap-pulse" />
    </Svg>
  ),
  orchestration: (
    <Svg label="plan → act → check">
      <rect x="18" y="44" width="40" height="26" rx="5" className={Ac} />
      <text x="26" y="60.5" className="ap-lbl ap-lbl-ac">agent</text>
      {[18, 50, 82].map((y, i) => (
        <g key={y}>
          <path d={`M58 57 C 92 57, 100 ${y + 8}, 130 ${y + 8}`} className="ap-ln ap-dash" />
          <rect x="130" y={y} width="50" height="16" rx="3" className={Ln} />
          <text x="137" y={y + 11} className="ap-lbl">{["search", "update", "notify"][i]}</text>
        </g>
      ))}
      <circle r="3" className="ap-dot">
        <animateMotion dur="3.6s" repeatCount="indefinite" path="M58 57 C 92 57, 100 26, 130 26 M58 57 C 92 57, 100 58, 130 58 M58 57 C 92 57, 100 90, 130 90" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
      </circle>
    </Svg>
  ),
  connectors: (
    <Svg label="secure actions in core systems">
      {["ERP", "CRM", "DATA"].map((t, i) => (
        <g key={t}>
          <rect x="14" y={14 + i * 30} width="46" height="20" rx="3" className={Ln} />
          <text x="24" y={27.5 + i * 30} className="ap-lbl">{t}</text>
          <path d={`M60 ${24 + i * 30} H96 C110 ${24 + i * 30}, 112 54, 126 54`} className={`${Ac} ap-flow`} style={{ animationDelay: `${i * 0.35}s` }} />
        </g>
      ))}
      <rect x="126" y="40" width="58" height="28" rx="14" className={`${Ac} ap-fillac`} />
      <circle cx="140" cy="54" r="4" className="ap-dot ap-pulse" />
      <text x="149" y="57.5" className="ap-lbl ap-lbl-ac">agent</text>
    </Svg>
  ),
  documents: (
    <Svg label="fields extracted per page">
      <rect x="20" y="10" width="62" height="86" rx="3" className={`${Ln} ap-paper`} />
      {[22, 32, 42, 52, 62, 72, 82].map((y) => (
        <path key={y} d={`M30 ${y}H${y === 42 || y === 72 ? 60 : 72}`} className="ap-ln ap-thin" />
      ))}
      <rect x="20" y="10" width="62" height="3" className="ap-scanbar" />
      {[
        ["party", 24],
        ["date", 48],
        ["amount", 72],
      ].map(([t, y]) => (
        <g key={t as string} className="ap-field" style={{ animationDelay: `${(y as number) / 40}s` }}>
          <path d={`M82 ${(y as number) + 4} H108`} className="ap-ac ap-dash" />
          <rect x="108" y={(y as number) - 4} width="70" height="16" rx="3" className={Ac} />
          <text x="115" y={(y as number) + 7} className="ap-lbl ap-lbl-ac">{t as string}</text>
        </g>
      ))}
    </Svg>
  ),
  vision: (
    <Svg label="detect · locate · inspect">
      <rect x="18" y="14" width="164" height="84" rx="4" className="ap-ln ap-thin" />
      <path d="M70 84 L70 48 L100 34 L130 48 L130 84 Z M70 48 L100 62 L130 48 M100 62 V84" className={Ln} />
      <g className="ap-brackets">
        <path d="M58 34 v-8 h8 M142 34 v-8 h-8 M58 88 v8 h8 M142 88 v8 h-8" className={Ac} />
      </g>
      <rect x="58" y="13" width="34" height="10" rx="2" className="ap-tagbg" />
      <text x="62" y="20.5" className="ap-lbl ap-lbl-w">crate</text>
      <circle cx="116" cy="70" r="2.6" className="ap-dot ap-pulse" />
    </Svg>
  ),
  predictive: (
    <Svg label="t → t + n forecast">
      <path d="M18 98 H186 M18 98 V12" className="ap-ln ap-thin" />
      <path d="M110 50 C130 40, 150 46, 182 30 L182 58 C150 70, 130 66, 110 56 Z" className="ap-band" />
      <path d="M18 78 C40 70, 52 84, 70 66 S 96 58, 110 53" className={Ln} />
      <path d="M110 53 C130 50, 150 54, 182 44" className={`${Ac} ap-dash`} />
      <path d="M110 14 V98" className="ap-ln ap-thin ap-dash" />
      <circle r="3" className="ap-dot">
        <animateMotion dur="3.2s" repeatCount="indefinite" path="M110 53 C130 50, 150 54, 182 44" />
      </circle>
    </Svg>
  ),
  twins: (
    <Svg label="physical ↔ digital sync">
      <g>
        <rect x="18" y="28" width="56" height="56" rx="4" className={Ln} />
        <circle cx="46" cy="56" r="14" className={Ln} />
        <path d="M46 42 V36 M46 70 v6 M32 56 h-6 M60 56 h6" className={Ln} />
      </g>
      <g className="ap-twin">
        <rect x="126" y="28" width="56" height="56" rx="4" className={`${Ac} ap-dash`} />
        <circle cx="154" cy="56" r="14" className={`${Ac} ap-dash`} />
        <path d="M154 42 V36 M154 70 v6 M140 56 h-6 M168 56 h6" className={Ac} />
      </g>
      <path d="M80 48 H120" className={`${Ac} ap-flow`} />
      <path d="M120 64 H80" className={`ap-ln ap-flow`} />
      <path d="M116 44 l4 4 -4 4 M84 60 l-4 4 4 4" className={Ac} />
    </Svg>
  ),
  voice: (
    <Svg label="speech → text tokens">
      {Array.from({ length: 17 }, (_, i) => (
        <rect key={i} x={18 + i * 6.4} y="30" width="3" height="40" rx="1.5" className="ap-bar" style={{ animationDelay: `${(i % 6) * 0.11 + (i > 8 ? 0.2 : 0)}s` }} />
      ))}
      <path d="M134 50 h10 M140 46 l4 4 -4 4" className={Ac} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="150" y={30 + i * 14} width={i === 1 ? 24 : 32} height="9" rx="2" className={`${Ac} ap-token`} style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
    </Svg>
  ),
  decisions: (
    <Svg label="recommendation + reasons">
      <circle cx="24" cy="56" r="6" className={Ln} />
      {[22, 56, 90].map((y, i) => (
        <g key={y}>
          <path d={`M30 56 C 60 56, 60 ${y}, 92 ${y}`} className={i === 1 ? `${Ac} ap-draw` : "ap-ln ap-thin"} />
          <rect x="92" y={y - 8} width="50" height="16" rx="3" className={i === 1 ? `${Ac} ap-fillac` : Ln} />
          <text x="99" y={y + 3.5} className={i === 1 ? "ap-lbl ap-lbl-ac" : "ap-lbl"}>{["option A", "option B", "option C"][i]}</text>
        </g>
      ))}
      <path d="M142 56 H160" className={`${Ac} ap-draw`} />
      <circle cx="170" cy="56" r="10" className={`${Ac} ap-fillac`} />
      <path d="M165 56 l4 4 7 -8" className={`${Ac} ap-draw`} />
    </Svg>
  ),
  hitl: (
    <Svg label="approve · override · learn">
      <path d="M14 66 H186" className="ap-ln ap-thin" />
      <rect x="92" y="46" width="16" height="40" rx="3" className={Ac} />
      <circle cx="100" cy="26" r="7" className={Ln} />
      <path d="M88 44 C 90 36, 110 36, 112 44" className={Ln} />
      <circle r="4" className="ap-dot">
        <animateMotion dur="4s" repeatCount="indefinite" keyTimes="0;0.4;0.62;1" keyPoints="0;0.47;0.53;1" calcMode="linear" path="M14 66 H186" />
      </circle>
      <path d="M140 40 l5 5 9 -11" className={`${Ac} ap-check`} />
      <text x="138" y="96" className="ap-lbl">audited</text>
    </Svg>
  ),
  governance: (
    <Svg label="policy · access · audit">
      <path d="M54 12 L92 22 V54 C92 78, 74 94, 54 102 C34 94, 16 78, 16 54 V22 Z" className={Ln} />
      {[36, 56, 76].map((y, i) => (
        <g key={y}>
          <rect x="108" y={y - 7} width="12" height="12" rx="2" className={Ln} />
          <path d={`M110.5 ${y - 1} l3 3 5 -6`} className={`${Ac} ap-tick`} style={{ animationDelay: `${i * 0.5}s` }} />
          <path d={`M128 ${y} H${i === 1 ? 168 : 184}`} className="ap-ln ap-thin" />
        </g>
      ))}
      <path d="M40 54 l10 10 18 -20" className={`${Ac} ap-draw`} />
    </Svg>
  ),
  observability: (
    <Svg label="drift · cost · uptime">
      <rect x="14" y="10" width="172" height="88" rx="4" className="ap-ln ap-thin" />
      <path d="M14 38 H186" className="ap-thr" />
      <text x="150" y="34" className="ap-lbl">threshold</text>
      <svg x="14" y="10" width="172" height="88" viewBox="14 10 172 88" overflow="hidden">
      <g className="ap-scroll">
        <path d="M0 72 L20 68 L36 74 L52 62 L68 70 L84 58 L100 66 L116 40 L132 62 L148 56 L164 66 L180 60 L196 68 L212 64 L228 72 L244 62 L260 70 L276 58 L292 66 L308 40 L324 62 L340 56 L356 66 L372 60 L388 68" className={Ac} />
      </g>
      </svg>
      <circle cx="116" cy="40" r="3" className="ap-dot ap-alert" />
    </Svg>
  ),
};

export const AGENT_PRIMITIVES = [
  { key: "retrieval", title: "Retrieval & RAG", text: "Grounded answers from your documents and data" },
  { key: "orchestration", title: "Agent orchestration", text: "Multi-step agents that plan, call tools and hand off" },
  { key: "connectors", title: "System connectors", text: "Secure actions inside ERP, CRM and core systems" },
  { key: "documents", title: "Document intelligence", text: "Extraction from contracts, claims and forms" },
  { key: "vision", title: "Computer vision", text: "Detection and inspection on live camera feeds" },
  { key: "predictive", title: "Predictive models", text: "Forecasts and risk signals for planning decisions" },
  { key: "twins", title: "Digital twins", text: "Simulation of assets, lines and facilities" },
  { key: "voice", title: "Voice & language", text: "Speech, transcription and multilingual understanding" },
  { key: "decisions", title: "Decision intelligence", text: "Recommendations with the reasoning behind them" },
  { key: "hitl", title: "Human-in-the-loop", text: "Review, approve and override with full context" },
  { key: "governance", title: "Guardrails & governance", text: "Policies, access controls and audit trails" },
  { key: "observability", title: "Observability", text: "Monitoring for drift, cost and reliability" },
] as const;

export function AgentPrimitives() {
  return (
    <section aria-labelledby="primitives-title" className="section-y overflow-hidden">
      <div className="container-x">
        <SectionHead id="primitives-title" eyebrow="Agent primitives" title="The building blocks we wire into your workflows" />
      </div>
      <div className="mt-[clamp(28px,3.5vw,48px)]">
        <Marquee speed={26} gap="16px">
          {AGENT_PRIMITIVES.map((p, i) => (
            <article key={p.key} className="ap-card flex w-[clamp(232px,20vw,268px)] shrink-0 flex-col rounded-card bg-mist p-4">
              <div className="flex items-center justify-between font-mono text-[11px] text-slate">
                <span className="text-ink">{String(i + 1).padStart(2, "0")}</span>
                <span>NX-AGT</span>
              </div>
              <div className="mt-2">{DRAWINGS[p.key]}</div>
              <h3 className="mt-3 text-[15px] font-medium text-ink">{p.title}</h3>
              <p className="mt-1 text-[13px] leading-snug text-slate">{p.text}</p>
            </article>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
