import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe } from 'react-icons/fa';

const ProfessionalTemplate = ({ data }) => {
  const { personalInfo, workExperience, education, skills, projects, certifications, hobbies } = data;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
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
        </div>
        <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
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

      {/* Professional Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 mb-3">
          Professional Summary
        </h2>
        <p className="text-gray-700">
          Experienced professional with a strong background in {skills.slice(0, 3).join(', ')}.
        </p>
      </div>

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 mb-3">
            Work Experience
          </h2>
          {workExperience.map((work, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-semibold text-gray-800">{work.position}</h3>
                <span className="text-gray-600">{work.duration}</span>
              </div>
              <div className="text-gray-700 font-medium">{work.company}</div>
              <div className="text-gray-600 text-sm mb-2">{work.location}</div>
              <ul className="list-disc list-inside text-gray-700">
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
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 mb-3">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                <span className="text-gray-600">{edu.year}</span>
              </div>
              <div className="text-gray-700">{edu.institution}</div>
              <div className="text-gray-600">{edu.location}</div>
              {edu.gpa && <div className="text-gray-600">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
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
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 mb-3">
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-gray-800">{project.name}</h3>
              <p className="text-gray-700 mb-1">{project.description}</p>
              {project.technologies && (
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="text-sm text-gray-600">
                      {tech}
                      {idx < project.technologies.length - 1 ? ' • ' : ''}
                    </span>
                  ))}
                </div>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 mb-3">
            Certifications
          </h2>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                <span className="text-gray-600">{cert.year}</span>
              </div>
              <div className="text-gray-700">{cert.issuer}</div>
            </div>
          ))}
        </div>
      )}

      {/* Hobbies */}
      {hobbies.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 mb-3">
            Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {hobbies.map((hobby, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
