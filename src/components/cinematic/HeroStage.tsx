"use client";

import { useEffect, useRef, useState } from "react";
import { VideoBackground } from "@/components/media/VideoBackground";
import type { MediaId } from "@/content/media";
import { HeroInstruments } from "./HeroInstruments";

/**
 * Home banner background: one clip per NeuSix service line, dissolving from one to the next in
 * step with the six-service instruments (tag, dial, tracking box). One timer drives both, so the
 * footage changes exactly when the tag moves to the next service.
 * Only the current and next clip are mounted (light on data); only the current one plays.
 * Reduced motion: first clip only, no cycling.
 */
export const HERO_STEP = 2600; // ms per service line

export function HeroStage({ media, labels }: { media: MediaId[]; labels: string[] }) {
  const [i, setI] = useState(0);
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]));
  const root = useRef<HTMLDivElement>(null);
  const n = media.length;

  // preload the second clip only once the page has settled (keeps the first paint light)
  useEffect(() => {
    const t = setTimeout(() => setMounted((m) => new Set([...m, 1])), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (root.current) io.observe(root.current);
    const id = setInterval(() => {
      if (!visible || document.hidden) return;
      setI((cur) => {
        const next = (cur + 1) % n;
        setMounted((m) => (m.has(next) && m.has((next + 1) % n) ? m : new Set([...m, next, (next + 1) % n])));
        return next;
      });
    }, HERO_STEP);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [n]);

  return (
    <>
      <div ref={root} aria-hidden className="absolute inset-0 -z-10">
        {media.map((id, k) =>
          mounted.has(k) ? (
            <div key={id} className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${k === i ? "opacity-100" : "opacity-0"}`}>
              <VideoBackground id={id} overlay="none" grade="light" priority={k === 0} playOnMobile active={k === i || k === (i + n - 1) % n} />
            </div>
          ) : null,
        )}
      </div>
      <HeroInstruments labels={labels} index={i} />
    </>
  );
}
