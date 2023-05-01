import SignUpComponent from '../../welcome-page-component/welcome-auth-page-component-item/sign-up-component';
import WelcomeAuthPageContainer from '../../welcome-page-component/welcome-auth-page-container';

interface SignUpPageProps {}

export default function SignUpPage({}: SignUpPageProps) {
	return (
		<WelcomeAuthPageContainer>
			<SignUpComponent />
		</WelcomeAuthPageContainer>
	);
}
