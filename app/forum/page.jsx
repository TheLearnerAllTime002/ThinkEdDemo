import { useState } from 'react';
import { motion } from 'framer-motion';
import ForumThreads from '@/components/ForumThreads';

export default function ForumPage() {
  const [newThread, setNewThread] = useState('');
  
  // Dummy forum data
  const threads = [
    {
      id: 1,
      title: 'Help with quadratic equations',
      author: 'Student123',
      content: 'I\'m having trouble understanding how to solve quadratic equations. Can someone explain?',
      subject: 'Mathematics',
      upvotes: 12,
      replies: 5,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      title: 'Best resources for learning React?',
      author: 'CodeLearner',
      content: 'Looking for recommendations on tutorials and courses for React beginners.',
      subject: 'Programming',
      upvotes: 8,
      replies: 3,
      timestamp: '5 hours ago'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newThread.trim()) {
      // In a real app, this would create a new thread
      console.log('Creating new thread:', newThread);
      setNewThread('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A9B8E]/10 to-[#F59E0B]/10 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 mb-6"
        >
          <h1 className="text-3xl font-bold text-white mb-6">Community Forum</h1>
          
          <form onSubmit={handleSubmit} className="mb-6">
            <input
              type="text"
              value={newThread}
              onChange={(e) => setNewThread(e.target.value)}
              placeholder="Start a new discussion..."
              className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="bg-[#4A9B8E] text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Post Question
              </button>
            </div>
          </form>
          
          <ForumThreads threads={threads} />
        </motion.div>
      </div>
    </div>
  );
}
