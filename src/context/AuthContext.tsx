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
import ProfilePresenter from '../presenter/profile/ProfilePresenter';
import { UserProfile } from '../types/components/profile';

interface AuthContextValue {
	user: AuthUser | null;
	login(): void;
	logout(): void;
}

export type AuthUser = User & {
	isAdmin: Promise<boolean>;
	profile: UserProfile;
};

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
			const userFound = await ProfilePresenter.get(user.uid);

			setUser({
				...user,
				isAdmin,
				profile: userFound ? userFound : ProfilePresenter.init(user),
			});
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
