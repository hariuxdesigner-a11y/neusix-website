"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import type { MediaId } from "@/content/media";
import { VideoBackground } from "@/components/media/VideoBackground";

export type VideoTab = { label: string; media: MediaId; icon?: string; title?: string; body?: ReactNode };

/**
 * Abridge "how it works" split: tab list on the left, a large video panel on the right
 * whose clip matches the selected tab. Only the active clip plays; others stay as posters.
 * Phones: the panel sits on top and the tabs become a horizontal chip row.
 */
export function VideoTabs({ tabs, autoAdvance = 0, dark = false }: { tabs: VideoTab[]; autoAdvance?: number; dark?: boolean }) {
  const [i, setI] = useState(0);
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent) => {
    const n =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % tabs.length : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i - 1 + tabs.length) % tabs.length : e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : -1;
    if (n < 0) return;
    e.preventDefault();
    setI(n);
    refs.current[n]?.focus();
  };
  void autoAdvance;
  const t = tabs[i];
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-12">
      <div role="tablist" aria-orientation="vertical" onKeyDown={onKey} className="order-2 -mx-[var(--gutter)] flex snap-x gap-2 overflow-x-auto px-[var(--gutter)] pb-1 lg:order-1 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
        {tabs.map((tab, k) => {
          const on = k === i;
          return (
            <button
              key={tab.label}
              ref={(el) => {
                refs.current[k] = el;
              }}
              role="tab"
              id={`${id}-t${k}`}
              aria-selected={on}
              aria-controls={`${id}-p`}
              tabIndex={on ? 0 : -1}
              onClick={() => setI(k)}
              className={`flex shrink-0 snap-start items-center gap-4 rounded-full px-4 py-2.5 text-left text-sm transition-colors lg:rounded-xl lg:px-4 lg:py-4 lg:text-base ${
                on ? (dark ? "bg-white/12 text-paper" : "bg-ink text-paper") : dark ? "text-paper/75 hover:text-paper" : "text-ink/70 hover:bg-mist hover:text-ink"
              }`}
            >
              {tab.icon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={tab.icon} alt="" width={40} height={40} className={`hidden size-10 shrink-0 rounded-lg bg-paper p-1 lg:block ${on ? "" : "opacity-70"}`} />
              )}
              <span className="whitespace-nowrap lg:whitespace-normal">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${id}-p`}
        aria-labelledby={`${id}-t${i}`}
        className="relative order-1 isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[clamp(16px,2vw,28px)] p-[clamp(20px,3vw,40px)] text-paper sm:aspect-[16/10] lg:order-2"
      >
        {tabs.map((tab, k) => (
          <div key={tab.media + k} className={`absolute inset-0 -z-10 transition-opacity duration-700 ${k === i ? "opacity-100" : "opacity-0"}`}>
            <VideoBackground id={tab.media} overlay="hero" active={k === i} playOnMobile={k === i} />
          </div>
        ))}
        <p className="eyebrow text-paper/75">{String(i + 1).padStart(2, "0")} / {String(tabs.length).padStart(2, "0")}</p>
        <h3 className="t-h3 mt-2">{t.title ?? t.label}</h3>
        {t.body && <div className="mt-3 max-w-[52ch] text-sm leading-relaxed text-paper/85 sm:text-base">{t.body}</div>}
      </div>
    </div>
  );
}
