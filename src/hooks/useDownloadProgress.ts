// src/hooks/useDownloadProgress.ts
import { useEffect, useState } from "react";
import { downloadManager, DownloadState } from "../store/slice/downloadManager";

export function useDownloadProgress(downloadId: string | null): DownloadState & {
  pause: () => void;
  resume: () => void;
  start: () => void;
} {
  const [state, setState] = useState<DownloadState>(
    downloadId
      ? downloadManager.getState(downloadId)
      : { downloadId: "", progress: 0, status: "pending", downloadedBytes: 0, totalBytes: 0 }
  );

  useEffect(() => {
    if (!downloadId) return;
    const unsub = downloadManager.subscribe(downloadId, setState);
    return unsub;
  }, [downloadId]);

  const token = () => localStorage.getItem("fitnessFlicksToken") || "";

  return {
    ...state,
    start: () => downloadId && downloadManager.start(downloadId, token()),
    pause: () => downloadId && downloadManager.pause(downloadId),
    resume: () => downloadId && downloadManager.resume(downloadId, token()),
  };
}