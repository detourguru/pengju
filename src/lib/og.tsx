import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const pretendardBold = readFile(
  join(
    process.cwd(),
    "node_modules/pretendard/dist/web/static/woff-subset/Pretendard-Bold.subset.woff",
  ),
);

export async function renderOgImage({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#ffffff",
        color: "#0a0a0a",
        fontFamily: "Pretendard",
      }}
    >
      <div style={{ fontSize: 32, color: "#737373" }}>{siteConfig.name}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 80, lineHeight: 1.2 }}>{title}</div>
        {description ? (
          <div style={{ fontSize: 40, color: "#737373" }}>{description}</div>
        ) : null}
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        {
          name: "Pretendard",
          data: await pretendardBold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
