import type { Metadata } from "next";
import Image from "next/image";
import { SectionHead, StatementBand, VideoCtaCard } from "@/components/cinematic/Bands";
import { VideoBackground } from "@/components/media/VideoBackground";
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
  return (
    <>
      {/* Hero: purple haze (original film.png on wide screens, film-mobile.svg on phones) */}
      <section aria-labelledby="about-hero" className="relative isolate overflow-hidden text-paper">
        {/* purple haze: #995BA5 panel blurred 80px (as on the live site) + the original film-strip overlay */}
        <div aria-hidden className="absolute inset-x-0 top-0 -z-20 h-full rounded-[200px] bg-purple blur-[clamp(40px,6vw,80px)]" />
        <picture className="absolute inset-0 -z-10">
          <source media="(min-width: 768px)" srcSet="/assets/film.png" />
          { }
          <img src="/assets/film-mobile.svg" alt="" className="size-full object-cover opacity-70" fetchPriority="high" />
        </picture>
        <div className="container-x flex min-h-[clamp(520px,72svh,720px)] flex-col justify-end pb-[clamp(48px,7vw,96px)] pt-[calc(var(--header-h)+64px)]">
          <h1 className="eyebrow text-paper/85">About NeuSix</h1>
          <p id="about-hero" className="t-display mt-4 max-w-[24ch] !text-[clamp(1.9rem,1.3rem+2.6vw,3.6rem)] !leading-[1.12]" style={{ ["--reveal-delay" as string]: "80ms" }}>
            We are a DeepTech AI transformation company helping enterprises discover, plan, build, and scale intelligent systems that deliver measurable business outcomes.
          </p>
        </div>
      </section>

      <section aria-labelledby="about-outcomes" className="container-x section-y">
        <h2 id="about-outcomes" className="t-h2 reveal">
          Typical outcomes
        </h2>
        <div className="mt-[clamp(28px,4vw,56px)] grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div className="reveal max-w-[60ch] space-y-6 leading-relaxed">
            {ABOUT_INTRO.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="reveal relative isolate grid gap-8 overflow-hidden rounded-card bg-mist/60 p-8 sm:grid-cols-2 lg:grid-cols-1 lg:p-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/typical-outcomes.png" alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-10 size-full object-cover opacity-60" />
            {ABOUT_STATS.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-2 max-w-[28ch] text-sm">{s.label}</dt>
                <dd className="font-serif text-[clamp(2.5rem,2rem+2vw,3.5rem)] leading-none text-navy">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="dna" className="relative isolate overflow-hidden bg-mist/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/our-dna-bg.png" alt="" aria-hidden loading="lazy" className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-70" />
        <div className="container-x section-y text-center">
          <h2 id="dna" className="t-h2 reveal">
            Our DNA
          </h2>
          <p className="reveal mt-2">Everything we do is guided by four principles:</p>
          <ul className="mx-auto mt-[clamp(28px,4vw,56px)] max-w-[900px] space-y-8">
            {DNA.map((d) => (
              <li key={d.title} className="reveal">
                <h3 className="t-display !text-[clamp(2rem,1.4rem+2.6vw,3.5rem)]">{d.title}</h3>
                <p className="mx-auto mt-2 max-w-[56ch] text-sm leading-relaxed sm:text-base">{d.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Vision and mission" className="container-x section-y">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/v-m-lines.svg" alt="" aria-hidden loading="lazy" className="reveal hidden h-auto w-full max-w-[460px] lg:block" />
          <div className="grid gap-12">
            <div className="reveal">
              <h2 className="t-h3">Vision</h2>
              <p className="mt-3 max-w-[56ch] leading-relaxed">{VISION}</p>
            </div>
            <div className="reveal">
              <h2 className="t-h3">Mission</h2>
              <p className="mt-3 max-w-[56ch] leading-relaxed">{MISSION}</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="score" className="container-x pb-[var(--section-y)] text-center">
        <h2 id="score" className="t-h2 reveal">
          NeuSix scoreboard
        </h2>
        <dl className="reveal mx-auto mt-8 grid max-w-[720px] grid-cols-2 gap-8 sm:grid-cols-4">
          {SCOREBOARD.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm">{s.label}</dt>
              <dd className="font-serif text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-none">{s.value}</dd>
            </div>
          ))}
        </dl>
        {SHOW_TEAM && (
          <div className="mt-[var(--section-y)] text-left">
            <h2 className="t-h2">Our leadership team — positioned for impact</h2>
            <People people={LEADERSHIP} />
            <h2 className="t-h2 mt-16">Architects, Engineers &amp; Specialists</h2>
            <People people={SPECIALISTS} />
          </div>
        )}
      </section>

      <picture className="block">
        <source media="(min-width: 640px)" srcSet="/assets/team-base.png" />
        { }
        <img src="/assets/team-base-69d8e8.png" alt="" aria-hidden loading="lazy" className="h-auto w-full" />
      </picture>

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

      <section aria-labelledby="awards" className="bg-mist/60">
        <div className="container-x section-y">
          <h2 id="awards" className="t-h2 reveal text-center">
            Awards &amp; Recognition
          </h2>
          <ul className="mx-auto mt-[clamp(28px,4vw,56px)] grid max-w-[1000px] gap-6 md:grid-cols-2">
            {AWARDS.map((a) => (
              <li key={a.text} className="reveal overflow-hidden rounded-card bg-paper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.img} alt="" loading="lazy" width={283} height={251} className="aspect-[283/251] h-auto w-full object-cover" />
                <p className="p-6 font-medium leading-snug">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="presence" className="relative isolate overflow-hidden text-paper">
        <VideoBackground id="about-global" overlay="dark" />
        <div className="container-x py-[clamp(88px,11vw,168px)]">
          <SectionHead id="presence" dark title="Global Presence & Delivery Reach" />
          <ul className="mt-10 grid gap-8 sm:grid-cols-3">
            {PRESENCE.map((p) => (
              <li key={p.title} className="reveal border-t border-white/20 pt-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.icon} alt="" width={20} height={20} className="size-5" />
                <h3 className="t-h4 mt-4">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/80">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="container-x py-[clamp(40px,5vw,80px)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/world-1.svg"
          alt="World map showing the delivery hub in India and client locations in the USA, UK, UAE and Australia/New Zealand"
          loading="lazy"
          className="reveal mx-auto h-auto w-full max-w-[1100px]"
        />
      </div>

      <VideoCtaCard
        title="Ready to Transform Your Enterprise with AI?"
        body="Let’s start with a conversation about where AI can create the most impact for your business."
        primary={{ label: "Schedule a Discovery Call", href: "/contact-us" }}
        note=""
      />
    </>
  );
}
