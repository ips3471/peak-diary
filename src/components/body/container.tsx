import React, { ReactNode } from 'react';

interface BodyContainerProps {
	children: ReactNode;
	onBlur?: boolean;
}

export default function BodyContainer({
	children,
	onBlur,
}: BodyContainerProps) {
	return (
		<div
			className={`bg-body overflow-scroll scrollbar-hide h-full flex flex-col p-container transition-all ${
				onBlur
					? 'overflow-hidden blur-sm pointer-events-none bg-[rgba(0,0,0,0.2)]'
					: ''
			}`}
		>
			{children}
		</div>
	);
}
