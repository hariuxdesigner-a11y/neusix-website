"use client";

import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { LIBRARY_AREAS, LIBRARY_TOTAL, type LibraryService } from "@/content/microservices";
import { LIBRARY_DRAWINGS } from "./LibraryDrawings";
import { SectionHead } from "./Bands";

/**
 * Microservices library: a carousel of 12 animated capability-area cards (pick one to filter) and
 * a searchable catalogue of all 600 services. The catalogue JSON is fetched only when the section
 * nears the viewport. If the fetch fails we say so; nothing is faked.
 */

const PAGE = 12;
const AUTO_MS = 3800;

type Status = "idle" | "loading" | "ready" | "error";

export function ServiceLibrary() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const catalogue = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<LibraryService[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [area, setArea] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const q = useDeferredValue(query.trim().toLowerCase());
  const [page, setPage] = useState(PAGE);
  const [limit, setLimit] = useState(PAGE);
  useEffect(() => {
    if (window.matchMedia("(max-width: 639px)").matches) {
      setPage(6);
      setLimit(6);
    }
  }, []);
  const paused = useRef(false);

  const load = useCallback(() => {
    setStatus("loading");
    fetch("/data/microservices.json")
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<{ fields: string[]; rows: string[][] }>;
      })
      .then((d) => {
        setRows(d.rows.map(([id, name, area, desc, use]) => ({ id, name, area, desc, use })));
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  // lazy-load the catalogue when the section gets close
  useEffect(() => {
    const el = root.current;
    if (!el || status !== "idle") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          load();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [status, load]);

  // gentle auto-advance of the carousel; stops on hover, focus, touch or reduced motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = track.current!;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    const id = window.setInterval(() => {
      if (!visible || paused.current || document.hidden) return;
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.offsetWidth + 16;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + step, behavior: "smooth" });
    }, AUTO_MS);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    paused.current = true;
    el.scrollBy({ left: dir * (card.offsetWidth + 16) * 2, behavior: "smooth" });
  };

  const pick = (a: string | null, jump = false) => {
    setArea((cur) => (cur === a ? null : a));
    setLimit(page);
    if (jump) catalogue.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (area && r.area !== area) return false;
      if (!q) return true;
      return `${r.id} ${r.name} ${r.desc} ${r.use} ${r.area}`.toLowerCase().includes(q);
    });
  }, [rows, area, q]);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const r of rows) {
      if (q && !`${r.id} ${r.name} ${r.desc} ${r.use} ${r.area}`.toLowerCase().includes(q)) continue;
      m[r.area] = (m[r.area] ?? 0) + 1;
    }
    return m;
  }, [rows, q]);

  const areaInfo = (a: string) => LIBRARY_AREAS.find((x) => x.area === a);
  const shown = filtered.slice(0, limit);
  const hasFilter = !!area || !!q;

  return (
    <section ref={root} aria-labelledby="library-title" className="section-y overflow-hidden">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            id="library-title"
            eyebrow="Microservices library"
            title={`${LIBRARY_TOTAL} building blocks, ready to assemble`}
            sub="Start your POC or MVP from proven parts."
            text="Twelve capability areas, each made of distinct, reusable services we combine into working systems. Pick an area to explore it, or search for your problem."
          />
          <div className="flex gap-2" aria-label="Scroll capability areas">
            <button type="button" onClick={() => scrollBy(-1)} className="inline-flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper" aria-label="Previous areas">
              <svg viewBox="0 0 20 20" className="size-4" aria-hidden><path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" onClick={() => scrollBy(1)} className="inline-flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper" aria-label="Next areas">
              <svg viewBox="0 0 20 20" className="size-4" aria-hidden><path d="M7.5 4.5 13 10l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* capability-area carousel */}
      <div
        ref={track}
        className="lib-track mt-[clamp(28px,3.5vw,48px)]"
        onPointerEnter={() => (paused.current = true)}
        onPointerLeave={() => (paused.current = false)}
        onFocusCapture={() => (paused.current = true)}
        onBlurCapture={() => (paused.current = false)}
        onTouchStart={() => (paused.current = true)}
        role="group"
        aria-label="Capability areas"
      >
        {LIBRARY_AREAS.map((a, i) => {
          const on = area === a.area;
          return (
            <button
              key={a.area}
              type="button"
              aria-pressed={on}
              onClick={() => pick(a.area, true)}
              className={`ap-card lib-card group flex w-[clamp(240px,21vw,284px)] shrink-0 snap-start flex-col rounded-card p-4 text-left transition-[background-color,box-shadow] duration-300 ${on ? "bg-lilac-soft ring-2 ring-brand" : "bg-mist hover:bg-lilac-soft/60"}`}
            >
              <span className="flex w-full items-center justify-between font-mono text-[11px] text-slate">
                <span className="text-ink">{String(i + 1).padStart(2, "0")}</span>
                <span>NX-{a.code}</span>
              </span>
              <span className="mt-2 block">{LIBRARY_DRAWINGS[a.drawing]}</span>
              <span className="mt-3 flex items-baseline justify-between gap-3">
                <span className="text-[15px] font-medium text-ink">{a.label}</span>
                <span className="shrink-0 font-mono text-[11px] text-brand">{a.count} services</span>
              </span>
              <span className="mt-1 block text-[13px] leading-snug text-slate">{a.blurb}</span>
              <span className="mt-auto flex items-center gap-1.5 pt-3 text-[12px] font-medium text-brand">
                {on ? "Showing below" : "Explore"}
                <svg viewBox="0 0 20 20" className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden><path d={on ? "M5 8l5 5 5-5" : "M7.5 4.5 13 10l-5.5 5.5"} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </button>
          );
        })}
      </div>

      {/* catalogue */}
      <div ref={catalogue} className="container-x scroll-mt-28 pt-[clamp(36px,4.5vw,64px)]">
        <div className="rounded-card bg-mist p-[clamp(16px,2.2vw,28px)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-lg font-medium text-ink">Search the catalogue</h3>
            <p className="font-mono text-[12px] text-slate" aria-live="polite">
              {status === "ready" ? `Showing ${Math.min(limit, filtered.length)} of ${filtered.length}` : status === "error" ? "" : "Loading the catalogue…"}
            </p>
          </div>

          <label className="relative mt-4 block">
            <span className="sr-only">Search services</span>
            <svg viewBox="0 0 20 20" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate" aria-hidden><circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="m13.2 13.2 3.3 3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(page);
              }}
              placeholder='Try "warehouse", "claims", "Arabic" or "drone"'
              className="h-12 w-full rounded-full border border-ink/10 bg-paper pl-11 pr-4 text-[15px] text-ink outline-none placeholder:text-slate focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/25"
            />
          </label>

          <div className="lib-chips -mx-[clamp(16px,2.2vw,28px)] mt-4 flex gap-2 overflow-x-auto px-[clamp(16px,2.2vw,28px)] pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label="Filter by capability area">
            <Chip on={!area} onClick={() => pick(null)} label="All areas" count={status === "ready" ? Object.values(counts).reduce((s, n) => s + n, 0) : LIBRARY_TOTAL} />
            {LIBRARY_AREAS.map((a) => (
              <Chip key={a.area} on={area === a.area} onClick={() => pick(a.area)} label={a.label} count={status === "ready" ? (counts[a.area] ?? 0) : a.count} />
            ))}
            {hasFilter && (
              <button
                type="button"
                onClick={() => {
                  setArea(null);
                  setQuery("");
                  setLimit(page);
                }}
                className="ml-1 shrink-0 text-[13px] font-medium text-brand underline-offset-4 hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="mt-5">
          {status === "error" ? (
            <div className="rounded-card border border-ink/10 p-6 text-[15px] text-ink">
              The catalogue could not be loaded just now.{" "}
              <button type="button" onClick={load} className="font-medium text-brand underline underline-offset-4">
                Try again
              </button>
            </div>
          ) : status !== "ready" ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
              {Array.from({ length: 6 }, (_, i) => (
                <li key={i} className="h-[188px] animate-pulse rounded-card bg-mist" />
              ))}
            </ul>
          ) : filtered.length === 0 ? (
            <div className="rounded-card border border-ink/10 p-6 text-[15px] text-ink">
              No services match {q ? <>“{query.trim()}”</> : "this filter"}
              {area ? <> in {areaInfo(area)?.label}</> : null}. Try a broader word, or{" "}
              <a href="/contact" className="font-medium text-brand underline underline-offset-4">
                tell us what you need
              </a>
              .
            </div>
          ) : (
            <>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((s) => (
                  <li key={s.id} className="lib-item flex flex-col rounded-card border border-ink/10 bg-paper p-5">
                    <div className="flex items-center justify-between gap-3 font-mono text-[11px]">
                      <span className="text-brand">{s.id}</span>
                      <span className="truncate rounded-full bg-mist px-2 py-0.5 text-slate">{areaInfo(s.area)?.label ?? s.area}</span>
                    </div>
                    <h4 className="mt-3 text-[16px] font-medium leading-snug text-ink">{s.name}</h4>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate">{s.desc}</p>
                    <p className="mt-auto pt-4 text-[13px] leading-snug text-ink">
                      <span className="font-medium">Where it fits: </span>
                      <span className="text-slate">{s.use}</span>
                    </p>
                  </li>
                ))}
              </ul>
              {filtered.length > limit && (
                <div className="mt-6 flex justify-center">
                  <button type="button" onClick={() => setLimit((l) => l + page)} className="inline-flex h-11 items-center rounded-full border border-ink/15 px-6 text-[14px] font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper">
                    Show {Math.min(page, filtered.length - limit)} more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Chip({ on, onClick, label, count }: { on: boolean; onClick: () => void; label: string; count: number }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-full border px-3.5 text-[13px] font-medium transition-colors ${on ? "border-ink bg-ink text-paper" : "border-ink/10 bg-paper text-ink hover:border-ink/30"}`}
    >
      {on ? (
        <svg viewBox="0 0 12 12" className="size-3" aria-hidden><path d="m2.5 6.2 2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      ) : (
        <span className="size-1.5 rounded-full bg-lilac" aria-hidden />
      )}
      {label}
      <span className={`font-mono text-[11px] ${on ? "text-paper/75" : "text-slate"}`}>{count}</span>
    </button>
  );
}
