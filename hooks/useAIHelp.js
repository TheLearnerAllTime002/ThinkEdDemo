import { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

export default function useAIHelp() {
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { speak, cancel, speaking } = useSpeechSynthesis();

  const askAI = async (question) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would call your AI API
      // For demo purposes, we'll simulate a response
      setTimeout(() => {
        setAiResponse(`I understand you're asking about: ${question}. Here's a detailed explanation...`);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setAiResponse('Sorry, I encountered an error. Please try again.');
      setIsLoading(false);
    }
  };

  const speakResponse = (text, language = 'en') => {
    if (speaking) cancel();
    speak({ text, lang: language });
  };

  return {
    aiResponse,
    isLoading,
    askAI,
    speakResponse,
    isSpeaking: speaking
  };
}
