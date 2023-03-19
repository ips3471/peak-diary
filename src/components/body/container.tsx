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
			className={`bg-body h-full flex flex-col p-container ${
				onBlur ? 'blur-sm pointer-events-none' : ''
			}`}
		>
			{children}
		</div>
	);
}
