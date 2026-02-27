export function getImageUrl(path?: string | null): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${import.meta.env.VITE_BACKEND_URL}/${path}`;
}

export function getLanguageName(code?: string | null): string | null {
  if (!code) return null;
  const map: Record<string, string> = {
    gb: "English", en: "English", es: "Spanish",
    fr: "French", de: "German", in: "Hindi", hi: "Hindi",
  };
  return map[code.toLowerCase()] || code.toUpperCase();
}

export function getDeviceType(): "mobile" | "tablet" | "desktop" {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "tablet";
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle/i.test(ua)) return "mobile";
  return "desktop";
}

export function getSessionId(): string {
  let id = sessionStorage.getItem("videoSessionId");
  if (!id) {
    id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("videoSessionId", id);
  }
  return id;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}