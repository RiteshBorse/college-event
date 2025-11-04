import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats } from '../../utils/api';
import { getUserId } from '../../utils/auth';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

const OrganiserDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const userId = getUserId();
      const response = await getDashboardStats(userId);
      
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Organiser Dashboard</h1>
          <p className="text-gray-400">Manage your events and track performance</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/organiser/add-event"
            className="bg-blue-600 hover:bg-blue-700 p-6 rounded-lg transition transform hover:scale-105 text-center"
          >
            <div className="text-4xl mb-3">➕</div>
            <h3 className="text-xl font-bold text-white mb-2">Add New Event</h3>
            <p className="text-blue-100">Create and publish a new event</p>
          </Link>

          <Link
            to="/organiser/events"
            className="bg-purple-600 hover:bg-purple-700 p-6 rounded-lg transition transform hover:scale-105 text-center"
          >
            <div className="text-4xl mb-3">📋</div>
            <h3 className="text-xl font-bold text-white mb-2">View All Events</h3>
            <p className="text-purple-100">Manage your existing events</p>
          </Link>
        </div>

        {/* Stats Overview */}
        {stats && (
          <>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-dark-card p-6 rounded-lg border border-gray-700">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stats.totalEvents}
                </div>
                <div className="text-gray-400 text-sm">Total Events</div>
              </div>

              <div className="bg-dark-card p-6 rounded-lg border border-gray-700">
                <div className="text-3xl mb-2">👥</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stats.totalParticipants}
                </div>
                <div className="text-gray-400 text-sm">Total Participants</div>
              </div>

              <div className="bg-dark-card p-6 rounded-lg border border-gray-700">
                <div className="text-3xl mb-2">📊</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stats.avgParticipantsPerEvent}
                </div>
                <div className="text-gray-400 text-sm">Avg Participants</div>
              </div>

              <div className="bg-dark-card p-6 rounded-lg border border-gray-700">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stats.mostPopularEvent?.participantCount || 0}
                </div>
                <div className="text-gray-400 text-sm">Most Popular Event</div>
              </div>
            </div>

            {/* Recent Events */}
            {stats.recentEvents && stats.recentEvents.length > 0 && (
              <div className="bg-dark-card rounded-lg p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4">Recent Events</h2>
                <div className="space-y-3">
                  {stats.recentEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex justify-between items-center p-4 bg-dark-bg rounded-lg border border-gray-700"
                    >
                      <div>
                        <h3 className="font-semibold text-white">{event.title}</h3>
                        <p className="text-sm text-gray-400">
                          {event.participantCount} participants
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        event.status === 'active' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-600 text-gray-200'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Event Status Distribution */}
            {stats.eventsByStatus && Object.keys(stats.eventsByStatus).length > 0 && (
              <div className="bg-dark-card rounded-lg p-6 border border-gray-700 mt-6">
                <h2 className="text-2xl font-bold text-white mb-4">Events by Status</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(stats.eventsByStatus).map(([status, count]) => (
                    <div key={status} className="text-center p-4 bg-dark-bg rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">{count}</div>
                      <div className="text-sm text-gray-400 capitalize">{status}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrganiserDashboard;
