export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    copyWithExecCommand(text);
  }
}

function copyWithExecCommand(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) {
    throw new Error("클립보드에 복사하지 못했습니다.");
  }
}

export function canNativeShare() {
  return (
    typeof navigator !== "undefined" && typeof navigator.share === "function"
  );
}

export async function nativeShare(data: ShareData) {
  try {
    await navigator.share(data);
    return true;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return false;
    }
    throw error;
  }
}
