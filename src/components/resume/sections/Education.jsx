import React from 'react';
import { useResume } from '../../../contexts/ResumeContext';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Education = () => {
  const { resumeData, updateSection } = useResume();
  const { education } = resumeData;

  const handleAdd = () => {
    updateSection('education', [
      ...education,
      {
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        gpa: '',
        description: ''
      },
    ]);
  };

  const handleRemove = (index) => {
    const newEducation = education.filter((_, i) => i !== index);
    updateSection('education', newEducation);
  };

  const handleChange = (index, field, value) => {
    const newEducation = education.map((edu, i) => {
      if (i === index) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    updateSection('education', newEducation);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Education</h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <FaPlus className="mr-2" /> Add Education
        </button>
      </div>

      {education.map((edu, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Degree/Program</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleChange(index, 'degree', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Bachelor of Science in Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleChange(index, 'institution', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., University of California"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="text"
                value={edu.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Sep 2020"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                  disabled={edu.current}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Jun 2024"
                />
                <label className="inline-flex items-center mt-1">
                  <input
                    type="checkbox"
                    checked={edu.current}
                    onChange={(e) => {
                      handleChange(index, 'current', e.target.checked);
                      if (e.target.checked) {
                        handleChange(index, 'endDate', 'Present');
                      } else {
                        handleChange(index, 'endDate', '');
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Current</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={edu.location}
                onChange={(e) => handleChange(index, 'location', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Berkeley, CA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">GPA (Optional)</label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., 3.8/4.0"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
              <textarea
                value={edu.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Add any relevant coursework, honors, or achievements..."
              />
            </div>
          </div>
        </div>
      ))}

      {education.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          No education added yet. Click "Add Education" to get started.
        </p>
      )}
    </div>
  );
};

export default Education;
