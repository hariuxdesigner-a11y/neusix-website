import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { VideoBackground } from "@/components/media/VideoBackground";
import { WordRise } from "@/components/motion/WordRise";

export const metadata: Metadata = { title: "Page not found | NeuSix", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden text-paper">
      <VideoBackground id="contact" overlay="dark" />
      <div className="container-x flex min-h-[100svh] flex-col items-start justify-end pb-[clamp(48px,8vw,120px)] pt-[calc(var(--header-h)+64px)]">
        <p className="eyebrow text-paper/85">404</p>
        <h1 className="t-display mt-4 max-w-[16ch]">
          <WordRise>This page could not be found.</WordRise>
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" className="!bg-paper !text-ink">Back to home</Button>
          <Button href="/contact-us" variant="ghost-light">
            Contact
          </Button>
        </div>
      </div>
    </section>
  );
}
