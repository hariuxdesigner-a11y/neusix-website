"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Pause logic for auto-advancing tab sets (Abridge tab carousels): paused while hovered,
 * while focus is inside, while off-screen, and for reduced motion.
 */
export function useAutoAdvance(ref: RefObject<HTMLElement | null>, enabled = true) {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the media query once on mount
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  const paused = !enabled || reduced || hover || focus || !visible;
  return {
    paused,
    handlers: {
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      onFocus: () => setFocus(true),
      onBlur: (e: React.FocusEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocus(false);
      },
    },
  };
}

/** Small circular timer shown on the active tab; calls onDone when it completes. */
export function ProgressRing({
  run,
  paused,
  duration,
  onDone,
  className = "",
  dark = false,
}: {
  run: boolean;
  paused: boolean;
  duration: number;
  onDone: () => void;
  className?: string;
  dark?: boolean;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className={`size-4 shrink-0 -rotate-90 ${run ? "ring-run" : ""} ${paused ? "ring-paused" : ""} ${className}`}
      style={{ ["--ring-dur" as string]: `${duration}ms` }}
    >
      <circle cx="10" cy="10" r="8" fill="none" strokeWidth="2" className={dark ? "stroke-white/25" : "stroke-ink/15"} />
      <circle
        key={run ? "run" : "idle"}
        cx="10"
        cy="10"
        r="8"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
        className={`ring-fg ${dark ? "stroke-paper" : "stroke-brand"}`}
        onAnimationEnd={run ? onDone : undefined}
      />
    </svg>
  );
}
