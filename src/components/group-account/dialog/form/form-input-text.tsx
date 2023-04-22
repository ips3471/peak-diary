import { useEffect, useMemo, useRef, useState } from 'react';
import Rounded from '../../../forms/rounded';
import {
	ColorMode,
	IsStretched,
	TextSize,
} from '../../../../types/group-account/group-account';

interface FormInputTextProps {
	name: string;
	placeholder: string;
	initialValue: string;
	colorMode?: ColorMode;
	isStretched?: IsStretched;
	textSize?: TextSize;
	isFocused?: boolean;
}

export default function FormInputText({
	name,
	placeholder,
	initialValue,
	colorMode = 'light',
	isStretched = true,
	textSize = 'text-sm',
	isFocused = false,
}: FormInputTextProps) {
	const [input, setInput] = useState<string | number>(initialValue);

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!isFocused || !inputRef.current) return;
		inputRef.current.focus();
	}, [isFocused]);
	return (
		<Rounded color={colorMode} isStretched={isStretched}>
			<input
				ref={inputRef}
				required
				name={name}
				className={`py-2 ${textSize}`}
				autoComplete='disable'
				spellCheck='false'
				type='text'
				value={input}
				placeholder={placeholder}
				onChange={e => setInput(e.currentTarget.value)}
			/>
		</Rounded>
	);
}
