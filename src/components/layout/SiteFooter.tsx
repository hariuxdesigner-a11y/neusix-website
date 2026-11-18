import Link from "next/link";
import { FOOTER_COMPANY, LEGAL_LINKS, SERVICE_LINKS, SITE, SOCIAL } from "@/content/site";

const COLUMNS = [
  { title: "Services", links: SERVICE_LINKS },
  {
    title: "Our Work",
    links: [
      { label: "Industries", href: "/our-work/industries" },
      { label: "Case Studies", href: "/our-work/case-studies" },
    ],
  },
  { title: "Company", links: FOOTER_COMPANY },
];

/** Abridge-style footer: brand block left, link columns mirroring the navigation, slim legal bar. */
export function SiteFooter() {
  return (
    <footer className="border-t border-ink/5 bg-paper text-ink">
      <div className="container-x pb-8 pt-[clamp(56px,7vw,112px)]">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Link href="/" aria-label="NeuSix home" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/neusix-footer-logo.svg" alt="NeuSix" width={173} height={30} loading="lazy" className="h-auto w-[clamp(150px,16vw,220px)]" />
            </Link>
            <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-slate">{SITE.tagline}</p>
            <Link href="/contact-us" className="mt-8 inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-paper transition-colors hover:bg-navy">
              Book a Free Consultation
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {COLUMNS.map((c) => (
              <nav key={c.title} aria-labelledby={`ft-${c.title}`}>
                <h2 id={`ft-${c.title}`} className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
                  {c.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm transition-colors hover:text-brand">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-[clamp(48px,6vw,96px)] flex flex-col gap-5 border-t border-ink/10 pt-6 text-xs text-slate lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© 2026 NeuSix. All rights reserved.</span>
            {/* Policy pages are not published on the live site yet; shown as text until the content is supplied. */}
            {LEGAL_LINKS.map((l) => (
              <span key={l.label}>{l.label}</span>
            ))}
            <a href={SITE.credit.href} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
              {SITE.credit.label}
            </a>
          </div>
          <ul className="flex gap-2" aria-label="Social media">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`NeuSix on ${s.label}`} className="block size-9 rounded-lg transition-transform hover:-translate-y-0.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.icon} alt="" width={36} height={36} loading="lazy" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
