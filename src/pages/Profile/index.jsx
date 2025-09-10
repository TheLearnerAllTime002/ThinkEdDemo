import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { GamificationContext } from '../../contexts/GamificationContext';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const { xp, streak, badges } = useContext(GamificationContext);
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">User Profile</h1>
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <img
            src={user?.photoURL || 'https://via.placeholder.com/150'}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mr-6"
          />
          <div>
            <h2 className="text-2xl font-bold">{user?.displayName || 'Anonymous User'}</h2>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">XP</h3>
            <p className="text-2xl text-[#F59E0B]">{xp}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Streak</h3>
            <p className="text-2xl text-[#4A9B8E]">{streak} days</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Badges</h3>
            <p className="text-2xl">{badges.length}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">Settings</h3>
          <div className="flex items-center">
            <label htmlFor="language-select" className="mr-4">
              Language:
            </label>
            <select
              id="language-select"
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="bg-gray-700 text-white rounded-md py-2 px-4"
            >
              <option value="en">English</option>
              <option value="bn">Bengali</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;