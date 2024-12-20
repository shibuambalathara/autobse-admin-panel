import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store'; // Adjust the path to your store file

const ProtectedRoute: React.FC = () => {
  // Access the token and role from the Redux store
  const { token, user } = useSelector((state: RootState) => state.auth);
  
  
  // Check if the user is authenticated and has the required role
  const isAuthenticated = Boolean(token) && ['admin', 'staff'].includes(user?.role ?? '');

  
  const redirectState = { 
    state: { message: 'Access restricted. Dealer cannot access admin panel' } 
  };

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" {...redirectState} />;
};

export default ProtectedRoute;
