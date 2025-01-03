import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ResumeProvider } from './contexts/ResumeContext';
import { CoverLetterProvider } from './contexts/CoverLetterContext';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Navbar from './components/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ResumeBuilder from './components/resume/ResumeBuilder';
import CoverLetterBuilder from './components/coverletter/CoverLetterBuilder';
import ShareableView from './components/shared/ShareableView';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ResumeProvider>
          <CoverLetterProvider>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <div className="container mx-auto px-4">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/" element={<Navigate to="/landing" replace />} />
                  <Route path="/landing" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="/resume-builder" element={<PrivateRoute><ResumeBuilder /></PrivateRoute>} />
                  <Route path="/cover-letter-builder" element={<PrivateRoute><CoverLetterBuilder /></PrivateRoute>} />
                  <Route path="/share/:id" element={<ShareableView />} />
                </Routes>
              </div>
            </div>
          </CoverLetterProvider>
        </ResumeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
