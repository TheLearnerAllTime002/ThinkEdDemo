import React, { useEffect } from "react";
import Routes from "./Routes";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppProvider } from "./contexts/AppContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import BackgroundEffects from "./components/layout/BackgroundEffects";
import { AccessibilityPanel } from "./components/ui/AccessibilityPanel";
import { performanceMonitor } from "./utils/animationConfig";

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
    <AccessibilityProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AppProvider>
            <AuthProvider>
              {/* Skip to content link */}
              <a href="#main-content" className="skip-link">
                Skip to main content
              </a>
              
              <div className="relative min-h-screen">
                {/* Global Background Effects */}
                <BackgroundEffects className="fixed inset-0 z-0" variant="minimal" />
                
                {/* Main Application */}
                <div className="relative z-10">
                  <Routes />
                </div>
                
                {/* Accessibility Panel */}
                <AccessibilityPanel />
              </div>
            </AuthProvider>
          </AppProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AccessibilityProvider>
  );
}

export default App;
