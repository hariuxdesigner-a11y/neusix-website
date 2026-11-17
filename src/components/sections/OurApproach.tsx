import { APPROACH_DEFAULT, type Phase } from "@/content/services";

type Item = { name: string; text: string; icon: string; outputs?: string };

/** "Our Approach / The NeuSix Execution System" (default) or the per-service
 *  "How We Ship Impact From Discovery to Scale" variant with typical outputs. */
export function OurApproach({
  title = "Our Approach",
  subtitle = "The NeuSix Execution System",
  phases,
  icons,
  note,
  dark = false,
}: {
  title?: string;
  subtitle?: string;
  phases?: Phase[];
  icons?: string[];
  note?: string;
  dark?: boolean;
}) {
  const items: Item[] = phases
    ? phases.map((p, i) => ({ name: p.name, text: p.text, outputs: p.outputs, icon: icons?.[i] ?? APPROACH_DEFAULT[i].icon }))
    : APPROACH_DEFAULT;
  return (
    <section aria-labelledby="approach-title" className={`section-y ${dark ? "bg-ink text-paper" : ""}`}>
      <div className="container-x">
        <div className="reveal mx-auto max-w-[640px] text-center">
          <h2 id="approach-title" className="t-h2">
            {title}
          </h2>
          <p className="mt-2 text-sm sm:text-base">{subtitle}</p>
        </div>
        <ol className="mt-[clamp(40px,5vw,72px)] grid grid-cols-1 gap-x-6 gap-y-12 xs:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <li key={it.name} className="reveal flex flex-col items-center text-center" style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.icon} alt="" loading="lazy" width={203} height={185} className="h-auto w-[clamp(120px,12vw,170px)]" />
              <h3 className="t-h4 mt-3">{it.name}</h3>
              <p className="mt-3 max-w-[26ch] text-sm leading-[1.45] opacity-90">{it.text}</p>
              {it.outputs && (
                <>
                  <p className="mt-4 font-serif text-[15px] font-semibold">Typical outcomes:</p>
                  <p className="mt-1 max-w-[26ch] text-sm leading-[1.45] opacity-90">{it.outputs}</p>
                </>
              )}
            </li>
          ))}
        </ol>
        {note && (
          <div className="reveal mt-[clamp(40px,5vw,64px)] flex flex-col items-center text-center">
            <span aria-hidden className="mb-4 h-px w-16" style={{ background: "var(--accent, var(--color-lilac))" }} />
            <p className="max-w-[46ch] text-sm">{note}</p>
          </div>
        )}
      </div>
    </section>
  );
}
