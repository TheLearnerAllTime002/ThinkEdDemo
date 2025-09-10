import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHistory = ({ isOpen, onClose, onSelectSession }) => {
  const chatSessions = [
    {
      id: 1,
      title: "Quadratic Equations Help",
      subject: "Mathematics",
      lastMessage: "Thanks for explaining the discriminant!",
      timestamp: new Date(Date.now() - 3600000),
      messageCount: 12
    },
    {
      id: 2,
      title: "Photosynthesis Process",
      subject: "Science",
      lastMessage: "Can you explain the light reactions?",
      timestamp: new Date(Date.now() - 7200000),
      messageCount: 8
    },
    {
      id: 3,
      title: "Essay Writing Tips",
      subject: "English",
      lastMessage: "How do I improve my conclusion?",
      timestamp: new Date(Date.now() - 86400000),
      messageCount: 15
    },
    {
      id: 4,
      title: "JavaScript Functions",
      subject: "Programming",
      lastMessage: "Arrow functions vs regular functions",
      timestamp: new Date(Date.now() - 172800000),
      messageCount: 20
    },
    {
      id: 5,
      title: "World War II Timeline",
      subject: "History",
      lastMessage: "What were the key turning points?",
      timestamp: new Date(Date.now() - 259200000),
      messageCount: 6
    }
  ];

  const getSubjectIcon = (subject) => {
    const iconMap = {
      'Mathematics': 'Calculator',
      'Science': 'Atom',
      'English': 'FileText',
      'Programming': 'Code',
      'History': 'Clock'
    };
    return iconMap?.[subject] || 'BookOpen';
  };

  const getSubjectColor = (subject) => {
    const colorMap = {
      'Mathematics': 'var(--color-accent)',
      'Science': 'var(--color-secondary)',
      'English': 'var(--color-success)',
      'Programming': 'var(--color-error)',
      'History': 'var(--color-warning)'
    };
    return colorMap?.[subject] || 'var(--color-primary)';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* History Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md glass border-l border-glass-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-glass-border">
              <div className="flex items-center space-x-2">
                <Icon name="History" size={20} color="var(--color-primary)" />
                <h3 className="text-lg font-semibold">Chat History</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                iconName="X"
              />
            </div>

            {/* Search */}
            <div className="p-4 border-b border-glass-border">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg glass border border-glass-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                />
              </div>
            </div>

            {/* Sessions List */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-2 space-y-2">
                {chatSessions?.map((session) => (
                  <motion.button
                    key={session?.id}
                    onClick={() => {
                      onSelectSession(session);
                      onClose();
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-3 rounded-lg glass border border-glass-border hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                           style={{ backgroundColor: `${getSubjectColor(session?.subject)}20` }}>
                        <Icon 
                          name={getSubjectIcon(session?.subject)} 
                          size={16} 
                          color={getSubjectColor(session?.subject)} 
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium truncate">{session?.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            {session?.timestamp?.toLocaleDateString()}
                          </span>
                        </div>
                        
                        <p className="text-xs text-muted-foreground truncate mb-2">
                          {session?.lastMessage}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium px-2 py-1 rounded-full"
                                style={{ 
                                  backgroundColor: `${getSubjectColor(session?.subject)}20`,
                                  color: getSubjectColor(session?.subject)
                                }}>
                            {session?.subject}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {session?.messageCount} messages
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-glass-border">
              <Button
                variant="outline"
                fullWidth
                iconName="Plus"
                iconPosition="left"
                onClick={onClose}
              >
                Start New Chat
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatHistory;