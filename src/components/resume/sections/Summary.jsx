import React from 'react';
import { useResume } from '../../../contexts/ResumeContext';

const Summary = () => {
  const { resumeData, updateResumeData } = useResume();

  const handleChange = (e) => {
    updateResumeData('summary', e.target.value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Professional Summary</h3>
      <div>
        <textarea
          value={resumeData.summary || ''}
          onChange={handleChange}
          placeholder="Write a compelling professional summary..."
          className="w-full h-40 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="mt-2 text-sm text-gray-500">
          Write 3-4 sentences highlighting your key professional achievements and career goals.
        </p>
      </div>
    </div>
  );
};

export default Summary;
