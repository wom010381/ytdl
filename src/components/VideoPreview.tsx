import { VideoInfo, VideoFormat } from '../types';

interface VideoPreviewProps {
  videoInfo: VideoInfo;
  onDownload: (format: VideoFormat) => void;
}

export default function VideoPreview({ videoInfo, onDownload }: VideoPreviewProps) {
  return (
    <div className="mb-8 animate-fade-in">
      <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
        {/* Video Info Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 border border-purple-500/30">
              {videoInfo.platformIcon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white truncate mb-1">
                {videoInfo.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <i className="fas fa-globe text-purple-400"></i>
                  {videoInfo.platform}
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fas fa-clock text-pink-400"></i>
                  {videoInfo.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fas fa-file text-green-400"></i>
                  {videoInfo.fileSize}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2 truncate max-w-full">
                {videoInfo.url}
              </p>
            </div>
          </div>
        </div>

        {/* Format Selection */}
        <div className="p-6">
          <h4 className="text-sm font-medium text-gray-300 mb-4 flex items-center gap-2">
            <i className="fas fa-list-ul text-purple-400"></i>
            Available Formats
          </h4>
          <div className="grid gap-3">
            {videoInfo.formats.map((format, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-700/30 hover:border-purple-500/50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    format.type === 'video'
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-pink-500/20 text-pink-400'
                  }`}>
                    <i className={`fas ${format.type === 'video' ? 'fa-video' : 'fa-music'}`}></i>
                  </div>
                  <div>
                    <p className="font-medium text-white">{format.quality}</p>
                    <p className="text-xs text-gray-500">{format.format} • {format.size}</p>
                  </div>
                </div>
                <button
                  onClick={() => onDownload(format)}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30 opacity-80 group-hover:opacity-100"
                >
                  <i className="fas fa-download text-xs"></i>
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Info Notice */}
        {videoInfo.isDirectVideo && (
          <div className="px-6 pb-6">
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3">
              <i className="fas fa-check-circle text-green-400"></i>
              <p className="text-sm text-green-300">
                Direct video link detected! Your download will start immediately.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
