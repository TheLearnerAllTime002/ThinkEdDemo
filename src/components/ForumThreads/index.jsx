import React from 'react';
import { motion } from 'framer-motion';

const ForumThreads = ({ threads }) => {
  return (
    <div className="space-y-6">
      {threads.map((thread, index) => (
        <motion.div
          key={thread.id}
          className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">{thread.title}</h3>
            <p className="text-gray-400">
              by <span className="font-semibold">{thread.author}</span>
            </p>
          </div>
          <div className="bg-gray-700 px-6 py-4">
            <p className="text-gray-300">{thread.posts[0].content}</p>
            <button className="text-sm font-semibold text-[#4A9B8E] hover:text-[#F59E0B] mt-4">
              Read More &rarr;
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ForumThreads;