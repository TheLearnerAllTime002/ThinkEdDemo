import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const MessageBubble = ({ message, isUser, isTyping = false, onQuickAction }) => {
  const bubbleVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  if (isTyping) {
    return null; // Typing indicator is handled in the main component
  }

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A9B8E] to-[#F59E0B] flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} color="white" />
        </div>
      )}
      
      {/* Message Content */}
      <div className={`flex-1 max-w-[80%] ${isUser ? 'flex justify-end' : ''}`}>
        <div className={`${
          isUser 
            ? 'bg-gradient-to-br from-[#4A9B8E] to-[#F59E0B] text-white ml-auto rounded-2xl px-4 py-3 shadow-lg' 
            : 'bg-white dark:bg-slate-800 rounded-2xl px-4 py-3 shadow-sm border border-slate-200 dark:border-slate-700'
        }`}>
          {/* Message Text */}
          <div className="space-y-3">
            <div className={`text-sm leading-relaxed whitespace-pre-wrap ${
              isUser ? 'text-white' : 'text-slate-900 dark:text-slate-100'
            }`}>
              {message?.content}
            </div>
            
            {/* Code Block */}
            {message?.code && (
              <div className="mt-3 p-3 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Code</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText(message.code)}
                    className="text-xs text-[#4A9B8E] hover:text-[#F59E0B] transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <pre className="text-xs font-mono text-slate-800 dark:text-slate-200 overflow-x-auto">
                  <code>{message?.code}</code>
                </pre>
              </div>
            )}

            {/* Quick Actions */}
            {message?.quickActions && !isUser && (
              <div className="mt-3 flex flex-wrap gap-2">
                {message?.quickActions?.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => onQuickAction?.(action)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Timestamp */}
          <div className={`mt-2 text-xs ${
            isUser ? 'text-white/70' : 'text-slate-500 dark:text-slate-400'
          }`}>
            {message?.timestamp?.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center flex-shrink-0">
          <Icon name="User" size={16} color="white" />
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;