import Link from "next/link";
import { FOOTER_COMPANY, LEGAL_LINKS, SERVICE_LINKS, SITE, SOCIAL } from "@/content/site";
import { Orbs } from "@/components/ui/Orbs";

export function SiteFooter() {
  const year = 2026; // matches the live site's copyright line
  return (
    <footer className="relative isolate overflow-hidden bg-mist/60">
      <Orbs preset="footer" dim />
      <div className="container-x pb-8 pt-[clamp(48px,6vw,80px)]">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_0.7fr] md:gap-8">
          <div className="max-w-[300px]">
            <Link href="/" aria-label="NeuSix home" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/neusix-footer-logo.svg" alt="NeuSix" width={173} height={30} loading="lazy" className="h-auto w-[140px] sm:w-[173px]" />
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-ink">{SITE.tagline}</p>
            <ul className="mt-6 flex gap-3" aria-label="Social media">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`NeuSix on ${s.label}`}
                    className="block size-10 rounded-lg transition-transform hover:-translate-y-0.5"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.icon} alt="" width={40} height={40} loading="lazy" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="ft-services">
            <h2 id="ft-services" className="font-serif text-base font-semibold text-ink">
              Services
            </h2>
            <ul className="mt-4 space-y-3">
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink transition-colors hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="ft-company">
            <h2 id="ft-company" className="font-serif text-base font-semibold text-ink">
              Company
            </h2>
            <ul className="mt-4 space-y-3">
              {FOOTER_COMPANY.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink transition-colors hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink/15 pt-6 text-xs text-ink lg:flex-row lg:items-center lg:justify-between">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>© {year} NeuSix. All rights reserved.</span>
            <span aria-hidden className="hidden t-h4 w-px bg-ink/30 sm:block" />
            <a href={SITE.credit.href} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
              {SITE.credit.label}
            </a>
          </p>
          {/* Policy pages are not published on the live site yet; shown as text until the content is supplied. */}
          <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Legal">
            {LEGAL_LINKS.map((l) => (
              <li key={l.label}>{l.label}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
