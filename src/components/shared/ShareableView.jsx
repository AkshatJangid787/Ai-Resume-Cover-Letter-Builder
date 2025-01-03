import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import ModernTemplate from '../coverletter/templates/ModernTemplate';
import ProfessionalTemplate from '../coverletter/templates/ProfessionalTemplate';
import MinimalTemplate from '../coverletter/templates/MinimalTemplate';

const ShareableView = () => {
  const { id } = useParams();
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        // Get document metadata from Firestore
        const docRef = doc(db, 'shared_documents', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error('Document not found');
        }

        const data = docSnap.data();

        // Check if document has expired
        if (data.expiresAt.toDate() < new Date()) {
          throw new Error('This link has expired');
        }

        // Get document content from Storage
        const storageRef = ref(storage, `shared_documents/${id}`);
        const url = await getDownloadURL(storageRef);
        const response = await fetch(url);
        const content = await response.json();

        setDocumentData(content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {documentData && (
            <>
              {documentData.template === 'modern' && <ModernTemplate data={documentData} />}
              {documentData.template === 'professional' && <ProfessionalTemplate data={documentData} />}
              {documentData.template === 'minimal' && <MinimalTemplate data={documentData} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareableView;
