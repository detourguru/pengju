import { env } from "@/lib/env";

export const KAKAO_SDK_URL =
  "https://t1.kakaocdn.net/kakao_js_sdk/2.8.3/kakao.min.js";
export const KAKAO_SDK_INTEGRITY =
  "sha384-oroumrnFVE0xtgqyDZJARgERibXg2C28380uaUZz2kHDS5CR7tu20eGiOU6GkTpy";

export function initKakao() {
  const appKey = env.NEXT_PUBLIC_KAKAO_JS_KEY;

  if (!appKey || !window.Kakao) {
    return false;
  }
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(appKey);
  }

  return true;
}

export function shareKakao(url: string) {
  if (!initKakao() || !window.Kakao) {
    throw new Error("카카오 SDK가 아직 준비되지 않았습니다.");
  }

  window.Kakao.Share.sendScrap({ requestUrl: url });
}
