import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { VideoCtaCard } from "@/components/cinematic/Bands";
import { BLOG_TAGS, tagLabel } from "@/content/resources";
import { Breadcrumbs, pageMetadata } from "@/lib/seo";
import { TAG_SEO } from "@/content/seo";

export function generateStaticParams() {
  return BLOG_TAGS.map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog-tags/[tag]">): Promise<Metadata> {
  const { tag } = await params;
  if (!BLOG_TAGS.some((t) => t.slug === tag) || tag === "resources") return {};
  // Category pages list only one or two articles: kept for visitors, not indexed (thin); links are followed.
  return pageMetadata(`/blog-tags/${tag}`, { title: `${tagLabel(tag)} Articles & Insights | NeuSix Blog`, description: TAG_SEO[tag]?.description, og: "blog", noindex: true });
}

export default async function BlogTagPage({ params }: PageProps<"/blog-tags/[tag]">) {
  const { tag } = await params;
  if (!BLOG_TAGS.some((t) => t.slug === tag)) notFound();
  // "All Blogs" (/blog-tags/resources on the live site) is the blog index itself.
  if (tag === "resources") permanentRedirect("/blog");
  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: tagLabel(tag), path: `/blog-tags/${tag}` }]} />
      <BlogIndex tag={tag} />
      <VideoCtaCard />
    </>
  );
}
