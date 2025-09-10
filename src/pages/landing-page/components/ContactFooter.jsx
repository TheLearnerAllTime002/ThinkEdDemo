import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import AnimatedButton from '../../../components/ui/AnimatedButton';
import AnimatedCard from '../../../components/ui/AnimatedCard';
import ScrollReveal, { StaggeredReveal } from '../../../components/ui/ScrollReveal';
import AppImage from '../../../components/AppImage';
import { useAnimationConfig } from '../../../hooks/useReducedMotion';

const ContactFooter = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();
  const { getAnimationProps } = useAnimationConfig();

  const socialLinks = [
    {
      name: "Gmail",
      icon: "Mail",
      href: "mailto:contact@thinked.edu",
      color: "text-red-500",
      hoverColor: "hover:bg-red-500/10",
      description: "Send us an email",
      gradient: "from-red-500 to-red-600"
    },
    {
      name: "LinkedIn",
      icon: "Linkedin",
      href: "https://linkedin.com/company/thinked",
      color: "text-blue-600",
      hoverColor: "hover:bg-blue-600/10",
      description: "Connect with us",
      gradient: "from-blue-600 to-blue-700"
    },
    {
      name: "GitHub",
      icon: "Github",
      href: "https://github.com/thinked-platform",
      color: "text-gray-800 dark:text-gray-200",
      hoverColor: "hover:bg-gray-800/10 dark:hover:bg-gray-200/10",
      description: "View our code",
      gradient: "from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-300"
    },
    {
      name: "Twitter",
      icon: "Twitter",
      href: "https://twitter.com/thinked_edu",
      color: "text-blue-400",
      hoverColor: "hover:bg-blue-400/10",
      description: "Follow us",
      gradient: "from-blue-400 to-blue-500"
    }
  ];

  const quickLinks = [
    { label: "Home", path: "/landing-page", icon: "Home" },
    { label: "Dashboard", path: "/student-dashboard", icon: "LayoutDashboard" },
    { label: "Courses", path: "/courses-overview", icon: "BookOpen" },
    { label: "AI Tutor", path: "/ai-tutor-chat", icon: "Bot" },
    { label: "Profile", path: "/user-profile", icon: "User" }
  ];

  const supportLinks = [
    { label: "Help Center", action: () => console.log('Help Center'), icon: "HelpCircle" },
    { label: "Privacy Policy", action: () => console.log('Privacy Policy'), icon: "Shield" },
    { label: "Terms of Service", action: () => console.log('Terms of Service'), icon: "FileText" },
    { label: "Contact Support", action: () => window.open('mailto:support@thinked.edu'), icon: "MessageCircle" }
  ];

  const companyInfo = [
    { label: "About Us", action: () => console.log('About Us'), icon: "Info" },
    { label: "Careers", action: () => console.log('Careers'), icon: "Briefcase" },
    { label: "Blog", action: () => console.log('Blog'), icon: "PenTool" },
    { label: "Press Kit", action: () => console.log('Press Kit'), icon: "Download" }
  ];

  const containerVariants = getAnimationProps({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  });

  const itemVariants = getAnimationProps({
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  });

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%25239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10zm10%200c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-accent/10 to-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 responsive-container py-16 lg:py-20">
        <ScrollReveal direction="up">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mb-16">
            {/* Enhanced Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                className="flex items-center space-x-4 mb-6 cursor-pointer"
                onClick={() => navigate('/landing-page')}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div 
                  className="w-16 h-16"
                  animate={{ 
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <AppImage
                    src="/assets/images/thinked-high-resolution-logo-transparent-1757342968260.png"
                    alt="ThinkEd Logo"
                    className="w-full h-full object-contain thinked-logo drop-shadow-lg"
                  />
                </motion.div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    ThinkEd
                  </h3>
                  <p className="text-lg text-accent font-bold -mt-1 tracking-wide">
                    LEARN YOUR WAY, TODAY
                  </p>
                </div>
              </motion.div>
              
              <p className="text-lg text-slate-300 mb-8 max-w-md leading-relaxed">
                Revolutionizing education through AI-powered learning experiences. 
                Join thousands of learners who are transforming their skills with personalized, 
                adaptive learning paths designed for the future.
              </p>

              {/* Enhanced Social Links */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white">Connect With Us</h4>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks?.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social?.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-4 p-4 rounded-2xl glass-enhanced ${social?.hoverColor} transition-all duration-300 group`}
                      whileHover={{ 
                        scale: 1.05,
                        y: -2
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social?.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon name={social?.icon} size={20} color="white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{social?.name}</div>
                        <div className="text-sm text-slate-400">{social?.description}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
              <div className="space-y-4">
                {quickLinks?.map((link, index) => (
                  <motion.button
                    key={index}
                    onClick={() => navigate(link?.path)}
                    className="flex items-center space-x-3 text-slate-300 hover:text-primary transition-all duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <Icon name={link?.icon} size={18} className="group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">{link?.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Support</h4>
              <div className="space-y-4">
                {supportLinks?.map((link, index) => (
                  <motion.button
                    key={index}
                    onClick={link?.action}
                    className="flex items-center space-x-3 text-slate-300 hover:text-primary transition-all duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <Icon name={link?.icon} size={18} className="group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">{link?.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Company Info */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Company</h4>
              <div className="space-y-4">
                {companyInfo?.map((link, index) => (
                  <motion.button
                    key={index}
                    onClick={link?.action}
                    className="flex items-center space-x-3 text-slate-300 hover:text-primary transition-all duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <Icon name={link?.icon} size={18} className="group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">{link?.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Enhanced Newsletter Section */}
        <ScrollReveal direction="up" delay={0.3} className="mb-16">
          <AnimatedCard 
            variant="glass" 
            animationType="glow"
            className="p-10 lg:p-12 max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Mail" size={32} color="white" />
                </div>
              </div>
              
              <h4 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Stay Updated
              </h4>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Get the latest updates on new features, courses, and educational insights delivered straight to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl glass-input text-white placeholder-slate-400 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <AnimatedButton
                  variant="gradient"
                  size="lg"
                  animationType="spring"
                  iconName="Send"
                  iconPosition="right"
                  className="px-8 py-4 text-lg font-semibold"
                >
                  Subscribe
                </AnimatedButton>
              </div>
              
              <p className="text-sm text-slate-400 mt-4">
                No spam, unsubscribe at any time. Join 10,000+ educators and learners.
              </p>
            </motion.div>
          </AnimatedCard>
        </ScrollReveal>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-10 h-10">
                <AppImage
                  src="/assets/images/thinked-high-resolution-logo-transparent-1757342968260.png"
                  alt="ThinkEd Logo"
                  className="w-full h-full object-contain thinked-logo opacity-90"
                />
              </div>
              <div>
                <p className="text-slate-300 font-medium">
                  © {currentYear} ThinkEd. All rights reserved.
                </p>
                <p className="text-sm text-accent font-semibold">
                  Learn Your Way, Today.
                </p>
              </div>
            </motion.div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05, color: "#4A9B8E" }}
              >
                <Icon name="Globe" size={16} />
                <span>Available in 22+ languages</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05, color: "#4A9B8E" }}
              >
                <Icon name="Smartphone" size={16} />
                <span>Mobile-first design</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05, color: "#4A9B8E" }}
              >
                <Icon name="Bot" size={16} />
                <span>AI-powered learning</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05, color: "#4A9B8E" }}
              >
                <Icon name="Shield" size={16} />
                <span>100% Secure</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;