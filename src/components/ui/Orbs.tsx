/** Soft blurred colour orbs used behind heroes, CTA bands, dark sections and the footer
 *  (recreates the Webflow "color-ball" layers). Pure CSS, decorative only. */
const PRESETS = {
  hero: [
    { c: "var(--color-red)", x: "14%", y: "18%", s: "18vw" },
    { c: "var(--color-lilac)", x: "-4%", y: "38%", s: "16vw" },
    { c: "var(--color-purple)", x: "4%", y: "86%", s: "14vw" },
    { c: "var(--color-green)", x: "26%", y: "104%", s: "15vw" },
    { c: "var(--color-orange)", x: "96%", y: "40%", s: "16vw" },
    { c: "var(--color-lilac)", x: "90%", y: "96%", s: "16vw" },
  ],
  cta: [
    { c: "var(--color-lilac)", x: "2%", y: "14%", s: "14vw" },
    { c: "var(--color-red)", x: "14%", y: "6%", s: "12vw" },
    { c: "var(--color-purple)", x: "8%", y: "92%", s: "12vw" },
    { c: "var(--color-green)", x: "28%", y: "104%", s: "12vw" },
    { c: "var(--color-orange)", x: "97%", y: "26%", s: "14vw" },
    { c: "var(--color-lilac)", x: "92%", y: "98%", s: "13vw" },
  ],
  dark: [
    { c: "var(--color-red)", x: "18%", y: "12%", s: "16vw" },
    { c: "var(--color-lilac)", x: "2%", y: "56%", s: "14vw" },
    { c: "var(--color-green)", x: "28%", y: "88%", s: "14vw" },
    { c: "var(--color-orange)", x: "96%", y: "56%", s: "15vw" },
    { c: "var(--color-purple)", x: "86%", y: "6%", s: "12vw" },
  ],
  footer: [
    { c: "var(--color-green)", x: "40%", y: "8%", s: "12vw" },
    { c: "var(--color-red)", x: "30%", y: "56%", s: "14vw" },
    { c: "var(--color-orange)", x: "20%", y: "88%", s: "12vw" },
    { c: "var(--color-purple)", x: "52%", y: "40%", s: "13vw" },
    { c: "var(--color-lilac)", x: "60%", y: "92%", s: "12vw" },
  ],
} as const;

export function Orbs({ preset = "hero", dim = false }: { preset?: keyof typeof PRESETS; dim?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {PRESETS[preset].map((o, i) => (
        <span
          key={i}
          className="absolute aspect-square rounded-full blur-[clamp(28px,4vw,64px)] motion-safe:animate-float"
          style={{
            left: o.x,
            top: o.y,
            width: `clamp(120px, ${o.s}, 300px)`,
            translate: "-50% -50%",
            background: `radial-gradient(circle, ${o.c} 0%, transparent 70%)`,
            opacity: dim ? 0.35 : 0.5,
            animationDelay: `${i * -2.3}s`,
          }}
        />
      ))}
    </div>
  );
}
