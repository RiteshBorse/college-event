import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../../utils/api';
import { getUserId } from '../../utils/auth';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

const OrganiserEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getAllEvents();
      
      if (response.data.success) {
        const userId = getUserId();
        // Filter only events created by this organiser
        const myEvents = response.data.events.filter(
          event => event.user_id === userId
        );
        setEvents(myEvents);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return event.status === filter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            My Event
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Portfolio</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Manage, track, and analyze all your created events in one place
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            {
              count: events.length,
              label: 'Total Events',
              description: 'All time',
              icon: '📊',
              color: 'from-blue-500 to-cyan-500',
              bgColor: 'from-blue-500/10 to-cyan-500/10'
            },
            {
              count: events.filter(e => e.status === 'active').length,
              label: 'Active Now',
              description: 'Live events',
              icon: '🔥',
              color: 'from-green-500 to-emerald-500',
              bgColor: 'from-green-500/10 to-emerald-500/10'
            },
            {
              count: events.reduce((sum, e) => sum + (e.participants?.length || 0), 0),
              label: 'Total Participants',
              description: 'Across events',
              icon: '👥',
              color: 'from-purple-500 to-pink-500',
              bgColor: 'from-purple-500/10 to-pink-500/10'
            },
            {
              count: events.filter(e => e.status === 'upcoming').length,
              label: 'Coming Soon',
              description: 'Future events',
              icon: '⏰',
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
                  {stat.count}
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

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-white">
              Filter Events
            </h2>
            <div className="flex gap-2 flex-wrap">
              {[
                { key: 'all', label: 'All Events', icon: '🌐' },
                { key: 'active', label: 'Active', icon: '🔥' },
                { key: 'upcoming', label: 'Upcoming', icon: '⏰' },
                { key: 'completed', label: 'Completed', icon: '✅' },
                { key: 'cancelled', label: 'Cancelled', icon: '❌' }
              ].map((status) => (
                <button
                  key={status.key}
                  onClick={() => setFilter(status.key)}
                  className={`group flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    filter === status.key
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white border border-gray-700'
                  }`}
                >
                  <span className="text-lg">{status.icon}</span>
                  <span>{status.label}</span>
                  {filter === status.key && (
                    <span className="w-2 h-2 bg-white rounded-full ml-1"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filter Indicator */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-800/30 rounded-2xl border border-gray-700">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-gray-400 text-sm">
              Showing <span className="text-white font-semibold">{filteredEvents.length}</span> {filter === 'all' ? 'events' : filter + ' events'}
            </span>
          </div>
        </div>

        {/* Events Content */}
        {filteredEvents.length === 0 ? (
          <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 text-center border border-gray-700 max-w-2xl mx-auto overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-10"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-10"></div>
            
            <div className="relative z-10">
              <div className="text-8xl mb-6 transform hover:scale-110 transition duration-300">📭</div>
              <h3 className="text-3xl font-bold text-white mb-4">
                {filter === 'all' ? 'No Events Created' : `No ${filter} Events`}
              </h3>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                {filter === 'all' 
                  ? "Start your event management journey by creating your first amazing campus event." 
                  : `No ${filter} events found in your portfolio. Try creating new events or check other categories.`}
              </p>
              <Link
                to="/organiser/add-event"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
              >
                <span>Create New Event</span>
                <span className="ml-3 transform group-hover:translate-x-1 transition-transform">🚀</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Events Table */}
            <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700 overflow-hidden mb-8">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-10"></div>
              <div className="relative z-10">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="px-8 py-6 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">
                          Event Details
                        </th>
                        <th className="px-8 py-6 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-8 py-6 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">
                          Participants
                        </th>
                        <th className="px-8 py-6 text-left text-sm font-semibold text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredEvents.map((event) => (
                        <tr 
                          key={event._id} 
                          className="group hover:bg-gray-700/30 transition-all duration-300"
                        >
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              {event.image_url ? (
                                <img
                                  src={event.image_url}
                                  alt={event.title}
                                  className="w-14 h-14 rounded-2xl object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-2xl">
                                  🎯
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-white text-lg mb-1 group-hover:text-blue-400 transition-colors">
                                  {event.title}
                                </div>
                                <div className="text-gray-400 text-sm line-clamp-2 max-w-md">
                                  {event.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-gray-400 text-sm">
                              {formatDate(event.createdAt)}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold">
                                  {event.participants?.length || 0}
                                </span>
                              </div>
                              <div>
                                <div className="text-white font-semibold">
                                  {event.participants?.length || 0}
                                </div>
                                <div className="text-gray-400 text-xs">registered</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${
                                event.status === 'active' ? 'bg-green-500 animate-pulse' :
                                event.status === 'upcoming' ? 'bg-blue-500' :
                                event.status === 'completed' ? 'bg-gray-500' : 'bg-red-500'
                              }`}></div>
                              <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                                event.status === 'active' 
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25' 
                                  : event.status === 'upcoming'
                                  ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
                                  : event.status === 'completed'
                                  ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                                  : 'bg-gradient-to-r from-red-500 to-orange-600 text-white'
                              }`}>
                                {event.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  value: filteredEvents.length,
                  label: 'Events Showing',
                  description: 'Based on current filter',
                  icon: '📊',
                  color: 'from-blue-400 to-cyan-400'
                },
                {
                  value: filteredEvents.reduce((sum, e) => sum + (e.participants?.length || 0), 0),
                  label: 'Total Registrations',
                  description: 'In filtered events',
                  icon: '👥',
                  color: 'from-purple-400 to-pink-400'
                },
                {
                  value: filteredEvents.filter(e => e.status === 'active').length,
                  label: 'Active Events',
                  description: 'Currently running',
                  icon: '🔥',
                  color: 'from-green-400 to-emerald-400'
                }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-transparent transition-all duration-300 hover:scale-105"
                >
                  <div className="relative z-10 text-center">
                    <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
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
          </>
        )}

        {/* Bottom CTA */}
        {filteredEvents.length > 0 && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl text-blue-400 text-sm font-semibold">
              <span className="text-xl">💡</span>
              <span>Managing {filteredEvents.length} events like a pro! Keep creating amazing experiences.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganiserEvents;