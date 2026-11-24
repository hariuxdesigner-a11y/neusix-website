import type { NextConfig } from "next";

// Review previews (Netlify sets NETLIFY=true, Vercel sets VERCEL=1) stay out of search engines.
// Production (Hostinger) builds set neither, so the real site stays indexable.
const isPreview = process.env.NETLIFY === "true" || process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  // Self-contained server bundle (.next/standalone): what Hostinger's Node.js hosting runs for Next.js.
  // Vercel builds its own output, so the standalone bundle is skipped there.
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Friendly redirects for common shortened / legacy paths.
  async redirects() {
    return [
      { source: "/services", destination: "/services/services-neusix", permanent: true },
      { source: "/our-work", destination: "/our-work/industries", permanent: true },
      { source: "/case-studies", destination: "/our-work/case-studies", permanent: true },
      { source: "/industries", destination: "/our-work/industries", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/blog-tags", destination: "/blog", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/white-paper", destination: "/white-papers", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          ...(isPreview ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
        ],
      },
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/lottie/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
