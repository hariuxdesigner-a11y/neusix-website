import type { Metadata } from "next";
import { BLOG_POSTS, postHref } from "@/content/resources";
import { SITE_URL } from "@/content/site";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { VideoCtaCard } from "@/components/cinematic/Bands";
import { Breadcrumbs, JsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/blog");

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
      <JsonLd
        data={{
          "@type": "Blog",
          "@id": `${SITE_URL}/blog#blog`,
          name: "NeuSix Blog",
          url: `${SITE_URL}/blog`,
          description: "Insights from NeuSix on enterprise AI transformation, modernization, AI governance, AI Centers of Excellence, engagement models and ODC engineering.",
          publisher: { "@id": `${SITE_URL}/#organization` },
          blogPost: BLOG_POSTS.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE_URL}${postHref(p)}`, datePublished: p.date })),
        }}
      />
      <BlogIndex tag="resources" />
      <VideoCtaCard />
    </>
  );
}
