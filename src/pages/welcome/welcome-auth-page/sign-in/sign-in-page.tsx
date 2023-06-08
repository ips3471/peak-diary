import { FormEvent } from 'react';
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
