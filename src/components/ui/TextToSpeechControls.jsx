import React, { useEffect, useState } from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import Icon from '../AppIcon';

export const TextToSpeechControls = ({ className = "" }) => {
  const { tts, ttsSettings, setTtsSettings } = useAccessibility();
  const [voices, setVoices] = useState([]);
  const [status, setStatus] = useState('idle');
  const [supportedLanguages, setSupportedLanguages] = useState({
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
  });

  useEffect(() => {
    if (!tts.supported) return;
    const load = () => setVoices(tts.getVoices());
    load();
    window.speechSynthesis.onvoiceschanged = load;
    if (tts.getSupportedLanguages) {
      setSupportedLanguages(tts.getSupportedLanguages());
    }
  }, [tts]);

  if (!tts.supported) {
    return (
      <div className={`p-3 rounded-md border bg-white/95 backdrop-blur-sm shadow-lg ${className}`}>
        <div className="flex items-center gap-2 text-gray-700">
          <Icon name="VolumeX" size={16} className="text-red-500" />
          <span className="text-sm font-medium">Text-to-Speech not supported</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-3 rounded-md border bg-white/95 backdrop-blur-sm shadow-lg max-w-md ${className}`}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Volume2" size={16} className="text-blue-600" />
          <strong className="text-sm text-gray-800">Read Aloud</strong>
        </div>
        <span aria-live="polite" className="text-xs text-gray-600 capitalize bg-gray-100 px-2 py-1 rounded">
          {status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            id="useOffline"
            checked={ttsSettings.useOffline}
            onChange={(e) => setTtsSettings({ useOffline: e.target.checked })}
            className="rounded"
          />
          <label htmlFor="useOffline" className="text-xs text-gray-700">Use offline TTS</label>
        </div>
        
        <select
          aria-label="Select language"
          value={ttsSettings.language || "en"}
          onChange={(e) => setTtsSettings({ language: e.target.value })}
          className="w-full p-2 text-sm rounded border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {Object.entries(supportedLanguages).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
        
        {!ttsSettings.useOffline && (
          <select
            aria-label="Select voice"
            value={ttsSettings.voiceURI || ""}
            onChange={(e) => setTtsSettings({ voiceURI: e.target.value || undefined })}
            className="w-full p-2 text-sm rounded border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">— System default —</option>
            {voices.filter(v => v.lang && v.lang.startsWith(ttsSettings.language || 'en')).map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-700 font-medium mb-1">Rate</label>
            <input
              aria-label="TTS rate"
              type="range"
              min={0.5}
              max={2}
              step={0.1}
              value={ttsSettings.rate}
              onChange={(e) => setTtsSettings({ rate: Number(e.target.value) })}
              className="w-full"
            />
            <span className="text-xs text-gray-700 font-mono">{ttsSettings.rate.toFixed(1)}</span>
          </div>
          <div>
            <label className="block text-xs text-gray-700 font-medium mb-1">Pitch</label>
            <input
              aria-label="TTS pitch"
              type="range"
              min={0.5}
              max={2}
              step={0.1}
              value={ttsSettings.pitch}
              onChange={(e) => setTtsSettings({ pitch: Number(e.target.value) })}
              className="w-full"
            />
            <span className="text-xs text-gray-700 font-mono">{ttsSettings.pitch.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={async () => {
              setStatus('reading');
              const sel = window.getSelection()?.toString();
              if (sel) {
                await tts.playText(sel);
              } else {
                const main = document.querySelector('main') || document.body;
                await tts.playText(main.textContent?.slice(0, 1000) || 'Nothing to read');
              }
            }}
            className="flex items-center gap-1 px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            <Icon name="Play" size={14} />
            Read
          </button>
          <button 
            onClick={() => { tts.pause(); setStatus('paused'); }} 
            className="flex items-center gap-1 px-3 py-1 text-sm rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
          >
            <Icon name="Pause" size={14} />
            Pause
          </button>
          <button 
            onClick={() => { tts.resume(); setStatus('resumed'); }} 
            className="flex items-center gap-1 px-3 py-1 text-sm rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
          >
            <Icon name="Play" size={14} />
            Resume
          </button>
          <button 
            onClick={() => { tts.stop(); setStatus('stopped'); }} 
            className="flex items-center gap-1 px-3 py-1 text-sm rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
          >
            <Icon name="Square" size={14} />
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};