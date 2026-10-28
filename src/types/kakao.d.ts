interface KakaoSDK {
  init(appKey: string): void;
  isInitialized(): boolean;
  Share: {
    sendScrap(settings: {
      requestUrl: string;
      templateId?: number;
      templateArgs?: Record<string, string>;
    }): void;
  };
}

interface Window {
  Kakao?: KakaoSDK;
}
