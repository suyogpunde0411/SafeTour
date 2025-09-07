import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, userType }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (userType && user.type !== userType) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default ProtectedRoute;