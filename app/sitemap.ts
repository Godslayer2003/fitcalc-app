import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/privacy", "/terms", "/embed"].map(
    (path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
    })
  );

  const toolRoutes = tools.map((tool) => ({
    url: `${siteConfig.url}/tools/${tool.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...toolRoutes];
}
