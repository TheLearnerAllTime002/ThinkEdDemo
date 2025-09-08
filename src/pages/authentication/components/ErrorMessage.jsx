import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ErrorMessage = ({ error, onClose }) => {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="mb-6 p-4 rounded-lg glass border border-error/20 bg-error/5"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-error mb-1">Authentication Error</h4>
              <p className="text-sm text-error/80">{error}</p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="flex-shrink-0 text-error/60 hover:text-error transition-colors"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage;