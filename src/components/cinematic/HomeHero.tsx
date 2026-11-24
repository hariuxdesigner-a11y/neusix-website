import { Button } from "@/components/ui/Button";
import { WordRise } from "@/components/motion/WordRise";
import type { MediaId } from "@/content/media";
import { HeroStage } from "./HeroStage";

type Cta = { label: string; href: string };

/**
 * Home banner: a rounded, inset frame of footage graded to one light NeuSix lilac, fine scan
 * lines, a centred dark headline and thin "instrument" overlays (dial, tracking box, signal chart)
 * that follow NeuSix's six service lines. Light page top, so the header uses its dark style here.
 */
export function HomeHero({
  media,
  eyebrow,
  title,
  lede,
  primary,
  secondary,
  labels,
  next,
}: {
  media: MediaId[];
  eyebrow: string;
  title: string;
  lede: string;
  primary: Cta;
  secondary: Cta;
  labels: string[];
  next: Cta;
}) {
  return (
    <section aria-labelledby="page-title" data-light-top="glass" className="px-[clamp(8px,.9vw,14px)] pt-[clamp(8px,.9vw,14px)]">
      <div className="home-hero relative isolate flex min-h-[600px] flex-col overflow-hidden rounded-[clamp(18px,2vw,30px)] bg-lilac-soft [height:calc(100svh-clamp(8px,.9vw,14px))]">
        {/* scan lines + soft light behind the copy */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-[6] bg-[radial-gradient(58%_52%_at_50%_52%,rgba(252,252,253,.82),rgba(252,252,253,.45)_55%,rgba(252,252,253,.12)_85%)]" />
        {/* light veil under the floating header and over the bottom prompt */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-[4] h-[150px] bg-gradient-to-b from-paper/85 via-paper/45 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-[4] h-[120px] bg-gradient-to-t from-paper/70 to-transparent" />
        <HeroStage media={media} labels={labels} />

        <div className="container-x relative flex flex-1 flex-col items-center justify-center pb-[clamp(72px,9vh,110px)] pt-[calc(var(--header-h)+24px)] text-center">
          <p className="eyebrow rise flex items-center gap-3 text-navy">
            <span aria-hidden className="h-px w-8 bg-navy/50" />
            {eyebrow}
            <span aria-hidden className="h-px w-8 bg-navy/50" />
          </p>
          <h1 id="page-title" className="t-display mt-5 max-w-[17ch] text-balance text-ink">
            <WordRise>{title}</WordRise>
          </h1>
          <p className="rise mt-6 max-w-[52ch] text-[clamp(1rem,.95rem+.35vw,1.25rem)] font-medium leading-relaxed text-ink" style={{ ["--d" as string]: "450ms" }}>
            {lede}
          </p>
          <div className="rise mt-9 flex flex-wrap justify-center gap-3" style={{ ["--d" as string]: "600ms" }}>
            <Button href={primary.href} variant="dark">
              {primary.label}
            </Button>
            <Button href={secondary.href} variant="light" className="!bg-paper/80 backdrop-blur hover:!bg-navy">
              {secondary.label}
            </Button>
          </div>
        </div>

        <a href={next.href} className="rise group absolute bottom-[clamp(18px,3vh,32px)] left-1/2 flex -translate-x-1/2 items-center gap-2.5 text-[15px] font-medium text-ink" style={{ ["--d" as string]: "800ms" }}>
          {next.label}
          <span aria-hidden className="flex size-6 items-center justify-center rounded-full bg-ink text-paper transition-transform group-hover:translate-y-0.5">
            <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6.5l4 4 4-4" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
