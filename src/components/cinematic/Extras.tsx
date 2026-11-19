import Link from "next/link";
import { CLIENTS, CLIENTS_SECTION, type Faq } from "@/content/extras";
import { INDUSTRIES } from "@/content/industries";
import { CASE_STUDIES } from "@/content/case-studies";
import { MediaPoster } from "@/components/media/MediaPoster";
import { CaseCard } from "@/components/case-studies/CaseCard";
import { SectionHead } from "./Bands";

export const Arrow = () => (
  <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" className="transition-transform group-hover:translate-x-1">
    <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Client logo marquee. Logos are greyscale until hovered; motion pauses on hover and stops for reduced motion. */
export function ClientMarquee() {
  if (!CLIENTS.length) return null;
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-[clamp(40px,5vw,80px)] pr-[clamp(40px,5vw,80px)]">
      {CLIENTS.map((c) => (
        <li key={c.name} className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.logo}
            alt={hidden ? "" : c.name}
            loading="lazy"
            className="h-[clamp(28px,2.6vw,40px)] w-auto max-w-[180px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
          />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-labelledby="clients-title" className="border-y border-ink/5 bg-paper py-[clamp(48px,6vw,88px)]">
      <div className="container-x">
        <div className="reveal text-center">
          <p className="eyebrow text-brand">{CLIENTS_SECTION.eyebrow}</p>
          <h2 id="clients-title" className="t-h3 mt-3">
            {CLIENTS_SECTION.title}
          </h2>
        </div>
      </div>
      <div className="group/marquee relative mt-[clamp(28px,3.5vw,48px)] overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max motion-safe:animate-marquee group-hover/marquee:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
          {row(false)}
          <div className="contents motion-reduce:hidden">{row(true)}</div>
        </div>
      </div>
    </section>
  );
}

/** Home: the nine industries as image tiles linking to their section on the Industries page. */
export function IndustriesStrip() {
  return (
    <section aria-labelledby="industries-title" className="section-y bg-mist/60">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead id="industries-title" eyebrow="Industries" title="AI transformation across industries" sub="built to survive the real world." />
          <Link href="/our-work/industries" className="group reveal inline-flex items-center gap-2 text-sm font-medium text-navy">
            All Industries <Arrow />
          </Link>
        </div>
        <ul className="-mx-[var(--gutter)] mt-[clamp(32px,4vw,56px)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <li key={ind.media} className="reveal w-[78vw] max-w-[340px] shrink-0 snap-start sm:w-auto sm:max-w-none" style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}>
              <Link href={`/our-work/industries#${ind.slug}`} className="group relative isolate block overflow-hidden rounded-[clamp(14px,1.6vw,20px)]">
                <MediaPoster id={ind.media} className="aspect-[4/3]" />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-paper">
                  <span className="text-[17px] font-medium leading-snug">{ind.name}</span>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-paper/15 backdrop-blur transition-colors group-hover:bg-paper group-hover:text-ink">
                    <Arrow />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** A row of case study cards with a link to the full listing. */
export function CaseStudiesRow({
  slugs,
  exclude,
  eyebrow = "Case Studies",
  title = "AI Transformation that moves from pilots to production",
  id = "cases-row-title",
  limit = 3,
  className = "section-y",
}: {
  slugs?: string[];
  exclude?: string;
  eyebrow?: string;
  title?: string;
  id?: string;
  limit?: number;
  className?: string;
}) {
  const list = (slugs ? slugs.map((s) => CASE_STUDIES.find((c) => c.slug === s)!).filter(Boolean) : CASE_STUDIES).filter((c) => c.slug !== exclude).slice(0, limit);
  if (!list.length) return null;
  return (
    <section aria-labelledby={id} className={className}>
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead id={id} eyebrow={eyebrow} title={title} />
          <Link href="/our-work/case-studies" className="group reveal inline-flex items-center gap-2 text-sm font-medium text-navy">
            All Case Studies <Arrow />
          </Link>
        </div>
        <ul className="-mx-[var(--gutter)] mt-[clamp(32px,4vw,56px)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {list.map((c, i) => (
            <li key={c.slug} className="reveal w-[82vw] max-w-[360px] shrink-0 snap-start sm:w-auto sm:max-w-none" style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
              <CaseCard c={c} headingLevel={3} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** FAQ accordion: native <details>, works without JavaScript, plus FAQPage structured data. */
export function FaqSection({ items, id = "faq-title", title = "Frequently asked questions", className = "section-y", cta = true }: { items: Faq[]; id?: string; title?: string; className?: string; cta?: boolean }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section aria-labelledby={id} className={className}>
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:self-start">
          <SectionHead id={id} eyebrow="FAQ" title={title} />
          {cta && (
            <Link href="/contact-us" className="group reveal mt-6 inline-flex items-center gap-2 text-sm font-medium text-navy">
              Still have questions? Contact us <Arrow />
            </Link>
          )}
        </div>
        <div className="reveal divide-y divide-ink/10 border-y border-ink/10">
          {items.map((f) => (
            <details key={f.q} className="group/faq py-1 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-lg py-5 text-left text-[17px] font-medium transition-colors hover:text-brand focus-visible:outline-offset-4">
                {f.q}
                <span aria-hidden className="relative size-5 shrink-0 text-brand">
                  <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded bg-current" />
                  <span className="absolute left-1/2 top-0 h-5 w-0.5 -translate-x-1/2 rounded bg-current transition-transform duration-300 group-open/faq:rotate-90 group-open/faq:opacity-0" />
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 pr-10 text-[15px] leading-relaxed text-slate">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </section>
  );
}

