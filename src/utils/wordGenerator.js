import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Spacing } from 'docx';

export const generateWordDocument = (data) => {
  const { senderInfo, recipientInfo, content } = data;

  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Sender Info
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          spacing: { after: 300 },
          children: [
            new TextRun({ text: senderInfo.fullName, bold: true }),
            new TextRun({ text: '\n' + senderInfo.email }),
            new TextRun({ text: '\n' + senderInfo.phone }),
            new TextRun({ text: '\n' + senderInfo.address }),
          ],
        }),

        // Date
        new Paragraph({
          spacing: { after: 300 },
          children: [
            new TextRun({ text: senderInfo.date }),
          ],
        }),

        // Recipient Info
        new Paragraph({
          spacing: { after: 300 },
          children: [
            new TextRun({ text: recipientInfo.hiringManagerName, bold: true }),
            new TextRun({ text: '\n' + recipientInfo.jobTitle }),
            new TextRun({ text: '\n' + recipientInfo.companyName }),
            new TextRun({ text: '\n' + recipientInfo.companyAddress }),
          ],
        }),

        // Salutation
        new Paragraph({
          spacing: { after: 300 },
          children: [
            new TextRun({ 
              text: `Dear ${recipientInfo.hiringManagerName || 'Hiring Manager'},` 
            }),
          ],
        }),

        // Introduction
        new Paragraph({
          spacing: { after: 300 },
          children: [new TextRun({ text: content.introduction })],
        }),

        // Body
        new Paragraph({
          spacing: { after: 300 },
          children: [new TextRun({ text: content.body })],
        }),

        // Conclusion
        new Paragraph({
          spacing: { after: 300 },
          children: [new TextRun({ text: content.conclusion })],
        }),

        // Signature
        new Paragraph({
          spacing: { before: 300 },
          children: [
            new TextRun({ text: 'Sincerely,\n\n' }),
            new TextRun({ text: senderInfo.fullName, bold: true }),
          ],
        }),
      ],
    }],
  });

  return doc;
};
