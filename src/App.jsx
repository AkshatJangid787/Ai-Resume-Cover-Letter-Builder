import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ResumeProvider } from './contexts/ResumeContext';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Navbar from './components/Navbar';
import ResumeBuilder from './components/resume/ResumeBuilder';

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
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-4">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <ResumeBuilder />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </ResumeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
