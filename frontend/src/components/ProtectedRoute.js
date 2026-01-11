

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  
  
  const params = new URLSearchParams(location.search);
  const tokenInUrl = params.get('token');

 
  if (!token && !tokenInUrl) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;