import { useState, useEffect } from 'react';

export default function useProgress() {
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem('learningProgress');
    return savedProgress ? JSON.parse(savedProgress) : {};
  });

  const updateProgress = (subjectId, lessonId, score) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        [subjectId]: {
          ...prev[subjectId],
          [lessonId]: {
            completed: true,
            score,
            timestamp: new Date().toISOString()
          }
        }
      };
      localStorage.setItem('learningProgress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const getSubjectProgress = (subjectId) => {
    const subject = progress[subjectId] || {};
    const lessons = Object.values(subject);
    const completed = lessons.filter(l => l.completed).length;
    const total = lessons.length;
    const avgScore = completed > 0 
      ? lessons.reduce((sum, l) => sum + l.score, 0) / completed 
      : 0;

    return { completed, total, progress: total > 0 ? (completed / total) * 100 : 0, avgScore };
  };

  return { progress, updateProgress, getSubjectProgress };
}
