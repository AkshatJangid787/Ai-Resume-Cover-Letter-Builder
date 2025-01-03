import React, { useState } from 'react';
import { FaFilePdf, FaFileWord, FaSpinner, FaTimes } from 'react-icons/fa';
import { exportResumeToWord } from '../../services/resumeExportService';
import html2pdf from 'html2pdf.js';

const ResumeExportDialog = ({ isOpen, onClose, resumeData, resumeRef }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExport = async (type) => {
    setLoading(true);
    setError('');
    try {
      if (type === 'pdf') {
        const element = resumeRef.current;
        if (!element) {
          throw new Error('Resume element not found');
        }

        // Add print-specific styles
        const style = document.createElement('style');
        style.textContent = `
          @media print {
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            svg {
              width: 16px !important;
              height: 16px !important;
              margin-right: 8px !important;
              vertical-align: -2px !important;
            }

            .bg-blue-100 {
              background-color: #dbeafe !important;
            }
          }
        `;
        document.head.appendChild(style);

        const opt = {
          margin: 10,
          filename: 'resume.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true,
            scrollY: -window.scrollY
          },
          jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait'
          }
        };

        try {
          await html2pdf().set(opt).from(element).save();
        } finally {
          document.head.removeChild(style);
        }
      } else if (type === 'word') {
        await exportResumeToWord(resumeData);
      }
      onClose();
    } catch (err) {
      console.error('Export error:', err);
      setError('Failed to export resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Export Resume</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={() => handleExport('pdf')}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaFilePdf className="text-xl" />
            )}
            <span>Download as PDF</span>
          </button>

          <button
            onClick={() => handleExport('word')}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 p-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaFileWord className="text-xl" />
            )}
            <span>Download as Word</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeExportDialog;
