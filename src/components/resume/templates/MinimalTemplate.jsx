import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe } from 'react-icons/fa';

const MinimalTemplate = ({ data }) => {
  const { personalInfo, workExperience, education, skills, projects, certifications, hobbies } = data;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white font-light">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-light text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center">
              <FaEnvelope className="mr-1" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <FaPhone className="mr-1" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-1" />
              {personalInfo.location}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <FaLinkedin className="mr-1" />
              {personalInfo.linkedin}
            </div>
          )}
          {personalInfo.portfolio && (
            <div className="flex items-center">
              <FaGlobe className="mr-1" />
              {personalInfo.portfolio}
            </div>
          )}
        </div>
      </header>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg uppercase tracking-wider text-gray-900 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="text-gray-700">
                {skill}
                {index < skills.length - 1 && ' • '}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg uppercase tracking-wider text-gray-900 mb-3">Experience</h2>
          {workExperience.map((work, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-gray-800">{work.position}</h3>
                <span className="text-gray-600 text-sm">{work.duration}</span>
              </div>
              <div className="text-gray-600 text-sm mb-2">
                {work.company} • {work.location}
              </div>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {work.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg uppercase tracking-wider text-gray-900 mb-3">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-gray-800">{edu.degree}</h3>
                <span className="text-gray-600 text-sm">{edu.year}</span>
              </div>
              <div className="text-gray-600 text-sm">
                {edu.institution} • {edu.location}
              </div>
              {edu.gpa && (
                <div className="text-gray-600 text-sm">GPA: {edu.gpa}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg uppercase tracking-wider text-gray-900 mb-3">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-gray-800">{project.name}</h3>
              <p className="text-gray-700 text-sm mb-1">{project.description}</p>
              {project.technologies && (
                <div className="text-gray-600 text-sm">
                  {project.technologies.join(' • ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg uppercase tracking-wider text-gray-900 mb-3">Certifications</h2>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="text-gray-800">{cert.name}</h3>
                <span className="text-gray-600 text-sm">{cert.year}</span>
              </div>
              <div className="text-gray-600 text-sm">{cert.issuer}</div>
            </div>
          ))}
        </div>
      )}

      {/* Hobbies */}
      {hobbies.length > 0 && (
        <div>
          <h2 className="text-lg uppercase tracking-wider text-gray-900 mb-3">Interests</h2>
          <div className="text-gray-700">
            {hobbies.join(' • ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
