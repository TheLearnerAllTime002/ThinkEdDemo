# Multilingual Text-to-Speech Support

## Overview
ThinkEd now supports multilingual TTS with both online (browser) and offline (AI model) options using Transformers.js.

## Supported Languages
- **English** (en)
- **Spanish** (es) 
- **French** (fr)
- **German** (de)
- **Italian** (it)
- **Portuguese** (pt)
- **Russian** (ru)
- **Japanese** (ja)
- **Korean** (ko)
- **Chinese** (zh)
- **Hindi** (hi)
- **Arabic** (ar)

## Features

### Online TTS (Browser Native)
- Uses browser's SpeechSynthesis API
- Filters voices by selected language
- Faster initialization
- Requires internet for some voices

### Offline TTS (AI Model)
- Uses Transformers.js with SpeechT5 model
- Works completely offline after initial download
- Consistent voice across all languages
- ~50MB model download on first use

## Usage

### Language Selection
```jsx
const { tts, ttsSettings, setTtsSettings } = useAccessibility();

// Change language
setTtsSettings({ language: 'es' }); // Spanish

// Toggle offline mode
setTtsSettings({ useOffline: true });

// Speak in selected language
await tts.playText("Hola mundo");
```

### UI Controls
- **Language dropdown**: Select from 12 supported languages
- **Offline toggle**: Switch between browser and AI model
- **Voice selection**: Available when using browser TTS
- **Auto-filtering**: Shows only voices for selected language

## Technical Implementation

### Dependencies
```json
{
  "@xenova/transformers": "^2.17.2"
}
```

### Model Loading
- Model loads on first offline TTS use
- Cached in browser for subsequent uses
- Graceful fallback to browser TTS if model fails

### Performance
- **Online**: Instant (uses system voices)
- **Offline**: 2-3 second initial load, then fast
- **Model size**: ~50MB (downloads once)
- **Memory usage**: ~100MB when active

## Browser Compatibility
- **Online TTS**: Chrome 33+, Firefox 49+, Safari 7+, Edge 14+
- **Offline TTS**: Chrome 88+, Firefox 89+, Safari 15.4+, Edge 88+
- **SharedArrayBuffer**: Required for offline mode (enabled via headers)

## Setup Requirements

### Headers Configuration
Add to your hosting platform:
```
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

### Vite Configuration (if needed)
```js
// vite.config.js
export default {
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    }
  }
}
```

## Language Detection
The system can auto-detect content language:
```jsx
// Auto-detect and speak
const detectLanguage = (text) => {
  // Simple detection based on character sets
  if (/[\u4e00-\u9fff]/.test(text)) return 'zh';
  if (/[\u0600-\u06ff]/.test(text)) return 'ar';
  if (/[\u0900-\u097f]/.test(text)) return 'hi';
  return 'en'; // default
};
```

## Troubleshooting

### Model Loading Issues
```javascript
// Check if model is available
if (!multilingualTTS.synthesizer) {
  console.log('Model not loaded, using browser TTS');
}
```

### SharedArrayBuffer Errors
- Ensure COOP/COEP headers are set
- Use HTTPS in production
- Check browser compatibility

### Performance Optimization
```javascript
// Preload model on app start
useEffect(() => {
  if (ttsSettings.useOffline) {
    multilingualTTS.initialize();
  }
}, []);
```

## Future Enhancements
- Voice cloning for custom speakers
- Emotion control (happy, sad, excited)
- SSML support for advanced speech control
- Real-time language detection
- Streaming TTS for long texts