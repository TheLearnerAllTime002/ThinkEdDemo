import React from 'react';
import { motion } from 'framer-motion';

const GamifiedCards = ({ items, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden cursor-pointer"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)' }}
          onClick={() => onSelect(item.id)}
        >
          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
            <p className="text-gray-300">Click to view courses</p>
          </div>
          <div className="h-2 bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B]"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default GamifiedCards;