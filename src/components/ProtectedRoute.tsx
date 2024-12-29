import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { currentUser } = useAuth();

  if (currentUser === undefined) {
    return <div>Loading...</div>; // Handle the undefined case, if your context has a loading state
  }

  return currentUser ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
