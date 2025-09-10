import { motion } from 'framer-motion';

export default function GamifiedCards({ items, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 cursor-pointer"
          onClick={() => onSelect(item)}
        >
          <div className="flex items-center mb-4">
            <div className="p-3 bg-white/30 rounded-lg mr-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
          </div>
          <p className="text-white/80">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
