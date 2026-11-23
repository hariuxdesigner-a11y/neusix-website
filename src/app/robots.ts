import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // review preview on Netlify: block crawling entirely
  if (process.env.NETLIFY === "true") return { rules: [{ userAgent: "*", disallow: "/" }] };
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
