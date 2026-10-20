export interface VideoFormat {
  quality: string;
  format: string;
  size: string;
  type: 'video' | 'audio';
}

export interface VideoInfo {
  url: string;
  title: string;
  platform: string;
  platformIcon: string;
  duration: string;
  fileSize: string;
  isDirectVideo: boolean;
  formats: VideoFormat[];
}

export interface DownloadItem {
  id: string;
  title: string;
  quality: string;
  format: string;
  size: string;
  url: string;
  timestamp: Date;
  status: 'downloading' | 'completed' | 'failed';
  progress: number;
}
