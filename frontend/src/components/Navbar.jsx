import { Link, useNavigate } from 'react-router-dom';
import { getUser, removeUser } from '../utils/auth';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    removeUser();
    toast.success('Logged out successfully');
    navigate('/signin');
  };

  return (
    <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="group flex items-center space-x-3 text-2xl font-bold text-white hover:text-transparent bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text transition-all duration-300"
          >
            <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-white">🎓</span>
            </div>
            <span>CollegeEvents</span>
          </Link>
          
          {/* Center Navigation Links for Authenticated Users */}
          {user && (
            <div className="flex space-x-8">
              <Link
                to={user.role === 'Organiser' ? '/organiser/dashboard' : '/participant/dashboard'}
                className="text-gray-300 hover:text-white font-medium transition-colors duration-300 relative group"
              >
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              <Link
                to="/events"
                className="text-gray-300 hover:text-white font-medium transition-colors duration-300 relative group"
              >
                Events
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              {user.role === 'Organiser' && (
                <Link
                  to="/organiser/create-event"
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-300 relative group"
                >
                  Create Event
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              )}
              
              <Link
                to="/profile"
                className="text-gray-300 hover:text-white font-medium transition-colors duration-300 relative group"
              >
                Profile
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          )}
          
          {/* Right Side - User Info & Buttons */}
          <div className="flex items-center gap-6">
            {user ? (
              <>
                {/* User Welcome */}
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <div className="text-gray-300 text-sm">Welcome back</div>
                    <div className="text-white font-semibold">{user.name}</div>
                  </div>
                  
                  {/* Role Badge */}
                  <div className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                    user.role === 'Organiser' 
                      ? 'bg-linear-to-r from-purple-500 to-pink-600 text-white' 
                      : 'bg-linear-to-r from-blue-500 to-cyan-600 text-white'
                  }`}>
                    {user.role}
                  </div>
                  
                  {/* User Avatar */}
                  <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="group relative px-6 py-2 bg-linear-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>Logout</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-red-600 to-orange-700 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                  </button>
                </div>
              </>
            ) : (
              /* Sign In Button for non-authenticated users */
              <Link
                to="/signin"
                className="group relative px-8 py-3 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Get Started</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-700 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
    </nav>
  );
};

export default Navbar;