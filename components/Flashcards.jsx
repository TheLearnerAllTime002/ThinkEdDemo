import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Flashcards({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="w-full max-w-md h-64 perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative w-full h-full preserve-3d">
          <div className={`absolute w-full h-full backface-hidden bg-gradient-to-br from-[#4A9B8E] to-[#F59E0B] rounded-2xl p-6 flex items-center justify-center ${isFlipped ? 'hidden' : ''}`}>
            <p className="text-white text-xl text-center">{cards[currentIndex]?.question}</p>
          </div>
          <div className={`absolute w-full h-full backface-hidden bg-gradient-to-br from-[#F59E0B] to-[#4A9B8E] rounded-2xl p-6 flex items-center justify-center ${!isFlipped ? 'hidden' : 'rotateY-180'}`}>
            <p className="text-white text-xl text-center">{cards[currentIndex]?.answer}</p>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-4 mt-6">
        <button 
          onClick={prevCard}
          className="bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-lg border border-white/30"
        >
          Previous
        </button>
        <button 
          onClick={nextCard}
          className="bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-lg border border-white/30"
        >
          Next
        </button>
      </div>
    </div>
  );
}
