import React from 'react';
import { motion } from 'framer-motion';

const AuthTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'login', label: 'Sign In' },
    { id: 'register', label: 'Sign Up' }
  ];

  return (
    <div className="flex bg-muted/30 rounded-lg p-1 mb-6">
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => setActiveTab(tab?.id)}
          className={`flex-1 relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === tab?.id
              ? 'text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {activeTab === tab?.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-primary rounded-md"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{tab?.label}</span>
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;