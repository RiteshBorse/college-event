import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRole }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }

  const userRole = getUserRole();
  
  if (allowedRole && userRole !== allowedRole) {
    // Redirect to appropriate dashboard if trying to access wrong role's page
    const redirectPath = userRole === 'Organiser' 
      ? '/organiser/dashboard' 
      : '/participant/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
