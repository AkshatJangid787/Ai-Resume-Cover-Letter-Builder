import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe } from 'react-icons/fa';

const ModernTemplate = ({ data }) => {
  const {
    personalInfo = {},
    workExperience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    achievements = []
  } = data || {};

  return (
    <div className="bg-white mx-auto p-8">
      {/* Header */}
      <div className="border-b-2 border-blue-500 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-800">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="mt-2 flex flex-wrap gap-4 text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <FaPhone className="mr-2" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              {personalInfo.location}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <FaLinkedin className="mr-2" />
              {personalInfo.linkedin}
            </div>
          )}
          {personalInfo.portfolio && (
            <div className="flex items-center">
              <FaGlobe className="mr-2" />
              {personalInfo.portfolio}
            </div>
          )}
        </div>
      </div>

      {/* Professional Description */}
      {personalInfo.professionalDescription && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">
            {personalInfo.professionalDescription}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Work Experience</h2>
          {workExperience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold">{exp.position}</h3>
                <span className="text-gray-600">
                  {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="text-gray-700">{exp.company}</div>
              {exp.responsibilities && (
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-sm">{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                <span className="text-gray-600">{edu.startDate} - {edu.endDate || 'Present'}</span>
              </div>
              <div className="text-gray-700">{edu.institution}</div>
              {edu.gpa && <div className="text-gray-600">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Projects</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {project.name}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        View Project →
                      </a>
                    )}
                  </h3>
                  <span className="text-gray-600 text-sm">
                    {project.startDate}{project.startDate && (project.endDate || project.current) ? ' - ' : ''}{project.current ? 'Present' : project.endDate}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{project.description}</p>
                {project.technologies && (
                  <p className="text-gray-600 mt-1 text-sm">
                    <span className="font-medium">Technologies:</span>{' '}
                    {Array.isArray(project.technologies) 
                      ? project.technologies.join(', ')
                      : project.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Certifications</h2>
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {cert.name}
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        View →
                      </a>
                    )}
                  </h3>
                  {cert.year && <span className="text-gray-600 text-sm">{cert.year}</span>}
                </div>
                <p className="text-gray-700">{cert.issuer}</p>
                {cert.description && (
                  <p className="text-gray-600 text-sm mt-1">{cert.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {achievements && achievements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Achievements</h2>
          <ul className="list-disc list-inside space-y-2">
            {achievements.map((achievement, index) => (
              <li key={index} className="text-gray-700">
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;
