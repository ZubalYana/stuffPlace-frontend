import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }
    return children;
};
