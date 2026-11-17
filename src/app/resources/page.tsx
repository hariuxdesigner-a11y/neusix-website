import type { Metadata } from "next";
import { ResourcesView } from "@/components/resources/ResourcesView";
import { CtaBand } from "@/components/sections/CtaBand";

const title = "Resources | NeuSix";
const description = "Blogs and white papers from NeuSix on AI transformation, modernization, AI COE, governance, and engagement models.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/resources" },
  openGraph: { title, description, url: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <ResourcesView tag="resources" />
      <CtaBand />
    </>
  );
}
