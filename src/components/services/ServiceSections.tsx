import { ACCENT_HEX } from "@/content/services";
import type { Service } from "@/content/services";
import { LineIcon } from "@/components/motion/LineIcon";
import { StatementFill } from "@/components/motion/StatementFill";
export { ACCENT_HEX };

function AccentOrb({ color, className = "" }: { color: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute -z-10 aspect-square rounded-full blur-[clamp(24px,3vw,48px)] motion-safe:animate-float ${className}`}
      style={{ background: `radial-gradient(circle, ${color} 0%, ${color}cc 25%, transparent 70%)` }}
    />
  );
}

export function ServiceHero({ s }: { s: Service }) {
  const c = ACCENT_HEX[s.accent];
  return (
    <section aria-labelledby="svc-hero" className="relative isolate overflow-hidden">
      <div className="container-x relative py-[clamp(72px,10vw,150px)]">
        <AccentOrb color={c} className="left-[calc(var(--gutter)-60px)] top-[clamp(10px,3vw,40px)] w-[clamp(160px,18vw,260px)] opacity-80" />
        <p className="eyebrow">Shipping Impact</p>
        <h1 id="svc-hero" className="t-display mt-3 max-w-[15ch]" style={{ ["--reveal-delay" as string]: "80ms" }}>
          {s.hero}
        </h1>
      </div>
    </section>
  );
}

export function StageFit({ s }: { s: Service }) {
  const c = ACCENT_HEX[s.accent];
  const cols = [
    { title: "Advisory", items: s.stage.advisory, gfx: s.stage.gfx[0] },
    { title: "Development & Integration", items: s.stage.development, gfx: s.stage.gfx[1] },
    { title: "Managed Services", items: s.stage.managed, gfx: s.stage.gfx[2] },
  ];
  return (
    <section aria-labelledby="stage-title" className="border-b border-ink/[.07]">
      <div className="container-x py-[clamp(56px,7vw,112px)]">
        <div className="stagger">
          <p className="eyebrow text-brand">Stage Fit</p>
          <h2 id="stage-title" className="t-h2 mt-3">
            Stage Fit : Where this service plays
          </h2>
        </div>
        <ol className="stagger mt-[clamp(32px,4vw,64px)] grid gap-10 md:grid-cols-3 md:gap-0">
          {cols.map((col, i) => (
            <li
              key={col.title}
              className="border-dotted md:px-[clamp(16px,2.4vw,40px)] md:first:pl-0 md:[&:not(:first-child)]:border-l-2"
              style={{ borderColor: c }}
            >
              <LineIcon src={col.gfx} delay={250 + i * 180} knock="#fcfcfd" className="h-[clamp(80px,7vw,104px)] w-[clamp(94px,8.2vw,122px)]" />
              <h3 className="t-h4 mt-5">{col.title}</h3>
              <ul className="mt-4 space-y-4">
                {col.items.map((t) => (
                  <li key={t} className="max-w-[32ch] text-sm leading-relaxed text-body">
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ServiceIntro({ s }: { s: Service }) {
  if (!s.intro) return null;
  const c = ACCENT_HEX[s.accent];
  const parts = s.intro.bullets ? s.intro.text.split(" • ") : null;
  return (
    <section aria-labelledby="intro-title" className="relative isolate overflow-hidden">
      <div className="container-x py-[clamp(72px,9vw,140px)] text-center">
        <h2 id="intro-title" className="t-h2 reveal">
          {s.intro.title}
        </h2>
        {parts ? (
          <ul className="stagger mx-auto mt-6 flex max-w-[1000px] flex-wrap justify-center gap-x-3 gap-y-2 font-serif text-[clamp(1.25rem,0.9rem+1.5vw,2.25rem)] leading-snug">
            {parts.map((p, i) => (
              <li key={p} className="flex items-center gap-3">
                {p}
                {i < parts.length - 1 && <span aria-hidden>•</span>}
              </li>
            ))}
          </ul>
        ) : (
          <StatementFill text={s.intro.text} className="mx-auto mt-6 max-w-[40ch] font-serif text-[clamp(1.25rem,0.9rem+1.5vw,2.25rem)] leading-snug" />
        )}
        <AccentOrb color={c} className="right-[18%] top-[55%] w-[clamp(140px,14vw,220px)] opacity-70" />
      </div>
    </section>
  );
}

export function WhatWeDo({ s }: { s: Service }) {
  const c = ACCENT_HEX[s.accent];
  return (
    <section aria-labelledby="wwd-title" className="relative isolate overflow-hidden">
      <AccentOrb color={c} className="left-1/2 top-1/2 w-[clamp(280px,40vw,560px)] -translate-x-1/2 -translate-y-1/2 opacity-45" />
      <div className="container-x section-y">
        <h2 id="wwd-title" className="t-h2 reveal text-center">
          What we do
        </h2>
        <ul className="stagger mx-auto mt-[clamp(32px,4vw,64px)] grid max-w-[1100px] gap-4 md:grid-cols-3 md:gap-6">
          {s.whatWeDo.map((w) => (
            <li
              key={w.title}
              className="rounded-card border border-white/60 bg-paper/75 p-7 shadow-[0_20px_50px_-30px_rgba(15,15,31,.35)] backdrop-blur-md transition-transform duration-500 hover:-translate-y-1"
            >
              <span aria-hidden className="block h-1 w-10 rounded-full" style={{ background: c }} />
              <h3 className="t-h4 mt-5">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-body">{w.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function UseCaseThemes({ s }: { s: Service }) {
  if (!s.useCaseThemes) return null;
  return (
    <section aria-labelledby="ucs-title" className="bg-mist/60">
      <div className="container-x py-[clamp(56px,7vw,104px)]">
        <h2 id="ucs-title" className="t-h2 reveal text-center">
          Use-case themes
        </h2>
        <ul className="stagger mx-auto mt-10 flex max-w-[1000px] flex-wrap justify-center gap-3">
          {s.useCaseThemes.map((t) => (
            <li key={t} className="flex items-center gap-2.5 rounded-full border border-lilac-soft bg-paper px-5 py-3 text-sm sm:text-base">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/radial-button-bullet.svg" alt="" width={20} height={20} className="size-5" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
