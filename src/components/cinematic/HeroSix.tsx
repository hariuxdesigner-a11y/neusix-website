"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Home hero overlay: a computer-vision style "tracking" layer over the graded footage.
 * Six keypoints (one per NeuSix service line) drift gently inside a tracking frame, joined as a
 * loose hexagon around a central hub. One node at a time is "detected": its spoke lights up and a
 * label tag reads out the service line. Decorative only (aria-hidden); the services are linked
 * properly elsewhere on the page.
 * Reduced motion: everything static, first node shown.
 */

type Node = { x: number; y: number; label: string };

// base positions inside the frame (percent), a loose, organic hexagon
const BASE: [number, number][] = [
  [52, 11],
  [88, 33],
  [80, 77],
  [45, 89],
  [13, 67],
  [19, 25],
];
const HUB: [number, number] = [50, 50];
const STEP = 2400; // ms per node

export function HeroSix({ labels }: { labels: string[] }) {
  const nodes: Node[] = BASE.map(([x, y], i) => ({ x, y, label: labels[i] ?? "" }));
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(nodes.map((n) => [n.x, n.y] as [number, number]));
  const root = useRef<HTMLDivElement>(null);
  const reduce = useRef(false);

  // cycle the detected node + gentle drift, only while the hero is on screen
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce.current) return;
    let visible = true;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (root.current) io.observe(root.current);
    const t0 = performance.now();
    let last = -1;
    let drawn = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      const t = (now - t0) / 1000;
      const step = Math.floor((now - t0) / STEP) % BASE.length;
      if (step !== last) {
        last = step;
        setActive(step);
      }
      // ~25fps is plenty for a slow drift
      if (now - drawn < 40) return;
      drawn = now;
      setPos(BASE.map(([x, y], i) => [x + Math.sin(t * (0.35 + i * 0.07) + i) * 2.2, y + Math.cos(t * (0.3 + i * 0.05) + i * 1.7) * 2.6]));
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const [ax, ay] = pos[active];
  const chipLeft = ax > 55; // keep the tag inside the frame
  const pct = (v: number) => (v / 100).toFixed(2);

  return (
    <div ref={root} aria-hidden className="hero-six pointer-events-none absolute inset-0 -z-[5]">
      <div className="hero-six-frame absolute">
        {/* corner ticks */}
        {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((c) => (
          <span key={c} className={`absolute size-4 border-lilac-bright ${c}`} />
        ))}
        <span className="absolute -top-6 left-0 font-mono text-[10px] uppercase tracking-[0.18em] text-lilac-soft/80">NX · 06 service lines</span>
        <span className="absolute -top-6 right-0 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-lilac-soft/80">
          <span className="hero-six-rec size-1.5 rounded-full bg-orange" /> tracking
        </span>
        <span className="absolute -bottom-6 right-0 font-mono text-[10px] tracking-[0.12em] text-lilac-soft/70">
          x {pct(ax)} · y {pct(ay)}
        </span>

        {/* scan line */}
        <span className="hero-six-scan absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-lilac-bright/70 to-transparent" />

        <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points={pos.map((p) => p.join(",")).join(" ")} fill="rgba(169,170,230,.05)" stroke="rgba(217,218,242,.38)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {pos.map(([x, y], i) => (
            <line
              key={i}
              x1={HUB[0]}
              y1={HUB[1]}
              x2={x}
              y2={y}
              stroke={i === active ? "rgba(255,255,255,.85)" : "rgba(217,218,242,.22)"}
              strokeWidth={i === active ? 1.4 : 1}
              strokeDasharray={i === active ? "4 4" : "2 5"}
              vectorEffect="non-scaling-stroke"
              className={i === active ? "hero-six-flow" : ""}
            />
          ))}
        </svg>

        {/* hub */}
        <span className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-lilac-bright bg-ink/40" style={{ left: `${HUB[0]}%`, top: `${HUB[1]}%` }} />

        {/* keypoints */}
        {pos.map(([x, y], i) => (
          <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
            <span className={`block rounded-full transition-all duration-500 ${i === active ? "size-3 bg-paper shadow-[0_0_0_6px_rgba(169,170,230,.25),0_0_24px_rgba(169,170,230,.8)]" : "size-2 bg-lilac-bright/80"}`} />
            {i === active && <span className="hero-six-ping absolute inset-0 rounded-full border border-paper/70" />}
          </span>
        ))}

        {/* detection tag */}
        <span
          key={active}
          className="hero-six-tag absolute whitespace-nowrap border border-paper/70 bg-ink/35 px-2.5 py-1.5 backdrop-blur-[2px]"
          style={{ left: `${ax}%`, top: `${ay}%`, transform: `translate(${chipLeft ? "calc(-100% - 14px)" : "14px"}, -50%)` }}
        >
          <span className="block font-mono text-[9px] tracking-[0.16em] text-lilac-soft">0{active + 1} / 06</span>
          <span className="block text-[13px] font-medium text-paper">{nodes[active].label}</span>
        </span>
      </div>
    </div>
  );
}
