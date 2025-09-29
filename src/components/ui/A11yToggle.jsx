import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import Icon from '../AppIcon';

export const A11yToggle = () => {
  const { isA11yOn, toggleA11y } = useAccessibility();

  return (
    <button
      onClick={() => toggleA11y()}
      className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-all"
      role="switch"
      aria-checked={isA11yOn}
      aria-label="Toggle Accessibility Mode"
      title="Toggle Accessibility Mode (dyslexia font + TTS)"
    >
      <Icon 
        name={isA11yOn ? "Eye" : "EyeOff"} 
        size={18} 
        className={isA11yOn ? "text-blue-600" : "text-gray-400"}
      />
      <span className="hidden sm:inline text-sm">
        {isA11yOn ? "Accessibility On" : "Accessibility"}
      </span>
      {isA11yOn && (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
          A11y
        </span>
      )}
    </button>
  );
};