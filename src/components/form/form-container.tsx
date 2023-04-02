import React, { ReactNode } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface FormContainerProps {
	children: ReactNode;
	onCancel: () => void;
	title: string;
}

export default function FormContainer({
	children,
	title,
	onCancel,
}: FormContainerProps) {
	return (
		<article className='flex-1 max-h-full overflow-y-scroll scrollbar-hide fixed w-full left-0 top-1/2 transform -translate-y-1/2 p-6 scale-95 bg-red-100 rounded-2xl z-50'>
			<section className='text-grey flex justify-between mb-6'>
				<h1 className=''>{title}</h1>
				<button onClick={onCancel} className={'text-xl'}>
					<AiOutlineClose />
				</button>
			</section>
			<>{children}</>
		</article>
	);
}
