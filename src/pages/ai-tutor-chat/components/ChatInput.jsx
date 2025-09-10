import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../../hooks/useTranslation';
import Icon from '../../../components/AppIcon';

const ChatInput = ({ onSendMessage, disabled = false }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const quickQuestions = [
    t('aiTutor.quickSuggestions.explain'),
    t('aiTutor.quickSuggestions.example'),
    t('aiTutor.quickSuggestions.practice'),
    t('aiTutor.quickSuggestions.check')
  ];

  return (
    <div className="space-y-3">
      {/* Quick Questions */}
      {quickQuestions.length > 0 && (
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
            Quick:
          </span>
          {quickQuestions?.map((question, index) => (
            <button
              key={index}
              onClick={() => setMessage(question)}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full transition-colors whitespace-nowrap"
            >
              {question}
            </button>
          ))}
        </div>
      )}
      
      {/* Input Area */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-end space-x-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3 shadow-sm focus-within:ring-2 focus-within:ring-[#4A9B8E]/20 focus-within:border-[#4A9B8E]/50 transition-all">
          {/* Message Input */}
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('aiTutor.placeholder')}
              disabled={disabled}
              className="w-full resize-none border-0 bg-transparent focus:outline-none text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 text-sm leading-relaxed min-h-[24px] max-h-32"
              rows={1}
              style={{
                height: 'auto',
                minHeight: '24px'
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e?.target?.scrollHeight, 128) + 'px';
              }}
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={disabled || !message?.trim()}
            className={`p-2 rounded-xl transition-all ${
              message?.trim() && !disabled
                ? 'bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] hover:from-[#5BAE9F] hover:to-[#FCD34D] text-white shadow-lg hover:shadow-xl'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
            }`}
          >
            <Icon name="Send" size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;