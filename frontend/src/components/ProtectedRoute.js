import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');

  if (!token) {
  
    return <Navigate to="/login" />;
  }

  try {
  
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.user.role;

    
    if (requiredRole && userRole !== requiredRole) {
      
      alert('You are not authorized to view this page.');
      return <Navigate to="/dashboard" />;
    }

    // If all checks pass render the component
    return children;
  } catch (error) {
    // If token is invalid or expired
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;