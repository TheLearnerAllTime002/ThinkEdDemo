import { useState } from 'react';
import { motion } from 'framer-motion';
import useAIHelp from '@/hooks/useAIHelp';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AITutorPage() {
  const [question, setQuestion] = useState('');
  const { aiResponse, isLoading, askAI, speakResponse, isSpeaking } = useAIHelp();
  const { language } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      askAI(question);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A9B8E]/10 to-[#F59E0B]/10 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30"
        >
          <h1 className="text-3xl font-bold text-white mb-6">AI Tutor Assistant</h1>
          
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask any question about your lesson..."
                className="flex-1 bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-[#4A9B8E] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#3a8a7d] transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Thinking...' : 'Ask'}
              </button>
            </div>
          </form>

          {aiResponse && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 bg-black/20 rounded-lg p-4"
            >
              <div className="text-white mb-4">{aiResponse}</div>
              <button
                onClick={() => speakResponse(aiResponse, language)}
                className="bg-[#F59E0B] text-white px-4 py-2 rounded-lg text-sm font-medium"
                disabled={isSpeaking}
              >
                {isSpeaking ? 'Speaking...' : 'Hear Explanation'}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
