import React from 'react';
import { useCoverLetter } from '../../../contexts/CoverLetterContext';

const ProfessionalTemplate = () => {
  const { coverLetterData } = useCoverLetter();
  const { senderInfo, recipientInfo, content } = coverLetterData;

  return (
    <div className="max-w-[8.5in] mx-auto bg-white p-8 font-serif">
      {/* Header with border */}
      <div className="border-b-2 border-gray-300 pb-6 mb-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{senderInfo.fullName}</h1>
          <div className="text-gray-600 space-y-1">
            <div>{senderInfo.email} • {senderInfo.phone}</div>
            <div className="whitespace-pre-line">{senderInfo.address}</div>
          </div>
        </div>
      </div>

      {/* Date */}
      <div className="mb-8">
        <div className="text-gray-900">{senderInfo.date}</div>
      </div>

      {/* Recipient Info */}
      <div className="mb-8">
        <div className="font-semibold text-gray-900">{recipientInfo.hiringManagerName}</div>
        <div className="text-gray-900">{recipientInfo.jobTitle}</div>
        <div className="text-gray-900">{recipientInfo.companyName}</div>
        <div className="text-gray-900 whitespace-pre-line">{recipientInfo.companyAddress}</div>
      </div>

      {/* Salutation */}
      <div className="mb-6">
        Dear {recipientInfo.hiringManagerName || 'Hiring Manager'},
      </div>

      {/* Content */}
      <div className="space-y-6 text-gray-800 leading-relaxed">
        <div className="whitespace-pre-line">{content.introduction}</div>
        <div className="whitespace-pre-line">{content.body}</div>
        <div className="whitespace-pre-line">{content.conclusion}</div>
      </div>

      {/* Signature */}
      <div className="mt-8 space-y-4">
        <div>Sincerely,</div>
        <div className="font-semibold">{senderInfo.fullName}</div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
