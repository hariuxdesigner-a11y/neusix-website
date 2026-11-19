"use client";

import { useMemo, useState } from "react";
import { CASE_STUDIES, FILTER_GROUPS } from "@/content/case-studies";
import { CaseCard } from "./CaseCard";

type Key = keyof typeof FILTER_GROUPS;
const LABELS: Record<Key, string> = { industry: "Industry", services: "Service", themes: "Themes" };

/** Filter chips (Industry / Service / Themes) + case study grid. Selections within a
 *  group are OR'd; groups are AND'd. Works with keyboard (chips are toggle buttons). */
export function CaseStudiesBrowser() {
  const [sel, setSel] = useState<Record<Key, string[]>>({ industry: [], services: [], themes: [] });
  const toggle = (k: Key, v: string) => setSel((s) => ({ ...s, [k]: s[k].includes(v) ? s[k].filter((x) => x !== v) : [...s[k], v] }));
  const active = sel.industry.length + sel.services.length + sel.themes.length;

  const list = useMemo(
    () =>
      CASE_STUDIES.filter(
        (c) =>
          (!sel.industry.length || sel.industry.includes(c.filters.industry)) &&
          (!sel.services.length || sel.services.some((s) => c.filters.services.includes(s))) &&
          (!sel.themes.length || sel.themes.some((t) => c.filters.themes.includes(t))),
      ),
    [sel],
  );

  return (
    <>
      <section aria-label="Filter case studies" className="relative isolate overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/line-02-new.svg" alt="" aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[70%] w-full -translate-y-1/2 object-fill opacity-35" />
        <div className="container-x py-[clamp(48px,6vw,96px)]">
          <div className="mx-auto grid max-w-[1100px] gap-10">
            {(Object.keys(FILTER_GROUPS) as Key[]).map((k) => (
              <fieldset key={k} className="reveal text-center">
                <legend className="t-h3 mx-auto">{LABELS[k]}</legend>
                <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                  {FILTER_GROUPS[k].map((v) => {
                    const on = sel[k].includes(v);
                    return (
                      <button
                        key={v}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(k, v)}
                        className={`min-h-10 rounded-full px-4 py-2 text-sm transition-colors ${on ? "bg-navy text-white" : "bg-mist-2 text-ink hover:bg-lilac-soft"}`}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="cs-list-title" className="container-x pb-[var(--section-y)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="cs-list-title" className="t-h2">
            Case studies
          </h2>
          <p className="text-sm text-slate" aria-live="polite">
            {active ? (
              <>
                {list.length} of {CASE_STUDIES.length} shown ·{" "}
                <button type="button" className="underline underline-offset-4 hover:text-brand" onClick={() => setSel({ industry: [], services: [], themes: [] })}>
                  Clear filters
                </button>
              </>
            ) : null}
          </p>
        </div>
        {list.length ? (
          <ul className="stagger mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {list.map((c) => (
              <li key={c.slug}>
                <CaseCard c={c} headingLevel={3} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 rounded-card border border-dashed border-lilac-soft p-10 text-center text-slate">No case studies match these filters.</p>
        )}
      </section>
    </>
  );
}
