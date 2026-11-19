import { Counter } from "@/components/motion/Counter";
import { Marquee } from "@/components/motion/Marquee";

/** Stats + "talent shaped @" logo marquee (Abridge metrics/logo strip pattern). Label kept verbatim so the
 *  logos read as where the team's talent was shaped, not as a customer list. */
export function ProofStrip({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section aria-label="NeuSix at a glance" className="border-b border-ink/5">
      <div className="container-x py-[clamp(48px,6vw,88px)]">
        <dl className="stagger grid grid-cols-1 gap-8 xs:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse border-l border-ink/10 pl-5">
              <dt className="mt-2 text-sm text-slate">{s.label}</dt>
              <dd className="font-serif text-[clamp(2.75rem,2rem+3vw,4.5rem)] leading-none text-ink">
                <Counter value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
        <div className="reveal mt-[clamp(40px,5vw,72px)] grid items-center gap-6 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-12">
          <h2 className="text-sm leading-relaxed text-slate">Building NeuSix with outcome-driven talent shaped @</h2>
          <Marquee speed={36} gap="0px">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo-home.png"
              alt="Apple, Google, Microsoft, Deloitte, Datamatics, Bank of America"
              loading="lazy"
              className="h-[clamp(36px,4vw,56px)] w-auto max-w-none pr-16 opacity-80 grayscale"
            />
          </Marquee>
        </div>
      </div>
    </section>
  );
}
