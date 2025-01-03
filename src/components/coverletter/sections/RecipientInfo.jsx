import React from 'react';
import { useCoverLetter } from '../../../contexts/CoverLetterContext';

const RecipientInfo = () => {
  const { coverLetterData, updateSection } = useCoverLetter();
  const { recipientInfo } = coverLetterData;

  const handleChange = (field, value) => {
    updateSection('recipientInfo', {
      ...recipientInfo,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Company Name</label>
        <input
          type="text"
          value={recipientInfo.companyName}
          onChange={(e) => handleChange('companyName', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., Acme Corporation"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Hiring Manager's Name</label>
        <input
          type="text"
          value={recipientInfo.hiringManagerName}
          onChange={(e) => handleChange('hiringManagerName', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., John Smith"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Company Address</label>
        <textarea
          value={recipientInfo.companyAddress}
          onChange={(e) => handleChange('companyAddress', e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter company address"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Job Title</label>
        <input
          type="text"
          value={recipientInfo.jobTitle}
          onChange={(e) => handleChange('jobTitle', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., Senior Software Engineer"
        />
      </div>
    </div>
  );
};

export default RecipientInfo;
