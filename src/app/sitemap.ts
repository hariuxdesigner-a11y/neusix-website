import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { SERVICES } from "@/content/services";
import { CASE_STUDIES } from "@/content/case-studies";
import { BLOG_TAGS, ONSITE_POSTS } from "@/content/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    { p: "/", pr: 1 },
    { p: "/services/services-neusix", pr: 0.9 },
    ...SERVICES.map((s) => ({ p: s.href, pr: 0.9 })),
    { p: "/our-work/industries", pr: 0.8 },
    { p: "/our-work/case-studies", pr: 0.8 },
    ...CASE_STUDIES.map((c) => ({ p: `/case-studies/${c.slug}`, pr: 0.7 })),
    { p: "/resources", pr: 0.7 },
    ...BLOG_TAGS.filter((t) => t.slug !== "resources").map((t) => ({ p: `/blog-tags/${t.slug}`, pr: 0.4 })),
    ...ONSITE_POSTS.map((b) => ({ p: `/resources/${b.slug}`, pr: 0.6 })),
    { p: "/about", pr: 0.8 },
    { p: "/contact-us", pr: 0.8 },
  ];
  return paths.map(({ p, pr }) => ({ url: `${SITE_URL}${p === "/" ? "" : p}`, lastModified: now, changeFrequency: "monthly", priority: pr }));
}
