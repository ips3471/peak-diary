import React, { FormEvent, ReactNode } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import FormContainer from '../form/form-container';

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
		<FormContainer title={title} onCancel={onCancel}>
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
		</FormContainer>
	);
}
