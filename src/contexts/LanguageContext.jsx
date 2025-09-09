import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation data
const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      courses: 'Courses',
      aiTutor: 'AI Tutor',
      profile: 'Profile',
      getStarted: 'Get Started'
    },
    // AI Tutor
    aiTutor: {
      title: 'AI Tutor',
      poweredBy: 'Powered by Gemini',
      newChat: 'New Chat',
      welcomeMessage: "Hello! I'm your AI Tutor powered by Gemini. I'm here to help you learn and understand any topic. What would you like to explore today?",
      errorMessage: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
      quickActions: {
        mathProblems: 'Math Problems',
        scienceConcepts: 'Science Concepts',
        writingHelp: 'Writing Help',
        generalQuestions: 'General Questions'
      },
      subjects: {
        general: 'General',
        mathematics: 'Math',
        science: 'Science',
        english: 'English',
        history: 'History',
        programming: 'Programming'
      },
      placeholder: 'Ask me anything about your studies...',
      quickSuggestions: {
        explain: 'Explain this concept',
        example: 'Give me an example',
        practice: 'Practice problems',
        check: 'Check my work'
      }
    },
    // Landing Page
    landing: {
      heroTitle: 'Transform Your Learning with',
      heroSubtitle: 'AI-Powered Education',
      heroDescription: 'Experience personalized learning with adaptive AI tutoring, gamified progress tracking, and multilingual support designed for the modern learner.',
      startLearning: 'Start Learning Free',
      tryAiTutor: 'Try AI Tutor',
      stats: {
        activeStudents: 'Active Students',
        coursesAvailable: 'Courses Available',
        successRate: 'Success Rate',
        languagesSupported: 'Languages Supported'
      }
    },
    // Dashboard
    dashboard: {
      greeting: {
        morning: 'Good Morning',
        afternoon: 'Good Afternoon',
        evening: 'Good Evening'
      },
      welcome: 'Ready to continue your learning journey? You\'re doing great!',
      currentTime: 'Current Time',
      totalXP: 'Total XP',
      keepLearning: 'Keep it up!',
      currentStreak: 'Current Streak',
      daysInRow: 'days in a row',
      coursesEnrolled: 'Courses Enrolled',
      inProgress: 'in progress',
      badgesEarned: 'Badges Earned',
      thisWeek: 'this week',
      quickActions: 'Quick Actions',
      continueLearning: 'Continue Learning',
      resumeLesson: 'Resume your last lesson',
      askAiTutor: 'Ask AI Tutor',
      getInstantHelp: 'Get instant help with any topic',
      joinDiscussion: 'Join Discussion',
      connectWithPeers: 'Connect with fellow learners',
      takeQuiz: 'Take Quiz',
      testKnowledge: 'Test your knowledge',
      readyForChallenge: 'Ready for a new challenge?',
      exploreNewCourses: 'Explore new courses tailored to your learning goals and interests.',
      exploreCourses: 'Explore Courses',
      chatWithAiTutor: 'Chat with AI Tutor'
    },
    // Profile
    profile: {
      achievements: 'Your Achievements',
      keepLearning: 'Keep learning to unlock more achievements and badges!',
      editProfile: 'Edit Profile',
      personalInfo: 'Personal Information',
      learningStats: 'Learning Statistics',
      joinedOn: 'Joined on',
      totalXP: 'Total XP',
      coursesCompleted: 'Courses Completed',
      currentStreak: 'Current Streak',
      level: 'Level'
    },
    // Badges
    badges: {
      achievements: 'Achievements',
      viewAll: 'View All',
      earned: 'Earned',
      locked: 'Locked',
      all: 'All',
      recent: 'Recent',
      rare: 'Rare',
      earnedOn: 'Earned on',
      progress: 'Progress',
      requirement: 'Requirement',
      close: 'Close'
    },
    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      close: 'Close',
      settings: 'Settings',
      help: 'Help',
      logout: 'Logout'
    }
  },
  hi: {
    // Navigation
    nav: {
      home: 'होम',
      dashboard: 'डैशबोर्ड',
      courses: 'कोर्स',
      aiTutor: 'AI ट्यूटर',
      profile: 'प्रोफाइल',
      getStarted: 'शुरू करें'
    },
    // AI Tutor
    aiTutor: {
      title: 'AI ट्यूटर',
      poweredBy: 'Gemini द्वारा संचालित',
      newChat: 'नई चैट',
      welcomeMessage: "नमस्ते! मैं आपका AI ट्यूटर हूं जो Gemini द्वारा संचालित है। मैं आपको किसी भी विषय को सीखने और समझने में मदद करने के लिए यहां हूं। आज आप क्या सीखना चाहते हैं?",
      errorMessage: "क्षमा करें, मुझे अभी कनेक्ट करने में समस्या हो रही है। कृपया एक क्षण में फिर से कोशिश करें।",
      quickActions: {
        mathProblems: 'गणित की समस्याएं',
        scienceConcepts: 'विज्ञान की अवधारणाएं',
        writingHelp: 'लेखन सहायता',
        generalQuestions: 'सामान्य प्रश्न'
      },
      subjects: {
        general: 'सामान्य',
        mathematics: 'गणित',
        science: 'विज्ञान',
        english: 'अंग्रेजी',
        history: 'इतिहास',
        programming: 'प्रोग्रामिंग'
      },
      placeholder: 'अपनी पढ़ाई के बारे में कुछ भी पूछें...',
      quickSuggestions: {
        explain: 'इस अवधारणा को समझाएं',
        example: 'मुझे एक उदाहरण दें',
        practice: 'अभ्यास की समस्याएं',
        check: 'मेरे काम की जांच करें'
      }
    },
    // Landing Page
    landing: {
      heroTitle: 'अपनी शिक्षा को बदलें',
      heroSubtitle: 'AI-संचालित शिक्षा के साथ',
      heroDescription: 'आधुनिक शिक्षार्थी के लिए डिज़ाइन किए गए अनुकूली AI ट्यूटरिंग, गेमिफाइड प्रगति ट्रैकिंग और बहुभाषी समर्थन के साथ व्यक्तिगत शिक्षा का अनुभव करें।',
      startLearning: 'मुफ्त में सीखना शुरू करें',
      tryAiTutor: 'AI ट्यूटर आज़माएं',
      stats: {
        activeStudents: 'सक्रिय छात्र',
        coursesAvailable: 'उपलब्ध कोर्स',
        successRate: 'सफलता दर',
        languagesSupported: 'समर्थित भाषाएं'
      }
    },
    // Dashboard
    dashboard: {
      greeting: {
        morning: 'सुप्रभात',
        afternoon: 'नमस्कार',
        evening: 'शुभ संध्या'
      },
      welcome: 'अपनी शिक्षा यात्रा जारी रखने के लिए तैयार हैं? आप बहुत अच्छा कर रहे हैं!',
      currentTime: 'वर्तमान समय',
      totalXP: 'कुल XP',
      keepLearning: 'इसी तरह जारी रखें!',
      currentStreak: 'वर्तमान स्ट्रीक',
      daysInRow: 'लगातार दिन',
      coursesEnrolled: 'नामांकित कोर्स',
      inProgress: 'प्रगति में',
      badgesEarned: 'अर्जित बैज',
      thisWeek: 'इस सप्ताह',
      quickActions: 'त्वरित क्रियाएं',
      continueLearning: 'सीखना जारी रखें',
      resumeLesson: 'अपना अंतिम पाठ जारी रखें',
      askAiTutor: 'AI ट्यूटर से पूछें',
      getInstantHelp: 'किसी भी विषय पर तुरंत सहायता प्राप्त करें',
      joinDiscussion: 'चर्चा में शामिल हों',
      connectWithPeers: 'साथी शिक्षार्थियों से जुड़ें',
      takeQuiz: 'क्विज़ लें',
      testKnowledge: 'अपने ज्ञान का परीक्षण करें',
      readyForChallenge: 'नई चुनौती के लिए तैयार हैं?',
      exploreNewCourses: 'अपने सीखने के लक्ष्यों और रुचियों के अनुरूप नए कोर्स की खोज करें।',
      exploreCourses: 'कोर्स एक्सप्लोर करें',
      chatWithAiTutor: 'AI ट्यूटर के साथ चैट करें'
    },
    // Profile
    profile: {
      achievements: 'आपकी उपलब्धियां',
      keepLearning: 'अधिक उपलब्धियां और बैज अनलॉक करने के लिए सीखते रहें!',
      editProfile: 'प्रोफ़ाइल संपादित करें',
      personalInfo: 'व्यक्तिगत जानकारी',
      learningStats: 'सीखने के आंकड़े',
      joinedOn: 'शामिल हुए',
      totalXP: 'कुल XP',
      coursesCompleted: 'पूर्ण पाठ्यक्रम',
      currentStreak: 'वर्तमान स्ट्रीक',
      level: 'स्तर'
    },
    // Badges
    badges: {
      achievements: 'उपलब्धियां',
      viewAll: 'सभी देखें',
      earned: 'अर्जित',
      locked: 'लॉक',
      all: 'सभी',
      recent: 'हाल ही में',
      rare: 'दुर्लभ',
      earnedOn: 'अर्जित किया गया',
      progress: 'प्रगति',
      requirement: 'आवश्यकता',
      close: 'बंद करें'
    },
    // Common
    common: {
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      close: 'बंद करें',
      settings: 'सेटिंग्स',
      help: 'सहायता',
      logout: 'लॉगआउट'
    }
  },
  te: {
    // Navigation
    nav: {
      home: 'హోమ్',
      dashboard: 'డాష్‌బోర్డ్',
      courses: 'కోర్సులు',
      aiTutor: 'AI ట్యూటర్',
      profile: 'ప్రొఫైల్',
      getStarted: 'ప్రారంభించండి'
    },
    // AI Tutor
    aiTutor: {
      title: 'AI ట్యూటర్',
      poweredBy: 'Gemini ద్వారా శక్తివంతం',
      newChat: 'కొత్త చాట్',
      welcomeMessage: "నమస్కారం! నేను మీ AI ట్యూటర్‌ని, Gemini ద్వారా శక్తివంతం చేయబడింది. ఏదైనా విషయం నేర్చుకోవడంలో మరియు అర్థం చేసుకోవడంలో మీకు సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను. ఈరోజు మీరు ఏమి అన్వేషించాలని అనుకుంటున్నారు?",
      errorMessage: "క్షమించండి, నేను ఇప్పుడు కనెక్ట్ చేయడంలో ఇబ్బంది పడుతున్నాను. దయచేసి ఒక క్షణంలో మళ్లీ ప్రయత్నించండి.",
      quickActions: {
        mathProblems: 'గణిత సమస్యలు',
        scienceConcepts: 'విజ్ఞాన భావనలు',
        writingHelp: 'రాయడంలో సహాయం',
        generalQuestions: 'సాధారణ ప్రశ్నలు'
      },
      subjects: {
        general: 'సాధారణ',
        mathematics: 'గణితం',
        science: 'విజ్ఞానం',
        english: 'ఇంగ్లీష్',
        history: 'చరిత్ర',
        programming: 'ప్రోగ్రామింగ్'
      },
      placeholder: 'మీ చదువుల గురించి ఏదైనా అడగండి...',
      quickSuggestions: {
        explain: 'ఈ భావనను వివరించండి',
        example: 'నాకు ఉదాహరణ ఇవ్వండి',
        practice: 'అభ్యాస సమస్యలు',
        check: 'నా పనిని తనిఖీ చేయండి'
      }
    },
    // Landing Page
    landing: {
      heroTitle: 'మీ అభ్యాసాన్ని మార్చండి',
      heroSubtitle: 'AI-శక్తివంతమైన విద్యతో',
      heroDescription: 'ఆధునిక అభ్యాసకుడి కోసం రూపొందించిన అనుకూల AI ట్యూటరింగ్, గేమిఫైడ్ ప్రోగ్రెస్ ట్రాకింగ్ మరియు బహుభాషా మద్దతుతో వ్యక్తిగతీకరించిన అభ్యాసాన్ని అనుభవించండి.',
      startLearning: 'ఉచితంగా నేర్చుకోవడం ప్రారంభించండి',
      tryAiTutor: 'AI ట్యూటర్‌ను ప్రయత్నించండి',
      stats: {
        activeStudents: 'క్రియాశీల విద్యార్థులు',
        coursesAvailable: 'అందుబాటులో ఉన్న కోర్సులు',
        successRate: 'విజయ రేటు',
        languagesSupported: 'మద్దతు ఉన్న భాషలు'
      }
    },
    // Dashboard
    dashboard: {
      greeting: {
        morning: 'శుభోదయం',
        afternoon: 'నమస్కారం',
        evening: 'శుభ సాయంత్రం'
      },
      welcome: 'మీ అభ్యాస ప్రయాణాన్ని కొనసాగించడానికి సిద్ధంగా ఉన్నారా? మీరు చాలా బాగా చేస్తున్నారు!',
      currentTime: 'ప్రస్తుత సమయం',
      totalXP: 'మొత్తం XP',
      keepLearning: 'ఇలాగే కొనసాగించండి!',
      currentStreak: 'ప్రస్తుత స్ట్రీక్',
      daysInRow: 'వరసగా రోజులు',
      coursesEnrolled: 'నమోదు చేసిన కోర్సులు',
      inProgress: 'ప్రగతిలో',
      badgesEarned: 'సంపాదించిన బ్యాజ్‌లు',
      thisWeek: 'ఈ వారం',
      quickActions: 'వేగ క్రియలు',
      continueLearning: 'అభ్యాసం కొనసాగించండి',
      resumeLesson: 'మీ చివరి పాఠాన్ని కొనసాగించండి',
      askAiTutor: 'AI ట్యూటర్‌ను అడగండి',
      getInstantHelp: 'ఏదైనా విషయానికి త్వరిత సహాయాన్ని పొందండి',
      joinDiscussion: 'చర్చలో చేరండి',
      connectWithPeers: 'సహ విద్యార్థులతో కలుపుకొండి',
      takeQuiz: 'క్విజ్ తీసుకొండి',
      testKnowledge: 'మీ జ్ఞానాన్ని పరీక్షించండి',
      readyForChallenge: 'కొత్త సవాలుకి సిద్ధంగా ఉన్నారా?',
      exploreNewCourses: 'మీ అభ్యాస లక్ష్యాలు మరియు ఆసక్తులకు అనుగుణంగా ఉన్న కొత్త కోర్సులన్ని అన్వేషించండి.',
      exploreCourses: 'కోర్సులన్ని అన్వేషించండి',
      chatWithAiTutor: 'AI ట్యూటర్‌తో చాట్ చేయండి'
    },
    // Profile
    profile: {
      achievements: 'మీ సాధనలు',
      keepLearning: 'అధిక సాధనలు మరియు బ్యాజ్‌లను అన్‌లాక్ చేయడానికి నేర్చుకోవడం కొనసాగించండి!',
      editProfile: 'ప్రొఫైల్ సవరించండి',
      personalInfo: 'వ్యక్తిగత సమాచారం',
      learningStats: 'అభ్యాస క్రమ గణాంకాలు',
      joinedOn: 'చేరిన తేదీ',
      totalXP: 'మొత్తం XP',
      coursesCompleted: 'పూర్తి చేసిన కోర్సులు',
      currentStreak: 'ప్రస్తుత స్ట్రీక్',
      level: 'స్థాయి'
    },
    // Badges
    badges: {
      achievements: 'సాధనలు',
      viewAll: 'అన్నింటినీ చూడండి',
      earned: 'సంపాదించినవి',
      locked: 'లాక్ చేయబడినవి',
      all: 'అన్ని',
      recent: 'ఇటీవల',
      rare: 'అరుదైనవి',
      earnedOn: 'సంపాదించిన తేదీ',
      progress: 'ప్రగతి',
      requirement: 'అవసరం',
      close: 'మూసివేయి'
    },
    // Common
    common: {
      loading: 'లోడవుతోంది...',
      error: 'లోపం',
      success: 'విజయం',
      cancel: 'రద్దు చేయి',
      save: 'భద్రపరచు',
      edit: 'సవరించు',
      delete: 'తొలగించు',
      close: 'మూసివేయి',
      settings: 'అమరికలు',
      help: 'సహాయం',
      logout: 'లాగౌట్'
    }
  },
  bn: {
    // Navigation
    nav: {
      home: 'হোম',
      dashboard: 'ড্যাশবোর্ড',
      courses: 'কোর্স',
      aiTutor: 'AI টিউটর',
      profile: 'প্রোফাইল',
      getStarted: 'শুরু করুন'
    },
    // AI Tutor
    aiTutor: {
      title: 'AI টিউটর',
      poweredBy: 'Gemini দ্বারা চালিত',
      newChat: 'নতুন চ্যাট',
      welcomeMessage: "নমস্কার! আমি আপনার AI টিউটর যা Gemini দ্বারা চালিত। যেকোনো বিষয় শিখতে এবং বুঝতে আপনাকে সাহায্য করার জন্য আমি এখানে আছি। আজ আপনি কী অন্বেষণ করতে চান?",
      errorMessage: "দুঃখিত, আমি এখন সংযোগ করতে সমস্যায় পড়ছি। দয়া করে একটু পরে আবার চেষ্টা করুন।",
      quickActions: {
        mathProblems: 'গণিতের সমস্যা',
        scienceConcepts: 'বিজ্ঞানের ধারণা',
        writingHelp: 'লেখার সাহায্য',
        generalQuestions: 'সাধারণ প্রশ্ন'
      },
      subjects: {
        general: 'সাধারণ',
        mathematics: 'গণিত',
        science: 'বিজ্ঞান',
        english: 'ইংরেজি',
        history: 'ইতিহাস',
        programming: 'প্রোগ্রামিং'
      },
      placeholder: 'আপনার পড়াশোনা সম্পর্কে যেকোনো কিছু জিজ্ঞাসা করুন...',
      quickSuggestions: {
        explain: 'এই ধারণাটি ব্যাখ্যা করুন',
        example: 'আমাকে একটি উদাহরণ দিন',
        practice: 'অনুশীলনের সমস্যা',
        check: 'আমার কাজ পরীক্ষা করুন'
      }
    },
    // Landing Page
    landing: {
      heroTitle: 'আপনার শিক্ষাকে রূপান্তরিত করুন',
      heroSubtitle: 'AI-চালিত শিক্ষার সাথে',
      heroDescription: 'আধুনিক শিক্ষার্থীর জন্য ডিজাইন করা অভিযোজিত AI টিউটরিং, গেমিফাইড প্রগ্রেস ট্র্যাকিং এবং বহুভাষিক সহায়তার সাথে ব্যক্তিগতকৃত শিক্ষার অভিজ্ঞতা নিন।',
      startLearning: 'বিনামূল্যে শেখা শুরু করুন',
      tryAiTutor: 'AI টিউটর চেষ্টা করুন',
      stats: {
        activeStudents: 'সক্রিয় শিক্ষার্থী',
        coursesAvailable: 'উপলব্ধ কোর্স',
        successRate: 'সাফল্যের হার',
        languagesSupported: 'সমর্থিত ভাষা'
      }
    },
    // Dashboard
    dashboard: {
      greeting: {
        morning: 'সুপ্রভাত',
        afternoon: 'নমস্কার',
        evening: 'শুভ সন্ধ্যা'
      },
      welcome: 'আপনার শিক্ষার যাত্রা চালিয়ে যেতে প্রস্তুত? আপনি দুর্দান্ত কাজ করছেন!',
      currentTime: 'বর্তমান সময়',
      totalXP: 'মোট XP',
      keepLearning: 'চালিয়ে যান!',
      currentStreak: 'বর্তমান স্ট্রিক',
      daysInRow: 'দিন ধারাবাহিকভাবে',
      coursesEnrolled: 'নথিভুক্ত কোর্স',
      inProgress: 'চলমান',
      badgesEarned: 'অর্জিত ব্যাজ',
      thisWeek: 'এই সপ্তাহে',
      quickActions: 'দ্রুত কাজ',
      continueLearning: 'শেখা চালিয়ে যান',
      resumeLesson: 'আপনার শেষ পাঠটি পুনরায় শুরু করুন',
      askAiTutor: 'এআই টিউটরকে জিজ্ঞাসা করুন',
      getInstantHelp: 'যেকোনো বিষয়ে তাৎক্ষণিক সাহায্য পান',
      joinDiscussion: 'আলোচনায় যোগ দিন',
      connectWithPeers: 'সহপাঠীদের সাথে সংযোগ করুন',
      takeQuiz: 'কুইজ নিন',
      testKnowledge: 'আপনার জ্ঞান পরীক্ষা করুন',
      readyForChallenge: 'একটি নতুন চ্যালেঞ্জের জন্য প্রস্তুত?',
      exploreNewCourses: 'আপনার শেখার লক্ষ্য এবং আগ্রহ অনুযায়ী নতুন কোর্সগুলি অন্বেষণ করুন।',
      exploreCourses: 'কোর্স অন্বেষণ করুন',
      chatWithAiTutor: 'এআই টিউটরের সাথে চ্যাট করুন'
    },
    // Profile
    profile: {
      achievements: 'আপনার অর্জন',
      keepLearning: 'আরও অর্জন এবং ব্যাজ আনলক করতে শিখতে থাকুন!',
      editProfile: 'প্রোফাইল সম্পাদনা করুন',
      personalInfo: 'ব্যক্তিগত তথ্য',
      learningStats: 'শেখার পরিসংখ্যান',
      joinedOn: 'যুক্ত হয়েছেন',
      totalXP: 'মোট XP',
      coursesCompleted: 'সম্পন্ন কোর্সসমূহ',
      currentStreak: 'বর্তমান স্ট্রিক',
      level: 'লেভেল'
    },
    // Common
    common: {
      loading: 'লোড হচ্ছে...',
      error: 'ত্রুটি',
      success: 'সফলতা',
      cancel: 'বাতিল করুন',
      save: 'সংরক্ষণ করুন',
      edit: 'সম্পাদনা করুন',
      delete: 'মুছে ফেলুন',
      close: 'বন্ধ করুন',
      settings: 'সেটিংস',
      help: 'সাহায্য',
      logout: 'লগআউট'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    const browserLanguage = navigator.language.split('-')[0];
    
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    } else if (translations[browserLanguage]) {
      setCurrentLanguage(browserLanguage);
    }
  }, []);

  // Save language to localStorage when changed
  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = (language) => {
    if (translations[language]) {
      setCurrentLanguage(language);
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
    
    // Fallback to English if translation not found
    if (!value) {
      value = translations.en;
      for (const k of keys) {
        value = value?.[k];
        if (!value) break;
      }
    }
    
    return value || key;
  };

  const availableLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' }
  ];

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      changeLanguage,
      t,
      availableLanguages
    }}>
      {children}
    </LanguageContext.Provider>
  );
};