import React from 'react';
import { useAuthContext } from '../../../context/AuthContext';

interface LoginProps {
	// menuOpen: boolean;
}

export default function Login({}: LoginProps) {
	const { user, login, logout } = useAuthContext();

	const handleLogin = () => {
		user ? logout() : login();
	};

	return <button onClick={handleLogin}>{user ? '로그아웃' : '로그인'}</button>;
}
