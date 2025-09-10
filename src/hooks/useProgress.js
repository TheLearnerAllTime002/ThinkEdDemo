import { useState } from 'react';

export const useProgress = () => {
  const [progress, setProgress] = useState({});

  const updateProgress = (lessonId, completed) => {
    setProgress({
      ...progress,
      [lessonId]: completed,
    });
  };

  return [progress, updateProgress];
};