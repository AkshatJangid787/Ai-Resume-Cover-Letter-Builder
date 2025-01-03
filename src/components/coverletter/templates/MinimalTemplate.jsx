import React from 'react';
import { useCoverLetter } from '../../../contexts/CoverLetterContext';

const MinimalTemplate = () => {
  const { coverLetterData } = useCoverLetter();
  const { senderInfo, recipientInfo, content } = coverLetterData;

  return (
    <div className="max-w-[8.5in] mx-auto bg-white p-8 font-sans">
      {/* Sender Info - Minimal top left */}
      <div className="mb-12">
        <div className="text-gray-900">{senderInfo.fullName}</div>
        <div className="text-gray-600 text-sm">{senderInfo.email}</div>
        <div className="text-gray-600 text-sm">{senderInfo.phone}</div>
      </div>

      {/* Date */}
      <div className="mb-8 text-sm text-gray-600">
        {senderInfo.date}
      </div>

      {/* Recipient Info */}
      <div className="mb-8 text-sm">
        <div className="text-gray-900">{recipientInfo.hiringManagerName}</div>
        <div className="text-gray-900">{recipientInfo.jobTitle}</div>
        <div className="text-gray-900">{recipientInfo.companyName}</div>
        <div className="text-gray-900 whitespace-pre-line">{recipientInfo.companyAddress}</div>
      </div>

      {/* Content */}
      <div className="space-y-6 text-gray-800 leading-relaxed text-sm">
        <div className="whitespace-pre-line">{content.introduction}</div>
        <div className="whitespace-pre-line">{content.body}</div>
        <div className="whitespace-pre-line">{content.conclusion}</div>
      </div>

      {/* Signature */}
      <div className="mt-8 text-sm">
        <div className="text-gray-600 mb-4">Best regards,</div>
        <div className="text-gray-900">{senderInfo.fullName}</div>
      </div>
    </div>
  );
};

export default MinimalTemplate;
