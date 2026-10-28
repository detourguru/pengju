"use client";

import { useEffect } from "react";

import { track } from "@/lib/analytics";

export function TrackResultView({ resultId }: { resultId: string }) {
  useEffect(() => {
    track("result_view", { resultId });
  }, [resultId]);

  return null;
}
