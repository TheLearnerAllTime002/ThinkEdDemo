import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useAnimationConfig } from '../../hooks/useReducedMotion';
import AnimatedButton from '../ui/AnimatedButton';
import Icon from '../AppIcon';

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  navigationItems = [], 
  className,
  showCTA = true,
  ctaText = "Get Started",
  ctaAction = () => {},
  variant = "default",
  secondaryItems = []
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const { getAnimationProps } = useAnimationConfig();

  // Handle escape key and outside clicks
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstFocusableElement = menuRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }
  }, [isOpen]);

  const handleNavItemClick = (path) => {
    navigate(path);
    onClose();
  };

  const isActivePath = (path) => {
    if (path === '/landing-page') {
      return location.pathname === '/' || location.pathname === '/landing-page';
    }
    return location.pathname === path;
  };

  // Animation variants
  const overlayVariants = getAnimationProps({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  });

  const menuVariants = getAnimationProps({
    initial: { x: '100%', opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  });

  const itemVariants = getAnimationProps({
    initial: { x: 50, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25
      }
    },
    exit: { x: 50, opacity: 0 }
  });

  const hamburgerVariants = getAnimationProps({
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/80 dark:bg-black/90 lg:hidden"
            {...overlayVariants}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Mobile Menu Panel */}
          <motion.div
            ref={menuRef}
            className={cn(
              'fixed top-0 right-0 bottom-0 z-50 w-72 sm:w-80 md:w-96 max-w-[90vw] sm:max-w-[85vw] lg:hidden',
              'bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 shadow-2xl',
              variant === 'fullscreen' && 'w-full max-w-none',
              className
            )}
            {...menuVariants}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Menu Header */}
            <motion.div
              className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8">
                  <Icon name="Menu" size={24} className="text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Menu</h2>
              </div>
              
              <motion.button
                onClick={onClose}
                className="p-2 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-all duration-200 touch-manipulation min-w-[44px] min-h-[44px]"
                {...hamburgerVariants}
                aria-label="Close menu"
              >
                <Icon name="X" size={24} className="text-foreground" />
              </motion.button>
            </motion.div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto py-6 flex flex-col justify-between">
              <nav className="px-4 sm:px-6 py-4 sm:py-6 space-y-1 sm:space-y-2" role="navigation">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNavItemClick(item.path)}
                    className={cn(
                      'w-full flex items-center space-x-4 px-4 py-4 sm:py-5 rounded-xl text-left min-h-[48px] sm:min-h-[56px]',
                      'transition-all duration-200 group touch-manipulation',
                      isActivePath(item.path)
                        ? 'bg-primary/20 text-primary border border-primary/40 shadow-lg'
                        : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-600'
                    )}
                    variants={itemVariants}
                    whileHover={{ x: 8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    custom={index}
                    aria-current={isActivePath(item.path) ? 'page' : undefined}
                  >
                    <div className={cn(
                      'p-2 rounded-lg transition-colors flex-shrink-0',
                      isActivePath(item.path)
                        ? 'bg-primary/30 text-primary shadow-md'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                    )}>
                      <Icon name={item.icon} size={20} />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-base">{item.label}</span>
                      {item.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                    {isActivePath(item.path) && (
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* Secondary Items */}
              {secondaryItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={item.action}
                  className={cn(
                    'w-full flex items-center space-x-4 px-4 py-4 rounded-xl text-left',
                    'transition-all duration-200 group touch-manipulation min-h-[48px]',
                    'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-600'
                  )}
                  variants={itemVariants}
                  whileHover={{ x: 8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  custom={index}
                >
                  <div className="p-2 rounded-lg transition-colors bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 group-hover:text-slate-700 dark:group-hover:text-slate-300 flex-shrink-0">
                    <Icon name={item.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-base">{item.label}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* CTA Section */}
            {showCTA && (
              <motion.div
                className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                variants={itemVariants}
              >
                <AnimatedButton
                  variant="gradient"
                  size="lg"
                  animationType="spring"
                  iconName="Rocket"
                  iconPosition="left"
                  onClick={() => {
                    ctaAction();
                    onClose();
                  }}
                  className="w-full justify-center touch-manipulation"
                >
                  {ctaText}
                </AnimatedButton>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;