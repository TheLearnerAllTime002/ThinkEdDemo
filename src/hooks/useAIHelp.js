import { useState } from 'react';

export const useAIHelp = () => {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  const openAIAssistant = () => setIsAIAssistantOpen(true);
  const closeAIAssistant = () => setIsAIAssistantOpen(false);

  return { isAIAssistantOpen, openAIAssistant, closeAIAssistant };
};