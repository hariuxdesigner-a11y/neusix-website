import Link from "next/link";
import { CLIENTS, CLIENTS_SECTION, type Faq } from "@/content/extras";
import { INDUSTRIES } from "@/content/industries";
import { CASE_STUDIES } from "@/content/case-studies";
import { MediaPoster } from "@/components/media/MediaPoster";
import { CaseCard } from "@/components/case-studies/CaseCard";
import { SectionHead } from "./Bands";
import { IndustriesHome } from "./IndustriesHome";
import { Marquee } from "@/components/motion/Marquee";
import { StaggerParallax } from "@/components/motion/StaggerParallax";
import { Counter } from "@/components/motion/Counter";
import { ArrowChip, LinkArrow } from "@/components/ui/Icon";

export const Arrow = LinkArrow;

/** Client logo marquee. Logos show as one-colour silhouettes and turn to full colour on hover; motion pauses on hover and stops for reduced motion. */
export function ClientMarquee() {
  if (!CLIENTS.length) return null;
  return (
    <section aria-labelledby="clients-title" className="border-b border-ink/[.07] bg-paper">
      <div className="container-x grid items-center gap-5 py-[clamp(24px,3vw,40px)] lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-12">
        <h2 id="clients-title" className="reveal text-sm leading-snug text-slate">
          <span className="eyebrow block text-brand">{CLIENTS_SECTION.eyebrow}</span>
          <span className="mt-1.5 block font-serif text-lg text-ink">{CLIENTS_SECTION.title}</span>
        </h2>
        <Marquee speed={42}>
          {CLIENTS.map((c) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={c.name}
              src={c.logo}
              alt={c.name}
              loading="lazy"
              className="w-auto max-w-none shrink-0 select-none object-contain opacity-60 transition duration-300 [filter:grayscale(1)_brightness(0)] hover:opacity-100 hover:[filter:none]"
              // optical sizing: wide wordmarks get shorter, square marks taller, so all read at the same weight
              style={{ height: `calc(${Math.max(0.62, Math.min(1.45, Math.sqrt(3 / c.ratio)) * (c.boost ?? 1)).toFixed(3)} * clamp(24px, 2.2vw, 32px))` }}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

/** Home: the nine industries as image tiles linking to their section on the Industries page. */
export function IndustriesStrip() {
  return (
    <section aria-labelledby="industries-title" className="section-y">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead id="industries-title" eyebrow="Industries" title="AI transformation across industries" sub="built to survive the real world." />
          <Link href="/our-work/industries" className="group reveal inline-flex items-center gap-2 text-sm font-medium text-navy">
            All Industries <Arrow />
          </Link>
        </div>
        <IndustriesHome
          items={INDUSTRIES.map((ind) => {
            const w = ind.where.replace(/^Where we help:\s*/i, "").replace(/\.$/, "");
            return { name: ind.name, slug: ind.slug!, media: ind.media, where: w.charAt(0).toUpperCase() + w.slice(1) + "." };
          })}
        />
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
        <ul className="stagger -mx-[var(--gutter)] mt-[clamp(32px,4vw,56px)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {list.map((c) => (
            <li key={c.slug} className="w-[82vw] max-w-[360px] shrink-0 snap-start sm:w-auto sm:max-w-none">
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


/**
 * Home "Our impact" (Abridge staggered cards): a big rolling number headline and the case studies
 * as a staircase of cards that deepens as you scroll.
 */
export function ImpactCases({ exclude }: { exclude?: string }) {
  const list = CASE_STUDIES.filter((c) => c.slug !== exclude).slice(0, 4);
  return (
    <section aria-labelledby="impact-title" className="section-y overflow-hidden">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="stagger max-w-[820px]">
            <p className="eyebrow text-brand">Our Impact</p>
            <h2 id="impact-title" className="t-h2 mt-3 !text-[clamp(1.9rem,1.3rem+2.4vw,3.25rem)] !leading-[1.08]">
              Shipped across <Counter value={String(new Set(CASE_STUDIES.map((c) => c.filters.industry)).size)} /> industries
              <span className="block text-ink/60">from pilots to production</span>
            </h2>
          </div>
          <Link href="/our-work/case-studies" className="group reveal inline-flex items-center gap-2 text-sm font-medium text-navy">
            All Case Studies <Arrow />
          </Link>
        </div>
        <StaggerParallax
          step={56}
          className="-mx-[var(--gutter)] mt-[clamp(32px,4vw,56px)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-[200px]"
        >
          {list.map((c) => {
            const hl = c.card.find((h) => h.value) ?? c.card[0];
            return (
              <li key={c.slug} className="w-[78vw] max-w-[320px] shrink-0 snap-start will-change-transform lg:w-auto lg:max-w-none">
                <Link
                  href={`/case-studies/${c.slug}`}
                  className="group flex h-full min-h-[300px] flex-col rounded-card border border-ink/10 bg-paper p-6 transition-[border-color,box-shadow] duration-300 hover:border-navy hover:shadow-[0_18px_40px_-24px_rgba(49,49,104,.45)]"
                >
                  <span className="text-[17px] font-medium leading-snug">{c.industry}</span>
                  <span className="mt-3 text-sm leading-relaxed text-slate">{c.title}</span>
                  {hl?.value && (
                    <span className="mt-6 font-serif text-[clamp(2rem,1.6rem+1.4vw,2.75rem)] leading-none text-navy">
                      <Counter value={hl.value} />
                      <span className="mt-2 block font-sans text-xs leading-snug text-slate">{hl.label}</span>
                    </span>
                  )}
                  <span className="mt-auto flex items-center justify-between pt-8">
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink/70">
                      <span aria-hidden className="size-2 rounded-full bg-orange" /> Case Study
                    </span>
                    <ArrowChip />
                  </span>
                </Link>
              </li>
            );
          })}
        </StaggerParallax>
      </div>
    </section>
  );
}
