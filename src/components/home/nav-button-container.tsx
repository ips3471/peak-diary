import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

interface NavButtonContainerProps {
	children: ReactNode;
	backgroundTailwindStyle: string;
}

export default function NavButtonContainer({
	children,
	backgroundTailwindStyle,
}: NavButtonContainerProps) {
	const { user } = useAuthContext();
	return (
		<section
			onClick={() => {
				console.log('click container');
				if (!user?.uid) {
					return window.alert('로그인이 필요한 서비스입니다');
				}
			}}
			className={`col-span-2 h-2/6 rounded-xl border-2 shadow-sm ${backgroundTailwindStyle} bg-cover bg-no-repeat bg-center`}
		>
			{children}
		</section>
	);
}
