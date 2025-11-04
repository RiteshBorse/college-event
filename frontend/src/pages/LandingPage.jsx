import { Link } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      const role = getUserRole();
      if (role === 'Organiser') {
        navigate('/organiser/dashboard');
      } else {
        navigate('/participant/dashboard');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">
            College Event Management
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Organize and participate in college events seamlessly. Connect with peers, discover exciting events, and make your college life memorable.
          </p>
          <Link
            to="/signin"
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition transform hover:scale-105"
          >
            Get Started →
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-dark-card p-8 rounded-lg border border-gray-700">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-3">For Organisers</h3>
            <p className="text-gray-400">
              Create and manage events, track participants, and analyze engagement with powerful dashboard tools.
            </p>
          </div>

          <div className="bg-dark-card p-8 rounded-lg border border-gray-700">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-white mb-3">For Participants</h3>
            <p className="text-gray-400">
              Discover exciting events, register with one click, and keep track of all your registered activities.
            </p>
          </div>

          <div className="bg-dark-card p-8 rounded-lg border border-gray-700">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-3">Easy to Use</h3>
            <p className="text-gray-400">
              Intuitive interface with dark mode, real-time updates, and seamless navigation for the best experience.
            </p>
          </div>
        </div>

        {/* Event Highlights */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            Featured Event Categories
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {['Technical', 'Cultural', 'Sports', 'Workshop'].map((category) => (
              <div
                key={category}
                className="bg-dark-card p-6 rounded-lg text-center border border-gray-700 hover:border-blue-500 transition cursor-pointer"
              >
                <div className="text-3xl mb-3">
                  {category === 'Technical' ? '💻' : 
                   category === 'Cultural' ? '🎭' : 
                   category === 'Sports' ? '⚽' : '📚'}
                </div>
                <h4 className="text-lg font-semibold text-white">{category}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
