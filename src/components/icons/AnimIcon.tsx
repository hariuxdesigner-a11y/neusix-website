import type React from "react";
import type { ReactNode } from "react";

/**
 * NeuSix animated icon set. One drawing language across the site: 48×48 grid, 1.5px line in
 * currentColor, one orange "signal" point, and a single looping micro-motion that says what the
 * icon means (gears turn, blocks link, a path is travelled). Pure SVG + CSS (see globals.css,
 * "Animated icons"); every loop is paused for prefers-reduced-motion. Decorative: aria-hidden.
 */

export type AnimIconName =
  // services
  | "ai-transformation"
  | "modernization"
  | "digital-transformation"
  | "software-engineering"
  | "ai-coe"
  | "odc"
  // stage fit
  | "advisory"
  | "development"
  | "managed"
  // approach
  | "discover"
  | "plan"
  | "build"
  | "scale"
  // commercial models
  | "bt"
  | "bot"
  | "bom"
  // competencies
  | "xr"
  | "automation"
  | "robotics"
  | "quantum"
  | "blockchain"
  | "iot"
  // navigation
  | "cases"
  | "industries"
  | "blog"
  | "white-papers";

const I: Record<AnimIconName, ReactNode> = {
  /* ── services ─────────────────────────────────────────────── */
  "ai-transformation": (
    <>
      <path d="M8 39 L24 9 L40 39 Z M24 9 V28 M8 39 L24 28 L40 39" className="t" />
      {[
        [24, 9],
        [40, 39],
        [8, 39],
        [24, 28],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.4" className="ai-node" style={{ animationDelay: `${i * 0.45}s` }} />
      ))}
      <path d="M40 8 l1.2 2.8 2.8 1.2 -2.8 1.2 -1.2 2.8 -1.2 -2.8 -2.8 -1.2 2.8 -1.2 Z" className="o ai-spark" />
    </>
  ),
  modernization: (
    <>
      <path d="M8 34 L24 42 L40 34" />
      <path d="M8 27 L24 35 L40 27" className="t" />
      <g className="ai-lift">
        <path d="M8 18 L24 10 L40 18 L24 26 Z" />
      </g>
      <circle cx="24" cy="18" r="2.2" className="o ai-lift" />
    </>
  ),
  "digital-transformation": (
    <>
      <path d="M8 38 C 8 26, 22 30, 22 22 S 38 18, 40 10" className="t" pathLength={1} />
      <circle cx="8" cy="38" r="3" />
      <rect x="36" y="6" width="8" height="8" rx="2" />
      <circle r="2.6" className="o">
        <animateMotion dur="2.8s" repeatCount="indefinite" path="M8 38 C 8 26, 22 30, 22 22 S 38 18, 40 10" />
      </circle>
    </>
  ),
  "software-engineering": (
    <>
      <path d="M16 14 L6 24 L16 34 M32 14 L42 24 L32 34" />
      <path d="M27 12 L21 36" className="t" />
      <rect x="22.5" y="38" width="6" height="2" className="o ai-blink" />
    </>
  ),
  "ai-coe": (
    <>
      {[0, 72, 144, 216, 288].map((a, i) => {
        const r = (a - 90) * (Math.PI / 180);
        const x = 24 + Math.cos(r) * 16;
        const y = 24 + Math.sin(r) * 16;
        return (
          <g key={a}>
            <path d={`M24 24 L${x.toFixed(1)} ${y.toFixed(1)}`} className="t ai-spoke" style={{ animationDelay: `${i * 0.3}s` }} />
            <circle cx={x} cy={y} r="3" />
          </g>
        );
      })}
      <circle cx="24" cy="24" r="5" />
      <circle cx="24" cy="24" r="2" className="o" />
    </>
  ),
  odc: (
    <>
      <circle cx="24" cy="24" r="15" />
      <path d="M9 24 H39" className="t" />
      <g className="ai-globe">
        <ellipse cx="24" cy="24" rx="6" ry="15" />
      </g>
      <g className="ai-orbit">
        <circle cx="24" cy="5" r="2.6" className="o" />
      </g>
    </>
  ),

  /* ── stage fit ───────────────────────────────────────────── */
  advisory: (
    <>
      <circle cx="24" cy="24" r="17" />
      <path d="M24 9 v3 M24 36 v3 M9 24 h3 M36 24 h3" className="t" />
      <g className="ai-needle">
        <path d="M24 13 L28 24 L24 35 L20 24 Z" />
        <path d="M24 13 L28 24 L20 24 Z" className="f" />
      </g>
      <circle cx="24" cy="24" r="1.8" className="o" />
    </>
  ),
  development: (
    <>
      <g className="ai-plug-l">
        <path d="M6 18 H20 V22 a2 2 0 0 0 0 4 V30 H6 Z" />
      </g>
      <g className="ai-plug-r">
        <path d="M42 18 H26 V22 a2 2 0 0 1 0 4 V30 H42 Z" />
      </g>
      <circle cx="23" cy="24" r="2" className="o ai-joint" />
      <path d="M10 38 H38" className="t" />
    </>
  ),
  managed: (
    <>
      <g className="ai-spin">
        <path d="M38 20 A15 15 0 0 0 11 17 M10 28 A15 15 0 0 0 37 31" />
        <path d="M11 11 V17 H17 M37 37 V31 H31" />
      </g>
      <path d="M18 24 l4 4 8 -8" className="ai-tickloop" />
      <circle cx="38" cy="20" r="2" className="o" />
    </>
  ),

  /* ── approach ────────────────────────────────────────────── */
  discover: (
    <>
      <path d="M8 40 H40" className="t" />
      <g className="ai-sweep">
        <circle cx="20" cy="20" r="10" />
        <path d="M27.5 27.5 L36 36" />
      </g>
      <circle cx="20" cy="20" r="2.4" className="o ai-blinkdot" />
    </>
  ),
  plan: (
    <>
      <path d="M6 36 C 14 36, 14 22, 22 22 S 32 10, 42 10" className="ai-drawloop" pathLength={1} />
      {[
        [6, 36],
        [22, 22],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="2.6" />
      ))}
      <path d="M40 6 V16 M40 6 H46 L44 8.5 L46 11 H40" />
      <circle cx="42" cy="10" r="1.6" className="o" />
    </>
  ),
  build: (
    <>
      <path d="M6 42 H42" className="t" />
      <rect x="9" y="30" width="14" height="10" rx="1.5" />
      <rect x="25" y="30" width="14" height="10" rx="1.5" />
      <g className="ai-drop">
        <rect x="17" y="18" width="14" height="10" rx="1.5" />
      </g>
      <circle cx="24" cy="10" r="2" className="o ai-drop" />
    </>
  ),
  scale: (
    <>
      <path d="M6 42 H42" className="t" />
      {[
        [10, 10],
        [20, 16],
        [30, 24],
      ].map(([x, h], i) => (
        <rect key={x} x={x} y={40 - h} width="7" height={h} rx="1" className="ai-grow" style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
      <path d="M10 22 L22 14 L28 18 L40 8 M34 8 H40 V14" />
      <circle cx="40" cy="8" r="2" className="o" />
    </>
  ),

  /* ── commercial models ──────────────────────────────────── */
  bt: (
    <>
      <path d="M6 38 H18 M30 38 H42" className="t" />
      <path d="M12 16 C 18 7, 30 7, 36 16 M36 16 l-5 -0.6 M36 16 l0.8 -5" />
      <g className="ai-handover">
        <rect x="8" y="24" width="12" height="12" rx="2" />
      </g>
      <circle cx="24" cy="9.4" r="2" className="o" />
    </>
  ),
  bot: (
    <>
      <g className="ai-spin-slow">
        <path d="M30 14 A10 10 0 1 0 31 30" />
        <path d="M30 8 V14 H24" />
      </g>
      <path d="M34 24 H44 M40 20 l4 4 -4 4" className="ai-nudge" />
      <circle cx="21" cy="22" r="2.4" className="o" />
    </>
  ),
  bom: (
    <>
      <path d="M24 24 C 18 14, 6 14, 6 24 S 18 34, 24 24 S 42 14, 42 24 S 30 34, 24 24" className="t" />
      <circle r="2.6" className="o">
        <animateMotion dur="3.6s" repeatCount="indefinite" path="M24 24 C 18 14, 6 14, 6 24 S 18 34, 24 24 S 42 14, 42 24 S 30 34, 24 24" />
      </circle>
      <path d="M24 38 v4 M18 42 h12" />
    </>
  ),

  /* ── competencies ───────────────────────────────────────── */
  xr: (
    <>
      <path d="M6 18 a4 4 0 0 1 4 -4 H38 a4 4 0 0 1 4 4 V30 a4 4 0 0 1 -4 4 H30 L26 29 H22 L18 34 H10 a4 4 0 0 1 -4 -4 Z" />
      <circle cx="16" cy="24" r="4" className="t" />
      <circle cx="32" cy="24" r="4" className="t" />
      <path d="M10 20 H38" className="ai-scanx" />
      <circle cx="32" cy="24" r="1.6" className="o" />
    </>
  ),
  automation: (
    <>
      <g className="ai-gear">
        <circle cx="18" cy="20" r="6" />
        <path d="M18 8 v4 M18 28 v4 M6 20 h4 M26 20 h4 M9.5 11.5 l2.8 2.8 M23.7 25.7 l2.8 2.8 M9.5 28.5 l2.8 -2.8 M23.7 14.3 l2.8 -2.8" />
      </g>
      <g className="ai-gear-r">
        <circle cx="33" cy="33" r="4.5" />
        <path d="M33 24 v3 M33 39 v3 M24 33 h3 M39 33 h3 M26.6 26.6 l2.1 2.1 M37.3 37.3 l2.1 2.1 M26.6 39.4 l2.1 -2.1 M37.3 28.7 l2.1 -2.1" />
      </g>
      <circle cx="18" cy="20" r="1.8" className="o" />
    </>
  ),
  robotics: (
    <>
      <path d="M8 42 H26 M12 42 V38 H22 V42" />
      <circle cx="17" cy="34" r="3" />
      <g className="ai-arm">
        <path d="M17 34 L26 18" />
        <circle cx="26" cy="18" r="2.6" />
        <g className="ai-forearm">
          <path d="M26 18 L38 14 M38 14 l3 -3 M38 14 l3 3" />
        </g>
      </g>
      <circle cx="41" cy="14" r="1.6" className="o ai-blinkdot" />
    </>
  ),
  quantum: (
    <>
      <g className="ai-orbit-a">
        <ellipse cx="24" cy="24" rx="18" ry="7" />
      </g>
      <g className="ai-orbit-b">
        <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(60 24 24)" />
      </g>
      <g className="ai-orbit-c">
        <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(120 24 24)" className="t" />
      </g>
      <circle cx="24" cy="24" r="3" className="o" />
    </>
  ),
  blockchain: (
    <>
      {[6, 19, 32].map((x) => (
        <rect key={x} x={x} y="18" width="10" height="12" rx="2" />
      ))}
      <path d="M16 24 H19" className="ai-link" />
      <path d="M29 24 H32" className="ai-link" style={{ animationDelay: ".5s" }} />
      <circle cx="37" cy="24" r="1.8" className="o ai-blinkdot" />
      <path d="M6 36 H42" className="t" />
    </>
  ),
  iot: (
    <>
      <circle cx="24" cy="30" r="3" />
      <circle cx="24" cy="30" r="1.4" className="o" />
      {[8, 14, 20].map((r, i) => (
        <path key={r} d={`M${24 - r * 0.8} ${30 - r * 0.6} A${r} ${r} 0 0 1 ${24 + r * 0.8} ${30 - r * 0.6}`} className="ai-wave" style={{ animationDelay: `${i * 0.35}s` }} />
      ))}
      <path d="M24 33 V42 M18 42 H30" className="t" />
    </>
  ),

  /* ── navigation ─────────────────────────────────────────── */
  cases: (
    <>
      <rect x="9" y="6" width="30" height="36" rx="3" />
      <path d="M15 14 H33" className="t" />
      <path d="M15 34 L21 27 L26 30 L33 20" className="ai-drawloop" pathLength={1} />
      <circle cx="33" cy="20" r="2" className="o" />
    </>
  ),
  industries: (
    <>
      <path d="M5 42 H43 M8 42 V22 L18 16 V42 M18 42 V10 H32 V42 M32 42 V24 H40 V42" />
      {[
        [22, 16],
        [27, 16],
        [22, 23],
        [27, 23],
        [22, 30],
        [27, 30],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="2.6" height="3" className="f ai-window" style={{ animationDelay: `${(i * 0.37) % 1.8}s` }} />
      ))}
      <circle cx="36" cy="30" r="1.6" className="o" />
    </>
  ),
  blog: (
    <>
      <rect x="10" y="6" width="28" height="36" rx="3" />
      <path d="M16 14 H32" />
      {[22, 28, 34].map((y, i) => (
        <path key={y} d={`M16 ${y} H${i === 2 ? 26 : 32}`} className="t ai-type" style={{ animationDelay: `${i * 0.4}s` }} pathLength={1} />
      ))}
      <rect x="27" y="32" width="1.8" height="4" className="o ai-blink" />
    </>
  ),
  "white-papers": (
    <>
      <path d="M16 10 V8 a2 2 0 0 1 2 -2 H34 l8 8 V38 a2 2 0 0 1 -2 2 H38" className="t" />
      <g className="ai-page">
        <path d="M8 14 a2 2 0 0 1 2 -2 H26 l8 8 V40 a2 2 0 0 1 -2 2 H10 a2 2 0 0 1 -2 -2 Z M26 12 V20 H34" />
        <path d="M14 28 H28 M14 33 H28 M14 38 H22" className="t" />
      </g>
      <circle cx="30" cy="16" r="1.6" className="o" />
    </>
  ),
};

export function AnimIcon({ name, className = "", style }: { name: AnimIconName; className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden focusable="false" className={`ai ai-${name} ${className}`} style={style}>
      {I[name]}
    </svg>
  );
}

/** Service slug → icon */
export const SERVICE_ICON: Record<string, AnimIconName> = {
  "ai-transformation-page": "ai-transformation",
  modernization: "modernization",
  "digital-transformation": "digital-transformation",
  "software-engineering-services": "software-engineering",
  "ai-center-of-excellence": "ai-coe",
  "offshore-development-center": "odc",
};
