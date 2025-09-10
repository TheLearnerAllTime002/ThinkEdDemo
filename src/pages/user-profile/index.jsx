import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import ProfileHeader from './components/ProfileHeader';
import BadgeShowcase from './components/BadgeShowcase';
import ProfileEditForm from './components/ProfileEditForm';
import AchievementTimeline from './components/AchievementTimeline';



const UserProfile = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [badges, setBadges] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [xpData, setXpData] = useState([]);


  useEffect(() => {
    // Initialize mock data
    initializeMockData();
  }, []);

  const initializeMockData = () => {
    // Mock user data
    const mockUser = {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      level: 12,
      totalXP: 15750,
      coursesCompleted: 8,
      currentStreak: 15,
      joinDate: "15/03/2024",
      bio: "Passionate learner exploring the world of technology and science. Always eager to take on new challenges and expand my knowledge.",
      location: "Mumbai, India",
      timezone: "Asia/Kolkata",
      learningGoals: ["math", "programming", "science"],
      notifications: {
        email: true,
        push: true,
        weekly: false
      },
      privacy: {
        showProfile: true,
        showProgress: true,
        showBadges: true
      }
    };

    // Mock badges data
    const mockBadges = [
      {
        id: 1,
        name: "First Steps",
        description: "Complete your first lesson",
        type: "course",
        rarity: "common",
        earned: true,
        earnedDate: "15/03/2024",
        requirement: "Complete 1 lesson"
      },
      {
        id: 2,
        name: "Week Warrior",
        description: "Maintain a 7-day learning streak",
        type: "streak",
        rarity: "uncommon",
        earned: true,
        earnedDate: "22/03/2024",
        requirement: "7-day streak"
      },
      {
        id: 3,
        name: "Quiz Master",
        description: "Score 100% on 5 quizzes",
        type: "quiz",
        rarity: "rare",
        earned: true,
        earnedDate: "28/03/2024",
        requirement: "Perfect score on 5 quizzes"
      },
      {
        id: 4,
        name: "Math Genius",
        description: "Complete all mathematics courses",
        type: "course",
        rarity: "epic",
        earned: false,
        progress: 75,
        requirement: "Complete all math courses"
      },
      {
        id: 5,
        name: "Social Learner",
        description: "Help 10 students in the forum",
        type: "social",
        rarity: "uncommon",
        earned: false,
        progress: 40,
        requirement: "Help 10 students"
      },
      {
        id: 6,
        name: "Dedication",
        description: "Study for 30 consecutive days",
        type: "streak",
        rarity: "legendary",
        earned: false,
        progress: 50,
        requirement: "30-day streak"
      }
    ];

    // Mock achievements timeline
    const mockAchievements = [
      {
        id: 1,
        title: "Course Completed",
        description: "Finished Advanced Mathematics",
        type: "course",
        xpReward: 500,
        date: "2024-09-07"
      },
      {
        id: 2,
        title: "Perfect Quiz Score",
        description: "Scored 100% on Physics Quiz #3",
        type: "quiz",
        xpReward: 100,
        date: "2024-09-06"
      },
      {
        id: 3,
        title: "Streak Milestone",
        description: "Reached 15-day learning streak",
        type: "streak",
        xpReward: 200,
        date: "2024-09-05"
      },
      {
        id: 4,
        title: "Level Up",
        description: "Advanced to Level 12",
        type: "level",
        xpReward: 300,
        date: "2024-09-04"
      },
      {
        id: 5,
        title: "Badge Earned",
        description: "Unlocked Quiz Master badge",
        type: "badge",
        xpReward: 150,
        date: "2024-09-03"
      }
    ];

    // Mock XP progress data
    const mockXpData = [
      { date: "Sep 1", xp: 14200 },
      { date: "Sep 2", xp: 14350 },
      { date: "Sep 3", xp: 14500 },
      { date: "Sep 4", xp: 14800 },
      { date: "Sep 5", xp: 15000 },
      { date: "Sep 6", xp: 15100 },
      { date: "Sep 7", xp: 15600 },
      { date: "Sep 8", xp: 15750 }
    ];

    setUser(mockUser);
    setBadges(mockBadges);
    setAchievements(mockAchievements);
    setXpData(mockXpData);
  };

  const handleLanguageChange = (language) => {
    // This function is no longer needed as language is managed globally
    // Keeping for compatibility if other components still use it
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };



  const localT = {
    title: "User Profile - ThinkEd",
    description: "Manage your profile, view achievements, and customize your learning experience"
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="glass rounded-xl p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{localT?.title}</title>
        <meta name="description" content={localT?.description} />
      </Helmet>
      <Header />
      <main className="pt-20 pb-24 lg:pb-8 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Profile Header */}
            <ProfileHeader
              user={user}
              onEditProfile={handleEditProfile}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Profile Edit Form or Badge Showcase */}
                {isEditing ? (
                  <ProfileEditForm
                    user={user}
                    onSave={handleSaveProfile}
                    onCancel={handleCancelEdit}
                    currentLanguage={currentLanguage}
                  />
                ) : (
                  <BadgeShowcase
                    badges={badges}
                  />
                )}

                {/* Achievement Timeline */}
                <AchievementTimeline
                  achievements={achievements}
                  xpData={xpData}
                  currentLanguage={currentLanguage}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Additional profile information could go here in the future */}
                <div className="glass rounded-xl p-6 text-center">
                  <Icon name="Trophy" size={48} color="var(--color-primary)" className="mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t('profile.achievements')}</h3>
                  <p className="text-muted-foreground">
                    {t('profile.keepLearning')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;