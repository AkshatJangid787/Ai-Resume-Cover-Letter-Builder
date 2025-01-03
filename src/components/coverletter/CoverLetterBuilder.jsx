import React, { useState } from 'react';
import { useCoverLetter } from '../../contexts/CoverLetterContext';
import RecipientInfo from './sections/RecipientInfo';
import SenderInfo from './sections/SenderInfo';
import ContentEditor from './sections/ContentEditor';
import JobDetails from './sections/JobDetails';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import { FaDownload, FaMagic } from 'react-icons/fa';

const CoverLetterBuilder = () => {
  const { coverLetterData, generateWithAI } = useCoverLetter();
  const [activeSection, setActiveSection] = useState('recipientInfo');
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [jobRole, setJobRole] = useState('');
  const [userBackground, setUserBackground] = useState('');

  const handleAIGenerate = async () => {
    try {
      await generateWithAI(jobRole, userBackground);
      setShowAIDialog(false);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  const renderTemplate = () => {
    switch (coverLetterData.selectedTemplate) {
      case 'modern':
        return <ModernTemplate />;
      case 'professional':
        return <ProfessionalTemplate />;
      case 'minimal':
        return <MinimalTemplate />;
      default:
        return <ModernTemplate />;
    }
  };

  const sections = [
    { id: 'recipientInfo', label: 'Recipient Info', component: <RecipientInfo /> },
    { id: 'senderInfo', label: 'Sender Info', component: <SenderInfo /> },
    { id: 'jobDetails', label: 'Job Details', component: <JobDetails /> },
    { id: 'content', label: 'Content', component: <ContentEditor /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Cover Letter Builder</h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowAIDialog(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <FaMagic className="mr-2" />
                  AI Generate
                </button>
                <button
                  onClick={() => {/* Implement download functionality */}}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <FaDownload className="mr-2" />
                  Download
                </button>
              </div>
            </div>

            {/* Section Navigation */}
            <div className="flex space-x-2 border-b border-gray-200">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 font-medium ${
                    activeSection === section.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {/* Active Section Component */}
            <div className="bg-white p-6 rounded-lg shadow">
              {sections.find(section => section.id === activeSection)?.component}
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="border rounded-lg p-6">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>

      {/* AI Generation Dialog */}
      {showAIDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Generate with AI</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Role</label>
                <input
                  type="text"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Background</label>
                <textarea
                  value={userBackground}
                  onChange={(e) => setUserBackground(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Briefly describe your relevant experience and skills..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAIDialog(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAIGenerate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverLetterBuilder;
