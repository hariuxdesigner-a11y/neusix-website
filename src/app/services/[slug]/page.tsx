import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, getService } from "@/content/services";
import { ACCENT_HEX, ServiceHero, ServiceIntro, StageFit, UseCaseThemes, WhatWeDo } from "@/components/services/ServiceSections";
import { WhatYouGet } from "@/components/services/WhatYouGet";
import { TypicalOutcomes } from "@/components/sections/TypicalOutcomes";
import { OurApproach } from "@/components/sections/OurApproach";
import { CommercialModels } from "@/components/sections/CommercialModels";
import { CtaBand } from "@/components/sections/CtaBand";
import { TrustStrip } from "@/components/sections/TrustStrip";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.seo.title,
    description: s.seo.description,
    alternates: { canonical: s.href },
    openGraph: { title: s.seo.title, description: s.seo.description, url: s.href },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const accent = ACCENT_HEX[s.accent];
  return (
    <div style={{ ["--accent" as string]: accent }}>
      <ServiceHero s={s} />
      <StageFit s={s} />
      <ServiceIntro s={s} />
      <WhatWeDo s={s} />
      <TypicalOutcomes items={s.outcomes} />
      <UseCaseThemes s={s} />
      <OurApproach
        title="How We Ship Impact From Discovery to Scale"
        subtitle="A consistent delivery rhythm across all services customized to your context, constraints, and measurable outcomes."
        phases={s.phases}
        icons={s.phaseIcons}
        note={s.phaseNote}
      />
      <WhatYouGet items={s.whatYouGet} gfx={s.wygGfx} accent={accent} />
      <CommercialModels />
      <CtaBand />
      <TrustStrip />
    </div>
  );
}
