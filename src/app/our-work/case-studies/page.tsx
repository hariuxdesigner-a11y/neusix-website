import type { Metadata } from "next";
import { CaseStudiesBrowser } from "@/components/case-studies/CaseStudiesBrowser";
import { VideoHero } from "@/components/cinematic/VideoHero";
import { VideoCtaCard } from "@/components/cinematic/Bands";
import { Breadcrumbs, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/our-work/case-studies");

export default function CaseStudiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Case Studies", path: "/our-work/case-studies" }]} />
      <VideoHero media="cases-hero" size="tall" eyebrow="Shipping Impact" title="AI Transformation that moves from pilots to production" primary={{ label: "Book a Free Consultation", href: "/contact-us" }} />
      <CaseStudiesBrowser />
      <VideoCtaCard />
    </>
  );
}
