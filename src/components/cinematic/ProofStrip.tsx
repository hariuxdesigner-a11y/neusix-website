import { Counter } from "@/components/motion/Counter";
import { Marquee } from "@/components/motion/Marquee";

/* Logos cut from the original strip artwork. `scale` evens out visual weight (wide wordmarks sit lower),
   based on each logo's aspect ratio: height ∝ 1/√(width/height). */
const TALENT = [
  { name: "Apple", file: "apple", w: 281 },
  { name: "Google", file: "google", w: 290 },
  { name: "Microsoft", file: "microsoft", w: 451 },
  { name: "Deloitte", file: "deloitte", w: 502 },
  { name: "Datamatics", file: "datamatics", w: 822 },
  { name: "Bank of America", file: "bank-of-america", w: 945 },
].map((l) => ({ ...l, scale: Math.max(0.58, Math.min(1, Math.sqrt(2.95 / (l.w / 96)))).toFixed(3) }));

/** Stats + "talent shaped @" logo marquee (Abridge metrics/logo strip pattern). Label kept verbatim so the
 *  logos read as where the team's talent was shaped, not as a customer list. */
export function ProofStrip({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section aria-label="NeuSix at a glance" className="border-b border-ink/5">
      <div className="container-x section-y">
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
        <div className="mt-[clamp(40px,5vw,72px)] grid items-center gap-6 border-t border-ink/[.07] pt-[clamp(28px,3vw,40px)] lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-12">
          <h2 className="reveal text-sm leading-snug text-slate">
            <span className="eyebrow block text-brand">Our Talent</span>
            <span className="mt-1.5 block font-serif text-lg text-ink">Building NeuSix with outcome-driven talent shaped @</span>
          </h2>
          <Marquee speed={34} gap="clamp(44px,5.5vw,88px)">
            {TALENT.map((l) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={l.name}
                src={`/assets/talent/${l.file}.webp`}
                alt={l.name}
                width={l.w}
                height={96}
                loading="lazy"
                draggable={false}
                className="w-auto max-w-none shrink-0 select-none opacity-70 transition duration-300 [filter:grayscale(1)_brightness(0)] hover:opacity-100 hover:[filter:none]"
                style={{ height: `calc(${l.scale} * clamp(26px, 2.6vw, 38px))` }}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
