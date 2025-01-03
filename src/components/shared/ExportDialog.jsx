import React, { useState } from 'react';
import { FaFilePdf, FaFileWord, FaLink, FaSpinner } from 'react-icons/fa';
import { exportToPdf, exportToWord, generateShareableLink } from '../../services/exportService';
import { useAuth } from '../../contexts/AuthContext';

const ExportDialog = ({ isOpen, onClose, documentData, documentType }) => {
  const [loading, setLoading] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleExport = async (type) => {
    setLoading(true);
    setError('');
    try {
      switch (type) {
        case 'pdf':
          await exportToPdf('document-preview', 'cover-letter');
          break;
        case 'word':
          await exportToWord(documentData, 'cover-letter');
          break;
        case 'link':
          const link = await generateShareableLink(user.uid, documentData, documentType);
          setShareableLink(link);
          break;
        default:
          throw new Error('Invalid export type');
      }
    } catch (err) {
      setError('Failed to export document. Please try again.');
      console.error('Export error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-semibold mb-4">Export Options</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={() => handleExport('pdf')}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaFilePdf />}
            <span>Download as PDF</span>
          </button>

          <button
            onClick={() => handleExport('word')}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaFileWord />}
            <span>Download as Word</span>
          </button>

          <button
            onClick={() => handleExport('link')}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 p-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaLink />}
            <span>Generate Shareable Link</span>
          </button>

          {shareableLink && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shareable Link (Valid for 30 days)
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={shareableLink}
                  readOnly
                  className="flex-1 p-2 border rounded-l text-sm"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareableLink);
                    alert('Link copied to clipboard!');
                  }}
                  className="px-4 bg-gray-100 border border-l-0 rounded-r hover:bg-gray-200"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full p-2 text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ExportDialog;
