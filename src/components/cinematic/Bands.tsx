import type { ReactNode } from "react";
import type { MediaId } from "@/content/media";
import { VideoBackground } from "@/components/media/VideoBackground";
import { Button } from "@/components/ui/Button";
import { StatementFill } from "@/components/motion/StatementFill";

type Cta = { label: string; href: string };

/** Full-bleed dark statement over video (e.g. "Purpose-built AI transformation…"). */
export function StatementBand({
  media,
  id,
  eyebrow,
  title,
  children,
  ctas,
  flip = false,
}: {
  media: MediaId;
  id: string;
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  ctas?: Cta[];
  /** kept for compatibility; the band is always a light split layout now */
  align?: "center" | "split";
  /** video on the left instead of the right */
  flip?: boolean;
}) {
  return (
    <section aria-labelledby={id} className="section-y">
      <div className="container-x grid items-center gap-[clamp(32px,5vw,80px)] lg:grid-cols-2">
        <div className={flip ? "lg:order-2" : ""}>
          <div className="stagger">
            {eyebrow && <p className="eyebrow text-brand">{eyebrow}</p>}
            <h2 id={id} className="t-h2 mt-3 max-w-[18ch] text-balance">
              {title}
            </h2>
          </div>
          {children &&
            (typeof children === "string" ? (
              <StatementFill text={children} className="mt-6 max-w-[52ch] text-[clamp(1.05rem,.95rem+.45vw,1.3rem)] leading-relaxed text-ink" />
            ) : (
              <div className="reveal mt-6 max-w-[56ch] text-base leading-relaxed text-body sm:text-lg">{children}</div>
            ))}
          {ctas && (
            <div className="reveal mt-8 flex flex-wrap gap-3">
              {ctas.map((c, i) => (
                <Button key={c.href} href={c.href} variant={i === 0 ? "dark" : "light"}>
                  {c.label}
                </Button>
              ))}
            </div>
          )}
        </div>
        <div className={`reveal relative isolate aspect-[4/3] overflow-hidden rounded-[clamp(20px,2.4vw,32px)] lg:aspect-[5/4] ${flip ? "lg:order-1" : ""}`}>
          <VideoBackground id={media} overlay="none" parallax={50} />
        </div>
      </div>
    </section>
  );
}

/** Rounded, inset video card (Abridge "video band"): used for the consultation CTA on every page. */
export function VideoCtaCard({
  media = "consult",
  title = "Book a Free Consultation",
  body = "In a 30-minute call, we’ll understand your goals and constraints, share a practical path to measurable impact, and outline next steps no obligations.",
  primary = { label: "Book a Free Consultation", href: "/contact-us" },
  secondary,
  note = "Fast, practical, and tailored. We'll keep it grounded in your reality.",
}: {
  media?: MediaId;
  title?: string;
  body?: string;
  primary?: Cta;
  secondary?: Cta;
  note?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="container-x py-[clamp(48px,6vw,96px)]">
      <div className="reveal relative isolate flex min-h-[clamp(440px,60vw,640px)] flex-col justify-end overflow-hidden rounded-[clamp(18px,2.4vw,32px)] p-[clamp(24px,5vw,72px)] text-paper">
        <VideoBackground id={media} overlay="hero" parallax={70} />
        <h2 id="cta-title" className="t-display max-w-[16ch]">
          {title}
        </h2>
        <p className="mt-5 max-w-[56ch] text-sm leading-relaxed text-paper/85 sm:text-base">{body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={primary.href} className="!bg-paper !text-ink hover:!bg-lilac-soft">
            {primary.label}
          </Button>
          {secondary && (
            <Button href={secondary.href} variant="ghost-light">
              {secondary.label}
            </Button>
          )}
        </div>
        {note && <p className="mt-6 text-sm text-paper/85">{note}</p>}
      </div>
    </section>
  );
}

/** Section heading in the Abridge rhythm: small eyebrow, large two-tone headline, optional text. */
export function SectionHead({
  id,
  eyebrow,
  title,
  sub,
  text,
  align = "left",
  dark = false,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={`stagger ${align === "center" ? "mx-auto max-w-[820px] text-center" : "max-w-[820px]"}`}>
      {eyebrow && <p className={`eyebrow ${dark ? "text-lilac-soft" : "text-brand"}`}>{eyebrow}</p>}
      <h2 id={id} className="t-h2 mt-3 text-balance !text-[clamp(1.9rem,1.3rem+2.4vw,3.25rem)] !leading-[1.08]">
        {title}
        {sub && <span className={`block ${dark ? "text-paper/75" : "text-ink/60"}`}>{sub}</span>}
      </h2>
      {text && <div className={`mt-5 text-base leading-relaxed ${dark ? "text-paper/80" : "text-slate"}`}>{text}</div>}
    </div>
  );
}
