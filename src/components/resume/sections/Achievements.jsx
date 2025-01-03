import React from 'react';
import { useResume } from '../../../contexts/ResumeContext';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Achievements = () => {
  const { resumeData, updateSection } = useResume();
  const { achievements = [] } = resumeData;

  const handleAdd = () => {
    updateSection('achievements', [...achievements, '']);
  };

  const handleRemove = (index) => {
    const newAchievements = achievements.filter((_, i) => i !== index);
    updateSection('achievements', newAchievements);
  };

  const handleChange = (index, value) => {
    const newAchievements = achievements.map((achievement, i) => {
      if (i === index) {
        return value;
      }
      return achievement;
    });
    updateSection('achievements', newAchievements);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Achievements</h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <FaPlus className="mr-2" />
          Add Achievement
        </button>
      </div>

      {achievements.map((achievement, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <textarea
                value={achievement}
                onChange={(e) => handleChange(index, e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Describe your achievement (e.g., 'Awarded first place in national coding competition 2023')"
              />
            </div>
            <button
              onClick={() => handleRemove(index)}
              className="ml-4 p-1 text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}

      {achievements.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          No achievements added yet. Click "Add Achievement" to get started.
        </p>
      )}
    </div>
  );
};

export default Achievements;
