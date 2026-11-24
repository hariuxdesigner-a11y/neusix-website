import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, getService, serviceClip } from "@/content/services";
import { ACCENT_HEX, ServiceIntro, StageFit, UseCaseThemes, WhatWeDo } from "@/components/services/ServiceSections";
import { WhatYouGet } from "@/components/services/WhatYouGet";
import { LineIcon } from "@/components/motion/LineIcon";
import { CommercialModels } from "@/components/sections/CommercialModels";
import { VideoHero } from "@/components/cinematic/VideoHero";
import { VideoCtaCard } from "@/components/cinematic/Bands";
import { CaseStudiesRow, FaqSection } from "@/components/cinematic/Extras";
import { CASE_STUDIES } from "@/content/case-studies";
import { FAQS } from "@/content/extras";

const SERVICE_FILTER: Record<string, string> = {
  "ai-transformation-page": "AI Transformation",
  modernization: "Modernization",
  "digital-transformation": "Digital Transformation",
  "software-engineering-services": "Software Engineering",
  "ai-center-of-excellence": "AI COE",
  "offshore-development-center": "ODC",
};
import { OutcomeShowcase, ApproachBand } from "@/components/cinematic/HomeBlocks";
import { Breadcrumbs, JsonLd, pageMetadata } from "@/lib/seo";
import { SEO } from "@/content/seo";
import { ACCENT_INK } from "@/content/services";
import { SITE, SITE_URL } from "@/content/site";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata(s.href);
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const accent = ACCENT_HEX[s.accent];
  return (
    <div style={{ ["--accent" as string]: accent }}>
      <Breadcrumbs items={[{ name: "Services", path: "/services/services-neusix" }, { name: s.name, path: s.href }]} />
      <JsonLd
        data={{
          "@type": "Service",
          name: s.name,
          serviceType: s.name,
          description: SEO[s.href]?.description,
          url: `${SITE_URL}${s.href}`,
          provider: { "@type": "Organization", name: SITE.legalName, url: SITE_URL },
          areaServed: ["IN", "US", "GB", "AE", "AU", "NZ"],
        }}
      />
      <VideoHero
        media={serviceClip(s.slug)}
        size="tall"
        eyebrow="Shipping Impact"
        accent={accent}
        title={s.hero}
        primary={{ label: "Book a Free Consultation", href: "/contact-us" }}
        secondary={{ label: "All Services", href: "/services/services-neusix" }}
      />
      <StageFit s={s} />
      <ServiceIntro s={s} />
      <WhatWeDo s={s} />
      <OutcomeShowcase items={s.outcomes} source={{ label: "Case Studies", href: "/our-work/case-studies" }} cta={{ label: "Book a Free Consultation", href: "/contact-us" }} />
      <UseCaseThemes s={s} />
      <ApproachBand
        title="How We Ship Impact From Discovery to Scale"
        sub="A consistent delivery rhythm across all services customized to your context, constraints, and measurable outcomes."
        phases={s.phases.map((p, i) => ({ name: p.name, text: p.text, outputs: p.outputs, icon: s.phaseIcons[i] }))}
      />
      {s.phaseNote && <p className="container-x reveal -mt-2 pb-4 pt-10 text-center text-sm text-slate">{s.phaseNote}</p>}
      <WhatYouGet
        items={s.whatYouGet}
        accent={accent}
        icons={s.wygGfx.map((g) => <LineIcon key={g} src={g} trigger="parent" knock="#fcfcfd" mono stroke={1.5} color={ACCENT_INK[s.accent]} className="size-full" />)}
        panelIcons={s.whatYouGet.map((_, i) => <LineIcon key={i} src={s.wygGfx[i % s.wygGfx.length]} trigger="parent" stroke={1.4} knock="#f1f1f9" mono color={ACCENT_INK[s.accent]} className="size-full" />)}
      />
      <CommercialModels />
      <CaseStudiesRow
        id="svc-cases-title"
        eyebrow="Case Studies"
        title="Shipping impact in the real world"
        slugs={(() => {
          const f = SERVICE_FILTER[s.slug];
          const match = CASE_STUDIES.filter((c) => (c.filters.services as readonly string[]).includes(f)).map((c) => c.slug);
          return [...match, ...CASE_STUDIES.map((c) => c.slug).filter((x) => !match.includes(x))];
        })()}
      />
      <FaqSection items={FAQS.slice(0, 5)} id="svc-faq-title" className="section-y border-t border-ink/5" />
      <VideoCtaCard />
    </div>
  );
}
