import type { Metadata } from "next";
import { CaseStudiesBrowser } from "@/components/case-studies/CaseStudiesBrowser";
import { VideoHero } from "@/components/cinematic/VideoHero";
import { VideoCtaCard } from "@/components/cinematic/Bands";
import { Breadcrumbs, JsonLd, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/content/site";
import { CASE_STUDIES as CASE_LIST } from "@/content/case-studies";

export const metadata: Metadata = pageMetadata("/our-work/case-studies");

export default function CaseStudiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Case Studies", path: "/our-work/case-studies" }]} />
      <JsonLd data={{ "@type": "ItemList", name: "NeuSix case studies", itemListElement: CASE_LIST.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.title, url: `${SITE_URL}/case-studies/${c.slug}` })) }} />
      <VideoHero media="cases-hero" size="tall" eyebrow="Shipping Impact" title="AI Transformation that moves from pilots to production" primary={{ label: "Book a Free Consultation", href: "/contact-us" }} />
      <CaseStudiesBrowser />
      <VideoCtaCard />
    </>
  );
}
