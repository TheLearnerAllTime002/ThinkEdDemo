import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" text="Checking authentication..." />
      </div>
    );
  }

  if (!currentUser) {
    // Redirect to authentication page with return url
    return <Navigate to="/authentication" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
