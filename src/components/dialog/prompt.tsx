import React, { FormEvent, ReactNode } from 'react';

interface PromptDialogProps {
	children: ReactNode;
	title: string;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	onCancel: () => void;
}

export default function PromptDialog({
	children,
	title,
	onSubmit,
	onCancel,
}: PromptDialogProps) {
	return (
		<article className='fixed w-full left-0 top-1/2 transform -translate-y-1/2 p-6 bg-red-100 rounded-lg z-30'>
			<section className='text-grey flex justify-between'>
				<h1 className=' mb-3'>{title}</h1>
				<button onClick={onCancel}>취소</button>
			</section>

			<form onSubmit={onSubmit} className='flex flex-col   text-center '>
				{children}
				<button type='submit' className='text-grey'>
					확인
				</button>
			</form>
		</article>
	);
}
