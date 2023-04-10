import { useAuthContext } from '../../../context/AuthContext';
import { selectedDelay } from '../../navbar/utils/utils';

interface LoginProps {
	delay: number;
}

export default function Login({ delay }: LoginProps) {
	const { user, login, logout } = useAuthContext();

	const handleLogin = () => {
		user ? logout() : login();
	};

	return (
		<div
			className={`opacity-0 animate-appear animation-del ${selectedDelay(
				delay,
			)}`}
		>
			<button
				className={`animate-show-orderly ${selectedDelay(delay)}`}
				onClick={handleLogin}
			>
				{user ? '로그아웃' : '로그인'}
			</button>
		</div>
	);
}
