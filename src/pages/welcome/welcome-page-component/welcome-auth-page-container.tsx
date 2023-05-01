import { ReactNode } from 'react';

interface WelcomeAuthPageContainerProps {
	children: ReactNode;
}

export default function WelcomeAuthPageContainer({
	children,
}: WelcomeAuthPageContainerProps) {
	return (
		<div className='bg-main-brand opacity-80 h-full flex flex-col'>
			<div className=" text-center flex-1 bg-no-repeat opacity-90 bg-[url('/public/img/signin-bg-stars.svg')]">
				<h1 className='text-2xl font-bold pt-8 pb-24 text-pureWhite'>Diary.</h1>
			</div>
			{children}
		</div>
	);
}
