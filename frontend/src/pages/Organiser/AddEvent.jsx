import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../utils/api';
import { getUserId } from '../../utils/auth';
import toast from 'react-hot-toast';

const AddEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    status: 'active'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = getUserId();
      const eventData = {
        ...formData,
        user_id: userId
      };

      const response = await createEvent(eventData);

      if (response.data.success) {
        toast.success('Event created successfully!');
        navigate('/organiser/events');
      } else {
        toast.error('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Create Your
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Event</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Fill in the details below to create an unforgettable campus experience
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Form */}
            <div className="relative">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 shadow-2xl relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-10"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-10"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-xl">
                      🎯
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Event Details</h2>
                      <p className="text-gray-400">Fill in all required information</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Event Title */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Event Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-gray-900/50 border border-gray-600 rounded-2xl text-white focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder-gray-500 focus:scale-[1.02] group-hover:border-gray-500"
                        placeholder="Enter an engaging event title"
                      />
                    </div>

                    {/* Description */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="w-full px-5 py-4 bg-gray-900/50 border border-gray-600 rounded-2xl text-white focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder-gray-500 focus:scale-[1.02] group-hover:border-gray-500 resize-none"
                        placeholder="Describe your event in detail... What makes it special? What should participants expect?"
                      />
                    </div>

                    {/* Image URL */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Event Image URL
                      </label>
                      <input
                        type="url"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-gray-900/50 border border-gray-600 rounded-2xl text-white focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder-gray-500 focus:scale-[1.02] group-hover:border-gray-500"
                        placeholder="https://example.com/event-image.jpg"
                      />
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                        <span>💡</span>
                        <span>Optional: Add a compelling image to attract more participants</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Event Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-gray-900/50 border border-gray-600 rounded-2xl text-white focus:outline-none focus:border-blue-500 transition-all duration-300 focus:scale-[1.02] group-hover:border-gray-500 appearance-none cursor-pointer"
                      >
                        <option value="active">🎯 Active - Currently running</option>
                        <option value="upcoming">⏰ Upcoming - Scheduled for future</option>
                        <option value="completed">✅ Completed - Past event</option>
                        <option value="cancelled">❌ Cancelled - Event called off</option>
                      </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6">
                      <button
                        type="submit"
                        disabled={loading}
                        className="group relative flex-1 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-blue-500/25"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          {loading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                              Creating Event...
                            </>
                          ) : (
                            <>
                              <span>Create Event</span>
                              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">🚀</span>
                            </>
                          )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => navigate('/organiser/dashboard')}
                        className="group px-8 py-4 bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 border border-gray-600 hover:border-gray-500"
                      >
                        <span className="flex items-center">
                          <span>Cancel</span>
                          <span className="ml-2 transform group-hover:translate-x-1 transition-transform">←</span>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Right Side - Tips & Preview */}
            <div className="space-y-6">
              {/* Tips Card */}
              <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500 rounded-full blur-3xl opacity-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-xl">
                      💡
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Pro Tips</h3>
                      <p className="text-gray-400">Create engaging events</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      {
                        icon: '🎯',
                        title: 'Clear Title',
                        description: 'Use descriptive and exciting titles to attract participants'
                      },
                      {
                        icon: '📝',
                        title: 'Detailed Description',
                        description: 'Include all important details, requirements, and benefits'
                      },
                      {
                        icon: '🖼️',
                        title: 'Quality Images',
                        description: 'Add high-quality images to make your event stand out'
                      },
                      {
                        icon: '⏰',
                        title: 'Right Status',
                        description: 'Set the correct status to manage participant expectations'
                      }
                    ].map((tip, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300">
                        <div className="text-2xl flex-shrink-0">{tip.icon}</div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{tip.title}</h4>
                          <p className="text-gray-400 text-sm">{tip.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview Card */}
              <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-xl">
                      👁️
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Quick Preview</h3>
                      <p className="text-gray-400">How your event will appear</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-gray-700/30 border border-gray-600">
                      <div className="text-sm text-gray-400 mb-2">Event Title</div>
                      <div className="text-white font-semibold">
                        {formData.title || 'Your event title will appear here'}
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-2xl bg-gray-700/30 border border-gray-600">
                      <div className="text-sm text-gray-400 mb-2">Status</div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          formData.status === 'active' ? 'bg-green-500 animate-pulse' :
                          formData.status === 'upcoming' ? 'bg-blue-500' :
                          formData.status === 'completed' ? 'bg-gray-500' : 'bg-red-500'
                        }`}></div>
                        <span className="text-white font-medium capitalize">
                          {formData.status || 'active'}
                        </span>
                      </div>
                    </div>
                    
                    {formData.image_url && (
                      <div className="p-4 rounded-2xl bg-gray-700/30 border border-gray-600">
                        <div className="text-sm text-gray-400 mb-2">Image Preview</div>
                        <div className="text-blue-400 text-sm truncate">
                          {formData.image_url}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;