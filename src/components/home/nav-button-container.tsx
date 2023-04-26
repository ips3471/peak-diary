import { ReactNode } from 'react';
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
				if (!user?.uid) {
					return window.alert('로그인이 필요한 서비스입니다');
				}
			}}
			className={`col-span-2 h-3/6 rounded-xl border-2 shadow-sm ${backgroundTailwindStyle} bg-cover bg-no-repeat bg-center`}
		>
			{children}
		</section>
	);
}
