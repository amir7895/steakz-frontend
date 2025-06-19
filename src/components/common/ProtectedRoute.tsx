import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  console.log('ProtectedRoute Debug: user =', user, 'user.role =', user?.role, 'allowedRoles =', allowedRoles);

  // Ensure role validation is case-insensitive and handle undefined role
  const normalizedRole = user?.role?.toLowerCase() || '';
  const normalizedAllowedRoles = allowedRoles.map((role) => role.toLowerCase());

  if (!user || !normalizedAllowedRoles.includes(normalizedRole)) {
    console.log('Access denied: user.role =', user?.role, 'allowedRoles =', allowedRoles);
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
