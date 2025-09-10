import React from 'react';
import Flashcards from '../../components/Flashcards';

const RevisionPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Revision</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Flashcards</h2>
          <Flashcards />
        </div>
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">One-Pagers</h2>
            <p className="text-gray-400">
              Review key concepts with our concise one-page summaries.
            </p>
            <button className="mt-4 bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] text-white font-bold py-2 px-4 rounded-full">
              View One-Pagers
            </button>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Quick Tests</h2>
            <p className="text-gray-400">
              Test your knowledge with short, focused quizzes.
            </p>
            <button className="mt-4 bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] text-white font-bold py-2 px-4 rounded-full">
              Take a Quick Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevisionPage;