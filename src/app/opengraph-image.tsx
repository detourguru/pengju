import { siteConfig } from "@/config/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = siteConfig.name;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: siteConfig.name,
    description: siteConfig.description,
  });
}
