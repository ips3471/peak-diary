import { Link } from 'react-router-dom';
import InputText from '../../../../../components/sign-in/form/input-text/input-text';
import ButtonSubmit from '../../../../../components/sign-in/form/button/button-submit';
import { FormEvent } from 'react';
import { SignUpForm } from '../../../../../types/sign-in/signIn';

interface WelcomeFormComponentProps {
	onSubmit: (data: SignUpForm) => void;
	type: 'sign-up' | 'sign-in';
}

export default function WelcomeFormComponent({
	type,
	onSubmit,
}: WelcomeFormComponentProps) {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData) as SignUpForm;
		data && onSubmit(data);
	};

	const buttonName =
		type === 'sign-up'
			? '가입하기'
			: type === 'sign-in'
			? '로그인'
			: 'not valid form-component type';

	return (
		<form onSubmit={handleSubmit}>
			<InputText name='email' autoComplete='on' label='e-mail' />
			{type === 'sign-up' && (
				<InputText name='username' type='text' label='name' />
			)}
			<InputText name='password' type='password' />
			{type === 'sign-up' && (
				<InputText name='password2' label='password' type='password' />
			)}
			<section className='text-right mb-2 py-1 text-main-accent'>
				<Link to={'/forgot'}>비밀번호를 찾으시나요?</Link>
			</section>
			<ButtonSubmit name={buttonName} />
		</form>
	);
}
