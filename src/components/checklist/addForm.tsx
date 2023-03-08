import React, { ChangeEvent, FormEvent } from 'react';
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
		<div className='py-2 sticky top-0'>
			<div className='flex items-center justify-end py-1'>
				<label
					htmlFor='toggle-status'
					className='text-xs text-grey mr-1 font-extralight'
				>
					체크시 챙겨야할 목록에 추가
				</label>
				<Toggle
					id='toggle-status'
					data-testid='toggle'
					defaultChecked={toggled}
					onChange={onToggle}
				/>
			</div>
			<form onSubmit={onSubmit} className='flex'>
				<div className='flex flex-1 bg-pureWhite justify-between p-3 rounded-lg overflow-hidden shadow-sm'>
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
