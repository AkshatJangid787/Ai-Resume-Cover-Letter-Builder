import React from 'react';
import { useCoverLetter } from '../../../contexts/CoverLetterContext';

const JobDetails = () => {
  const { coverLetterData, updateSection } = useCoverLetter();
  const { jobDetails } = coverLetterData;

  const handleChange = (field, value) => {
    updateSection('jobDetails', {
      ...jobDetails,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Job Role</label>
        <input
          type="text"
          value={jobDetails.role}
          onChange={(e) => handleChange('role', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., Senior Software Engineer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Company</label>
        <input
          type="text"
          value={jobDetails.company}
          onChange={(e) => handleChange('company', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., Acme Corporation"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Job Description
          <span className="text-gray-500 text-xs ml-2">
            (Paste the job description to help AI generate relevant content)
          </span>
        </label>
        <textarea
          value={jobDetails.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Paste the job description here..."
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Tips for Better AI Generation:</h3>
        <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
          <li>Include the complete job description</li>
          <li>Highlight key requirements and responsibilities</li>
          <li>Mention any specific qualifications or skills required</li>
          <li>Include information about the company culture if available</li>
        </ul>
      </div>
    </div>
  );
};

export default JobDetails;
