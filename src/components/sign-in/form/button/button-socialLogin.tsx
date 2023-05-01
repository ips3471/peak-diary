import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineGoogle } from 'react-icons/ai';

export type SocialAuthProvider = 'google' | 'facebook';

interface ButtonSocialLoginProps {
	name: string;
	type: SocialAuthProvider;
}

export default function ButtonSocialLogin({
	name,
	type,
}: ButtonSocialLoginProps) {
	function selectSocialIcon() {
		switch (type) {
			case 'facebook':
				return <FaFacebookF />;
			case 'google':
				return <AiOutlineGoogle />;
		}
	}

	return (
		<button className='flex-1 border rounded-lg p-2 flex items-center justify-center'>
			{selectSocialIcon()}
			<span>{name}</span>
		</button>
	);
}
