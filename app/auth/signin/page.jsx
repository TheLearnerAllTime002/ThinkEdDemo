import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { auth, googleProvider } from '@/firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { language, changeLanguage, t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
    }
  };

  const handleDemoLogin = () => {
    // Set demo mode in localStorage
    localStorage.setItem('demoMode', 'true');
    // Redirect to dashboard with demo content
    window.location.href = '/dashboard?demo=true';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4A9B8E] to-[#F59E0B] p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-white/20 shadow-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">{t('signin')} ThinkEd</h1>
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

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-200 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-white mb-2">{t('email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white mb-2">{t('password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#F59E0B] text-white py-3 rounded-lg font-semibold hover:bg-[#e08d00] transition-colors"
          >
            {t('signin')}
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-white/30"></div>
            <span className="mx-4 text-white/80">{t('or')}</span>
            <div className="flex-grow border-t border-white/30"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-white text-gray-800 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t('googleSignin')}
          </button>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full bg-[#4A9B8E] text-white py-3 rounded-lg font-semibold hover:bg-[#3a8a7d] transition-colors"
          >
            {t('demo')}
          </button>
        </form>

        <p className="text-white/80 text-center mt-6">
          {t('accountQuestion')}{' '}
          <Link href="/auth/signup" className="text-[#F59E0B] font-semibold hover:underline">
            {t('signup')}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
