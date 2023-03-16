import React, { FormEvent, ReactNode } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface PromptDialogProps {
	children: ReactNode;
	title: string;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	onCancel: () => void;
	onDeleteTab: () => void;
	current?: string;
}

export default function PromptDialog({
	children,
	title,
	onSubmit,
	onCancel,
	onDeleteTab,
	current,
}: PromptDialogProps) {
	return (
		<article className='fixed w-full left-0 top-1/2 transform -translate-y-1/2 p-6 bg-red-100 rounded-lg z-30'>
			<section className='text-grey flex justify-between mb-6'>
				<h1 className=''>{title}</h1>
				<button onClick={onCancel} className={'text-xl'}>
					<AiOutlineClose />
				</button>
			</section>

			<form
				onSubmit={onSubmit}
				className=' flex flex-col items-center text-grey'
			>
				<div className='flex-1 flex items-start text-center'>
					<span className='flex-1'>{children}</span>
					<button className='ml-4' type='submit'>
						{current ? '수정' : '추가'}
					</button>
				</div>
				{current && (
					<>
						<span>혹은</span>
						<button
							onClick={onDeleteTab}
							className='mt-6 text-red-500'
							type='button'
						>
							삭제
						</button>
					</>
				)}
			</form>
		</article>
	);
}
