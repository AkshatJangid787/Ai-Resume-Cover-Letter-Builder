import React from 'react';
import { useResume } from '../../../contexts/ResumeContext';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Projects = () => {
  const { resumeData, updateSection } = useResume();
  const { projects } = resumeData;

  const handleAdd = () => {
    updateSection('projects', [
      ...projects,
      {
        name: '',
        description: '',
        technologies: [],
        link: '',
      },
    ]);
  };

  const handleRemove = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    updateSection('projects', newProjects);
  };

  const handleChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index] = {
      ...newProjects[index],
      [field]: value,
    };
    updateSection('projects', newProjects);
  };

  const handleTechnologiesChange = (index, value) => {
    const technologies = value.split(',').map(tech => tech.trim()).filter(tech => tech);
    const newProjects = [...projects];
    newProjects[index] = {
      ...newProjects[index],
      technologies,
    };
    updateSection('projects', newProjects);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Projects</h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <FaPlus className="mr-2" /> Add Project
        </button>
      </div>

      {projects.map((project, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={project.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Technologies Used</label>
              <input
                type="text"
                value={project.technologies.join(', ')}
                onChange={(e) => handleTechnologiesChange(index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., React, Node.js, MongoDB (comma-separated)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Project Link</label>
              <input
                type="url"
                value={project.link}
                onChange={(e) => handleChange(index, 'link', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., https://github.com/username/project"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
