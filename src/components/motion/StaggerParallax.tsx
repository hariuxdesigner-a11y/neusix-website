"use client";

import { useRef, type ReactNode } from "react";
import { useScrollProgress } from "./scroll";

/**
 * Row of cards set out as a staircase whose steps deepen as you scroll (Abridge "Our impact"
 * staggered cards). Desktop only (≥1024px); phones get a normal swipe row.
 */
export function StaggerParallax({ children, step = 64, className = "" }: { children: ReactNode; step?: number; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  useScrollProgress(ref, (p) => {
    const items = ref.current!.children;
    const desktop = window.innerWidth >= 1024;
    const n = items.length;
    for (let i = 0; i < n; i++) {
      // cards start staggered and settle into one row as the list scrolls up through the view
      const y = desktop ? (n - 1 - i) * step * Math.max(0, 1 - p * 1.25) : 0;
      (items[i] as HTMLElement).style.transform = desktop ? `translate3d(0,${y.toFixed(1)}px,0)` : "";
    }
  });
  return (
    <ul ref={ref} className={className}>
      {children}
    </ul>
  );
}
