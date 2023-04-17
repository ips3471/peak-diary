import React, { useEffect, useRef } from 'react';

interface PromptInputProps {
	input: string;
	onInputChange: (input: string) => void;
}

export default function PromptInput({
	input,
	onInputChange,
}: PromptInputProps) {
	const formInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		console.log('effect - input select');
		formInputRef.current?.select();
	}, []);

	return (
		<input
			ref={formInputRef}
			value={input || ''}
			onChange={e => onInputChange(e.currentTarget.value)}
			spellCheck='false'
			autoComplete='disable'
			type='text'
			required
			className='bg-red-100 flex-1 text-brand text-center border-b border-dotted text-xl mb-6 border-b-red-300'
		/>
	);
}
