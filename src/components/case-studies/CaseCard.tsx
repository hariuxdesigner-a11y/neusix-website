import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";

export function CaseCard({ c, headingLevel = 2 }: { c: CaseStudy; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group relative flex h-full flex-col rounded-card border border-lilac-soft bg-paper p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-navy hover:shadow-[0_18px_40px_-24px_rgba(49,49,104,.5)] sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-wide text-lilac">{c.industry}</p>
      <H className="t-h4 mt-3">
        <Link href={`/case-studies/${c.slug}`} className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none">
          {c.title}
        </Link>
      </H>
      <p className="mt-6 text-sm font-semibold">Outcome Highlights:</p>
      <ul className="mt-3 space-y-3">
        {c.card.map((h) => (
          <li key={h.label} className="flex items-start gap-2.5 text-sm leading-snug">
            {h.trend ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={h.trend === "up" ? "/assets/caretup-1.png" : "/assets/caretup-2.png"} alt="" width={20} height={20} className="mt-0.5 size-5 shrink-0" />
            ) : (
              <span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-full bg-lilac" />
            )}
            <span>
              {h.value && <strong className="mr-1 font-serif text-lg font-semibold text-navy">{h.value}</strong>}
              {h.label}
            </span>
          </li>
        ))}
      </ul>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-navy" aria-hidden>
        Explore
        <svg width="16" height="16" viewBox="0 0 16 16" className="transition-transform group-hover:translate-x-1">
          <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </article>
  );
}
