import * as z from "zod/mini";

export function parseEnv<T extends z.ZodMiniType>(
  schema: T,
  values: Record<string, string | undefined>,
): z.output<T> {
  const normalized = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      value === "" ? undefined : value,
    ]),
  );
  const result = schema.safeParse(normalized);

  if (!result.success) {
    throw new Error(
      `환경변수가 올바르지 않습니다.\n${z.prettifyError(result.error)}`,
    );
  }

  return result.data;
}

const vercelProductionUrl =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;

// NEXT_PUBLIC_ 값은 process.env.X 형태로 직접 참조해야 빌드 시 치환된다.
export const env = parseEnv(
  z.object({
    NEXT_PUBLIC_SITE_URL: z._default(z.url(), "http://localhost:3000"),
    NEXT_PUBLIC_SUPABASE_URL: z.optional(z.url()),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.optional(z.string()),
    NEXT_PUBLIC_KAKAO_JS_KEY: z.optional(z.string()),
  }),
  {
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL ||
      (vercelProductionUrl ? `https://${vercelProductionUrl}` : undefined),
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_KAKAO_JS_KEY: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
  },
);

export function getSupabaseEnv() {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase를 쓰려면 .env.local에 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 채워야 합니다.",
    );
  }

  return { url, anonKey };
}
