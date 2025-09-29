import React, { useState } from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { TextToSpeechControls } from './TextToSpeechControls';
import Icon from '../AppIcon';

export const AccessibilityPanel = () => {
  const { isA11yOn } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  if (!isA11yOn) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="mb-2">
          <TextToSpeechControls />
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={isOpen ? "Close accessibility controls" : "Open accessibility controls"}
        title="Accessibility Controls"
      >
        <Icon name={isOpen ? "X" : "Volume2"} size={16} />
        {!isOpen && <span className="text-sm">TTS</span>}
      </button>
    </div>
  );
};