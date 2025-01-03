import React from 'react';
import { useResume } from '../../../contexts/ResumeContext';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Certifications = () => {
  const { resumeData, updateSection } = useResume();
  const { certifications } = resumeData;

  const handleAdd = () => {
    updateSection('certifications', [
      ...certifications,
      {
        name: '',
        issuer: '',
        year: '',
        link: '',
      },
    ]);
  };

  const handleRemove = (index) => {
    const newCertifications = certifications.filter((_, i) => i !== index);
    updateSection('certifications', newCertifications);
  };

  const handleChange = (index, field, value) => {
    const newCertifications = [...certifications];
    newCertifications[index] = {
      ...newCertifications[index],
      [field]: value,
    };
    updateSection('certifications', newCertifications);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Certifications</h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <FaPlus className="mr-2" /> Add Certification
        </button>
      </div>

      {certifications.map((cert, index) => (
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
              <label className="block text-sm font-medium text-gray-700">Certification Name</label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => handleChange(index, 'issuer', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <input
                type="text"
                value={cert.year}
                onChange={(e) => handleChange(index, 'year', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., 2023"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Credential Link</label>
              <input
                type="url"
                value={cert.link}
                onChange={(e) => handleChange(index, 'link', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., https://credential.net/..."
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Certifications;
