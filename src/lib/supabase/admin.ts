import "server-only";
import { createClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "@/lib/env";
import { serverEnv } from "@/lib/env.server";
import type { Database } from "@/types/database.types";

export function createAdminClient() {
  const { url } = getSupabaseEnv();
  const serviceRoleKey = serverEnv.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error(
      "admin 클라이언트를 쓰려면 .env.local에 SUPABASE_SERVICE_ROLE_KEY를 채워야 합니다.",
    );
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
