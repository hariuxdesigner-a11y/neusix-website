"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Industry } from "@/content/industries";
import { getCaseStudy } from "@/content/case-studies";
import { VideoBackground } from "@/components/media/VideoBackground";
import { MediaPoster } from "@/components/media/MediaPoster";
import { LinkArrow } from "@/components/ui/Icon";

/** Nine industries. Desktop: copy scrolls on the left while a sticky video panel cross-fades to the
 *  clip for the industry in view. Phones/tablets: each industry stacks with its own still. */
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
    <section aria-label="Industries we serve" className="container-x py-[clamp(48px,6vw,96px)]">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          {items.map((ind, i) => (
            <article
              key={ind.name}
              id={ind.slug}
              data-i={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="reveal flex scroll-mt-[calc(var(--header-h)+16px)] flex-col justify-center border-b border-white/10 py-10 last:border-0 lg:min-h-[78vh] lg:border-0 lg:py-16"
            >
              <MediaPoster id={ind.media} className="mb-6 aspect-[16/9] rounded-2xl lg:hidden" />
              <p className="eyebrow text-lilac-soft">{String(i + 1).padStart(2, "0")}</p>
              <h2 className={`t-h3 mt-3 transition-colors duration-500 ${i === active ? "lg:text-paper" : "lg:text-paper/60"}`}>{ind.name}</h2>
              <div className={`mt-5 max-w-[46ch] space-y-4 text-sm leading-relaxed transition-colors duration-500 sm:text-base ${i === active ? "text-paper/85" : "text-paper/85 lg:text-paper/70"}`}>
                <p>{ind.where}</p>
                <p>{ind.wins}</p>
                <p>{ind.themes}</p>
              </div>
              {!!ind.caseStudies?.length && (
                <ul className="mt-6 grid max-w-[46ch] gap-2">
                  {ind.caseStudies.map((slug) => {
                    const c = getCaseStudy(slug);
                    return c ? (
                      <li key={slug}>
                        <Link href={`/case-studies/${slug}`} className="group flex items-center gap-4 rounded-2xl border border-white/15 px-4 py-3 text-sm text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink">
                          <span>
                            <span className="block text-[11px] font-semibold uppercase tracking-wide text-lilac-soft group-hover:text-brand">Case study</span>
                            <span className="mt-0.5 block leading-snug">{c.title}</span>
                          </span>
                          <LinkArrow className="ml-auto" />
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              )}
            </article>
          ))}
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+24px)] isolate h-[calc(100svh-var(--header-h)-48px)] overflow-hidden rounded-[28px]">
            {items.map((ind, i) => (
              <div key={ind.media} className={`absolute inset-0 transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}>
                <VideoBackground id={ind.media} overlay="hero" active={i === active} className="!z-0" />
              </div>
            ))}
            <div className="absolute inset-x-0 bottom-0 z-10 p-8">
              <p className="eyebrow text-paper/85">
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
              <p className="t-h3 mt-2 text-paper">{items[active].name}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
