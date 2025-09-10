import React, { useState } from 'react';
import GamifiedCards from '../../components/GamifiedCards';
import lessons from '../../../data/lessons.json';

const subjects = [
  { id: 'Core Subjects', name: 'Core Subjects' },
  { id: 'Skill Courses', name: 'Skill Courses' },
];

const LessonsPage = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleSubjectSelect = (subjectId) => {
    setSelectedSubject(subjectId);
  };

  const filteredLessons = selectedSubject
    ? lessons.filter((lesson) => lesson.subject === selectedSubject)
    : [];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Lessons</h1>

      {!selectedSubject ? (
        <GamifiedCards items={subjects} onSelect={handleSubjectSelect} />
      ) : (
        <div>
          <button
            onClick={() => setSelectedSubject(null)}
            className="bg-gray-700 text-white font-bold py-2 px-4 rounded-full mb-6"
          >
            &larr; Back to Subjects
          </button>
          <h2 className="text-2xl font-bold mb-4">{selectedSubject}</h2>
          <div className="space-y-4">
            {filteredLessons.map((lesson) => (
              <div key={lesson.id} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-bold">{lesson.title}</h3>
                <p className="text-gray-400">{lesson.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonsPage;