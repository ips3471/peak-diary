import { Link } from 'react-router-dom';
import InputText from '../../../../components/sign-in/form/input-text/input-text';
import { FormEvent } from 'react';
import ButtonSubmit from '../../../../components/sign-in/form/button/button-submit';
import ButtonSocialLogin from '../../../../components/sign-in/form/button/button-socialLogin';
import SignInDivider from '../../../../components/sign-in/divider/sign-in-divider';
import WelcomeAuthPageContainer from '../../welcome-page-component/welcome-auth-page-container';
import SignInComponent from '../../welcome-page-component/welcome-auth-page-component-item/sign-in-component';

interface SignInPageProps {}

export default function SignInPage({}: SignInPageProps) {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData);
		console.log(data);
	};
	return (
		<WelcomeAuthPageContainer>
			<SignInComponent />
		</WelcomeAuthPageContainer>
	);
}
