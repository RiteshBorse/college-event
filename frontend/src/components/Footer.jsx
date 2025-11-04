const Footer = () => {
  return (
    <footer className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 mt-auto relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">🎓</span>
              </div>
              <span className="text-xl font-bold text-white">CollegeEvents</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Transforming campus life through seamless event management. Connect, create, and celebrate with your college community.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: '📘', label: 'Facebook' },
                { icon: '📷', label: 'Instagram' },
                { icon: '🐦', label: 'Twitter' },
                { icon: '💼', label: 'LinkedIn' }
              ].map((social, index) => (
                <button
                  key={index}
                  className="w-10 h-10 bg-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  title={social.label}
                >
                  <span className="text-sm">{social.icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <div className="space-y-3">
              {[
                { name: 'Browse Events', href: '/events' },
                { name: 'Create Event', href: '/create-event' },
                { name: 'Dashboard', href: '/dashboard' },
                { name: 'Student Clubs', href: '/clubs' }
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-2 transform group"
                >
                  <span className="flex items-center">
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <div className="space-y-3">
              {[
                { name: 'Help Center', href: '#' },
                { name: 'Community Guidelines', href: '#' },
                { name: 'Event Planning Guide', href: '#' },
                { name: 'API Documentation', href: '#' }
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-2 transform group"
                >
                  <span className="flex items-center">
                    <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400 group">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                  <span className="text-sm">📧</span>
                </div>
                <span className="group-hover:text-white transition-colors">hello@collegeevents.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 group">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <span className="text-sm">📱</span>
                </div>
                <span className="group-hover:text-white transition-colors">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 group">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                  <span className="text-sm">🏢</span>
                </div>
                <span className="group-hover:text-white transition-colors">Campus Innovation Center</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold">CollegeEvents</span>. All rights reserved.
            </div>
            
            <div className="flex gap-8 text-gray-400 text-sm">
              {[
                { name: 'Privacy Policy', href: '#' },
                { name: 'Terms of Service', href: '#' },
                { name: 'Cookie Policy', href: '#' },
                { name: 'Security', href: '#' }
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="hover:text-white transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Stay Updated</h4>
              <p className="text-gray-400 text-sm">Get the latest event updates and campus news</p>
            </div>
            <div className="flex space-x-3 flex-1 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;