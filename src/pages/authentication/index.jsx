import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import AuthCard from './components/AuthCard';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';
import LoadingOverlay from './components/LoadingOverlay';
import ErrorMessage from './components/ErrorMessage';

const Authentication = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, login, signup, loginWithGoogle } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate('/student-dashboard');
    }
  }, [currentUser, navigate]);

  const handleLogin = async (formData) => {
    try {
      setError('');
      setLoading(true);
      setShowLoadingOverlay(true);
      await login(formData.email, formData.password);
      navigate('/student-dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
      setShowLoadingOverlay(false);
    }
  };

  const handleRegister = async (formData) => {
    try {
      setError('');
      setLoading(true);
      setShowLoadingOverlay(true);
      await signup(formData.email, formData.password);
      navigate('/student-dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create an account');
    } finally {
      setLoading(false);
      setShowLoadingOverlay(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setError('');
      setLoading(true);
      setShowLoadingOverlay(true);
      await loginWithGoogle();
      navigate('/student-dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
      setShowLoadingOverlay(false);
    }
  };

  const handleCloseError = () => {
    setError('');
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1 }
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden flex items-center justify-center transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
    }`}>
      {/* Animated Background Elements */}
      <motion.div
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0"
      >
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </motion.div>
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-auto p-4 max-h-screen overflow-y-auto custom-scrollbar">
        <div className="w-full">
          <AuthCard activeTab={activeTab}>
            <ErrorMessage error={error} onClose={handleCloseError} />
            
            <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <AnimatePresence mode="wait">
              {activeTab === 'login' ? (
                <motion.div key="login">
                  <LoginForm onSubmit={handleLogin} loading={loading} />
                </motion.div>
              ) : (
                <motion.div key="register">
                  <RegisterForm onSubmit={handleRegister} loading={loading} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-4 sm:mt-6">
              <SocialAuth onGoogleAuth={handleGoogleAuth} loading={loading} />
            </div>

            {/* Footer Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 sm:mt-8 text-center space-y-3 sm:space-y-4"
            >
              <div className="text-sm text-muted-foreground">
                {activeTab === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <button
                      onClick={() => setActiveTab('register')}
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => setActiveTab('login')}
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>

              <div className="flex items-center justify-center space-x-4 sm:space-x-6 text-xs text-muted-foreground">
                <button className="hover:text-foreground transition-colors">
                  Privacy Policy
                </button>
                <span>•</span>
                <button className="hover:text-foreground transition-colors">
                  Terms of Service
                </button>
                <span>•</span>
                <button className="hover:text-foreground transition-colors">
                  Help
                </button>
              </div>

            </motion.div>
          </AuthCard>
        </div>
      </div>
      {/* Loading Overlay */}
      <LoadingOverlay 
        isVisible={showLoadingOverlay} 
        message={activeTab === 'login' ? 'Signing you in...' : 'Creating your account...'}
      />
    </div>
  );
};

export default Authentication;