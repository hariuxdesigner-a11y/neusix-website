import type { Outcome } from "@/content/services";
import { LottieOnView } from "@/components/ui/LottieOnView";

/** "Typical outcomes": label · animated dial (Lottie, contains the figure) · supporting text. */
export function TypicalOutcomes({ items, title = "Typical outcomes" }: { items: Outcome[]; title?: string }) {
  return (
    <section aria-labelledby="outcomes-title" className="section-y">
      <div className="container-x">
        <h2 id="outcomes-title" className="t-h2 reveal text-center">
          {title}
        </h2>
        <ul className="mx-auto mt-[clamp(32px,4vw,64px)] max-w-[1000px]">
          {items.map((o) => (
            <li
              key={o.label}
              className="reveal grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 border-b border-lilac/60 py-8 md:grid-cols-[minmax(0,240px)_160px_minmax(0,1fr)] md:gap-x-10 md:py-10"
            >
              <h3 className="text-base font-semibold leading-snug text-lilac md:text-lg">
                {o.label}
                {o.value && <span className="sr-only"> {o.value}</span>}
              </h3>
              <div className="relative row-span-2 size-[112px] justify-self-end md:row-span-1 md:size-[150px] md:justify-self-center">
                <LottieOnView src={o.lottie} className="size-full" />
                {o.value && (
                  <span aria-hidden className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-paper/90 px-1.5 font-serif text-[clamp(1rem,0.8rem+0.8vw,1.35rem)] leading-none text-navy">{o.value}</span>
                  </span>
                )}
              </div>
              <p className="max-w-[46ch] text-sm leading-relaxed text-ink md:text-base">{o.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
