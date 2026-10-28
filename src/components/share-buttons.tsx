"use client";

import { Link2, MessageCircle, Share2 } from "lucide-react";
import Script from "next/script";
import { useSyncExternalStore } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";
import { env } from "@/lib/env";
import {
  initKakao,
  KAKAO_SDK_INTEGRITY,
  KAKAO_SDK_URL,
  shareKakao,
} from "@/lib/kakao";
import { canNativeShare, copyText, nativeShare } from "@/lib/share";

const subscribeNothing = () => () => {};

export function ShareButtons({
  path,
  title,
  text,
}: {
  path: string;
  title: string;
  text?: string;
}) {
  const url = new URL(path, siteConfig.url).toString();
  const kakaoEnabled = Boolean(env.NEXT_PUBLIC_KAKAO_JS_KEY);
  // 서버 렌더링 결과와 어긋나지 않게 hydration 이후에만 지원 여부를 반영한다.
  const nativeShareSupported = useSyncExternalStore(
    subscribeNothing,
    canNativeShare,
    () => false,
  );

  const handleKakao = () => {
    track("share_click", { method: "kakao" });
    try {
      shareKakao(url);
    } catch {
      toast.error("카카오톡 공유를 준비 중입니다. 잠시 후 다시 눌러 주세요.");
    }
  };

  const handleCopy = async () => {
    track("share_click", { method: "copy" });
    try {
      await copyText(url);
      toast.success("링크를 복사했습니다.");
    } catch {
      toast.error("링크를 복사하지 못했습니다.");
    }
  };

  const handleNativeShare = async () => {
    track("share_click", { method: "native" });
    try {
      await nativeShare({ title, text, url });
    } catch {
      toast.error("공유하지 못했습니다.");
    }
  };

  return (
    <div className="flex w-full flex-col gap-2">
      {kakaoEnabled ? (
        <>
          <Script
            src={KAKAO_SDK_URL}
            integrity={KAKAO_SDK_INTEGRITY}
            crossOrigin="anonymous"
            strategy="lazyOnload"
            onLoad={initKakao}
          />
          <Button
            className="bg-[#FEE500] text-black/85 hover:bg-[#FEE500]/90"
            onClick={handleKakao}
          >
            <MessageCircle />
            카카오톡 공유
          </Button>
        </>
      ) : null}
      <Button variant="outline" onClick={handleCopy}>
        <Link2 />
        링크 복사
      </Button>
      {nativeShareSupported ? (
        <Button variant="outline" onClick={handleNativeShare}>
          <Share2 />
          다른 앱으로 공유
        </Button>
      ) : null}
    </div>
  );
}
