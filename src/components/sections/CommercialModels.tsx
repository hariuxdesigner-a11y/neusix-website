import { LineIcon } from "@/components/motion/LineIcon";
import { COMMERCIAL_MODELS, COMMERCIAL_NOTE } from "@/content/services";

export function CommercialModels() {
  return (
    <section aria-labelledby="models-title" className="section-y">
      <div className="container-x">
        <h2 id="models-title" className="t-h2 reveal text-center">
          Commercial Models
        </h2>
        <ul className="stagger mx-auto mt-[clamp(32px,4vw,56px)] grid max-w-[1100px] gap-4 md:grid-cols-3 md:gap-5">
          {COMMERCIAL_MODELS.map((m, i) => (
            <li
              key={m.title}
              className="group flex flex-col rounded-card border border-lilac-soft bg-paper p-7 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-navy hover:shadow-[0_16px_40px_-20px_rgba(49,49,104,.45)]"
            >
              <LineIcon src={m.gfx} delay={200 + i * 160} className="h-[64px] w-[76px] self-start" />
              <h3 className="t-h4 mt-8">{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-body">{m.text}</p>
            </li>
          ))}
        </ul>
        <p className="reveal mx-auto mt-8 max-w-[60ch] text-center text-sm text-ink">{COMMERCIAL_NOTE}</p>
      </div>
    </section>
  );
}
