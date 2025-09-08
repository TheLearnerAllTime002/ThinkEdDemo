import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../../hooks/useTranslation';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BadgeShowcase = ({ badges }) => {
  const { t } = useTranslation();
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { key: 'all', label: t('badges.all'), icon: 'Grid3X3' },
    { key: 'earned', label: t('badges.earned'), icon: 'CheckCircle' },
    { key: 'locked', label: t('badges.locked'), icon: 'Lock' },
    { key: 'rare', label: t('badges.rare'), icon: 'Star' }
  ];

  const filteredBadges = badges?.filter(badge => {
    if (filter === 'all') return true;
    if (filter === 'earned') return badge?.earned;
    if (filter === 'locked') return !badge?.earned;
    if (filter === 'rare') return badge?.rarity === 'rare';
    return true;
  });

  const getBadgeIcon = (type) => {
    const iconMap = {
      streak: 'Flame',
      course: 'BookOpen',
      quiz: 'Brain',
      social: 'Users',
      milestone: 'Trophy',
      special: 'Star'
    };
    return iconMap?.[type] || 'Award';
  };

  const getRarityColor = (rarity) => {
    const colorMap = {
      common: 'var(--color-muted-foreground)',
      uncommon: 'var(--color-success)',
      rare: 'var(--color-secondary)',
      epic: 'var(--color-warning)',
      legendary: 'var(--color-accent)'
    };
    return colorMap?.[rarity] || 'var(--color-muted-foreground)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-glass-border"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ring-2 ring-primary/10">
            <Icon name="Award" size={20} className="sm:w-6 sm:h-6" color="var(--color-primary)" />
          </div>
          <h2 className="heading-3">{t('badges.achievements')}</h2>
        </div>
        <div className="text-sm text-muted-foreground px-3 py-1 rounded-full bg-muted/20">
          {badges?.filter(b => b?.earned)?.length}/{badges?.length} {t('badges.earned')}
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions?.map((option) => (
          <Button
            key={option?.key}
            variant={filter === option?.key ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter(option?.key)}
            iconName={option?.icon}
            iconPosition="left"
            iconSize={14}
            className="spring-bounce rounded-full px-4 py-2"
          >
            {option?.label}
          </Button>
        ))}
      </div>
      {/* Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filteredBadges?.map((badge) => (
          <motion.div
            key={badge?.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedBadge(badge)}
            className={`glass rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-300 border shadow-sm hover:shadow-md ${
              badge?.earned 
                ? 'border-glass-border hover:border-primary/50 ring-1 ring-primary/10' 
                : 'border-glass-border opacity-60 hover:opacity-80 hover:border-muted/50'
            }`}
          >
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                badge?.earned 
                  ? 'bg-gradient-to-br from-primary/20 to-secondary/20' :'bg-muted/20'
              }`}>
                <Icon 
                  name={getBadgeIcon(badge?.type)} 
                  size={24} 
                  color={badge?.earned ? getRarityColor(badge?.rarity) : 'var(--color-muted-foreground)'} 
                />
              </div>
              <h4 className="text-sm font-medium mb-1 line-clamp-2">{badge?.name}</h4>
              {!badge?.earned && badge?.progress !== undefined && (
                <div className="w-full bg-muted rounded-full h-1.5 mb-2">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${badge?.progress}%` }}
                  />
                </div>
              )}
              <div className="text-xs text-muted-foreground">
                {badge?.earned ? badge?.earnedDate : `${badge?.progress || 0}%`}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e?.stopPropagation()}
              className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full border border-glass-border shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  selectedBadge?.earned 
                    ? 'bg-gradient-to-br from-primary/20 to-secondary/20' :'bg-muted/20'
                }`}>
                  <Icon 
                    name={getBadgeIcon(selectedBadge?.type)} 
                    size={32} 
                    color={selectedBadge?.earned ? getRarityColor(selectedBadge?.rarity) : 'var(--color-muted-foreground)'} 
                  />
                </div>
                <h3 className="heading-4 mb-2">{selectedBadge?.name}</h3>
                <p className="text-muted-foreground body-small mb-4">{selectedBadge?.description}</p>
                
                {selectedBadge?.earned ? (
                  <div className="flex items-center justify-center space-x-2 text-success">
                    <Icon name="CheckCircle" size={16} />
                    <span className="text-sm font-medium">{t('badges.earnedOn')} {selectedBadge?.earnedDate}</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">{t('badges.requirement')}:</span> {selectedBadge?.requirement}
                    </div>
                    {selectedBadge?.progress !== undefined && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t('badges.progress')}</span>
                          <span>{selectedBadge?.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${selectedBadge?.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <Button
                variant="outline"
                onClick={() => setSelectedBadge(null)}
                iconName="X"
                iconPosition="left"
                className="w-full rounded-full py-3 border-muted/30 hover:bg-muted/10"
              >
                {t('badges.close')}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BadgeShowcase;