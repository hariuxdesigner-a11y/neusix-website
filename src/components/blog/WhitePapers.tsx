import Link from "next/link";
import { WHITE_PAPERS } from "@/content/resources";
import { ArrowChip, LinkArrow } from "@/components/ui/Icon";

/** White paper card: links to the published document (opens in a new tab). */
export function WhitePaperCard({ paper, index, headingLevel = 3 }: { paper: (typeof WHITE_PAPERS)[number]; index: number; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as const;
  return (
    <a href={paper.href} target="_blank" rel="noopener noreferrer" className="group relative flex h-full flex-col overflow-hidden rounded-card border border-ink/10 bg-paper p-[clamp(22px,2.4vw,32px)] transition-[border-color,box-shadow] duration-300 hover:border-navy/40 hover:shadow-[0_18px_40px_-24px_rgba(15,15,31,.35)]">
      {/* document motif: a page with the N arch */}
      <span aria-hidden className="relative mb-8 flex h-28 w-[88px] items-end justify-center overflow-hidden rounded-[10px] bg-mist ring-1 ring-ink/5 transition-transform duration-500 group-hover:-translate-y-1">
        <svg viewBox="0 0 495 529" className="absolute -right-3 top-3 h-24 text-brand/30" fill="none">
          <path d="M33.75 227C33.75 124 115 33.75 243 33.75C375 33.75 460.75 109 460.75 239V495.25" stroke="currentColor" strokeWidth="44" strokeLinecap="round" />
        </svg>
        <span className="mb-3 w-full space-y-1.5 px-3">
          <span className="block h-1 w-3/4 rounded bg-ink/15" />
          <span className="block h-1 w-1/2 rounded bg-ink/10" />
        </span>
        <span className="absolute left-3 top-3 text-[11px] font-semibold text-navy">0{index + 1}</span>
      </span>
      <span className="eyebrow text-slate">White paper</span>
      <H className="t-h4 mt-3 text-ink transition-colors group-hover:text-brand">{paper.title}</H>
      <p className="mt-3 text-[15px] leading-relaxed text-body">{paper.text}</p>
      <span className="mt-auto flex items-center justify-between pt-8 text-sm font-medium text-navy">
        Read the white paper
        <ArrowChip dir="up-right" className="size-9" />
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/** White papers teaser band (blog index, post pages, resources hub). */
export function WhitePapersBand({ title = "White papers" }: { title?: string }) {
  return (
    <section aria-labelledby="wp-band" className="section-band border-t border-ink/5 bg-mist/50">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow reveal text-brand">Go deeper</p>
            <h2 id="wp-band" className="t-h2 reveal mt-3">
              {title}
            </h2>
          </div>
          <Link href="/white-papers" className="group reveal inline-flex items-center gap-2 text-sm font-medium text-navy">
            All white papers <LinkArrow />
          </Link>
        </div>
        <ul className="stagger mt-[clamp(28px,3.5vw,48px)] grid gap-[clamp(16px,2vw,24px)] md:grid-cols-3">
          {WHITE_PAPERS.map((w, i) => (
            <li key={w.title}>
              <WhitePaperCard paper={w} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
