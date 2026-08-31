import type { MetadataRoute } from "next";
import { getCaseStudySlugs } from "@/data/caseStudies";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = getCaseStudySlugs().map((slug) => ({
    url: `${SITE_URL}/work/${slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: SITE_URL, lastModified: new Date() },
    ...projectPages,
  ];
}
