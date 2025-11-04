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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">All Events</h1>
          <p className="text-gray-400">Discover and register for exciting events</p>
        </div>

        {/* Filter */}
        <div className="mb-6 flex gap-3 flex-wrap">
          {['all', 'active', 'upcoming', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-dark-card text-gray-400 hover:bg-dark-hover border border-gray-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="bg-dark-card rounded-lg p-12 text-center border border-gray-700">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No Events Found</h3>
            <p className="text-gray-400">
              {filter === 'all' 
                ? "There are no events available at the moment." 
                : `No ${filter} events found.`}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const userId = getUserId();
              const isRegistered = event.participants && event.participants.includes(userId);
              
              return (
                <div key={event._id} className="relative">
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
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ✓ Registered
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Stats */}
        {filteredEvents.length > 0 && (
          <div className="mt-8 bg-dark-card rounded-lg p-6 border border-gray-700">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-1">
                  {events.length}
                </div>
                <div className="text-gray-400 text-sm">Total Events</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">
                  {events.filter(e => e.status === 'active').length}
                </div>
                <div className="text-gray-400 text-sm">Active Events</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">
                  {events.filter(e => e.status === 'upcoming').length}
                </div>
                <div className="text-gray-400 text-sm">Upcoming Events</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">
                  {events.filter(e => {
                    const userId = getUserId();
                    return e.participants && e.participants.includes(userId);
                  }).length}
                </div>
                <div className="text-gray-400 text-sm">Your Registrations</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
