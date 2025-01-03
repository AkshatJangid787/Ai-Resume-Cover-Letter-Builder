import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaEnvelope } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Career Tools
          </h1>
          <p className="text-xl text-gray-600">
            Create professional resumes and cover letters with AI-powered assistance
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Resume Builder Card */}
          <div
            onClick={() => handleCardClick('/resume-builder')}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FaFileAlt className="text-2xl text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Resume Builder
              </h2>
              <div className="space-y-3 text-gray-600">
                <p className="flex items-center">
                  <span className="mr-2">•</span>
                  Professional Templates
                </p>
                <p className="flex items-center">
                  <span className="mr-2">•</span>
                  AI-Powered Content Suggestions
                </p>
                <p className="flex items-center">
                  <span className="mr-2">•</span>
                  Easy-to-Use Interface
                </p>
              </div>
              <div className="mt-6">
                <span className="inline-flex items-center text-blue-600 font-medium">
                  Get Started
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Cover Letter Builder Card */}
          <div
            onClick={() => handleCardClick('/cover-letter-builder')}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FaEnvelope className="text-2xl text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Cover Letter Builder
              </h2>
              <div className="space-y-3 text-gray-600">
                <p className="flex items-center">
                  <span className="mr-2">•</span>
                  AI-Generated Content
                </p>
                <p className="flex items-center">
                  <span className="mr-2">•</span>
                  Industry-Specific Templates
                </p>
                <p className="flex items-center">
                  <span className="mr-2">•</span>
                  Customizable Design
                </p>
              </div>
              <div className="mt-6">
                <span className="inline-flex items-center text-green-600 font-medium">
                  Get Started
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p>Choose a tool to get started with your career documents</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
