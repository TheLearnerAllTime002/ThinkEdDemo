import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturesSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "Bot",
      title: "AI-Powered Tutoring",
      description: "Get personalized learning assistance with our advanced AI tutor that adapts to your learning style and pace.",
      gradient: "from-[#4A9B8E] to-[#F59E0B]",
      benefits: ["24/7 Availability", "Personalized Responses", "Instant Feedback", "Natural Conversations"],
      action: () => navigate('/ai-tutor-chat'),
      featured: true
    },
    {
      icon: "Trophy",
      title: "Gamified Learning",
      description: "Earn XP points, maintain streaks, and unlock badges as you progress through your educational journey.",
      gradient: "from-[#F59E0B] to-[#4A9B8E]",
      benefits: ["XP Points System", "Daily Streaks", "Achievement Badges", "Leaderboards"],
      action: () => navigate('/student-dashboard')
    },
    {
      icon: "Globe",
      title: "Multilingual Support",
      description: "Learn in your preferred language with support for English, Hindi, and 22+ other languages.",
      gradient: "from-[#4A9B8E] to-[#5BAE9F]",
      benefits: ["22+ Languages", "Real-time Translation", "Cultural Context", "Native Speakers"],
      action: () => navigate('/courses-overview')
    },
    {
      icon: "BarChart3",
      title: "Progress Analytics",
      description: "Track your learning progress with detailed analytics, performance insights, and personalized recommendations.",
      gradient: "from-[#5BAE9F] to-[#F59E0B]",
      benefits: ["Detailed Analytics", "Performance Insights", "Smart Recommendations", "Goal Tracking"],
      action: () => navigate('/student-dashboard'),
      featured: true
    },
    {
      icon: "Users",
      title: "Community Learning",
      description: "Connect with fellow learners, participate in discussions, and learn collaboratively in our vibrant community.",
      gradient: "from-[#F59E0B] to-[#5BAE9F]",
      benefits: ["Peer Learning", "Discussion Forums", "Study Groups", "Mentorship"],
      action: () => navigate('/student-dashboard')
    },
    {
      icon: "Smartphone",
      title: "Mobile-First Design",
      description: "Access your learning materials anywhere, anytime with our responsive design and offline capabilities.",
      gradient: "from-[#5BAE9F] to-[#4A9B8E]",
      benefits: ["Offline Access", "Responsive Design", "Cross-Platform", "PWA Support"],
      action: () => navigate('/courses-overview')
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const FeatureCard = ({ feature, index }) => (
    <motion.div
      variants={cardVariants}
      className={`modern-glass-card p-8 lg:p-10 group cursor-pointer relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl hover:shadow-[#4A9B8E]/20 rounded-2xl ${
        feature?.featured ? 'ring-2 ring-[#4A9B8E]/30 ring-offset-2 ring-offset-transparent' : ''
      }`}
      onClick={feature?.action}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Featured Badge */}
      {feature?.featured && (
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1 bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] text-white text-xs font-bold rounded-full shadow-lg">
            POPULAR
          </div>
        </div>
      )}

      {/* Modern Icon */}
      <motion.div 
        className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${feature?.gradient} flex items-center justify-center mb-8 relative shadow-xl`}
        whileHover={{ 
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      >
        <Icon name={feature?.icon} size={36} color="white" />
        <div className="absolute inset-0 rounded-3xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Content */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white group-hover:text-[#4A9B8E] transition-colors duration-300 mb-3">
            {feature?.title}
          </h3>
          
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
            {feature?.description}
          </p>
        </div>

        {/* Modern Benefits */}
        <div className="grid grid-cols-2 gap-3">
          {feature?.benefits?.map((benefit, idx) => (
            <motion.div 
              key={idx} 
              className="flex items-center space-x-3 text-sm group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
            >
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${feature?.gradient} flex-shrink-0 shadow-sm`} />
              <span className="text-slate-500 dark:text-slate-400 font-medium">{benefit}</span>
            </motion.div>
          ))}
        </div>

        {/* Modern Action Button */}
        <div className="pt-6">
          <Button
            variant="ghost"
            size="md"
            iconName="ArrowRight"
            iconPosition="right"
            className="text-[#4A9B8E] hover:text-white hover:bg-[#4A9B8E] group-hover:translate-x-2 transition-all duration-300 font-semibold"
          >
            Explore Feature
          </Button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-[#4A9B8E]/5 to-[#F59E0B]/5" />
    </motion.div>
  );

  return (
    <section id="features-section" className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-[#4A9B8E]/10 to-[#F59E0B]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-[#F59E0B]/8 to-[#4A9B8E]/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#4A9B8E]/5 to-[#F59E0B]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Modern Section Header */}
        <motion.div 
          className="text-center mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-8 shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Icon name="Sparkles" size={24} color="#4A9B8E" />
            <span className="text-lg font-semibold text-[#4A9B8E]">Platform Features</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-[#4A9B8E] via-[#5BAE9F] to-[#F59E0B] bg-clip-text text-transparent">
              Everything You Need
            </span>
            <br />
            <span className="text-slate-800 dark:text-white">for Smart Learning</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Discover powerful features designed to enhance your learning experience and help you achieve your educational goals faster than ever before.
          </p>
        </motion.div>

        {/* Modern Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {features?.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </motion.div>

        {/* Modern CTA Section */}
        <motion.div 
          className="text-center mt-20 lg:mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div className="modern-glass-card p-12 lg:p-16 max-w-4xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl">
            <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] bg-clip-text text-transparent">
              Ready to Transform Your Learning?
            </h3>
            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Join thousands of students who are already experiencing the future of education with ThinkEd's AI-powered platform.
            </p>
            
            {/* Modern CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                onClick={() => navigate('/authentication')}
                className="group relative px-12 py-4 text-xl font-bold text-white bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] rounded-2xl shadow-2xl hover:shadow-[#4A9B8E]/25 transition-all duration-300 overflow-hidden animate-pulse-glow"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B] to-[#4A9B8E] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <Icon name="Rocket" size={24} />
                  <span>Get Started Now</span>
                </div>
              </motion.button>
              
              <motion.button
                onClick={() => navigate('/courses-overview')}
                className="group px-12 py-4 text-xl font-bold text-[#4A9B8E] bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <Icon name="BookOpen" size={24} />
                  <span>Browse Courses</span>
                </div>
              </motion.button>
            </div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-8 mt-12 text-sm text-slate-500 dark:text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} />
                <span>50K+ Students</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;