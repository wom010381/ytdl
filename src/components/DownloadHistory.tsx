import { DownloadItem } from '../types';

interface DownloadHistoryProps {
  downloads: DownloadItem[];
  onClear: () => void;
}

export default function DownloadHistory({ downloads, onClear }: DownloadHistoryProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <i className="fas fa-history text-purple-400"></i>
          Download History
        </h3>
        <button
          onClick={onClear}
          className="text-sm text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1.5"
        >
          <i className="fas fa-trash-alt text-xs"></i>
          Clear All
        </button>
      </div>
      <div className="space-y-3">
        {downloads.map((download) => (
          <div
            key={download.id}
            className="bg-gray-800/60 backdrop-blur-xl rounded-xl border border-gray-700/50 p-4 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  download.status === 'completed'
                    ? 'bg-green-500/20 text-green-400'
                    : download.status === 'downloading'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  <i className={`fas ${
                    download.status === 'completed'
                      ? 'fa-check'
                      : download.status === 'downloading'
                      ? 'fa-spinner fa-spin'
                      : 'fa-times'
                  }`}></i>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{download.title}</p>
                  <p className="text-xs text-gray-500">
                    {download.quality} • {download.format} • {download.size}
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                {download.timestamp.toLocaleTimeString()}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  download.status === 'completed'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}
                style={{ width: `${download.progress}%` }}
              ></div>
            </div>
            {download.status === 'downloading' && (
              <p className="text-xs text-gray-500 mt-1.5">
                Downloading... {Math.round(download.progress)}%
              </p>
            )}
            {download.status === 'completed' && (
              <p className="text-xs text-green-400 mt-1.5 flex items-center gap-1">
                <i className="fas fa-check-circle"></i>
                Download complete
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
