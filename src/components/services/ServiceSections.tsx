import { ACCENT_HEX, ACCENT_INK } from "@/content/services";
import type { Service } from "@/content/services";
import { StatementFill } from "@/components/motion/StatementFill";
import { AnimIcon, SERVICE_ICON } from "@/components/icons/AnimIcon";
export { ACCENT_HEX };



export function StageFit({ s }: { s: Service }) {
  const c = ACCENT_HEX[s.accent];
  const cols = [
    { title: "Advisory", items: s.stage.advisory, gfx: s.stage.gfx[0] },
    { title: "Development & Integration", items: s.stage.development, gfx: s.stage.gfx[1] },
    { title: "Managed Services", items: s.stage.managed, gfx: s.stage.gfx[2] },
  ];
  return (
    <section aria-labelledby="stage-title" className="section-box section-attach border-b border-ink/[.07]">
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
              <AnimIcon name={(["advisory", "development", "managed"] as const)[i]} className="size-[clamp(64px,5.6vw,84px)]" style={{ color: ACCENT_INK[s.accent] }} />
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
      <div className="container-x section-y text-center">
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
      </div>
    </section>
  );
}

export function WhatWeDo({ s }: { s: Service }) {
  const c = ACCENT_HEX[s.accent];
  return (
    <section
      aria-labelledby="wwd-title"
      style={{ background: `radial-gradient(60% 70% at 50% 62%, ${c}1f 0%, ${c}0d 45%, transparent 75%)` }}
    >
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
    <section aria-labelledby="ucs-title" className="section-box bg-mist/60">
      <div className="container-x section-pad">
        <h2 id="ucs-title" className="t-h2 reveal text-center">
          Use-case themes
        </h2>
        <ul className="stagger mx-auto mt-10 flex max-w-[1000px] flex-wrap justify-center gap-3">
          {s.useCaseThemes.map((t) => (
            <li key={t} className="flex items-center gap-3 rounded-full border border-ink/10 bg-paper px-5 py-3 text-sm text-ink transition-colors hover:border-navy/40 sm:text-base">
              <span aria-hidden className="size-2 shrink-0 rounded-full bg-orange ring-4 ring-orange/15" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
