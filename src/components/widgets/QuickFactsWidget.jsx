import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const facts = [
  {
    id: 1,
    fact: "The human brain weighs about 3 pounds, but it uses 20% of the body's oxygen and calories."
  },
  {
    id: 2,
    fact: "A single day on Venus is longer than a year on Venus. It rotates that slowly."
  },
  {
    id: 3,
    fact: "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion."
  },
  {
    id: 4,
    fact: "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible."
  }
];

const QuickFactsWidget = () => {
  const { t } = useTranslation();
  const [currentFact, setCurrentFact] = useState(facts[0]);
  const [isOpen, setIsOpen] = useState(true);

  const getNextFact = () => {
    const currentIndex = facts.findIndex(f => f.id === currentFact.id);
    const nextIndex = (currentIndex + 1) % facts.length;
    setCurrentFact(facts[nextIndex]);
  };

  if (!isOpen) {
    return (
      <motion.div 
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <Button 
          size="icon"
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] text-white shadow-lg"
        >
          <Icon name="Bulb" size={20} />
        </Button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 z-50 w-80 glass rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="Bulb" size={20} className="text-[#F59E0B]" />
              <h3 className="font-semibold text-foreground">{t('dashboard.factOfTheDay')}</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-white/20 dark:hover:bg-slate-700">
              <Icon name="X" size={16} className="text-muted-foreground" />
            </button>
          </div>
          <motion.p 
            key={currentFact.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-muted-foreground mb-4 h-24"
          >
            {currentFact.fact}
          </motion.p>
          <Button 
            variant="outline"
            size="sm"
            onClick={getNextFact}
            className="w-full"
          >
            {t('dashboard.nextFact')}
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickFactsWidget;