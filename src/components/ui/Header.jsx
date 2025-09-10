import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import AppImage from '../AppImage';
import Button from './Button';
import ThemeToggle from './ThemeToggle';
import HamburgerButton from '../ui/HamburgerButton';
import MobileMenu from '../layout/MobileMenu';

const Header = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [xpCount, setXpCount] = useState(1250);
  const [streakCount, setStreakCount] = useState(7);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const navigationItems = [
    {
      label: t('nav.home'),
      path: '/',
      icon: 'Home'
    },
    {
      label: t('nav.dashboard'),
      path: '/student-dashboard',
      icon: 'LayoutDashboard'
    },
    {
      label: t('nav.courses'),
      path: '/courses-overview',
      icon: 'BookOpen'
    },
    {
      label: t('nav.aiTutor'),
      path: '/ai-tutor-chat',
      icon: 'Bot'
    },
    {
      label: t('nav.profile'),
      path: '/user-profile',
      icon: 'User'
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const secondaryItems = [
    { label: t('common.settings') || 'Settings', icon: 'Settings', action: () => console.log('Settings') },
    { label: t('common.help') || 'Help', icon: 'HelpCircle', action: () => console.log('Help') },
    { label: t('common.logout') || 'Logout', icon: 'LogOut', action: handleLogout }
  ];

  useEffect(() => {
    if (currentUser) {
      setUser({
        name: currentUser.displayName || 'Alex Johnson',
        email: currentUser.email,
        avatar: currentUser.photoURL || '/assets/images/avatar.jpg',
        level: 12,
      });
    } else {
      setUser(null);
    }
  }, [currentUser]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/student-dashboard');
    setIsMenuOpen(false);
  };


  const isActive = (path) => {
    if (path === '/') {
      return location?.pathname === '/' || location?.pathname === '/landing-page';
    }
    return location?.pathname === path;
  };

  // Don't render header on landing page and authentication
  if (location?.pathname === '/' || location?.pathname === '/landing-page' || location?.pathname === '/authentication') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-100 glass border-b border-glass-border">
      <div className="responsive-container">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden">
              <AppImage
                src="/assets/images/thinked-high-resolution-logo-transparent-1757342968260.png"
                alt="ThinkEd Logo"
                className="w-full h-full object-contain thinked-logo"
              />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navigationItems?.map((item, index) => (
              <motion.div
                key={item?.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Button
                  variant={isActive(item?.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={18}
                  className="spring-bounce"
                >
                  {item?.label}
                </Button>
              </motion.div>
            ))}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Progress Indicators - Hidden on small mobile */}
            {user && (
              <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex items-center space-x-2 px-2 sm:px-3 py-1.5 rounded-full glass"
                >
                  <Icon name="Zap" size={16} color="var(--color-warning)" />
                  <span className="text-xs sm:text-sm font-medium text-warning">{xpCount} XP</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex items-center space-x-2 px-2 sm:px-3 py-1.5 rounded-full glass"
                >
                  <Icon name="Flame" size={16} color="var(--color-accent)" />
                  <span className="text-xs sm:text-sm font-medium text-accent">{streakCount} days</span>
                </motion.div>
              </div>
            )}

            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <ThemeToggle variant="icon" size="md" />
            </motion.div>



            {/* More Menu - Desktop */}
            <div className="hidden lg:block relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                iconName="MoreHorizontal"
                className="spring-bounce"
              />
              
              {isMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-48 glass rounded-lg shadow-3 border border-glass-border overflow-hidden"
                >
                  {secondaryItems?.map((item, index) => (
                    <button
                      key={index}
                      onClick={item?.action}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-muted/50 transition-colors"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <HamburgerButton
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              size="md"
              variant="default"
              ariaLabel="Toggle navigation menu"
              className="lg:hidden"
            />
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navigationItems={navigationItems}
        secondaryItems={secondaryItems}
        showCTA={false}
      />
    </header>
  );
};

export default Header;