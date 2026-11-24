import type { ReactNode } from "react";

/**
 * Small animated technical drawings for the 12 microservice areas (200×120, thin ink lines, one
 * indigo accent, one orange signal). Pure SVG + CSS keyframes (".ap-*" in globals.css) / SMIL;
 * all motion stops for prefers-reduced-motion. Decorative (aria-hidden).
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

export const LIBRARY_DRAWINGS: Record<string, ReactNode> = {
  enterprise: (
    <Svg label="documents → RAG → agent">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${16 + i * 7} ${16 + i * 7})`}>
          <rect width="50" height="64" rx="3" className={`${Ln} ap-paper`} />
          {[12, 21, 30, 39, 48].map((y) => (
            <path key={y} d={`M7 ${y}H${y % 18 === 3 ? 34 : 43}`} className="ap-ln ap-thin" />
          ))}
        </g>
      ))}
      <rect x="36" y="50" width="36" height="8" rx="2" className="ap-hl ap-chunk" />
      <path d="M88 56 H120" className={`${Ac} ap-flow`} />
      <rect x="122" y="40" width="62" height="32" rx="16" className={`${Ac} ap-fillac`} />
      <circle cx="138" cy="56" r="4" className="ap-dot ap-pulse" />
      <text x="148" y="59.5" className="ap-lbl ap-lbl-ac">agent</text>
    </Svg>
  ),
  vision: (
    <Svg label="detect · locate · inspect">
      <rect x="18" y="12" width="164" height="86" rx="4" className="ap-ln ap-thin" />
      <path d="M70 86 L70 50 L100 36 L130 50 L130 86 Z M70 50 L100 64 L130 50 M100 64 V86" className={Ln} />
      <g className="ap-brackets">
        <path d="M58 36 v-8 h8 M142 36 v-8 h-8 M58 90 v8 h8 M142 90 v8 h-8" className={Ac} />
      </g>
      <rect x="58" y="15" width="34" height="10" rx="2" className="ap-tagbg" />
      <text x="62" y="22.5" className="ap-lbl ap-lbl-w">crate</text>
      <circle cx="116" cy="72" r="2.6" className="ap-dot ap-pulse" />
    </Svg>
  ),
  twins: (
    <Svg label="physical ↔ digital sync">
      <rect x="18" y="28" width="56" height="56" rx="4" className={Ln} />
      <circle cx="46" cy="56" r="14" className={Ln} />
      <path d="M46 42 V36 M46 70 v6 M32 56 h-6 M60 56 h6" className={Ln} />
      <g className="ap-twin">
        <rect x="126" y="28" width="56" height="56" rx="4" className={`${Ac} ap-dash`} />
        <circle cx="154" cy="56" r="14" className={`${Ac} ap-dash`} />
        <path d="M154 42 V36 M154 70 v6 M140 56 h-6 M168 56 h6" className={Ac} />
      </g>
      <path d="M80 48 H120" className={`${Ac} ap-flow`} />
      <path d="M120 64 H80" className="ap-ln ap-flow" />
      <path d="M116 44 l4 4 -4 4 M84 60 l-4 4 4 4" className={Ac} />
    </Svg>
  ),
  iot: (
    <Svg label="sensors → gateway → cloud">
      <rect x="84" y="44" width="32" height="24" rx="4" className={`${Ac} ap-fillac`} />
      <text x="88.5" y="59" className="ap-lbl ap-lbl-ac">gw</text>
      {[
        [22, 22],
        [22, 90],
        [56, 100],
        [178, 26],
        [178, 88],
      ].map(([x, y], i) => {
        const d = `M${x} ${y} L100 56`;
        return (
          <g key={i}>
            <path d={d} className="ap-ln ap-thin ap-dash" />
            <circle cx={x} cy={y} r="5" className={Ln} />
            <circle r="2.4" className="ap-dot">
              <animateMotion dur="2.4s" begin={`${i * 0.45}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        );
      })}
      <path d="M100 44 V14 M92 14 h16" className={`${Ac} ap-flow`} />
    </Svg>
  ),
  edge: (
    <Svg label="compress · deploy · update">
      <rect x="14" y="20" width="58" height="72" rx="4" className={Ln} />
      {[0, 1, 2, 3].flatMap((r) =>
        [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={28 + c * 15} cy={34 + r * 15} r="3" className="ap-ln ap-thin" />),
      )}
      <path d="M78 56 H124" className={`${Ac} ap-flow`} />
      <path d="M120 52 l4 4 -4 4" className={Ac} />
      <rect className="ap-dot" width="9" height="9" rx="2" x="-4.5" y="-4.5">
        <animateMotion dur="2.2s" repeatCount="indefinite" path="M80 56 H120" />
      </rect>
      <rect x="132" y="38" width="44" height="36" rx="6" className={`${Ac} ap-fillac`} />
      <circle cx="154" cy="56" r="8" className={Ac} />
      <circle cx="154" cy="56" r="3" className="ap-dot ap-pulse" />
      <path d="M144 74 v8 h20 v-8" className={Ln} />
    </Svg>
  ),
  physical: (
    <Svg label="perceive · plan · act">
      <path d="M14 98 H70 M24 98 v-8 h26 v8" className={Ln} />
      <circle cx="37" cy="84" r="5" className={Ln} />
      <path d="M37 84 L58 48 L92 40" className={Ln} />
      <circle cx="58" cy="48" r="3.4" className={Ln} />
      <path d="M92 40 l6 -5 M92 40 l6 5" className={Ln} />
      <path d="M98 40 C 128 30, 150 50, 160 78" className={`${Ac} ap-dash`} />
      <circle r="3" className="ap-dot">
        <animateMotion dur="2.8s" repeatCount="indefinite" path="M98 40 C 128 30, 150 50, 160 78" />
      </circle>
      <rect x="150" y="80" width="22" height="16" rx="2" className={Ln} />
      <g className="ap-brackets">
        <path d="M144 76 v-5 h5 M178 76 v-5 h-5 M144 100 v5 h5 M178 100 v5 h-5" className={Ac} />
      </g>
    </Svg>
  ),
  xr: (
    <Svg label="spatial overlay · remote assist">
      <path d="M14 46 a6 6 0 0 1 6 -6 H58 a6 6 0 0 1 6 6 V62 a6 6 0 0 1 -6 6 H46 L40 60 H38 L32 68 H20 a6 6 0 0 1 -6 -6 Z" className={Ln} />
      <path d="M70 54 H96" className={`${Ac} ap-flow`} />
      <g className="ap-twin">
        <path d="M110 40 h34 v34 h-34 Z M124 28 h34 v34 h-34 Z M110 40 l14 -12 M144 40 l14 -12 M144 74 l14 -12 M110 74 l14 -12" className={`${Ac}`} />
      </g>
      <g className="ap-field">
        <path d="M158 28 L176 18" className="ap-ln ap-thin" />
        <rect x="164" y="8" width="30" height="11" rx="2" className="ap-tagbg" />
        <text x="168" y="16" className="ap-lbl ap-lbl-w">valve</text>
      </g>
      <circle cx="134" cy="51" r="2.6" className="ap-dot ap-pulse" />
    </Svg>
  ),
  nlp: (
    <Svg label="text → entities · intent">
      {[
        [18, 24, 150],
        [18, 42, 120],
        [18, 60, 160],
        [18, 78, 96],
      ].map(([x, y, w]) => (
        <path key={y} d={`M${x} ${y} H${x + w}`} className="ap-ln ap-thin" />
      ))}
      {[
        [40, 20, 44, "ORG", 0],
        [96, 38, 34, "DATE", 0.6],
        [62, 56, 50, "AMOUNT", 1.2],
      ].map(([x, y, w, t, d]) => (
        <g key={t as string} className="ap-token" style={{ animationDelay: `${d}s` }}>
          <rect x={x as number} y={(y as number) - 5} width={w as number} height="10" rx="2" className="ap-hl" />
          <text x={(x as number) + 2} y={(y as number) - 8} className="ap-lbl ap-lbl-ac">{t as string}</text>
        </g>
      ))}
      <rect x="140" y="86" width="46" height="14" rx="7" className={`${Ac} ap-fillac`} />
      <text x="147" y="96" className="ap-lbl ap-lbl-ac">intent</text>
    </Svg>
  ),
  blockchain: (
    <Svg label="append · verify · share">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={14 + i * 46} y="40" width="34" height="30" rx="3" className={Ln} />
          <text x={19 + i * 46} y="58" className="ap-lbl">#{["a1f", "7c2", "e90"][i]}</text>
          <path d={`M${48 + i * 46} 55 H${60 + i * 46}`} className={i === 2 ? `${Ac} ap-draw` : Ac} />
        </g>
      ))}
      <g className="ap-field" style={{ animationDelay: ".4s" }}>
        <rect x="152" y="40" width="34" height="30" rx="3" className={`${Ac} ap-fillac`} />
        <text x="157" y="58" className="ap-lbl ap-lbl-ac">#3b4</text>
      </g>
      <path d="M160 82 l4 4 8 -9" className={`${Ac} ap-tick`} />
      <circle cx="169" cy="30" r="2.6" className="ap-dot ap-pulse" />
    </Svg>
  ),
  dnn: (
    <Svg label="layers · weights · output">
      {(() => {
        const L = [
          [30, [30, 56, 82]],
          [84, [22, 44, 68, 90]],
          [138, [36, 76]],
          [180, [56]],
        ] as const;
        const edges: ReactNode[] = [];
        for (let a = 0; a < L.length - 1; a++)
          for (const y1 of L[a][1]) for (const y2 of L[a + 1][1]) edges.push(<path key={`${a}-${y1}-${y2}`} d={`M${L[a][0]} ${y1} L${L[a + 1][0]} ${y2}`} className="ap-ln ap-thin" />);
        return (
          <>
            {edges}
            {L.map(([x, ys], li) => ys.map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r={li === 3 ? 6 : 4.5} className={li === 3 ? `${Ac} ap-fillac` : `${Ln} ap-paper`} />))}
          </>
        );
      })()}
      <circle r="2.6" className="ap-dot">
        <animateMotion dur="2.6s" repeatCount="indefinite" path="M30 56 L84 44 L138 76 L180 56" />
      </circle>
      <circle cx="180" cy="56" r="2.4" className="ap-dot ap-pulse" />
    </Svg>
  ),
  frontier: (
    <Svg label="frontier API · sovereign infra">
      <path d="M22 50 a12 12 0 0 1 22 -8 a14 14 0 0 1 26 6 a10 10 0 0 1 -2 20 H26 a10 10 0 0 1 -4 -18 Z" className={Ln} />
      <rect x="104" y="14" width="86" height="84" rx="6" className="ap-ac ap-dash" />
      <text x="110" y="25" className="ap-lbl ap-lbl-ac">sovereign</text>
      {[38, 54, 70].map((y) => (
        <g key={y}>
          <rect x="132" y={y} width="44" height="12" rx="2" className={Ln} />
          <circle cx="139" cy={y + 6} r="1.6" className="ap-dot" />
        </g>
      ))}
      <path d="M72 58 H104" className="ap-ln ap-dash" />
      <circle r="3" className="ap-dot">
        <animateMotion dur="2.4s" repeatCount="indefinite" keyPoints="0;1;1;0" keyTimes="0;.45;.55;1" calcMode="linear" path="M130 60 H106" />
      </circle>
      <path d="M100 52 l4 -3 4 3 v6 c0 4 -4 6 -4 6 s-4 -2 -4 -6 Z" className={`${Ac} ap-fillac`} />
    </Svg>
  ),
  fractals: (
    <Svg label="self-similar at every scale">
      {(() => {
        const tris: string[] = [];
        const rec = (x: number, y: number, s: number, d: number) => {
          if (d === 0) {
            tris.push(`M${x} ${y + s * 0.866} L${x + s / 2} ${y} L${x + s} ${y + s * 0.866} Z`);
            return;
          }
          const h = s / 2;
          rec(x + h / 2, y, h, d - 1);
          rec(x, y + h * 0.866, h, d - 1);
          rec(x + h, y + h * 0.866, h, d - 1);
        };
        rec(52, 8, 96, 3);
        return tris.map((d, i) => <path key={i} d={d} className={i % 9 === 4 ? `${Ac} ap-fillac` : Ln} />);
      })()}
      <g className="ap-brackets">
        <path d="M86 52 v-6 h6 M114 52 v-6 h-6 M86 76 v6 h6 M114 76 v6 h-6" className={Ac} />
      </g>
      <circle cx="100" cy="64" r="2.4" className="ap-dot ap-pulse" />
    </Svg>
  ),
};
