import React, { ChangeEvent, FormEvent } from 'react';
import { AiOutlineEnter } from 'react-icons/ai';
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
		<div>
			<form onSubmit={onSubmit} className='flex'>
				<input
					className='border'
					data-testid='input'
					type='text'
					autoComplete='off'
					value={text}
					onChange={onInputChange}
				/>
				<button type='submit' data-testid='submit' className='border'>
					<AiOutlineEnter />
				</button>
				<Toggle
					id='toggle-status'
					data-testid='toggle'
					defaultChecked={toggled}
					onChange={onToggle}
				/>
				<label htmlFor='toggle-status'>활성화시 스테이지에 등록</label>
			</form>
		</div>
	);
}
