import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe } from 'react-icons/fa';

const MinimalTemplate = ({ data }) => {
  const { personalInfo, workExperience, education, skills, projects, certifications, achievements } = data;

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

      {/* Professional Description */}
      {personalInfo.professionalDescription && (
        <section className="mb-8">
          <h2 className="text-lg uppercase tracking-wider text-gray-900 mb-3">About Me</h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.professionalDescription}</p>
        </section>
      )}

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

      {/* Education Section */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg uppercase tracking-wider text-gray-800 mb-3">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{edu.degree}</h3>
                <span className="text-gray-600 text-sm">
                  {edu.startDate}{edu.startDate && (edu.endDate || edu.current) ? ' - ' : ''}{edu.current ? 'Present' : edu.endDate}
                </span>
              </div>
              <div className="text-gray-700">{edu.institution}</div>
              {edu.location && <div className="text-gray-600 text-sm">{edu.location}</div>}
              {edu.gpa && <div className="text-gray-600 text-sm">GPA: {edu.gpa}</div>}
              {edu.description && <div className="text-gray-600 text-sm mt-1">{edu.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Work Experience Section */}
      {workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg uppercase tracking-wider text-gray-800 mb-3">Work Experience</h2>
          {workExperience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{exp.position}</h3>
                <span className="text-gray-600 text-sm">
                  {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' - ' : ''}{exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="text-gray-700">{exp.company}</div>
              {exp.location && <div className="text-gray-600 text-sm">{exp.location}</div>}
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-gray-600 text-sm">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg uppercase tracking-wider text-gray-800 mb-3">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">
                  {project.name}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      →
                    </a>
                  )}
                </h3>
                <span className="text-gray-600 text-sm">
                  {project.startDate}{project.startDate && (project.endDate || project.current) ? ' - ' : ''}{project.current ? 'Present' : project.endDate}
                </span>
              </div>
              <p className="text-gray-700 text-sm mt-1">{project.description}</p>
              {project.technologies && (
                <p className="text-gray-600 text-sm mt-1">
                  <span className="font-medium">Technologies:</span>{' '}
                  {Array.isArray(project.technologies)
                    ? project.technologies.join(', ')
                    : project.technologies}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 uppercase tracking-wider mb-3">Certifications</h2>
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-gray-900 font-medium">
                    {cert.name}
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-gray-600 hover:text-gray-900 text-sm"
                      >
                        →
                      </a>
                    )}
                  </h3>
                  <span className="text-gray-600 text-sm">{cert.year}</span>
                </div>
                <p className="text-gray-700 text-sm">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements Section */}
      {achievements && achievements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 uppercase tracking-wider mb-3">
            Achievements
          </h2>
          <ul className="list-disc ml-5 space-y-2">
            {achievements.map((achievement, index) => (
              <li key={index} className="text-gray-700 leading-relaxed">
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
