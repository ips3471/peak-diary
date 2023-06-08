import { useState } from 'react';

interface InputTextProps {
	name: string;
	label?: string;
	type?: 'email' | 'password' | 'text';
	autoComplete?: 'disable' | 'on';
}

export default function InputText({
	name,
	label,
	type = 'email',
	autoComplete = 'disable',
}: InputTextProps) {
	const [input, setInput] = useState<string>('');
	const [isFocused, setIsFocused] = useState(false);
	return (
		<div className='relative flex flex-col gap-1'>
			<label
				htmlFor={`input-${name}`}
				className={`text-main-dark/80 transition-all ${
					input && !isFocused ? 'invisible opacity-0' : ''
				}  ${isFocused ? 'font-semibold' : 'translate-y-full '}`}
			>
				{label ? label : name}
			</label>
			<input
				id={`input-${name}`}
				required
				autoComplete={autoComplete}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				name={name}
				value={input}
				onChange={e => setInput(e.currentTarget.value)}
				className={`  text-lg transition-all  ${
					isFocused
						? ' border-b border-b-main-brand p-1'
						: '-translate-y-1/4 scale-105 rounded-lg border p-2'
				}`}
				type={type}
			/>
		</div>
	);
}
