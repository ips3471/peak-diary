import React, { FormEvent, ReactNode } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FormInputs } from '../group-account/dialog/form';

interface FormContainerProps {
	children: ReactNode;
	onCancel: () => void;
	title: string;
	onSubmit: (data: FormInputs) => void;
	submitName?: string;
	onDelete?: () => void;
	hasDelete?: boolean;
}

export default function FormContainer({
	children,
	title,
	submitName = '제출',
	onCancel,
	onSubmit,
	onDelete,
	hasDelete = false,
}: FormContainerProps) {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData);
		onSubmit(data);
	};
	return (
		<form
			onSubmit={handleSubmit}
			className='flex-1 max-h-full overflow-y-scroll scrollbar-hide fixed w-full left-0 top-1/2 transform -translate-y-1/2 p-6 scale-95 bg-red-100 rounded-2xl z-50'
		>
			<section className='text-grey flex justify-between mb-6'>
				<h1 className=''>{title}</h1>
				<button type='button' onClick={onCancel} className={'text-xl'}>
					<AiOutlineClose />
				</button>
			</section>
			<>{children}</>
			<section className='flex items-center flex-col gap-2 '>
				<button
					className='w-full text-body bg-brand/80 rounded-2xl py-3 font-semibold'
					type='submit'
				>
					{submitName}
				</button>
				{hasDelete && (
					<button
						className='w-full text-body bg-bodyAccent/80 rounded-2xl py-3 font-semibold'
						type='button'
						onClick={onDelete}
					>
						삭제
					</button>
				)}
			</section>
		</form>
	);
}
