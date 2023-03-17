import React, { ReactNode } from 'react';

interface RoundedContainerProps {
	children: ReactNode;
	isStretched: boolean;
	color: 'dark' | 'light';
}

export default function Rounded({
	children,
	isStretched,
	color,
}: RoundedContainerProps) {
	return (
		<div
			className={`flex justify-between p-input rounded-lg overflow-hidden shadow-sm ${
				color === 'light' ? 'bg-input_light' : 'bg-input_dark'
			} ${isStretched ? 'flex-1' : 'w-min'}`}
		>
			{children}
		</div>
	);
}