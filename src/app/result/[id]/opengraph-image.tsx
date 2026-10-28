import { siteConfig } from "@/config/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

import { getResult, results } from "./results";

export const alt = `${siteConfig.name} 결과`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return Object.keys(results).map((id) => ({ id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = getResult(id);

  return renderOgImage({
    title: result?.title ?? siteConfig.name,
    description: result?.description,
  });
}
