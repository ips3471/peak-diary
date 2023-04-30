import React, { ReactNode } from 'react';
import NavigateHeader from '../main/header/navigate-header';
import Navbar from '../navbar/Navbar';

interface BodyContainerProps {
	children: ReactNode;
	onBlur?: boolean;
	prevURL?: string;
	title?: string;
	hasNavbar?: boolean;
}

export default function BodyContainer({
	children,
	onBlur,
	prevURL = '/',
	title,
	hasNavbar = false,
}: BodyContainerProps) {
	return (
		<div className='h-full flex flex-col'>
			{title && <NavigateHeader title={title} url={prevURL} />}
			<div
				className={`flex-1 bg-main-light/10 overflow-scroll scrollbar-hide  flex flex-col p-container transition-all ${
					onBlur
						? 'overflow-hidden blur-sm pointer-events-none bg-[rgba(0,0,0,0.2)]'
						: ''
				}`}
			>
				{children}
			</div>
			{hasNavbar && <Navbar />}
		</div>
	);
}
