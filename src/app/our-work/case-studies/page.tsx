import type { Metadata } from "next";
import { CaseStudiesBrowser } from "@/components/case-studies/CaseStudiesBrowser";
import { VideoHero } from "@/components/cinematic/VideoHero";
import { VideoCtaCard } from "@/components/cinematic/Bands";

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
      <VideoHero media="cases-hero" size="tall" eyebrow="Shipping Impact" title="AI Transformation that moves from pilots to production" primary={{ label: "Book a Free Consultation", href: "/contact-us" }} />
      <CaseStudiesBrowser />
      <VideoCtaCard />
    </>
  );
}
