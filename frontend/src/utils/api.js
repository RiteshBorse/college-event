import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const registerUser = (userData) => api.post('/register', userData);
export const loginUser = (credentials) => api.post('/login', credentials);

// Event APIs
export const createEvent = (eventData) => api.post('/create-event', eventData);
export const getAllEvents = () => api.get('/get-events');
export const getEventById = (id) => api.get(`/get-events/${id}`);
export const participateInEvent = (eventId, userId) => 
  api.post(`/participate/${eventId}`, { user_id: userId });

// User APIs
export const getMyParticipations = (userId) => 
  api.post('/my-participation', { user_id: userId });
export const getDashboardStats = (userId) => 
  api.post('/extra-info', { user_id: userId });
