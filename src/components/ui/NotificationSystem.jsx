import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import { cn } from '../../utils/cn';
import Icon from '../AppIcon';
import AnimatedButton from './AnimatedButton';

const NotificationSystem = () => {
  const { notifications, removeNotification } = useApp();

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-success/10 border-success/20 text-success';
      case 'error':
        return 'bg-error/10 border-error/20 text-error';
      case 'warning':
        return 'bg-warning/10 border-warning/20 text-warning';
      case 'info':
      default:
        return 'bg-primary/10 border-primary/20 text-primary';
    }
  };

  const getNotificationIcon = (type, customIcon) => {
    if (customIcon) return customIcon;
    
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'error':
        return 'XCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'info':
      default:
        return 'Info';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-4 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 25 
            }}
            className={cn(
              'glass-card-enhanced p-4 rounded-2xl border shadow-lg',
              getNotificationStyles(notification.type)
            )}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Icon 
                  name={getNotificationIcon(notification.type, notification.icon)} 
                  size={24} 
                />
              </div>
              
              <div className="flex-1 min-w-0">
                {notification.title && (
                  <h4 className="text-sm font-semibold mb-1">
                    {notification.title}
                  </h4>
                )}
                <p className="text-sm opacity-90">
                  {notification.message}
                </p>
              </div>
              
              <AnimatedButton
                variant="ghost"
                size="sm"
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 w-8 h-8 p-0 hover:bg-current/10"
              >
                <Icon name="X" size={16} />
              </AnimatedButton>
            </div>
            
            {/* Progress bar for auto-dismiss */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-current rounded-b-2xl"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 5, ease: 'linear' }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;