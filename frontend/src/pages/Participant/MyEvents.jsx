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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Registered Events</h1>
          <p className="text-gray-400">All events you've registered for</p>
        </div>

        {events.length === 0 ? (
          <div className="bg-dark-card rounded-lg p-12 text-center border border-gray-700">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-white mb-2">No Registered Events</h3>
            <p className="text-gray-400 mb-6">
              You haven't registered for any events yet. Start exploring!
            </p>
            <a
              href="/participant/events"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Browse Events
            </a>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-dark-card p-6 rounded-lg border border-gray-700">
                <div className="text-3xl mb-2">🎟️</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {events.length}
                </div>
                <div className="text-gray-400 text-sm">Total Registered</div>
              </div>

              <div className="bg-dark-card p-6 rounded-lg border border-gray-700">
                <div className="text-3xl mb-2">⏰</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {upcomingEvents.length}
                </div>
                <div className="text-gray-400 text-sm">Upcoming Events</div>
              </div>

              <div className="bg-dark-card p-6 rounded-lg border border-gray-700">
                <div className="text-3xl mb-2">✅</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {pastEvents.length}
                </div>
                <div className="text-gray-400 text-sm">Completed Events</div>
              </div>
            </div>

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Upcoming & Active Events
                </h2>
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
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Past Events
                </h2>
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
        <div className="mt-8 bg-dark-card rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-3">👋 Remember</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Make sure to check event details and timings before attending</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Carry your college ID card to all events</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Contact organizers if you have any questions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
