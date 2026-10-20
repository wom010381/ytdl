export default function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
          <i className="fas fa-download text-2xl text-white"></i>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          VidGrab
        </h1>
      </div>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto">
        Download videos from your favorite platforms in multiple formats and qualities.
        Fast, free, and easy to use.
      </p>
      <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
        <span className="flex items-center gap-2">
          <i className="fas fa-bolt text-yellow-400"></i> Lightning Fast
        </span>
        <span className="flex items-center gap-2">
          <i className="fas fa-shield-alt text-green-400"></i> Secure
        </span>
        <span className="flex items-center gap-2">
          <i className="fas fa-infinity text-purple-400"></i> Unlimited
        </span>
      </div>
    </header>
  );
}
