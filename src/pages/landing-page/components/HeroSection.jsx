import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../../hooks/useTranslation';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const stats = [
    { number: 50000, label: t('landing.stats.activeStudents'), suffix: "+", icon: "Users" },
    { number: 1200, label: t('landing.stats.coursesAvailable'), suffix: "+", icon: "BookOpen" },
    { number: 98, label: t('landing.stats.successRate'), suffix: "%", icon: "TrendingUp" },
    { number: 24, label: t('landing.stats.languagesSupported'), suffix: "", icon: "Globe" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const CounterAnimation = ({ number, label, suffix, icon }) => {
    const [count, setCount] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
      if (!isVisible) return;

      const duration = 2000;
      const steps = 50;
      const increment = number / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          setCount(number);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [number, isVisible]);

    return (
      <motion.div
        variants={itemVariants}
        className="text-center modern-glass-card p-6 lg:p-8 rounded-2xl group cursor-pointer backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl hover:shadow-primary/20"
        whileHover={{ 
          y: -8,
          scale: 1.05,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        onViewportEnter={() => setIsVisible(true)}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4A9B8E] to-[#F59E0B] flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
            <Icon name={icon} size={26} color="white" />
          </div>
        </div>
        <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#4A9B8E] via-[#5BAE9F] to-[#F59E0B] bg-clip-text text-transparent">
          {count?.toLocaleString()}{suffix}
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-300 mt-2 font-medium">{label}</div>
      </motion.div>
    );
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 dark:from-slate-900 dark:via-slate-800/50 dark:to-emerald-900/20">
      {/* Modern Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Gradient Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-[#4A9B8E]/10 to-[#F59E0B]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#F59E0B]/8 to-[#4A9B8E]/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#4A9B8E]/5 to-[#F59E0B]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            y: [-15, 15, -15],
            rotate: [0, 90, 180],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-32 left-16 w-12 h-12 bg-gradient-to-br from-[#4A9B8E]/20 to-[#F59E0B]/20 rounded-xl backdrop-blur-sm"
        />
        <motion.div
          animate={{
            y: [15, -15, 15],
            rotate: [180, 90, 0],
            scale: [1.05, 1, 1.05]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-32 right-16 w-16 h-16 bg-gradient-to-br from-[#F59E0B]/15 to-[#4A9B8E]/15 rounded-full backdrop-blur-sm"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >


          {/* Animated Brand Heading */}
          <motion.div 
            variants={itemVariants} 
            className="mb-8"
          >
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-[#4A9B8E] via-[#5BAE9F] to-[#F59E0B] bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%',
                  backgroundImage: 'linear-gradient(45deg, #4A9B8E, #5BAE9F, #F59E0B, #4A9B8E)',
                }}
              >
                Think
              </motion.span>
              <motion.span
                className="inline-block bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#4A9B8E] bg-clip-text text-transparent ml-2"
                animate={{
                  backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.5
                }}
                style={{
                  backgroundSize: '200% 200%',
                  backgroundImage: 'linear-gradient(45deg, #F59E0B, #FCD34D, #4A9B8E, #F59E0B)',
                }}
              >
                Ed
              </motion.span>
            </motion.h1>
            
            {/* Animated underline */}
            <motion.div
              className="h-2 bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] rounded-full mx-auto mt-4"
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ duration: 1, delay: 1.5 }}
            />
          </motion.div>

          {/* Modern Main Heading */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800 dark:text-white mb-8 leading-tight">
              Transform Your Learning with
              <br />
              <span className="bg-gradient-to-r from-[#4A9B8E] via-[#5BAE9F] to-[#F59E0B] bg-clip-text text-transparent">
                AI-Powered Education
              </span>
            </h2>
            <p className="text-xl sm:text-2xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
              Experience personalized learning with adaptive AI tutoring, gamified progress tracking, and multilingual support designed for the modern learner.
            </p>
          </motion.div>

          {/* Modern CTA Buttons */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                onClick={() => navigate('/authentication')}
                className="group relative px-12 py-4 text-xl font-bold text-white bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] rounded-2xl shadow-2xl hover:shadow-[#4A9B8E]/25 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B] to-[#4A9B8E] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <Icon name="Rocket" size={24} />
                  <span>Start Learning Free</span>
                </div>
              </motion.button>
              
              <motion.button
                onClick={() => navigate('/ai-tutor-chat')}
                className="group px-12 py-4 text-xl font-bold text-[#4A9B8E] bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <Icon name="Play" size={24} />
                  <span>Try AI Tutor</span>
                </div>
              </motion.button>
            </div>
            <motion.p 
              className="text-sm text-slate-500 dark:text-slate-400 mt-6 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              No credit card required • Join 50,000+ learners worldwide • Available in 24+ languages
            </motion.p>
          </motion.div>

          {/* Modern Stats Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <motion.h3 
              className="text-2xl font-semibold text-center mb-12 text-slate-600 dark:text-slate-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              Trusted by learners worldwide
            </motion.h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats?.map((stat, index) => (
                <CounterAnimation
                  key={index}
                  number={stat?.number}
                  label={stat?.label}
                  suffix={stat?.suffix}
                  icon={stat?.icon}
                />
              ))}
            </div>
          </motion.div>

          {/* Floating Scroll Indicator with Particle Animation */}
          <motion.div
            variants={itemVariants}
            className="mt-20 flex justify-center"
          >
            <motion.div
              className="flex flex-col items-center cursor-pointer group relative"
              onClick={() => {
                document.getElementById('features-section')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Floating Text with Gradient */}
              <motion.span 
                className="text-lg font-medium mb-8 bg-gradient-to-r from-slate-500 via-[#4A9B8E] to-[#F59E0B] bg-clip-text text-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Discover Our Features
              </motion.span>
              
              {/* Floating Particles Around Arrow */}
              <div className="relative">
                {/* Particle 1 */}
                <motion.div
                  className="absolute w-2 h-2 bg-[#4A9B8E]/40 rounded-full"
                  animate={{
                    x: [-15, 15, -15],
                    y: [-10, 10, -10],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0
                  }}
                />
                
                {/* Particle 2 */}
                <motion.div
                  className="absolute w-1.5 h-1.5 bg-[#F59E0B]/50 rounded-full"
                  animate={{
                    x: [20, -20, 20],
                    y: [15, -15, 15],
                    opacity: [0.3, 0.9, 0.3],
                    scale: [0.3, 1.2, 0.3]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8
                  }}
                />
                
                {/* Particle 3 */}
                <motion.div
                  className="absolute w-1 h-1 bg-slate-400/60 rounded-full"
                  animate={{
                    x: [-25, 25, -25],
                    y: [20, -20, 20],
                    opacity: [0.1, 0.7, 0.1],
                    scale: [0.8, 1.5, 0.8]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                />
                
                {/* Central Floating Arrow */}
                <motion.div
                  className="relative z-10 flex items-center justify-center w-12 h-12"
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A9B8E]/20 to-[#F59E0B]/20 flex items-center justify-center group-hover:from-[#4A9B8E]/40 group-hover:to-[#F59E0B]/40 transition-all duration-500"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(74, 155, 142, 0)',
                        '0 0 0 10px rgba(74, 155, 142, 0.1)',
                        '0 0 0 20px rgba(74, 155, 142, 0)',
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  >
                    <Icon name="ChevronDown" size={20} className="text-[#4A9B8E] group-hover:text-[#F59E0B] transition-colors duration-300" />
                  </motion.div>
                </motion.div>
                
                {/* Subtle Glow Effect */}
                <motion.div
                  className="absolute inset-0 w-16 h-16 -translate-x-2 -translate-y-2 bg-gradient-to-r from-[#4A9B8E]/5 to-[#F59E0B]/5 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;