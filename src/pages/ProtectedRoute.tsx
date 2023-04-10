import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

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

	return <>{children}</>;
}

interface ProtectedRouteProps {
	requireAdmin: boolean;
	children: ReactNode;
}
