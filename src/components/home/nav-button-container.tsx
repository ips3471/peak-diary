import React, { ReactNode } from 'react';

interface NavButtonContainerProps {
	children: ReactNode;
	backgroundTailwindStyle: string;
}

export default function NavButtonContainer({
	children,
	backgroundTailwindStyle,
}: NavButtonContainerProps) {
	return (
		<section
			className={`col-span-2 h-2/6 rounded-xl border-2 shadow-sm ${backgroundTailwindStyle} bg-cover bg-no-repeat bg-center`}
		>
			{children}
		</section>
	);
}
