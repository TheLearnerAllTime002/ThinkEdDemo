import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from '../../hooks/useTranslation';
import { cn } from '../../utils/cn';
import { useAnimationConfig } from '../../hooks/useReducedMotion';
import AnimatedButton from '../ui/AnimatedButton';
import HamburgerButton from '../ui/HamburgerButton';
import MobileMenu from './MobileMenu';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageSelector from '../ui/LanguageSelector';
import Icon from '../AppIcon';
import AppImage from '../AppImage';

const Navigation = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getAnimationProps } = useAnimationConfig();

  const navigationItems = [
    { 
      label: t('nav.home'), 
      path: '/', 
      icon: 'Home',
      description: 'Return to main page'
    },
    { 
      label: t('nav.dashboard'), 
      path: '/student-dashboard', 
      icon: 'LayoutDashboard',
      description: 'View your learning progress'
    },
    { 
      label: t('nav.courses'), 
      path: '/courses-overview', 
      icon: 'BookOpen',
      description: 'Browse available courses'
    },
    { 
      label: t('nav.aiTutor'), 
      path: '/ai-tutor-chat', 
      icon: 'Bot',
      description: 'Chat with AI assistant'
    },
    { 
      label: t('nav.profile'), 
      path: '/user-profile', 
      icon: 'User',
      description: 'Manage your account'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleNavItemClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/landing-page';
    }
    return location.pathname === path;
  };

  const navVariants = getAnimationProps({
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' }
  });

  const logoVariants = getAnimationProps({
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  });

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled 
            ? 'glass-nav backdrop-blur-md shadow-lg' 
            : 'bg-transparent',
          className
        )}
        {...navVariants}
      >
        <div className="responsive-container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <motion.div
              className="flex items-center cursor-pointer"
              onClick={handleLogoClick}
              {...logoVariants}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24">
                <AppImage
                  src="/assets/images/thinked-high-resolution-logo-transparent-1757342968260.png"
                  alt="ThinkEd Logo"
                  className="w-full h-full object-contain thinked-logo drop-shadow-lg hover:drop-shadow-xl transition-all duration-300"
                />
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.path}
                  onClick={() => handleNavItemClick(item.path)}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActivePath(item.path)
                      ? 'bg-gradient-to-r from-[#4A9B8E]/20 to-[#F59E0B]/20 text-[#4A9B8E] border border-[#4A9B8E]/30 shadow-lg'
                      : 'text-muted-foreground hover:text-[#4A9B8E] hover:bg-gradient-to-r hover:from-[#4A9B8E]/10 hover:to-[#F59E0B]/10 hover:border hover:border-[#4A9B8E]/20 hover:shadow-md'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Controls */}
            <div className="hidden lg:flex items-center space-x-3">
              <LanguageSelector variant="dropdown" />
              <ThemeToggle variant="icon" size="md" />
              <AnimatedButton
                variant="gradient"
                size="md"
                animationType="spring"
                iconName="Rocket"
                iconPosition="left"
                onClick={() => navigate('/authentication')}
              >
                {t('nav.getStarted')}
              </AnimatedButton>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center space-x-2">
              <LanguageSelector variant="flags" />
              <ThemeToggle variant="icon" size="sm" />
              <HamburgerButton
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                size="md"
                variant="default"
                ariaLabel="Toggle navigation menu"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navigationItems={navigationItems}
          showCTA={true}
          ctaText="Get Started"
          ctaAction={() => navigate('/authentication')}
          variant="default"
        />
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default Navigation;