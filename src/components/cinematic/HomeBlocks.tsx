import Link from "next/link";
import type { MediaId } from "@/content/media";
import { SERVICES, SERVICE_CARD_ORDER, APPROACH_DEFAULT, WHY_NEUSIX, type Outcome } from "@/content/services";
import { getCaseStudy } from "@/content/case-studies";
import { BLOG_POSTS, WHITE_PAPERS, postHref, tagLabel } from "@/content/resources";
import { MediaPoster } from "@/components/media/MediaPoster";
import { ACCENT_HEX } from "@/components/services/ServiceSections";
import { VideoBackground } from "@/components/media/VideoBackground";
import { LottieOnView } from "@/components/ui/LottieOnView";
import { SectionHead } from "./Bands";

const Arrow = () => (
  <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" className="transition-transform group-hover:translate-x-1">
    <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** "Our Services": image-led cards (Abridge workflow cards), still frame from each service's own hero clip. */
export function ServiceShowcase({ title = "Our Services", eyebrow = "Services" }: { title?: string; eyebrow?: string }) {
  const cards = SERVICE_CARD_ORDER.map((slug) => SERVICES.find((s) => s.slug === slug)!);
  return (
    <section aria-labelledby="services-title" className="section-y">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead id="services-title" eyebrow={eyebrow} title={title} />
          <Link href="/services/services-neusix" className="group reveal inline-flex items-center gap-2 text-sm font-medium text-navy">
            All Services <Arrow />
          </Link>
        </div>
        <ul className="mt-[clamp(32px,4vw,56px)] grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((s, i) => (
            <li key={s.slug} className="reveal" style={{ ["--reveal-delay" as string]: `${(i % 3) * 90}ms` }}>
              <Link href={s.href} className="group block">
                <div className="relative">
                  <MediaPoster id={`svc-${s.slug}` as MediaId} className="aspect-[4/3] rounded-[clamp(14px,1.6vw,22px)]" />
                  <span aria-hidden className="absolute left-4 top-4 h-1 w-10 rounded-full" style={{ background: ACCENT_HEX[s.accent] }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.cardGfxWhite} alt="" aria-hidden className="absolute bottom-4 right-4 size-14 object-contain opacity-90" />
                </div>
                <h3 className="t-h4 mt-5 transition-colors group-hover:text-brand">{s.name}</h3>
                <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-slate">{s.cardText}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy">
                  Explore <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** "Our Approach": soft full-width video behind four phase cards (Abridge care-workflow pattern). */
export function ApproachBand({
  media = "home-approach",
  title = "Our Approach",
  sub = "The NeuSix Execution System",
  phases,
}: {
  media?: MediaId;
  title?: string;
  sub?: string;
  phases?: { name: string; text: string; icon: string; outputs?: string }[];
}) {
  const items = phases ?? APPROACH_DEFAULT;
  return (
    <section aria-labelledby="approach-title" className="relative isolate overflow-hidden">
      <VideoBackground id={media} overlay="soft" />
      <div className="container-x py-[clamp(88px,11vw,168px)]">
        <SectionHead id="approach-title" eyebrow={title} title={sub} align="center" />
        <ol className="mt-[clamp(40px,5vw,72px)] grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <li key={p.name} className="reveal flex flex-col rounded-[20px] bg-paper/90 p-6 shadow-[0_20px_50px_-30px_rgba(15,15,31,.35)] ring-1 ring-ink/5 backdrop-blur" style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.14em] text-lilac">0{i + 1}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.icon} alt="" width={203} height={185} loading="lazy" className="h-16 w-auto" />
              </div>
              <h3 className="t-h4 mt-4">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{p.text}</p>
              {"outputs" in p && p.outputs && (
                <>
                  <p className="mt-4 font-serif text-[15px] font-semibold">Typical outcomes:</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate">{p.outputs}</p>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** "Typical outcomes" as an outcomes showcase: the animated dials left, a featured case-study result right. */
export function OutcomeShowcase({ items, caseSlug = "logistics-ports" }: { items: Outcome[]; caseSlug?: string }) {
  const c = getCaseStudy(caseSlug)!;
  const hl = c.card.find((h) => h.value) ?? c.card[0];
  return (
    <section aria-labelledby="outcomes-title" className="section-y">
      <div className="container-x">
        <SectionHead id="outcomes-title" eyebrow="Shipping Impact" title="Typical outcomes" />
        <div className="mt-[clamp(32px,4vw,56px)] grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {items.map((o) => (
              <li key={o.label} className="reveal grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-6 sm:grid-cols-[minmax(0,200px)_120px_minmax(0,1fr)]">
                <h3 className="font-medium text-lilac">
                  {o.label}
                  {o.value && <span className="sr-only"> {o.value}</span>}
                </h3>
                <div className="relative row-span-2 size-[100px] sm:row-span-1 sm:size-[120px]">
                  <LottieOnView src={o.lottie} className="size-full" />
                  {o.value && (
                    <span aria-hidden className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-paper/90 px-1 font-serif text-lg leading-none text-navy">{o.value}</span>
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-slate">{o.text}</p>
              </li>
            ))}
          </ul>
          <Link href={`/case-studies/${c.slug}`} className="group reveal relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[clamp(16px,2vw,28px)] p-[clamp(24px,3vw,40px)] text-paper">
            <VideoBackground id={`cs-${c.slug}` as MediaId} overlay="hero" />
            <p className="eyebrow text-paper/75">Case Study | {c.industry}</p>
            {hl.value && <p className="mt-4 font-serif text-[clamp(3rem,2rem+4vw,5.5rem)] leading-none">{hl.value}</p>}
            <p className="mt-2 text-lg">{hl.label}</p>
            <p className="mt-6 max-w-[34ch] text-sm text-paper/80">{c.title}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
              Explore <Arrow />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/** "Why NeuSix": calm dark band with the three principles. */
export function WhyBand() {
  return (
    <section aria-labelledby="why-title" className="bg-ink text-paper">
      <div className="container-x section-y">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)]">
          <div className="reveal">
            <h2 id="why-title" className="t-display text-lilac">
              Why NeuSix
            </h2>
            <p className="mt-6 max-w-[22ch] font-serif text-[clamp(1.25rem,1rem+1vw,1.75rem)] leading-snug text-paper/85">
              <em>We optimize for:</em> Impact, Value, Transparency, and ROI.
            </p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[20px] bg-white/10 sm:grid-cols-3">
            {WHY_NEUSIX.map((w, i) => (
              <li key={w.n} className="reveal flex flex-col bg-ink p-7" style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}>
                <span className="text-sm text-lilac">{w.n}</span>
                <h3 className="t-h4 mt-10">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/75">{w.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Latest resources (Abridge "news" grid). */
export function ResourcesTeaser() {
  const posts = BLOG_POSTS.slice(0, 3);
  return (
    <section aria-labelledby="res-title" className="section-y border-t border-ink/5">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead id="res-title" eyebrow="Resources" title="Resources & Content" />
          <Link href="/resources" className="group reveal inline-flex items-center gap-2 text-sm font-medium text-navy">
            All Blogs <Arrow />
          </Link>
        </div>
        <ul className="mt-[clamp(28px,3.5vw,48px)] grid gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <li key={p.title} className="reveal">
              <a href={postHref(p)} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-[18px] border border-ink/10 p-6 transition-colors hover:border-navy">
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-lilac">
                  <span aria-hidden className="size-1.5 rounded-full bg-orange" /> {tagLabel(p.tag)}
                </span>
                <h3 className="mt-5 text-lg font-medium leading-snug group-hover:text-brand">{p.title}</h3>
                <span className="mt-auto pt-8 text-xs text-slate">{p.readTime}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {WHITE_PAPERS.map((w) => (
            <li key={w.title} className="reveal">
              <a href={w.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col gap-3 rounded-[18px] bg-mist/70 p-6 transition-colors hover:bg-mist">
                <span className="text-xs uppercase tracking-[0.12em] text-slate">White paper</span>
                <span className="text-sm font-medium leading-snug group-hover:text-brand">{w.title}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
