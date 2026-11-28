import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/lib/seo";
import { WordRise } from "@/components/motion/WordRise";
import { NArch } from "@/components/brand/NArch";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Shared layout for Privacy Policy, Terms of Service and Cookie Policy. */
export function LegalPage({
  path,
  title,
  updated,
  intro,
  sections,
}: {
  path: string;
  title: string;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <Breadcrumbs items={[{ name: title, path }]} />
      <div data-light-top className="below-header container-x pb-[calc(var(--section-y)/2)]">
        <header className="max-w-[860px] border-b border-ink/10 pb-[clamp(32px,4vw,56px)] pt-[clamp(48px,7vw,104px)]">
          <p className="eyebrow rise text-brand">Legal</p>
          <h1 className="t-display mt-3">
            <WordRise>{title}</WordRise>
          </h1>
          <p className="rise mt-4 text-sm text-slate" style={{ ["--d" as string]: "300ms" }}>
            Last updated: <time dateTime="2026-11-20">{updated}</time>
          </p>
          <div className="rise mt-6 max-w-[70ch] text-lg leading-relaxed text-body" style={{ ["--d" as string]: "400ms" }}>
            {intro}
          </div>
        </header>

        <div className="mt-[clamp(32px,4vw,56px)] grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-[calc(var(--header-h)+32px)]">
              <p className="eyebrow text-slate">On this page</p>
              <ol className="mt-4 space-y-1 border-l border-ink/10 text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-body transition-colors hover:border-brand hover:text-brand">
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="legal-prose max-w-[72ch]">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-[calc(var(--header-h)+24px)] border-b border-ink/[.07] py-8 first:pt-0 last:border-0">
                <h2 id={`${s.id}-h`} className="t-h4">
                  <span className="mr-2 text-brand">{i + 1}.</span>
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-body">{s.body}</div>
              </section>
            ))}
            <p className="mt-10 rounded-card bg-mist p-6 text-sm leading-relaxed text-body">
              Related: <Link href="/privacy-policy">Privacy Policy</Link> · <Link href="/terms-of-service">Terms of Service</Link> · <Link href="/cookie-policy">Cookie Policy</Link> ·{" "}
              <Link href="/contact-us">Contact us</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/** Bullet list in the legal pages' style. */
export function L({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3">
          <NArch draw={false} strokeWidth={80} className="mt-[7px] h-[11px] w-[10px] shrink-0 text-brand" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
