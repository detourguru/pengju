import { siteConfig } from "@/config/site";

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: new URL("/", siteConfig.url).toString() }];
}
