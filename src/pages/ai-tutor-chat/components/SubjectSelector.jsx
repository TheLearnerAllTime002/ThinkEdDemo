import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../../hooks/useTranslation';
import Icon from '../../../components/AppIcon';

const SubjectSelector = ({ selectedSubject, onSubjectChange }) => {
  const { t } = useTranslation();
  
  const subjects = [
    {
      id: 'general',
      name: t('aiTutor.subjects.general'),
      icon: 'BookOpen',
      color: '#4A9B8E'
    },
    {
      id: 'mathematics',
      name: t('aiTutor.subjects.math'),
      icon: 'Calculator',
      color: '#F59E0B'
    },
    {
      id: 'science',
      name: t('aiTutor.subjects.science'),
      icon: 'Atom',
      color: '#8B5CF6'
    },
    {
      id: 'english',
      name: t('aiTutor.subjects.english'),
      icon: 'FileText',
      color: '#10B981'
    },
    {
      id: 'history',
      name: t('aiTutor.subjects.history'),
      icon: 'Clock',
      color: '#EF4444'
    },
    {
      id: 'programming',
      name: t('aiTutor.subjects.programming'),
      icon: 'Code',
      color: '#3B82F6'
    }
  ];

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
      {subjects?.map((subject) => (
        <motion.button
          key={subject?.id}
          onClick={() => onSubjectChange(subject?.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all whitespace-nowrap flex-shrink-0 text-sm font-medium ${
            selectedSubject === subject?.id
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
          }`}
        >
          <Icon 
            name={subject?.icon} 
            size={14}
            color={selectedSubject === subject?.id ? (subject?.id === selectedSubject ? 'currentColor' : subject?.color) : 'currentColor'} 
          />
          <span>{subject?.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default SubjectSelector;