import type { ReactNode } from "react";

/**
 * Home banner scenes: one animated infographic per capability line, drawn in a single NeuSix
 * language (thin navy/lilac lines, white panels, mono labels, orange signal pulses). Each scene has
 * a faint full-bleed backdrop and three modules placed around the centred headline: left (.hs-l),
 * right (.hs-r) and one framed by the tracking box (.hs-t). On phones the modules move above and
 * below the copy. Pure SVG with CSS keyframes and SMIL; frozen for reduced motion. Decorative.
 */

const NAVY = "#313168";
const BRAND = "#403e8e";
const LILAC = "#6d6eb5";
const ORANGE = "#ef703d";

/* ---------- primitives ---------- */

function Panel({ w, h, title, children, tag }: { w: number; h: number; title: string; tag?: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="hs-svg" aria-hidden focusable="false">
      <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" className="hs-panel" />
      <circle cx="18" cy="20" r="3.2" fill={ORANGE} className="hs-blink" />
      <text x="28" y="24" className="hs-title">
        {title}
      </text>
      {tag && (
        <text x={w - 16} y="24" textAnchor="end" className="hs-mono">
          {tag}
        </text>
      )}
      <path d={`M14 36 H${w - 14}`} className="hs-rule" />
      {children}
    </svg>
  );
}

function Pulse({ path, dur = 2.4, begin = 0, r = 3, color = ORANGE }: { path: string; dur?: number; begin?: number; r?: number; color?: string }) {
  return (
    <circle r={r} fill={color} className="hs-pulse">
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
    </circle>
  );
}

function Chip({ x, y, w, label, on = false, delay = 0 }: { x: number; y: number; w: number; label: string; on?: boolean; delay?: number }) {
  return (
    <g className="hs-in" style={{ animationDelay: `${delay}s` }}>
      <rect x={x} y={y} width={w} height="24" rx="12" className={on ? "hs-chip-on" : "hs-chip"} />
      <circle cx={x + 13} cy={y + 12} r="3" fill={on ? ORANGE : LILAC} />
      <text x={x + 22} y={y + 16} className="hs-label">
        {label}
      </text>
    </g>
  );
}

/** faint full-bleed backdrop: a network of nodes with a few travelling pulses */
function NetBackdrop({ variant }: { variant: "net" | "circuit" | "floor" | "iso" | "space" }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden focusable="false">
      {variant === "net" && (
        <g className="hs-back">
          {[
            [120, 160, 420, 320],
            [420, 320, 260, 620],
            [260, 620, 520, 780],
            [1480, 180, 1220, 360],
            [1220, 360, 1380, 640],
            [1380, 640, 1100, 790],
            [420, 320, 640, 140],
            [1220, 360, 980, 120],
          ].map(([a, b, c, d], k) => (
            <path key={k} d={`M${a} ${b} L${c} ${d}`} />
          ))}
          {[
            [120, 160],
            [420, 320],
            [260, 620],
            [520, 780],
            [640, 140],
            [1480, 180],
            [1220, 360],
            [1380, 640],
            [1100, 790],
            [980, 120],
          ].map(([x, y], k) => (
            <circle key={k} cx={x} cy={y} r="5" className="hs-back-node" />
          ))}
          <Pulse path="M120 160 L420 320 L260 620 L520 780" dur={5} r={3.5} color={LILAC} />
          <Pulse path="M1480 180 L1220 360 L1380 640 L1100 790" dur={5.5} begin={1.2} r={3.5} color={LILAC} />
        </g>
      )}
      {variant === "circuit" && (
        <g className="hs-back">
          {["M0 220 H260 V120 H520", "M0 700 H200 V820 H560", "M1600 260 H1360 V150 H1080", "M1600 680 H1420 V800 H1060", "M260 220 V420 H120", "M1360 260 V470 H1500"].map((d, k) => (
            <path key={k} d={d} />
          ))}
          {[
            [520, 120],
            [560, 820],
            [1080, 150],
            [1060, 800],
            [120, 420],
            [1500, 470],
          ].map(([x, y], k) => (
            <rect key={k} x={x - 6} y={y - 6} width="12" height="12" rx="2" className="hs-back-node" />
          ))}
          <Pulse path="M0 220 H260 V120 H520" dur={3.2} r={3.5} color={LILAC} />
          <Pulse path="M1600 680 H1420 V800 H1060" dur={3.6} begin={0.8} r={3.5} color={LILAC} />
        </g>
      )}
      {variant === "floor" && (
        <g className="hs-back">
          {Array.from({ length: 13 }, (_, k) => (
            <path key={`v${k}`} d={`M800 520 L${-400 + k * 200} 900`} />
          ))}
          {[600, 660, 740, 840].map((y) => (
            <path key={y} d={`M0 ${y} H1600`} />
          ))}
        </g>
      )}
      {variant === "iso" && (
        <g className="hs-back">
          {Array.from({ length: 18 }, (_, k) => (
            <path key={`a${k}`} d={`M${-300 + k * 120} 900 L${300 + k * 120} 0`} />
          ))}
          {Array.from({ length: 18 }, (_, k) => (
            <path key={`b${k}`} d={`M${-300 + k * 120} 0 L${300 + k * 120} 900`} />
          ))}
        </g>
      )}
      {variant === "space" && (
        <g className="hs-back">
          {Array.from({ length: 9 }, (_, k) => (
            <ellipse key={k} cx="800" cy="980" rx={260 + k * 140} ry={120 + k * 60} />
          ))}
          {[
            [180, 200],
            [1420, 220],
            [300, 760],
            [1300, 760],
            [760, 110],
          ].map(([x, y], k) => (
            <path key={k} d={`M${x - 8} ${y} H${x + 8} M${x} ${y - 8} V${y + 8}`} className="hs-twinkle" style={{ animationDelay: `${k * 0.5}s` }} />
          ))}
        </g>
      )}
    </svg>
  );
}

/* ---------- scenes ---------- */

const EnterpriseAI = (
  <>
    <NetBackdrop variant="net" />
    <div className="hs-mod hs-l">
      <Panel w={300} h={250} title="Orchestrator" tag="agents">
        {/* hub */}
        <circle cx="70" cy="140" r="26" className="hs-hub" />
        <circle cx="70" cy="140" r="26" className="hs-ring" />
        <text x="70" y="144" textAnchor="middle" className="hs-mono-strong">
          plan
        </text>
        {[
          ["Research agent", 62, 0],
          ["Finance agent", 122, 0.6],
          ["Support agent", 182, 1.2],
        ].map(([label, y, d]) => (
          <g key={label as string}>
            <path d={`M96 140 C 120 140, 120 ${(y as number) + 12}, 146 ${(y as number) + 12}`} className="hs-link" />
            <Pulse path={`M96 140 C 120 140, 120 ${(y as number) + 12}, 146 ${(y as number) + 12}`} dur={1.8} begin={d as number} />
            <Chip x={146} y={y as number} w={138} label={label as string} on={(d as number) === 0.6} delay={(d as number) + 0.2} />
          </g>
        ))}
        <text x="16" y="232" className="hs-mono">
          task → plan → delegate → verify
        </text>
      </Panel>
    </div>
    <div className="hs-mod hs-r">
      <Panel w={300} h={230} title="Generative AI" tag="LLM">
        <rect x="16" y="50" width="268" height="30" rx="8" className="hs-field" />
        <text x="28" y="70" className="hs-label">
          Summarise this quarter’s claims
        </text>
        <rect x="236" y="58" width="2" height="14" fill={BRAND} className="hs-caret" />
        {[96, 114, 132, 150].map((y, k) => (
          <path key={y} d={`M16 ${y} H${[260, 230, 250, 180][k]}`} className="hs-type" style={{ animationDelay: `${0.4 + k * 0.35}s` }} />
        ))}
        <Chip x={16} y={176} w={86} label="RAG" delay={1.6} />
        <Chip x={108} y={176} w={92} label="Tools" delay={1.8} />
        <Chip x={206} y={176} w={78} label="Guard" on delay={2} />
      </Panel>
    </div>
    <div className="hs-mod hs-t">
      <svg viewBox="0 0 260 110" className="hs-svg" aria-hidden focusable="false">
        <rect x="40" y="30" width="180" height="50" rx="25" className="hs-panel" />
        <path d="M66 55 l8 8 14 -16" className="hs-tick" />
        <text x="100" y="60" className="hs-label">
          Human approval
        </text>
      </svg>
    </div>
  </>
);

const EdgeAI = (
  <>
    <NetBackdrop variant="circuit" />
    <div className="hs-mod hs-l">
      <Panel w={300} h={240} title="Camera · on device" tag="live">
        <rect x="16" y="48" width="268" height="150" rx="8" className="hs-field" />
        {/* scene sketch */}
        <path d="M16 170 H284 M60 170 V120 H120 V170 M180 170 V100 H250 V170" className="hs-link" />
        <path d="M30 60 H270" className="hs-scan" />
        <g className="hs-box-a">
          <rect x="52" y="108" width="78" height="66" rx="3" className="hs-bbox" />
          <rect x="52" y="94" width="58" height="14" rx="3" fill={ORANGE} />
          <text x="57" y="104" className="hs-mono-w">
            person
          </text>
        </g>
        <g className="hs-box-b">
          <rect x="172" y="90" width="86" height="84" rx="3" className="hs-bbox" />
          <rect x="172" y="76" width="64" height="14" rx="3" fill={BRAND} />
          <text x="177" y="86" className="hs-mono-w">
            forklift
          </text>
        </g>
        <text x="16" y="224" className="hs-mono">
          detect · track · alert, without the cloud
        </text>
      </Panel>
    </div>
    <div className="hs-mod hs-r">
      <Panel w={300} h={220} title="Edge model" tag="INT8">
        {/* chip */}
        <rect x="40" y="70" width="90" height="90" rx="10" className="hs-hub" />
        <rect x="62" y="92" width="46" height="46" rx="6" className="hs-ring" />
        {[0, 1, 2, 3].map((k) => (
          <g key={k}>
            <path d={`M${54 + k * 20} 70 V56 M${54 + k * 20} 160 V174 M40 ${84 + k * 20} H26 M130 ${84 + k * 20} H144`} className="hs-link" />
          </g>
        ))}
        <circle cx="85" cy="115" r="5" fill={ORANGE} className="hs-blink" />
        {[
          ["Compressed", 0],
          ["Low latency", 0.4],
          ["Works offline", 0.8],
        ].map(([l, d], k) => (
          <Chip key={l as string} x={160} y={70 + k * 34} w={124} label={l as string} on={k === 2} delay={d as number} />
        ))}
      </Panel>
    </div>
    <div className="hs-mod hs-t">
      <svg viewBox="0 0 260 110" className="hs-svg" aria-hidden focusable="false">
        <circle cx="70" cy="62" r="7" fill={BRAND} />
        {[18, 30, 42].map((r, k) => (
          <path key={r} d={`M${70 - r} ${62 - r * 0.2} A ${r} ${r} 0 0 1 ${70 + r} ${62 - r * 0.2}`} className="hs-arc" style={{ animationDelay: `${k * 0.3}s` }} />
        ))}
        <path d="M120 62 H200" className="hs-dash" />
        <Pulse path="M120 62 H200" dur={1.6} />
        <rect x="200" y="44" width="40" height="36" rx="8" className="hs-panel" />
        <text x="220" y="66" textAnchor="middle" className="hs-mono-strong">
          sync
        </text>
      </svg>
    </div>
  </>
);

const PhysicalAI = (
  <>
    <NetBackdrop variant="floor" />
    <div className="hs-mod hs-l">
      <Panel w={300} h={250} title="Robot cell" tag="pick">
        {/* conveyor */}
        <path d="M16 206 H284" className="hs-link" />
        <path d="M16 214 H284" className="hs-dash" />
        {[0, 1, 2].map((k) => (
          <rect key={k} width="26" height="22" rx="3" y="183" className="hs-boxmove" style={{ animationDelay: `${k * -1.6}s` }} />
        ))}
        {/* arm */}
        <rect x="40" y="186" width="48" height="16" rx="4" className="hs-hub" />
        <g className="hs-arm">
          <path d="M64 186 L96 120" className="hs-limb" />
          <circle cx="64" cy="186" r="7" className="hs-joint" />
          <g className="hs-fore">
            <path d="M96 120 L160 104" className="hs-limb" />
            <circle cx="96" cy="120" r="7" className="hs-joint" />
            <path d="M160 104 l10 -6 M160 104 l10 6" className="hs-limb-thin" />
          </g>
        </g>
        <text x="16" y="236" className="hs-mono">
          vision-guided picking
        </text>
      </Panel>
    </div>
    <div className="hs-mod hs-r">
      <Panel w={300} h={220} title="Perceive · Plan · Act">
        {["Perceive", "Plan", "Act"].map((s, k) => (
          <g key={s}>
            <rect x={16 + k * 92} y="54" width="84" height="34" rx="17" className="hs-stage" style={{ animationDelay: `${k * 0.9}s` }} />
            <text x={58 + k * 92} y="76" textAnchor="middle" className="hs-label">
              {s}
            </text>
            {k < 2 && <path d={`M${100 + k * 92} 71 h8`} className="hs-link" />}
          </g>
        ))}
        {/* path planning grid */}
        <g>
          {Array.from({ length: 7 }, (_, k) => (
            <path key={`g${k}`} d={`M${16 + k * 44.6} 102 V204`} className="hs-grid" />
          ))}
          {Array.from({ length: 4 }, (_, k) => (
            <path key={`h${k}`} d={`M16 ${102 + k * 34} H284`} className="hs-grid" />
          ))}
          <rect x="105" y="102" width="44" height="68" className="hs-block" />
          <path d="M38 190 L60 190 L82 156 L172 156 L194 120 L262 120" className="hs-route" />
          <circle cx="38" cy="190" r="5" fill={BRAND} />
          <circle cx="262" cy="120" r="5" fill={ORANGE} />
        </g>
      </Panel>
    </div>
    <div className="hs-mod hs-t">
      <svg viewBox="0 0 260 110" className="hs-svg" aria-hidden focusable="false">
        <g className="hs-hover">
          <path d="M100 56 H160 M110 56 L96 44 M150 56 L164 44 M110 56 L96 68 M150 56 L164 68" className="hs-limb-thin" />
          <rect x="116" y="48" width="28" height="16" rx="5" className="hs-hub" />
          {[
            [92, 42],
            [168, 42],
            [92, 70],
            [168, 70],
          ].map(([x, y], k) => (
            <ellipse key={k} cx={x} cy={y} rx="12" ry="3" className="hs-prop" />
          ))}
          <path d="M130 64 V94" className="hs-dash" />
        </g>
      </svg>
    </div>
  </>
);

const DigitalTwins = (
  <>
    <NetBackdrop variant="iso" />
    <div className="hs-mod hs-l">
      <Panel w={300} h={240} title="Physical asset" tag="plant">
        {/* isometric plant */}
        <g transform="translate(150 140)">
          <path d="M-90 30 L0 75 L90 30 L0 -15 Z" className="hs-iso-top" />
          <path d="M-90 30 V-20 L0 -65 L90 -20 V30" className="hs-link" />
          <path d="M0 -15 V-65 M-90 -20 L0 25 L90 -20 M0 25 V75" className="hs-link" />
          <path d="M40 -40 V-90 M60 -30 V-82" className="hs-link" />
          {[
            [-50, 18],
            [36, 6],
            [-10, -32],
          ].map(([x, y], k) => (
            <g key={k}>
              <circle cx={x} cy={y} r="5" fill={ORANGE} className="hs-blink" style={{ animationDelay: `${k * 0.5}s` }} />
              <circle cx={x} cy={y} r="5" className="hs-ping" style={{ animationDelay: `${k * 0.5}s` }} />
            </g>
          ))}
        </g>
        <text x="16" y="226" className="hs-mono">
          sensors stream live state
        </text>
      </Panel>
    </div>
    <div className="hs-mod hs-r">
      <Panel w={300} h={230} title="Digital twin" tag="synced">
        <g transform="translate(96 124)">
          <path d="M-70 24 L0 59 L70 24 L0 -11 Z" className="hs-iso-twin" />
          <path d="M-70 24 V-16 L0 -51 L70 -16 V24 M0 -11 V-51 M-70 -16 L0 19 L70 -16 M0 19 V59" className="hs-twin-line" />
        </g>
        {[
          ["Health", 0.86],
          ["Load", 0.62],
          ["Energy", 0.74],
        ].map(([l, v], k) => (
          <g key={l as string} transform={`translate(186 ${62 + k * 48})`}>
            <text x="0" y="10" className="hs-mono">
              {l}
            </text>
            <rect x="0" y="18" width="96" height="8" rx="4" className="hs-track" />
            <rect x="0" y="18" width={96 * (v as number)} height="8" rx="4" fill={k === 0 ? ORANGE : BRAND} className="hs-meter" style={{ animationDelay: `${k * 0.3}s` }} />
          </g>
        ))}
        <text x="16" y="216" className="hs-mono">
          simulate before you change the line
        </text>
      </Panel>
    </div>
    <div className="hs-mod hs-t">
      <svg viewBox="0 0 260 110" className="hs-svg" aria-hidden focusable="false">
        <rect x="24" y="38" width="64" height="36" rx="8" className="hs-panel" />
        <text x="56" y="60" textAnchor="middle" className="hs-mono-strong">
          real
        </text>
        <rect x="172" y="38" width="64" height="36" rx="8" className="hs-panel" />
        <text x="204" y="60" textAnchor="middle" className="hs-mono-strong">
          twin
        </text>
        <path d="M94 50 H166 M166 62 H94" className="hs-dash" />
        <Pulse path="M94 50 H166" dur={1.4} />
        <Pulse path="M166 62 H94" dur={1.4} begin={0.7} color={BRAND} />
      </svg>
    </div>
  </>
);

const XR = (
  <>
    <NetBackdrop variant="space" />
    <div className="hs-mod hs-l">
      <Panel w={300} h={230} title="Headset view" tag="MR">
        <path d="M40 92 a20 20 0 0 1 20 -20 H240 a20 20 0 0 1 20 20 V140 a20 20 0 0 1 -20 20 H186 L160 132 H140 L114 160 H60 a20 20 0 0 1 -20 -20 Z" className="hs-headset" />
        <path d="M70 96 h56 M174 96 h56" className="hs-glint" />
        <path d="M86 160 L40 214 M214 160 L260 214" className="hs-dash" />
        <text x="150" y="206" textAnchor="middle" className="hs-mono">
          field of view
        </text>
      </Panel>
    </div>
    <div className="hs-mod hs-r">
      <Panel w={300} h={240} title="Remote assist" tag="step 2 / 5">
        {/* pump */}
        <g transform="translate(70 150)">
          <circle r="34" className="hs-hub" />
          <circle r="14" className="hs-ring" />
          <path d="M34 -6 H70 V-26 M-34 0 H-56 M0 34 V56 H-30 M0 34 V56 H30" className="hs-link" />
        </g>
        {/* anchored annotations */}
        <path d="M140 124 L176 88" className="hs-leader" />
        <circle cx="140" cy="124" r="4" fill={ORANGE} />
        <g className="hs-in" style={{ animationDelay: "0.3s" }}>
          <rect x="170" y="66" width="118" height="44" rx="8" className="hs-ar" />
          <text x="180" y="84" className="hs-label">
            Valve
          </text>
          <text x="180" y="100" className="hs-mono">
            close, then check
          </text>
        </g>
        <path d="M90 186 L176 196" className="hs-leader" />
        <circle cx="90" cy="186" r="4" fill={BRAND} />
        <g className="hs-in" style={{ animationDelay: "0.9s" }}>
          <rect x="176" y="176" width="108" height="40" rx="8" className="hs-ar" />
          <text x="186" y="200" className="hs-label">
            Pressure OK
          </text>
        </g>
      </Panel>
    </div>
    <div className="hs-mod hs-t">
      <svg viewBox="0 0 260 110" className="hs-svg" aria-hidden focusable="false">
        <g className="hs-cube">
          <path d="M110 34 H150 V74 H110 Z M124 24 H164 V64 H124 Z M110 34 L124 24 M150 34 L164 24 M150 74 L164 64 M110 74 L124 64" className="hs-limb-thin" />
        </g>
        <path d="M60 92 H200" className="hs-dash" />
        <circle cx="130" cy="92" r="4" fill={ORANGE} />
        <text x="180" y="88" className="hs-mono">
          anchor
        </text>
      </svg>
    </div>
  </>
);

export const HERO_SCENES: Record<string, ReactNode> = {
  "enterprise-ai": EnterpriseAI,
  "edge-ai": EdgeAI,
  "physical-ai": PhysicalAI,
  "digital-twins": DigitalTwins,
  xr: XR,
};

export type HeroSceneId = keyof typeof HERO_SCENES;

export { NAVY as HS_NAVY };
