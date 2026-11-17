import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment, type ReactNode } from "react";
import { CASE_STUDIES, getCaseStudy } from "@/content/case-studies";
import { HeroVideo, RelatedCarousel, StageTabs } from "@/components/case-studies/CaseInteractive";
import { Button } from "@/components/ui/Button";
import { Orbs } from "@/components/ui/Orbs";
import { CtaBand } from "@/components/sections/CtaBand";
import { TrustStrip } from "@/components/sections/TrustStrip";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  // Live pages use the generic title "NeuSix website" and no description; built from the case study's own copy.
  const title = `${c.title} | Case Study | NeuSix`;
  const description = `${c.industry}: ${c.impact}.`;
  return { title, description, alternates: { canonical: `/case-studies/${c.slug}` }, openGraph: { type: "article", title, description, url: `/case-studies/${c.slug}` } };
}

/** Renders **bold** segments from the content files. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((p, i) => (i % 2 ? <strong key={i} className="font-semibold">{p}</strong> : <Fragment key={i}>{p}</Fragment>))}
    </>
  );
}

function Bullets({ items, dark = false, labelled = false }: { items: string[]; dark?: boolean; labelled?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => {
        const idx = labelled ? t.indexOf(": ") : -1;
        return (
          <li key={t} className="flex gap-3 leading-relaxed">
            <span aria-hidden className={`mt-2.5 size-1.5 shrink-0 rounded-full ${dark ? "bg-lilac-soft" : "bg-lilac"}`} />
            <span>
              {idx > 0 ? (
                <>
                  <strong className="font-semibold">{t.slice(0, idx + 1)}</strong>
                  {t.slice(idx + 1)}
                </>
              ) : (
                t
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function Block({ id, title, children, className = "", as: As = "h2" }: { id: string; title: string; children: ReactNode; className?: string; as?: "h2" | "h3" }) {
  return (
    <section aria-labelledby={id} className={className}>
      <div className="container-x py-[clamp(48px,6vw,96px)]">
        <As id={id} className="t-h2 reveal">
          {title}
        </As>
        <div className="reveal mt-[clamp(20px,2.5vw,36px)]">{children}</div>
      </div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();
  const related = CASE_STUDIES.filter((x) => x.slug !== c.slug);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    about: c.industry,
    publisher: { "@type": "Organization", name: "NeuSix" },
  };

  return (
    <article>
      {/* Hero */}
      <section aria-labelledby="cs-title" className="relative isolate overflow-hidden">
        <div className="container-x grid gap-10 py-[clamp(48px,6vw,96px)] lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm">
              <Link href="/our-work/case-studies" className="hover:text-brand">
                Case Study |
              </Link>{" "}
              <span>{c.industry}</span>
            </p>
            <h1 id="cs-title" className="t-display mt-4 !text-[clamp(2rem,1.4rem+2.4vw,3.5rem)]">
              {c.title}
            </h1>
            <p className="reveal mt-6 max-w-[52ch] leading-relaxed">
              <strong className="font-semibold">Shipping Impact:</strong> {c.impact}
            </p>
            <ul className="reveal mt-6 flex flex-wrap gap-2.5" aria-label="Capabilities">
              {c.tags.map((t) => (
                <li key={t} className="rounded-full border border-lilac-soft px-4 py-2 text-sm text-navy">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            {/* Original asset from the live site: a generic stock clip (see docs/CONTENT-NOTES.md). */}
            <HeroVideo src="/assets/file-example-mp4-640-3mg-mp4.mp4" poster="/assets/file-example-mp4-640-3mg-poster-0000000.jpg" />
          </div>
        </div>
      </section>

      <Block id="exec" title="Executive Summary">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-[68ch] space-y-5 leading-relaxed">
            {c.executive.paragraphs.map((p) => (
              <p key={p}>
                <Rich text={p} />
              </p>
            ))}
            {c.executive.flow && <p className="font-serif text-xl text-navy">{c.executive.flow}</p>}
            {c.executive.bulletsIntro && <p>{c.executive.bulletsIntro}</p>}
            {c.executive.bullets && <Bullets items={c.executive.bullets} />}
          </div>
          {c.executive.highlights && (
            <aside className="h-fit rounded-card bg-mist/70 p-7">
              <h3 className="font-semibold">{c.executive.highlightsTitle}</h3>
              <div className="mt-4 text-sm">
                <Bullets items={c.executive.highlights} />
              </div>
            </aside>
          )}
        </div>
      </Block>

      <section aria-labelledby="oh" className="relative isolate overflow-hidden bg-ink text-paper">
        <Orbs preset="dark" dim />
        <div className="container-x grid gap-10 py-[clamp(56px,7vw,112px)] lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <h2 id="oh" className="t-h2 reveal">
              Outcome Highlights
            </h2>
            <div className="reveal mt-8">
              <Bullets items={c.outcomeHighlights} dark />
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/outcome-banner.svg" alt="" loading="lazy" className="reveal mx-auto h-auto w-full max-w-[520px]" />
        </div>
      </section>

      <Block id="ctx" title="Client Context">
        <div className="grid max-w-[1000px] gap-6">
          <p className="max-w-[68ch] leading-relaxed">{c.context.intro}</p>
          <Bullets items={c.context.points} />
          <p className="max-w-[68ch] leading-relaxed">
            <Rich text={c.context.outro} />
          </p>
        </div>
      </Block>

      <section aria-labelledby="chal" className="bg-mist/60">
        <div className="container-x grid gap-10 py-[clamp(48px,6vw,96px)] lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h2 id="chal" className="t-h2 reveal">
              The Challenge
            </h2>
            <p className="reveal mt-5 max-w-[60ch] leading-relaxed">{c.challenge.intro}</p>
            <h3 className="t-h4 reveal mt-8">Key bottlenecks</h3>
            <div className="reveal mt-4">
              <Bullets items={c.challenge.bottlenecks} labelled />
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/cs-i2-3.svg" alt="" loading="lazy" className="reveal mx-auto h-auto w-full max-w-[420px]" />
        </div>
      </section>

      <Block id="shipped" title="What NeuSix Shipped">
        <p className="max-w-[68ch] leading-relaxed">{c.shipped.intro}</p>
        <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {c.shipped.groups.map((g) => (
            <li key={g.title} className="rounded-card border border-lilac-soft p-6 sm:p-7">
              <h3 className="t-h4 !text-xl">{g.title}</h3>
              <div className="mt-4 text-sm">
                <Bullets items={g.items} />
              </div>
            </li>
          ))}
        </ul>
      </Block>

      <section aria-labelledby="harness" className="relative isolate overflow-hidden bg-ink text-paper">
        <Orbs preset="dark" dim />
        <div className="container-x flex flex-col items-center gap-8 py-[clamp(56px,7vw,104px)] text-center">
          <h2 id="harness" className="t-h2 reveal max-w-[22ch]">
            Harnessing AI to create relevance, not just competence
          </h2>
          <Button href="/contact-us" className="reveal bg-[#2b2b5a] hover:bg-lilac">
            Book a Free Consultation
          </Button>
        </div>
      </section>

      <Block id="how" title={c.howItWorks.title}>
        <StageTabs stages={c.howItWorks.stages} />
      </Block>

      <Block id="changed" title="Outcomes (What Changed)" className="bg-mist/60">
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {c.outcomes.map((o) => (
            <li key={o.title} className="rounded-card bg-paper p-6 sm:p-7">
              <h3 className="font-serif text-xl">{o.title}</h3>
              <div className="mt-4 text-sm">
                <Bullets items={o.items} />
              </div>
            </li>
          ))}
        </ul>
      </Block>

      <section aria-labelledby="measured" className="container-x grid gap-10 py-[clamp(48px,6vw,96px)] lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <h2 id="measured" className="t-h2 reveal">
            What We Measured
          </h2>
          <dl className="reveal mt-8 grid gap-6 sm:grid-cols-2">
            {c.measured.map((m) => (
              <div key={m.title} className="border-l-2 border-lilac pl-4">
                <dt className="font-semibold">{m.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed">{m.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/cs-i3.svg" alt="" loading="lazy" className="reveal mx-auto h-auto w-full max-w-[420px]" />
      </section>

      <Block id="gov" title="Governance, Trust & Reliability" className="bg-mist/60">
        <div className="max-w-[900px] space-y-5">
          {c.governance.intro && <p className="leading-relaxed">{c.governance.intro}</p>}
          <Bullets items={c.governance.items} labelled={c.slug === "airlines-aviation"} />
        </div>
      </Block>

      <RelatedCarousel items={related} />
      <CtaBand />
      <TrustStrip />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
    </article>
  );
}
