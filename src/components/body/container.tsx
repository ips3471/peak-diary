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
				onBlur ? 'blur-sm pointer-events-none' : ''
			}`}
		>
			{children}
		</div>
	);
}
