"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LIBRARY_AREAS, LIBRARY_TOTAL } from "@/content/microservices";

/**
 * Animated name cloud for the microservices library. A slowly turning sphere of 600 dots (one per
 * service) sits in the middle. Service names drift in and out on pills around it, working through
 * the whole list, and the dot for each name on screen lights up while it shows. Choosing an area
 * narrows the cloud (and the count) to that area. The names are fetched only when the panel nears
 * the viewport; if that fails we say so. Reduced motion: still sphere, a fixed set of names.
 */

type Row = { i: number; name: string; area: string };
type Slot = { x: number; y: number; c: number; maxW: number };

const SWAP_MS = 240; // one pill changes this often
const FADE_MS = 520;

export function LibraryCloud({
  area,
  onClear,
}: {
  area: string | null;
  onClear: () => void;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const pills = useRef<(HTMLSpanElement | null)[]>([]);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [count, setCount] = useState(LIBRARY_TOTAL);

  // shared, mutable animation state (read by the canvas loop)
  const lit = useRef<Set<number>>(new Set());
  const focus = useRef<Set<number> | null>(null);
  const sparks = useRef<{ x: number; y: number; t0: number; d: number }[]>([]);
  const geo = useRef({ w: 0, h: 0, cx: 0, cy: 0, r: 0 });

  const load = useCallback(() => {
    setFailed(false);
    fetch("/data/microservices.json")
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<{ rows: string[][] }>;
      })
      .then((d) =>
        setRows(d.rows.map(([, name, a], i) => ({ i, name, area: a }))),
      )
      .catch(() => setFailed(true));
  }, []);

  // fetch when near
  useEffect(() => {
    const el = stage.current!;
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
  }, [load]);

  // layout: sphere size and the ring of pill slots, recomputed on resize
  useEffect(() => {
    const el = stage.current!;
    const layout = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const narrow = w < 640;
      const out: Slot[] = [];
      let r: number;
      if (narrow) {
        // phones: sphere in the middle, a staggered column of pills above and below it
        r = Math.min(w * 0.24, h * 0.17);
        const rowsEach = 4;
        const gap = (h / 2 - r - 22) / rowsEach;
        for (let k = 0; k < rowsEach * 2; k++) {
          const top = k < rowsEach;
          const j = k % rowsEach;
          const y = top ? 18 + gap * (j + 0.5) : h - 18 - gap * (j + 0.5);
          const x = w / 2 + (j % 2 ? 1 : -1) * w * 0.12;
          out.push({ x, y, c: 0, maxW: w * 0.7 });
        }
      } else {
        r = Math.min(w * 0.175, h * 0.3);
        const n = w < 900 ? 12 : 16;
        for (let k = 0; k < n; k++) {
          // even ring, nudged off the exact top/bottom so wide pills don't stack
          const a = (k / n) * Math.PI * 2 - Math.PI / 2 + Math.PI / n;
          const rx = r + 34 + (k % 2) * 30;
          const ry = r + 36;
          const x = w / 2 + Math.cos(a) * rx;
          const y = h / 2 + Math.sin(a) * ry;
          const c = Math.cos(a);
          const maxW =
            c > 0.15
              ? w - x - 12
              : c < -0.15
                ? x - 12
                : Math.min(x, w - x) * 2 - 24;
          out.push({ x, y, c, maxW: Math.max(120, Math.min(320, maxW)) });
        }
      }
      geo.current = { w, h, cx: w / 2, cy: h / 2, r };
      setSlots(out);
      const cv = canvas.current!;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      cv.getContext("2d")!.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // sphere + sparks
  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Fibonacci sphere, 600 points; service i sits on a shuffled point so areas scatter
    const N = LIBRARY_TOTAL;
    const pts = Array.from({ length: N }, (_, k) => {
      const y = 1 - (k / (N - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = k * 2.399963229728653;
      return [Math.cos(th) * rad, y, Math.sin(th) * rad] as const;
    });
    const map = Array.from({ length: N }, (_, k) => k);
    let seed = 7;
    for (let k = N - 1; k > 0; k--) {
      seed = (seed * 9301 + 49297) % 233280;
      const j = Math.floor((seed / 233280) * (k + 1));
      [map[k], map[j]] = [map[j], map[k]];
    }
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(cv);
    let id = 0;
    let rot = 0;
    let last = performance.now();
    const draw = (t: number) => {
      const dt = Math.min(64, t - last);
      last = t;
      if (visible || reduce) {
        if (!reduce) rot += dt * 0.00012;
        const { w, h, cx, cy, r } = geo.current;
        ctx.clearRect(0, 0, w, h);
        // soft core
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.48);
        g.addColorStop(0, "rgba(109,110,181,.22)");
        g.addColorStop(1, "rgba(109,110,181,.10)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.42, 0, Math.PI * 2);
        ctx.fill();
        const tilt = 0.32;
        const cr = Math.cos(rot),
          sr = Math.sin(rot),
          ct = Math.cos(tilt),
          st = Math.sin(tilt);
        const f = focus.current;
        for (let s = 0; s < N; s++) {
          const [px, py, pz] = pts[map[s]];
          const x1 = px * cr + pz * sr;
          const z1 = -px * sr + pz * cr;
          const y2 = py * ct - z1 * st;
          const z2 = py * st + z1 * ct;
          const depth = (z2 + 1) / 2; // 0 back .. 1 front
          const X = cx + x1 * r;
          const Y = cy + y2 * r;
          const on = lit.current.has(s);
          const inFocus = !f || f.has(s);
          if (on) {
            ctx.fillStyle = "#ef703d";
            ctx.beginPath();
            ctx.arc(X, Y, 2.6 + depth * 1.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "rgba(239,112,61,.22)";
            ctx.beginPath();
            ctx.arc(X, Y, 6 + depth * 3, 0, Math.PI * 2);
            ctx.fill();
          } else {
            const a = inFocus ? 0.22 + depth * 0.7 : 0.06 + depth * 0.1;
            ctx.fillStyle =
              inFocus && f
                ? `rgba(49,49,104,${a})`
                : `rgba(64,62,142,${a * 0.8})`;
            ctx.beginPath();
            ctx.arc(
              X,
              Y,
              (inFocus && f ? 1.3 : 0.9) + depth * 0.9,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }
        }
        // sparks: dotted trails from a new pill into the sphere
        const now = performance.now();
        sparks.current = sparks.current.filter((p) => now - p.t0 < 1300 + p.d);
        for (const p of sparks.current) {
          const k = (now - p.t0 - p.d) / 1300;
          if (k < 0) continue;
          const e = 1 - Math.pow(1 - k, 2);
          const X = p.x + (cx - p.x) * e * 0.72;
          const Y = p.y + (cy - p.y) * e * 0.72;
          ctx.fillStyle = `rgba(64,62,142,${0.7 * (1 - k)})`;
          ctx.beginPath();
          ctx.arc(X, Y, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (!reduce) id = requestAnimationFrame(draw);
    };
    id = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
    };
  }, []);

  // pill cycling through the (filtered) list
  useEffect(() => {
    if (!rows || !slots.length) return;
    const pool = area ? rows.filter((r) => r.area === area) : rows;
    focus.current = area ? new Set(pool.map((r) => r.i)) : null;
    // stable shuffle per filter so the whole list comes round before any repeat
    const q = [...pool];
    for (let k = q.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [q[k], q[j]] = [q[j], q[k]];
    }
    let next = 0;
    const take = () => q[next++ % q.length];
    const shown: (Row | null)[] = slots.map(() => null);
    lit.current = new Set();
    const set = (k: number, row: Row) => {
      const el = pills.current[k];
      if (!el) return;
      const old = shown[k];
      if (old) lit.current.delete(old.i);
      shown[k] = row;
      lit.current.add(row.i);
      el.querySelector("span[data-n]")!.textContent = row.name;
      el.title = row.name;
    };
    // first fill: staggered entrance
    const timers: number[] = [];
    slots.forEach((_, k) => {
      const el = pills.current[k];
      if (!el) return;
      el.classList.add("is-out");
      timers.push(
        window.setTimeout(
          () => {
            set(k, take());
            el.classList.remove("is-out");
          },
          120 + k * 70,
        ),
      );
    });
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return () => timers.forEach(clearTimeout);
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(stage.current!);
    let k = 0;
    const iv = window.setInterval(
      () => {
        if (!visible || document.hidden) return;
        k = (k + 5) % slots.length; // hop around the ring
        const el = pills.current[k];
        if (!el) return;
        const slot = slots[k];
        el.classList.add("is-out");
        timers.push(
          window.setTimeout(() => {
            set(k, take());
            el.classList.remove("is-out");
            const now = performance.now();
            for (let d = 0; d < 5; d++)
              sparks.current.push({
                x: slot.x,
                y: slot.y,
                t0: now,
                d: d * 110,
              });
          }, FADE_MS),
        );
      },
      SWAP_MS * (slots.length < 12 ? 2.4 : 1.4),
    );
    return () => {
      clearInterval(iv);
      timers.forEach(clearTimeout);
      io.disconnect();
    };
  }, [rows, slots, area]);

  // count-up: from 0 when the number first scrolls into view, then between totals as areas change
  const countEl = useRef<HTMLParagraphElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setSeen(true);
    setCount(0); // the server-rendered 600 stays for no-JS; the section sits well below the fold
    const el = countEl.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const target = !seen
    ? 0
    : area
      ? (LIBRARY_AREAS.find((a) => a.area === area)?.count ?? 0)
      : LIBRARY_TOTAL;
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return setCount(target || LIBRARY_TOTAL);
    if (!seen) return;
    let id = 0;
    const from = count;
    const dur = from === 0 ? 1800 : 700;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      setCount(Math.round(from + (target - from) * (1 - Math.pow(1 - k, 3))));
      if (k < 1) id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, seen]);

  const info = area ? LIBRARY_AREAS.find((a) => a.area === area) : null;

  return (
    <div className="grid items-center gap-[clamp(24px,3vw,48px)] lg:grid-cols-[280px_minmax(0,1fr)]">
      <div className="lib-cloud relative overflow-hidden rounded-[clamp(18px,2vw,28px)] text-ink">
        <div
          ref={stage}
          className="relative h-[560px] sm:h-[clamp(440px,40vw,540px)]"
          aria-hidden
        >
          <canvas ref={canvas} className="absolute inset-0" />
          {slots.map((s, k) => (
            <span
              key={k}
              ref={(el) => {
                pills.current[k] = el;
              }}
              className="lib-pill is-out"
              style={{
                left: s.x,
                top: s.y,
                maxWidth: s.maxW,
                transform: `translate(${Math.abs(s.c) > 0.15 ? (s.c > 0 ? 0 : -100) : -50}%, -50%)`,
              }}
            >
              <i aria-hidden />
              <span data-n className="truncate" />
            </span>
          ))}
          {failed && (
            <p className="absolute inset-x-6 bottom-6 text-center text-[14px] text-ink">
              The service names could not be loaded just now.{" "}
              <button
                type="button"
                onClick={load}
                className="font-medium underline underline-offset-4"
              >
                Try again
              </button>
            </p>
          )}
        </div>
      </div>

      {/* count and context, on the page (outside the card) */}
      <div className="order-first flex flex-col gap-3">
        <p className="eyebrow text-brand">{info ? info.label : "Services"}</p>
        <p
          ref={countEl}
          className="lib-count font-sans text-[clamp(3.4rem,2.4rem+4vw,6rem)] font-semibold leading-none tracking-tight tabular-nums"
          aria-live="polite"
        >
          {count.toLocaleString("en-IN")}
        </p>
        <p className="max-w-[320px] text-[18px] font-semibold leading-snug text-ink">
          {info
            ? info.blurb
            : "reusable services across 12 capability areas, from document AI to digital twins and edge devices."}
        </p>
        {info ? (
          <button
            type="button"
            onClick={onClear}
            className="mt-2 inline-flex h-10 w-fit items-center gap-2 rounded-full border border-ink/15 px-4 text-[13px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
              <path
                d="m3 3 6 6M9 3 3 9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            Show all {LIBRARY_TOTAL}
          </button>
        ) : (
          <p className="mt-2 font-mono text-[12px] text-slate">
            Pick an area above to focus the cloud.
          </p>
        )}
      </div>
    </div>
  );
}
