import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { simpleTTS } from '../utils/simpleTTS';

const AccessibilityContext = createContext();

const AKEY = 'thinked:a11y';
const TKEY = 'thinked:tts';

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider = ({ children }) => {
  const [isA11yOn, setIsA11yOn] = useState(() => {
    try { return localStorage.getItem(AKEY) === '1'; } catch { return false; }
  });

  const [ttsSettings, setTts] = useState(() => {
    try {
      const saved = localStorage.getItem(TKEY);
      return saved ? JSON.parse(saved) : { rate: 1, pitch: 1, volume: 1, voiceURI: undefined, language: 'en', useOffline: false };
    } catch { return { rate: 1, pitch: 1, volume: 1, voiceURI: undefined, language: 'en', useOffline: false }; }
  });

  const synthRef = useRef(window.speechSynthesis);
  const utterRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('a11y-on', isA11yOn);
    try { localStorage.setItem(AKEY, isA11yOn ? '1' : '0'); } catch {}
  }, [isA11yOn]);

  useEffect(() => {
    try { localStorage.setItem(TKEY, JSON.stringify(ttsSettings)); } catch {}
  }, [ttsSettings]);

  const getVoices = () => synthRef.current.getVoices();

  const playText = async (text) => {
    try {
      await simpleTTS.speak(text, ttsSettings.language || 'en', {
        rate: ttsSettings.rate,
        pitch: ttsSettings.pitch,
        volume: ttsSettings.volume
      });
    } catch (error) {
      console.error('TTS failed:', error);
    }
  };

  const speakElement = (el) => {
    if (!el) return;
    const text = el.getAttribute('aria-label') || el.innerText || el.textContent || '';
    playText(text.trim());
  };

  const stop = () => synthRef.current.cancel();
  const pause = () => synthRef.current.pause();
  const resume = () => synthRef.current.resume();

  const toggleA11y = (val) => {
    const newVal = typeof val === 'boolean' ? val : !isA11yOn;
    if (!newVal) {
      stop();
    }
    setIsA11yOn(newVal);
  };

  return (
    <AccessibilityContext.Provider value={{
      isA11yOn,
      toggleA11y,
      ttsSettings,
      setTtsSettings: (partial) => setTts(s => ({ ...s, ...partial })),
      tts: {
        supported: !!('speechSynthesis' in window),
        playText,
        speakElement,
        stop,
        pause,
        resume,
        getVoices,
        getSupportedLanguages: () => simpleTTS.getSupportedLanguages()
      }
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};