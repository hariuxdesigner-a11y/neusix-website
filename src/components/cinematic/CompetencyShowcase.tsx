"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ProgressRing, useAutoAdvance } from "@/components/motion/AutoAdvance";
import { VideoBackground } from "@/components/media/VideoBackground";
import { AnimIcon, type AnimIconName } from "@/components/icons/AnimIcon";
import { LIBRARY_AREAS } from "@/content/microservices";
import type { MediaId } from "@/content/media";

export type Competency = {
  label: string;
  code: string;
  media: MediaId;
  icon: AnimIconName;
  title: string;
  body: string;
  uses: [string, string, string];
  /** matching microservices-library area, if there is one */
  area?: string;
};

/** Ask the microservices library section to focus on an area (it listens for this event). */
export const LIBRARY_FOCUS_EVENT = "neusix:library-focus";

/**
 * "Our competencies" as one large feature card (after the humynlabs Bridge panel): the selected
 * competency's story on the left, a frosted panel of all six as stacked buttons on the right, its
 * clip behind a lilac wash, and three typical uses along the bottom. Auto-advances; pauses on
 * hover/focus. Library links carry real counts from the microservices library.
 */
export function CompetencyShowcase({ items, autoAdvance = 4500 }: { items: Competency[]; autoAdvance?: number }) {
  const [i, setI] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const auto = useAutoAdvance(root, autoAdvance > 0);
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const next = () => setI((v) => (v + 1) % items.length);
  const onKey = (e: KeyboardEvent) => {
    const n =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % items.length : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i - 1 + items.length) % items.length : e.key === "Home" ? 0 : e.key === "End" ? items.length - 1 : -1;
    if (n < 0) return;
    e.preventDefault();
    setI(n);
    refs.current[n]?.focus();
  };
  const c = items[i];
  const lib = c.area ? LIBRARY_AREAS.find((a) => a.area === c.area) : undefined;

  return (
    <div ref={root} {...auto.handlers} className="comp-card relative isolate overflow-hidden rounded-[clamp(18px,2vw,28px)] text-ink">
      {items.map((it, k) => (
        <div key={it.media} className={`absolute inset-0 -z-20 transition-opacity duration-700 ${k === i ? "opacity-100" : "opacity-0"}`} aria-hidden>
          <VideoBackground id={it.media} overlay="none" active={k === i} playOnMobile={k === i} />
        </div>
      ))}
      <div className="comp-veil absolute inset-0 -z-10" aria-hidden />

      <div className="grid gap-8 p-[clamp(22px,3.6vw,56px)] lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:gap-14">
        {/* story */}
        <div id={`${id}-p`} role="tabpanel" aria-labelledby={`${id}-t${i}`} className="flex min-h-full flex-col">
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-md bg-paper px-2.5 py-1 font-mono text-[12px] font-medium tracking-wide text-navy">
              {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <span className="font-mono text-[12px] text-ink/80 lg:hidden">NX · {c.code}</span>
          </div>
          <div key={c.label} className="comp-swap">
            <p className="eyebrow mt-7 font-semibold text-navy">{c.label}</p>
            <h3 className="mt-4 max-w-[16ch] font-sans text-[clamp(2.1rem,1.4rem+2.8vw,3.9rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-ink text-balance">{c.title}</h3>
            <p className="mt-6 max-w-[52ch] text-[clamp(1rem,.95rem+.3vw,1.2rem)] font-medium leading-relaxed text-ink/85">{c.body}</p>
          </div>
        </div>

        {/* selector panel */}
        <div className="comp-glass self-start rounded-2xl p-3">
          <div className="flex items-center justify-between px-2 pb-3 pt-1 font-mono text-[12px] font-medium uppercase tracking-wide text-ink">
            <span>{items.length} competencies</span>
            <span className="hidden lg:inline">NX · {c.code}</span>
          </div>
          <div role="tablist" aria-orientation="vertical" aria-label="Competencies" onKeyDown={onKey} className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {items.map((it, k) => {
              const on = k === i;
              return (
                <button
                  key={it.label}
                  ref={(el) => {
                    refs.current[k] = el;
                  }}
                  role="tab"
                  id={`${id}-t${k}`}
                  aria-selected={on}
                  aria-controls={`${id}-p`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setI(k)}
                  className={`flex min-h-12 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] font-medium transition-colors lg:min-h-14 lg:px-4 lg:text-[15px] ${
                    on ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-white"
                  }`}
                >
                  <span className={`hidden size-8 shrink-0 rounded-md bg-paper p-0.5 text-ink sm:block ${on ? "is-active" : ""}`}>
                    <AnimIcon name={it.icon} className="size-full" />
                  </span>
                  <span className="flex-1">{it.label}</span>
                  {autoAdvance > 0 && <ProgressRing run={on} paused={auto.paused} duration={autoAdvance} onDone={next} className={on ? "" : "hidden"} dark={on} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* uses + link */}
      <div className="flex flex-col gap-6 px-[clamp(22px,3.6vw,56px)] pb-[clamp(22px,3.6vw,48px)] lg:flex-row lg:items-end lg:justify-between">
        <ul key={c.label} className="comp-swap grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0">
          {c.uses.map((u, k) => (
            <li key={u} className={`sm:px-6 ${k === 0 ? "sm:pl-0" : "sm:border-l sm:border-ink/20"}`}>
              <span className="font-mono text-[12px] font-medium text-navy">{String(k + 1).padStart(2, "0")}</span>
              <span className="mt-1 block text-[clamp(1.05rem,.95rem+.5vw,1.35rem)] font-semibold leading-tight text-ink">{u}</span>
            </li>
          ))}
        </ul>
        {lib ? (
          <a
            href="#library-title"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent(LIBRARY_FOCUS_EVENT, { detail: lib.area }));
            }}
            className="group inline-flex shrink-0 items-center gap-3 text-[clamp(1.05rem,.95rem+.6vw,1.5rem)] font-semibold text-ink"
          >
            See {lib.count} {lib.label} services
            <Arrow />
          </a>
        ) : (
          <Link href="/contact-us" className="group inline-flex shrink-0 items-center gap-3 text-[clamp(1.05rem,.95rem+.6vw,1.5rem)] font-semibold text-ink">
            Discuss a pilot with us
            <Arrow />
          </Link>
        )}
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <span className="grid size-8 place-items-center rounded-full bg-ink text-paper transition-transform group-hover:translate-x-1" aria-hidden>
      <svg viewBox="0 0 20 20" className="size-4">
        <path d="M7.5 4.5 13 10l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
