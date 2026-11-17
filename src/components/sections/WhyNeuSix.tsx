import { WHY_NEUSIX } from "@/content/services";

/** "Why NeuSix": dark panel with a V-shaped base and fine line work.
 *  The Webflow site used a fixed 2560px PNG (plus a separate mobile PNG); this
 *  rebuilds the same shape in CSS + a scalable SVG so it stays crisp at every width. */
export function WhyNeuSix() {
  const v = "clamp(90px, 20vw, 300px)";
  return (
    <section
      aria-labelledby="why-title"
      className="relative isolate overflow-hidden bg-ink text-paper"
      style={{ clipPath: `polygon(0 0, 100% 0, 100% calc(100% - ${v}), 50% 100%, 0 calc(100% - ${v}))`, paddingBottom: `calc(${v} + 48px)` }}
    >
      {/* line work */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 -z-10 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g stroke="#6d6eb5" strokeOpacity=".45" strokeWidth=".12" vectorEffect="non-scaling-stroke" fill="none">
          <line x1="0" y1="16" x2="100" y2="16" vectorEffect="non-scaling-stroke" />
          <line className="hidden lg:inline" x1="33.333" y1="16" x2="33.333" y2="100" vectorEffect="non-scaling-stroke" />
          <line className="hidden lg:inline" x1="66.666" y1="16" x2="66.666" y2="100" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="52" x2="66" y2="100" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="62" x2="52" y2="100" vectorEffect="non-scaling-stroke" />
          <line x1="100" y1="52" x2="34" y2="100" vectorEffect="non-scaling-stroke" />
          <line x1="100" y1="62" x2="48" y2="100" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[40%] w-[60%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(109,110,181,.35),transparent_65%)]" />

      <div className="container-x pt-[clamp(56px,6vw,96px)]">
        <h2 id="why-title" className="reveal t-display text-center !text-[clamp(2.25rem,1.6rem+2.6vw,3.5rem)] text-lilac">
          Why NeuSix
        </h2>
        <ol className="mt-[clamp(48px,7vw,120px)] grid gap-12 lg:grid-cols-3 lg:gap-0">
          {WHY_NEUSIX.map((w, i) => (
            <li key={w.n} className="reveal lg:px-[clamp(20px,2.4vw,40px)]" style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}>
              <span className="text-sm text-lilac">{w.n}</span>
              <h3 className="t-h3 mt-6 max-w-[16ch]">{w.title}</h3>
              <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-paper/85">{w.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
