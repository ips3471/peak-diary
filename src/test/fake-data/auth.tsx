import { createContext, useState, useContext, useEffect } from 'react';
import {
	AuthContextProviderProps,
	AuthContextValue,
} from '../../types/interfaces/interfaces';
// import { fakeUser } from './user';

/* interface FakeAuthContextProviderProps extends AuthContextProviderProps {
	authResult: 'User' | 'Admin' | null;
}

const AuthContext = createContext<AuthContextValue>({
	user: null,
	login: () => {},
	logout: () => {},
});

function withIsAdmin(isAdmin: boolean): AuthUser {
	return { ...fakeUser, isAdmin };
}

export function AuthProvider({
	children,
	authResult,
}: FakeAuthContextProviderProps) {
	const [user, setUser] = useState<AuthUser | null>(null);

	useEffect(() => {
		switch (authResult) {
			case null:
				setUser(null);
				break;
			case 'User':
				setUser(withIsAdmin(false));
				break;
			case 'Admin':
				setUser(withIsAdmin(true));
		}
	}, []);

	function login() {}

	function logout() {}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	return useContext(AuthContext)!;
}
 */
