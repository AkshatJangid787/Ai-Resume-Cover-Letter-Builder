import React from 'react';
import { useResume } from '../../../contexts/ResumeContext';
import { FaPlus, FaTrash } from 'react-icons/fa';

const WorkExperience = () => {
  const { resumeData, updateSection } = useResume();
  const { workExperience } = resumeData;

  const handleAdd = () => {
    updateSection('workExperience', [
      ...workExperience,
      {
        position: '',
        company: '',
        location: '',
        duration: '',
        responsibilities: [''],
      },
    ]);
  };

  const handleRemove = (index) => {
    const newExperience = workExperience.filter((_, i) => i !== index);
    updateSection('workExperience', newExperience);
  };

  const handleChange = (index, field, value) => {
    const newExperience = [...workExperience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value,
    };
    updateSection('workExperience', newExperience);
  };

  const handleAddResponsibility = (expIndex) => {
    const newExperience = [...workExperience];
    newExperience[expIndex].responsibilities.push('');
    updateSection('workExperience', newExperience);
  };

  const handleRemoveResponsibility = (expIndex, respIndex) => {
    const newExperience = [...workExperience];
    newExperience[expIndex].responsibilities = newExperience[expIndex].responsibilities.filter(
      (_, i) => i !== respIndex
    );
    updateSection('workExperience', newExperience);
  };

  const handleResponsibilityChange = (expIndex, respIndex, value) => {
    const newExperience = [...workExperience];
    newExperience[expIndex].responsibilities[respIndex] = value;
    updateSection('workExperience', newExperience);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Work Experience</h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <FaPlus className="mr-2" /> Add Experience
        </button>
      </div>

      {workExperience.map((exp, expIndex) => (
        <div key={expIndex} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => handleRemove(expIndex)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => handleChange(expIndex, 'position', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleChange(expIndex, 'company', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => handleChange(expIndex, 'location', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => handleChange(expIndex, 'duration', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Jan 2020 - Present"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
              <button
                onClick={() => handleAddResponsibility(expIndex)}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                <FaPlus /> Add
              </button>
            </div>
            {exp.responsibilities.map((resp, respIndex) => (
              <div key={respIndex} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={resp}
                  onChange={(e) => handleResponsibilityChange(expIndex, respIndex, e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter responsibility"
                />
                <button
                  onClick={() => handleRemoveResponsibility(expIndex, respIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkExperience;
