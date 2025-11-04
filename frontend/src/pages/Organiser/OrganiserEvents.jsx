import { useState, useEffect } from 'react';
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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Events</h1>
          <p className="text-gray-400">Manage all your created events</p>
        </div>

        {/* Filter */}
        <div className="mb-6 flex gap-3 flex-wrap">
          {['all', 'active', 'upcoming', 'completed', 'cancelled'].map((status) => (
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

        {/* Events Table */}
        {filteredEvents.length === 0 ? (
          <div className="bg-dark-card rounded-lg p-12 text-center border border-gray-700">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-white mb-2">No Events Found</h3>
            <p className="text-gray-400 mb-6">
              {filter === 'all' 
                ? "You haven't created any events yet." 
                : `No ${filter} events found.`}
            </p>
            <a
              href="/organiser/add-event"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Create Your First Event
            </a>
          </div>
        ) : (
          <div className="bg-dark-card rounded-lg shadow-xl overflow-hidden border border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-bg">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Participants
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredEvents.map((event) => (
                    <tr key={event._id} className="hover:bg-dark-hover transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {event.image_url && (
                            <img
                              src={event.image_url}
                              alt={event.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <div className="font-semibold text-white">{event.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-400 text-sm line-clamp-2 max-w-xs">
                          {event.description}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-400 text-sm">
                          {formatDate(event.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">
                            {event.participants?.length || 0}
                          </span>
                          <span className="text-gray-400 text-sm">registered</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          event.status === 'active' 
                            ? 'bg-green-600 text-white' 
                            : event.status === 'upcoming'
                            ? 'bg-blue-600 text-white'
                            : event.status === 'completed'
                            ? 'bg-gray-600 text-white'
                            : 'bg-red-600 text-white'
                        }`}>
                          {event.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Summary */}
        {filteredEvents.length > 0 && (
          <div className="mt-6 bg-dark-card rounded-lg p-6 border border-gray-700">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-1">
                  {filteredEvents.length}
                </div>
                <div className="text-gray-400 text-sm">Total Events</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">
                  {filteredEvents.reduce((sum, e) => sum + (e.participants?.length || 0), 0)}
                </div>
                <div className="text-gray-400 text-sm">Total Registrations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">
                  {filteredEvents.filter(e => e.status === 'active').length}
                </div>
                <div className="text-gray-400 text-sm">Active Events</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganiserEvents;
