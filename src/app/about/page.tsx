import type { Metadata } from "next";
import Image from "next/image";
import { SectionHead, StatementBand, VideoCtaCard } from "@/components/cinematic/Bands";
import { VideoBackground } from "@/components/media/VideoBackground";
import { WordRise } from "@/components/motion/WordRise";
import { StatementFill } from "@/components/motion/StatementFill";
import { Counter } from "@/components/motion/Counter";
import { LineIcon } from "@/components/motion/LineIcon";
import { Button } from "@/components/ui/Button";
import { ArrowChip } from "@/components/ui/Icon";
import Link from "next/link";
import { ABOUT_INTRO, ABOUT_STATS, AWARDS, DNA, LEADERSHIP, MISSION, PRESENCE, SCOREBOARD, SHOW_TEAM, SPECIALISTS, VISION } from "@/content/about";

// The live page has the title "About" and no description; this uses the page's own hero copy.
const title = "About NeuSix | DeepTech AI Transformation Company";
const description =
  "We are a DeepTech AI transformation company helping enterprises discover, plan, build, and scale intelligent systems that deliver measurable business outcomes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about" },
};

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
  const dot = ["bg-orange", "bg-lilac-bright", "bg-green"];
  return (
    <>
      {/* ── Hero: NeuSix purple haze on ink ─────────────────────────────── */}
      <section aria-labelledby="about-hero" className="relative isolate overflow-hidden bg-ink text-paper">
        <div aria-hidden className="absolute -left-[10%] top-[-30%] -z-10 aspect-square w-[70%] rounded-full bg-purple/70 blur-[clamp(60px,9vw,140px)]" />
        <div aria-hidden className="absolute -right-[15%] bottom-[-40%] -z-10 aspect-square w-[60%] rounded-full bg-brand/80 blur-[clamp(60px,9vw,140px)]" />
        <picture aria-hidden className="absolute inset-x-0 bottom-0 -z-10 opacity-25">
          <source media="(min-width: 768px)" srcSet="/assets/film.png" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/film-mobile.svg" alt="" className="h-auto w-full" fetchPriority="high" />
        </picture>
        <div className="container-x flex min-h-[clamp(560px,86svh,860px)] flex-col justify-end pb-[clamp(48px,7vw,104px)] pt-[calc(var(--header-h)+64px)]">
          <h1 className="eyebrow rise flex items-center gap-3 text-paper/90">
            <span aria-hidden className="h-px w-8 bg-purple" /> About NeuSix
          </h1>
          <p id="about-hero" className="t-display mt-5 max-w-[22ch] text-balance !text-[clamp(2.1rem,1.4rem+3vw,4.25rem)] !leading-[1.08]">
            <WordRise delay={200}>We are a DeepTech AI transformation company helping enterprises discover, plan, build, and scale intelligent systems that deliver measurable business outcomes.</WordRise>
          </p>
          <div className="rise mt-10 flex flex-wrap gap-3" style={{ ["--d" as string]: "900ms" }}>
            <Button href="/contact-us" className="!bg-paper !text-ink hover:!bg-lilac-soft">
              Book a Free Consultation
            </Button>
            <Button href="/our-work/case-studies" variant="ghost-light">
              Case Studies
            </Button>
          </div>
        </div>
      </section>

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
      <section aria-labelledby="dna" className="relative isolate overflow-hidden bg-ink text-paper">
        <div aria-hidden className="absolute right-[-10%] top-[-20%] -z-10 aspect-square w-[45%] rounded-full bg-purple/30 blur-[120px]" />
        <div className="container-x section-y">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead id="dna" dark eyebrow="Our Values" title="Our DNA" text="Everything we do is guided by four principles:" />
          </div>
          <ol className="stagger mt-[clamp(36px,5vw,72px)] grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {DNA.map((d, i) => (
              <li
                key={d.title}
                className="group flex min-h-[220px] flex-col rounded-[20px] bg-white/[.05] p-7 sm:min-h-[300px] ring-1 ring-white/10 transition-[background-color,transform] duration-500 hover:-translate-y-1 hover:bg-white/[.08]"
              >
                <span className="flex items-center gap-3 text-sm text-lilac-bright">
                  <span aria-hidden className="h-px w-6 bg-lilac-bright" />
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h3 mt-auto pt-12">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/85">{d.text}</p>
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
            <h2 className="t-h2">Our leadership team — positioned for impact</h2>
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
      <section aria-labelledby="presence" className="relative isolate overflow-hidden text-paper">
        <VideoBackground id="about-global" overlay="dark" parallax={70} />
        <div className="container-x grid items-center gap-10 py-[clamp(88px,11vw,168px)] lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.3fr)] lg:gap-16">
          <div>
            <SectionHead id="presence" dark eyebrow="Where we work" title="Global Presence & Delivery Reach" />
            <ul className="stagger mt-10 divide-y divide-white/15 border-y border-white/15">
              {PRESENCE.map((p, i) => (
                <li key={p.title} className="flex gap-4 py-5">
                  <span aria-hidden className={`mt-2 size-2.5 shrink-0 rounded-full ${dot[i % dot.length]}`} />
                  <span>
                    <h3 className="text-lg font-medium">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-paper/85">{p.text}</p>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal rounded-[clamp(18px,2vw,28px)] bg-paper p-[clamp(16px,3vw,36px)] shadow-[0_40px_100px_-40px_rgba(0,0,0,.7)]">
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
