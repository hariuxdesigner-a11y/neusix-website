"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Inertial smooth scrolling (Lenis), as on abridge.com. Native scroll position is kept, so sticky
 *  sections, anchors and the back button behave normally. Off for reduced motion and touch screens. */
export function SmoothScroll() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -88 }, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    window.__lenis = lenis;
    let id = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // new page → start at the top immediately (no smooth glide)
  useEffect(() => {
    if (!window.location.hash) window.__lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
