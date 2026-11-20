import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

/** Web app manifest: name, colours and the NeuSix "N" app icons (Android home screen, PWA). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "NeuSix",
    description: SITE.defaultDescription,
    start_url: "/",
    display: "browser",
    background_color: "#fcfcfd",
    theme_color: "#2d2d5f",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
