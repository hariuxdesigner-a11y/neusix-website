import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Orbs } from "@/components/ui/Orbs";

export const metadata: Metadata = { title: "Page not found | NeuSix", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <Orbs preset="hero" dim />
      <div className="container-x flex min-h-[70svh] flex-col items-center justify-center py-24 text-center">
        <p className="eyebrow">404</p>
        <h1 className="t-display mt-3 max-w-[16ch]">This page could not be found.</h1>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/contact-us" variant="light">
            Contact
          </Button>
        </div>
      </div>
    </section>
  );
}
