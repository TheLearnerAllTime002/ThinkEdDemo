import { pipeline } from '@xenova/transformers';

class MultilingualTTS {
  constructor() {
    this.synthesizer = null;
    this.isLoading = false;
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

  async initialize() {
    if (this.synthesizer || this.isLoading) return;
    
    try {
      this.isLoading = true;
      this.synthesizer = await pipeline('text-to-speech', 'Xenova/speecht5_tts', {
        quantized: false,
      });
    } catch (error) {
      console.warn('Failed to load offline TTS model:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async speak(text, language = 'en') {
    if (!this.synthesizer) {
      await this.initialize();
    }

    if (!this.synthesizer) {
      throw new Error('TTS model not available');
    }

    try {
      const result = await this.synthesizer(text, {
        speaker_embeddings: this.getLanguageEmbedding(language)
      });
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(result.audio.buffer);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
      
      return source;
    } catch (error) {
      console.error('TTS synthesis failed:', error);
      throw error;
    }
  }

  getLanguageEmbedding(language) {
    // Simplified speaker embeddings for different languages
    const embeddings = {
      'en': new Float32Array(512).fill(0.1),
      'es': new Float32Array(512).fill(0.2),
      'fr': new Float32Array(512).fill(0.3),
      'de': new Float32Array(512).fill(0.4),
      'hi': new Float32Array(512).fill(0.5),
      'zh': new Float32Array(512).fill(0.6)
    };
    return embeddings[language] || embeddings['en'];
  }

  isSupported(language) {
    return language in this.supportedLanguages;
  }

  getSupportedLanguages() {
    return this.supportedLanguages;
  }
}

export const multilingualTTS = new MultilingualTTS();