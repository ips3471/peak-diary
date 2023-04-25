import BodyContainer from '../components/body/container';
import NavButton from '../components/home/nav-button';
import NavButtonContainer from '../components/home/nav-button-container';

export default function Home() {
	return (
		<BodyContainer>
			<article className='grid grid-cols-4 h-full gap-2'>
				<NavButtonContainer backgroundTailwindStyle="bg-[url('/public/img/logo-checklist.png')]">
					<NavButton
						title='체크리스트'
						description='한번더 확인!'
						path='/checklist'
						requireSignIn={true}
					/>
				</NavButtonContainer>

				<NavButtonContainer backgroundTailwindStyle="bg-[url('/public/img/logo-group-account.png')]">
					<NavButton
						title='그룹정산'
						description='정확하고 깔끔하게'
						path='/group-account'
						requireSignIn={true}
					/>
				</NavButtonContainer>
				<section></section>
				<section></section>
				<section></section>
			</article>
		</BodyContainer>
	);
}
