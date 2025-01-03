import React, { useState } from 'react';
import { useResume } from '../../../contexts/ResumeContext';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Hobbies = () => {
  const { resumeData, updateSection } = useResume();
  const { hobbies } = resumeData;
  const [newHobby, setNewHobby] = useState('');

  const handleAdd = () => {
    if (newHobby.trim()) {
      updateSection('hobbies', [...hobbies, newHobby.trim()]);
      setNewHobby('');
    }
  };

  const handleRemove = (index) => {
    const newHobbies = hobbies.filter((_, i) => i !== index);
    updateSection('hobbies', newHobbies);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Hobbies & Interests</h2>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter a hobby or interest"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <FaPlus />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {hobbies.map((hobby, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full"
            >
              <span>{hobby}</span>
              <button
                onClick={() => handleRemove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hobbies;
