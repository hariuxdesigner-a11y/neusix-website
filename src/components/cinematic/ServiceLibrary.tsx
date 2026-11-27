"use client";

import { useEffect, useRef, useState } from "react";
import { LIBRARY_AREAS, LIBRARY_TOTAL } from "@/content/microservices";
import { LibraryCloud } from "./LibraryCloud";
import { LIBRARY_FOCUS_EVENT } from "./CompetencyShowcase";
import { LIBRARY_DRAWINGS } from "./LibraryDrawings";
import { SectionHead } from "./Bands";

/**
 * Microservices library: a carousel of 12 animated capability-area cards and an animated cloud of
 * all 600 service names. Picking a card focuses the cloud on that area.
 */

const AUTO_MS = 2400;

export function ServiceLibrary() {
  const track = useRef<HTMLDivElement>(null);
  const catalogue = useRef<HTMLDivElement>(null);
  const [area, setArea] = useState<string | null>(null);
  const paused = useRef(false);

  // gentle auto-advance of the carousel; stops on hover, focus, touch or reduced motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = track.current!;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    const id = window.setInterval(() => {
      if (!visible || paused.current || document.hidden) return;
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.offsetWidth + 16;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + step, behavior: "smooth" });
    }, AUTO_MS);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, []);

  // other sections (e.g. Our competencies) can focus the cloud on an area
  useEffect(() => {
    const on = (e: Event) => {
      const a = (e as CustomEvent<string>).detail;
      setArea(a);
      catalogue.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    window.addEventListener(LIBRARY_FOCUS_EVENT, on);
    return () => window.removeEventListener(LIBRARY_FOCUS_EVENT, on);
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    paused.current = true;
    el.scrollBy({ left: dir * (card.offsetWidth + 16) * 2, behavior: "smooth" });
  };

  const pick = (a: string) => {
    setArea((cur) => (cur === a ? null : a));
    catalogue.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section aria-labelledby="library-title" className="section-y overflow-hidden">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            id="library-title"
            eyebrow="Microservices library"
            title={`${LIBRARY_TOTAL} building blocks, ready to assemble`}
            sub="Start your POC or MVP from proven parts."
            text="Twelve capability areas, each made of distinct, reusable services we combine into working systems. Pick an area to see what is inside it."
          />
          <div className="flex gap-2" aria-label="Scroll capability areas">
            <button type="button" onClick={() => scrollBy(-1)} className="inline-flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper" aria-label="Previous areas">
              <svg viewBox="0 0 20 20" className="size-4" aria-hidden><path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" onClick={() => scrollBy(1)} className="inline-flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper" aria-label="Next areas">
              <svg viewBox="0 0 20 20" className="size-4" aria-hidden><path d="M7.5 4.5 13 10l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* capability-area carousel */}
      <div
        ref={track}
        className="lib-track mt-[clamp(28px,3.5vw,48px)]"
        onPointerEnter={() => (paused.current = true)}
        onPointerLeave={() => (paused.current = false)}
        onFocusCapture={() => (paused.current = true)}
        onBlurCapture={() => (paused.current = false)}
        onTouchStart={() => (paused.current = true)}
        role="group"
        aria-label="Capability areas"
      >
        {LIBRARY_AREAS.map((a, i) => {
          const on = area === a.area;
          return (
            <button
              key={a.area}
              type="button"
              aria-pressed={on}
              onClick={() => pick(a.area)}
              className={`ap-card lib-card group flex w-[clamp(240px,21vw,284px)] shrink-0 snap-start flex-col rounded-card p-4 text-left transition-[background-color,box-shadow] duration-300 ${on ? "bg-lilac-soft ring-2 ring-brand" : "bg-mist hover:bg-lilac-soft/60"}`}
            >
              <span className="flex w-full items-center justify-between font-mono text-[11px] text-slate">
                <span className="text-ink">{String(i + 1).padStart(2, "0")}</span>
                <span>NX-{a.code}</span>
              </span>
              <span className="mt-2 block">{LIBRARY_DRAWINGS[a.drawing]}</span>
              <span className="mt-3 flex items-baseline justify-between gap-3">
                <span className="text-[15px] font-medium text-ink">{a.label}</span>
                <span className="shrink-0 font-mono text-[11px] text-brand">{a.count} services</span>
              </span>
              <span className="mt-1 block text-[13px] leading-snug text-slate">{a.blurb}</span>
              <span className="mt-auto flex items-center gap-1.5 pt-3 text-[12px] font-medium text-brand">
                {on ? "In focus below" : "Explore"}
                <svg viewBox="0 0 20 20" className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden><path d={on ? "M5 8l5 5 5-5" : "M7.5 4.5 13 10l-5.5 5.5"} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </button>
          );
        })}
      </div>

      {/* animated name cloud */}
      <div ref={catalogue} className="container-x scroll-mt-28 pt-[clamp(28px,3.5vw,48px)]">
        <LibraryCloud area={area} onClear={() => setArea(null)} />
      </div>
    </section>
  );
}
