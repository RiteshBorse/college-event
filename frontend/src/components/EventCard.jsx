const EventCard = ({ event, onAction, actionLabel, actionColor = 'blue' }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-dark-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-all border border-gray-700 hover:border-blue-500">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{event.title}</h3>
        {event.status && (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            event.status === 'active' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-200'
          }`}>
            {event.status}
          </span>
        )}
      </div>
      
      <p className="text-gray-400 mb-4 line-clamp-3">{event.description}</p>
      
      {event.image_url && (
        <img 
          src={event.image_url} 
          alt={event.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      
      <div className="space-y-2 text-sm text-gray-300 mb-4">
        {event.createdAt && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">📅</span>
            <span>{formatDate(event.createdAt)}</span>
          </div>
        )}
        {event.participants && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">👥</span>
            <span>{event.participants.length} Participants</span>
          </div>
        )}
      </div>
      
      {onAction && actionLabel && (
        <button
          onClick={() => onAction(event)}
          className={`w-full px-4 py-2 bg-${actionColor}-600 hover:bg-${actionColor}-700 text-white rounded-lg transition font-semibold`}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EventCard;
