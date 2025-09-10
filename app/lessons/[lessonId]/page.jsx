import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGamification } from '@/contexts/GamificationContext';

export default function LessonPage() {
  const { addXp } = useGamification();
  const [activeTab, setActiveTab] = useState('notes');
  
  // Dummy lesson data
  const lesson = {
    id: 1,
    title: 'Introduction to Algebra',
    description: 'Learn the basics of algebraic expressions and equations',
    content: {
      notes: 'Algebra is a branch of mathematics...',
      quiz: [
        { question: 'What is 2x + 3 = 7?', options: ['x=1', 'x=2', 'x=3'], answer: 1 }
      ],
      revision: 'Key concepts: variables, equations, solving for x'
    }
  };

  const handleComplete = () => {
    addXp(25); // Award XP for completing lesson
    // Navigate to next lesson or dashboard
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A9B8E]/10 to-[#F59E0B]/10 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30"
        >
          <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
          <p className="text-white/80 mb-6">{lesson.description}</p>
          
          <div className="flex border-b border-white/20 mb-6">
            {['notes', 'quiz', 'revision'].map(tab => (
              <button
                key={tab}
                className={`px-4 py-2 font-medium ${activeTab === tab ? 'text-[#F59E0B] border-b-2 border-[#F59E0B]' : 'text-white/60'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="mb-6">
            {activeTab === 'notes' && (
              <div className="prose prose-invert max-w-none">
                <p>{lesson.content.notes}</p>
              </div>
            )}
            
            {activeTab === 'quiz' && (
              <div className="space-y-4">
                {lesson.content.quiz.map((q, i) => (
                  <div key={i} className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-2">{q.question}</h3>
                    <div className="space-y-2">
                      {q.options.map((option, j) => (
                        <button
                          key={j}
                          className="block w-full text-left bg-white/5 hover:bg-white/10 text-white rounded px-4 py-2 transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'revision' && (
              <div className="bg-[#4A9B8E]/20 rounded-lg p-4 border border-[#4A9B8E]/30">
                <p className="text-white">{lesson.content.revision}</p>
              </div>
            )}
          </div>
          
          <button
            onClick={handleComplete}
            className="bg-[#F59E0B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e08d00] transition-colors"
          >
            Mark as Completed
          </button>
        </motion.div>
      </div>
    </div>
  );
}
