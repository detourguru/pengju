import "server-only";
import * as z from "zod/mini";

import { parseEnv } from "@/lib/env";

export const serverEnv = parseEnv(
  z.object({
    SUPABASE_SERVICE_ROLE_KEY: z.optional(z.string()),
  }),
  {
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
);
