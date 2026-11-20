import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourcesView } from "@/components/resources/ResourcesView";
import { VideoCtaCard } from "@/components/cinematic/Bands";
import { BLOG_TAGS, tagLabel } from "@/content/resources";
import { Breadcrumbs, pageMetadata } from "@/lib/seo";
import { TAG_SEO } from "@/content/seo";

export function generateStaticParams() {
  return BLOG_TAGS.map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog-tags/[tag]">): Promise<Metadata> {
  const { tag } = await params;
  if (!BLOG_TAGS.some((t) => t.slug === tag)) return {};
  // "All Blogs" duplicates /resources, so it points search engines there.
  if (tag === "resources") return pageMetadata("/resources");
  // Topic pages list only a few posts: kept for visitors, but not indexed (thin content); links are still followed.
  return pageMetadata(`/blog-tags/${tag}`, { title: `${tagLabel(tag)} Articles & Insights | NeuSix`, description: TAG_SEO[tag]?.description, og: "resources", noindex: true });
}

export default async function BlogTagPage({ params }: PageProps<"/blog-tags/[tag]">) {
  const { tag } = await params;
  if (!BLOG_TAGS.some((t) => t.slug === tag)) notFound();
  return (
    <>
      <Breadcrumbs items={[{ name: "Resources", path: "/resources" }, { name: tagLabel(tag), path: `/blog-tags/${tag}` }]} />
      <ResourcesView tag={tag} />
      <VideoCtaCard />
    </>
  );
}
