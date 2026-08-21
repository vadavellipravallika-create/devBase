import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ExamScope from './pages/ExamScope';
import FixMyCode from './pages/FixMyCode';
import RoleReady from './pages/RoleReady';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/examscope" element={
              <ProtectedRoute>
                <ExamScope />
              </ProtectedRoute>
            } />
            
            <Route path="/fixmycode" element={
              <ProtectedRoute>
                <FixMyCode />
              </ProtectedRoute>
            } />
            
            <Route path="/roleready" element={
              <ProtectedRoute>
                <RoleReady />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
