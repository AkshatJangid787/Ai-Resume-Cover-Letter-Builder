import React, { useState, useRef } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import PersonalInfo from './sections/PersonalInfo';
import WorkExperience from './sections/WorkExperience';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Achievements from './sections/Achievements';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ResumeExportDialog from './ResumeExportDialog';
import { FaDownload } from 'react-icons/fa';

const ResumeBuilder = () => {
  const { resumeData, selectedTemplate, setSelectedTemplate } = useResume();
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [showExportDialog, setShowExportDialog] = useState(false);
  const resumeRef = useRef();

  const renderSection = () => {
    switch (activeSection) {
      case 'personalInfo':
        return <PersonalInfo />;
      case 'experience':
        return <WorkExperience />;
      case 'education':
        return <Education />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects />;
      case 'certifications':
        return <Certifications />;
      case 'achievements':
        return <Achievements />;
      default:
        return <PersonalInfo />;
    }
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'professional':
        return <ProfessionalTemplate data={resumeData} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="modern">Modern Template</option>
              <option value="professional">Professional Template</option>
              <option value="minimal">Minimal Template</option>
            </select>
          </div>
          <button
            onClick={() => setShowExportDialog(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FaDownload />
            <span>Export</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['personalInfo', 'experience', 'education', 'skills', 'projects', 'certifications', 'achievements'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    activeSection === section
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {section.replace(/([A-Z])/g, ' $1').trim()}
                </button>
              ))}
            </div>

            {/* Active Section Form */}
            <div className="mt-6">
              {renderSection()}
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="bg-white rounded-lg shadow-lg">
            <div id="resume-to-export" ref={resumeRef} className="p-8">
              {renderTemplate()}
            </div>
          </div>
        </div>

        {/* Export Dialog */}
        <ResumeExportDialog
          isOpen={showExportDialog}
          onClose={() => setShowExportDialog(false)}
          resumeData={resumeData}
          resumeRef={resumeRef}
        />
      </div>
    </div>
  );
};

export default ResumeBuilder;
