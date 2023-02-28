import React from 'react';
import { useAuthContext } from '../../../context/AuthContext';

export default function Login() {
	const { user, login, logout } = useAuthContext();

	const handleLogin = () => {
		user ? logout() : login();
	};

	console.log(user);

	return (
		<button className='whitespace-nowrap' onClick={handleLogin}>
			{user ? '로그아웃' : '로그인'}
		</button>
	);
}
