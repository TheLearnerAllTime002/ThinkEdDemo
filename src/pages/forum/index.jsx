import React from 'react';
import ForumThreads from '../../components/ForumThreads';
import forum from '../../../data/forum.json';

const ForumPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Forum</h1>
      <ForumThreads threads={forum} />
    </div>
  );
};

export default ForumPage;