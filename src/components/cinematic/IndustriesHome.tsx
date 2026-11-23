"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MediaPoster } from "@/components/media/MediaPoster";
import { ArrowChip } from "@/components/ui/Icon";
import type { MediaId } from "@/content/media";

type Item = { name: string; slug: string; media: MediaId; where: string };

/**
 * Home "Industries": a calm numbered list beside ONE large image that follows the selected
 * industry (hover / focus), auto-advancing while the section is on screen and idle.
 * Replaces the earlier 3×3 grid of nine photos.
 */
export function IndustriesHome({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.3 });
    if (root.current) io.observe(root.current);
    const id = setInterval(() => {
      if (visible && !paused.current && !document.hidden) setActive((a) => (a + 1) % items.length);
    }, 3200);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [items.length]);

  const cur = items[active];
  return (
    <div
      ref={root}
      className="mt-[clamp(32px,4vw,56px)] grid gap-[clamp(24px,4vw,72px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocusCapture={() => (paused.current = true)}
      onBlurCapture={() => (paused.current = false)}
    >
      {/* the one image */}
      <Link href={`/our-work/industries#${cur.slug}`} tabIndex={-1} aria-hidden className="group relative isolate block overflow-hidden rounded-[clamp(16px,1.8vw,24px)] lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:order-2">
        <div className="relative aspect-[16/10] lg:aspect-square">
          {items.map((it, i) => (
            <div key={it.slug} className={`absolute inset-0 transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}>
              <MediaPoster id={it.media} className="size-full" sizes="(min-width: 1024px) 50vw, 94vw" />
            </div>
          ))}
          <span className="absolute inset-0 z-[2] bg-gradient-to-t from-paper/95 via-paper/35 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 z-[3] flex items-end justify-between gap-4 p-[clamp(16px,2vw,28px)] text-ink">
            <span>
              <span className="block font-mono text-[11px] tracking-[0.16em] text-navy">
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
              <span key={cur.slug} className="ind-fade mt-1 block text-[clamp(1.1rem,1rem+.5vw,1.5rem)] font-medium leading-snug">
                {cur.name}
              </span>
            </span>
            <ArrowChip />
          </span>
          {/* progress */}
          <span className="absolute inset-x-0 top-0 z-[3] h-[3px] bg-ink/10">
            <span key={active} className="ind-progress block h-full origin-left bg-navy" />
          </span>
        </div>
      </Link>

      {/* the list */}
      <ol className="divide-y divide-ink/10 border-y border-ink/10 lg:order-1">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <li key={it.slug}>
              <Link
                href={`/our-work/industries#${it.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-current={on ? "true" : undefined}
                className="group grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-start gap-x-3 py-[clamp(14px,1.4vw,18px)]"
              >
                <span className={`pt-1 font-mono text-xs transition-colors ${on ? "text-brand" : "text-slate"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className={`block text-[clamp(1rem,.95rem+.25vw,1.15rem)] font-medium leading-snug transition-colors ${on ? "text-ink" : "text-ink/70 group-hover:text-ink"}`}>{it.name}</span>
                  <span className={`grid transition-[grid-template-rows,opacity] duration-500 ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <span className="overflow-hidden">
                      <span className="block pt-1.5 text-sm leading-relaxed text-slate">{it.where}</span>
                    </span>
                  </span>
                </span>
                <span className={`mt-0.5 transition-all duration-300 ${on ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:opacity-60"}`}>
                  <ArrowChip className="size-8" />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
