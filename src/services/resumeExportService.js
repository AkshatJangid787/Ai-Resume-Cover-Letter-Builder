import html2pdf from 'html2pdf.js';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Spacing } from 'docx';
import { saveAs } from 'file-saver';

export const exportResumeToPdf = async (elementId, fileName = 'resume') => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Resume element not found');
  }

  const opt = {
    margin: 0.5,
    filename: `${fileName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true
    },
    jsPDF: { 
      unit: 'in', 
      format: 'a4', 
      orientation: 'portrait'
    }
  };

  try {
    await html2pdf().set(opt).from(element).save();
    return true;
  } catch (error) {
    console.error('Error exporting resume to PDF:', error);
    throw error;
  }
};

export const generateResumeWordDocument = (resumeData) => {
  const sections = [];

  // Header with name and contact info
  sections.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: resumeData.personalInfo.fullName,
          bold: true,
          size: 28,
        }),
        new TextRun({
          text: '\\n' + resumeData.personalInfo.email + ' | ' + resumeData.personalInfo.phone,
          size: 20,
        }),
        new TextRun({
          text: resumeData.personalInfo.location ? '\\n' + resumeData.personalInfo.location : '',
          size: 20,
        }),
      ],
    })
  );

  // Professional Summary
  if (resumeData.summary) {
    sections.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        text: 'Professional Summary',
        bold: true,
        spacing: { before: 300, after: 120 },
      }),
      new Paragraph({
        text: resumeData.summary,
        spacing: { after: 240 },
      })
    );
  }

  // Work Experience
  if (resumeData.experience?.length > 0) {
    sections.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        text: 'Work Experience',
        bold: true,
        spacing: { before: 300, after: 120 },
      })
    );

    resumeData.experience.forEach((exp) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.company, bold: true }),
            new TextRun({ text: ' | ' + exp.position }),
            new TextRun({ text: '\\n' + exp.startDate + ' - ' + (exp.endDate || 'Present') }),
          ],
          spacing: { before: 180, after: 120 },
        })
      );

      exp.responsibilities.forEach((resp) => {
        sections.push(
          new Paragraph({
            text: '• ' + resp,
            spacing: { before: 60, after: 60 },
          })
        );
      });
    });
  }

  // Education
  if (resumeData.education?.length > 0) {
    sections.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        text: 'Education',
        bold: true,
        spacing: { before: 300, after: 120 },
      })
    );

    resumeData.education.forEach((edu) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.degree, bold: true }),
            new TextRun({ text: '\\n' + edu.institution }),
            new TextRun({ text: '\\n' + edu.startDate + ' - ' + (edu.endDate || 'Present') }),
          ],
          spacing: { before: 180, after: 120 },
        })
      );
    });
  }

  // Skills
  if (resumeData.skills?.length > 0) {
    sections.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        text: 'Skills',
        bold: true,
        spacing: { before: 300, after: 120 },
      }),
      new Paragraph({
        text: resumeData.skills.join(', '),
        spacing: { after: 240 },
      })
    );
  }

  const doc = new Document({
    sections: [{
      properties: {},
      children: sections,
    }],
  });

  return doc;
};

export const exportResumeToWord = async (resumeData, fileName = 'resume') => {
  try {
    const doc = generateResumeWordDocument(resumeData);
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${fileName}.docx`);
    return true;
  } catch (error) {
    console.error('Error exporting resume to Word:', error);
    throw error;
  }
};
