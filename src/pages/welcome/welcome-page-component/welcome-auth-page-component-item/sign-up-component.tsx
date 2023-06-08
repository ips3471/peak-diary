import { Link } from 'react-router-dom';
import SignInDivider from '../../../../components/sign-in/divider/sign-in-divider';
import ButtonSocialLogin from '../../../../components/sign-in/form/button/button-socialLogin';
import { SignUpForm } from '../../../../types/sign-in/signIn';
import { useAuthContext } from '../../../../context/AuthContext';
import WelcomeFormComponent from './welcome-form-component/welcome-form-component';

interface SignUpProps {}

export default function SignUpComponent({}: SignUpProps) {
	const { signUp } = useAuthContext();
	const handleSubmit = (form: SignUpForm) => {
		signUp(form);
	};
	return (
		<div className='relative bg-pureWhite py-16 shadow-md rounded-t-3xl flex-1'>
			<div className='w-12 rounded-full left-4 top-4 absolute  overflow-hidden shadow-md'>
				<img className='scale-150' src='/img/logo.png' />
			</div>
			<header className='text-center pt-6'>
				<h1 className='font-bold text-2xl'>계정을 생성합니다.</h1>
				<p className='py-2 text-lg'>
					이미 계정이 있으신가요?{' '}
					<Link className='text-main-brand' to='/login'>
						로그인
					</Link>
				</p>
			</header>
			<main className='p-6'>
				<section>
					<WelcomeFormComponent onSubmit={handleSubmit} type='sign-up' />
				</section>
				<section className='flex text-main-dark/80'>
					<SignInDivider />
				</section>
				<section className='flex justify-between gap-4'>
					<ButtonSocialLogin name='Google' type='google' />
					<ButtonSocialLogin name='Facebook' type='facebook' />
				</section>
			</main>
		</div>
	);
}
