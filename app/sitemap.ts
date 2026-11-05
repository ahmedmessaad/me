import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { allWork } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: site.meta.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.meta.url}/work`, lastModified, changeFrequency: "monthly" as const, priority: 0.9 },
    ...allWork().map((w) => ({ url: `${site.meta.url}/work/${w.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
