import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Authentication from './pages/authentication';
import CoursesOverview from './pages/courses-overview';
import AITutorChat from './pages/ai-tutor-chat';
import LandingPage from './pages/landing-page';
import StudentDashboard from './pages/student-dashboard';
import UserProfile from './pages/user-profile';
import { motion } from 'framer-motion';
import Navigation from './components/layout/Navigation';
import NotificationSystem from './components/ui/NotificationSystem';
import ProtectedRoute from './components/ProtectedRoute';

const ConditionalNavigation = () => {
  const location = useLocation();

  // Only show Navigation component on landing page
  // Header component is included within individual dashboard pages
  const showNavigation = location.pathname === '/' || location.pathname === '/landing-page';

  return showNavigation ? <Navigation /> : null;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <ConditionalNavigation />
        <NotificationSystem />
        <RouterRoutes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/courses-overview" element={
            <ProtectedRoute>
              <CoursesOverview />
            </ProtectedRoute>
          } />
          <Route path="/ai-tutor-chat" element={
            <ProtectedRoute>
              <AITutorChat />
            </ProtectedRoute>
          } />
          <Route path="/student-dashboard" element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/user-profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
