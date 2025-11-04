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
    <nav className="bg-dark-card border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400 transition">
            🎓 College Events
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-300">
                  Welcome, <span className="text-blue-400 font-semibold">{user.name}</span>
                </span>
                <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                  {user.role}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
