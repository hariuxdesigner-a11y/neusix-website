import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourcesView } from "@/components/resources/ResourcesView";
import { VideoCtaCard } from "@/components/cinematic/Bands";
import { BLOG_TAGS, tagLabel } from "@/content/resources";

export function generateStaticParams() {
  return BLOG_TAGS.map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog-tags/[tag]">): Promise<Metadata> {
  const { tag } = await params;
  if (!BLOG_TAGS.some((t) => t.slug === tag)) return {};
  const title = `${tagLabel(tag)} | Resources | NeuSix`;
  // "All Blogs" duplicates /resources, so it points search engines there.
  return { title, alternates: { canonical: tag === "resources" ? "/resources" : `/blog-tags/${tag}` }, openGraph: { title, url: `/blog-tags/${tag}` } };
}

export default async function BlogTagPage({ params }: PageProps<"/blog-tags/[tag]">) {
  const { tag } = await params;
  if (!BLOG_TAGS.some((t) => t.slug === tag)) notFound();
  return (
    <>
      <ResourcesView tag={tag} />
      <VideoCtaCard />
    </>
  );
}
