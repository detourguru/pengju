import { track as vercelTrack } from "@vercel/analytics";

type AnalyticsEvents = {
  start_click: undefined;
  result_view: { resultId: string };
  share_click: { method: "kakao" | "copy" | "native" };
};

export function track<E extends keyof AnalyticsEvents>(
  event: E,
  ...[properties]: AnalyticsEvents[E] extends undefined
    ? []
    : [AnalyticsEvents[E]]
) {
  vercelTrack(event, properties);
}
