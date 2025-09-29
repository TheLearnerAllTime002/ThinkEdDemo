// Simplified multilingual TTS without heavy dependencies
export class SimpleTTS {
  constructor() {
    this.supportedLanguages = {
      'en': 'English',
      'es': 'Spanish', 
      'fr': 'French',
      'de': 'German',
      'it': 'Italian',
      'pt': 'Portuguese',
      'ru': 'Russian',
      'ja': 'Japanese',
      'ko': 'Korean',
      'zh': 'Chinese',
      'hi': 'Hindi',
      'ar': 'Arabic'
    };
  }

  async speak(text, language = 'en', settings = {}) {
    if (!('speechSynthesis' in window)) {
      throw new Error('Speech synthesis not supported');
    }

    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = settings.rate || 1;
      utterance.pitch = settings.pitch || 1;
      utterance.volume = settings.volume || 1;

      // Try to find a voice for the language
      const voices = speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.startsWith(language)) || voices[0];
      if (voice) utterance.voice = voice;

      utterance.onend = resolve;
      utterance.onerror = reject;

      speechSynthesis.speak(utterance);
    });
  }

  getSupportedLanguages() {
    return this.supportedLanguages;
  }

  getVoicesForLanguage(language) {
    const voices = speechSynthesis.getVoices();
    return voices.filter(v => v.lang.startsWith(language));
  }
}

export const simpleTTS = new SimpleTTS();