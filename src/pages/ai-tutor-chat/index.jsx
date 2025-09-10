import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from '../../hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import GeminiService from '../../services/geminiApi';
import Header from '../../components/ui/Header';
import MessageBubble from './components/MessageBubble';
import ChatInput from './components/ChatInput';
import SubjectSelector from './components/SubjectSelector';
import Icon from '../../components/AppIcon';
import AppImage from '../../components/AppImage';

const AITutorChat = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('general');
  const [isTyping, setIsTyping] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: 'welcome',
      content: t('aiTutor.welcomeMessage'),
      isUser: false,
      timestamp: new Date(),
      quickActions: [
        t('aiTutor.quickActions.mathProblems'), 
        t('aiTutor.quickActions.scienceConcepts'), 
        t('aiTutor.quickActions.writingHelp'), 
        t('aiTutor.subjects.programming'), 
        t('aiTutor.subjects.history'), 
        t('aiTutor.quickActions.generalQuestions')
      ]
    };
    setMessages([welcomeMessage]);
    setCurrentSessionId(Date.now().toString());
  }, [t]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content, metadata = {}) => {
    const newMessage = {
      id: Date.now(),
      content,
      isUser: true,
      timestamp: new Date(),
      ...metadata
    };

    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);
    
    try {
      // Get AI response from Gemini
      const response = await GeminiService.generateResponse(content, {
        subject: selectedSubject,
        conversationHistory: messages
      });

      const aiResponse = {
        id: Date.now() + 1,
        content: response.content,
        isUser: false,
        timestamp: new Date(),
        quickActions: GeminiService.generateQuickActions(selectedSubject, response.content),
        isError: !response.success
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorResponse = {
        id: Date.now() + 1,
        content: t('aiTutor.errorMessage'),
        isUser: false,
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action);
  };

  const handleNewChat = () => {
    const welcomeMessage = {
      id: 'welcome-' + Date.now(),
      content: t('aiTutor.welcomeMessage'),
      isUser: false,
      timestamp: new Date(),
      quickActions: [
        t('aiTutor.quickActions.mathProblems'), 
        t('aiTutor.quickActions.scienceConcepts'), 
        t('aiTutor.quickActions.writingHelp'), 
        t('aiTutor.subjects.programming'), 
        t('aiTutor.subjects.history'), 
        t('aiTutor.quickActions.generalQuestions')
      ]
    };
    setMessages([welcomeMessage]);
    setCurrentSessionId(Date.now().toString());
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('aiTutor.title')} - ThinkEd</title>
        <meta name="description" content="Chat with your AI tutor powered by Gemini for personalized learning assistance" />
      </Helmet>
      
      <Header />
      <div className={`min-h-screen transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
          : 'bg-gradient-to-br from-white via-slate-50 to-blue-50/30'
      }`}>
        {/* Subject Selector Header */}
        <div className="fixed top-16 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A9B8E] to-[#F59E0B] flex items-center justify-center">
                  <Icon name="Bot" size={16} color="white" />
                </div>
                <div>
                  <h1 className="font-semibold text-slate-900 dark:text-white">{t('aiTutor.title')}</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t('aiTutor.poweredBy')}</p>
                </div>
              </div>
              <button
                onClick={handleNewChat}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {t('aiTutor.newChat')}
              </button>
            </div>
            <div className="mt-3">
              <SubjectSelector 
                selectedSubject={selectedSubject}
                onSubjectChange={setSelectedSubject}
              />
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="pt-48 pb-32 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="space-y-6"
            >
              {messages?.map((message) => (
                <MessageBubble
                  key={message?.id}
                  message={message}
                  isUser={message?.isUser}
                  onQuickAction={handleQuickAction}
                />
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A9B8E] to-[#F59E0B] flex items-center justify-center flex-shrink-0">
                    <Icon name="Bot" size={16} color="white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl px-4 py-3 shadow-sm border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-75"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></div>
                        </div>
                        <span className="text-sm text-slate-500">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Fixed Chat Input */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <ChatInput 
              onSendMessage={handleSendMessage}
              disabled={isTyping}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AITutorChat;