import React, { ChangeEvent, FormEvent } from 'react';
import { AiOutlineEnter } from 'react-icons/ai';
import { BsPlus } from 'react-icons/bs';
import Toggle from 'react-toggle';

interface AddFormProps {
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	text: string;
	onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	toggled: boolean;
	onToggle: () => void;
}

export default function AddForm({
	onSubmit,
	text,
	onInputChange,
	toggled,
	onToggle,
}: AddFormProps) {
	return (
		<div className='border border-red-500 p-checkList'>
			<div className='flex items-center justify-end py-1'>
				<Toggle
					id='toggle-status'
					data-testid='toggle'
					defaultChecked={toggled}
					onChange={onToggle}
				/>
				<label htmlFor='toggle-status'>❔</label>
			</div>
			<form onSubmit={onSubmit} className='flex'>
				<div className='flex border flex-1 bg-pureWhite justify-between p-3 rounded-lg overflow-hidden'>
					<input
						className='flex-1'
						placeholder='New list'
						data-testid='input'
						type='text'
						autoComplete='off'
						value={text}
						onChange={onInputChange}
					/>
					<button
						type='submit'
						data-testid='submit'
						className='flex items-center text-gray-400 pl-8  '
					>
						<BsPlus />
						Add
					</button>
				</div>
			</form>
		</div>
	);
}
