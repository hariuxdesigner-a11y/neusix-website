import type { Metadata } from "next";
import { ResourcesView } from "@/components/resources/ResourcesView";
import { VideoCtaCard } from "@/components/cinematic/Bands";
import { Breadcrumbs, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/resources");

export default function ResourcesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Resources", path: "/resources" }]} />
      <ResourcesView tag="resources" />
      <VideoCtaCard />
    </>
  );
}
