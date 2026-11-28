"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** "What you get": dark panel. On large screens the active deliverable is highlighted
 *  and its line-art shows on the right (auto-advances; hover/focus to choose).
 *  On smaller screens every deliverable shows with its graphic, in a fluid grid. */
export function WhatYouGet({ items, icons, panelIcons, accent }: { items: string[]; icons: ReactNode[]; panelIcons: ReactNode[]; accent: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % items.length), 2600);
    return () => clearInterval(t);
  }, [inView, paused, items.length]);

  return (
    <section ref={ref} aria-labelledby="wyg-title" className="relative isolate overflow-hidden">
      <div className="container-x section-y relative">
        <div className="stagger">
          <p className="eyebrow text-brand">Deliverables</p>
          <h2 id="wyg-title" className="t-h2 mt-3">
            What you get
          </h2>
        </div>
        <ul
          className="relative mt-[clamp(32px,4vw,56px)] grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:block lg:min-h-[312px] lg:w-1/2"
          onMouseLeave={() => setPaused(false)}
        >
          {items.map((label, i) => {
            const on = i === active;
            return (
              <li key={label} className="lg:py-3">
                <button
                  type="button"
                  onMouseEnter={() => {
                    setPaused(true);
                    setActive(i);
                  }}
                  onFocus={() => {
                    setPaused(true);
                    setActive(i);
                  }}
                  onBlur={() => setPaused(false)}
                  aria-pressed={on}
                  className={`flex h-full w-full flex-col items-start gap-4 rounded-card border border-ink/10 p-5 text-left transition-colors lg:flex-row lg:items-center lg:gap-0 lg:border-0 lg:p-0 ${
                    on ? "lg:text-ink" : "lg:text-ink/55 lg:hover:text-ink/80"
                  }`}
                >
                  <span className="is-active block h-20 w-[86px] lg:hidden">{icons[i % icons.length]}</span>
                  <span
                    aria-hidden
                    className="hidden h-px shrink-0 transition-[width] duration-500 lg:block"
                    style={{ width: on ? "clamp(80px,10vw,150px)" : 0, marginRight: on ? 12 : 0, background: accent }}
                  />
                  <span className="font-serif text-[clamp(1.125rem,0.95rem+0.8vw,1.5rem)] leading-tight">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div aria-hidden className="pointer-events-none absolute bottom-[clamp(64px,8vw,128px)] right-[var(--gutter)] top-[clamp(150px,14vw,220px)] hidden w-[44%] items-center justify-center overflow-hidden rounded-[clamp(20px,2.4vw,32px)] bg-mist lg:flex">
          <span
            className="absolute -right-[20%] top-[10%] aspect-square w-[80%] rounded-full opacity-70"
            style={{ boxShadow: `inset -10px 0 24px -12px ${accent}, 18px 0 60px -30px ${accent}` }}
          />
          <div className="relative aspect-[202/187] w-[clamp(220px,22vw,320px)]">
            {panelIcons.slice(0, items.length).map((g, i) => (
              <div key={i} className={`absolute inset-0 transition-all duration-500 ${i === active ? "is-active scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                {g}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
