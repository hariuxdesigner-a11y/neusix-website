import Link from "next/link";
import { SERVICES, SERVICE_CARD_ORDER } from "@/content/services";

/** "Our Services" grid used on Home and the Services hub.
 *  One responsive grid replaces the separate desktop/mobile copies on the Webflow site. */
export function ServiceCards({ title = "Our Services" }: { title?: string }) {
  const cards = SERVICE_CARD_ORDER.map((slug) => SERVICES.find((s) => s.slug === slug)!);
  return (
    <section aria-labelledby="services-title" className="section-y">
      <div className="container-x">
        <h2 id="services-title" className="t-h2 reveal text-center">
          {title}
        </h2>
        <ul className="mx-auto mt-[clamp(32px,4vw,56px)] grid max-w-[1000px] gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {cards.map((s, i) => (
            <li key={s.slug} className="reveal" style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}>
              <Link
                href={s.href}
                className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-card border border-lilac-soft bg-paper p-6 transition-colors duration-300 hover:border-navy hover:bg-navy sm:min-h-[340px]"
              >
                <h3 className="t-h4 max-w-[14ch] text-ink transition-colors group-hover:text-paper">{s.name}</h3>
                <p className="mt-4 max-w-[30ch] text-sm leading-[1.45] text-body transition-colors group-hover:text-paper/85">{s.cardText}</p>
                <div className="relative mt-auto flex items-end justify-between pt-6">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-navy transition-colors group-hover:text-paper">
                    Explore
                    <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" className="transition-transform group-hover:translate-x-1">
                      <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="relative block size-[92px] shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.cardGfx} alt="" loading="lazy" className="absolute inset-0 size-full object-contain transition-opacity duration-300 group-hover:opacity-0" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.cardGfxWhite} alt="" loading="lazy" className="absolute inset-0 size-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
