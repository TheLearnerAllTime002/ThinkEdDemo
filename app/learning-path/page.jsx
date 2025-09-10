import { useState } from 'react';
import { motion } from 'framer-motion';
import GamifiedCards from '@/components/GamifiedCards';
import { useGamification } from '@/contexts/GamificationContext';

export default function LearningPathPage() {
  const { addXp } = useGamification();
  
  const [selectedPath, setSelectedPath] = useState(null);
  
  const learningPaths = [
    {
      id: 1,
      title: 'Core Subjects',
      icon: '📚',
      description: 'Mathematics, Science, Language Arts, and Social Studies',
      subjects: ['Algebra', 'Physics', 'Literature', 'History']
    },
    {
      id: 2,
      title: 'Skill Courses',
      icon: '💻',
      description: 'Programming, Design, Business, and Creative Arts',
      subjects: ['Python', 'UI/UX Design', 'Entrepreneurship', 'Digital Art']
    }
  ];

  const handleSelectPath = (path) => {
    setSelectedPath(path);
    addXp(10); // Award XP for path selection
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A9B8E]/10 to-[#F59E0B]/10 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30"
        >
          <h1 className="text-3xl font-bold text-white mb-6">Choose Your Learning Path</h1>
          
          {!selectedPath ? (
            <>
              <p className="text-white/80 mb-6">Select a path that matches your learning goals:</p>
              <GamifiedCards 
                items={learningPaths} 
                onSelect={handleSelectPath}
              />
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center mb-6">
                <button 
                  onClick={() => setSelectedPath(null)}
                  className="mr-4 text-white"
                >
                  ← Back
                </button>
                <h2 className="text-2xl font-bold text-white">{selectedPath.title}</h2>
              </div>
              
              <p className="text-white/80 mb-4">{selectedPath.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                {selectedPath.subjects.map((subject, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 cursor-pointer hover:bg-white/20 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-white">{subject}</h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
