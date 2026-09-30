import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getPostSlugs, getProjectSlugs, getServiceIds } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, serviceIds, postSlugs] = await Promise.all([
    getProjectSlugs(),
    getServiceIds(),
    getPostSlugs(),
  ]);
  const staticPaths = [
    "/",
    "/services/",
    "/about/",
    "/blog/",
    "/projects/",
    "/contact/",
    "/privacy/",
    "/terms/",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${site.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...serviceIds.map((id) => ({
      url: `${site.url}/services/${id}/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...slugs.map((slug) => ({
      url: `${site.url}/projects/${slug}/`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...postSlugs.map((slug) => ({
      url: `${site.url}/blog/${slug}/`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
