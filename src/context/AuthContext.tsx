import React, {
	createContext,
	ReactNode,
	useState,
	useContext,
	useEffect,
} from 'react';
import auth from '../auth/auth';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import database from '../database/database';

interface AuthContextValue {
	user: AuthUser | null;
	login(): void;
	logout(): void;
}

type AuthUser = User & { isAdmin: Promise<boolean> };

interface AuthContextProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextValue>({
	user: null,
	login: () => {},
	logout: () => {},
});

export function AuthProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		auth.onUserStateChanged(async user => {
			if (!user) return;
			const isAdmin = await database.isAdmin(user);

			setUser({ ...user, isAdmin });
		});
	}, []);

	function login() {
		auth.login('google');
	}

	function logout() {
		auth.logout();
		setUser(null);
		navigate('/');
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	return useContext(AuthContext)!;
}
