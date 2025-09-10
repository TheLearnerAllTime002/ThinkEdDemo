import { motion } from 'framer-motion';
import { useGamification } from '@/contexts/GamificationContext';

export default function ForumThreads({ threads }) {
  const { addXp } = useGamification();

  const handleUpvote = (threadId) => {
    // In a real implementation, this would update the backend
    console.log(`Upvoted thread ${threadId}`);
    addXp(5); // Award XP for engagement
  };

  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <motion.div
          key={thread.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">{thread.title}</h3>
              <p className="text-white/80 text-sm">by {thread.author}</p>
            </div>
            <span className="bg-[#4A9B8E] text-white px-3 py-1 rounded-full text-xs">
              {thread.subject}
            </span>
          </div>
          
          <p className="text-white mb-4">{thread.content}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleUpvote(thread.id)}
                className="flex items-center gap-1 text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                {thread.upvotes}
              </button>
              <span className="text-white/80">{thread.replies} replies</span>
            </div>
            <span className="text-white/80 text-sm">{thread.timestamp}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
