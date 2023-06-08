import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineGoogle } from 'react-icons/ai';
import { AuthProvider, useAuthContext } from '../../../../context/AuthContext';

export type SocialAuthProvider = 'google' | 'facebook';

interface ButtonSocialLoginProps {
	name: string;
	type: SocialAuthProvider;
}

export default function ButtonSocialLogin({
	name,
	type,
}: ButtonSocialLoginProps) {
	const { loginByProvider } = useAuthContext();

	function selectSocialIcon() {
		switch (type) {
			case 'facebook':
				return (
					<span className='text-main-dark'>
						<FaFacebookF />
					</span>
				);
			case 'google':
				return (
					<span className='text-main-dark'>
						<AiOutlineGoogle />
					</span>
				);
		}
	}

	const loginType: AuthProvider | null =
		type === 'google' ? 'Google' : type === 'facebook' ? 'Facebook' : null;
	if (!loginType) throw new Error('not void login type');

	return (
		<button
			type='button'
			onClick={() => loginByProvider(loginType)}
			className='flex-1 border rounded-lg p-2 flex items-center justify-center'
		>
			{selectSocialIcon()}
			<span>{name}</span>
		</button>
	);
}
