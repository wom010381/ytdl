export default function Features() {
  const features = [
    {
      icon: 'fas fa-bolt',
      title: 'Lightning Fast',
      description: 'Download videos at maximum speed with our optimized servers.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Safe & Secure',
      description: 'No malware, no ads. Your privacy is our top priority.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: 'fas fa-film',
      title: 'Multiple Formats',
      description: 'Choose from MP4, WebM, MP3 and more in various qualities.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Works Everywhere',
      description: 'Use on any device - desktop, tablet, or mobile browser.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: 'fas fa-infinity',
      title: 'Unlimited Downloads',
      description: 'No daily limits. Download as many videos as you want.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: 'fas fa-code',
      title: 'Batch Download',
      description: 'Download entire playlists and channels with one click.',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold text-white text-center mb-8">
        Why Choose VidGrab?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group p-5 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 hover:bg-gray-800/60"
          >
            <div className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
              <i className={`${feature.icon} text-white text-sm`}></i>
            </div>
            <h4 className="font-medium text-white mb-1">{feature.title}</h4>
            <p className="text-sm text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
