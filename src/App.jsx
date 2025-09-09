import React, { useEffect } from "react";
import Routes from "./Routes";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppProvider } from "./contexts/AppContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import BackgroundEffects from "./components/layout/BackgroundEffects";
import { performanceMonitor } from "./utils/animationConfig";
import SpeedInsights from '@vercel/speed-insights/react';

function App() {
  useEffect(() => {
    // Start performance monitoring in development
    if (process.env.NODE_ENV === 'development') {
      performanceMonitor.startMonitoring();
    }

    // Cleanup on unmount
    return () => {
      if (process.env.NODE_ENV === 'development') {
        performanceMonitor.stopMonitoring();
      }
    };
  }, []);

  return (
    <>
      <ThemeProvider>
        <LanguageProvider>
          <AppProvider>
            <AuthProvider>
              <div className="relative min-h-screen">
              {/* Global Background Effects */}
              <BackgroundEffects variant="minimal" className="fixed inset-0 z-0" />
              
              {/* Main Application */}
              <div className="relative z-10">
                <Routes />
              </div>
            </div>
            </AuthProvider>
          </AppProvider>
        </LanguageProvider>
      </ThemeProvider>
      <SpeedInsights />
    </>
  );
}

export default App;