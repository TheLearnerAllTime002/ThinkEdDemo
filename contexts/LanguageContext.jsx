import { createContext, useState, useEffect, useContext } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18n once
const initializeI18n = () => {
  const resources = {
    en: { translation: {
      welcome: "Welcome to ThinkEd",
      signin: "Sign In",
      signup: "Sign Up",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      googleSignin: "Sign in with Google",
      googleSignup: "Sign up with Google",
      or: "or",
      demo: "Try Demo",
      accountQuestion: "Don't have an account?",
      accountExists: "Already have an account?",
      createAccount: "Create Account"
    }},
    bn: { translation: {
      welcome: "থিংক এডে আপনাকে স্বাগতম",
      signin: "সাইন ইন",
      signup: "নিবন্ধন করুন",
      email: "ইমেইল",
      password: "পাসওয়ার্ড",
      confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
      googleSignin: "Google-এর মাধ্যমে সাইন ইন করুন",
      googleSignup: "Google-এর মাধ্যমে নিবন্ধন করুন",
      or: "অথবা",
      demo: "ডেমো চেষ্টা করুন",
      accountQuestion: "অ্যাকাউন্ট নেই?",
      accountExists: "ইতিমধ্যে একটি অ্যাকাউন্ট আছে?",
      createAccount: "অ্যাকাউন্ট তৈরি করুন"
    }},
    hi: { translation: {
      welcome: "थिंक एड में आपका स्वागत है",
      signin: "साइन इन",
      signup: "साइन अप",
      email: "ईमेल",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      googleSignin: "Google के साथ साइन इन करें",
      googleSignup: "Google के साथ साइन अप करें",
      or: "या",
      demo: "डेमो आज़माएं",
      accountQuestion: "खाता नहीं है?",
      accountExists: "पहले से ही एक खाता मौजूद है?",
      createAccount: "खाता बनाएं"
    }}
  };

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      interpolation: { escapeValue: false }
    });

  return i18n;
};

const i18nInstance = initializeI18n();
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('userLanguage') || 'en';
    setLanguage(savedLanguage);
    i18nInstance.changeLanguage(savedLanguage);
  }, []);

  const changeLanguage = (lng) => {
    setLanguage(lng);
    i18nInstance.changeLanguage(lng);
    localStorage.setItem('userLanguage', lng);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      changeLanguage, 
      t: i18nInstance.t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
