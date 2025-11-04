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
    <div className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Participant Dashboard</h1>
          <p className="text-gray-400">Explore and register for exciting events</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-linear-to-br from-blue-600 to-blue-800 p-6 rounded-lg">
            <div className="text-4xl mb-3">🎟️</div>
            <div className="text-3xl font-bold text-white mb-1">
              {loading ? '...' : registeredCount}
            </div>
            <div className="text-blue-100 text-sm">Registered Events</div>
          </div>

          <div className="bg-linear-to-br from-purple-600 to-purple-800 p-6 rounded-lg">
            <div className="text-4xl mb-3">🎯</div>
            <div className="text-3xl font-bold text-white mb-1">Active</div>
            <div className="text-purple-100 text-sm">Account Status</div>
          </div>

          <div className="bg-linear-to-br from-green-600 to-green-800 p-6 rounded-lg">
            <div className="text-4xl mb-3">⭐</div>
            <div className="text-3xl font-bold text-white mb-1">Ready</div>
            <div className="text-green-100 text-sm">To Join Events</div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to="/participant/events"
            className="bg-dark-card hover:bg-dark-hover p-8 rounded-lg border border-gray-700 hover:border-blue-500 transition group"
          >
            <div className="flex items-start gap-4">
              <div className="text-5xl">🎪</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition">
                  Browse All Events
                </h3>
                <p className="text-gray-400 mb-4">
                  Discover and register for upcoming events, workshops, and activities organized by your college.
                </p>
                <div className="text-blue-400 font-semibold flex items-center gap-2">
                  Explore Events
                  <span className="group-hover:translate-x-1 transition">→</span>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/participant/my-events"
            className="bg-dark-card hover:bg-dark-hover p-8 rounded-lg border border-gray-700 hover:border-purple-500 transition group"
          >
            <div className="flex items-start gap-4">
              <div className="text-5xl">📋</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition">
                  My Registrations
                </h3>
                <p className="text-gray-400 mb-4">
                  View all the events you've registered for and track your participation history.
                </p>
                <div className="text-purple-400 font-semibold flex items-center gap-2">
                  View My Events
                  <span className="group-hover:translate-x-1 transition">→</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-dark-card rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Tips</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <h4 className="font-semibold text-white mb-1">Stay Updated</h4>
                <p className="text-sm text-gray-400">
                  Check regularly for new events and early bird registrations
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-2xl">🎓</div>
              <div>
                <h4 className="font-semibold text-white mb-1">Participate Actively</h4>
                <p className="text-sm text-gray-400">
                  Engage in various events to enhance your college experience
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-2xl">🤝</div>
              <div>
                <h4 className="font-semibold text-white mb-1">Network & Connect</h4>
                <p className="text-sm text-gray-400">
                  Meet new people and build connections at events
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantDashboard;
