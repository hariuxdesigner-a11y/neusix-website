"use client";

import { useEffect, useState } from "react";

/** Thin reading-progress bar across the top of the viewport. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setP(Math.min(1, Math.max(0, -r.top / Math.max(1, total))));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div className="h-full origin-left bg-gradient-to-r from-brand via-lilac to-orange" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}

/** Sticky table of contents with the current section highlighted. */
export function TocNav({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      const line = window.innerHeight * 0.3;
      let cur = els[0]?.id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) cur = el.id;
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);
  return (
    <nav aria-label="On this page">
      <p className="eyebrow text-slate">On this page</p>
      <ol className="mt-4 space-y-1 border-l border-ink/10">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[14px] leading-snug text-slate transition-colors hover:text-ink aria-[current=location]:border-brand aria-[current=location]:font-medium aria-[current=location]:text-ink"
            >
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

const GLYPH = {
  linkedin: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.91 1.3-1.91 2.63V21H9.5V9.75Z",
  x: "M17.53 3H20.6l-6.7 7.66L21.8 21h-6.17l-4.83-6.32L5.27 21H2.2l7.17-8.2L1.8 3h6.33l4.37 5.77L17.53 3Zm-1.08 16.2h1.7L7.62 4.73H5.8l10.65 14.47Z",
  mail: "M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Zm1.9-.25L12 11.6l7.1-5.1H4.9Zm14.6 1.43-7.06 5.07a.75.75 0 0 1-.88 0L4.5 7.93v9.32c0 .14.11.25.25.25h14.5c.14 0 .25-.11.25-.25V7.93Z",
  link: "M10.6 13.4a.75.75 0 0 1 0-1.06l2.5-2.5a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0ZM8.47 18.6a3.75 3.75 0 0 1-5.3-5.3l2.65-2.65a.75.75 0 1 1 1.06 1.06l-2.65 2.65a2.25 2.25 0 0 0 3.18 3.18l2.65-2.65a.75.75 0 1 1 1.06 1.06L8.47 18.6Zm7.07-6.18a.75.75 0 0 1 0-1.06l2.65-2.65a2.25 2.25 0 1 0-3.18-3.18l-2.65 2.65a.75.75 0 1 1-1.06-1.06l2.65-2.65a3.75 3.75 0 0 1 5.3 5.3l-2.65 2.65a.75.75 0 0 1-1.06 0Z",
};

function Glyph({ d }: { d: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-[17px]" fill="currentColor">
      <path d={d} />
    </svg>
  );
}

/** Share links: LinkedIn, X, email and copy link. */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const btn = "inline-flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper";
  return (
    <div className="flex items-center gap-2">
      <a className={btn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn (opens in a new tab)">
        <Glyph d={GLYPH.linkedin} />
      </a>
      <a className={btn} href={`https://x.com/intent/post?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X (opens in a new tab)">
        <Glyph d={GLYPH.x} />
      </a>
      <a className={btn} href={`mailto:?subject=${t}&body=${u}`} aria-label="Share by email">
        <Glyph d={GLYPH.mail} />
      </a>
      <button
        type="button"
        className={btn}
        aria-label={copied ? "Link copied" : "Copy link"}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard unavailable: nothing to report as copied */
          }
        }}
      >
        <Glyph d={GLYPH.link} />
      </button>
      <span role="status" className="ml-1 text-xs text-slate">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
