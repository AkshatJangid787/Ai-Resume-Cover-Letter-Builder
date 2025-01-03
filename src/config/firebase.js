import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDppqx2gjL5Z_te9cK4ERFiV222ILbliaM",
  authDomain: "resume-cover-letter-buil-5aadb.firebaseapp.com",
  projectId: "resume-cover-letter-buil-5aadb",
  storageBucket: "resume-cover-letter-buil-5aadb.firebasestorage.app",
  messagingSenderId: "916315556554",
  appId: "1:916315556554:web:b334fd06fbdf6e02ed8233"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
