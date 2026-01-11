

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AIChat from './pages/AIChat'; 
import Profile from './pages/Profile';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './components/ResetPassword'

function App() {
  return (
    <Router>
        
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
              } />
            <Route path="/chat" element={
              <ProtectedRoute>
              <AIChat />
              </ProtectedRoute>
              } />
            {/* <Route path="/calendar" element={<Dashboard />} /> */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
              } />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
       
      
    </Router>
  );
}

export default App;