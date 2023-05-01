import { Link } from 'react-router-dom';

interface WelcomeIntroProps {
	title: string;
	description: string;
}

export default function WelcomeIntro({
	title,
	description,
}: WelcomeIntroProps) {
	return (
		<div className='bg-black h-full text-center '>
			<div className='h-1/2 flex items-center'>
				<img src='/welcome-banner.png' alt='welcome' />
			</div>
			<div className='h-1/2 p-6 flex flex-col gap-4'>
				<h1 className='font-bold  text-pureWhite text-xl'>{title}</h1>
				<p className='text-main-light text-lg'>{description}</p>
				<Link to={'/login'}>
					<span className='bg-main-brand p-2 rounded-md text-pureWhite'>
						시작하기
					</span>
				</Link>
			</div>
		</div>
	);
}
