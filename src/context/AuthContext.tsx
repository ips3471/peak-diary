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
import { SignInForm, SignUpForm } from '../types/sign-in/signIn';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { validator } from './validator/validator';

export type AuthProvider = 'Google' | 'Facebook';

interface AuthContextValue {
	user: UserProfile | null;
	loginByProvider: (provider: AuthProvider) => void;
	loginByEmail: (form: SignInForm) => void;
	logout(): void;
	signUp(form: SignUpForm): void;
	update(profile: UserProfile): void;
}

interface AuthContextProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextValue>({
	user: null,
	loginByProvider: () => {},
	logout: () => {},
	update: () => {},
	signUp: () => {},
	loginByEmail: () => {},
});

export function AuthProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState<UserProfile | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		auth.onUserStateChanged(async user => {
			if (!user) {
				navigate('/welcome');
				return setUser(null);
			}
			const userFound = await ProfilePresenter.get(user.uid);

			if (userFound) {
				navigate('/');
				return setUser(userFound);
			}

			/* const profileInit: UserProfile = {
				name: user.displayName || 'User',
				photoURL: user.photoURL,
				uid: user.uid,
				account: null,
				isAdmin: await database.isAdmin(user),
			};

			ProfilePresenter.update(profileInit, setUser); */
		});
	}, []);

	function signUp(form: SignUpForm) {
		const { email, password, username } = form;
		const auth = getAuth();

		const isValid = validator(form);

		isValid &&
			createUserWithEmailAndPassword(auth, email, password)
				.then(userCredential => {
					// Signed in
					const user = userCredential.user;
					console.log(user);
					ProfilePresenter.update(
						{
							name: username,
							photoURL: null,
							uid: user.uid,
							account: null,
							isAdmin: false,
						},
						setUser,
					);

					alert('축하합니다. 회원가입이 완료되었습니다.');
					navigate('login');

					// 회원완료 토스트 띄우고 유저가 확인 누르면
					// 로그인 페이지로 이동
				})
				.catch(console.error);
	}

	function loginByProvider(provider: AuthProvider) {
		switch (provider) {
			case 'Google':
				return auth.loginByProvider('google');
			case 'Facebook':
				return auth.loginByProvider('facebook');
		}
	}

	async function loginByEmail(form: SignInForm) {
		const { email, password } = form;
		const result = await auth.loginByEmail(email, password);
		switch (result.state) {
			case 'fail':
				console.error(result.error.code);
				if (result.error.code === 'auth/user-not-found') {
					return alert('존재하지 않는 계정입니다');
				}
				if (result.error.code === 'auth/wrong-password') {
					return alert('패스워드가 일치하지 않습니다');
				}
				return alert('로그인에 실패했습니다');
			case 'success':
				console.log('logined', result.uid);
		}

		// index페이지로 이동
	}

	function logout() {
		auth.logout();
		setUser(null);
		navigate('/welcome');
	}

	function update(profile: UserProfile) {
		ProfilePresenter.update(profile, setUser);
	}

	return (
		<AuthContext.Provider
			value={{ user, signUp, loginByEmail, loginByProvider, logout, update }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	return useContext(AuthContext)!;
}
