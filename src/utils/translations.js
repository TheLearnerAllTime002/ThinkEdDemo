// Translation utilities and helpers

export const formatMessage = (template, params = {}) => {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key] || match;
  });
};

export const pluralize = (count, singular, plural) => {
  return count === 1 ? singular : plural;
};

export const formatNumber = (number, locale = 'en') => {
  return new Intl.NumberFormat(locale).format(number);
};

export const formatDate = (date, locale = 'en', options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return new Intl.DateTimeFormat(locale, defaultOptions).format(new Date(date));
};

export const formatTime = (date, locale = 'en', options = {}) => {
  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...options
  };
  
  return new Intl.DateTimeFormat(locale, defaultOptions).format(new Date(date));
};

export const formatRelativeTime = (date, locale = 'en') => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now - targetDate) / 1000);
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  }
};

export const getLanguageDirection = (languageCode) => {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  return rtlLanguages.includes(languageCode) ? 'rtl' : 'ltr';
};

export const validateTranslationKey = (key, translations) => {
  const keys = key.split('.');
  let value = translations;
  
  for (const k of keys) {
    value = value?.[k];
    if (!value) return false;
  }
  
  return true;
};

export const getNestedTranslation = (key, translations, fallback = '') => {
  const keys = key.split('.');
  let value = translations;
  
  for (const k of keys) {
    value = value?.[k];
    if (!value) return fallback;
  }
  
  return value;
};

// Language detection utilities
export const detectBrowserLanguage = () => {
  const language = navigator.language || navigator.languages[0];
  return language.split('-')[0]; // Get language code without region
};

export const getSupportedLanguage = (requestedLanguage, supportedLanguages) => {
  if (supportedLanguages.includes(requestedLanguage)) {
    return requestedLanguage;
  }
  
  // Try to find a similar language (e.g., 'en-US' -> 'en')
  const baseLanguage = requestedLanguage.split('-')[0];
  if (supportedLanguages.includes(baseLanguage)) {
    return baseLanguage;
  }
  
  // Default to English
  return 'en';
};

// Regional language helpers for Indian languages
export const getIndianLanguageScript = (languageCode) => {
  const scripts = {
    'hi': 'Devanagari',
    'te': 'Telugu',
    'bn': 'Bengali',
    'ta': 'Tamil',
    'mr': 'Devanagari',
    'gu': 'Gujarati',
    'kn': 'Kannada',
    'ml': 'Malayalam',
    'pa': 'Gurmukhi',
    'or': 'Odia'
  };
  
  return scripts[languageCode] || 'Latin';
};

export const formatIndianNumber = (number, languageCode) => {
  const locales = {
    'hi': 'hi-IN',
    'te': 'te-IN',
    'bn': 'bn-IN',
    'ta': 'ta-IN',
    'mr': 'mr-IN',
    'gu': 'gu-IN',
    'kn': 'kn-IN',
    'ml': 'ml-IN',
    'pa': 'pa-IN',
    'or': 'or-IN'
  };
  
  const locale = locales[languageCode] || 'en-IN';
  return new Intl.NumberFormat(locale).format(number);
};