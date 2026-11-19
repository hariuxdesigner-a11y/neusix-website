"use client";

import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";

/**
 * Rolling-digit counter (Abridge stats). Takes the display string, e.g. "10+", "98%", "30–40%", "2.8x",
 * and rolls every number in it up from 0 when it scrolls into view. Server HTML shows the final value.
 */
export function Counter({ value, className = "" }: { value: string; className?: string }) {
  const parts = value.split(/(\d+(?:\.\d+)?)/).filter((s) => s !== "");
  const ref = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<"final" | "zero" | "run">("final");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9 && r.bottom > 0) return; // already on screen: leave as is
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to 0 once, before it is seen
    setState("zero");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState("run");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={className} aria-label={value} role="text">
      {parts.map((p, i) =>
        /^\d/.test(p) ? (
          <NumberFlow
            key={i}
            aria-hidden
            value={state === "zero" ? 0 : Number(p)}
            animated={state === "run"}
            format={{ minimumFractionDigits: p.includes(".") ? p.split(".")[1].length : 0, useGrouping: false }}
            transformTiming={{ duration: 1400, easing: "cubic-bezier(.16,1,.3,1)" }}
            spinTiming={{ duration: 1400, easing: "cubic-bezier(.16,1,.3,1)" }}
            willChange
          />
        ) : (
          <span key={i} aria-hidden>
            {p}
          </span>
        ),
      )}
    </span>
  );
}
