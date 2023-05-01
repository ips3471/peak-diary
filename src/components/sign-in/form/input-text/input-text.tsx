import { useState } from 'react';

interface InputTextProps {
	name: string;
	label?: string;
	type?: 'text' | 'password';
}

export default function InputText({
	name,
	label,
	type = 'text',
}: InputTextProps) {
	const [input, setInput] = useState<string>('');
	const [isFocused, setIsFocused] = useState(false);
	return (
		<div className='relative flex flex-col gap-1'>
			<label
				htmlFor='input-email'
				className={`text-main-dark/80 transition-all  ${
					isFocused ? 'font-semibold' : 'translate-y-full '
				}`}
			>
				{label ? label : name}
			</label>
			<input
				id='input-email'
				required
				autoComplete='disable'
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				name={name}
				value={input}
				onChange={e => setInput(e.currentTarget.value)}
				className={`border p-2 text-lg transition-all  ${
					isFocused ? 'rounded-md' : '-translate-y-1/4 scale-105 rounded-lg'
				}`}
				type={type}
			/>
		</div>
	);
}
