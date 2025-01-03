import React from 'react';
import { useCoverLetter } from '../../../contexts/CoverLetterContext';

const ContentEditor = () => {
  const { coverLetterData, updateSection } = useCoverLetter();
  const { content } = coverLetterData;

  const handleChange = (field, value) => {
    updateSection('content', {
      ...content,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Introduction
          <span className="text-gray-500 text-xs ml-2">
            (Introduce yourself and state your interest in the position)
          </span>
        </label>
        <textarea
          value={content.introduction}
          onChange={(e) => handleChange('introduction', e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Dear [Hiring Manager's Name],

I am writing to express my strong interest in the [Position] role at [Company Name]..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Body
          <span className="text-gray-500 text-xs ml-2">
            (Highlight your relevant experience and skills)
          </span>
        </label>
        <textarea
          value={content.body}
          onChange={(e) => handleChange('body', e.target.value)}
          rows={8}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="With [X] years of experience in [relevant field]..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Conclusion
          <span className="text-gray-500 text-xs ml-2">
            (Thank the reader and provide your contact information)
          </span>
        </label>
        <textarea
          value={content.conclusion}
          onChange={(e) => handleChange('conclusion', e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Thank you for considering my application. I look forward to discussing..."
        />
      </div>

      <div className="text-sm text-gray-500">
        <h3 className="font-medium text-gray-700 mb-2">Writing Tips:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Keep your paragraphs concise and focused</li>
          <li>Use specific examples to demonstrate your skills</li>
          <li>Address the key requirements from the job posting</li>
          <li>Maintain a professional and enthusiastic tone</li>
          <li>Proofread carefully for grammar and spelling</li>
        </ul>
      </div>
    </div>
  );
};

export default ContentEditor;
