import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGamification } from '@/contexts/GamificationContext';

export default function OnboardingPage() {
  const [username, setUsername] = useState('');
  const [interests, setInterests] = useState([]);
  const { language, changeLanguage, t } = useLanguage();
  const { addXp } = useGamification();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save user profile
    localStorage.setItem('userProfile', JSON.stringify({ username, interests }));
    addXp(100); // Award XP for completing onboarding
    window.location.href = '/dashboard';
  };

  const interestOptions = [
    'Mathematics', 'Science', 'Programming', 'History',
    'Literature', 'Art', 'Business', 'Languages'
  ];

  const toggleInterest = (interest) => {
    setInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4A9B8E] to-[#F59E0B] p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl p-8 border-2 border-white/20 shadow-2xl"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Complete Your Profile</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Choose a Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Select Your Interests</label>
            <div className="grid grid-cols-2 gap-2">
              {interestOptions.map(interest => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`py-2 px-3 rounded-lg transition-colors ${interests.includes(interest) 
                    ? 'bg-[#F59E0B] text-white' 
                    : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label className="block text-white mb-2">Preferred Language</label>
            <select 
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-white/20 text-white border border-white/30 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="bn">Bengali</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#F59E0B] text-white py-3 rounded-lg font-semibold hover:bg-[#e08d00] transition-colors"
          >
            Complete Setup
          </button>
        </form>
      </motion.div>
    </div>
  );
}
