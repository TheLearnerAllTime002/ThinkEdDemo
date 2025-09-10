import { useState, useEffect } from 'react';

export default function useOfflineMode() {
  const [isOffline, setIsOffline] = useState(false);
  const [offlineLessons, setOfflineLessons] = useState(() => {
    const saved = localStorage.getItem('offlineLessons');
    return saved ? JSON.parse(saved) : [];
  });

  // Detect online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save lessons for offline access
  const downloadLesson = (lesson) => {
    const newOfflineLessons = [...offlineLessons, lesson];
    setOfflineLessons(newOfflineLessons);
    localStorage.setItem('offlineLessons', JSON.stringify(newOfflineLessons));
  };

  // Remove downloaded lesson
  const removeLesson = (lessonId) => {
    const newOfflineLessons = offlineLessons.filter(lesson => lesson.id !== lessonId);
    setOfflineLessons(newOfflineLessons);
    localStorage.setItem('offlineLessons', JSON.stringify(newOfflineLessons));
  };

  return { 
    isOffline, 
    offlineLessons, 
    downloadLesson, 
    removeLesson 
  };
}
