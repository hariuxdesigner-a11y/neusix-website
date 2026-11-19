"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { CaseStudy, Stage } from "@/content/case-studies";
import { ProgressRing, useAutoAdvance } from "@/components/motion/AutoAdvance";
import { CaseCard } from "./CaseCard";
import { Icon } from "@/components/ui/Icon";

/** WAI-ARIA tabs for "How It Works" stages (arrow keys / Home / End supported). */
export function StageTabs({ stages }: { stages: Stage[] }) {
  const [i, setI] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const auto = useAutoAdvance(root);
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent) => {
    let n = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % stages.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + stages.length) % stages.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = stages.length - 1;
    else return;
    e.preventDefault();
    setI(n);
    refs.current[n]?.focus();
  };
  const s = stages[i];
  const [lead, ...rest] = s.body;
  const listy = s.body.length > 1 && lead.endsWith(":");
  return (
    <div ref={root} {...auto.handlers} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-12">
      <div role="tablist" aria-orientation="vertical" className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0" onKeyDown={onKey}>
        {stages.map((st, k) => (
          <button
            key={st.title}
            ref={(el) => {
              refs.current[k] = el;
            }}
            role="tab"
            id={`${id}-t${k}`}
            aria-selected={k === i}
            aria-controls={`${id}-p`}
            tabIndex={k === i ? 0 : -1}
            onClick={() => setI(k)}
            className={`min-w-[220px] shrink-0 rounded-card border p-5 text-left transition-colors lg:min-w-0 ${
              k === i ? "border-navy bg-navy text-white" : "border-lilac-soft bg-paper hover:border-lilac"
            }`}
          >
            <span className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${k === i ? "text-lilac-soft" : "text-lilac"}`}>
              <ProgressRing run={k === i} paused={auto.paused} duration={6500} onDone={() => setI((v) => (v + 1) % stages.length)} dark={k === i} className={k === i ? "" : "opacity-40"} />
              {st.label.replace(/:$/, "")}
            </span>
            <span className="t-h4 mt-1 block !text-lg">{st.title}</span>
          </button>
        ))}
      </div>
      <div key={i} role="tabpanel" id={`${id}-p`} aria-labelledby={`${id}-t${i}`} tabIndex={0} className="animate-[megaIn_.45s_ease-out] rounded-card bg-mist/70 p-7 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">{s.label.replace(/:$/, "")}</p>
        <h3 className="t-h3 mt-2">{s.title}</h3>
        {s.body.length === 0 ? null : listy ? (
          <>
            <p className="mt-5 leading-relaxed">{lead}</p>
            <ul className="mt-3 space-y-2">
              {rest.map((b) => (
                <li key={b} className="flex gap-2.5 leading-relaxed">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-lilac" />
                  {b}
                </li>
              ))}
            </ul>
          </>
        ) : s.body.length === 1 ? (
          <p className="mt-5 leading-relaxed">{lead}</p>
        ) : (
          <ul className="mt-5 space-y-2">
            {s.body.map((b) => (
              <li key={b} className="flex gap-2.5 leading-relaxed">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-lilac" />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/** Muted looping hero video with an accessible play/pause control. Does not autoplay for reduced-motion users. */
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.play().then(() => setPlaying(true)).catch(() => {});
  }, []);
  return (
    <div className="relative overflow-hidden rounded-card bg-ink">
      <video ref={ref} className="aspect-[4/3] h-auto w-full object-cover" muted loop playsInline preload="metadata" poster={poster} aria-hidden>
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={() => {
          const v = ref.current;
          if (!v) return;
          if (v.paused) v.play().then(() => setPlaying(true));
          else {
            v.pause();
            setPlaying(false);
          }
        }}
        aria-label={playing ? "Pause background video" : "Play background video"}
        className="absolute bottom-3 right-3 inline-flex size-11 items-center justify-center rounded-full bg-paper/90 text-ink shadow"
      >
        <Icon name={playing ? "pause" : "play"} size={18} />
      </button>
    </div>
  );
}

/** Related case studies: horizontally scrollable with prev/next buttons. */
export function RelatedCarousel({ items }: { items: CaseStudy[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.9, 420), behavior: "smooth" });
  };
  return (
    <section aria-labelledby="related-title" className="section-y">
      <div className="container-x">
        <div className="flex items-end justify-between gap-4">
          <h2 id="related-title" className="t-h2">
            Case studies
          </h2>
          <div className="flex gap-2">
            {[
              { d: -1, label: "Previous case studies", icon: "arrow-left" as const },
              { d: 1, label: "Next case studies", icon: "arrow-right" as const },
            ].map((b) => (
              <button key={b.d} type="button" onClick={() => scroll(b.d)} aria-label={b.label} className="inline-flex size-11 items-center justify-center rounded-full bg-mist text-ink transition-colors hover:bg-ink hover:text-paper">
                <Icon name={b.icon} size={18} />
              </button>
            ))}
          </div>
        </div>
        <ul ref={ref} className="-mx-[var(--gutter)] mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-4 [scrollbar-width:thin]">
          {items.map((c) => (
            <li key={c.slug} className="w-[min(85vw,380px)] shrink-0 snap-start">
              <CaseCard c={c} headingLevel={3} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
