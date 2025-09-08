import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import ContactFooter from './components/ContactFooter';

const LandingPage = () => {
  useEffect(() => {
    // Smooth scroll behavior for the page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.8
  };

  return (
    <>
      <Helmet>
        <title>ThinkEd - AI-Powered Smart Learning Platform</title>
        <meta name="description" content="Transform your learning journey with ThinkEd's AI-powered education platform. Featuring personalized tutoring, gamified learning, and multilingual support for students worldwide." />
        <meta name="keywords" content="AI education, online learning, personalized tutoring, gamified learning, multilingual education, smart learning platform" />
        <meta property="og:title" content="ThinkEd - Learn Smarter with AI Power" />
        <meta property="og:description" content="Experience personalized education with AI tutoring, gamified learning, and multilingual support. Join thousands of students transforming their learning journey." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ThinkEd - AI-Powered Smart Learning" />
        <meta name="twitter:description" content="Transform your education with AI-powered personalized learning, gamification, and multilingual support." />
        <link rel="canonical" href="https://thinked.edu/landing-page" />
      </Helmet>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen bg-background"
      >
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Contact Footer */}
        <ContactFooter />


      </motion.div>
    </>
  );
};

export default LandingPage;