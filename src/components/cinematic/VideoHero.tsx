import Link from "next/link";
import type { ReactNode } from "react";
import type { MediaId } from "@/content/media";
import { VideoBackground } from "@/components/media/VideoBackground";
import { Button } from "@/components/ui/Button";
import { WordRise } from "@/components/motion/WordRise";
import { LinkArrow } from "@/components/ui/Icon";

type Cta = { label: string; href: string };

/**
 * Full-bleed cinematic hero (Abridge pattern): video under a bottom-weighted gradient,
 * copy anchored bottom-left, two CTAs, optional "pill" card bottom-right.
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
  grade?: "none" | "duotone";
  /** decorative layer drawn over the footage, under the copy */
  overlayArt?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section
      aria-labelledby="page-title"
      className={`relative isolate flex flex-col justify-end overflow-hidden text-paper ${
        size === "full" ? "min-h-[clamp(560px,100svh,1080px)]" : "min-h-[clamp(520px,82svh,860px)]"
      }`}
    >
      <VideoBackground id={media} overlay="hero" priority parallax={90} grade={grade} />
      {overlayArt}
      <div className="container-x relative grid gap-10 pb-[clamp(40px,7vw,96px)] pt-[calc(var(--header-h)+48px)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-[880px]">
          {eyebrow && (
            <p className="eyebrow rise flex items-center gap-3 text-paper/90">
              {accent && <span aria-hidden className="h-px w-8" style={{ background: accent }} />}
              {eyebrow}
            </p>
          )}
          <h1 id="page-title" className={`t-display mt-4 text-balance ${compact ? "max-w-[24ch] !text-[clamp(2rem,1.4rem+2.6vw,3.75rem)]" : "max-w-[18ch]"}`}>
            <WordRise>{title}</WordRise>
          </h1>
          {text && (
            <div className="rise mt-6 max-w-[56ch] text-base leading-relaxed text-paper/85 sm:text-lg" style={{ ["--d" as string]: "450ms" }}>
              {text}
            </div>
          )}
          {(primary || secondary) && (
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ ["--d" as string]: "600ms" }}>
              {primary && (
                <Button href={primary.href} variant="dark" className="!bg-paper !text-ink hover:!bg-lilac-soft">
                  {primary.label}
                </Button>
              )}
              {secondary && (
                <Button href={secondary.href} variant="ghost-light">
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
            className="rise group flex max-w-[360px] items-start gap-4 rounded-2xl bg-ink/55 p-5 ring-1 ring-white/15 backdrop-blur-md transition-colors hover:bg-ink/70"
            style={{ ["--d" as string]: "850ms" }}
          >
            <span className="mt-1 size-2.5 shrink-0 rounded-full bg-orange" aria-hidden />
            <span>
              <span className="block text-xs uppercase tracking-[0.12em] text-paper/85">{pill.label}</span>
              <span className="mt-1.5 block text-[15px] leading-snug">{pill.title}</span>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-lilac-soft">
                Explore <LinkArrow />
              </span>
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
