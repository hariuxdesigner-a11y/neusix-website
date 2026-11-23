"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/components/motion/scroll";
import { MEDIA, mediaSrc, type MediaId } from "@/content/media";

type Overlay = "hero" | "dark" | "soft" | "light" | "none";

const OVERLAYS: Record<Overlay, string> = {
  // bottom-weighted for left/bottom-aligned hero copy
  hero: "linear-gradient(90deg, rgba(15,15,31,.55) 0%, rgba(15,15,31,.2) 45%, rgba(15,15,31,0) 70%), linear-gradient(180deg, rgba(15,15,31,.4) 0%, rgba(15,15,31,.18) 32%, rgba(15,15,31,.8) 72%, rgba(15,15,31,.95) 100%)",
  dark: "linear-gradient(180deg, rgba(15,15,31,.76), rgba(15,15,31,.86))",
  soft: "linear-gradient(180deg, rgba(252,252,253,.55), rgba(252,252,253,.92))",
  light: "linear-gradient(180deg, rgba(252,252,253,.2), rgba(252,252,253,.6))",
  none: "none",
};

/** Brand-colour stand-in shown until a clip is available (and as the poster fallback). */
function StandIn({ tint }: { tint: string }) {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-ink">
      <div className="absolute inset-0 opacity-90" style={{ background: `radial-gradient(60% 70% at 70% 30%, ${tint}66 0%, transparent 60%), radial-gradient(50% 60% at 15% 85%, ${tint}44 0%, transparent 65%)` }} />
      <div
        className="absolute inset-0 opacity-[.18]"
        style={{
          backgroundImage: "linear-gradient(rgba(217,218,242,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(217,218,242,.35) 1px, transparent 1px)",
          backgroundSize: "clamp(40px,5vw,72px) clamp(40px,5vw,72px)",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
    </div>
  );
}

/**
 * Cinematic background video.
 * - Poster first; the video source is attached only when the section approaches the viewport (or immediately for heroes).
 * - Plays only while visible; pauses off-screen.
 * - Phones (<768px) get the 960×540 file; non-hero bands on phones show the poster only.
 * - prefers-reduced-motion or Save-Data → poster only.
 */
export function VideoBackground({
  id,
  overlay = "dark",
  priority = false,
  playOnMobile = false,
  active = true,
  className = "",
  parallax = 0,
  grade = "none",
}: {
  id: MediaId;
  overlay?: Overlay;
  priority?: boolean;
  playOnMobile?: boolean;
  /** for tabbed/stacked usage: only the active clip plays */
  active?: boolean;
  className?: string;
  /** px the media drifts inside its frame while the section scrolls by (0 = off) */
  parallax?: number;
  /** "duotone": grade the footage to one settled NeuSix indigo (home hero) */
  grade?: "none" | "duotone";
}) {
  const m = MEDIA[id];
  const s = mediaSrc(id);
  const wrap = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  // decide whether/which video to load
  useEffect(() => {
    if (!m.ready) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (mobile && !priority && !playOnMobile) return;
    const choose = () => setSrc(mobile ? s.mobile : s.mp4);
    if (priority) {
      // let the poster (the LCP image) and page assets load first, then start the hero video
      let idle = 0;
      let timer: ReturnType<typeof setTimeout> | undefined;
      const start = () => {
        const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
        if (ric) idle = ric(choose, { timeout: 1500 });
        else timer = setTimeout(choose, 200);
      };
      if (document.readyState === "complete") start();
      else window.addEventListener("load", start, { once: true });
      return () => {
        window.removeEventListener("load", start);
        if (timer) clearTimeout(timer);
        const cic = (window as Window & { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback;
        if (idle && cic) cic(idle);
      };
    }
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          choose();
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [m.ready, priority, playOnMobile, s.mobile, s.mp4]);

  // play only while on screen (and active)
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const v = vid.current;
    if (!v || !src) return;
    if (visible && active) v.play().catch(() => {});
    else v.pause();
  }, [visible, active, src]);

  const layer = useRef<HTMLDivElement>(null);
  useScrollProgress(
    wrap,
    (p) => {
      if (layer.current) layer.current.style.transform = `translate3d(0,${((p - 0.5) * 2 * parallax).toFixed(1)}px,0)`;
    },
    [parallax],
  );

  return (
    <div ref={wrap} aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-ink ${className}`}>
      <div
        ref={layer}
        className="absolute inset-x-0 will-change-transform"
        style={{ ...(parallax ? { top: -parallax, bottom: -parallax } : { top: 0, bottom: 0 }), ...(grade === "duotone" ? { filter: "grayscale(1) contrast(1.12) brightness(.92)" } : {}) }}
      >
      {m.ready ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <picture>
            <source media="(max-width: 767px)" srcSet={s.posterMobile} />
            <img src={s.poster} alt="" className="absolute inset-0 size-full object-cover" style={{ objectPosition: m.focal }} fetchPriority={priority ? "high" : "auto"} loading={priority ? "eager" : "lazy"} />
          </picture>
          {src && (
            <video
              ref={vid}
              className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}`}
              style={{ objectPosition: m.focal }}
              muted
              loop
              playsInline
              preload="auto"
              poster={s.poster}
              onPlaying={() => setPlaying(true)}
            >
              <source src={src} type="video/mp4" />
            </video>
          )}
        </>
      ) : (
        <StandIn tint={m.tint} />
      )}
      </div>
      {grade === "duotone" && (
        <>
          {/* one settled hue: greyscale footage recoloured to NeuSix indigo, then deepened */}
          <div className="absolute inset-0 mix-blend-color" style={{ background: "#6d6eb5" }} />
          <div className="absolute inset-0 mix-blend-multiply" style={{ background: "#9fa0cf" }} />
        </>
      )}
      {overlay !== "none" && <div className="absolute inset-0" style={{ background: OVERLAYS[overlay] }} />}
    </div>
  );
}
