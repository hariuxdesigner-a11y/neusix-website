import { Button } from "@/components/ui/Button";
import { Orbs } from "@/components/ui/Orbs";

type Props = {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  note?: string;
  dark?: boolean;
};

/** "Book a Free Consultation" band that closes most pages. */
export function CtaBand({
  title = "Book a Free Consultation",
  body = "In a 30-minute call, we’ll understand your goals and constraints, share a practical path to measurable impact, and outline next steps no obligations.",
  primary = { label: "Book a Free Consultation", href: "/contact-us" },
  secondary,
  note = "Fast, practical, and tailored. We'll keep it grounded in your reality.",
  dark = false,
}: Props) {
  return (
    <section aria-labelledby="cta-title" className={`relative isolate overflow-hidden ${dark ? "bg-ink text-paper" : "text-ink"}`}>
      <Orbs preset="cta" dim={dark} />
      <div className="container-x reveal flex flex-col items-center py-[clamp(80px,9vw,140px)] text-center">
        <h2 id="cta-title" className="t-display max-w-[16ch]">
          {title}
        </h2>
        <p className="mt-6 max-w-[560px] text-sm leading-relaxed opacity-90 sm:text-base">{body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {secondary && (
            <Button href={secondary.href} variant="light">
              {secondary.label}
            </Button>
          )}
          <Button href={primary.href}>{primary.label}</Button>
        </div>
        {note && <p className="mt-6 text-sm opacity-90">{note}</p>}
      </div>
    </section>
  );
}
