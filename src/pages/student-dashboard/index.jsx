import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from '../../hooks/useTranslation';
import Icon from '../../components/AppIcon';
import AppImage from '../../components/AppImage';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';

// Import all dashboard components
import MetricsCard from './components/MetricsCard';
import BadgeGrid from './components/BadgeGrid';
import XPGrowthChart from './components/XPGrowthChart';
import CourseProgressChart from './components/CourseProgressChart';
import Leaderboard from './components/Leaderboard';
import ActivityFeed from './components/ActivityFeed';
import RecommendedCourses from './components/RecommendedCourses';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName] = useState("Alex Johnson");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return t('dashboard.greeting.morning');
    if (hour < 17) return t('dashboard.greeting.afternoon');
    return t('dashboard.greeting.evening');
  };

  const quickActions = [
    {
      title: t('dashboard.continueLearning'),
      description: t('dashboard.resumeLesson'),
      icon: "Play",
      color: "from-primary to-success",
      action: () => navigate('/courses-overview')
    },
    {
      title: t('dashboard.askAiTutor'),
      description: t('dashboard.getInstantHelp'),
      icon: "Bot",
      color: "from-secondary to-purple-600",
      action: () => navigate('/ai-tutor-chat')
    },
    {
      title: t('dashboard.joinDiscussion'),
      description: t('dashboard.connectWithPeers'),
      icon: "MessageCircle",
      color: "from-accent/80 to-yellow-600",
      action: () => console.log('Navigate to forum')
    },
    {
      title: t('dashboard.takeQuiz'),
      description: t('dashboard.testKnowledge'),
      icon: "Brain",
      color: "from-success to-emerald-600",
      action: () => navigate('/courses-overview')
    }
  ];

  return (
    <>
      <Header />
      <div className={`min-h-screen transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' :'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
      }`}>
      {/* Main Content */}
      <main className="pt-16 lg:pt-20 pb-20 lg:pb-8">
        <div className="responsive-container py-4 sm:py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 sm:mb-8"
          >
            <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
              <div className="responsive-flex lg:justify-between">
                <div className="mb-4 lg:mb-0">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                    {getGreeting()}, {userName}! 👋
                  </h1>
                  <p className="body-medium text-muted-foreground">
                    {t('dashboard.welcome')}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right hidden sm:block">
                    <p className="caption text-muted-foreground">{t('dashboard.currentTime')}</p>
                    <p className="font-mono text-base sm:text-lg font-semibold text-foreground">
                      {currentTime?.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name="User" size={24} color="white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Metrics Cards */}
          <div className="responsive-grid mb-6 sm:mb-8">
            <MetricsCard
              title={t('dashboard.totalXP')}
              value={1250}
              icon="Zap"
              color="from-warning to-orange-500"
              subtitle={t('dashboard.keepLearning')}
              trend={12}
            />
            <MetricsCard
              title={t('dashboard.currentStreak')}
              value={7}
              icon="Flame"
              color="from-accent/80 to-yellow-600"
              subtitle={t('dashboard.daysInRow')}
              trend={8}
            />
            <MetricsCard
              title={t('dashboard.coursesEnrolled')}
              value={5}
              icon="BookOpen"
              color="from-success to-green-600"
              subtitle={`3 ${t('dashboard.inProgress')}`}
              trend={0}
            />
            <MetricsCard
              title={t('dashboard.badgesEarned')}
              value={12}
              icon="Award"
              color="from-secondary to-purple-600"
              subtitle={`3 ${t('dashboard.thisWeek')}`}
              trend={25}
            />
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <h2 className="heading-4 text-foreground mb-4">{t('dashboard.quickActions')}</h2>
            <div className="responsive-grid">
              {quickActions?.map((action, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={action?.action}
                  className="modern-glass-card rounded-lg sm:rounded-xl p-4 text-left hover:shadow-lg transition-all duration-300 spring-bounce group"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${action?.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon name={action?.icon} size={20} color="white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{action?.title}</h3>
                  <p className="caption text-muted-foreground">{action?.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Left Column */}
            <div className="xl:col-span-2 space-y-6 sm:space-y-8">
              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <XPGrowthChart />
                <CourseProgressChart />
              </div>
              
              {/* Badges Grid */}
              <BadgeGrid />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <Leaderboard />
              <ActivityFeed />
            </div>
          </div>

          {/* Recommended Courses */}
          <RecommendedCourses />

          {/* Bottom CTA Section with ThinkEd Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-6 sm:mt-8"
          >
            <div className="modern-glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className="heading-3 text-foreground mb-4">
                  {t('dashboard.readyForChallenge')}
                </h2>
                <p className="body-medium text-muted-foreground mb-6">
                  {t('dashboard.exploreNewCourses')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => navigate('/courses-overview')}
                    iconName="BookOpen"
                    iconPosition="left"
                    className="spring-bounce"
                  >
                    {t('dashboard.exploreCourses')}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate('/ai-tutor-chat')}
                    iconName="Bot"
                    iconPosition="left"
                    className="spring-bounce"
                  >
                    {t('dashboard.chatWithAiTutor')}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      </div>
    </>
  );
};

export default StudentDashboard;