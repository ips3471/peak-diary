import React, {
	createContext,
	ReactNode,
	useState,
	useContext,
	useEffect,
} from 'react';
import auth from '../auth/auth';
import { useNavigate } from 'react-router-dom';
import database from '../database/database';
import ProfilePresenter from '../presenter/profile/ProfilePresenter';
import { UserProfile } from '../types/components/profile';

interface AuthContextValue {
	user: UserProfile | null;
	login(): void;
	logout(): void;
	update(profile: UserProfile): void;
}

interface AuthContextProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextValue>({
	user: null,
	login: () => {},
	logout: () => {},
	update: () => {},
});

export function AuthProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState<UserProfile | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		auth.onUserStateChanged(async user => {
			if (!user) return;
			const userFound = await ProfilePresenter.get(user.uid);

			if (userFound) {
				console.log('user founded', userFound);
				return setUser(userFound);
			}

			const profileInit: UserProfile = {
				name: user.displayName || 'User',
				photoURL: user.photoURL,
				uid: user.uid,
				account: null,
				isAdmin: await database.isAdmin(user),
			};

			ProfilePresenter.update(profileInit, setUser);
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

	function update(profile: UserProfile) {
		ProfilePresenter.update(profile, setUser);
	}

	return (
		<AuthContext.Provider value={{ user, login, logout, update }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	return useContext(AuthContext)!;
}
