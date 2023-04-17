import { ReactNode } from 'react';

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
			className={` relative flex justify-between p-input rounded-lg overflow-hidden mb-4 shadow-sm ${
				color === 'light'
					? 'bg-input_light/10'
					: 'bg-input_dark/50 text-pureWhite/80'
			} ${isStretched ? 'flex-1' : 'w-min'}`}
		>
			{children}
		</div>
	);
}
