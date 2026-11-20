import type { Metadata } from "next";
import Image from "next/image";
import { SectionHead, StatementBand, VideoCtaCard } from "@/components/cinematic/Bands";
import { VideoHero } from "@/components/cinematic/VideoHero";
import { VideoBackground } from "@/components/media/VideoBackground";
import { WordRise } from "@/components/motion/WordRise";
import { StatementFill } from "@/components/motion/StatementFill";
import { Counter } from "@/components/motion/Counter";
import { LineIcon } from "@/components/motion/LineIcon";
import { Button } from "@/components/ui/Button";
import { ArrowChip } from "@/components/ui/Icon";
import Link from "next/link";
import { ABOUT_INTRO, ABOUT_STATS, AWARDS, DNA, LEADERSHIP, MISSION, PRESENCE, SCOREBOARD, SHOW_TEAM, SPECIALISTS, VISION } from "@/content/about";
import { Breadcrumbs, pageMetadata } from "@/lib/seo";

// The live page has the title "About" and no description; this uses the page's own hero copy.
export const metadata: Metadata = pageMetadata("/about");

function People({ people }: { people: typeof LEADERSHIP }) {
  return (
    <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {people.map((p) => (
        <li key={p.name}>
          <Image src={p.img} alt={p.name} width={400} height={480} sizes="(min-width:1280px) 220px, (min-width:640px) 30vw, 45vw" className="aspect-[5/6] h-auto w-full rounded-card bg-mist object-cover" />
          <p className="mt-3 font-medium leading-snug">{p.name}</p>
          <p className="text-sm text-slate">{p.title}</p>
        </li>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  const stats = [...ABOUT_STATS, ...SCOREBOARD.filter((s) => !ABOUT_STATS.some((a) => a.value === s.value)).map((s) => ({ value: s.value, label: s.label === "Squad size" ? "Squad Size" : s.label }))];
  const dot = ["bg-orange", "bg-brand", "bg-green"];
  return (
    <>
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
      <VideoHero
        media="about-global"
        size="tall"
        compact
        eyebrow="About NeuSix"
        title="We are a DeepTech AI transformation company helping enterprises discover, plan, build, and scale intelligent systems that deliver measurable business outcomes."
        primary={{ label: "Book a Free Consultation", href: "/contact-us" }}
        secondary={{ label: "Case Studies", href: "/our-work/case-studies" }}
      />

      {/* ── Conviction ─────────────────────────────────────────────────── */}
      <section aria-labelledby="conviction" className="container-x pt-[var(--section-y)]">
        <p id="conviction" className="eyebrow reveal text-brand">
          Our Conviction
        </p>
        <StatementFill as="p" text={ABOUT_INTRO[0]} className="mt-6 max-w-[32ch] font-serif text-[clamp(1.6rem,1.1rem+2vw,3rem)] leading-[1.18] text-ink" />
      </section>

      {/* ── Stats highlight ─────────────────────────────────────────────── */}
      <section aria-labelledby="about-outcomes" className="container-x section-y">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-20">
          <div className="stagger lg:sticky lg:top-[calc(var(--header-h)+40px)] lg:self-start">
            <p className="eyebrow text-brand">NeuSix Scoreboard</p>
            <h2 id="about-outcomes" className="t-h2 mt-3">
              Typical outcomes
            </h2>
            {ABOUT_INTRO.slice(1).map((p) => (
              <p key={p} className="mt-5 max-w-[56ch] leading-relaxed text-body">
                {p}
              </p>
            ))}
            <div className="mt-8">
              <Button href="/our-work/case-studies" variant="dark">
                Case Studies
              </Button>
            </div>
          </div>
          <div className="stagger grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <dl key={s.label} className="flex min-h-[150px] flex-col-reverse justify-between rounded-[20px] bg-mist p-5 ring-1 ring-ink/[.04] sm:min-h-[170px] sm:p-7">
                <dt className="mt-5 max-w-[26ch] text-[13px] leading-snug text-body sm:text-sm">{s.label}</dt>
                <dd className="font-serif text-[clamp(2.2rem,1.6rem+2.4vw,4rem)] leading-none text-navy">
                  <Counter value={s.value} />
                </dd>
              </dl>
            ))}
            <Link href="/our-work/case-studies" className="group flex min-h-[150px] flex-col justify-between rounded-[20px] bg-ink p-5 text-paper sm:min-h-[170px] sm:p-7">
              <span className="eyebrow text-lilac-bright">Shipping Impact</span>
              <span className="flex items-end justify-between gap-4">
                <span className="max-w-[14ch] font-serif text-[clamp(1rem,.9rem+.6vw,1.375rem)] leading-snug">See the outcomes in our case studies</span>
                <ArrowChip tone="dark" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Our DNA (values) ────────────────────────────────────────────── */}
      <section aria-labelledby="dna" className="bg-mist/70">
        <div className="container-x section-y">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead id="dna" eyebrow="Our Values" title="Our DNA" text="Everything we do is guided by four principles:" />
          </div>
          <ol className="stagger mt-[clamp(36px,5vw,72px)] grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {DNA.map((d, i) => (
              <li
                key={d.title}
                className="group flex min-h-[220px] flex-col rounded-[20px] bg-paper p-7 ring-1 ring-ink/[.05] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(49,49,104,.45)] sm:min-h-[300px]"
              >
                <span className="flex items-center gap-3 text-sm text-brand">
                  <span aria-hidden className="h-px w-6 bg-brand" />
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h3 mt-auto pt-12">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{d.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Vision & mission ────────────────────────────────────────────── */}
      <section aria-label="Vision and mission" className="container-x section-y">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.3fr)] lg:gap-16">
          <div className="hidden lg:block">
            <LineIcon src="/assets/v-m-lines.svg" stroke={1.6} mono className="mx-auto block aspect-[503/309] w-full max-w-[520px] text-brand" />
          </div>
          <div className="stagger grid gap-3 md:grid-cols-2 lg:grid-cols-1">
            {[
              { k: "Vision", t: VISION },
              { k: "Mission", t: MISSION },
            ].map((v) => (
              <div key={v.k} className="rounded-[20px] bg-mist p-7 sm:p-9">
                <h2 className="eyebrow text-brand">{v.k}</h2>
                <p className="mt-4 font-serif text-[clamp(1.2rem,1rem+.8vw,1.6rem)] leading-snug text-ink">{v.t}</p>
              </div>
            ))}
          </div>
        </div>
        {SHOW_TEAM && (
          <div className="mt-[var(--section-y)]">
            <h2 className="t-h2">Our leadership team: positioned for impact</h2>
            <People people={LEADERSHIP} />
            <h2 className="t-h2 mt-16">Architects, Engineers &amp; Specialists</h2>
            <People people={SPECIALISTS} />
          </div>
        )}
      </section>

      <StatementBand
        media="about-careers"
        id="join"
        align="split"
        title="Build What Matters. Join NeuSix."
        ctas={[{ label: "Get in touch", href: "/contact-us" }]}
      >
        We’re a team of engineers, architects, data scientists, and strategists who believe AI should deliver real business outcomes. If you’re passionate about shipping impact and working at the
        frontier of AI transformation, we’d love to hear from you.
      </StatementBand>

      {/* ── Awards ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="awards" className="container-x section-y">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
          <div className="stagger lg:sticky lg:top-[calc(var(--header-h)+40px)] lg:self-start">
            <p className="eyebrow text-brand">Recognition</p>
            <h2 id="awards" className="t-h2 mt-3">
              Awards &amp; Recognition
            </h2>
          </div>
          <ul className="stagger grid gap-4 sm:grid-cols-2">
            {AWARDS.map((a) => (
              <li key={a.text} className="group overflow-hidden rounded-[20px] bg-mist ring-1 ring-ink/[.04]">
                <div className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.img.replace(/\.svg$/, ".webp")}
                    alt=""
                    loading="lazy"
                    width={566}
                    height={502}
                    className="aspect-[283/251] h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-start gap-3 p-6">
                  <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-orange" />
                  <p className="font-medium leading-snug text-ink">{a.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Global presence ─────────────────────────────────────────────── */}
      <section aria-labelledby="presence" className="bg-mist/70">
        <div className="container-x section-y grid items-center gap-10 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.3fr)] lg:gap-16">
          <div>
            <SectionHead id="presence" eyebrow="Where we work" title="Global Presence & Delivery Reach" />
            <ul className="stagger mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {PRESENCE.map((p, i) => (
                <li key={p.title} className="flex gap-4 py-5">
                  <span aria-hidden className={`mt-2 size-2.5 shrink-0 rounded-full ${dot[i % dot.length]}`} />
                  <span>
                    <h3 className="text-lg font-medium">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-body">{p.text}</p>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal rounded-[clamp(18px,2vw,28px)] bg-paper p-[clamp(16px,3vw,36px)] ring-1 ring-ink/[.05]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/world-1.svg"
              alt="World map showing the delivery hub in India and client locations in the USA, UK, UAE and Australia/New Zealand"
              loading="lazy"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <VideoCtaCard
        title="Ready to Transform Your Enterprise with AI?"
        body="Let’s start with a conversation about where AI can create the most impact for your business."
        primary={{ label: "Schedule a Discovery Call", href: "/contact-us" }}
        note=""
      />
    </>
  );
}
