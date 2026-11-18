/** Stats + "talent shaped @" logo marquee (Abridge metrics/logo strip pattern). Label kept verbatim so the
 *  logos read as where the team's talent was shaped, not as a customer list. */
export function ProofStrip({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section aria-label="NeuSix at a glance" className="border-b border-ink/5">
      <div className="container-x py-[clamp(48px,6vw,88px)]">
        <dl className="grid grid-cols-1 gap-8 xs:grid-cols-3">
          {stats.map((s, i) => (
            <div key={s.label} className="reveal flex flex-col-reverse border-l border-ink/10 pl-5" style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}>
              <dt className="mt-2 text-sm text-slate">{s.label}</dt>
              <dd className="font-serif text-[clamp(2.75rem,2rem+3vw,4.5rem)] leading-none text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
        <div className="reveal mt-[clamp(40px,5vw,72px)] grid items-center gap-6 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-12">
          <h2 className="text-sm leading-relaxed text-slate">Building NeuSix with outcome-driven talent shaped @</h2>
          <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max motion-safe:animate-marquee">
              {[0, 1].map((k) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={k}
                  src="/assets/logo-home.png"
                  alt={k ? "" : "Apple, Google, Microsoft, Deloitte, Datamatics, Bank of America"}
                  aria-hidden={k ? true : undefined}
                  loading="lazy"
                  className="h-[clamp(36px,4vw,56px)] w-auto max-w-none pr-16 opacity-80 grayscale"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
