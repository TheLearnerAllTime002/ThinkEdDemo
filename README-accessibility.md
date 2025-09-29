# Accessibility Features - ThinkEd

## Overview
ThinkEd includes comprehensive accessibility features to support users with dyslexia and other reading difficulties, including:

- **Dyslexia-friendly font toggle** with OpenDyslexic font
- **Text-to-Speech (TTS)** using browser Web Speech API
- **Enhanced keyboard navigation** and focus management
- **Persistent user preferences** stored in localStorage

## Features

### 1. Accessibility Mode Toggle
- Located in the navigation header (desktop and mobile)
- Enables dyslexia-friendly font (OpenDyslexic) across the entire app
- Increases line-height (1.7), letter-spacing (0.03em), and paragraph spacing
- Shows "A11y" chip when enabled
- Persists preference in localStorage

### 2. Text-to-Speech Controls
- Appears as floating panel when Accessibility Mode is enabled
- Voice selection from available system voices
- Adjustable rate (0.5x - 2x) and pitch (0.5 - 2.0)
- Read selected text or page content
- Play/Pause/Resume/Stop controls
- Settings persist in localStorage

### 3. Keyboard Accessibility
- All controls are keyboard accessible (Tab navigation)
- Enhanced focus styles with blue outline
- Skip-to-content link for screen readers
- Proper ARIA attributes (role="switch", aria-checked, aria-live)

## Implementation

### Components
- `AccessibilityProvider` - Context provider for global state
- `A11yToggle` - Toggle button for navigation
- `TextToSpeechControls` - TTS control panel
- `AccessibilityPanel` - Floating panel container

### CSS Variables
```css
:root {
  --app-font: Inter, system-ui, sans-serif;
  --line-height: 1.4;
  --letter-spacing: 0;
  --paragraph-margin: 1rem;
}

.a11y-on {
  --app-font: "OpenDyslexicCustom", Inter, system-ui, sans-serif;
  --line-height: 1.7;
  --letter-spacing: 0.03em;
  --paragraph-margin: 1.2rem;
}
```

## Font Setup

### Option 1: CDN (Current Implementation)
Uses jsDelivr CDN for OpenDyslexic font:
```css
@font-face {
  font-family: "OpenDyslexicCustom";
  src: url("https://cdn.jsdelivr.net/npm/opendyslexic@1.0.3/ttf/OpenDyslexic-Regular.ttf");
}
```

### Option 2: Self-Hosted
1. Download OpenDyslexic fonts from [opendyslexic.org](https://opendyslexic.org/)
2. Place in `/public/fonts/` directory
3. Update CSS paths:
```css
@font-face {
  font-family: "OpenDyslexicCustom";
  src: url("/fonts/OpenDyslexic-Regular.ttf") format("truetype");
}
```

### Option 3: Alternative Fonts
Replace with other dyslexia-friendly fonts:
- Lexend
- Atkinson Hyperlegible
- Noto Sans (with increased spacing)

## Browser Support
- **TTS**: Chrome 33+, Firefox 49+, Safari 7+, Edge 14+
- **Font Loading**: All modern browsers with fallback to system fonts
- **Accessibility**: Full WCAG 2.1 AA compliance

## Testing

### Keyboard Navigation
```bash
# Test tab order and focus management
1. Tab through all interactive elements
2. Verify focus indicators are visible
3. Test Enter/Space activation on buttons
4. Verify skip-to-content link works
```

### Screen Reader Testing
```bash
# Test with screen readers
1. NVDA (Windows) - Free
2. VoiceOver (macOS) - Built-in
3. JAWS (Windows) - Commercial
4. TalkBack (Android) - Built-in
```

### TTS Testing
```javascript
// Test TTS functionality
const { tts } = useAccessibility();

// Test basic playback
tts.playText("Hello world");

// Test voice selection
const voices = tts.getVoices();
console.log(voices);

// Test settings persistence
localStorage.getItem('thinked:tts');
```

## Usage Examples

### Basic Integration
```jsx
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { A11yToggle } from './components/ui/A11yToggle';

function App() {
  return (
    <AccessibilityProvider>
      <nav>
        <A11yToggle />
      </nav>
      <main id="main-content">
        {/* Your content */}
      </main>
    </AccessibilityProvider>
  );
}
```

### Using TTS in Components
```jsx
import { useAccessibility } from './contexts/AccessibilityContext';

function MyComponent() {
  const { tts, isA11yOn } = useAccessibility();
  
  const handleReadAloud = () => {
    tts.playText("This content will be read aloud");
  };
  
  return (
    <div>
      {isA11yOn && (
        <button onClick={handleReadAloud}>
          Read this content
        </button>
      )}
    </div>
  );
}
```

## Performance Considerations
- Font loading uses `font-display: swap` for better performance
- TTS uses browser native API (no external dependencies)
- CSS variables minimize layout recalculation
- Respects `prefers-reduced-motion` for animations

## Future Enhancements
- High contrast mode toggle
- Font size adjustment controls
- Reading progress highlighting during TTS
- Voice command navigation
- Integration with external TTS services for consistent voices