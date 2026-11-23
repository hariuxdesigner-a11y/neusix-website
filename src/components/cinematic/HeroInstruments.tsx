"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Thin white "instrument" overlays for the home banner, in the spirit of a computer-vision
 * annotation layer:
 *  - a tracking box with corner brackets drifting over the subject, tagged with the current
 *    NeuSix service line (01–06),
 *  - a dial with six segments whose needle steps to the active service,
 *  - a small signal chart for Discover → Plan → Build → Scale that redraws on a loop.
 * Decorative (aria-hidden). Pauses off-screen; static for prefers-reduced-motion.
 */
const STEP = 2600;

export function HeroInstruments({ labels }: { labels: string[] }) {
  const [i, setI] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (root.current) io.observe(root.current);
    const id = setInterval(() => {
      if (visible && !document.hidden) setI((n) => (n + 1) % 6);
    }, STEP);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, []);

  const angle = -90 + i * 60 + 30; // needle points at the middle of segment i
  return (
    <div ref={root} aria-hidden className="hi pointer-events-none absolute inset-0 -z-[5] text-paper">
      {/* tracking box */}
      <div className="hi-track absolute">
        {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((c) => (
          <span key={c} className={`absolute size-5 border-paper ${c}`} />
        ))}
        <span className="absolute inset-0 border border-paper/45" />
        <span key={i} className="hi-tag absolute -top-px left-0 -translate-y-full whitespace-nowrap border border-paper/80 bg-navy/35 px-2.5 py-1 text-[13px] font-medium text-paper backdrop-blur-[2px]">
          <span className="mr-2 font-mono text-[10px] tracking-[0.14em] text-paper">0{i + 1}/06</span>
          {labels[i]}
        </span>
        <span className="absolute left-[38%] top-[44%] size-2 rounded-full bg-paper shadow-[0_0_0_6px_rgba(252,252,253,.25)]" />
        <span className="hi-ping absolute left-[38%] top-[44%] size-2 rounded-full border border-paper" />
      </div>

      {/* dial */}
      <svg className="hi-dial absolute" viewBox="-110 -110 220 220">
        <circle r="92" fill="none" stroke="currentColor" strokeOpacity=".85" strokeWidth="1.4" />
        {Array.from({ length: 60 }, (_, k) => {
          const a = (k * 6 - 90) * (Math.PI / 180);
          const major = k % 10 === 0;
          const r1 = major ? 78 : 85;
          return <line key={k} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1} x2={Math.cos(a) * 92} y2={Math.sin(a) * 92} stroke="currentColor" strokeOpacity={major ? 0.95 : 0.45} strokeWidth={major ? 1.6 : 1} />;
        })}
        {Array.from({ length: 6 }, (_, k) => {
          const a = (k * 60 + 30 - 90) * (Math.PI / 180);
          return (
            <text key={k} x={Math.cos(a) * 64} y={Math.sin(a) * 64 + 3.5} textAnchor="middle" className={`hi-num ${k === i ? "on" : ""}`}>
              0{k + 1}
            </text>
          );
        })}
        <circle r="92" fill="none" stroke="currentColor" strokeWidth="3.2" strokeDasharray={`${(Math.PI * 2 * 92) / 6 - 4} ${Math.PI * 2 * 92}`} transform={`rotate(${-90 + i * 60 + 0.6})`} className="hi-arc" />
        <g className="hi-needle" style={{ transform: `rotate(${angle}deg)` }}>
          <line x1="0" y1="0" x2="50" y2="0" stroke="currentColor" strokeWidth="1.4" strokeDasharray="5 4" />
          <circle cx="50" cy="0" r="3" fill="currentColor" />
        </g>
        <circle r="4" fill="currentColor" />
      </svg>

      {/* signal chart */}
      <div className="hi-chart absolute rounded-[3px] border border-paper/80 bg-navy/25 backdrop-blur-[2px]">
        <span className="absolute left-2 top-1.5 font-mono text-[10px] tracking-[0.08em] text-paper/90">NX · delivery signal</span>
        <svg viewBox="0 0 240 130" preserveAspectRatio="none" className="absolute inset-0 size-full">
          {[60, 120, 180].map((x) => (
            <line key={x} x1={x} y1="24" x2={x} y2="118" stroke="currentColor" strokeOpacity=".5" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
          ))}
          <path className="hi-line" pathLength={1} d="M6 96 C 20 70, 30 104, 44 84 S 62 60, 76 74 S 98 98, 112 66 S 132 40, 150 58 S 170 86, 186 46 S 214 30, 234 36" fill="none" stroke="currentColor" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
          <path className="hi-line hi-line-b" pathLength={1} d="M6 110 C 30 104, 50 112, 70 100 S 110 96, 130 88 S 170 84, 190 70 S 220 62, 234 58" fill="none" stroke="currentColor" strokeOpacity=".6" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        </svg>
        {["discover", "plan", "build", "scale"].map((t, k) => (
          <span key={t} className="absolute bottom-1 font-mono text-[9px] text-paper/85" style={{ left: `${k * 25 + 3}%` }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
