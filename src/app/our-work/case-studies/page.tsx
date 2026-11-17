import type { Metadata } from "next";
import { CaseStudiesBrowser } from "@/components/case-studies/CaseStudiesBrowser";
import { CtaBand } from "@/components/sections/CtaBand";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { LottieOnView } from "@/components/ui/LottieOnView";

const title = "Case Studies | NeuSix";
const description =
  "Explore NeuSix's full suite of services — from AI transformation and digital modernization to software engineering, AI CoE setup, and offshore development centres tailored for enterprise growth.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/our-work/case-studies" },
  openGraph: { title, description, url: "/our-work/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <section aria-labelledby="cs-hero" className="relative isolate overflow-hidden">
        <LottieOnView src="/assets/hero-shimmer02.lottie" loop className="pointer-events-none absolute left-[2%] top-0 -z-10 w-[clamp(180px,32vw,460px)] opacity-80" />
        <LottieOnView src="/assets/hero-shimmer01.lottie" loop className="pointer-events-none absolute -right-[2%] top-[18%] -z-10 w-[clamp(120px,14vw,220px)] opacity-80" />
        <div className="container-x flex min-h-[clamp(380px,60svh,620px)] items-center py-20">
          <h1 id="cs-hero" className="t-display max-w-[16ch]">
            Shipping Impact AI Transformation that moves from pilots to production
          </h1>
        </div>
      </section>
      <CaseStudiesBrowser />
      <CtaBand />
      <TrustStrip />
    </>
  );
}
