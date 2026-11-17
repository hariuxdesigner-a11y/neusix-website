import type { Metadata } from "next";
import { HomeHero, OptimizeFor, PurposeBuilt } from "@/components/home/HomeSections";
import { Competencies } from "@/components/home/Competencies";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { WhyNeuSix } from "@/components/sections/WhyNeuSix";
import { OurApproach } from "@/components/sections/OurApproach";
import { TypicalOutcomes } from "@/components/sections/TypicalOutcomes";
import { CtaBand } from "@/components/sections/CtaBand";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { HOME_OUTCOMES } from "@/content/services";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: SITE.defaultTitle,
  description: SITE.defaultDescription,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Competencies />
      <PurposeBuilt />
      <OptimizeFor />
      <ServiceCards />
      <WhyNeuSix />
      <OurApproach />
      <TypicalOutcomes items={HOME_OUTCOMES} />
      <CtaBand />
      <TrustStrip />
    </>
  );
}
