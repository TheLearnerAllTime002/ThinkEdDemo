import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const flashcards = [
  { q: 'What is the powerhouse of the cell?', a: 'Mitochondria' },
  { q: 'What is 2 + 2?', a: '4' },
  { q: 'What is the capital of France?', a: 'Paris' },
];

const Flashcards = () => {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setIsFlipped(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full h-64 perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <AnimatePresence>
          <motion.div
            key={isFlipped}
            className="w-full h-full relative preserve-3d"
            initial={{ rotateY: isFlipped ? -180 : 0 }}
            animate={{ rotateY: isFlipped ? 0 : 180 }}
            exit={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-[#4A9B8E] to-[#3a7c71] rounded-lg flex justify-center items-center p-6">
              <p className="text-xl text-white">{flashcards[index].q}</p>
            </div>
            <motion.div
              className="absolute w-full h-full backface-hidden bg-gradient-to-br from-[#F59E0B] to-[#d98b0a] rounded-lg flex justify-center items-center p-6"
              initial={{ rotateY: 180 }}
            >
              <p className="text-xl text-white">{flashcards[index].a}</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        onClick={handleNext}
        className="mt-6 bg-gray-700 text-white font-bold py-2 px-6 rounded-full"
      >
        Next
      </button>
    </div>
  );
};

export default Flashcards;