export default function Footer() {
  return (
    <footer className="text-center py-8 border-t border-gray-800/50">
      <div className="flex items-center justify-center gap-2 mb-3">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <i className="fas fa-download text-sm text-white"></i>
        </div>
        <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          VidGrab
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        The fastest way to download videos from the web.
      </p>
      <div className="flex items-center justify-center gap-4 text-gray-500 text-xs">
        <span>© 2026 VidGrab</span>
        <span>•</span>
        <span className="hover:text-purple-400 cursor-pointer transition-colors">Privacy Policy</span>
        <span>•</span>
        <span className="hover:text-purple-400 cursor-pointer transition-colors">Terms of Service</span>
        <span>•</span>
        <span className="hover:text-purple-400 cursor-pointer transition-colors">Contact</span>
      </div>
      <p className="text-xs text-gray-600 mt-4">
        Please respect copyright laws. Only download content you have permission to use.
      </p>
    </footer>
  );
}
