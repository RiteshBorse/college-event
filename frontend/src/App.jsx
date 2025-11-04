import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { isAuthenticated, getUserRole } from './utils/auth';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';

// Organiser Pages
import OrganiserDashboard from './pages/Organiser/OrganiserDashboard';
import AddEvent from './pages/Organiser/AddEvent';
import OrganiserEvents from './pages/Organiser/OrganiserEvents';

// Participant Pages
import ParticipantDashboard from './pages/Participant/ParticipantDashboard';
import AllEvents from './pages/Participant/AllEvents';
import MyEvents from './pages/Participant/MyEvents';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-bg flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />

            {/* Organiser Routes */}
            <Route
              path="/organiser/dashboard"
              element={
                <ProtectedRoute allowedRole="Organiser">
                  <OrganiserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organiser/add-event"
              element={
                <ProtectedRoute allowedRole="Organiser">
                  <AddEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organiser/events"
              element={
                <ProtectedRoute allowedRole="Organiser">
                  <OrganiserEvents />
                </ProtectedRoute>
              }
            />

            {/* Participant Routes */}
            <Route
              path="/participant/dashboard"
              element={
                <ProtectedRoute allowedRole="Participant">
                  <ParticipantDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/participant/events"
              element={
                <ProtectedRoute allowedRole="Participant">
                  <AllEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/participant/my-events"
              element={
                <ProtectedRoute allowedRole="Participant">
                  <MyEvents />
                </ProtectedRoute>
              }
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e293b',
              color: '#fff',
              border: '1px solid #334155',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
