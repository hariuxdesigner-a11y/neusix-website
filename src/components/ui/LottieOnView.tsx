"use client";

import { useEffect, useRef, useState } from "react";
import { DotLottieReact, setWasmUrl } from "@lottiefiles/dotlottie-react";

// Self-hosted renderer (copied from node_modules on install), so no third-party CDN is needed.
setWasmUrl("/lottie/dotlottie-player.wasm");

/** Loads and plays a Lottie (.lottie or .json) animation once it scrolls into view.
 *  Nothing is downloaded until the element is near the viewport. */
export function LottieOnView({ src, label, className = "", loop = false, speed = 1 }: { src: string; label?: string; className?: string; loop?: boolean; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {show && <DotLottieReact src={src} autoplay loop={loop} speed={speed} className="h-full w-full" />}
    </div>
  );
}
