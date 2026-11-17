import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ONSITE_POSTS, tagLabel } from "@/content/resources";
import { readPostHtml } from "@/lib/blog";
import { CtaBand } from "@/components/sections/CtaBand";

// Pre-renders every on-site article (posts in BLOG_POSTS that have a `slug`).
// A placeholder param keeps the route valid while no on-site articles exist; it renders a 404.
export function generateStaticParams() {
  return ONSITE_POSTS.length ? ONSITE_POSTS.map((p) => ({ slug: p.slug! })) : [{ slug: "_none" }];
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = ONSITE_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} | NeuSix`, alternates: { canonical: `/resources/${slug}` }, openGraph: { type: "article", title: post.title, url: `/resources/${slug}` } };
}

export default async function BlogPostPage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const post = ONSITE_POSTS.find((p) => p.slug === slug);
  const html = post ? await readPostHtml(slug) : null;
  if (!post || !html) notFound();
  return (
    <>
      <article className="container-x pb-[var(--section-y)] pt-[clamp(48px,7vw,104px)]">
        <p className="text-sm">
          <Link href="/resources" className="hover:text-brand">
            Resources
          </Link>{" "}
          / <Link href={`/blog-tags/${post.tag}`} className="hover:text-brand">{tagLabel(post.tag)}</Link>
        </p>
        <h1 className="t-display mt-4 max-w-[22ch] !text-[clamp(2rem,1.4rem+2.4vw,3.5rem)]">{post.title}</h1>
        <p className="mt-4 text-sm text-slate">
          {post.date && <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { dateStyle: "long" })} · </time>}
          {post.readTime}
        </p>
        <div className="prose-neusix mt-10 max-w-[70ch]" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      <CtaBand />
    </>
  );
}
