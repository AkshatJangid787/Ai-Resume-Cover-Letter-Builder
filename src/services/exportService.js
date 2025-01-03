import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
import { Packer } from 'docx';
import { generateWordDocument } from '../utils/wordGenerator';
import { db, storage } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

export const exportToPdf = async (elementId, fileName) => {
  const element = document.getElementById(elementId);
  const opt = {
    margin: 1,
    filename: `${fileName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  try {
    await html2pdf().set(opt).from(element).save();
    return true;
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw error;
  }
};

export const exportToWord = async (data, fileName) => {
  try {
    const doc = generateWordDocument(data);
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${fileName}.docx`);
    return true;
  } catch (error) {
    console.error('Error exporting to Word:', error);
    throw error;
  }
};

export const generateShareableLink = async (userId, documentData, documentType) => {
  try {
    // Create a document in Firestore to store the share info
    const shareDoc = await addDoc(collection(db, 'shared_documents'), {
      userId,
      documentType,
      createdAt: serverTimestamp(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    });

    // Store the document content in Firebase Storage
    const storageRef = ref(storage, `shared_documents/${shareDoc.id}`);
    await uploadString(storageRef, JSON.stringify(documentData), 'raw');

    // Get the download URL
    const downloadUrl = await getDownloadURL(storageRef);

    // Update the Firestore document with the storage URL
    await shareDoc.update({
      storageUrl: downloadUrl,
    });

    // Generate a shareable link
    const shareableLink = `${window.location.origin}/share/${shareDoc.id}`;
    return shareableLink;

  } catch (error) {
    console.error('Error generating shareable link:', error);
    throw error;
  }
};
