"use client";

import { useEffect, useRef, useState } from "react";
import { HeroInstruments } from "./HeroInstruments";
import { HERO_SCENES } from "./HeroScenes";

/**
 * Home banner background: one animated infographic scene per capability line (HeroScenes),
 * dissolving from one to the next in step with the instruments (tag, dial, tracking box). One timer
 * drives both, so the scene changes exactly when the tag moves to the next line.
 * Only the current and outgoing scenes are rendered. Reduced motion: first scene only, no cycling.
 */
export const HERO_STEP = 2600; // ms per banner line

export function HeroStage({ scenes, labels }: { scenes: string[]; labels: string[] }) {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState(-1);
  const root = useRef<HTMLDivElement>(null);
  const n = scenes.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (root.current) io.observe(root.current);
    const id = setInterval(() => {
      if (!visible || document.hidden) return;
      setI((cur) => {
        setPrev(cur);
        return (cur + 1) % n;
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
        {scenes.map((id, k) =>
          k === i || k === prev ? (
            <div key={id} className={`hs-scene transition-opacity duration-[1200ms] ease-in-out ${k === i ? "hs-on opacity-100" : "opacity-0"}`}>
              {HERO_SCENES[id]}
            </div>
          ) : null,
        )}
        <div className="media-scan absolute inset-0" />
      </div>
      <HeroInstruments labels={labels} index={i} />
    </>
  );
}
