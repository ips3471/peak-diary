import { Link } from 'react-router-dom';
import InputText from '../../../../components/sign-in/form/input-text/input-text';
import ButtonSubmit from '../../../../components/sign-in/form/button/button-submit';
import SignInDivider from '../../../../components/sign-in/divider/sign-in-divider';
import ButtonSocialLogin from '../../../../components/sign-in/form/button/button-socialLogin';

interface SignInProps {}

export default function SignInComponent({}: SignInProps) {
	const handleSubmit = () => {};
	return (
		<div className='relative bg-pureWhite py-16 shadow-md rounded-t-3xl flex-1'>
			<div className='w-12 rounded-full left-4 top-4 absolute  overflow-hidden shadow-md'>
				<img className='scale-150' src='/img/logo.png' />
			</div>
			<header className='text-center pt-6'>
				<h1 className='font-bold text-2xl'>환영합니다!</h1>
				<p className='py-2 text-lg'>
					계정이 없으신가요?{' '}
					<Link className='text-main-brand' to='/register'>
						회원가입
					</Link>
				</p>
			</header>
			<main className='p-6'>
				<section>
					<form onSubmit={handleSubmit}>
						<InputText name='email' label='e-mail' />
						<InputText name='password' type='password' />
					</form>
				</section>
				<section className='text-right mb-2 py-1 text-main-accent'>
					<Link to={'/forgot'}>비밀번호를 찾으시나요?</Link>
				</section>
				<section>
					<ButtonSubmit name='로그인' />
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
