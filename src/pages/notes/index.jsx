import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Dummy data for notes
const dummyNotes = [
  {
    id: 1,
    title: "Calculus Fundamentals",
    content: "Derivatives represent the rate of change of a function. The derivative of f(x) = x^n is f'(x) = nx^(n-1).",
    createdAt: "2023-06-15",
    tags: ["Mathematics", "Calculus"]
  },
  {
    id: 2,
    title: "Photosynthesis Process",
    content: "Photosynthesis converts light energy into chemical energy. 6CO2 + 6H2O + light energy → C6H12O6 + 6O2",
    createdAt: "2023-06-10",
    tags: ["Biology", "Plants"]
  },
  {
    id: 3,
    title: "World War II Timeline",
    content: "1939: Germany invades Poland. 1941: Pearl Harbor attack. 1945: Hiroshima and Nagasaki bombings.",
    createdAt: "2023-06-05",
    tags: ["History", "WWII"]
  }
];

// Dummy flashcards
const dummyFlashcards = [
  {
    id: 1,
    front: "What is the derivative of x^2?",
    back: "2x",
    subject: "Calculus"
  },
  {
    id: 2,
    front: "What is the chemical formula for water?",
    back: "H2O",
    subject: "Chemistry"
  },
  {
    id: 3,
    front: "Who was the first President of the USA?",
    back: "George Washington",
    subject: "History"
  }
];

const Notes = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('notes');
  const [notes] = useState(dummyNotes);
  const [flashcards] = useState(dummyFlashcards);
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCardFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <>
      <Helmet>
        <title>Quick Notes & Flashcards - ThinkEd</title>
        <meta name="description" content="Create, organize, and review your study notes and flashcards for effective learning and retention." />
        <meta name="keywords" content="study notes, flashcards, note taking, spaced repetition, study tools, learning retention" />
        <meta property="og:title" content="Quick Notes & Flashcards - ThinkEd" />
        <meta property="og:description" content="Enhance your learning with interactive notes and flashcards designed for maximum retention." />
        <link rel="canonical" href="https://thinked.edu/notes" />
      </Helmet>
      <Header />
      <div className={`min-h-screen transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
      }`}>
        <div className="responsive-container py-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="heading-2 text-foreground mb-2">{t('notes.quickNotes')}</h1>
                <p className="body-medium text-muted-foreground">
                  Create and review your study notes and flashcards
                </p>
              </div>
              <Button
                variant="default"
                size="md"
                onClick={() => console.log('Create new note')}
                iconName="Plus"
                iconPosition="left"
              >
                {t('notes.createNote')}
              </Button>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-white/20 dark:bg-slate-800/50 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'notes'
                  ? 'bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] text-white shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('notes.quickNotes')}
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'flashcards'
                  ? 'bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] text-white shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('notes.flashcards')}
            </button>
          </div>

          {/* Content */}
          {activeTab === 'notes' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl sm:rounded-2xl p-5 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-foreground">{note.title}</h3>
                    <div className="flex space-x-2">
                      <button className="p-1 rounded hover:bg-white/20 dark:hover:bg-slate-700">
                        <Icon name="Edit" size={16} className="text-muted-foreground" />
                      </button>
                      <button className="p-1 rounded hover:bg-white/20 dark:hover:bg-slate-700">
                        <Icon name="Trash" size={16} className="text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {note.content}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {note.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-[#4A9B8E]/10 text-[#4A9B8E]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created: {note.createdAt}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashcards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative h-64 cursor-pointer"
                  onClick={() => toggleCardFlip(card.id)}
                >
                  <div className={`absolute inset-0 glass rounded-xl sm:rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 transform ${
                    flippedCards[card.id] ? 'opacity-0 rotate-y-180' : 'opacity-100 rotate-y-0'
                  }`}>
                    <div>
                      <span className="text-xs px-2 py-1 rounded-full bg-[#4A9B8E]/10 text-[#4A9B8E]">
                        {card.subject}
                      </span>
                      <div className="mt-4 text-foreground font-medium">
                        {card.front}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                      Click to flip
                    </div>
                  </div>
                  <div className={`absolute inset-0 glass rounded-xl sm:rounded-2xl p-6 flex flex-col justify-center items-center transition-all duration-500 transform ${
                    flippedCards[card.id] ? 'opacity-100 rotate-y-0' : 'opacity-0 rotate-y-180'
                  }`}>
                    <div className="text-center">
                      <div className="text-foreground font-medium mb-4">
                        {card.back}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Click to flip back
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Study Button */}
          {activeTab === 'flashcards' && (
            <div className="mt-8 text-center">
              <Button
                variant="default"
                size="lg"
                onClick={() => console.log('Start studying')}
                iconName="Play"
                iconPosition="left"
              >
                {t('notes.studyNow')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;