import { useNavigate } from 'react-router-dom';
import BodyContainer from '../../components/body/main-container';
import HomeContent from '../../components/home/home-content/home-content';
import { useAuthContext } from '../../context/AuthContext';
import controls from '../../controls/controls';
import HomeHeaderUser from './home-header/home-header-user/home-header-user';

export default function Home() {
	const navigate = useNavigate();
	const { user } = useAuthContext();
	if (!user) {
		navigate('/welcome');
		return null;
	}
	return (
		<>
			<BodyContainer hasNavbar={true}>
				<header className='mb-2'>
					<HomeHeaderUser username={user.name} />
				</header>
				<main className='h-full '>
					<HomeContent items={controls.home.content.gridItems} />
				</main>
			</BodyContainer>
		</>
	);
}
