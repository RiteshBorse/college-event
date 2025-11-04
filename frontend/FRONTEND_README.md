# 🏫 College Event Management Frontend

A modern, dark-themed event management application built with React, Vite, and Tailwind CSS.

## ✨ Features

### 🔐 Authentication
- User registration and login
- Role-based access (Organiser/Participant)
- Persistent authentication with localStorage

### 👨‍💼 Organiser Features
- **Dashboard**: View comprehensive statistics and analytics
  - Total events, participants, and engagement metrics
  - Recent events overview
  - Event status distribution
- **Create Events**: Easy-to-use form to create new events
- **Manage Events**: View all created events with participant counts

### 👨‍🎓 Participant Features
- **Dashboard**: Quick access to all features
- **Browse Events**: Discover all available events with filtering
- **Register**: One-click registration for events
- **My Events**: Track all registered events

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Backend server running on `http://localhost:8001`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── EventCard.jsx
│   │   └── LoadingSpinner.jsx
│   ├── pages/           # Page components
│   │   ├── LandingPage.jsx
│   │   ├── SignIn.jsx
│   │   ├── Organiser/
│   │   │   ├── OrganiserDashboard.jsx
│   │   │   ├── AddEvent.jsx
│   │   │   └── OrganiserEvents.jsx
│   │   └── Participant/
│   │       ├── ParticipantDashboard.jsx
│   │       ├── AllEvents.jsx
│   │       └── MyEvents.jsx
│   ├── utils/           # Utility functions
│   │   ├── api.js       # API endpoints
│   │   └── auth.js      # Authentication helpers
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── package.json
```

## 🎨 Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications

## 🔌 API Integration

The frontend communicates with the backend API at `http://localhost:8001` with the following endpoints:

### Authentication
- `POST /register` - User registration
- `POST /login` - User login

### Events
- `POST /create-event` - Create new event
- `GET /get-events` - Get all events
- `GET /get-events/:id` - Get single event
- `POST /participate/:id` - Register for event

### User
- `POST /my-participation` - Get registered events
- `POST /extra-info` - Get dashboard statistics

## 🎯 Routes

### Public Routes
- `/` - Landing page
- `/signin` - Authentication page

### Organiser Routes (Protected)
- `/organiser/dashboard` - Organiser dashboard
- `/organiser/add-event` - Create event
- `/organiser/events` - Manage events

### Participant Routes (Protected)
- `/participant/dashboard` - Participant dashboard
- `/participant/events` - Browse all events
- `/participant/my-events` - View registered events

## 🌑 Dark Theme

The application features a beautiful dark theme by default:
- Background: `#0f172a`
- Cards: `#1e293b`
- Hover: `#334155`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 Environment Variables

If you need to change the backend URL, update the `API_BASE_URL` in `src/utils/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8001';
```

## 🔒 Authentication Flow

1. User signs in/registers with credentials
2. User data is stored in localStorage
3. Protected routes check authentication status
4. Users are redirected based on their role:
   - Organiser → `/organiser/dashboard`
   - Participant → `/participant/dashboard`

## 🎨 UI Components

### EventCard
Reusable card component for displaying event information with customizable actions.

### ProtectedRoute
HOC for protecting routes based on authentication and role.

### LoadingSpinner
Loading indicator component for async operations.

### Navbar
Global navigation with authentication status and logout functionality.

### Footer
Simple footer with links and copyright information.

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 Mobile devices
- 📱 Tablets
- 💻 Desktops

## 🤝 Contributing

Feel free to contribute to this project by opening issues or pull requests!

## 📄 License

MIT License - feel free to use this project for learning or production!
