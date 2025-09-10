import { motion } from 'framer-motion';
import { AuthContext } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A9B8E] to-[#F59E0B] p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center pt-20"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">ThinkEd Smart Learning Platform</h1>
        <p className="text-xl text-white mb-10 max-w-2xl mx-auto">Personalized, gamified education with AI-powered tutoring</p>
        
        <div className="flex justify-center gap-4">
          <Link href="/auth/signup">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#4A9B8E] px-6 py-3 rounded-full font-semibold text-lg"
            >
              Get Started
            </motion.button>
          </Link>
          <Link href="/auth/signin">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold text-lg"
            >
              Sign In
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
