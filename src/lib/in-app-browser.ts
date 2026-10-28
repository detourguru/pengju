const IN_APP_BROWSERS = {
  kakaotalk: /KAKAOTALK/i,
  instagram: /Instagram/i,
  facebook: /FBAN|FBAV/i,
  naver: /NAVER\(inapp/i,
  line: /\bLine\//i,
  everytime: /everytimeApp/i,
  daum: /DaumApps/i,
};

export type InAppBrowser = keyof typeof IN_APP_BROWSERS;

export function detectInAppBrowser(
  userAgent = navigator.userAgent,
): InAppBrowser | null {
  for (const [name, pattern] of Object.entries(IN_APP_BROWSERS)) {
    if (pattern.test(userAgent)) {
      return name as InAppBrowser;
    }
  }

  return null;
}

export function openInExternalBrowser(url = window.location.href) {
  if (/KAKAOTALK/i.test(navigator.userAgent)) {
    window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(url)}`;
    return true;
  }

  if (/Android/i.test(navigator.userAgent)) {
    const { host, pathname, search, hash, protocol } = new URL(url);
    const scheme = protocol.replace(":", "");
    window.location.href = `intent://${host}${pathname}${search}${hash}#Intent;scheme=${scheme};package=com.android.chrome;end`;
    return true;
  }

  return false;
}
