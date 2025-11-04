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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Organiser
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Dashboard</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Manage your events, track performance, and create amazing campus experiences
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link
            to="/organiser/add-event"
            className="group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 hover:border-transparent transition-all duration-500 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative z-10 text-center">
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">➕</div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text transition-all duration-300">
                Add New Event
              </h3>
              <p className="text-gray-400 text-lg">Create and publish a new campus event</p>
              <div className="mt-4 text-blue-400 font-semibold flex items-center justify-center gap-2">
                <span>Get Started</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>

          <Link
            to="/organiser/events"
            className="group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 hover:border-transparent transition-all duration-500 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative z-10 text-center">
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">📋</div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text transition-all duration-300">
                View All Events
              </h3>
              <p className="text-gray-400 text-lg">Manage and track your existing events</p>
              <div className="mt-4 text-purple-400 font-semibold flex items-center justify-center gap-2">
                <span>Manage Events</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Overview */}
        {stats && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  icon: '🎯',
                  value: stats.totalEvents,
                  label: 'Total Events',
                  description: 'All events created',
                  color: 'from-blue-500 to-cyan-500',
                  bgColor: 'from-blue-500/10 to-cyan-500/10'
                },
                {
                  icon: '👥',
                  value: stats.totalParticipants,
                  label: 'Total Participants',
                  description: 'Across all events',
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'from-purple-500/10 to-pink-500/10'
                },
                {
                  icon: '📊',
                  value: stats.avgParticipantsPerEvent,
                  label: 'Avg Participants',
                  description: 'Per event',
                  color: 'from-green-500 to-emerald-500',
                  bgColor: 'from-green-500/10 to-emerald-500/10'
                },
                {
                  icon: '⭐',
                  value: stats.mostPopularEvent?.participantCount || 0,
                  label: 'Most Popular',
                  description: 'Event participants',
                  color: 'from-orange-500 to-red-500',
                  bgColor: 'from-orange-500/10 to-red-500/10'
                }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-gray-800/50 backdrop-blur-sm p-6 rounded-3xl border border-gray-700 hover:border-transparent transition-all duration-500 hover:scale-105"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="relative z-10 text-center">
                    <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className={`text-sm font-semibold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                      {stat.label}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {stat.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Events & Status Distribution */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Events */}
              {stats.recentEvents && stats.recentEvents.length > 0 && (
                <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-xl">
                        📅
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Recent Events</h2>
                        <p className="text-gray-400">Your latest activities</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {stats.recentEvents.map((event) => (
                        <div
                          key={event.id}
                          className="group flex justify-between items-center p-5 bg-gray-700/30 rounded-2xl border border-gray-600 hover:border-blue-500 transition-all duration-300 hover:scale-105"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                              {event.title}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {event.participantCount} participants
                            </p>
                          </div>
                          <span className={`px-4 py-2 rounded-full text-xs font-bold ${
                            event.status === 'active' 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25' 
                              : event.status === 'upcoming'
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
                              : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                          }`}>
                            {event.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Event Status Distribution */}
              {stats.eventsByStatus && Object.keys(stats.eventsByStatus).length > 0 && (
                <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-xl">
                        📊
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Events by Status</h2>
                        <p className="text-gray-400">Distribution overview</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(stats.eventsByStatus).map(([status, count]) => (
                        <div 
                          key={status} 
                          className="group text-center p-5 bg-gray-700/30 rounded-2xl border border-gray-600 hover:border-purple-500 transition-all duration-300 hover:scale-105"
                        >
                          <div className="text-2xl font-bold text-white mb-1">{count}</div>
                          <div className="text-sm text-gray-400 capitalize flex items-center justify-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              status === 'active' ? 'bg-green-500 animate-pulse' :
                              status === 'upcoming' ? 'bg-blue-500' :
                              status === 'completed' ? 'bg-gray-500' : 'bg-red-500'
                            }`}></div>
                            {status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Performance Tips */}
            <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 mt-8 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500 rounded-full blur-3xl opacity-10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-xl">
                    💡
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Performance Tips</h2>
                    <p className="text-gray-400">Boost your event engagement</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: '🎯',
                      title: 'Engaging Titles',
                      description: 'Create compelling event titles to attract more participants'
                    },
                    {
                      icon: '📸',
                      title: 'Quality Images',
                      description: 'Use high-quality visuals to make your events stand out'
                    },
                    {
                      icon: '📢',
                      title: 'Promote Early',
                      description: 'Start promotion well before the event date'
                    }
                  ].map((tip, index) => (
                    <div
                      key={index}
                      className="group p-5 rounded-2xl bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 text-center"
                    >
                      <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                        {tip.icon}
                      </div>
                      <h4 className="font-semibold text-white mb-2">{tip.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrganiserDashboard;