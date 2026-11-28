"use client";

import { useRef, type ReactNode } from "react";
import type { MediaId } from "@/content/media";
import { mediaSrc, MEDIA } from "@/content/media";
import { VideoBackground } from "@/components/media/VideoBackground";
import { clamp01, useScrollProgress } from "./scroll";

/**
 * Sticky full-screen backdrop that slowly scales up and melts into a soft blur while the
 * section's content rises over it (Abridge "care workflow" / "how we build" stage).
 */
export function BlurStage({ media, children, labelledBy }: { media: MediaId; children: ReactNode; labelledBy: string }) {
  const ref = useRef<HTMLElement>(null);
  const base = useRef<HTMLDivElement>(null);
  const blur = useRef<HTMLDivElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  useScrollProgress(ref, (_p, r, vh) => {
    const t = clamp01(-r.top / (vh * 0.75));
    if (base.current) base.current.style.transform = `scale(${(1 + 0.16 * t).toFixed(4)})`;
    if (blur.current) blur.current.style.opacity = t.toFixed(3);
    if (veil.current) veil.current.style.opacity = (0.5 * t).toFixed(3);
  });
  const s = mediaSrc(media);
  return (
    <section ref={ref} aria-labelledby={labelledBy} className="section-box relative isolate">
      <div className="sticky top-0 -z-10 h-[100svh] overflow-hidden" aria-hidden>
        <div ref={base} className="absolute inset-0 will-change-transform">
          <VideoBackground id={media} overlay="soft" className="!z-0" />
        </div>
        {MEDIA[media].ready && (
          <div ref={blur} className="absolute inset-0 opacity-0">
            <div className="tone absolute inset-0"><picture>
              <source media="(max-width: 767px)" srcSet={s.posterMobile} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.thumb} alt="" loading="lazy" className="absolute inset-0 size-full scale-110 object-cover blur-[28px]" />
            </picture></div>
          </div>
        )}
        <div ref={veil} className="absolute inset-0 bg-paper opacity-0" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-paper to-transparent" />
      </div>
      <div className="relative -mt-[100svh] flex min-h-[100svh] flex-col justify-end">{children}</div>
    </section>
  );
}
