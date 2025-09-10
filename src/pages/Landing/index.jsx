import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B]">ThinkEd</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Your personalized journey to knowledge and mastery.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Link to="/dashboard">
          <button className="bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Get Started
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default LandingPage;