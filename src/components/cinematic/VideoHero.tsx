import Link from "next/link";
import type { ReactNode } from "react";
import type { MediaId } from "@/content/media";
import { VideoBackground } from "@/components/media/VideoBackground";
import { Button } from "@/components/ui/Button";
import { WordRise } from "@/components/motion/WordRise";
import { LinkArrow } from "@/components/ui/Icon";

type Cta = { label: string; href: string };

/**
 * Page banner: rounded inset frame of footage in the site-wide light lilac tone (as the home
 * banner), dark copy anchored bottom-left, two CTAs, optional "pill" card bottom-right.
 */
export function VideoHero({
  media,
  eyebrow,
  title,
  text,
  primary,
  secondary,
  pill,
  size = "full",
  accent,
  compact = false,
  grade,
  overlayArt,
  children,
}: {
  media: MediaId;
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  primary?: Cta;
  secondary?: Cta;
  pill?: { label: string; title: string; href: string };
  size?: "full" | "tall";
  accent?: string;
  /** smaller headline for long titles (case studies) */
  compact?: boolean;
  /** colour grade for the footage */
  grade?: "none" | "duotone" | "light";
  /** decorative layer drawn over the footage, under the copy */
  overlayArt?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" data-light-top="glass" className="px-[clamp(8px,.9vw,14px)] pt-[clamp(8px,.9vw,14px)]">
      <div
        className={`relative isolate flex flex-col justify-end overflow-hidden rounded-[clamp(18px,2vw,30px)] bg-lilac-soft text-ink ${
          size === "full" ? "min-h-[clamp(560px,calc(100svh-14px),1080px)]" : "min-h-[clamp(520px,82svh,860px)]"
        }`}
      >
        <VideoBackground id={media} overlay="hero" priority parallax={60} grade={grade === "duotone" ? "light" : (grade ?? "light")} />
        {/* light veil under the floating header */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-[4] h-[150px] bg-gradient-to-b from-paper/85 via-paper/40 to-transparent" />
        {overlayArt}
        <div className="container-x relative grid gap-10 pb-[clamp(40px,6vw,88px)] pt-[calc(var(--header-h)+48px)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-[880px]">
            {eyebrow && (
              <p className="eyebrow rise flex items-center gap-3 font-semibold text-ink">
                <span aria-hidden className="h-px w-8 bg-navy/50" style={accent ? { background: accent } : undefined} />
                {eyebrow}
              </p>
            )}
            <h1 id="page-title" className={`t-display mt-4 text-balance text-ink ${compact ? "max-w-[24ch] !text-[clamp(2rem,1.4rem+2.6vw,3.75rem)]" : "max-w-[18ch]"}`}>
              <WordRise>{title}</WordRise>
            </h1>
            {text && (
              <div className="rise mt-6 max-w-[56ch] text-base font-medium leading-relaxed text-ink/85 sm:text-lg" style={{ ["--d" as string]: "450ms" }}>
                {text}
              </div>
            )}
            {(primary || secondary) && (
              <div className="rise mt-8 flex flex-wrap gap-3" style={{ ["--d" as string]: "600ms" }}>
                {primary && (
                  <Button href={primary.href} variant="dark">
                    {primary.label}
                  </Button>
                )}
                {secondary && (
                  <Button href={secondary.href} variant="light" className="!bg-paper/80 backdrop-blur hover:!bg-navy">
                    {secondary.label}
                  </Button>
                )}
              </div>
            )}
            {children}
          </div>
          {pill && (
            <Link
              href={pill.href}
              className="rise group flex max-w-[360px] items-start gap-4 rounded-2xl bg-paper/75 p-5 ring-1 ring-ink/10 backdrop-blur-md transition-colors hover:bg-paper/90"
              style={{ ["--d" as string]: "850ms" }}
            >
              <span className="mt-1 size-2.5 shrink-0 rounded-full bg-orange" aria-hidden />
              <span>
                <span className="block text-xs uppercase tracking-[0.12em] text-navy">{pill.label}</span>
                <span className="mt-1.5 block text-[15px] font-medium leading-snug text-ink">{pill.title}</span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-navy">
                  Explore <LinkArrow />
                </span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
