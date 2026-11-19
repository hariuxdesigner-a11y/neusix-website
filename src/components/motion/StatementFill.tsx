"use client";

import { useRef, type ElementType } from "react";
import { clamp01, useScrollProgress } from "./scroll";

/**
 * Long statement whose words "fill in" from faint to full colour as it scrolls through the
 * viewport (Abridge "statement reveal"). Fully readable without JS and for reduced motion.
 */
export function StatementFill({ text, as: Tag = "p", className = "" }: { text: string; as?: ElementType; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(/\s+/).filter(Boolean);
  useScrollProgress(ref, (_p, r, vh) => {
    // 0 when the block's top is at 85% of the screen, 1 when its bottom reaches 45%
    const start = vh * 0.85;
    const end = vh * 0.45;
    const total = start - end + r.height;
    const t = clamp01((start - r.top) / total);
    const spans = ref.current!.children;
    const n = spans.length;
    for (let i = 0; i < n; i++) {
      const f = clamp01(t * (n + 6) - i);
      (spans[i] as HTMLElement).style.setProperty("--f", f.toFixed(3));
    }
  });
  return (
    <Tag ref={ref} className={`statement-fill ${className}`}>
      {words.map((w, i) => (
        <span key={i}>{w + (i < words.length - 1 ? " " : "")}</span>
      ))}
    </Tag>
  );
}
