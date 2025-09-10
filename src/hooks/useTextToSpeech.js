import { useState, useEffect } from 'react';

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      // Select a default voice
      if (availableVoices.length > 0) {
        // Try to find a English voice first
        const englishVoice = availableVoices.find(voice => 
          voice.lang.includes('en') && voice.localService
        );
        setSelectedVoice(englishVoice || availableVoices[0]);
      }
    };

    // Load voices when they become available
    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      speechSynthesis.cancel();
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  const speak = (text, onEnd) => {
    if (!text || isSpeaking) return;

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const pause = () => {
    speechSynthesis.pause();
    setIsSpeaking(false);
  };

  const resume = () => {
    speechSynthesis.resume();
    setIsSpeaking(true);
  };

  return {
    isSpeaking,
    voices,
    selectedVoice,
    setSelectedVoice,
    speak,
    stop,
    pause,
    resume
  };
};