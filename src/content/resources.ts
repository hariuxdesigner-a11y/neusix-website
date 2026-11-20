/* Resources (blogs + white papers): copied from https://www.neusix.com/resources (17 Nov 2026).
 *
 * HOW TO ADD A BLOG POST
 *   1. Append an entry to BLOG_POSTS below.
 *   2a. If the article lives elsewhere (Google Doc, Medium…), set `href` to that URL.
 *   2b. To publish it on this site instead, set `slug` and add `src/content/blog/<slug>.md`
 *       (plain Markdown, optional frontmatter not required). It is then served at
 *       /resources/<slug>, listed in the sitemap, and linked from the cards automatically.
 */

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
  title: string;
  tag: string; // BlogTag.slug
  readTime: string;
  href?: string; // external article
  slug?: string; // on-site article (src/content/blog/<slug>.md)
  date?: string; // ISO date, optional (the live site shows none)
};

// NOTE: on the live site every blog card points to the same Google Doc. Kept as published;
// replace each `href` with the correct article (or add an on-site `slug`) when available.
const DOC = "https://docs.google.com/document/d/16AQqz4eMFPAOJPKP43HnnqSQZTGTW-jy/edit";

export const BLOG_POSTS: BlogPost[] = [
  { title: "The ODC Model, Reimagined: Why Delivery Pods Beat Staff Augmentation", tag: "odc-engineering", readTime: "8 min read", href: DOC },
  { title: "What US Enterprises Should Look for in an AI Transformation Partner", tag: "market-pov", readTime: "9 min read", href: DOC },
  { title: "Responsible AI Is Not Optional: Governance for Production Systems", tag: "ai-governance", readTime: "9 min read", href: DOC },
  { title: "From Advisory to Managed Services: The Three Stages of Enterprise AI Maturity", tag: "ai-transformation", readTime: "8 min read", href: DOC },
  { title: "B&T, BOT, or BOM? Choosing the Right Commercial Model for AI Delivery", tag: "engagement-models", readTime: "7 min read", href: DOC },
  { title: "How to Build an AI Center of Excellence That Actually Works", tag: "ai-coe", readTime: "8 min read", href: DOC },
  { title: "Modernization Without Disruption: A Practical Guide for CTOs", tag: "modernization", readTime: "8 min read", href: DOC },
  { title: "Discover-Plan-Build-Scale: Why Execution Systems Beat Frameworks", tag: "methodology", readTime: "9 min read", href: DOC },
  { title: "The Difference Between AI Competence and AI Relevance", tag: "leadership-pov", readTime: "8 min read", href: DOC },
  { title: "Why Most Enterprise AI Pilots Fail (And What to do Instead)", tag: "ai-transformation", readTime: "7 min read", href: DOC },
];

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
export const postsForTag = (slug: string) => (slug === "resources" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.tag === slug));
export const postHref = (p: BlogPost) => (p.slug ? `/resources/${p.slug}` : p.href ?? "#");
export const ONSITE_POSTS = BLOG_POSTS.filter((p) => p.slug);
