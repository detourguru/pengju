import { env } from "@/lib/env";

export const siteConfig = {
  name: "팽주 (Pengju)",
  description: "나만의 찻자리 메이트 & 탕수 타이머, 테이스팅 로그",
  url: env.NEXT_PUBLIC_SITE_URL,
  locale: "ko_KR",
  themeColor: "#7c9082",
} as const;
