// src/store/downloadManager.ts

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export type DownloadStatus = "pending" | "downloading" | "paused" | "completed" | "failed";

export interface DownloadState {
  downloadId: string;
  progress: number;
  status: DownloadStatus;
  downloadedBytes: number;
  totalBytes: number;
}

type Listener = (state: DownloadState) => void;

class DownloadManager {
  private states: Map<string, DownloadState> = new Map();
  private listeners: Map<string, Set<Listener>> = new Map();
  private controllers: Map<string, AbortController> = new Map();
  private eventSources: Map<string, EventSource> = new Map();

  getState(downloadId: string): DownloadState {
    return (
      this.states.get(downloadId) ?? {
        downloadId,
        progress: 0,
        status: "pending",
        downloadedBytes: 0,
        totalBytes: 0,
      }
    );
  }

  subscribe(downloadId: string, listener: Listener): () => void {
    if (!this.listeners.has(downloadId)) {
      this.listeners.set(downloadId, new Set());
    }
    this.listeners.get(downloadId)!.add(listener);
    // Immediately emit current state
    listener(this.getState(downloadId));
    return () => {
      this.listeners.get(downloadId)?.delete(listener);
    };
  }

  private emit(downloadId: string, partial: Partial<DownloadState>) {
    const prev = this.getState(downloadId);
    const next = { ...prev, ...partial };
    this.states.set(downloadId, next);
    this.listeners.get(downloadId)?.forEach((fn) => fn(next));
  }

  isActive(downloadId: string) {
    return this.controllers.has(downloadId);
  }

  async start(downloadId: string, token: string) {
    const current = this.getState(downloadId);
    if (current.status === "downloading") return; // already running

    // Start SSE for progress updates
    this.connectSSE(downloadId, token);

    // Trigger stream (with range if resuming)
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };
    if (current.downloadedBytes > 0) {
      headers["Range"] = `bytes=${current.downloadedBytes}-`;
    }

    const controller = new AbortController();
    this.controllers.set(downloadId, controller);
    this.emit(downloadId, { status: "downloading" });

    try {
      const res = await fetch(`${BACKEND_URL}/api/video-downloads/stream/${downloadId}`, {
        headers,
        signal: controller.signal,
      });

      if (!res.ok && res.status !== 206) {
        throw new Error(`HTTP ${res.status}`);
      }

      const total = parseInt(res.headers.get("Content-Length") || "0");
      const reader = res.body!.getReader();
      let downloaded = current.downloadedBytes;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        downloaded += value.byteLength;
        const progress = total > 0 ? Math.round((downloaded / total) * 100) : 0;
        this.emit(downloadId, { progress, downloadedBytes: downloaded, totalBytes: total });
      }

      this.emit(downloadId, { progress: 100, status: "completed" });
    } catch (err: any) {
      if (err.name === "AbortError") {
        this.emit(downloadId, { status: "paused" });
      } else {
        this.emit(downloadId, { status: "failed" });
      }
    } finally {
      this.controllers.delete(downloadId);
    }
  }

  pause(downloadId: string) {
    this.controllers.get(downloadId)?.abort();
    this.disconnectSSE(downloadId);
  }

  resume(downloadId: string, token: string) {
    this.start(downloadId, token);
  }

  private connectSSE(downloadId: string, token: string) {
    if (this.eventSources.has(downloadId)) return;
    const es = new EventSource(
      `${BACKEND_URL}/api/video-downloads/progress/${downloadId}?token=${token}`
    );
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        // SSE is secondary source of truth; only update status (stream fetch drives bytes)
        if (data.status === "completed" || data.status === "failed") {
          this.emit(downloadId, { status: data.status, progress: data.progress });
          es.close();
          this.eventSources.delete(downloadId);
        }
      } catch {}
    };
    es.onerror = () => {
      es.close();
      this.eventSources.delete(downloadId);
    };
    this.eventSources.set(downloadId, es);
  }

  private disconnectSSE(downloadId: string) {
    this.eventSources.get(downloadId)?.close();
    this.eventSources.delete(downloadId);
  }
}

// Singleton — lives for the entire app session
export const downloadManager = new DownloadManager();