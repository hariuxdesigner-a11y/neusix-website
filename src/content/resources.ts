/* Resources: blog articles (on-site, /blog/<slug>) and white papers (/white-papers).
 * Headlines and white papers come from https://www.neusix.com/resources (17 Nov 2026);
 * the article bodies were written for this site (src/content/blog/<slug>.md).
 *
 * HOW TO ADD A BLOG POST
 *   1. Write src/content/blog/<slug>.md (frontmatter: description, keywords, takeaways; see blog/README.md).
 *   2. Add an entry to BLOG_POSTS below (newest first). It is then published at /blog/<slug>,
 *      listed on /blog, its category page, the sitemap and the Resources menu automatically.
 */
import type { MediaId } from "@/content/media";

export type BlogTag = { slug: string; label: string };

export const BLOG_TAGS: BlogTag[] = [
  { slug: "resources", label: "All Blogs" },
  { slug: "engagement-models", label: "Engagement Models" },
  { slug: "modernization", label: "Modernization" },
  { slug: "ai-governance", label: "AI Governance" },
  { slug: "ai-coe", label: "AI COE" },
  { slug: "methodology", label: "Methodology" },
  { slug: "market-pov", label: "Market POV" },
  { slug: "odc-engineering", label: "ODC / Engineering" },
  { slug: "leadership-pov", label: "Leadership POV" },
  { slug: "ai-transformation", label: "AI Transformation" },
];

export type BlogPost = {
  slug: string; // src/content/blog/<slug>.md, served at /blog/<slug>
  title: string;
  tag: string; // BlogTag.slug
  image: MediaId; // poster from public/media
  date: string; // ISO publish date
  readTime: string;
  excerpt: string;
};

export const BLOG_POSTS: BlogPost[] = [
  { slug: "odc-delivery-pods-vs-staff-augmentation", title: "The ODC Model, Reimagined: Why Delivery Pods Beat Staff Augmentation", tag: "odc-engineering", image: "svc-offshore-development-center", date: "2026-11-20", readTime: "5 min read",
    excerpt: "Staff augmentation adds hands. Delivery pods add accountable outcomes. Here is how a modern offshore development center works and when it is the better choice." },
  { slug: "choosing-an-ai-transformation-partner", title: "What US Enterprises Should Look for in an AI Transformation Partner", tag: "market-pov", image: "industries-hero", date: "2026-11-20", readTime: "5 min read",
    excerpt: "Choosing an AI partner is a business decision, not a technology purchase. Here are the criteria that separate partners who deliver outcomes from those who deliver demos." },
  { slug: "responsible-ai-governance-production", title: "Responsible AI Is Not Optional: Governance for Production Systems", tag: "ai-governance", image: "services-stages", date: "2026-11-20", readTime: "5 min read",
    excerpt: "Governance is what lets AI move from pilot to production with confidence. A practical model for risk, oversight, monitoring and accountability." },
  { slug: "three-stages-of-enterprise-ai-maturity", title: "From Advisory to Managed Services: The Three Stages of Enterprise AI Maturity", tag: "ai-transformation", image: "home-purpose", date: "2026-11-20", readTime: "5 min read",
    excerpt: "Enterprise AI matures in stages, from strategy to build to long-term operation. Knowing where you are helps you choose the right next step and the right support." },
  { slug: "bt-bot-bom-commercial-models-ai-delivery", title: "B&T, BOT, or BOM? Choosing the Right Commercial Model for AI Delivery", tag: "engagement-models", image: "about-global", date: "2026-11-20", readTime: "5 min read",
    excerpt: "Build and Transfer, Build-Operate-Transfer and Build-Operate-Maintain each balance speed, control and risk differently. Here is how to choose." },
  { slug: "how-to-build-an-ai-center-of-excellence", title: "How to Build an AI Center of Excellence That Actually Works", tag: "ai-coe", image: "svc-ai-center-of-excellence", date: "2026-11-20", readTime: "5 min read",
    excerpt: "An AI Center of Excellence should accelerate delivery across the business, not become a bottleneck. Here is how to design one that creates real value." },
  { slug: "modernization-without-disruption-cto-guide", title: "Modernization Without Disruption: A Practical Guide for CTOs", tag: "modernization", image: "svc-modernization", date: "2026-11-20", readTime: "5 min read",
    excerpt: "Legacy modernization does not have to mean a risky big-bang rewrite. A practical, incremental approach that keeps the business running while you change." },
  { slug: "discover-plan-build-scale-execution-systems", title: "Discover-Plan-Build-Scale: Why Execution Systems Beat Frameworks", tag: "methodology", image: "home-approach", date: "2026-11-20", readTime: "5 min read",
    excerpt: "Frameworks describe what should happen. Execution systems make it happen. How the Discover, Plan, Build, Scale approach turns AI strategy into results." },
  { slug: "ai-competence-vs-ai-relevance", title: "The Difference Between AI Competence and AI Relevance", tag: "leadership-pov", image: "services-hero", date: "2026-11-20", readTime: "5 min read",
    excerpt: "Being good at AI is not the same as AI making your business better. Why leaders should focus on relevance, and how to build it." },
  { slug: "why-enterprise-ai-pilots-fail", title: "Why Most Enterprise AI Pilots Fail (And What to do Instead)", tag: "ai-transformation", image: "svc-ai-transformation-page", date: "2026-11-20", readTime: "7 min read",
    excerpt: "Most AI pilots stall for organizational reasons, not technical ones. Here is how to design pilots that are built to reach production and prove business value." },
];

/** Newest first (stable for equal dates). */
export const SORTED_POSTS = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
export const FEATURED_POST = BLOG_POSTS.find((p) => p.slug === "why-enterprise-ai-pilots-fail") ?? SORTED_POSTS[0];

export const WHITE_PAPERS = [
  {
    title: "The Enterprise AI Transformation Playbook",
    text: "A Practical Guide for Enterprise Leaders on Moving from AI Curiosity to AI-Driven Competitive Advantage",
    href: "https://docs.google.com/document/d/13ZmCqGb4dt9dzngKRrzcfs_AwqDqoQCo/edit",
  },
  {
    title: "Building an AI Center of Excellence From Charter to Scale",
    text: "A Step-by-Step Guide to Designing, Launching, and Scaling an AI COE That Delivers Sustained Value",
    href: "https://docs.google.com/document/d/1vr78D4LjaWU0jivSEeU7t1WV1aZUmxrc/edit",
  },
  {
    title: "Modernization Without Disruption",
    text: "A CTO's Guide to Transforming Legacy Systems into AI-Ready, Cloud-Native Platforms",
    href: "https://docs.google.com/document/d/12k34hdQ6LclZ7tgF3jkk1TGoKGOU2VZL/edit",
  },
];

export const tagLabel = (slug: string) => BLOG_TAGS.find((t) => t.slug === slug)?.label ?? slug;
export const tagHref = (slug: string) => (slug === "resources" ? "/blog" : `/blog-tags/${slug}`);
export const postsForTag = (slug: string) => (slug === "resources" ? SORTED_POSTS : SORTED_POSTS.filter((p) => p.tag === slug));
export const postHref = (p: BlogPost) => `/blog/${p.slug}`;
export const getPostMeta = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);
/** Related reading: same topic first, then the newest others. */
export const relatedPosts = (slug: string, n = 3) => {
  const me = getPostMeta(slug);
  const others = SORTED_POSTS.filter((p) => p.slug !== slug);
  return [...others.filter((p) => p.tag === me?.tag), ...others.filter((p) => p.tag !== me?.tag)].slice(0, n);
};
export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
