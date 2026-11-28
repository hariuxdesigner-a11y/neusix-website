import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment, type ReactNode } from "react";
import { CASE_STUDIES, getCaseStudy } from "@/content/case-studies";
import { LineIcon } from "@/components/motion/LineIcon";
import { RelatedCarousel, StageTabs } from "@/components/case-studies/CaseInteractive";
import { VideoHero } from "@/components/cinematic/VideoHero";
import { VideoCtaCard } from "@/components/cinematic/Bands";
import type { MediaId } from "@/content/media";
import { Button } from "@/components/ui/Button";
import { Orbs } from "@/components/ui/Orbs";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumbs, pageMetadata } from "@/lib/seo";
import { SEO } from "@/content/seo";
import { SITE, SITE_URL } from "@/content/site";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return pageMetadata(`/case-studies/${c.slug}`, { type: "article" });
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
    <ul className="stagger space-y-3">
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
    <section aria-labelledby={id} className={`${className} ${/\bbg-/.test(className) ? "section-box" : ""}`}>
      <div className={`container-x ${/\bbg-/.test(className) ? "section-pad" : "section-y"}`}>
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
  const idx = CASE_STUDIES.findIndex((x) => x.slug === c.slug);
  const prev = CASE_STUDIES[(idx - 1 + CASE_STUDIES.length) % CASE_STUDIES.length];
  const next = CASE_STUDIES[(idx + 1) % CASE_STUDIES.length];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: SEO[`/case-studies/${c.slug}`]?.description,
    about: c.industry,
    image: `${SITE_URL}/og/cs-${c.slug}.jpg`,
    mainEntityOfPage: `${SITE_URL}/case-studies/${c.slug}`,
    author: { "@type": "Organization", name: SITE.name, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/ssi.png` } },
  };

  return (
    <article className="flex flex-col">
      <Breadcrumbs items={[{ name: "Case Studies", path: "/our-work/case-studies" }, { name: c.title, path: `/case-studies/${c.slug}` }]} />
      <VideoHero
        media={`cs-${c.slug}` as MediaId}
        size="tall"
        compact
        eyebrow={`Case Study | ${c.industry}`}
        title={c.title}
        text={
          <>
            <strong className="font-semibold">Shipping Impact:</strong> {c.impact}
          </>
        }
      >
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Capabilities">
          {c.tags.map((t) => (
            <li key={t} className="rounded-full bg-paper/75 px-3.5 py-1.5 text-xs font-medium text-ink ring-1 ring-ink/10 backdrop-blur">
              {t}
            </li>
          ))}
        </ul>
        <Link href="/our-work/case-studies" className="mt-6 inline-flex min-h-6 items-center text-sm font-medium text-navy hover:text-brand">
          <span className="inline-flex items-center gap-2"><Icon name="arrow-left" size={16} /> All case studies</span>
        </Link>
      </VideoHero>

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

      <section aria-labelledby="oh" className="section-box bg-mist/70">
        <div className="container-x section-pad grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow reveal text-brand">Results</p>
            <h2 id="oh" className="t-h2 reveal mt-3">
              Outcome Highlights
            </h2>
            <div className="reveal mt-8">
              <Bullets items={c.outcomeHighlights} />
            </div>
          </div>
          <LineIcon src="/assets/outcome-banner.svg" mono stroke={1.4} className="mx-auto aspect-[445/446] w-full max-w-[460px] text-brand" />
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

      <section aria-labelledby="chal" className="section-box bg-mist/60">
        <div className="container-x section-pad grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
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
          <LineIcon src="/assets/cs-i2-3.svg" className="mx-auto aspect-square w-full max-w-[420px]" />
        </div>
      </section>

      <Block id="shipped" title="What NeuSix Shipped">
        <p className="max-w-[68ch] leading-relaxed">{c.shipped.intro}</p>
        <ul className="stagger mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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

      <section aria-labelledby="harness" className="container-x section-y">
        <div className="reveal relative isolate flex flex-col items-center gap-8 overflow-hidden rounded-[clamp(20px,2.4vw,32px)] bg-ink px-6 py-[clamp(48px,6vw,88px)] text-center text-paper">
          <Orbs preset="dark" dim />
          <h2 id="harness" className="t-h2 max-w-[22ch]">
            Harnessing AI to create relevance, not just competence
          </h2>
          <Button href="/contact-us" className="!bg-paper !text-ink hover:!bg-lilac-soft">
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

      <section aria-labelledby="measured" className="container-x section-y grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <h2 id="measured" className="t-h2 reveal">
            What We Measured
          </h2>
          <dl className="stagger mt-8 grid gap-6 sm:grid-cols-2">
            {c.measured.map((m) => (
              <div key={m.title} className="border-l-2 border-lilac pl-4">
                <dt className="font-semibold">{m.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed">{m.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <LineIcon src="/assets/cs-i3.svg" className="mx-auto aspect-[445/300] w-full max-w-[420px]" />
      </section>

      <Block id="gov" title="Governance, Trust & Reliability" className="bg-mist/60">
        <div className="max-w-[900px] space-y-5">
          {c.governance.intro && <p className="leading-relaxed">{c.governance.intro}</p>}
          <Bullets items={c.governance.items} labelled={c.slug === "airlines-aviation"} />
        </div>
      </Block>

      <nav aria-label="More case studies" className="section-box border-y border-ink/5">
        <div className="container-x grid divide-y divide-ink/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {[
            { c: prev, dir: "Previous case study", align: "sm:pr-8" },
            { c: next, dir: "Next case study", align: "sm:pl-8 sm:text-right" },
          ].map(({ c: x, dir, align }) => (
            <Link key={dir} href={`/case-studies/${x.slug}`} className={`group block py-8 ${align}`}>
              <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                <span className={`inline-flex items-center gap-2 ${dir === "Next case study" ? "sm:flex-row-reverse" : ""}`}>
                  <Icon name={dir === "Previous case study" ? "arrow-left" : "arrow-right"} size={14} />
                  {dir}
                </span>
              </span>
              <span className="t-h4 mt-2 block transition-colors group-hover:text-brand">{x.title}</span>
              <span className="mt-1 block text-sm text-slate">{x.industry}</span>
            </Link>
          ))}
        </div>
      </nav>

      <RelatedCarousel items={related} />
      <VideoCtaCard />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
    </article>
  );
}
