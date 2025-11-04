import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMyParticipations } from '../../utils/api';
import { getUserId } from '../../utils/auth';
import toast from 'react-hot-toast';

const ParticipantDashboard = () => {
  const [registeredCount, setRegisteredCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegisteredEvents();
  }, []);

  const fetchRegisteredEvents = async () => {
    try {
      const userId = getUserId();
      const response = await getMyParticipations(userId);
      
      if (response.data.success) {
        setRegisteredCount(response.data.events.length);
      }
    } catch (error) {
      console.error('Error fetching registered events:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black">
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Welcome to Your
            <span className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Dashboard</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore, register, and track your journey through amazing college events and activities
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 hover:border-blue-500 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🎟️</div>
              <div className="text-4xl font-bold text-white mb-2">
                {loading ? (
                  <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  registeredCount
                )}
              </div>
              <div className="text-blue-300 text-lg font-semibold">Registered Events</div>
              <div className="text-blue-400/70 text-sm mt-2">Active participations</div>
            </div>
          </div>

          <div className="group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 hover:border-purple-500 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🎯</div>
              <div className="text-4xl font-bold text-white mb-2">Active</div>
              <div className="text-purple-300 text-lg font-semibold">Account Status</div>
              <div className="text-purple-400/70 text-sm mt-2">Ready to participate</div>
            </div>
          </div>

          <div className="group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 hover:border-green-500 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-linear-to-br from-green-500/10 to-emerald-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">⭐</div>
              <div className="text-4xl font-bold text-white mb-2">Ready</div>
              <div className="text-green-300 text-lg font-semibold">To Join Events</div>
              <div className="text-green-400/70 text-sm mt-2">Explore opportunities</div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Link
            to="/participant/events"
            className="group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 hover:border-transparent transition-all duration-500 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-start gap-6">
                <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300">🎪</div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-transparent bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text transition-all duration-300">
                    Browse All Events
                  </h3>
                  <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                    Discover and register for upcoming events, workshops, and activities organized by your college and student communities.
                  </p>
                  <div className="flex items-center text-blue-400 font-bold text-lg">
                    <span>Explore Events</span>
                    <span className="ml-3 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/participant/my-events"
            className="group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 hover:border-transparent transition-all duration-500 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-start gap-6">
                <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300">📋</div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-transparent bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text transition-all duration-300">
                    My Registrations
                  </h3>
                  <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                    View all the events you've registered for, track your participation history, and manage your upcoming activities.
                  </p>
                  <div className="flex items-center text-purple-400 font-bold text-lg">
                    <span>View My Events</span>
                    <span className="ml-3 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Tips Section */}
        <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-green-500 rounded-full blur-3xl opacity-10"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-yellow-500 rounded-full blur-3xl opacity-10"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">
              Pro <span className="bg-linear-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">Tips</span> for Success
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '💡',
                  title: 'Stay Updated',
                  description: 'Check regularly for new events and early bird registrations to never miss out on opportunities.',
                  color: 'from-blue-400 to-cyan-400'
                },
                {
                  icon: '🎓',
                  title: 'Participate Actively',
                  description: 'Engage in various events to enhance your college experience and build valuable skills.',
                  color: 'from-purple-400 to-pink-400'
                },
                {
                  icon: '🤝',
                  title: 'Network & Connect',
                  description: 'Meet new people, build connections, and expand your professional network at events.',
                  color: 'from-green-400 to-emerald-400'
                }
              ].map((tip, index) => (
                <div
                  key={index}
                  className="group text-center p-6 rounded-2xl bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {tip.icon}
                  </div>
                  <h3 className={`text-xl font-bold bg-linear-to-r ${tip.color} bg-clip-text text-transparent mb-3`}>
                    {tip.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events Preview */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold">
            <span>✨</span>
            <span>New events added weekly - Stay tuned!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantDashboard;