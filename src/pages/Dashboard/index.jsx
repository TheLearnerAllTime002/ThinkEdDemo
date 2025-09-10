import React, { useContext } from 'react';
import { GamificationContext } from '../../contexts/GamificationContext';
import ProgressCharts from '../../components/ProgressCharts';
import lessons from '../../../data/lessons.json';

const DashboardPage = () => {
  const { xp, streak, badges } = useContext(GamificationContext);

  const factOfTheDay = "The human brain weighs about 3 pounds.";

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">XP</h2>
          <p className="text-3xl text-[#F59E0B]">{xp}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Streak</h2>
          <p className="text-3xl text-[#4A9B8E]">{streak} days</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg col-span-1 lg:col-span-2">
          <h2 className="text-xl font-bold mb-2">Badges</h2>
          <div className="flex space-x-4">
            {badges.length > 0 ? (
              badges.map((badge) => (
                <div key={badge.id} className="text-center">
                  <span className="text-4xl">🏅</span>
                  <p className="text-sm">{badge.name}</p>
                </div>
              ))
            ) : (
              <p>No badges yet. Keep learning!</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Progress</h2>
            <ProgressCharts />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Recommended Lessons</h2>
            <div className="space-y-4">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">{lesson.title}</h3>
                    <p className="text-sm text-gray-400">{lesson.description}</p>
                  </div>
                  <button className="bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] text-white font-bold py-2 px-4 rounded-full">
                    Start
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Fact of the Day</h2>
          <p className="text-lg">{factOfTheDay}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;