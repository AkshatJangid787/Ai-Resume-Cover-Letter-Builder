import React from 'react';
import { useResume } from '../../../contexts/ResumeContext';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Projects = () => {
  const { resumeData, updateSection } = useResume();
  const { projects } = resumeData;

  const handleAdd = () => {
    updateSection('projects', [...projects, {
      name: '',
      description: '',
      technologies: '',
      link: '',
      startDate: '',
      endDate: '',
      current: false
    }]);
  };

  const handleRemove = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    updateSection('projects', newProjects);
  };

  const handleChange = (index, field, value) => {
    const newProjects = projects.map((project, i) => {
      if (i === index) {
        // Only format if there's a value and it's not a backspace operation
        if (field === 'technologies' && value) {
          // Only format if the last character isn't a comma or space
          const lastChar = value[value.length - 1];
          if (lastChar !== ',' && lastChar !== ' ') {
            value = value.split(',')
              .map(tech => tech.trim())
              .filter(tech => tech)
              .join(', ');
          }
        }
        return { ...project, [field]: value };
      }
      return project;
    });
    updateSection('projects', newProjects);
  };

  // Function to format technologies for display
  const formatTechnologies = (technologies) => {
    if (!technologies) return '';
    return technologies.split(',').map(tech => tech.trim()).join(', ');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Projects</h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <FaPlus className="mr-2" />
          Add Project
        </button>
      </div>

      {projects.map((project, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex-grow space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., E-commerce Website"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={project.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Describe the project and your role..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="text"
                    value={project.startDate}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., Jan 2020"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={project.endDate}
                      onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                      disabled={project.current}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., Dec 2023"
                    />
                    <label className="inline-flex items-center mt-1">
                      <input
                        type="checkbox"
                        checked={project.current}
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Technologies Used
                  <span className="text-gray-500 text-xs ml-2">(Separate with commas)</span>
                </label>
                <input
                  type="text"
                  value={formatTechnologies(project.technologies)}
                  onChange={(e) => handleChange(index, 'technologies', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., React, Node.js, MongoDB"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Project Link (Optional)</label>
                <input
                  type="text"
                  value={project.link}
                  onChange={(e) => handleChange(index, 'link', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., https://github.com/username/project"
                />
              </div>
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

      {projects.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          No projects added yet. Click "Add Project" to get started.
        </p>
      )}
    </div>
  );
};

export default Projects;
