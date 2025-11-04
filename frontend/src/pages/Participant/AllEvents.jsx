import { useState, useEffect } from 'react';
import { getAllEvents, participateInEvent } from '../../utils/api';
import { getUserId } from '../../utils/auth';
import LoadingSpinner from '../../components/LoadingSpinner';
import EventCard from '../../components/EventCard';
import toast from 'react-hot-toast';

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [registering, setRegistering] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getAllEvents();
      
      if (response.data.success) {
        setEvents(response.data.events);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event) => {
    const userId = getUserId();
    
    // Check if already registered
    if (event.participants && event.participants.includes(userId)) {
      toast.error('You are already registered for this event');
      return;
    }

    setRegistering(event._id);

    try {
      const response = await participateInEvent(event._id, userId);
      
      if (response.data.success) {
        toast.success('Successfully registered for the event!');
        // Update local state
        setEvents(events.map(e => 
          e._id === event._id 
            ? { ...e, participants: [...(e.participants || []), userId] }
            : e
        ));
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      toast.error('Failed to register. Please try again.');
    } finally {
      setRegistering(null);
    }
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return event.status === filter;
  });

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
            Discover Amazing
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Events</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore, register, and participate in exciting campus events that match your interests
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            {
              count: events.length,
              label: 'Total Events',
              description: 'All available',
              icon: '🎪',
              color: 'from-blue-500 to-cyan-500',
              bgColor: 'from-blue-500/10 to-cyan-500/10'
            },
            {
              count: events.filter(e => e.status === 'active').length,
              label: 'Active Now',
              description: 'Happening live',
              icon: '🔥',
              color: 'from-red-500 to-orange-500',
              bgColor: 'from-red-500/10 to-orange-500/10'
            },
            {
              count: events.filter(e => e.status === 'upcoming').length,
              label: 'Coming Soon',
              description: 'Get ready',
              icon: '⏰',
              color: 'from-purple-500 to-pink-500',
              bgColor: 'from-purple-500/10 to-pink-500/10'
            },
            {
              count: events.filter(e => {
                const userId = getUserId();
                return e.participants && e.participants.includes(userId);
              }).length,
              label: 'Your Events',
              description: 'Registered',
              icon: '🎟️',
              color: 'from-green-500 to-emerald-500',
              bgColor: 'from-green-500/10 to-emerald-500/10'
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
              Filter by Status
            </h2>
            <div className="flex gap-2 flex-wrap">
              {[
                { key: 'all', label: 'All Events', icon: '🌐' },
                { key: 'active', label: 'Active', icon: '🔥' },
                { key: 'upcoming', label: 'Upcoming', icon: '⏰' },
                { key: 'completed', label: 'Completed', icon: '✅' }
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

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 text-center border border-gray-700 max-w-2xl mx-auto overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-10"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-10"></div>
            
            <div className="relative z-10">
              <div className="text-8xl mb-6 transform hover:scale-110 transition duration-300">🔍</div>
              <h3 className="text-3xl font-bold text-white mb-4">No Events Found</h3>
              <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto leading-relaxed">
                {filter === 'all' 
                  ? "We're preparing amazing events for you. Check back soon for exciting opportunities!" 
                  : `No ${filter} events available at the moment. Try exploring all events instead.`}
              </p>
              {filter !== 'all' && (
                <button
                  onClick={() => setFilter('all')}
                  className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <span>View All Events</span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const userId = getUserId();
              const isRegistered = event.participants && event.participants.includes(userId);
              
              return (
                <div key={event._id} className="relative group">
                  <EventCard
                    event={event}
                    onAction={!isRegistered ? handleRegister : null}
                    actionLabel={
                      registering === event._id 
                        ? 'Registering...' 
                        : isRegistered 
                        ? 'Already Registered' 
                        : 'Register Now'
                    }
                    actionColor={isRegistered ? 'green' : 'blue'}
                  />
                  {isRegistered && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      ✓ Registered
                    </div>
                  )}
                  {event.status === 'active' && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      LIVE
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        {filteredEvents.length > 0 && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl text-blue-400 text-sm font-semibold">
              <span className="text-xl">✨</span>
              <span>Found {filteredEvents.length} amazing events! Register now to secure your spot.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;