import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store'; // Adjust the path to your store file

const ProtectedRoute: React.FC = () => {
  // Access the token and role from the Redux store
  const { token } = useSelector((state: RootState) => state.auth); // Adjust the path as necessary
  const { user} = useSelector((state: RootState) => state.auth)
  console.log(user);
  
  // Check if the token exists
  const isAuthenticated = !!token;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
