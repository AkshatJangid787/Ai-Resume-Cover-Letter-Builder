import React, { useState } from 'react';
import { useResume } from '../../../contexts/ResumeContext';
import { generateContent } from '../../../services/gemini';
import { FaSpinner } from 'react-icons/fa';

const PersonalInfo = () => {
  const { resumeData, updateSection } = useResume();
  const { personalInfo } = resumeData;
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [jobField, setJobField] = useState('');
  const [userDescription, setUserDescription] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSection('personalInfo', {
      ...personalInfo,
      [name]: value,
    });
  };

  const handleGenerateClick = () => {
    setShowDialog(true);
  };

  const handleGenerateDescription = async () => {
    if (!jobField.trim() || !userDescription.trim()) {
      alert('Please fill in both fields before generating');
      return;
    }

    setIsGenerating(true);
    setShowDialog(false);
    try {
      const prompt = `Generate a professional summary for a resume. Here's the context:
      Name: ${personalInfo.fullName}
      Desired Job Field: ${jobField}
      Personal Description: ${userDescription}
      Current Skills: ${resumeData.skills.join(', ')}
      Work Experience: ${resumeData.workExperience.map(exp => `${exp.position} at ${exp.company}`).join(', ')}
      Education: ${resumeData.education.map(edu => `${edu.degree} from ${edu.institution}`).join(', ')}
      
      Please write a concise, professional description (2-3 sentences) that:
      1. Highlights my experience and skills relevant to ${jobField}
      2. Incorporates elements from my personal description: ${userDescription}
      3. Positions me as an ideal candidate for ${jobField} roles`;

      const generatedContent = await generateContent(prompt);
      updateSection('personalInfo', {
        ...personalInfo,
        professionalDescription: generatedContent,
      });
    } catch (error) {
      console.error('Error generating description:', error);
      alert('Error generating description. Please try again.');
    } finally {
      setIsGenerating(false);
      setJobField('');
      setUserDescription('');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={personalInfo.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            value={personalInfo.linkedin}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Portfolio Website</label>
          <input
            type="url"
            name="portfolio"
            value={personalInfo.portfolio}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="col-span-2 mt-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Professional Description</label>
          <button
            onClick={handleGenerateClick}
            disabled={isGenerating}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Generating...
              </>
            ) : (
              'Generate with AI'
            )}
          </button>
        </div>
        <textarea
          name="professionalDescription"
          value={personalInfo.professionalDescription}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Write a brief professional description highlighting your experience, skills, and career objectives..."
        />
        <p className="mt-1 text-sm text-gray-500">
          Tip: Make your description concise, impactful, and tailored to your target role.
        </p>
      </div>

      {/* AI Generation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Generate Professional Description</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What field are you seeking a job in?
                </label>
                <input
                  type="text"
                  value={jobField}
                  onChange={(e) => setJobField(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Software Development, Marketing, Data Science"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Briefly describe your background and career goals
                </label>
                <textarea
                  value={userDescription}
                  onChange={(e) => setUserDescription(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., I'm a software developer with 3 years of experience, passionate about building user-friendly applications..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateDescription}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
