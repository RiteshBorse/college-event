import { useState, useEffect } from 'react';
import { getMyParticipations } from '../../utils/api';
import { getUserId } from '../../utils/auth';
import LoadingSpinner from '../../components/LoadingSpinner';
import EventCard from '../../components/EventCard';
import toast from 'react-hot-toast';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      const userId = getUserId();
      const response = await getMyParticipations(userId);
      
      if (response.data.success) {
        setEvents(response.data.events);
      }
    } catch (error) {
      console.error('Error fetching registered events:', error);
      toast.error('Failed to load your events');
    } finally {
      setLoading(false);
    }
  };

  const upcomingEvents = events.filter(e => 
    e.status === 'active' || e.status === 'upcoming'
  );
  const pastEvents = events.filter(e => 
    e.status === 'completed'
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 to-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black">
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            My Event
            <span className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Journey</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Track your participation, relive memories, and stay updated on upcoming events
          </p>
        </div>

        {events.length === 0 ? (
          /* Empty State */
          <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 text-center border border-gray-700 max-w-2xl mx-auto overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-10"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-10"></div>
            
            <div className="relative z-10">
              <div className="text-8xl mb-6 transform hover:scale-110 transition duration-300">📭</div>
              <h3 className="text-3xl font-bold text-white mb-4">No Events Yet</h3>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                Your event journey hasn't started yet. Explore amazing events and begin creating unforgettable campus memories.
              </p>
              <a
                href="/participant/events"
                className="group relative inline-flex items-center px-8 py-4 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
              >
                <span>Discover Events</span>
                <span className="ml-3 transform group-hover:translate-x-1 transition-transform">→</span>
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-700 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  count: events.length,
                  label: 'Total Registered',
                  description: 'All events joined',
                  icon: '🎟️',
                  color: 'from-blue-500 to-cyan-500',
                  bgColor: 'from-blue-500/10 to-cyan-500/10'
                },
                {
                  count: upcomingEvents.length,
                  label: 'Upcoming Events',
                  description: 'Ready to attend',
                  icon: '⏰',
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'from-purple-500/10 to-pink-500/10'
                },
                {
                  count: pastEvents.length,
                  label: 'Completed Events',
                  description: 'Memories made',
                  icon: '✅',
                  color: 'from-green-500 to-emerald-500',
                  bgColor: 'from-green-500/10 to-emerald-500/10'
                }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 hover:border-transparent transition-all duration-500 hover:scale-105"
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${stat.bgColor} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="relative z-10 text-center">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">
                      {stat.count}
                    </div>
                    <div className={`text-lg font-semibold bg-linear-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                      {stat.label}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {stat.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-2">
                      Upcoming & <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Active</span>
                    </h2>
                    <p className="text-gray-400 text-lg">Events you're registered to attend</p>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold">
                    <span>📅</span>
                    <span>{upcomingEvents.length} events</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard
                      key={event._id}
                      event={event}
                      actionLabel="Registered ✓"
                      actionColor="green"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-2">
                      Event <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Memories</span>
                    </h2>
                    <p className="text-gray-400 text-lg">Events you've successfully completed</p>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-semibold">
                    <span>🏆</span>
                    <span>{pastEvents.length} completed</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event) => (
                    <EventCard
                      key={event._id}
                      event={event}
                      actionLabel="Completed"
                      actionColor="gray"
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Tips Section */}
        <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 mt-12 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500 rounded-full blur-3xl opacity-10"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-500 rounded-full blur-3xl opacity-10"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-linear-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-xl">
                👋
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Pro Tips for Participants</h3>
                <p className="text-gray-400">Make the most of your event experience</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: '📋',
                  title: 'Check Details',
                  description: 'Always verify event timings and requirements before attending',
                  color: 'from-blue-400 to-cyan-400'
                },
                {
                  icon: '🎫',
                  title: 'Bring College ID',
                  description: 'Carry your college ID card for verification at all events',
                  color: 'from-purple-400 to-pink-400'
                },
                {
                  icon: '💬',
                  title: 'Contact Organizers',
                  description: 'Reach out to event organizers if you have any questions',
                  color: 'from-green-400 to-emerald-400'
                }
              ].map((tip, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {tip.icon}
                  </div>
                  <h4 className={`text-lg font-semibold bg-linear-to-r ${tip.color} bg-clip-text text-transparent mb-2`}>
                    {tip.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        {events.length > 0 && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold">
              <span>✨</span>
              <span>Keep exploring new events to expand your campus experience!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;