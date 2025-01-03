import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe } from 'react-icons/fa';

const ProfessionalTemplate = ({ data }) => {
  const { personalInfo, workExperience, education, skills, projects, certifications, achievements } = data;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600">
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
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            </div>
          )}
          {personalInfo.portfolio && (
            <div className="flex items-center">
              <FaGlobe className="mr-2" />
              <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Portfolio
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Professional Description */}
      {personalInfo.professionalDescription && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-4">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.professionalDescription}</p>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{edu.degree}</h3>
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
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
            Work Experience
          </h2>
          {workExperience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{exp.position}</h3>
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
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">
                  {project.name}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                      View →
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

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-4">Certifications</h2>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-4">
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
                      View Credential →
                    </a>
                  )}
                </h3>
                <span className="text-gray-600">{cert.year}</span>
              </div>
              <p className="text-gray-700 mt-1">{cert.issuer}</p>
            </div>
          ))}
        </section>
      )}

      {/* Achievements Section */}
      {achievements && achievements.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
            Achievements
          </h2>
          <ul className="list-disc ml-6 space-y-2">
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

export default ProfessionalTemplate;
