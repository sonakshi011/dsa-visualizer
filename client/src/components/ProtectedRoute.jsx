import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // If user is logged in, render the children components
  // Otherwise, redirect to login page
  return user ? children : <Navigate to="/login" replace />;
}
