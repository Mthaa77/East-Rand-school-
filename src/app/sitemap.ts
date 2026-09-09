import type { MetadataRoute } from "next";
import { SITE_PAGES } from "@/lib/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.ersa.co.za";
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...SITE_PAGES.map((page) => ({
      url: `${base}${page.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page.path === "/admissions" ? 0.9 : 0.8,
    })),
  ];
}
