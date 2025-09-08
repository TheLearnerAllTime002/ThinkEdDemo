import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../../hooks/useTranslation';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, onEditProfile }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl sm:rounded-3xl p-6 lg:p-8 border border-glass-border"
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Avatar Section */}
        <div className="relative">
          <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden ring-4 ring-primary/20">
            <Image
              src={user?.avatar}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center ring-4 ring-background">
            <span className="text-white font-bold text-lg">{user?.level}</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-4">
            <h1 className="heading-2 mb-2">{user?.name}</h1>
            <p className="text-muted-foreground body-medium mb-1">{user?.email}</p>
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-muted-foreground">
              <Icon name="Calendar" size={16} />
              <span>{t('profile.joinedOn')} {user?.joinDate}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="glass rounded-2xl p-4 text-center ring-1 ring-warning/10">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center">
                  <Icon name="Zap" size={16} color="var(--color-warning)" />
                </div>
              </div>
              <div className="text-2xl font-bold text-warning">{user?.totalXP?.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">{t('profile.totalXP')}</div>
            </div>

            <div className="glass rounded-2xl p-4 text-center ring-1 ring-success/10">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                  <Icon name="BookOpen" size={16} color="var(--color-success)" />
                </div>
              </div>
              <div className="text-2xl font-bold text-success">{user?.coursesCompleted}</div>
              <div className="text-xs text-muted-foreground">{t('profile.coursesCompleted')}</div>
            </div>

            <div className="glass rounded-2xl p-4 text-center ring-1 ring-accent/10">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Icon name="Flame" size={16} color="var(--color-accent)" />
                </div>
              </div>
              <div className="text-2xl font-bold text-accent">{user?.currentStreak}</div>
              <div className="text-xs text-muted-foreground">{t('profile.currentStreak')}</div>
            </div>

            <div className="glass rounded-2xl p-4 text-center ring-1 ring-secondary/10">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Icon name="Trophy" size={16} color="var(--color-secondary)" />
                </div>
              </div>
              <div className="text-2xl font-bold text-secondary">{t('profile.level')} {user?.level}</div>
              <div className="text-xs text-muted-foreground">{t('profile.level')}</div>
            </div>
          </div>

          {/* Edit Button */}
          <Button
            variant="outline"
            onClick={onEditProfile}
            iconName="Edit"
            iconPosition="left"
            className="spring-bounce rounded-full px-6 py-2 border-primary/30 hover:bg-primary/10"
          >
            {t('profile.editProfile')}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;