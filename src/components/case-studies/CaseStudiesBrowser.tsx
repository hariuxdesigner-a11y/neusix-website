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
      <section aria-labelledby="cs-filter-title" className="container-x pb-[clamp(32px,4vw,56px)] pt-[clamp(40px,5vw,80px)]">
        <div className="reveal rounded-card bg-mist/70 p-[clamp(20px,3vw,40px)] ring-1 ring-ink/5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 id="cs-filter-title" className="t-h4">
              Filter case studies
            </h2>
            <p className="text-sm text-slate" aria-live="polite">
              {active ? `${list.length} of ${CASE_STUDIES.length} match` : `${CASE_STUDIES.length} case studies`}
              {active ? (
                <>
                  {" · "}
                  <button type="button" className="font-medium text-navy underline underline-offset-4 hover:text-brand" onClick={() => setSel({ industry: [], services: [], themes: [] })}>
                    Clear all
                  </button>
                </>
              ) : null}
            </p>
          </div>
          <div className="mt-6 divide-y divide-ink/10 border-t border-ink/10">
            {(Object.keys(FILTER_GROUPS) as Key[]).map((k) => (
              <fieldset key={k} className="grid gap-3 py-5 md:grid-cols-[140px_minmax(0,1fr)] md:items-start md:gap-6">
                <legend className="contents">
                  <span className="flex items-center gap-2 pt-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                    {LABELS[k]}
                    {sel[k].length > 0 && <span className="rounded-full bg-navy px-1.5 text-[10px] leading-4 text-paper">{sel[k].length}</span>}
                  </span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {FILTER_GROUPS[k].map((v) => {
                    const on = sel[k].includes(v);
                    return (
                      <button
                        key={v}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(k, v)}
                        className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors ${
                          on ? "border-ink bg-ink text-paper" : "border-ink/10 bg-paper text-ink hover:border-navy/50"
                        }`}
                      >
                        {on ? (
                          <svg aria-hidden viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3.5 8.5l3 3 6-7" />
                          </svg>
                        ) : (
                          <span aria-hidden className="size-1.5 rounded-full bg-lilac" />
                        )}
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
