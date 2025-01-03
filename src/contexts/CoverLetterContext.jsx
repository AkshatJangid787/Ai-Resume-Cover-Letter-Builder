import React, { createContext, useContext, useState } from 'react';

const CoverLetterContext = createContext();

export const useCoverLetter = () => useContext(CoverLetterContext);

export const CoverLetterProvider = ({ children }) => {
  const [coverLetterData, setCoverLetterData] = useState({
    recipientInfo: {
      companyName: '',
      hiringManagerName: '',
      companyAddress: '',
      jobTitle: '',
    },
    senderInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      date: new Date().toISOString().split('T')[0],
    },
    content: {
      introduction: '',
      body: '',
      conclusion: '',
    },
    jobDetails: {
      role: '',
      company: '',
      description: '',
    },
    selectedTemplate: 'modern',
  });

  const updateSection = (section, data) => {
    setCoverLetterData(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  const generateWithAI = async (jobRole, userBackground) => {
    try {
      // This is where we'll integrate with Gemini AI
      // For now, return a placeholder response
      const response = {
        introduction: `Dear ${coverLetterData.recipientInfo.hiringManagerName || 'Hiring Manager'},\n\nI am writing to express my strong interest in the ${jobRole} position at ${coverLetterData.recipientInfo.companyName}.`,
        body: "With my background in [relevant field] and experience in [relevant skills], I am confident in my ability to contribute effectively to your team.",
        conclusion: "Thank you for considering my application. I look forward to discussing how I can contribute to your team's success.\n\nBest regards,\n[Your name]"
      };
      
      updateSection('content', response);
      return response;
    } catch (error) {
      console.error('Error generating cover letter:', error);
      throw error;
    }
  };

  const value = {
    coverLetterData,
    updateSection,
    generateWithAI,
  };

  return (
    <CoverLetterContext.Provider value={value}>
      {children}
    </CoverLetterContext.Provider>
  );
};
