"use client";

import { useEffect, type RefObject } from "react";

/* One shared, rAF-throttled scroll/resize loop for every scroll-linked effect on the page. */
type Sub = () => void;
const subs = new Set<Sub>();
let queued = false;
const run = () => {
  queued = false;
  subs.forEach((f) => f());
};
const queue = () => {
  if (!queued) {
    queued = true;
    requestAnimationFrame(run);
  }
};

export function subscribeScroll(f: Sub) {
  if (!subs.size) {
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
  }
  subs.add(f);
  requestAnimationFrame(f);
  return () => {
    subs.delete(f);
    if (!subs.size) {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    }
  };
}

export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Calls `fn(p, rect)` on scroll, where p runs 0 → 1 while the element travels through the viewport
 * (0: its top touches the bottom of the screen, 1: its bottom leaves the top). Skipped for reduced motion.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, fn: (p: number, rect: DOMRect, vh: number) => void, deps: unknown[] = []) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    return subscribeScroll(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) return; // far off-screen: do nothing
      fn(clamp01((vh - r.top) / (vh + r.height)), r, vh);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
