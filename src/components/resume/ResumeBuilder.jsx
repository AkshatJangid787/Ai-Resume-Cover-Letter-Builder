import React, { useState, useRef } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { useReactToPrint } from 'react-to-print';
import { generateContent } from '../../services/gemini';
import PersonalInfo from './sections/PersonalInfo';
import WorkExperience from './sections/WorkExperience';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Hobbies from './sections/Hobbies';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

const ResumeBuilder = () => {
  const { resumeData, selectedTemplate, setSelectedTemplate } = useResume();
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [isGenerating, setIsGenerating] = useState(false);
  const resumeRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
  });

  const templates = {
    modern: ModernTemplate,
    professional: ProfessionalTemplate,
    minimal: MinimalTemplate,
  };

  const SelectedTemplate = templates[selectedTemplate];

  const handleAIGenerate = async (section) => {
    setIsGenerating(true);
    try {
      const prompt = `Generate professional content for the ${section} section of my resume. Current content: ${JSON.stringify(resumeData[section])}`;
      const generatedContent = await generateContent(prompt);
      // Handle the generated content based on the section
      console.log(generatedContent);
    } catch (error) {
      console.error('Error generating content:', error);
    }
    setIsGenerating(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'personalInfo':
        return <PersonalInfo />;
      case 'workExperience':
        return <WorkExperience />;
      case 'education':
        return <Education />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects />;
      case 'certifications':
        return <Certifications />;
      case 'hobbies':
        return <Hobbies />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar - Navigation */}
      <div className="w-64 bg-white shadow-lg">
        <nav className="p-4">
          <ul className="space-y-2">
            {['personalInfo', 'workExperience', 'education', 'skills', 'projects', 'certifications', 'hobbies'].map((section) => (
              <li key={section}>
                <button
                  onClick={() => setActiveSection(section)}
                  className={`w-full text-left px-4 py-2 rounded ${
                    activeSection === section ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-6 flex justify-between items-center">
          <div className="space-x-4">
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="px-4 py-2 border rounded"
            >
              <option value="modern">Modern Template</option>
              <option value="professional">Professional Template</option>
              <option value="minimal">Minimal Template</option>
            </select>
            <button
              onClick={() => handleAIGenerate(activeSection)}
              disabled={isGenerating}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              {isGenerating ? 'Generating...' : 'Generate with AI'}
            </button>
          </div>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Export PDF
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Edit Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            {renderSection()}
          </div>

          {/* Preview */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div ref={resumeRef}>
              <SelectedTemplate data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
