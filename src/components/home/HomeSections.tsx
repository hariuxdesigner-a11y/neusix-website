import { Button } from "@/components/ui/Button";
import { Orbs } from "@/components/ui/Orbs";

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[clamp(420px,70svh,640px)] lg:min-h-[clamp(560px,calc(100svh-var(--header-h)),940px)] items-center overflow-hidden">
      <Orbs preset="hero" />
      <div className="container-x py-24">
        <p className="eyebrow text-ink">Shipping Impact</p>
        <h1 id="hero-title" className="t-display mt-3 max-w-[13ch] text-ink" style={{ ["--reveal-delay" as string]: "80ms" }}>
          Harnessing AI to create relevance, not just competence
        </h1>
      </div>
    </section>
  );
}

export function PurposeBuilt() {
  return (
    <section aria-labelledby="purpose-title" className="relative isolate overflow-hidden bg-ink text-paper">
      <Orbs preset="dark" dim />
      <div className="container-x py-[clamp(80px,10vw,160px)]">
        <h2 id="purpose-title" className="t-display reveal mx-auto max-w-[17ch] text-center">
          Purpose-built AI transformation. Measurable outcomes
        </h2>
        <div className="reveal mt-[clamp(32px,4vw,56px)] flex flex-col gap-8 md:ml-auto md:w-[min(100%,560px)] lg:mr-[6%]">
          <p className="text-sm leading-relaxed text-paper/90 sm:text-base">
            NeuSix helps organizations move beyond competence to true relevance by modernizing systems, redesigning how work gets done, and deploying production-grade AI that delivers real
            operational and business impact.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/services/services-neusix" className="bg-[#2b2b5a] hover:bg-lilac">
              Explore Services
            </Button>
            <Button href="/contact-us" className="bg-[#2b2b5a] hover:bg-lilac">
              Book a Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { value: "10+", label: "engagements delivered" },
  { value: "98%", label: "client satisfaction" },
  { value: "15+", label: "years applied experience" },
];

export function OptimizeFor() {
  return (
    <section aria-label="NeuSix at a glance" className="relative isolate overflow-hidden py-[clamp(64px,8vw,128px)]">
      {/* network line art (original asset), stretched to the viewport width */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/line-02-new.svg" alt="" aria-hidden loading="lazy" className="pointer-events-none absolute left-0 top-[clamp(48px,6vw,96px)] -z-10 h-[clamp(200px,27vw,420px)] w-full object-fill opacity-90" />
      <div className="container-x">
        <div className="reveal relative mx-auto w-fit max-w-full">
          <p className="bg-ink px-[clamp(20px,2.4vw,32px)] py-[clamp(16px,2vw,24px)] text-center font-serif text-[clamp(1.25rem,0.95rem+1.3vw,2rem)] leading-[1.25] text-paper">
            <em>We optimize for:</em> Impact, Value,
            <br className="hidden sm:block" /> Transparency, and ROI.
          </p>
          <span aria-hidden className="absolute -bottom-[clamp(28px,3vw,40px)] left-1/2 h-[clamp(28px,3vw,40px)] w-[34%] -translate-x-1/2 bg-ink" />
        </div>
        <dl className="mx-auto mt-[clamp(96px,14vw,200px)] grid max-w-[960px] gap-10 text-center sm:grid-cols-3">
          {STATS.map((s, i) => (
            <div key={s.label} className="reveal flex flex-col-reverse items-center" style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}>
              <dt className="mt-2 text-sm text-ink">{s.label}</dt>
              <dd className="font-serif text-[clamp(2.5rem,1.8rem+2.8vw,4rem)] leading-none text-navy">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
