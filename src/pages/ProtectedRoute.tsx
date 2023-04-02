import React, { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { BlurContextProvider } from '../context/BlurContext';

export default function ProtectedRoute({
	children,
	requireAdmin,
}: ProtectedRouteProps) {
	const { user } = useAuthContext();

	useEffect(() => {
		if (!user || (requireAdmin && !user.isAdmin)) {
			<Navigate to={'/'} replace />;
			return;
		}
	}, []);

	return <BlurContextProvider>{children}</BlurContextProvider>;
}

interface ProtectedRouteProps {
	requireAdmin: boolean;
	children: ReactNode;
}
