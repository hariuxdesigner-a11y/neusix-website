"use client";

import { useEffect, useRef, useState } from "react";
import type { Industry } from "@/content/industries";

const CYAN = "#5fd4ea";

function Network({ count, active }: { count: number; active: number }) {
  const cx = 200;
  const cy = 200;
  const nodes = Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 ? 120 : 150;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
  });
  return (
    <svg viewBox="0 0 400 400" className="h-auto w-full" aria-hidden>
      <defs>
        <radialGradient id="net-glow">
          <stop offset="0" stopColor="#6d6eb5" stopOpacity=".35" />
          <stop offset="1" stopColor="#6d6eb5" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r="190" fill="url(#net-glow)" />
      {nodes.map((n, i) => (
        <line
          key={`l${i}`}
          x1={cx}
          y1={cy}
          x2={n.x}
          y2={n.y}
          stroke={i === active ? CYAN : "#6d6eb5"}
          strokeOpacity={i === active ? 1 : 0.55}
          strokeWidth={i === active ? 2 : 1}
          style={{ transition: "all .5s" }}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={`c${i}`}
          cx={n.x}
          cy={n.y}
          r={i === active ? 11 : 7}
          fill={i === active ? CYAN : "#0f0f1f"}
          stroke={i === active ? CYAN : "#b1b1d7"}
          strokeWidth="1.5"
          style={{ transition: "all .5s", filter: i === active ? `drop-shadow(0 0 10px ${CYAN})` : undefined }}
        />
      ))}
      <circle cx={cx} cy={cy} r="12" fill="#0f0f1f" stroke={CYAN} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="5" fill={CYAN} />
    </svg>
  );
}

/** The nine industries. On large screens a sticky network graphic highlights the
 *  industry currently in view; on small screens the industries simply stack. */
export function IndustryExplorer({ items }: { items: Industry[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-label="Industries we serve" className="container-x">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+40px)] mx-auto max-w-[460px] py-10">
            <Network count={items.length} active={active} />
          </div>
        </div>
        <div>
          {items.map((ind, i) => (
            <article
              key={ind.name}
              data-i={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="reveal flex min-h-0 flex-col justify-center border-b border-white/10 py-10 last:border-0 lg:min-h-[70vh] lg:border-0 lg:py-16"
            >
              <h2 className={`text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-medium transition-colors ${i === active ? "lg:text-paper" : "lg:text-paper/60"}`}>{ind.name}</h2>
              <div className="mt-5 max-w-[46ch] space-y-4 text-sm leading-relaxed text-paper/85 sm:text-base">
                <p>{ind.where}</p>
                <p>{ind.wins}</p>
                <p>{ind.themes}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
