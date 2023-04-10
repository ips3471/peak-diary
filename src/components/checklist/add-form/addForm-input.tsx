import { FormEvent, useState } from 'react';
import Rounded from '../../forms/rounded';
import { BsPlus } from 'react-icons/bs';

interface AddFormInputProps {
	onAdd: (text: string) => void;
}

export default function AddFormInput({ onAdd }: AddFormInputProps) {
	const [input, setInput] = useState<string>('');

	const handleAdd = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onAdd(input);
		setInput('');
	};
	return (
		<form onSubmit={handleAdd} className='flex'>
			<Rounded color='light' isStretched={true}>
				<input
					className='flex-1'
					type='text'
					autoComplete='disable'
					spellCheck='false'
					value={input}
					placeholder='새로운 아이템'
					onChange={e => setInput(e.currentTarget.value)}
				/>
				<button
					type='submit'
					data-testid='submit'
					className='flex items-center text-gray-400 pl-8  '
				>
					<BsPlus />
					Add
				</button>
			</Rounded>
		</form>
	);
}
