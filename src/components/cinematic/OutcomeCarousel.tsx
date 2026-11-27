"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import type { Outcome } from "@/content/services";
import { LottieOnView } from "@/components/ui/LottieOnView";
import { ProgressRing, useAutoAdvance } from "@/components/motion/AutoAdvance";
import { ArrowChip } from "@/components/ui/Icon";

/**
 * "Typical outcomes" as an Abridge card carousel: heading + outcome list with progress rings on
 * the left, a large result card on the right that animates the selected outcome's dial.
 */
export function OutcomeCarousel({
  items,
  head,
  cta,
  source,
  interval = 2500,
}: {
  items: Outcome[];
  head: ReactNode;
  cta?: ReactNode;
  source: { label: string; href: string };
  interval?: number;
}) {
  const [i, setI] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const auto = useAutoAdvance(root);
  const o = items[i];
  return (
    <div ref={root} {...auto.handlers} className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
      <div className="flex flex-col">
        {head}
        {cta && <div className="reveal mt-8">{cta}</div>}
        <div role="tablist" aria-label="Typical outcomes" className="stagger mt-10 flex flex-col gap-1">
          {items.map((it, k) => {
            const on = k === i;
            return (
              <button
                key={it.label}
                role="tab"
                aria-selected={on}
                aria-controls="outcome-panel"
                onClick={() => setI(k)}
                className={`flex items-center gap-4 rounded-lg py-2.5 text-left text-[15px] transition-colors ${on ? "text-ink" : "text-ink/70 hover:text-ink"}`}
              >
                <ProgressRing run={on} paused={auto.paused} duration={interval} onDone={() => setI((v) => (v + 1) % items.length)} className={on ? "" : "opacity-50"} />
                <span>
                  {it.label}
                  {it.value ? ` ${it.value}` : ""}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div id="outcome-panel" role="tabpanel" aria-live="polite" className="reveal relative flex min-h-[460px] flex-col overflow-hidden rounded-[clamp(18px,2vw,28px)] bg-mist p-[clamp(20px,3vw,36px)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[12%] top-[8%] h-[52%] rounded-2xl opacity-60"
          style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(109,110,181,.22) 0 1px, transparent 1px 7px)" }}
        />
        <div key={i} className="relative mx-auto mt-2 size-[clamp(180px,22vw,260px)] animate-[megaIn_.5s_ease-out]">
          <LottieOnView src={o.lottie} speed={1.8} className="size-full" />
          {o.value && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="bg-mist/90 px-2 font-serif text-2xl text-navy">{o.value}</span>
            </span>
          )}
        </div>
        <div key={`t${i}`} className="relative mt-auto animate-[megaIn_.5s_ease-out] pt-8">
          <h3 className="t-h4">
            {o.label}
            {o.value ? ` ${o.value}` : ""}
          </h3>
          <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-slate">{o.text}</p>
          <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-5">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink/70">
              <span aria-hidden className="size-2 rounded-full bg-orange" /> {source.label}
            </span>
            <Link href={source.href} aria-label={`${source.label}: learn more`} className="group rounded-full">
              <ArrowChip className="bg-paper" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
