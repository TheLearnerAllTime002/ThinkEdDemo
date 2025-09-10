import { useEffect } from 'react';
import { motion } from 'framer-motion';
import GamifiedCards from '@/components/GamifiedCards';
import { useGamification } from '@/contexts/GamificationContext';
import useProgress from '@/hooks/useProgress';

export default function DashboardPage() {
  const { xp, streak, badges, addXp } = useGamification();
  const { getSubjectProgress } = useProgress();

  useEffect(() => {
    // Check for demo mode
    if (localStorage.getItem('demoMode') === 'true') {
      addXp(500);
      // Load demo content
      console.log('Loading demo content');
    }
  }, []);

  // Dummy data for demonstration
  const recommendedLessons = [
    { id: 1, title: 'Algebra Basics', progress: 65 },
    { id: 2, title: 'Chemistry Fundamentals', progress: 40 },
    { id: 3, title: 'World History', progress: 80 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A9B8E]/10 to-[#F59E0B]/10 p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header with stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30">
            <h3 className="text-lg text-white/80 mb-2">Total XP</h3>
            <p className="text-3xl font-bold text-white">{xp}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30">
            <h3 className="text-lg text-white/80 mb-2">Current Streak</h3>
            <p className="text-3xl font-bold text-white">{streak} days</p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30">
            <h3 className="text-lg text-white/80 mb-2">Badges Earned</h3>
            <p className="text-3xl font-bold text-white">{badges.length}</p>
          </div>
        </div>

        {/* Recommended Lessons */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Recommended Lessons</h2>
          <GamifiedCards 
            items={recommendedLessons.map(lesson => ({
              id: lesson.id,
              title: lesson.title,
              description: `${lesson.progress}% completed`,
              icon: '📚'
            }))} 
            onSelect={(lesson) => console.log('Selected lesson:', lesson)}
          />
        </div>

        {/* Fact of the Day */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Did You Know?</h2>
          <p className="text-white/80">The human brain can process images in as little as 13 milliseconds - 60,000 times faster than text!</p>
        </div>
      </motion.div>
    </div>
  );
}
