import { useState, useRef } from 'react';

interface URLInputProps {
  onSubmit: (url: string) => void;
  isProcessing: boolean;
}

export default function URLInput({ onSubmit, isProcessing }: URLInputProps) {
  const [url, setUrl] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      inputRef.current?.focus();
    } catch {
      // Clipboard API not available
    }
  };

  const handleClear = () => {
    setUrl('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl opacity-30 group-hover:opacity-50 blur transition-all duration-300"></div>
        <div className="relative bg-gray-800/90 backdrop-blur-xl rounded-2xl p-2 border border-gray-700/50">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <i className="fas fa-link"></i>
              </div>
              <input
                ref={inputRef}
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste video URL here (YouTube, Vimeo, TikTok, direct links...)"
                className="w-full bg-gray-900/50 text-white placeholder-gray-500 rounded-xl py-4 pl-12 pr-20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                {url && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700/50"
                    title="Clear"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handlePaste}
                  className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700/50"
                  title="Paste from clipboard"
                >
                  <i className="fas fa-paste"></i>
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={!url.trim() || isProcessing}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 min-w-[140px]"
            >
              {isProcessing ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-download"></i>
                  <span>Download</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Supported platforms */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        <span className="text-xs text-gray-500 mr-2">Supported:</span>
        {[
          { name: 'YouTube', icon: '▶️' },
          { name: 'TikTok', icon: '🎵' },
          { name: 'Instagram', icon: '📸' },
          { name: 'Twitter', icon: '🐦' },
          { name: 'Vimeo', icon: '🎥' },
          { name: 'Facebook', icon: '👤' },
          { name: 'Reddit', icon: '🤖' },
          { name: 'Direct Links', icon: '🔗' },
        ].map((platform) => (
          <span
            key={platform.name}
            className="px-3 py-1 bg-gray-800/50 border border-gray-700/50 rounded-full text-xs text-gray-400 flex items-center gap-1.5"
          >
            <span>{platform.icon}</span>
            {platform.name}
          </span>
        ))}
      </div>
    </form>
  );
}
