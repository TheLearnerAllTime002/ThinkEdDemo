import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialIntegration = ({ connectedAccounts, onConnect, onDisconnect, currentLanguage }) => {
  const [isConnecting, setIsConnecting] = useState({});

  const translations = {
    en: {
      socialAccounts: "Social Accounts",
      connectAccounts: "Connect your social accounts to share achievements and progress",
      connected: "Connected",
      connect: "Connect",
      disconnect: "Disconnect",
      connecting: "Connecting...",
      lastSync: "Last sync",
      shareAchievements: "Share achievements",
      autoShare: "Auto-share progress"
    },
    hi: {
      socialAccounts: "सामाजिक खाते",
      connectAccounts: "उपलब्धियों और प्रगति को साझा करने के लिए अपने सामाजिक खाते कनेक्ट करें",
      connected: "कनेक्टेड",
      connect: "कनेक्ट करें",
      disconnect: "डिस्कनेक्ट करें",
      connecting: "कनेक्ट हो रहा है...",
      lastSync: "अंतिम सिंक",
      shareAchievements: "उपलब्धियां साझा करें",
      autoShare: "स्वचालित प्रगति साझाकरण"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const socialPlatforms = [
    {
      id: 'gmail',
      name: 'Gmail',
      icon: 'Mail',
      color: 'var(--color-error)',
      description: currentLanguage === 'en' ?'Share learning progress via email' :'ईमेल के माध्यम से सीखने की प्रगति साझा करें'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: '#0077B5',
      description: currentLanguage === 'en' ?'Showcase achievements on your professional profile' :'अपनी पेशेवर प्रोफ़ाइल पर उपलब्धियां दिखाएं'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'Github',
      color: 'var(--color-foreground)',
      description: currentLanguage === 'en' ?'Display coding achievements and projects' :'कोडिंग उपलब्धियां और प्रोजेक्ट प्रदर्शित करें'
    }
  ];

  const handleConnect = async (platformId) => {
    setIsConnecting(prev => ({ ...prev, [platformId]: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onConnect(platformId);
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(prev => ({ ...prev, [platformId]: false }));
    }
  };

  const handleDisconnect = async (platformId) => {
    try {
      onDisconnect(platformId);
    } catch (error) {
      console.error('Disconnection failed:', error);
    }
  };

  const isConnected = (platformId) => {
    return connectedAccounts?.some(account => account?.platform === platformId);
  };

  const getConnectedAccount = (platformId) => {
    return connectedAccounts?.find(account => account?.platform === platformId);
  };

  const formatLastSync = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return currentLanguage === 'en' ? 'Just now' : 'अभी';
    } else if (diffInHours < 24) {
      return currentLanguage === 'en' ? `${diffInHours}h ago` : `${diffInHours} घंटे पहले`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return currentLanguage === 'en' ? `${diffInDays}d ago` : `${diffInDays} दिन पहले`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-glass-border"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ring-2 ring-primary/10">
          <Icon name="Share2" size={20} className="sm:w-6 sm:h-6" color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="heading-3">{t?.socialAccounts}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t?.connectAccounts}</p>
        </div>
      </div>
      {/* Social Platforms */}
      <div className="space-y-4">
        {socialPlatforms?.map((platform) => {
          const connected = isConnected(platform?.id);
          const account = getConnectedAccount(platform?.id);
          const connecting = isConnecting?.[platform?.id];

          return (
            <motion.div
              key={platform?.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={`glass rounded-2xl sm:rounded-3xl p-4 sm:p-5 border transition-all duration-300 shadow-sm hover:shadow-md ${
                connected 
                  ? 'border-success/30 bg-success/5 ring-1 ring-success/20' 
                  : 'border-glass-border hover:border-primary/30 hover:bg-primary/5'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  {/* Circular Icon Background */}
                  <div 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center ring-2 ring-white/10 shadow-sm flex-shrink-0"
                    style={{ backgroundColor: `${platform?.color}15` }}
                  >
                    <Icon 
                      name={platform?.icon} 
                      size={20} 
                      className="sm:w-6 sm:h-6"
                      color={platform?.color} 
                    />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{platform?.name}</h3>
                      {connected && (
                        <div className="flex items-center space-x-1.5 px-2 py-1 rounded-full bg-success/10 text-success ring-1 ring-success/20 flex-shrink-0">
                          <Icon name="CheckCircle" size={14} className="sm:w-4 sm:h-4" />
                          <span className="text-xs font-medium">{t?.connected}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{platform?.description}</p>
                    {connected && account?.lastSync && (
                      <p className="text-xs text-muted-foreground mt-1 flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{t?.lastSync}: {formatLastSync(account?.lastSync)}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto flex-shrink-0">
                  {connected ? (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => console.log(`Share to ${platform?.name}`)}
                        iconName="Share"
                        iconSize={14}
                        className="rounded-full px-3 py-2 text-xs sm:text-sm w-full sm:w-auto flex-shrink-0"
                      >
                        {t?.shareAchievements}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnect(platform?.id)}
                        iconName="Unlink"
                        iconSize={14}
                        className="rounded-full text-error hover:text-error border-error/20 hover:bg-error/10 w-full sm:w-auto flex-shrink-0"
                      >
                        {t?.disconnect}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleConnect(platform?.id)}
                      loading={connecting}
                      iconName="Link"
                      iconSize={14}
                      className="rounded-full px-4 py-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-sm w-full sm:w-auto flex-shrink-0"
                    >
                      {connecting ? t?.connecting : t?.connect}
                    </Button>
                  )}
                </div>
              </div>
              {/* Connection Settings */}
              {connected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-glass-border"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center space-x-2">
                      <Icon name="Settings" size={14} />
                      <span>{t?.autoShare}</span>
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={account?.autoShare || false}
                        onChange={(e) => console.log(`Auto-share ${platform?.name}:`, e?.target?.checked)}
                      />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-checked:ring-2 peer-checked:ring-primary/20"></div>
                    </label>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      {/* Connected Accounts Summary */}
      {connectedAccounts?.length > 0 && (
        <div className="mt-6 p-4 sm:p-5 bg-success/10 rounded-2xl sm:rounded-3xl border border-success/20 ring-1 ring-success/10">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
              <Icon name="CheckCircle" size={14} color="var(--color-success)" />
            </div>
            <span className="text-sm font-semibold text-success">
              {connectedAccounts?.length} {currentLanguage === 'en' ? 'accounts connected' : 'खाते कनेक्टेड'}
            </span>
          </div>
          <p className="text-sm text-success/80">
            {currentLanguage === 'en' ?'Your achievements and progress will be shared automatically based on your preferences.' :'आपकी उपलब्धियां और प्रगति आपकी प्राथमिकताओं के आधार पर स्वचालित रूप से साझा की जाएगी।'
            }
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default SocialIntegration;