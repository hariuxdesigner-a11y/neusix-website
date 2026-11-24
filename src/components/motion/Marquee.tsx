"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Endless logo/stat strip that drifts on its own and speeds up with scroll velocity (Abridge logo
 * marquee). Pauses on hover. Reduced motion: a static, wrapped row.
 */
export function Marquee({ children, speed = 40, className = "", gap = "clamp(40px,5vw,80px)" }: { children: ReactNode; speed?: number; className?: string; gap?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLDivElement>(null);
  const hover = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = track.current!;
    let x = 0;
    let last = performance.now();
    let lastY = window.scrollY;
    let boost = 0;
    let id = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    let v = speed; // current velocity (px/s), eased towards the target
    const tick = (t: number) => {
      const dt = Math.min(64, t - last) / 1000;
      last = t;
      const y = window.scrollY;
      // scroll adds a gentle, capped boost that eases in and out (no jumps)
      boost = Math.min(Math.abs(y - lastY) / Math.max(dt, 0.001), 2400) * 0.06;
      lastY = y;
      const target = hover.current ? 0 : speed + boost;
      v += (target - v) * Math.min(1, dt * 4);
      if (visible) {
        const w = first.current?.offsetWidth ?? 0;
        x -= v * dt;
        if (w && -x >= w) x += w;
        el.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
    };
  }, [speed]);

  return (
    <div
      className={`relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] ${className}`}
      onMouseEnter={() => (hover.current = true)}
      onMouseLeave={() => (hover.current = false)}
      onFocusCapture={() => (hover.current = true)}
      onBlurCapture={() => (hover.current = false)}
    >
      <div ref={track} className="flex w-max will-change-transform motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
        <div ref={first} className="flex shrink-0 items-center motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center" style={{ gap, paddingRight: gap }}>
          {children}
        </div>
        <div aria-hidden inert className="flex shrink-0 items-center motion-reduce:hidden" style={{ gap, paddingRight: gap }}>
          {children}
        </div>
      </div>
    </div>
  );
}
