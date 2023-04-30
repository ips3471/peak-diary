import React, { ReactNode } from 'react';
import NavigateHeader from '../main/header/navigate-header';

interface BodyContainerProps {
	children: ReactNode;
	onBlur?: boolean;
	prevURL?: string;
	title?: string;
}

export default function BodyContainer({
	children,
	onBlur,
	prevURL = '/',
	title,
}: BodyContainerProps) {
	return (
		<>
			{title && <NavigateHeader title={title} url={prevURL} />}
			<div
				className={`bg-main-light/10 overflow-scroll scrollbar-hide h-full flex flex-col p-container transition-all ${
					onBlur
						? 'overflow-hidden blur-sm pointer-events-none bg-[rgba(0,0,0,0.2)]'
						: ''
				}`}
			>
				{children}
			</div>
		</>
	);
}
