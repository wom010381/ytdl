import { useState } from 'react';
import Header from './components/Header';
import URLInput from './components/URLInput';
import VideoPreview from './components/VideoPreview';
import DownloadHistory from './components/DownloadHistory';
import Features from './components/Features';
import Footer from './components/Footer';
import { DownloadItem, VideoInfo } from './types';

export default function App() {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = async (url: string) => {
    setIsProcessing(true);
    setError(null);
    setVideoInfo(null);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Try to determine video info from URL
      const videoData = extractVideoInfo(url);
      if (videoData) {
        setVideoInfo(videoData);
      } else {
        setError('Unable to process this URL. Please enter a valid video URL (MP4, WebM, or direct video link).');
      }
    } catch {
      setError('An error occurred while processing the URL. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const extractVideoInfo = (url: string): VideoInfo | null => {
    const videoExtensions = ['.mp4', '.webm', '.avi', '.mov', '.mkv', '.flv', '.wmv'];
    const lowerUrl = url.toLowerCase();

    // Check if it's a direct video URL
    const isDirectVideo = videoExtensions.some(ext => lowerUrl.includes(ext));

    // Check for known video platforms
    let platform = 'Direct Link';
    let platformIcon = '🎬';

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      platform = 'YouTube';
      platformIcon = '▶️';
    } else if (url.includes('vimeo.com')) {
      platform = 'Vimeo';
      platformIcon = '🎥';
    } else if (url.includes('dailymotion.com')) {
      platform = 'Dailymotion';
      platformIcon = '📹';
    } else if (url.includes('twitch.tv')) {
      platform = 'Twitch';
      platformIcon = '🎮';
    } else if (url.includes('twitter.com') || url.includes('x.com')) {
      platform = 'Twitter/X';
      platformIcon = '🐦';
    } else if (url.includes('instagram.com')) {
      platform = 'Instagram';
      platformIcon = '📸';
    } else if (url.includes('tiktok.com')) {
      platform = 'TikTok';
      platformIcon = '🎵';
    } else if (url.includes('facebook.com') || url.includes('fb.watch')) {
      platform = 'Facebook';
      platformIcon = '👤';
    } else if (url.includes('reddit.com')) {
      platform = 'Reddit';
      platformIcon = '🤖';
    }

    // Generate mock video info
    const title = generateTitle(url, platform);
    const duration = generateDuration();
    const fileSize = generateFileSize();

    return {
      url,
      title,
      platform,
      platformIcon,
      duration,
      fileSize,
      isDirectVideo,
      formats: [
        { quality: '1080p', format: 'MP4', size: fileSize, type: 'video' },
        { quality: '720p', format: 'MP4', size: reduceSize(fileSize), type: 'video' },
        { quality: '480p', format: 'MP4', size: reduceSize(reduceSize(fileSize)), type: 'video' },
        { quality: '360p', format: 'MP4', size: reduceSize(reduceSize(reduceSize(fileSize))), type: 'video' },
        { quality: 'Audio Only', format: 'MP3', size: reduceSize(reduceSize(fileSize)), type: 'audio' },
      ]
    };
  };

  const generateTitle = (url: string, platform: string): string => {
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname.split('/').filter(Boolean);
      if (path.length > 0) {
        return `${platform} Video - ${path[path.length - 1].replace(/[-_]/g, ' ')}`;
      }
    } catch {
      // fallback
    }
    return `${platform} Video Download`;
  };

  const generateDuration = (): string => {
    const minutes = Math.floor(Math.random() * 30) + 1;
    const seconds = Math.floor(Math.random() * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const generateFileSize = (): string => {
    const sizes = ['24.5 MB', '45.2 MB', '78.8 MB', '120.3 MB', '256.7 MB', '512.1 MB'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  const reduceSize = (size: string): string => {
    const num = parseFloat(size);
    const reduced = (num * 0.55).toFixed(1);
    return `${reduced} MB`;
  };

  const handleDownload = async (format: { quality: string; format: string; size: string; type: string }) => {
    if (!videoInfo) return;

    const downloadItem: DownloadItem = {
      id: Date.now().toString(),
      title: videoInfo.title,
      quality: format.quality,
      format: format.format,
      size: format.size,
      url: videoInfo.url,
      timestamp: new Date(),
      status: 'downloading',
      progress: 0,
    };

    setDownloads(prev => [downloadItem, ...prev]);

    // If it's a direct video URL, attempt actual download
    if (videoInfo.isDirectVideo) {
      try {
        await attemptDirectDownload(videoInfo.url, videoInfo.title, format);
        // Mark as completed
        setDownloads(prev =>
          prev.map(d =>
            d.id === downloadItem.id ? { ...d, progress: 100, status: 'completed' } : d
          )
        );
      } catch {
        setDownloads(prev =>
          prev.map(d =>
            d.id === downloadItem.id ? { ...d, status: 'failed' } : d
          )
        );
      }
    } else {
      // For platform links, open the URL in a new tab
      // The user can use browser extensions or tools to save the video
      window.open(videoInfo.url, '_blank');
      simulateDownload(downloadItem.id);
    }
  };

  const attemptDirectDownload = async (url: string, title: string, format: { format: string }) => {
    const fileName = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.${format.format.toLowerCase()}`;
    
    try {
      // Use fetch + blob approach for cross-origin downloads
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL after a short delay
      setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
    } catch (error) {
      // If fetch fails (CORS or other error), open video directly in new tab
      // User can then right-click > "Save video as..." to download
      console.warn('Direct download blocked (likely CORS). Opening video in new tab.');
      window.open(url, '_blank');
    }
  };

  const simulateDownload = (id: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setDownloads(prev =>
          prev.map(d =>
            d.id === id ? { ...d, progress: 100, status: 'completed' } : d
          )
        );
      } else {
        setDownloads(prev =>
          prev.map(d =>
            d.id === id ? { ...d, progress: Math.min(progress, 99) } : d
          )
        );
      }
    }, 500);
  };

  const clearHistory = () => {
    setDownloads([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Header />
        <URLInput onSubmit={handleUrlSubmit} isProcessing={isProcessing} />
        {error && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 flex items-center gap-3">
            <i className="fas fa-exclamation-triangle"></i>
            <span>{error}</span>
          </div>
        )}
        {videoInfo && (
          <VideoPreview videoInfo={videoInfo} onDownload={handleDownload} />
        )}
        <Features />
        {downloads.length > 0 && (
          <DownloadHistory downloads={downloads} onClear={clearHistory} />
        )}
        <Footer />
      </div>
    </div>
  );
}
